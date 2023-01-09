import React, { Component } from "react";

export default class Counter extends Component {
    componentDidUpdate(props, state) {
        console.log(props, state);
        
    }

    getBadgeClasses() {
        let classes = "badge m-2";
        classes +=
            this.props.counter.value === 0
                ? " badge-warning"
                : " badge-primary";
        return classes;
    }

    formatCount() {
        const { value } = this.props.counter;
        return value === 0 ? "Zero" : value;
    }

    render() {
        return (
            <React.Fragment>
                <div className="pb-1">
                    <span className={this.getBadgeClasses()}>
                        {this.formatCount()}
                    </span>

                    <button
                        onClick={() =>
                            this.props.onIncrement(this.props.counter)
                        }
                        className="btn btn-secondary btn-sm"
                    >
                        Increment
                    </button>

                    <button
                        onClick={() =>
                            this.props.onDelete(this.props.counter.id)
                        }
                        className="btn btn-danger btn-sm m-2"
                    >
                        Delete
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

// export default Counter;
