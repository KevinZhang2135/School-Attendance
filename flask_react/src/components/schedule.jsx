import React, { Component } from "react";
import NavBar from "./navbar";
import NavTabs from "./navtabs";
import ScheduleTable from "./scheduleTable";

export default class Schedule extends Component {
    render = () => {
        const { csv, csvHeader, subOptions, addSubstitue, refresh } = this.props;
        return (
            <React.Fragment>
                <NavBar />
                <main className="container-fluid p-0 m-0 row">
                    <NavTabs refresh={refresh} />
                    <ScheduleTable
                        csv={csv}
                        csvHeader={csvHeader}
                        subOptions={subOptions}
                        addSubstitue={addSubstitue}
                    />
                </main>
            </React.Fragment>
        );
    };
}
