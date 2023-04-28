import React, { Component } from "react";

export default class ScheduleHeader extends Component {
    render = () => {
        let { data } = this.props;
        let style = "align-items-center row border-bottom border-primary border-3";
        data.push("Substitute Name");

        return (
            <div className={style}>
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