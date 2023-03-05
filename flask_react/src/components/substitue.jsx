import React, { Component } from "react";

export default class Substitue extends Component {
    render = () => {
        const { teacher, onDelete } = this.props;
        return (
            <div className="align-items-center row">
                <div className="align-middle text-start mt-1 mb-1 col-3">
                    <span>{teacher.name}</span>
                </div>

                <div className="align-middle text-start mt-1 mb-1 col-3">
                    <span>{teacher.period}</span>
                </div>

                <div className="mt-1 mb-1 col-3">
                    <button className="btn bg-success text-white container-fluid">
                        Confirm
                    </button>
                </div>

                <div className="mt-1 mb-1 col-3">
                    <button
                        className="btn bg-danger text-white container-fluid"
                        onClick={() => onDelete(teacher.id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        );
    }
}
