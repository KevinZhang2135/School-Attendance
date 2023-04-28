import React, { Component } from "react";

export default class NavBar extends Component {
    render = () => {
        return (
            <nav className="navbar navbar-dark bg-primary mb-3">
                <h1 className="fs-2 ps-5 pt-2 text-light">School Substitutes</h1>
            </nav>
        );
    };
}
