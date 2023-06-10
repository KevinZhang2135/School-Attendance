import React, { Component } from "react";

import NavBar from "./navbar";
import NavTabs from "./navtabs";
import SummaryCard from "./summaryCard";

export default class Summary extends Component {
    renderEmpty = () => {
        // notice when summary is empty
        return <span className="align-items-center my-1">Nothing to show</span>;
    };

    mapTeachers = () => {
        // maps each teacher to a card
        const { summary } = this.props;

        // sorts summary alphabetically
        summary.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            }

            return 0;
        });

        return (
            <div className="row row-cols-auto">
                {summary.map((teacher) => (
                    <div className="col">
                        <SummaryCard teacher={teacher} />
                    </div>
                ))}
            </div>
        );
    };

    render = () => {
        const { anchor, refresh, summary } = this.props;

        return (
            <React.Fragment>
                <NavBar />
                <main className="container-fluid p-0 m-0 row">
                    <NavTabs anchor={anchor} refresh={refresh} />

                    <div className="col">
                        {summary.length === 0
                            ? this.renderEmpty()
                            : this.mapTeachers()}
                    </div>
                </main>
            </React.Fragment>
        );
    };
}
