import React, { Component } from "react";
export default class NavBar extends Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            Navbar
                            <span class="badge badge-pill badge-secondary m-2">
                                {this.props.totalCounters}
                            </span>
                        </a>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
