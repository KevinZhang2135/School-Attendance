import React, { Component } from "react";
import NavBar from "./components/navbar";
import NavTabs from "./components/navtabs";
import Substitues from "./components/substitues";
import "./App.css";

export default class App extends Component {
    state = {
        substitues: [
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
            <React.Fragment>
                
                <NavBar />
                <main className="container-fluid row">
                    <NavTabs />
                    <Substitues
                        teachers={this.state.substitues}
                        onDelete={this.handleDelete}
                    />
                </main>

            </React.Fragment>
        );
    }
}
