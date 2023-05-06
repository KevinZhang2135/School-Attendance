import React, { Component } from "react";
import NavBar from "./navbar";
import NavTabs from "./navtabs";

export default class Summary extends Component {
    mapTeacher = () => {};

    mapSubstitutes = () => {};

    render = () => {
        let { anchor, refresh } = this.props;

        return (
            <React.Fragment>
                <NavBar />
                <main
                    className="container-fluid p-0 m-0 row"
                    style={{ height: "100%" }}
                >
                    <NavTabs anchor={anchor} refresh={refresh} />
                    <div></div>
                </main>
            </React.Fragment>
        );
    };
}
