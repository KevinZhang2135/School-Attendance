import React, { Component } from "react";
import ScheduleRow from "./scheduleRow";

export default class ScheduleTable extends Component {
    loadSpinner = () => {
        return (
            <React.Fragment>
                <div className="spinner-border text-primary m-2 me-0 ms-0" role="status" />
                <span>Loading...</span>
            </React.Fragment>
        );
    };

    mapTable = () => {
        
        const { csv, availableSubs, onClick } = this.props;
        const table = [];
        for (const row of csv) {
            let data = row.slice(3, 4);
            data.push(...row.slice(6, 10));
            data.push(...row.slice(13, 14));
            table.push(
                <ScheduleRow
                    key={row}
                    data={data}
                    availableSubs={availableSubs.filter(sub => sub.label !== data[0])}
                    rowNum={csv.indexOf(row)}
                    onClick={onClick}
                />
            );
        }

        return table;
    };

    render = () => {
        const { csv } = this.props;
        return (
            <div className="col">
                {csv.length === 0 ? this.loadSpinner() : this.mapTable()}
            </div>
        );
    };
}
