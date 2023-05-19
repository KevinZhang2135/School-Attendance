import React, { Component } from "react";
import Select from "react-select";

export default class CheckoutRow extends Component {
    render = () => {
        const {
            rowNum,
            substitute,
            removeSubstitute,
            onPeriodChange,
            confirmSubstitute,
            reselectSubstitute,
            postCSV
        } = this.props;

        const periodOptions = [
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
            { value: 6, label: 6 },
            { value: 7, label: 7 },
            { value: 8, label: 8 },
        ];

        const periodIndex = periodOptions.findIndex(
            (period) => period.label === substitute.period
        );

        const style =
            rowNum & 1
                ? "align-items-center row bg-light"
                : "align-items-center row";

        const rowStyle = "align-middle text-start my-2";

        return (
            <div className={style}>
                <div className={rowStyle + " col-2"}>
                    <span>{substitute.name}</span>
                </div>

                <div className={rowStyle + " col-2"}>
                    <span>{substitute.teacher}</span>
                </div>

                <div className={rowStyle + " col-1"}>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={periodOptions[periodIndex]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="periods"
                        options={periodOptions}
                        onChange={(e) => {
                            onPeriodChange(e, substitute);
                        }}
                    />
                </div>

                <div className={rowStyle + " col-1"}>
                    <button
                        className="btn bg-success text-white container-fluid rounded-pill fw-medium"
                        type="submit"
                        onClick={() => {
                            confirmSubstitute(substitute.id);
                            postCSV();
                        }}
                    >
                        Confirm
                    </button>
                </div>

                <div className={rowStyle + " col-1"}>
                    <button
                        className="btn bg-info container-fluid rounded-pill fw-medium"
                        type="submit"
                        onClick={() => {
                            reselectSubstitute(substitute.id);
                        }}
                    >
                        Reselect
                    </button>
                </div>

                <div className={rowStyle + " col-1"}>
                    <button
                        className="btn bg-danger text-white container-fluid fw-medium"
                        onClick={() => {
                            removeSubstitute(substitute.id);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    };
}
