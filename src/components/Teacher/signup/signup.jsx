import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Teacherimg from '../../../assets/Teacher.png';
import { Link } from 'react-router-dom';


const SignUp = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" id='signup'>
      <div className="card p-4 shadow">
        <div className="text-center mb-4">
          <img src={Teacherimg} alt="Avatar" className="rounded-circle" width="100" />
        </div>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form>
          <div className="form-group mb-3">
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="form-group mb-3">
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="form-group mb-3">
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          <div className="form-group mb-4">
            <input type="password" className="form-control" placeholder="Confirm Password" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/teacher">Already have an account? Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
