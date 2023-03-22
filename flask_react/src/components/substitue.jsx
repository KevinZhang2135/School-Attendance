import React, { Component } from "react";

export default class Substitue extends Component {
    render = () => {
        const { substitue, onDelete, onSelect } = this.props;
        return (
            <div className="align-items-center row">
                <div className="align-middle text-start mt-1 mb-1 col-3">
                    <span>{substitue.name}</span>
                </div>

                <div className="align-middle text-start mt-1 mb-1 col-3">
                    <select onChange={(e) => {onSelect(e, substitue.id)}} className="form-select">
                        <option defaultValue>{substitue.period}</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                    <span>{substitue.period}</span>
                </div>

                <div className="mt-1 mb-1 col-3">
                    
                    <button className="btn bg-success text-white container-fluid">
                        Confirm
                    </button>
                </div>

                <div className="mt-1 mb-1 col-3">
                    <button
                        className="btn bg-danger text-white container-fluid"
                        onClick={() => onDelete(substitue.id)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}
