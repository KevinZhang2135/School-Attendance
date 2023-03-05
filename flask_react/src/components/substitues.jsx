import React, { Component } from "react";
import Substitue from "./substitue";

export default class Substitues extends Component {
    render = () => {
        const { teachers, onDelete } = this.props;
        return (
            <div className="col">
                <div className="align-items-center border-bottom border-primary border-3 mb-2 row">
                    <span className="align-start text-start m-2 me-0 ms-0 col-3">
                        Teacher
                    </span>
                    <span className="align-start text-start m-2 me-0 ms-0 col-3">
                        Period
                    </span>
                </div>

                {teachers.map((teacher) => (
                    <Substitue
                        key={teacher.id}
                        teacher={teacher}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        );
    }
}
