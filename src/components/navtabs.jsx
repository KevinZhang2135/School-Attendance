import React, { Component } from "react";

export default class NavTabs extends Component {
    render = () => {
        const { anchor, refresh } = this.props;

        const selected =
            "btn btn-primary container-fluid mb-2 rounded-pill fw-medium";
        const unselected = "btn container-fluid mb-2 rounded-pill";

        return (
            <div
                className="container-fluid p-0 col-1 mx-3 bg-white"
                style={{ width: "150px" }}
            >
                <a
                    className={
                        anchor === null || anchor === "home"
                            ? selected
                            : unselected
                    }
                    href="./index.html#home"
                    onClick={() => refresh("home")}
                >
                    Home
                </a>
                <a
                    className={anchor === "schedules" ? selected : unselected}
                    href="./index.html#schedules"
                    onClick={() => refresh("schedules")}
                >
                    Schedules
                </a>

                <a
                    className={anchor === "checkout" ? selected : unselected}
                    href="./index.html#checkout"
                    onClick={() => refresh("checkout")}
                >
                    Substitutes
                </a>

                <a
                    className={anchor === "summary" ? selected : unselected}
                    href="./index.html#summary"
                    onClick={() => refresh("summary")}
                >
                    Summary
                </a>
            </div>
        );
    };
}
