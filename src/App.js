// App.js
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './components/Teacher/signup/signup';
import StudentDashboard from './components/student/StudentDashboard';
import Login from './components/Teacher/Login/Login';
import CreateExam from './components/Teacher/createExam/CreateExam'
import DashboardHome from './components/Teacher/DashboardHome/DashboardHome';
import Layout from './components/Layout';
import { jwtDecode } from 'jwt-decode';
const App = () => {
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setUserData(decodedToken);
  }

  const routers = createBrowserRouter([
    {
      path: '/', 
      element: <Layout userData={userData} />,
      children: [
        { path: '/', element: <DashboardHome userData={userData} /> }, 
        { path: '/signup', element: <SignUp /> },
        { path: '/student', element: <StudentDashboard /> },
        { path: '/login', element: <Login saveUserData={saveUserData} /> },
        { path: '/createExam', element: <CreateExam /> }  // Correct usage of CreateExam
      ]
    }
  ]);

  return <RouterProvider router={routers} />;
};

export default App;
