import React, { Component } from "react";
import CheckoutRow from "./checkoutRow";
import { v4 as uuid } from "uuid";

export default class CheckoutTable extends Component {
    renderSubstitutes = () => {
        // displays a message if the checkout list is empty
        const { substitutes, removeSubstitute, onPeriodChange, confirmSubstitute } =
            this.props;
        if (substitutes.length === 0) {
            return (
                <span className="align-items-center my-1">
                    Nothing to show
                </span>
            );
        }

        return substitutes.map((substitute, index) => (
            <CheckoutRow
                key={uuid()}
                substitute={substitute}
                removeSubstitute={removeSubstitute}
                onPeriodChange={onPeriodChange}
                confirmSubstitute={confirmSubstitute}
                rowNum={index}
            />
        ));
    };

    render = () => {
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

                {this.renderSubstitutes()}
            </div>
        );
    };
}
