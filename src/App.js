import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './components/Teacher/signup/signup';
import StudentDashboard from './components/student/StudentDashboard';
import Login from './components/Teacher/Login/Login';
import DashboardHome from './components/Teacher/DashboardHome/DashboardHome';
import Layout from './components/Layout';
import { jwtDecode } from 'jwt-decode';
import Exams from './components/Teacher/Exams/Exams';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    if (encodedToken) {
      let decodedToken = jwtDecode(encodedToken);
      console.log(decodedToken);
      setUserData(decodedToken); // تحديث حالة userData هنا
    }
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
        { path: '/exams', element: <ProtectedRoute userData={userData}><Exams userData={userData} /></ProtectedRoute> } // تمرير userData إلى Exams
      ]
    }
  ]);

  return <RouterProvider router={routers} />;
};

export default App;
