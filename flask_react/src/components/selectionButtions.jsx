import React, { Component } from "react";

export default class SelectionButton extends Component {
    render = () => {
        return (
            <div className="col">
                <div className="card mt-1 mb-1 me-1 p-3 float-start" style={{ width: "30%" }}>
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    <button className="btn bg-success text-white">
                        Select
                    </button>
                </div>

                <div className="card mt-1 mb-1 me-1 p-3 float-start" style={{ width: "30%" }}>
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    <button className="btn bg-success text-white">
                        Select
                    </button>
                </div>
            </div>
        );
    }
}
