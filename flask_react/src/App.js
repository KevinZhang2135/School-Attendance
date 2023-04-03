import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Checkout from "./components/checkout";
import Schedule from "./components/schedule";
import Papa from "papaparse";

export default class App extends Component {
    state = {
        csv: [],
        availableSubs: [],
        substitues: [
            { id: 1, name: "Sub1", teacherSubbing: "Teacher1", period: 2 },
            { id: 2, name: "Sub2", teacherSubbing: "Teacher2", period: 2 },
            { id: 3, name: "Sub3", teacherSubbing: "Teacher3", period: 3 },
            { id: 4, name: "Sub4", teacherSubbing: "Teacher4", period: 7 },
            { id: 5, name: "Sub5", teacherSubbing: "Teacher5", period: 6 },
        ],
    };

    componentDidMount = async () => {
        await this.retriveCSV();
        await this.getAvailableSubs();
    };

    retriveCSV = async () => {
        const csv = [];

        // retrieves data from csvs
        await fetch("../schedules/test.csv")
            .then((response) => response.text())
            .then((row) => {
                Papa.parse(row, {
                    header: false,
                    complete: (row) => {
                        csv.push(...row.data);
                    },
                });

                this.setState({ csv });
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

    render() {
        return (
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/checkout"
                    element={
                        <Checkout
                            substitues={this.state.substitues}
                            onDelete={this.handleDelete}
                            onPeriodChange={this.handlePeriodChange}
                        />
                    }
                />

                <Route
                    path="/schedules"
                    element={
                        <Schedule
                            csv={this.state.csv}
                            availableSubs={this.state.availableSubs}
                        />
                    }
                />
            </Routes>
        );
    }
}
