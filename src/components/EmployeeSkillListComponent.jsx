import React, { useEffect, useState } from 'react';
import SkillTrackerService from '../services/SkillTrackerService';
import { useNavigate, useLocation } from "react-router-dom";

const EmployeeSkillListComponent = props => {
    let location = useLocation();

    useEffect(() => {
        console.log("pathname: " + location.pathname);
        setJsToken(location.state.jsToken);
        setCriteria(location.state.criteria);
        setValue(location.state.value);
        setUserName(location.state.userName);
        setRoles(location.state.roles);
        console.log("Token: " + jsToken);

        if (criteria === 'Id') {
            SkillTrackerService.getEmployeeById(value, jsToken)
                .then(res => {
                    setEmployees(res.data);
                });
        } else if (criteria === 'Name') {
            SkillTrackerService.getEmployeeByName(value, jsToken)
                .then(res => {
                    setEmployees(res.data);
                });
        } else if (criteria === 'Skill') {
            SkillTrackerService.getEmployeeBySkill(value, jsToken)
                .then(res => {
                    setEmployees(res.data);
                });
        } else {
            SkillTrackerService.getEmployees(jsToken)
                .then((res) => {
                    setEmployees(res.data);
                    console.log("Employee list received" + JSON.stringify(employees));
                });
        }

        if (roles.includes("WRITE_PRIVILEGE")) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [location]);

    const [disable, setDisable] = useState('');
    const [criteria, setCriteria] = useState(location.state.criteria);
    const [value, setValue] = useState(location.state.value);
    const [jsToken, setJsToken] = useState(location.state.jsToken);
    const [userName, setUserName] = useState(location.state.userName);
    const [roles, setRoles] = useState(location.state.roles);
    const [employees, setEmployees] = useState([]);

    let navigate = useNavigate();

    const editEmployee = (id) => {
        navigate('/update-employee-skill', {
            state: {
                jsToken: jsToken,
                id: id,
                userName: userName,
                roles: roles,
                operation: "Update"
            }
        });
    }

    const deleteEmployee = (id) => {
        SkillTrackerService.deleteEmployee(id, jsToken)
                .then((res) => {
                    navigate(
                        '/list-employee-skill', {
                        state: {
                            jsToken: jsToken,
                            roles: roles,
                            userName: userName,
                            criteria: "All"
                        }
                    });
                });
    }

    const viewEmployee = (id) => {
        navigate('/update-employee-skill', {
            state: {
                jsToken: jsToken,
                id: id,
                userName: userName,
                roles: roles,
                operation: "View"
            }
        });
    }

    const addEmployee = (id) => {
        navigate('/create-employee-skill', {
            state: {
                jsToken: jsToken,
                userName: userName,
                roles: roles,
                operation: "Create"
            }
        });
    }

    const searchEmployee = () => {
        navigate('/search-employee-skill', {
            state: {
                jsToken: jsToken,
                userName: userName,
                roles: roles
            }
        });
    }

    return (
        <div>
            <h2 className="text-center">Employees List</h2>
            <div className="row">
                <button id="addEmployeeBtn" className="btn btn-primary" disabled={disable} onClick={addEmployee} style={{ width: "160px" }}> Add Employee</button>
                <button id="searchEmployeeBtn" className="btn btn-success" onClick={searchEmployee} style={{ width: "160px", marginLeft: "10px" }}> Search Employee</button>
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Employee Id</th>
                            <th> Employee First Name</th>
                            <th> Employee Last Name</th>
                            <th> Employee Email Id</th>
                            <th> Employee Mobile Number</th>
                            <th> HTML CSS JavaScript</th>
                            <th> Angular</th>
                            <th> React</th>
                            <th> Spring</th>
                            <th> Restful</th>
                            <th> Hibernate</th>
                            <th> GIT</th>
                            <th> Docker</th>
                            <th> Jenkins</th>
                            <th> AWS</th>
                            <th> Spoken</th>
                            <th> Communication</th>
                            <th> Aptitude</th>
                            <th colSpan={3}> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(
                                employee =>
                                    <tr key={employee.id}>
                                        <td> {employee.id} </td>
                                        <td> {employee.firstName} </td>
                                        <td> {employee.lastName}</td>
                                        <td> {employee.email}</td>
                                        <td> {employee.mobile} </td>
                                        <td> {employee.htmlCssJavascript}</td>
                                        <td> {employee.angular}</td>
                                        <td> {employee.react} </td>
                                        <td> {employee.spring}</td>
                                        <td> {employee.restful}</td>
                                        <td> {employee.hibernate} </td>
                                        <td> {employee.git}</td>
                                        <td> {employee.docker}</td>
                                        <td> {employee.jenkins} </td>
                                        <td> {employee.aws}</td>
                                        <td> {employee.spoken}</td>
                                        <td> {employee.communication} </td>
                                        <td> {employee.aptitude}</td>
                                        <td>
                                            <button name='update' disabled={disable} onClick={() => editEmployee(employee.id)} className="btn btn-info">Update</button>
                                        </td>
                                        <td>
                                            <button disabled={disable} onClick={() => deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                        <td>
                                            <button onClick={() => viewEmployee(employee.id)} className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeSkillListComponent;