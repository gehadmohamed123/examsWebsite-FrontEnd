// DashboardHome.js
import React from 'react';
import { Link } from 'react-router-dom';
import Studentimg from '../../../assets/student logo.png';
import Teacherimg from '../../../assets/Teacher.png';
import'./DashboardHome.css'

const DashboardHome = (userData) => {
  return (
    <div className="container my-5 text-center">
      <h1 className='text-dark'>Welcome to TestTrek!</h1>
      <h2 className='text-dark'>I am</h2>
      <div className="role-selection">
        <Link to="/student" className="role-card">
          <img src={Studentimg} alt="Student" />
          <h3 className='text-dark'>a student</h3>
          <p className='text-dark'>to participate in fun classroom activities</p>
        </Link>
        <Link to="/login" className="role-card">
          <img src={Teacherimg} alt="Teacher" />
          <h3 className='text-dark'>a teacher</h3>
          <p className='text-dark'>to instruct, engage, and assess my students</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
