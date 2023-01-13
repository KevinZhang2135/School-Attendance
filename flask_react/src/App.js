import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import "./App.css";

export default class App extends Component {
    /*<NavBar />
    <main className="container-fluid row">
        <NavTabs />
        <Substitues
            teachers={this.state.substitues}
            onDelete={this.handleDelete}
        />
    </main>*/
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
        const newSubList = this.state.substitues.filter((sub) => sub.id !== id);
        this.setState({ substitues: newSubList });
    };

    render() {
        return (
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            teachers={this.state.teachers}
                            onDelete={this.handleDelete}
                        />
                    }
                />
            </Routes>
        );
    }
}
