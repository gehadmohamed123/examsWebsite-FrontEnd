import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentDashboard from './student/StudentDashboard';
import TeacherDashboard from './Teacher/TeacherDashboard';
import './Dashboard.css';
import Studentimg from '../assets/student logo.png';
import Teacherimg from '../assets/Teacher.png';
import SignUp from './Teacher/signup/signup';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container">
          <Link to="/" className="navbar-brand">TestTrek</Link>
        </div>
      </nav>

      <Routes>
      <Route path="/signup" element={<SignUp/>} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/" element={
          <div className="container my-5 text-center">
            <h1 className='text-dark'>Welcome to TestTrek!</h1>
            <h2 className='text-dark'>I am</h2>
            <div className="role-selection">
              <Link to="/student" className="role-card">
                <img src={Studentimg} alt="Student" />
                <h3 className='text-dark'>a student</h3>
                <p className='text-dark'> to participate in fun classroom activities</p>
              </Link>
              <Link to="/teacher" className="role-card">
                <img src={Teacherimg} alt="Teacher" />
                <h3 className='text-dark'>a teacher</h3>
                <p className='text-dark'>to instruct, engage, and assess my students</p>
              </Link>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default Dashboard;
