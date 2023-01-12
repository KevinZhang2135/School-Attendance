import React, { Component } from "react";
import Substitues from "./substitues";
import Banner from "./banner";
import NavBar from "./navbar";

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <p>2323</p>
                <Banner />
                <main className="container-fluid row">
                    <NavBar />
                    <Substitues
                        teachers={this.state.substitues}
                        onDelete={this.handleDelete}
                    />
                </main>

            </React.Fragment>
        );
    }
}
