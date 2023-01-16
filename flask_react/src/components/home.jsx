import React, { Component } from "react";
import NavBar from "./navbar";
import NavTabs from "./navtabs";

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <main className="container-fluid p-0 m-0 row">
                    <NavTabs />
                </main>
            </React.Fragment>
        );
    }
}
