import React, { Component } from "react";
import NavBar from "./navbar";
import NavTabs from "./navtabs";
import SelectionButton from "./selectionButtions";

export default class Home extends Component {
    render = () => {
        const { refresh } = this.props;
        return (
            <React.Fragment>
                <NavBar />
                <main className="container-fluid p-0 m-0 row">
                    <NavTabs refresh={refresh} />
                    <SelectionButton />
                </main>
            </React.Fragment>
        );
    };
}
