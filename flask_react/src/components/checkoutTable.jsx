import React, { Component } from "react";
import CheckoutRow from "./checkoutRow";
import { v4 as uuid } from "uuid";

export default class CheckoutTable extends Component {
    renderEmpty = () => {
        return <span className="align-items-center my-1">Nothing to show</span>;
    };

    renderSubstitutes = () => {
        // displays a message if the checkout list is empty
        const {
            substitutes,
            removeSubstitute,
            onPeriodChange,
            confirmSubstitute,
            reselectSubstitute,
            postCSV,
        } = this.props;

        return substitutes.map((substitute, index) => (
            <CheckoutRow
                key={uuid()}
                rowNum={index}
                substitute={substitute}
                removeSubstitute={removeSubstitute}
                onPeriodChange={onPeriodChange}
                confirmSubstitute={confirmSubstitute}
                reselectSubstitute={reselectSubstitute}
                postCSV={postCSV}
            />
        ));
    };

    renderButtons = () => {
        // renders buttons that do all of one task such as confirming all substitutes
        const { confirmAllSubstitutes, removeAllSubstitutes, postCSV } =
            this.props;

        return (
            <div className="align-items-center row mt-4">
                <div className="align-middle text-start my-2 col-5" />
                <div className="align-middle text-start my-2 col-1">
                    <button
                        className="btn bg-success text-white container-fluid rounded-pill fw-medium"
                        type="submit"
                        onClick={() => {
                            confirmAllSubstitutes();
                            postCSV();
                        }}
                    >
                        Confirm All
                    </button>
                </div>

                <div className="align-middle text-start my-2 col-1" />
                <div className="align-middle text-start my-2 col-1">
                    <button
                        className="btn bg-danger text-white container-fluid fw-medium"
                        onClick={() => {
                            removeAllSubstitutes();
                        }}
                    >
                        Cancel All
                    </button>
                </div>
            </div>
        );
    };

    render = () => {
        const { substitutes } = this.props;
        return (
            <div className="col">
                <div className="align-items-center border-bottom border-primary border-3 mb-2 row bg-white sticky-top fw-medium">
                    <span className="align-start text-start my-2 mx-0 col-2">
                        Substitute
                    </span>
                    <span className="align-start text-start my-2 mx-0 col-2">
                        Teacher
                    </span>
                    <span className="align-start text-start my-2 mx-0 col-1">
                        Period
                    </span>
                </div>

                {substitutes.length === 0
                    ? this.renderEmpty()
                    : this.renderSubstitutes()}

                {substitutes.length !== 0 && this.renderButtons()}
            </div>
        );
    };
}
