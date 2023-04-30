import React, { Component } from "react";

export default class NavTabs extends Component {
    render = () => {
        const { anchor, refresh } = this.props;

        let selected = "btn btn-primary container-fluid mb-2 rounded-pill";
        let unselected = "btn container-fluid mb-2 rounded-pill";
        
        return (
            <div className="container-fluid p-0 col-1 mx-3 bg-white">
                <a className={(anchor === null || anchor === "home") ? selected: unselected} href="./index.html#home" onClick={() => refresh("home")} >
                    Home
                </a>
                <a className={anchor === "checkout" ? selected: unselected} href="./index.html#checkout" onClick={() => refresh("checkout")}>
                    Checkout
                </a>
                <a className={anchor === "schedules" ? selected: unselected} href="./index.html#schedules" onClick={() => refresh("schedules")}>
                    Schedules
                </a>
            </div>
        );
    };
}
