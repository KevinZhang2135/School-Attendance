import React, { Component } from "react";

export default class Popup extends Component {
    render() {
        return (
            <div className="">
                <div
                    className="card my-2 me-3 p-3 float-start bg-danger shadow-sm position-absolute bottom-0 end-0"
                    style={{ width: "25%" }}
                >
                    <h5 className="card-title text-white">No CSV Detected</h5>
                    <p className="card-text text-white">
                        Please check if there a CSV file in the schedules folder
                        and if "app.exe" is running.
                    </p>
                </div>
            </div>
        );
    }
}
