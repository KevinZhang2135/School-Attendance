import React, { Component } from "react";
import ScheduleHeader from "./scheduleHeader";
import ScheduleRow from "./scheduleRow";

export default class ScheduleTable extends Component {
    loadSpinner = () => {
        // displays spinnering if the csv data is unavailable
        return (
            <React.Fragment>
                <div
                    className="spinner-border text-primary m-2 me-0 ms-0"
                    role="status"
                />
                <span>Loading...</span>
            </React.Fragment>
        );
    };

    addHeader = () => {
        // csv header
        const { csvHeader } = this.props;

        let header = csvHeader.slice(3, 4);
        header.push(...csvHeader.slice(6, 10));
        header.push(...csvHeader.slice(13, 14));
        return <ScheduleHeader key={csvHeader} data={header} />;
    };

    mapTable = () => {
        // maps csv data as rows
        let { csv, subOptions, addSubstitute } = this.props;
        const table = [];

        subOptions = subOptions.map((teacherName) => {
            return { value: teacherName, label: teacherName }; // maps as value-label pairs
        });

        for (const row of csv) {
            let data = row.slice(3, 4);
            data.push(...row.slice(6, 10));
            data.push(...row.slice(13, 14));

            table.push(
                <ScheduleRow
                    key={row}
                    data={data}
                    subOptions={subOptions.filter(
                        (sub) => sub.label !== row[3]
                    )}
                    rowNum={csv.indexOf(row)}
                    addSubstitute={addSubstitute}
                />
            );
        }

        return table;
    };

    render = () => {
        const { csv } = this.props;
        return (
            <div className="col">
                {this.addHeader()}
                {csv.length === 0 ? this.loadSpinner() : this.mapTable()}
            </div>
        );
    };
}
