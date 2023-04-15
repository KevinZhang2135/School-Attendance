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
            <div className="col-1 mt-2 mb-2">
                <button
                    className="btn bg-success text-white container-fluid"
                    onClick={() => {
                        this.addSubstitue();
                    }}
                >
                    Confirm
                </button>
            </div>
        );
        
    };

    addSubSelection = () => {
        // adds multi selection form for substitues into row
        const { subOptions } = this.props;
        const selectedSubIndex = subOptions.findIndex(
            (period) => period.label === this.state.selectedSub
        );

        return (
            <div className="align-middle text-start mt-1 mb-1 col-2">
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

    addSubstitue = async () => {
        // adds substitue into checkout list and clears the form
        const { data } = this.props;
        if (this.state.selectedSub !== null) {
            this.props.addSubstitue(this.state.selectedSub, data[0], data[4]);
            await this.setState({ selectedSub: null });
        }
    };

    updateSelectedSub = (event) => {
        // updates selected substitue 
        if (event != null) {
            this.setState({ selectedSub: event.value });
        }
    };

    render = () => {
        let { data, rowNum } = this.props;
        let style = "align-items-center row";
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

                {this.addSubSelection()}
                {this.addButton()}
            </div>
        );
    };
}
