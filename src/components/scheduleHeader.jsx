import React, { Component } from "react";
import * as Icon from "react-bootstrap-icons";

export default class ScheduleHeader extends Component {
    renderCaret = () => {
        const { sortReversed } = this.props;
        console.log("caret");

        return sortReversed ? (
            <Icon.CaretUpFill
                className="align-middle"
                color="white"
            />
        ) : (
            <Icon.CaretDownFill
                className="align-middle"
                color="white"
            />
        );
    };

    render = () => {
        const { header, sortIndex, updateSort } = this.props;

        // gets the name, course name, section id, term code, period, and room of header
        const truncHeader = header
            .slice(3, 4)
            .concat(header.slice(6, 10))
            .concat(...header.slice(13, 14));

        return (
            <div className="align-items-center row border-bottom border-primary border-3 bg-white sticky-top">
                {truncHeader.map((item, index) => {
                    let style = "container-fluid fw-medium";
                    style +=
                        header[sortIndex] === truncHeader[index]
                            ? " btn btn-primary"
                            : " btn btn-light";

                    return (
                        <div
                            className="align-middle my-2 col-1 d-flex flex-row"
                            key={item + index}
                        >
                            <button
                                className={style}
                                onClick={() => {
                                    updateSort(item);
                                }}
                            >
                                <div className="d-flex flex-row">
                                    <div className="">{item}</div>

                                    <div className="d-flex flex-row align-items-center">
                                        {header[sortIndex] ===
                                            truncHeader[index] &&
                                            this.renderCaret()}
                                    </div>
                                </div>
                            </button>
                        </div>
                    );
                })}

                <span className="align-middle text-start my-2 col-2 fw-medium">
                    Substitute Name
                </span>
            </div>
        );
    };
}
