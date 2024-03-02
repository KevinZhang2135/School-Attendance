import React, { Component } from "react";
import { v4 as uuid } from "uuid";

import Popup from "./components/popup";
import Home from "./components/home";
import Checkout from "./components/checkout";
import Schedule from "./components/schedule";
import Summary from "./components/summary";

export default class App extends Component {
    state = {
        anchor: null,
        csvHeader: [],
        csv: [],
        subOptions: [],
        teacherOptions: [],
        checkout: [],
        summary: [],
    };

    componentDidMount = () => {
        this.setFetchInterval(5000); // fetches csv
        this.setState({ anchor: this.getAnchor() }); // sets the url to the corresponding page
    };

    getAnchor = () => {
        // splits url along delimiter and returns the portion after "#"
        return document.URL.split("#").length > 1
            ? document.URL.split("#")[1]
            : null;
    };

    handleAnchorChange = (anchor) => {
        this.setState({ anchor });
    };

    setFetchInterval = async (delay) => {
        // attempts to fetch csv with delay intervals for maxIter times
        let json = await this.getCSV(); // attempt 1 begins immediately

        // data successfully retrieved
        if (json != null) {
            this.setState({
                csv: json.slice(1),
                csvHeader: json[0],
            });

            this.setOptions(json.slice(1));

        // fetch failed
        } else  {
            const interval = setInterval(async () => {
                json = await this.getCSV();
                if (json != null) {
                    // if stops fetching once the json is fetched
                    clearInterval(interval);
                    this.setState({
                        csv: json.slice(1),
                        csvHeader: json[0],
                    });

                    this.setOptions(json.slice(1)); 
                }
            }, delay);
        }
    };

