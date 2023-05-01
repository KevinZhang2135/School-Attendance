import React, { Component } from "react";

export default class ScheduleHeader extends Component {
    render = () => {
        let { data } = this.props;
        if (data.length !== 0) {
            data.push("Substitute Name");
        }

        return (
            <div className="align-items-center row border-bottom border-primary border-3 bg-white sticky-top fw-medium">
                {data.map((item, index) => (
                    <span
                        className="align-middle text-start my-2 col-1"
                        key={item + index}
                    >
                        {item}
                    </span>
                ))}
            </div>
        );
    };
}
