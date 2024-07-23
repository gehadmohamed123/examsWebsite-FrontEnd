import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; 
import Teacherimg from '../../assets/Teacher.png';
import { Link, Routes, Route} from 'react-router-dom';
import SignUp from './signup/signup';

const TeacherDashboard = () => {
  return (<>
    <Routes>
    
    </Routes>
    <div className="container d-flex justify-content-center align-items-center min-vh-100" id='login'>
      <div className="card p-4 shadow">
        <div className="text-center mb-4">
          <img src={Teacherimg} alt="Avatar" className="rounded-circle" width="100" />
        </div>
        <h2 className="text-center mb-4">Sign In</h2>
        <form>
          <div className="form-group mb-3">
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="form-group mb-4">
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
        <div className="text-center mt-3">
          <a href="#">Forget Password</a>
        </div>
        <div className="text-center mt-3">
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
    </>);
};

export default TeacherDashboard;


