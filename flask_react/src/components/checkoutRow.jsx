import React, { Component } from "react";
import Select from "react-select";

export default class CheckoutRow extends Component {
    render = () => {
        const { substitue, handleDelete, onPeriodChange, onSubmit } = this.props;
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
            (period) => period.label === substitue.period
        );

        return (
            <div className="align-items-center row">
                <div className="align-middle text-start mt-1 mb-1 col-3">
                    <span>{substitue.sub}</span>
                </div>

                <div className="align-middle text-start mt-1 mb-1 col-3">
                    <span>{substitue.teacher}</span>
                </div>

                <div className="align-middle text-start mt-1 mb-1 col-1">
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
                            onPeriodChange(e, substitue);
                        }}
                    />
                </div>

                <div className="mt-1 mb-1 col-1" />

                <div className="mt-1 mb-1 col-2">
                    <button
                        className="btn bg-success text-white container-fluid"
                        type="submit"
                        onClick={() => onSubmit(substitue.id)}
                    >
                        Confirm
                    </button>
                </div>

                <div className="mt-1 mb-1 col-2">
                    <button
                        className="btn bg-danger text-white container-fluid"
                        onClick={() => handleDelete(substitue.id)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    };
}
