import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentDashboard.css';
import Confetti from 'react-confetti';

const StudentDashboard = () => {
  const [examId, setExamId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [examData, setExamData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setExamId(e.target.value);
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const notifySuccess = () => toast.success("Exam submitted successfully!");
  const notifyError = (message) => toast.error(message);

  const fetchExamData = async () => {
    if (!examId.trim()) {
      notifyError('Exam ID cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);
    console.log("Fetching exam data for ID:", examId);

    try {
      const response = await axios.get(`http://localhost:3000/api/student/exams/${examId}`);
      console.log("API Response:", response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        setExamData(response.data);
        setResponses({});
        console.log("Updated examData:", response.data);
      } else {
        notifyError('No questions found for this exam.');
      }
    } catch (err) {
      console.error("API Error:", err);
      // Show error message from backend if available
      if (err.response && err.response.data) {
        notifyError(err.response.data);
      } else {
        notifyError('Could not retrieve exam data. Please check the exam ID.');
      }
    }
    setLoading(false);
  };

  const handleAnswerChange = (questionId, answerId) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: answerId
    }));
  };

  const handleSubmit = async () => {
    if (!studentId.trim()) {
      notifyError('Student ID cannot be empty.');
      return;
    }

    const answersArray = Object.keys(responses).map((questionId) => ({
      question_id: questionId,
      answer_id: responses[questionId],
    }));

    const requestBody = {
      examId,
      studentId,
      answers: answersArray,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/student/submit-answer', requestBody);
      console.log("Submission Response:", response.data);

      if (response.data.message) {
        if (response.data.message.includes('Answer for question')) {
          notifyError('You have already submitted this exam.');
        } else {
          notifySuccess('Exam submitted successfully!');
          setSubmitted(true);
        }
      } else {
        notifySuccess('Exam submitted successfully!');
        setSubmitted(true); // Hide questions and show success message
      }
    } catch (err) {
      console.error("Submission Error:", err);

      // Show specific error message from backend if available
      if (err.response && err.response.data) {
        notifyError(err.response.data);
      } else {
        notifyError('Submission failed. Please try again.');
      }
    }
  };

  return (
    <div className="container my-5">
      <h1 className='text-dark mb-4'>Welcome, Student!</h1>

      {examData.length === 0 && !submitted && (
        <div className="form-group">
          <label htmlFor="studentId">Enter Student Name</label>
          <input
            type="text"
            className="form-control"
            id="studentId"
            value={studentId}
            onChange={handleStudentIdChange}
            placeholder="Enter Student Name"
          />
          <label htmlFor="examId" className="mt-3">Enter Exam ID</label>
          <input
            type="text"
            className="form-control"
            id="examId"
            value={examId}
            onChange={handleInputChange}
            placeholder="Enter Exam ID"
          />
          <button className="btn btn-outline-primary mt-3" onClick={fetchExamData}>
            <i className="fas fa-sync"></i> Load Exam
          </button>
        </div>
      )}

      {loading && (
        <div className="spinner-border text-primary mt-3" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {error && <p className="text-danger mt-3">{error}</p>}

      {!submitted && examData.length > 0 && (
        <div className="mt-4 text-dark">
          {examData.map((exam, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={exam.question_id}
              className="question-card fade-in"
            >
              <h2 className="question-header">Question {index + 1}</h2>
              <p>{exam.question_text}</p>
              {exam.answers && exam.answers.length > 0 ? (
                <div>
                  {exam.answers.map((answer) => (
                    <div
                      key={answer.answer_id}
                      className="answer-option"
                      onClick={() => handleAnswerChange(exam.question_id, answer.answer_id)}
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`question-${exam.question_id}`}
                        id={`answer-${answer.answer_id}`}
                        value={answer.answer_id}
                        checked={responses[exam.question_id] === answer.answer_id}
                        onChange={() => handleAnswerChange(exam.question_id, answer.answer_id)}
                      />
                      <label className="form-check-label" htmlFor={`answer-${answer.answer_id}`}>
                        {answer.answer_text || 'No answer available'}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No answers available</p>
              )}
            </motion.div>
          ))}
          <button className="btn btn-outline-primary mt-4" onClick={handleSubmit}>
            <i className="fas fa-paper-plane"></i> Submit
          </button>
        </div>
      )}
      {submitted && (
        <>
          <motion.div
            className="success-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-success">Submission Successful!</h2>
          </motion.div>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
          />
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default StudentDashboard;