import React, { Component } from "react";
import NavBar from "./navbar";
import NavTabs from "./navtabs";
import SelectionButtons from "./selectionButtons";
import { Toast } from "react-bootstrap";

export default class Home extends Component {
    render = () => {
        let { anchor, refresh, addSubsForTeacher, teacherOptions } = this.props;
        teacherOptions = teacherOptions.map((teacherName) => {
            return { value: teacherName, label: teacherName }; // maps as value-label pairs
        });

        return (
            <React.Fragment>
                <NavBar />
                <main className="container-fluid p-0 m-0 row">
                    <NavTabs anchor={anchor} refresh={refresh} />
                    <SelectionButtons
                        addSubsForTeacher={addSubsForTeacher}
                        teacherOptions={teacherOptions}
                    />
                </main>
                <Toast>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>
                        Hello, world! This is a toast message.
                    </Toast.Body>
                </Toast>
            </React.Fragment>
        );
    };
}
