import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]); 

  const logout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false); 
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
            {isLoggedIn && (
              <li className='p-2'>
                <span onClick={logout} style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}>LogOut</span>
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
