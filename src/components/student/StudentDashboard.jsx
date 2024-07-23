import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [examData, setExamData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/student/exams');
      setExamData(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container my-5">
      <h1 className='text-dark'>Welcome, Student!</h1>
      {error && <p className="text-danger mt-3">{error}</p>}
      {examData.length > 0 ? (
        <div className="mt-4">
          {examData.map((exam, index) => (
            <div key={index} className="mb-4">
              <h2>Question {index + 1}</h2>
              <p>{exam.question_text}</p>
              <ul>
                {exam.answers.map((answer) => (
                  <li key={answer.answer_id}>
                    {answer.answer_text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading exam questions...</p>
      )}
    </div>
  );
};

export default StudentDashboard;





