import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Checkout from "./components/checkout";
import "./App.css";

export default class App extends Component {
    state = {
        teachers: [
            { id: 1, name: "Name1", period: 2 },
            { id: 2, name: "Name2", period: 2 },
            { id: 3, name: "Name3", period: 3 },
            { id: 4, name: "Name4", period: 5 },
        ],
    };

    handleDelete = (id) => {
        console.log("Called");
        const newSubList = this.state.teachers.filter((sub) => sub.id !== id);
        this.setState({ teachers: newSubList });
    };

    render() {
        return (
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/checkout"
                    element={
                        <Checkout
                            teachers={this.state.teachers}
                            onDelete={this.handleDelete}
                        />
                    }
                />
            </Routes>
        );
    }
}
