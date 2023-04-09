import React, { Component } from "react";
import Substitues from "./checkoutTable";
import NavBar from "./navbar";
import NavTabs from "./navtabs";

export default class Checkout extends Component {
    render = () => {
        const { substitues, onDelete, onPeriodChange, refresh } = this.props;
        return (
            <React.Fragment>
                <NavBar />
                <main className="container-fluid p-0 m-0 row">
                    <NavTabs refresh={refresh} />
                    <Substitues
                        substitues={substitues}
                        onDelete={onDelete}
                        onPeriodChange={onPeriodChange}
                    />
                </main>
            </React.Fragment>
        );
    };
}
