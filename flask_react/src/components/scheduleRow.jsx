import React, { Component } from "react";
import Select from "react-select";
import { v4 as uuid } from "uuid";

export default class ScheduleRow extends Component {
    state = {
        selectedSub: null,
    };

    addButton = () => {
        // adds confirm button into row
        return (
            <div className="align-middle text-start my-2 col-1">
                <button
                    className="btn bg-info container-fluid fw-medium"
                    onClick={() => {
                        this.addSubstitute();
                    }}
                >
                    Add
                </button>
            </div>
        );
    };

    addSubSelection = () => {
        // adds multi selection form for substitutes into row
        const { subOptions } = this.props;
        const selectedSubIndex = subOptions.findIndex(
            (period) => period.label === this.state.selectedSub
        );

        return (
            <div className="align-middle text-start my-2 col-2">
                <Select
                    key={uuid()}
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={subOptions[selectedSubIndex]}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="periods"
                    options={subOptions}
                    onChange={(e) => {
                        this.updateSelectedSub(e);
                    }}
                />
            </div>
        );
    };

    addSubstitute = () => {
        // adds substitute into checkout list and clears the form
        const { data } = this.props;
        if (this.state.selectedSub !== null) {
            this.props.addSubstitute(this.state.selectedSub, data[0], data[4]);
            this.setState({ selectedSub: null });
        }
    };

    updateSelectedSub = (event) => {
        // updates selected substitute
        if (event != null) {
            this.setState({ selectedSub: event.value });
        }
    };

    render = () => {
        let { data, rowNum } = this.props;
        let style =
            rowNum & 1
                ? "align-items-center row bg-light"
                : "align-items-center row";

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

                {this.addSubSelection()}
                {this.addButton()}
            </div>
        );
    };
}
