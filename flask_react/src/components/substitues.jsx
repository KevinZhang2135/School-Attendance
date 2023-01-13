import React, { Component } from "react";
import Substitue from "./substitue";

class Substitues extends Component {
    render() {
        const { teachers, onDelete } = this.props;
        return (
            <div className="col">
                <div className="align-items-center border-bottom border-primary border-3 row mb-2 p-0">                    
                    <span className="align-start text-start col-3 m-2 me-0 ms-0">
                        Teacher
                    </span>
                    <span className="align-start text-start col-9 m-2 me-0 ms-0">
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

export default Substitues;
