import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/getExamsCreatedByUser', {
          headers: {
            authorization:  token
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
  }, [token]);

  return (
    <div className='text-dark
  '>
      {error && <p>Error: {error}</p>}
      <h2>Exams Created by You</h2>
      <ul>
        {exams.length > 0 ? (
          exams.map(exam => (
            <li key={exam.id}>
              <strong>{exam.title}</strong><br />
              Description: {exam.description}<br />
              Status: {exam.is_open ? 'Open' : 'Closed'}
            </li>
          ))
        ) : (
          <p>No exams found.</p>
        )}
      </ul>
    </div>
  );
};

export default Exams;
