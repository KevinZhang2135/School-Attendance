import React, { Component } from "react";
export default class Toasts extends Component {
    mapToast = () => {
        const { toasts, deleteToast } = this.props;

        return toasts.map((toast) => {
            let svgColor = "";
            switch (toast.title) {
                case "Substitute Added":
                    svgColor = "#0dcaf0";
                    break;

                case "Substitute Removed":
                    svgColor = "#dc3545";
                    break;

                case "Substitute Confirmed":
                    svgColor = "#198754";
                    break;

                default:
                    svgColor = "#0d6efd";
            }

            return (
                <div
                    className="toast my-2"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    style={{ display: "block" }}
                    key={toast.id}
                >
                    <div className="toast-header">
                        <svg
                            className="rounded me-2"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <rect
                                width="100%"
                                height="100%"
                                fill={svgColor}
                            ></rect>
                        </svg>
                        <strong className="me-auto">{toast.title}</strong>
                        <button
                            className="btn-close"
                            onClick={() => {
                                deleteToast(toast.id);
                            }}
                        ></button>
                    </div>

                    <div className="toast-body">{toast.body}</div>
                </div>
            );
        });
    };
    render = () => {
        return (
            <div className="toast-container position-fixed bottom-0 end-0 m-4 mb-3">
                {this.mapToast()}
            </div>
        );
    };
}
