import React, { Component } from "react";
import ScheduleRow from "./scheduleRow";

export default class ScheduleTable extends Component {
    mapTable = () => {
        const { csv } = this.props;
        const table = [];
        for (const row of csv) {
            let data = row.slice(3, row.length - 6);
            data.push(...row.slice(6, row.length - 5));
            table.push(
                <ScheduleRow key={row} data={data} rowNum={csv.indexOf(row)} />
            );
        }

        return table;
    };

    render = () => {
        return <div className="col">{this.mapTable()}</div>;
    };
}
