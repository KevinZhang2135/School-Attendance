import React, { Component } from "react";

export default class ScheduleHeader extends Component {
    render = () => {
        let { header, updateSort } = this.props;

        // gets the name, course name, section id, term code, period, and room of header
        header = header
            .slice(3, 4)
            .concat(header.slice(6, 10))
            .concat(...header.slice(13, 14));

        return (
            <div className="align-items-center row border-bottom border-primary border-3 bg-white sticky-top">
                {header.map((item, index) => (
                    <div
                        className="align-middle text-start my-2 col-1"
                        key={item + index}
                    >
                        <button
                            className="btn btn-primary container-fluid fw-medium"
                            onClick={() => {updateSort(item)}}
                        >
                            {item}
                        </button>
                    </div>
                ))}
                <span className="align-middle text-start my-2 col-2 fw-medium">
                    Substitute Name
                </span>
            </div>
        );
    };
}
