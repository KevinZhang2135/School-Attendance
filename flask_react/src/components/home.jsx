import React, { Component } from "react";
import NavBar from "./navbar";
import NavTabs from "./navtabs";
import SelectionButtons from "./selectionButtons";

export default class Home extends Component {
    render = () => {
        let { anchor, refresh, addSubsForTeacher, teacherOptions } =
            this.props;
        teacherOptions = teacherOptions.map((teacherName) => {
            return { value: teacherName, label: teacherName }; // maps as value-label pairs
        });

        return (
            <React.Fragment>
                <NavBar />
                <main
                    className="container-fluid p-0 m-0 row"
                    style={{ height: "100%" }}
                >
                    <NavTabs anchor={anchor} refresh={refresh} />
                    <SelectionButtons
                        addSubsForTeacher={addSubsForTeacher}
                        teacherOptions={teacherOptions}
                    />
                </main>
            </React.Fragment>
        );
    };
}
