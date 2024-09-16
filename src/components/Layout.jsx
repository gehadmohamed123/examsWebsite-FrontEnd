import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ userData, setUserData }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userToken');
    if (typeof setUserData === 'function') {
      setUserData(null); 
    }
    navigate('/login'); 
  };

  return (
    <div className="dashboard">
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="navbar-brand">TestTrek</Link>

          <ul className='list-unstyled d-flex m-0 align-items-center'>
            {userData ? (
              ''
            ) : (
              <li className='p-2'>
                <Link to="/login" style={{ color: 'white', textDecoration:'none' }}>LogOut</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      
      <Outlet />
    </div>
  );
};

export default Layout;
