import React, { Component } from "react";

export default class Popup extends Component {
    render() {
        return (
            <div className="">
                <div
                    className="card my-2 me-3 p-3 float-start border-danger shadow-sm position-absolute bottom-0 end-0"
                    style={{ width: "25rem" }}
                >
                    <h5 className="card-title">No CSV Detected</h5>
                    <p className="card-text">
                        Please check if there a CSV file in the schedules folder and if "app.exe" is running.
                    </p>
                </div>
            </div>
        );
    }
}
