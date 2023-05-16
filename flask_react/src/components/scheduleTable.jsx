import React, { Component } from "react";
import ScheduleHeader from "./scheduleHeader";
import ScheduleRow from "./scheduleRow";

export default class ScheduleTable extends Component {
    loadSpinner = () => {
        // displays spinnering if the csv data is unavailable
        return (
            <React.Fragment>
                <div
                    className="spinner-border text-primary my-2 mx-0"
                    role="status"
                />
                <span>Loading...</span>
            </React.Fragment>
        );
    };

    addHeader = () => {
        // csv header
        const { csvHeader } = this.props;

        const header = csvHeader
            .slice(3, 4)
            .concat(csvHeader.slice(6, 10))
            .concat(...csvHeader.slice(13, 14));

        return <ScheduleHeader key={csvHeader} data={header} />;
    };

    mapTable = () => {
        // maps csv data as rows
        let { csv, subOptions, addSubstitute } = this.props;
        csv = [...csv];

        // sorts csv table alphabetically
        csv.sort((a, b) => {
            if (a[3] < b[3]) {
                return -1;
            } else if (a[3] > b[3]) {
                return 1;
            }

            return 0;
        });

        subOptions = subOptions.map((teacherName) => {
            return { value: teacherName, label: teacherName }; // maps as value-label pairs
        });

        const table = [];
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
