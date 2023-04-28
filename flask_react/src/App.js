import React, { Component } from "react";
import { v4 as uuid } from "uuid";

import Home from "./components/home";
import Checkout from "./components/checkout";
import Schedule from "./components/schedule";

export default class App extends Component {
    state = {
        anchor: null,
        csvHeader: [],
        csv: [],
        subOptions: [],
        teacherOptions: [],
        checkout: [],
    };

    componentDidMount = () => {
        this.getCSV(); // fetches csv

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

    getCSV = () => {
        // retrieves data from csv as json
        fetch("http://127.0.0.1:5000", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ csv: data.slice(1), csvHeader: data[0] });
                return data.slice(1);
            })
            .then((data) => {
                this.setOptions(data); // determines which subs are available from csv;
            });
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

    addSubstitute = (subName, teacher, period) => {
        // adds substitute into the checkout with unique id
        const newSubList = this.state.checkout;
        newSubList.push({
            id: uuid(),
            subName,
            teacher,
            period: parseInt(period),
        });

        this.setState({ checkout: newSubList });
    };

    addSubsForTeacher = (teacherName) => {
        const addedSubs = [];
        const teacherClasses = this.state.csv.filter(
            (teacher) => teacher[3] === teacherName
        );

        teacherClasses.forEach((classPeriod) => {
            const period = classPeriod[9];
            for (let sub of this.state.csv) {
                // sub's name is not teacher's name
                // sub's period is not the teacher's period
                // sub is not already added
                if (
                    sub[3] !== teacherName &&
                    sub[6] !== period &&
                    addedSubs.filter((subName) => subName === sub[3]).length ===
                        0
                ) {
                    addedSubs.push(sub[3]);
                    this.addSubstitute(sub[3], teacherName, period);
                    break;
                }
            }
        });
    };

    handleDelete = (id) => {
        const newSubList = this.state.checkout.filter(
            (subName) => subName.id !== id
        );
        this.setState({ checkout: newSubList });
    };

    confirmSubstitute = (id) => {
        const confirmedSub = this.state.checkout.find(
            (subName) => subName.id === id
        );

        this.sendSubToBottom(confirmedSub.subName);
        this.handleDelete(confirmedSub.id);

        const fetchBody = [this.state.csvHeader, ...this.state.csv];
        fetch("http://127.0.0.1:5000/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...fetchBody }),
        });
    };

    sendSubToBottom = (subName) => {
        let csv = this.state.csv;
        let subs = csv.filter((sub) => sub[3] === subName);
        subs.forEach((sub) => {
            csv.splice(csv.indexOf(sub), 1);
            csv.push(sub);
        });

        this.setState({ csv });
    };

    render = () => {
        return (
            <React.Fragment>
                {(this.state.anchor === null ||
                    this.state.anchor === "home") && (
                    <Home
                        anchor={this.state.anchor}
                        refresh={this.handleAnchorChange}
                        addSubsForTeacher={this.addSubsForTeacher}
                        teacherOptions={this.state.teacherOptions}
                    />
                )}

                {this.state.anchor === "checkout" && (
                    <Checkout
                        anchor={this.state.anchor}
                        refresh={this.handleAnchorChange}
                        substitutes={this.state.checkout}
                        handleDelete={this.handleDelete}
                        onPeriodChange={this.handlePeriodChange}
                        confirmSubstitute={this.confirmSubstitute}
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
            </React.Fragment>
        );
    };
}
