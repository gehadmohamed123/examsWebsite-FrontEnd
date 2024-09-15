import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Layout = ({userData}) => {
  return (
    <div className="dashboard">
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container">
          <Link to="/" className="navbar-brand">TestTrek</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
