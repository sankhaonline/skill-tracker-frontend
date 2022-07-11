import { Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import SkillTrackerService from '../services/SkillTrackerService';
import { useNavigate, useLocation } from "react-router-dom";

const EmployeeSkillCreateComponent = (props) => {

    const location = useLocation();

    useEffect(() => {
        console.log("pathname:  " + location.pathname);
        console.log(location.state.jsToken);
        setId(location.state.id);
        setJsToken(location.state.jsToken);
        setUserName(location.state.userName);
        setRoles(location.state.roles);
        setOperation(location.state.operation);

        if (props.operation === "Update") {
            SkillTrackerService.getEmployeeById(id, jsToken)
                .then(res => {
                    console.log(res.data);
                    let employee = res.data[0];
                    setId(employee.id);
                    setFirstName(employee.firstName);
                    setLastName(employee.lastName);
                    setEmail(employee.email);
                    setMobile(employee.mobile);
                    setHtmlCssJavascript(employee.htmlCssJavascript);
                    setAngular(employee.angular);
                    setReact(employee.react);
                    setSpring(employee.spring);
                    setRestful(employee.restful);
                    setHibernate(employee.hibernate);
                    setGit(employee.git);
                    setDocker(employee.docker);
                    setJenkins(employee.jenkins);
                    setAws(employee.aws);
                    setSpoken(employee.spoken);
                    setCommunication(employee.communication);
                    setAptitude(employee.aptitude);
                });
        }

        if (roles.includes("WRITE_PRIVILEGE") && (operation === "Create" || operation === "Update")) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [location]);

    const [id, setId] = useState(location.state.id);
    const [disable, setDisable] = useState('');
    const [userName, setUserName] = useState(location.state.userName);
    const [roles, setRoles] = useState(location.state.roles);
    const [operation, setOperation] = useState(location.state.operation);
    const [jsToken, setJsToken] = useState(location.state.jsToken);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [htmlCssJavascript, setHtmlCssJavascript] = useState('');
    const [angular, setAngular] = useState('');
    const [react, setReact] = useState('');
    const [spring, setSpring] = useState('');
    const [restful, setRestful] = useState('');
    const [hibernate, setHibernate] = useState('');
    const [git, setGit] = useState('');
    const [docker, setDocker] = useState('');
    const [jenkins, setJenkins] = useState('');
    const [aws, setAws] = useState('');
    const [spoken, setSpoken] = useState('');
    const [communication, setCommunication] = useState('');
    const [aptitude, setAptitude] = useState('');

    let navigate = useNavigate();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = {
            'id': id, 'firstName': firstName, 'lastName': lastName, 'email': email, 'mobile': mobile,
            'htmlCssJavascript': htmlCssJavascript, 'angular': angular, 'react': react, 'spring': spring,
            'restful': restful, 'hibernate': hibernate, 'git': git, 'docker': docker, 'aws': aws,
            'jenkins': jenkins, 'spoken': spoken, 'communication': communication, 'aptitude': aptitude
        };
        console.log('employee => ' + JSON.stringify(employee));

        if (props.operation === 'Update') {
            SkillTrackerService.updateEmployee(employee, id, jsToken)
                .then(res => {
                    console.log("Response Received: " + JSON.stringify(res.data));
                    navigate('/list-employee-skill', {
                        state: {
                            jsToken: jsToken,
                            userName: userName,
                            roles: roles
                        }
                    });
                });
        } else {
            SkillTrackerService.createEmployee(employee, jsToken)
                .then(res => {
                    console.log("Response Received: " + JSON.stringify(res.data));
                    navigate('/list-employee-skill', {
                        state: {
                            jsToken: jsToken,
                            userName: userName,
                            roles: roles
                        }
                    });
                });
        }
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

    const changeMobileHandler = (event) => {
        setMobile(event.target.value);
    }

    const changeHtmlCssJavascriptHandler = (event) => {
        setHtmlCssJavascript(event.target.value);
    }

    const changeAngularHandler = (event) => {
        setAngular(event.target.value);
    }

    const changeReactHandler = (event) => {
        setReact(event.target.value);
    }

    const changeSpringHandler = (event) => {
        setSpring(event.target.value);
    }

    const changerRestfulHandler = (event) => {
        setRestful(event.target.value);
    }

    const changeHibernateHandler = (event) => {
        setHibernate(event.target.value);
    }

    const changeGitHandler = (event) => {
        setGit(event.target.value);
    }

    const changeDockerHandler = (event) => {
        setDocker(event.target.value);
    }

    const changeJenkinsHandler = (event) => {
        setJenkins(event.target.value);
    }

    const changeAwsHandler = (event) => {
        setAws(event.target.value);
    }

    const changeSpokenHandler = (event) => {
        setSpoken(event.target.value);
    }

    const changeCommunicationHandler = (event) => {
        setCommunication(event.target.value);
    }

    const changeAptitudeHandler = (event) => {
        setAptitude(event.target.value);
    }

    const cancel = (event) => {
        navigate('/list-employee-skill', {
            state: {
                jsToken: jsToken,
                userName: userName,
                roles: roles
            }
        });
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-10">
                        <h3 className="text-center">{operation} Employee</h3>
                        <div className="card-body">
                            <form>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label> First Name: </label>
                                            <input disabled={disable} placeholder="First Name" name="firstName" className="form-control"
                                                value={firstName} onChange={changeFirstNameHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label> Last Name: </label>
                                            <input disabled={disable} placeholder="Last Name" name="lastName" className="form-control"
                                                value={lastName} onChange={changeLastNameHandler} required />
                                        </div>
                                        <div className="form-group">
                                            <label> Email Id: </label>
                                            <input disabled={disable} placeholder="Email Address" name="email" className="form-control"
                                                value={email} onChange={changeEmailHandler} required />
                                        </div>
                                        <div className="form-group">
                                            <label> Mobile Number: </label>
                                            <input disabled={disable} placeholder="Mobile Number" name="mobile" className="form-control"
                                                value={mobile} onChange={changeMobileHandler} required />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> HTML-CSS-JAVASCRIPT: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="htmlCssJavascript" className="form-control"
                                                    value={htmlCssJavascript} onChange={changeHtmlCssJavascriptHandler} required /></Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> ANGULAR: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="angular" className="form-control"
                                                    value={angular} onChange={changeAngularHandler} required /></Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> REACT: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="react" className="form-control"
                                                    value={react} onChange={changeReactHandler} required /></Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> SPRING: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="spring" className="form-control"
                                                    value={spring} onChange={changeSpringHandler} required /></Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> RESTFUL: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="restful" className="form-control"
                                                    value={restful} onChange={changerRestfulHandler} required /></Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> HIBERNATE: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="hibernate" className="form-control"
                                                    value={hibernate} onChange={changeHibernateHandler} required /></Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> GIT: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="git" className="form-control"
                                                    value={git} onChange={changeGitHandler} required /></Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> DOCKER: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="docker" className="form-control"
                                                    value={docker} onChange={changeDockerHandler} required /></Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> JENKINS: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="jenkins" className="form-control"
                                                    value={jenkins} onChange={changeJenkinsHandler} required /></Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> AWS: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="aws" className="form-control"
                                                    value={aws} onChange={changeAwsHandler} required /></Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> SPOKEN: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="spoken" className="form-control"
                                                    value={spoken} onChange={changeSpokenHandler} required /></Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> COMMUNICATION: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="communication" className="form-control"
                                                    value={communication} onChange={changeCommunicationHandler} required /></Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <Row>
                                                <Col><label> APTITUDE: </label></Col>
                                                <Col><input disabled={disable} placeholder="0-20" name="aptitude" className="form-control"
                                                    value={aptitude} onChange={changeAptitudeHandler} required /></Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <button disabled={disable} className="btn btn-success" onClick={saveOrUpdateEmployee}>Save</button>
                                <button className="btn btn-danger" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>

                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default EmployeeSkillCreateComponent;