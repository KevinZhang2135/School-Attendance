import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Checkout from "./components/checkout";
import Schedule from "./components/schedules";
import Papa from "papaparse";

export default class App extends Component {
    state = {
        csv: [],
        substitues: [
            { id: 1, name: "Name1", period: 2 },
            { id: 2, name: "Name2", period: 2 },
            { id: 3, name: "Name3", period: 3 },
            { id: 4, name: "Name4", period: 5 },
        ],
    };

    handleSelect = (event, id) => {
        const substitue = this.state.substitues.filter((sub) => sub.id === id);
        console.log(substitue)
    }

    componentDidMount = () => {
        const csv = [];
        fetch("../schedules/test.csv")
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
    }

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
                            onSelect={this.handleSelect}
                        />
                    }
                />

                <Route
                    path="/schedules"
                    element={
                        <Schedule
                        csv={this.state.csv}
                        />
                    }
                />
            </Routes>
        );
    }
}
