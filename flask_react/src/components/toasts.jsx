import React, { Component } from "react";
export default class Toasts extends Component {
    mapToast = () => {
        return (
            <div
                className="toast my-2"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{ display: "block" }}
            >
                <div className="toast-header">
                    <strong className="me-auto">Bootstrap</strong>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>

                <div className="toast-body">
                    Hello, world! This is a toast message.
                </div>
            </div>
        );
    };
    render = () => {
        return (
            <div className="toast-container position-fixed bottom-0 end-0 m-4 mb-3">
                    {this.mapToast()}
                    {this.mapToast()}
                    {this.mapToast()}
            </div>
        );
    };
}
