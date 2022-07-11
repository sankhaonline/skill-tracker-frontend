import React, { useEffect, useState } from 'react';
import SkillTrackerService from '../services/SkillTrackerService';
import { useNavigate, useLocation } from "react-router-dom";

const EmployeeSkillViewComponent = (props) => {
    console.log(props.operation);

    const location = useLocation();

    useEffect(() => {
        console.log("pathname: " + location.pathname);
        console.log(location.state.jsToken);
        setId(location.state.id);
        setJsToken(location.state.jsToken);
        SkillTrackerService.getEmployeeById(id)
            .then(res => {
                setEmployee(res.data);
            })
    }, [location]);

    const [id, setId] = useState(location.state.id);
    const [jsToken, setJsToken] = useState(location.state.jsToken);
    const [employee, setEmployee] = useState([]);

    let navigate = useNavigate();

    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> View Employee Details</h3>
                <div className="card-body">
                    <div className="row">
                        <label> Employee First Name: </label>
                        <div> {employee.firstName}</div>
                    </div>
                    <div className="row">
                        <label> Employee Last Name: </label>
                        <div> {employee.lastName}</div>
                    </div>
                    <div className="row">
                        <label> Employee Email ID: </label>
                        <div> {employee.emailId}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EmployeeSkillViewComponent;
