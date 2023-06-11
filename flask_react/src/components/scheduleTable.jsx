import React, { Component } from "react";
import * as Icon from "react-bootstrap-icons";

import ScheduleHeader from "./scheduleHeader";
import ScheduleRow from "./scheduleRow";

export default class ScheduleTable extends Component {
    state = { sortIndex: 3, sortReversed: false };

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
        return (
            <ScheduleHeader
                key={csvHeader}
                header={csvHeader}
                sortIndex={this.state.sortIndex}
                updateSort={this.updateSort}
            />
        );
    };

    updateSort = (headerItem) => {
        const { csvHeader } = this.props;
        const newSortIndex = csvHeader.indexOf(headerItem);

        if (newSortIndex === this.state.sortIndex) {
            this.setState({ sortReversed: !this.state.sortReversed });

        } else {
            this.setState({sortIndex: newSortIndex, sortReversed: false });
        }
    };

    mapTable = () => {
        // maps csv data as rows
        const { csv, subOptions, addSubstitute } = this.props;
        const { sortIndex, sortReversed } = this.state;
        const truncCsv = [...csv];

        // sorts csv table alphabetically
        truncCsv.sort((a, b) => {
            if (a[sortIndex] === b[sortIndex]) {
                return 0;
            }
            
            if (sortReversed) {
                return a[sortIndex] > b[sortIndex] ? -1 : 1;
            }

            return a[sortIndex] < b[sortIndex] ? -1 : 1;
            
        });

        const mappedSubOptions = subOptions.map((teacherName) => {
            return { value: teacherName, label: teacherName }; // maps as value-label pairs
        });

        const table = [];
        for (const row of truncCsv) {
            // gets the name, course name, section id, term code, period, and room of row
            let data = row
                .slice(3, 4)
                .concat(row.slice(6, 10))
                .concat(row.slice(13, 14));

            table.push(
                <ScheduleRow
                    key={row}
                    data={data}
                    subOptions={mappedSubOptions.filter(
                        (sub) => sub.label !== row[3]
                    )} // filters out the teacher out of the sub list
                    rowNum={truncCsv.indexOf(row)}
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
