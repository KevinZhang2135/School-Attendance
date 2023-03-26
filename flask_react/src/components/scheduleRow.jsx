import React, { Component } from "react";
export default class ScheduleRow extends Component {
    addButton = (rowNum) => {
        if (rowNum !== 0) {
            return (
                <div className="col-1 mt-2 mb-2">
                    <button className="btn bg-success text-white container-fluid">
                        Confirm
                    </button>
                </div>
            );
        }
    };

    render() {
        let { data, rowNum } = this.props;
        let style = "align-items-center row";
        if (rowNum === 0) {
            style += " border-bottom border-primary border-3";
        }

        if (rowNum & 1) {
            style += " bg-light";
        }

        return (
            <div className={style}>
                {data.map((item, index) => (
                    <span
                        className="align-middle text-start mt-2 mb-2 col-1"
                        key={item + index}
                    >
                        {item}
                    </span>
                ))}

                {this.addButton(rowNum)}
            </div>
        );
    }
}
