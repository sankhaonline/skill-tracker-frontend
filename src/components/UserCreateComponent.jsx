import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { useNavigate, useLocation } from "react-router-dom";

const UserCreateComponent = (props) => {
    console.log(props.operation);

    const location = useLocation();

    useEffect(() => {
        console.log("pathname: " + location.pathname);
        console.log(location.state.jsToken);
        setId(location.state.id);
        setJsToken(location.state.jsToken);
        setRoles(location.state.roles);
        setUserName('');
        setPassword('');

        if (roles.includes("ADMIN_PRIVILEGE")) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [location]);

    const [id, setId] = useState(location.state.id);
    const [disable, setDisable] = useState('');
    const [roles, setRoles] = useState(location.state.roles);
    const [jsToken, setJsToken] = useState(location.state.jsToken);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [emailAddress, setEmail] = useState('');
    const [admin, setAdmin] = useState('');
    const [employee, setEmployee] = useState('');
    const [read, setRead] = useState('');
    const [write, setWrite] = useState('');

    let navigate = useNavigate();

    const changeUserNameHandler = (event) => {
        setUserName(event.target.value);
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const changeConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    }

    const changeLastNameHandler = (event) => {
        setLastName(event.target.value);
    }

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const changeAdminHandler = (event) => {
        setAdmin('Y');
        setRead('');
        setWrite('');
        document.getElementById("READ").disabled = true;
        document.getElementById("READ").checked = false;
        document.getElementById("WRITE").disabled = true;
        document.getElementById("WRITE").checked = false;
    }

    const changeEmployeeHandler = (event) => {
        document.getElementById("READ").disabled = false;
        document.getElementById("WRITE").disabled = false;
        setEmployee(event.target.value);
    }

    const changeReadHandler = (event) => {
        setRead('Y');
        setAdmin('');
    }

    const changeWriteHandler = (event) => {
        setWrite('Y');
        setAdmin('');
    }

    const create = (e) => {
        e.preventDefault();

        const newRole = [];

        if (admin != '') {
            newRole.push("ADMIN_PRIVILEGE");
        } else if (employee != undefined) {
            if (read != '') {
                newRole.push("READ_PRIVILEGE");
            }
            if (write != '') {
                newRole.push("WRITE_PRIVILEGE");
            }
        }

        let userPayload = {
            user: {
                username: username, password: password, confirmPassword: confirmPassword,
                firstname: firstname, lastname: lastname, emailAddress: emailAddress,
                roles: newRole
            }
        };
        console.log(JSON.stringify(userPayload));
        console.log(jsToken);
        UserService.createUser(JSON.stringify(userPayload), jsToken)
            .then(res => {
                if (res.status == '201') {
                    alert(res.data.message);
                } else {
                    alert("Issue occurred while creating User!");
                }
            });
    }

    const cancel = (e) => {
        navigate('/');
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-10">
                        <h3 className="text-center">{props.operation}</h3>

                        <div className="card-body">

                            <form>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label> User Name: </label>
                                            <input placeholder="user name" name="username" className="form-control"
                                                value={username} onChange={changeUserNameHandler} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label> First Name: </label>
                                            <input placeholder="first name" name="firstname" className="form-control"
                                                value={firstname} onChange={changeFirstNameHandler} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <Row>
                                                <Col>
                                                    <label> User Type: </label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <input type="radio" value={admin} name="userType" onChange={changeAdminHandler} /> Admin
                                                    <input type="radio" value={employee} name="userType" onChange={changeEmployeeHandler} style={{ marginLeft: "10px" }} /> Employee
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label> Password: </label>
                                            <input type="password" placeholder="password" name="password" className="form-control"
                                                value={password} onChange={changePasswordHandler} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="last name" name="lastname" className="form-control"
                                                value={lastname} onChange={changeLastNameHandler} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <Row>
                                                <Col>
                                                    <label> Role: </label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <input type="checkbox" value={read} name="read" id="READ" onChange={changeReadHandler} /> READ
                                                    <input type="checkbox" value={write} name="write" id="WRITE" onChange={changeWriteHandler} style={{ marginLeft: "10px" }} /> WRITE
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label> Confirm Password: </label>
                                            <input type="password" placeholder="confirmPassword" name="confirm password" className="form-control"
                                                value={confirmPassword} onChange={changeConfirmPasswordHandler} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label> Email Id: </label>
                                            <input type="email" placeholder="emailAddress" name="email" className="form-control"
                                                value={emailAddress} onChange={changeEmailHandler} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <Row>
                                                <Col>
                                                    <label> </label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>

                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <br/>
                                <button disabled={disable} className="btn btn-success" onClick={create}>Create User</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>

                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )

}
export default UserCreateComponent;