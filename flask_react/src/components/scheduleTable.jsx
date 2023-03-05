import React, { Component } from "react";

export default class ScheduleTable extends Component {
    mapTable = () => {
        const { csv } = this.props;
        const table = [];
        for (const row of csv) {
            let data = row.slice(3, row.length - 6);
            data.push(...row.slice(6, row.length - 5));
            
            let style = "align-items-center row";
            if (csv.indexOf(row) === 0) { style += " border-bottom border-primary border-3"; }
            if (csv.indexOf(row) & 1) { style += " bg-light"; }

            table.push(
                <div className={style} key={row}>
                    {data.map((item, index) => (
                        <span
                            className="align-middle text-start mt-1 mb-1 col-1"
                            key={item + index}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            );
        }

        return table;
    }

    render = () => {
        return <div className="col">{this.mapTable()}</div>;
    }
}
