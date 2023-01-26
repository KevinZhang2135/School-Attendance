import React, { Component } from "react";
import Substitues from "./substitues";
import NavBar from "./navbar";
import NavTabs from "./navtabs";


export default class Checkout extends Component {
    render() {
        const { teachers, onDelete } = this.props;
        return (
            <React.Fragment>
                <NavBar />
                <main className="container-fluid p-0 m-0 row">
                    <NavTabs />
                    <Substitues
                        teachers={teachers}
                        onDelete={onDelete}
                    />
                </main>
            </React.Fragment>
        );
    }
}
