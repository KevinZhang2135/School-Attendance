import React, { Component } from "react";
import CheckoutTable from "./checkoutTable";
import NavBar from "./navbar";
import NavTabs from "./navtabs";

export default class Checkout extends Component {
    render = () => {
        const { substitues, handleDelete, onPeriodChange, confirmSubstitue, refresh } = this.props;
        return (
            <React.Fragment>
                <NavBar />
                <main className="container-fluid p-0 m-0 row">
                    <NavTabs refresh={refresh} />
                    <CheckoutTable
                        substitues={substitues}
                        handleDelete={handleDelete}
                        onPeriodChange={onPeriodChange}
                        confirmSubstitue={confirmSubstitue}
                    />
                </main>
            </React.Fragment>
        );
    };
}
