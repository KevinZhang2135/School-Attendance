import React, { Component } from "react";
import { v4 as uuid } from "uuid";

import Home from "./components/home";
import Checkout from "./components/checkout";
import Schedule from "./components/schedule";

export default class App extends Component {
    state = {
        anchor: null,
        csv: [],
        availableSubs: [],
        substitues: [
            { id: 1, sub: "Sub1", teacher: "Teacher1", period: 2 },
            { id: 2, sub: "Sub2", teacher: "Teacher2", period: 2 },
            { id: 3, sub: "Sub3", teacher: "Teacher3", period: 3 },
            { id: 4, sub: "Sub4", teacher: "Teacher4", period: 7 },
            { id: 5, sub: "Sub5", teacher: "Teacher5", period: 6 },
        ],
    };

    componentDidMount = async () => {
        await this.getCSV();
        await this.getAvailableSubs();
        this.setState({ anchor: this.getAnchor()});
    };

    getCSV = async () => {
        // retrieves data from csv
        await fetch("http://127.0.0.1:5000/csv", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ csv: data });
            });
    };

    getAvailableSubs = () => {
        let availableSubs = this.state.csv.map((element) => element[3]); // gets teacher names

        availableSubs = availableSubs.filter((element, index, array) => {
            return array.indexOf(element) === index; // filters elements only for the first occurrence
        });

        availableSubs.shift();
        availableSubs = availableSubs.map((element) => {
            return { value: element, label: element }; // maps as value-label pairs
        });

        this.setState({ availableSubs });
    };

    handlePeriodChange = (event, sub) => {
        // updates the periods after changing in checkout
        if (event !== null) {
            const newSubList = this.state.substitues;
            const index = newSubList.indexOf(sub);
            newSubList[index].period = event.value;

            this.setState({ substitues: newSubList });
        }
    };

    handleDelete = (id) => {
        const newSubList = this.state.substitues.filter((sub) => sub.id !== id);
        this.setState({ substitues: newSubList });
    };

    addSubstitue = (sub, teacher, period) => {
        const newSubList = this.state.substitues;
        newSubList.push({ id: uuid(), sub, teacher, period: parseInt(period) });

        this.setState({ substitues: newSubList });
    };

    getAnchor = () => {
        return document.URL.split("#").length > 1
            ? document.URL.split("#")[1]
            : null;
    };

    handleAnchorChange = (anchor) => {
        this.setState({ anchor });
    };

    render = () => {
        return (
            <React.Fragment>
                {this.state.anchor === null && (
                    <Home refresh={this.handleAnchorChange} />
                )}

                {this.state.anchor === "checkout" && (
                    <Checkout
                        substitues={this.state.substitues}
                        onDelete={this.handleDelete}
                        onPeriodChange={this.handlePeriodChange}
                        refresh={this.handleAnchorChange}
                    />
                )}

                {this.state.anchor === "schedules" && (
                    <Schedule
                        csv={this.state.csv}
                        availableSubs={this.state.availableSubs}
                        addSubstitue={this.addSubstitue}
                        refresh={this.handleAnchorChange}
                    />
                )}
            </React.Fragment>
        );
    };
}