    getCSV = async () => {
        // tries to retrieve data from csv as json
        const response = await fetch("http://127.0.0.1:5000", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .catch(() => null);

        return response;
    };

    setOptions = (data) => {
        let availableSubs = data.map((teacher) => teacher[3]); // gets teacher names
        availableSubs = availableSubs.filter((teacher, index, array) => {
            return array.indexOf(teacher) === index; // filters elements only for the first occurrence
        });

        availableSubs.sort();

        this.setState({
            subOptions: [...availableSubs],
            teacherOptions: [...availableSubs],
        });
    };

    handlePeriodChange = (event, sub) => {
        // updates the periods after changing in checkout
        if (event !== null) {
            const newSubList = this.state.checkout;
            const index = newSubList.indexOf(sub);
            newSubList[index].period = event.value;

            this.setState({ checkout: newSubList });
        }
    };

    addSubstitute = (name, teacher, period) => {
        // adds substitute into the checkout with unique id
        const newSubList = this.state.checkout;
        newSubList.push({
            id: uuid(),
            name,
            teacher,
            period: parseInt(period),
        });

        this.setState({ checkout: newSubList });
    };

    addSubsForTeacher = (teacherName) => {
        const usedPeriods = []
        const teacherClasses = this.state.csv.filter(
            (teacher) => teacher[3] === teacherName
        );

        teacherClasses.forEach((classPeriod) => {
            const period = classPeriod[9];
            for (let sub of this.state.csv) {
                // sub's name is not teacher's name
                // sub's period is not the teacher's period
                // sub's period not already added
                // sub is not already added

                if (
                    sub[3] !== teacherName &&
                    sub[6] !== period &&
                    !usedPeriods.includes(period) &&
                    this.state.checkout.filter(
                        (substitute) => substitute.name === sub[3]
                    ).length === 0
                ) {
                    this.addSubstitute(sub[3], teacherName, period);
                    usedPeriods.push(period);
                    break;
                }
            }
        });
    };

    reselectSubstitute = (id) => {
        // allows users to reselect the next available substitute in the checkout
        const newSubList = this.state.checkout;
        const substitute = newSubList.find((sub) => sub.id === id);

        const subIndex = this.state.csv.findIndex(
            (teacher) => teacher[3] === substitute.name
        );

        // creates a cycled csv so the search will cycle from the csv from front to back
        const cycledCsv = this.state.csv
            .slice(subIndex)
            .concat(this.state.csv.slice(0, subIndex));

        for (let sub of cycledCsv) {
            // sub's name is not substitute's name
            // sub's period is the teacher's period
            // sub is not already added

            const subNotAdded =
                this.state.checkout.filter(
                    (substitute) => substitute.name === sub[3]
                ).length === 0;

            if (
                sub[3] !== substitute.name &&
                parseInt(sub[9]) !== substitute.period &&
                subNotAdded
            ) {
                substitute.name = sub[3];
                this.setState({ checkout: newSubList });
                break;
            }
        }
    };

    removeSubstitute = (id) => {
        const newSubList = this.state.checkout.filter((sub) => sub.id !== id);
        this.setState({ checkout: newSubList });
    };

    removeAllSubstitutes = () => {
        this.setState({ checkout: [] });
    };

    confirmSubstitute = (id) => {
        // confirms substitute and updates the csv through the flask server
        const confirmedSub = this.state.checkout.find((name) => name.id === id);

        this.removeSubstitute(id);
        this.sendSubToBottom(confirmedSub.name);
        this.updateSummary(confirmedSub);
    };

    confirmAllSubstitutes = () => {
        // confirms all substitutes and updates the csv
        for (const substitute of this.state.checkout) {
            this.sendSubToBottom(substitute.name);
            this.updateSummary(substitute);
        }

        this.removeAllSubstitutes();
    };

    postCSV = () => {
        // updates the csv through the flask server
        const fetchBody = [this.state.csvHeader, ...this.state.csv];
        fetch("http://127.0.0.1:5000", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...fetchBody }),
        });
    };

    sendSubToBottom = (name) => {
        // sends subs to the bottom of the csv in preparation for updating csv file
        let csv = this.state.csv;
        let subs = csv.filter((sub) => sub[3] === name);
        subs.forEach((sub) => {
            csv.splice(csv.indexOf(sub), 1);
            csv.push(sub);
        });

        this.setState({ csv });
    };

    updateSummary = (substitute) => {
        // updates the summary of confirmed substitutes
        const teacher = this.state.summary.find(
            (teacher) => teacher.name === substitute.teacher
        );

        if (teacher) {
            teacher.substitutes.push(substitute);
        } else {
            this.state.summary.push({
                id: uuid(),
                name: substitute.teacher,
                substitutes: [substitute],
            });
        }
    };

    render = () => {
        return (
            <React.Fragment>
                {this.state.csv.length === 0 && <Popup />}
                {(this.state.anchor === null ||
                    this.state.anchor === "home") && (
                    <Home
                        anchor={this.state.anchor}
                        refresh={this.handleAnchorChange}
                        teacherOptions={this.state.teacherOptions}
                        addSubsForTeacher={this.addSubsForTeacher}
                    />
                )}

                {this.state.anchor === "checkout" && (
                    <Checkout
                        anchor={this.state.anchor}
                        refresh={this.handleAnchorChange}
                        substitutes={this.state.checkout}
                        removeSubstitute={this.removeSubstitute}
                        removeAllSubstitutes={this.removeAllSubstitutes}
                        onPeriodChange={this.handlePeriodChange}
                        confirmSubstitute={this.confirmSubstitute}
                        confirmAllSubstitutes={this.confirmAllSubstitutes}
                        postCSV={this.postCSV}
                        reselectSubstitute={this.reselectSubstitute}
                    />
                )}

                {this.state.anchor === "schedules" && (
                    <Schedule
                        anchor={this.state.anchor}
                        refresh={this.handleAnchorChange}
                        csv={this.state.csv}
                        csvHeader={this.state.csvHeader}
                        subOptions={this.state.subOptions}
                        addSubstitute={this.addSubstitute}
                    />
                )}

                {this.state.anchor === "summary" && (
                    <Summary
                        anchor={this.state.anchor}
                        refresh={this.handleAnchorChange}
                        summary={this.state.summary}
                    />
                )}
            </React.Fragment>
        );
    };
}
