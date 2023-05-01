import React, { Component } from "react";
import CheckoutTable from "./checkoutTable";
import NavBar from "./navbar";
import NavTabs from "./navtabs";
import Toasts from "./toasts";

export default class Checkout extends Component {
    render = () => {
        const {
            anchor,
            refresh,
            substitutes,
            removeSubstitute,
            onPeriodChange,
            confirmSubstitute,
            toasts,
            deleteToast,
        } = this.props;

        return (
            <React.Fragment>
                <NavBar />
                <main className="container-fluid p-0 m-0 row">
                    <NavTabs anchor={anchor} refresh={refresh} />
                    <CheckoutTable
                        substitutes={substitutes}
                        removeSubstitute={removeSubstitute}
                        onPeriodChange={onPeriodChange}
                        confirmSubstitute={confirmSubstitute}
                    />
                </main>
                <Toasts toasts={toasts} deleteToast={deleteToast} />
            </React.Fragment>
        );
    };
}
