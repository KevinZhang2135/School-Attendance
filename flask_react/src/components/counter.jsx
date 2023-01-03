import React, { Component } from "react";

export default class Counter extends Component {
    state = {
        value: this.props.value,
        tags: ["tag1", "tag2", "tag3"],
    };

    handleIncrement = () => {
        this.setState({ value: this.state.value + 1 }); // setter for state
    };

    renderTags() {
        if (this.state.tags.length === 0) return null;

        return (
            <ul>
                {this.state.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2";
        classes += this.state.value === 0 ? " badge-warning" : " badge-primary";
        return classes;
    }

    formatCount() {
        const { value: count } = this.state;
        return count === 0 ? "Zero" : count;
    }

    render() {
        return (
            <React.Fragment>
                <div className="pb-1">
                    <span className={this.getBadgeClasses()}>
                        {this.formatCount()}
                    </span>

                    <button
                        onClick={() => this.handleIncrement()}
                        className="btn btn-secondary"
                    >
                        Increment
                    </button>
                </div>

                {this.state.tags.length === 0 && "Please create a new tag!"}
            </React.Fragment>
        );
    }
}

// export default Counter;
