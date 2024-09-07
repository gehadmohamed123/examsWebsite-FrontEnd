import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; 
import Teacherimg from '../../../assets/Teacher.png';
import { Link, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import SignUp from '../signup/signup';

const Login = ({saveUserData}) => {
  let navigate= useNavigate();
  const [error, setError] = useState ('');
  const[errorList, seterrorList] = useState([]);
  const [isLoading , setisLoading] = useState(false);
  const [user , setUser] = useState({
    email :'',
    password:''
  })

  function getUserData(eventInfo){
    let myUser = {...user};
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
  }

  async function sendLoginDataToApi() {
    try {
      let { data } = await axios.post(`http://localhost:3000/api/auth/Login`, user);
      if (data.token.length>0) {
        setisLoading(false);
        localStorage.setItem('userToken' , data.token);
        saveUserData();
        navigate('/createExam');
      } else {
        setisLoading(false);
        setError(data.message || 'An error occurred during registration');
      }
    } catch (error) {
      setisLoading(false);
      if (error.response && error.response.status === 400) {
        setError(error.response.data || 'Email already exists');
      } else {
        setError('An error occurred during registration');
      }
    }
  }

  function submitLoginForm(e) {
    setisLoading(true);
    e.preventDefault();
  
    // Get the result of the validation
    const validation = validateLoginForm();
  
    // Check if validation result contains an error
    if (validation.error) {
      setisLoading(false);
      seterrorList(validation.error.details);
    } else {
      setisLoading(false);
      sendLoginDataToApi();
    }
  }

  function validateLoginForm() {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/), 
    });
  
    return schema.validate(user , {abortEarly: false});
  }
  

  return (<>
  {errorList.map((err,index)=>{
    if(err.context.label === 'password'){
    return<div key={index} className='alert alert-danger my-2'>Password invalid</div>
    }else{
      return <div key={index} className='alert alert-danger my-2'>{err.message}</div>
    }
  })}
   {error.length > 0 ? <div className='alert alert-danger my-2'>{error}</div> : ''}

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
          <button type="submit" className="btn btn-primary btn-block">{isLoading === true? <i className='fas fa-spinner sa-spin'></i> : 'Login'}</button>
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

export default Login;


