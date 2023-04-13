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
        checkout: [],
    };

    componentDidMount = async () => {
        console.log("this.state.checkout");
        await this.getCSV(); // fetches csv
        await this.setSubOptions(); // determines which subs are available

        console.log(this.state.checkout);
        
        this.setState({ anchor: this.getAnchor() }); // sets the url to the corresponding page
    };

    getAnchor = () => {
        // splits url along delimiter and returns the portion after "#"
        return document.URL.split("#").length > 1
            ? document.URL.split("#")[1]
            : null;
    };

    handleAnchorChange = (anchor) => {
        //event.preventDefault();
        this.setState({ anchor });
    };

    getCSV = async () => {
        // retrieves data from csv as json
        await fetch("http://127.0.0.1:5000", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ csv: data.slice(1), csvHeader: data[0] });
            });
    };

    setSubOptions = () => {
        let availableSubs = this.state.csv.map((element) => element[3]); // gets teacher names

        availableSubs = availableSubs.filter((element, index, array) => {
            return array.indexOf(element) === index; // filters elements only for the first occurrence
        });

        availableSubs.shift(); // removes the table header
        availableSubs = availableSubs.map((element) => {
            return { value: element, label: element }; // maps as value-label pairs
        });

        this.setState({ subOptions: availableSubs });
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

    addSubstitue = (subName, teacher, period) => {
        // adds substitue into the checkout with unique id
        const newSubList = this.state.checkout;
        newSubList.push({
            id: uuid(),
            subName,
            teacher,
            period: parseInt(period),
        });

        this.setState({ checkout: newSubList });
    };

    handleDelete = (id) => {
        const newSubList = this.state.checkout.filter(
            (subName) => subName.id !== id
        );
        this.setState({ checkout: newSubList });
    };

    confirmSubstitue = async (id) => {
        const confirmedSub = this.state.checkout.find(
            (subName) => subName.id === id
        );

        this.sendSubToBottom(confirmedSub.subName);
        this.handleDelete(confirmedSub.id);

        const fetchBody = [this.state.csvHeader, ...this.state.csv];
        await fetch("http://127.0.0.1:5000/", {
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
                {(this.state.anchor === null || this.state.anchor === "home") && (
                    <Home refresh={this.handleAnchorChange} />
                )}

                {this.state.anchor === "checkout" && (
                    <Checkout
                        substitues={this.state.checkout}
                        handleDelete={this.handleDelete}
                        onPeriodChange={this.handlePeriodChange}
                        confirmSubstitue={this.confirmSubstitue}
                        refresh={this.handleAnchorChange}
                    />
                )}

                {this.state.anchor === "schedules" && (
                    <Schedule
                        csv={this.state.csv}
                        csvHeader={this.state.csvHeader}
                        availableSubs={this.state.subOptions}
                        addSubstitue={this.addSubstitue}
                        refresh={this.handleAnchorChange}
                    />
                )}
            </React.Fragment>
        );
    };
}
