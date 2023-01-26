import React, { Component } from 'react';

export default class ScheduleTable extends Component {
    mapTable() {
        const { csv } = this.props;
        return csv.map((teacher) => <li key={teacher}>{teacher}</li>)
    }

    render() { 
        return (
            <ul>
                {this.mapTable()};
            </ul>

        );
    }
}