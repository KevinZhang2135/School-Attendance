import React, { Component } from "react";
import Substitues from "./substitues";
import NavBar from "./navbar";
import NavTabs from "./navtabs";

export default class Home extends Component {
    render() {
        const { teachers, handleDelete } = this.props;
        return (
            <React.Fragment>
                <NavBar />
                <main className="container-fluid row">
                    <NavTabs />
                    <Substitues
                        teachers={teachers}
                        onDelete={handleDelete}
                    />
                </main>
            </React.Fragment>
        );
    }
}
