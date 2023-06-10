import React, { Component } from "react";

export default class SummaryCard extends Component {
    mapSubstitutes = (substitutes) => {
        return substitutes.map((substitute, index) => {
            const style =
                index & 1
                    ? "align-items-center row bg-light"
                    : "align-items-center row";

            return (
                <div className={style} key={substitute.name + substitute.id}>
                    <div className="d-flex justify-content-start my-2 ms-2 col">
                        {substitute.name}
                    </div>

                    <div className="d-flex justify-content-end my-2 me-2 col">
                        Period {substitute.period}
                    </div>
                </div>
            );
        });
    };

    render = () => {
        const { teacher } = this.props;
        return (
            <div
                className="card my-2 me-3 p-3 float-start shadow-sm"
                key={teacher.name + teacher.id}
                style={{ width: "350px" }}
            >
                <div className="d-flex justify-content-center align-items-center border-bottom border-primary border-3 pb-2 fw-medium">
                    Substitutes for {teacher.name}
                </div>
                {this.mapSubstitutes(teacher.substitutes)}
            </div>
        );
    };
}
