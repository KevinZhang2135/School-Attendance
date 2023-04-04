import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Papa from "papaparse";
import { v4 as uuid } from 'uuid';

import Home from "./components/home";
import Checkout from "./components/checkout";
import Schedule from "./components/schedule";



export default class App extends Component {
    state = {
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

    addSubstitue = (sub, teacher, period) => {
        const newSubList = this.state.substitues;
        newSubList.push({ id: uuid(), sub, teacher, period: parseInt(period) });

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
                            onClick={this.addSubstitue}
                        />
                    }
                />
            </Routes>
        );
    }
}
