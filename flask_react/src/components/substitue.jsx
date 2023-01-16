import React, { Component } from "react";

class Substitue extends Component {
    render() {
        const { teacher, onDelete } = this.props;
        return (
            <div className="align-items-center row">
                <span className="align-middle text-start col-3">
                    {teacher.name}
                </span>

                <span className="align-middle text-start col-3">
                    {teacher.period}
                </span>

                <button className="btn bg-success text-white m-2 col-3">
                    Confirm
                </button>

                <button
                    className="btn bg-danger text-white m-2 col-3"
                    onClick={() => onDelete(teacher.id)}
                >
                    Remove
                </button>
            </div>
        );
    }
}

export default Substitue;
