import React, { Component } from "react";
import Select from "react-select";
import { v4 as uuid } from "uuid";

export default class SelectionButtons extends Component {
    state = {
        selectedTeacher: null,
    };

    addButton = () => {
        // adds confirm button into row
        return (
            <div className="my-2">
                <button
                    className="btn bg-info container-fluid fw-medium"
                    onClick={() => {
                        this.addSubsForTeacher();
                    }}
                >
                    Add
                </button>
            </div>
        );
    };

    addSubSelection = () => {
        // adds multi selection form for substitutes into row
        const { teacherOptions } = this.props;
        const selectedTeacherIndex = teacherOptions.findIndex(
            (period) => period.label === this.state.selectedTeacher
        );

        return (
            <div className="align-middle text-start mt-1 mb-1">
                <Select
                    key={uuid()}
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={teacherOptions[selectedTeacherIndex]}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="periods"
                    options={teacherOptions}
                    onChange={(e) => {
                        this.updateSelectedSub(e);
                    }}
                />
            </div>
        );
    };

    addSubsForTeacher = () => {
        // adds substitute into checkout list and clears the form
        if (this.state.selectedTeacher !== null) {
            this.props.addSubsForTeacher(this.state.selectedTeacher);
            this.setState({ selectedTeacher: null });
        }
    };

    updateSelectedSub = (event) => {
        // updates selected substitute
        if (event != null) {
            this.setState({ selectedTeacher: event.value });
        }
    };

    render = () => {
        return (
            <div className="col">
                <div
                    className="card my-2 me-3 p-3 float-start shadow-sm"
                    style={{ width: "25%" }}
                >
                    <h5 className="card-title">Substitute for Teacher</h5>
                    <p className="card-text">
                        Automatically selects substitutes for all the class
                        periods for the teacher
                    </p>

                    {this.addSubSelection()}
                    {this.addButton()}
                </div>

                <div
                    className="card my-2 me-3 p-3 float-start shadow-sm"
                    style={{ width: "25%" }}
                >
                    <h5 className="card-title">
                        <span className="placeholder col-6"></span>
                    </h5>

                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    
                    <button className="btn bg-success text-white rounded-pill disabled placeholder opacity-100" />
                </div>
            </div>
        );
    };
}
