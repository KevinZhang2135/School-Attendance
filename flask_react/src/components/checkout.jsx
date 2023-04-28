import React, { Component } from "react";
import CheckoutTable from "./checkoutTable";
import NavBar from "./navbar";
import NavTabs from "./navtabs";

export default class Checkout extends Component {
    render = () => {
        const {
            anchor,
            refresh,
            substitutes,
            handleDelete,
            onPeriodChange,
            confirmSubstitute,
        } = this.props;

        return (
            <React.Fragment>
                <NavBar />
                <main className="container-fluid p-0 m-0 row">
                    <NavTabs anchor={anchor} refresh={refresh} />
                    <CheckoutTable
                        substitutes={substitutes}
                        handleDelete={handleDelete}
                        onPeriodChange={onPeriodChange}
                        confirmSubstitute={confirmSubstitute}
                    />
                </main>
            </React.Fragment>
        );
    };
}
