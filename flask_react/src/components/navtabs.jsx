import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavTabs extends Component {
    render() {
        return ( 
            <div className="bg-body-tertiary container col-1">
                <Link to=".." className="btn container-fluid rounded-0">Home</Link>
                <Link to="/checkout" className="btn container-fluid rounded-0">Checkout</Link>

            </div>
        );
    }
}