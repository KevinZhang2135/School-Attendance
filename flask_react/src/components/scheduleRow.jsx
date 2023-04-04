import React, { Component } from "react";
import Select from "react-select";

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

    addSubstitue = () => {
        const { data, onClick } = this.props;
        if (this.state.selectedSub !== null) {
            console.log(this.state.selectedSub);
            onClick(this.state.selectedSub, data[0], data[4]);
            this.setState({ selectedSub: null });
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
