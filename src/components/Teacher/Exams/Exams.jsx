import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Exams.css';

const Exams = ({ userData }) => {  // استقبال userData كـ prop
  const [exams, setExams] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/getExamsCreatedByUser', {
          headers: {
            authorization: token
          }
        });
        setExams(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching exams');
      }
    };

    if (token) {
      fetchExams();
    } else {
      setError('No token found');
    }
  }, [token, userData]);  // إضافة userData هنا

  const handleDelete = async (examId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/exams/${examId}`, {
        headers: {
          authorization: token
        }
      });
      setExams(exams.filter(exam => exam.id !== examId));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting exam');
    }
  };

  return (
    <div className='exams-container'>
      {error && <p>Error: {error}</p>}
      <h2 className='text-dark m-5'>Exams Created by You:</h2>
      <div className='cards-container'>
        {exams.length > 0 ? (
          exams.map(exam => (
            <div key={exam.id} className='card'>
              <div className='card-inner'>
                <div className='card-front'>
                  <button className='delete-button' onClick={() => handleDelete(exam.id)}>x</button>
                  <h3>{exam.title}</h3>
                </div>
                <div className='card-back'>
                  <button className='delete-button' onClick={() => handleDelete(exam.id)}>x</button>
                  <p>{exam.description}</p>
                  <p>Status: {exam.is_open ? 'Open' : 'Closed'}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No exams found.</p>
        )}
      </div>
      <Link to="/create-exam" className='create-button'>Create New Exam +</Link> 
    </div>
  );
};

export default Exams;
