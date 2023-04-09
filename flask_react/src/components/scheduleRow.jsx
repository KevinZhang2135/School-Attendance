import React, { Component } from "react";
import Select from "react-select";
import { v4 as uuid } from "uuid";

export default class ScheduleRow extends Component {
    state = {
        selectedSub: null,
    };

    addButton = (rowNum) => {
        if (rowNum !== 0) {
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
        }
    };

    addSubSelection = (rowNum) => {
        const { availableSubs } = this.props;
        const selectedSubIndex = availableSubs.findIndex(
            (period) => period.label === this.state.selectedSub
        );

        if (rowNum !== 0) {
            return (
                <div className="align-middle text-start mt-1 mb-1 col-2">
                    <Select
                        key={uuid()}
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={availableSubs[selectedSubIndex]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        name="periods"
                        options={availableSubs}
                        onChange={(e) => {
                            this.updateSelectedSub(e);
                        }}
                    />
                </div>
            );
        }
    };

    addSubstitue = async () => {
        const { data, addSubstitue } = this.props;
        if (this.state.selectedSub !== null) {
            addSubstitue(this.state.selectedSub, data[0], data[4]);
            await this.setState({ selectedSub: null });
        }
    };

    updateSelectedSub = (event) => {
        if (event != null) {
            this.setState({ selectedSub: event.value });
        }
    };

    render = () => {
        let { data, rowNum } = this.props;
        let style = "align-items-center row";
        if (rowNum === 0) {
            style += " border-bottom border-primary border-3";
            data.push("Substitue Name");
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

                {this.addSubSelection(rowNum)}
                {this.addButton(rowNum)}
            </div>
        );
    };
}
