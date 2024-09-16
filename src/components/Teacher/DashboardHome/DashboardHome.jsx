import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Studentimg from '../../../assets/student logo.png';
import Teacherimg from '../../../assets/Teacher.png';
import './DashboardHome.css';

const DashboardHome = () => {
  const navigate = useNavigate();

  const handleTeacherClick = () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      navigate('/exams');
    } else {
      navigate('/login');
    }
  };

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

        
        <div onClick={handleTeacherClick} className="role-card" style={{ cursor: 'pointer' }}>
          <img src={Teacherimg} alt="Teacher" />
          <h3 className='text-dark'>a teacher</h3>
          <p className='text-dark'>to instruct, engage, and assess my students</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
