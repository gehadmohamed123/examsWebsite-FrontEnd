import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; 
import Teacherimg from '../../../assets/Teacher.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';

const Login = ({ saveUserData }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
  }

  async function sendLoginDataToApi() {
    try {
      let { data } = await axios.post('http://localhost:3000/api/auth/Login', user);
      if (data.token && data.token.length > 0) {
        setIsLoading(false);
        localStorage.setItem('userToken', data.token);
        saveUserData();
        navigate('/exams');
      } else {
        setIsLoading(false);
        setError(data.message || 'An error occurred during registration');
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 400) {
        setError(error.response.data || 'Email already exists');
      } else {
        setError('An error occurred during registration');
      }
    }
  }

  function submitLoginForm(e) {
    e.preventDefault();
    setIsLoading(true);

    const validation = validateLoginForm();

    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      sendLoginDataToApi();
    }
  }

  function validateLoginForm() {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().min(6).required(),
    });

    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      {errorList.map((err, index) => (
        <div key={index} className='alert alert-danger my-2'>
          {err.context.label === 'password' ? 'Password invalid' : err.message}
        </div>
      ))}
      {error.length > 0 && <div className='alert alert-danger my-2'>{error}</div>}
      
      <div className="container d-flex justify-content-center align-items-center min-vh-100" id='login'>
        <div className="card p-4 shadow">
          <div className="text-center mb-4">
            <img src={Teacherimg} alt="Avatar" className="rounded-circle" width="100" />
          </div>
          <h2 className="text-center mb-4">Sign In</h2>
          <form onSubmit={submitLoginForm}>
            <div className="form-group mb-3">
              <input name='email' onChange={getUserData} type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group mb-4">
              <input name='password' onChange={getUserData} type="password" className="form-control" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
            </button>
          </form>
          <div className="text-center mt-3">
            <a href="#">Forget Password</a>
          </div>
          <div className="text-center mt-3">
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
