import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import EmployeeSkillCreateComponent from './components/EmployeeSkillCreateComponent';
import LoginComponent from './components/LoginComponent';
import UserCreateComponent from './components/UserCreateComponent';
import UserRegisterComponent from './components/UserRegisterComponent';
import EmployeeSkillListComponent from './components/EmployeeSkillListComponent';
import EmployeeSkillSearchComponent from './components/EmployeeSkillSearchComponent';

function App() {

  return (
    <div>
      <Router>
        <HeaderComponent />
        <div style={{ margin: "2%" }}>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/create-employee-skill" element={<EmployeeSkillCreateComponent operation="Create" />} />
            <Route path="/update-employee-skill" element={<EmployeeSkillCreateComponent operation="Update" />} />
            <Route path="/search-employee-skill" element={<EmployeeSkillSearchComponent />} />
            <Route path="/list-employee-skill" element={<EmployeeSkillListComponent />} />
            <Route path="/admin" element={<UserCreateComponent operation="Create User" />} />
            <Route path="/signup" element={<UserRegisterComponent />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;