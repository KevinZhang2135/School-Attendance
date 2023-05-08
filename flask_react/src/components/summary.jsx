import React, { Component } from "react";

import NavBar from "./navbar";
import NavTabs from "./navtabs";

export default class Summary extends Component {
    mapTeachers = () => {
        const { summary } = this.props;
        return summary.map((teacher) => (
            <div
                className="card my-2 me-3 p-3 float-start shadow-sm"
                key={teacher.name + teacher.id}
                style={{ width: "15%" }}
            >
                <div className="d-flex justify-content-center align-items-center border-bottom border-primary border-3 pb-2 fw-medium">
                    Substitutes for {teacher.name}
                </div>
                {this.mapSubstitutes(teacher.substitutes)}
            </div>
        ));
    };

    mapSubstitutes = (substitutes) => {
        return substitutes.map((substitute, index) => {
            const style =
                index & 1
                    ? "align-items-center row bg-light"
                    : "align-items-center row";

            return (
                <React.Fragment>
                    <div
                        className={style}
                        key={substitute.name + substitute.id}
                    >
                        <div className="d-flex justify-content-start my-2 ms-2 col">
                            {substitute.name}
                        </div>

                        <div className="d-flex justify-content-end my-2 me-2 col">
                            Period {substitute.period}
                        </div>
                    </div>
                </React.Fragment>
            );
        });
    };

    render = () => {
        const { anchor, refresh, summary } = this.props;

        return (
            <React.Fragment>
                <NavBar />
                <main
                    className="container-fluid p-0 m-0 row"
                    style={{ height: "100%" }}
                >
                    <NavTabs anchor={anchor} refresh={refresh} />

                    <div className="col">
                        {summary.length === 0 ? (
                            <span className="align-items-center my-1">
                                Nothing to show
                            </span>
                        ) : (
                            this.mapTeachers()
                        )}
                    </div>
                </main>
            </React.Fragment>
        );
    };
}
