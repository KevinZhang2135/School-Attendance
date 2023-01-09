import React, { Component } from "react";
import Counter from "./counter";

export default class Counters extends Component {
    render() {
        const {onReset, counters, onDelete, onIncrement } = this.props;
        return (
            <div className="">
                <button
                    onClick={() => onReset()}
                    className="btn btn-primary m-2"
                >
                    Reset
                </button>

                {counters.map((counter) => (
                    <Counter
                        key={counter.id}
                        onDelete={onDelete}
                        onIncrement={onIncrement}
                        counter={counter}
                    />
                ))}
            </div>
        );
    }
}
