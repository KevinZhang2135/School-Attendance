import React, { Component } from "react";

export default class NavTabs extends Component {
    render = () => {
        const { refresh } = this.props;
        return (
            <div className="bg-body-tertiary p-0 col-1">
                <a href="./index.html#home" onClick={() => refresh("home")} className="btn container-fluid rounded-0">
                    Home
                </a>
                <a href="./index.html#checkout" onClick={() => refresh("checkout")} className="btn container-fluid rounded-0">
                    Checkout
                </a>
                <a href="./index.html#schedules" onClick={() => refresh("schedules")} className="btn container-fluid rounded-0">
                    Schedules
                </a>
            </div>
        );
    };
}
