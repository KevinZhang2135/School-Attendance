import React, { Component } from "react";
import Substitue from "./checkoutRow";
import { v4 as uuid } from "uuid";

export default class Substitues extends Component {
    renderSubstitues = () => {
        const { substitues, onDelete, onPeriodChange } = this.props;
        if (substitues.length === 0) {
            return (
                <span className="align-items-center mt-1 mb-1">
                    Nothing to show
                </span>
            );
        }

        return substitues.map((substitue) => (
            <Substitue
                key={uuid()}
                substitue={substitue}
                onDelete={onDelete}
                onPeriodChange={onPeriodChange}
            />
        ));
    };

    render = () => {
        return (
            <div className="col">
                <div className="align-items-center border-bottom border-primary border-3 mb-2 row">
                    <span className="align-start text-start m-2 me-0 ms-0 col-3">
                        Substitue
                    </span>
                    <span className="align-start text-start m-2 me-0 ms-0 col-3">
                        Teacher
                    </span>
                    <span className="align-start text-start m-2 me-0 ms-0 col-1">
                        Period
                    </span>
                </div>

                {this.renderSubstitues()}
            </div>
        );
    };
}
