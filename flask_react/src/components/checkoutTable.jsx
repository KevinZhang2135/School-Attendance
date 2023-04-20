import React, { Component } from "react";
import CheckoutRow from "./checkoutRow";
import { v4 as uuid } from "uuid";

export default class CheckoutTable extends Component {
    renderSubstitutes = () => {
        // displays a message if the checkout list is empty
        const { substitutes, handleDelete, onPeriodChange, confirmSubstitute } = this.props;
        if (substitutes.length === 0) {
            return (
                <span className="align-items-center mt-1 mb-1">
                    Nothing to show
                </span>
            );
        }

        return substitutes.map((substitute) => (
            <CheckoutRow
                key={uuid()}
                substitute={substitute}
                handleDelete={handleDelete}
                onPeriodChange={onPeriodChange}
                onSubmit={confirmSubstitute}
            />
        ));
    };

    render = () => {
        return (
            <div className="col">
                <div className="align-items-center border-bottom border-primary border-3 mb-2 row">
                    <span className="align-start text-start m-2 me-0 ms-0 col-3">
                        Substitute
                    </span>
                    <span className="align-start text-start m-2 me-0 ms-0 col-3">
                        Teacher
                    </span>
                    <span className="align-start text-start m-2 me-0 ms-0 col-1">
                        Period
                    </span>
                </div>

                {this.renderSubstitutes()}
            </div>
        );
    };
}
