import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ExamDetails.css'; 

export default function ExamDetails() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      const token = localStorage.getItem('userToken');
      try {
        const response = await axios.get(`http://localhost:3000/api/admin/getExamsCreatedByUser`, {
          headers: {
            authorization: token
          }
        });
    
        

        const examData = response.data.find(exam => exam.id === id);
        if (examData) {
          setExam(examData);
        } else {
          setError('Exam not found');
          toast.error('Exam not found');
        }
      } catch (err) {
        setError('Error fetching exam details');
        toast.error('Error fetching exam details');
        console.error(err);
      }
    };

    fetchExamDetails();
  }, [id]);

  const downloadExamResults = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/exams/${id}/results`, {
        responseType: 'blob',
        headers: {
          authorization: token
        }
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `exam_${id}_results.xlsx`;
      link.click();
    } catch (err) {
      setError('Error downloading exam results');
      toast.error('Error downloading exam results');
      console.error(err);
    }
  };

  const openExam = async () => {
    const token = localStorage.getItem('userToken');
    try {
      await axios.put('http://localhost:3000/api/admin/exams/open', { examId: id }, {
        headers: {
          authorization: token
        }
      });
      setExam(prevExam => ({ ...prevExam, is_open: true }));
      toast.success('Exam opened successfully');
    } catch (err) {
      toast.error('Error opening exam');
      console.error(err);
    }
  };

  const closeExam = async () => {
    const token = localStorage.getItem('userToken');
    try {
      await axios.put('http://localhost:3000/api/admin/exams/close', { examId: id }, {
        headers: {
          authorization: token
        }
      });
      setExam(prevExam => ({ ...prevExam, is_open: false }));
      toast.success('Exam closed successfully');
    } catch (err) {
      toast.error('Error closing exam');
      console.error(err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!exam) {
    return <p>Loading exam details...</p>;
  }

  return (
    <div className="exam-details-container container mt-5 text-dark">
      <h2 className="text-center">Exam Details</h2>
      <div className="exam-info">
        <p>{exam.title}</p>
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Status:</strong> {exam.is_open ? 'Open' : 'Closed'}</p>
      </div>
      <button className="download-btn" onClick={downloadExamResults}>
        Download Results as Excel
      </button>
      <button
        className="open-btn"
        onClick={openExam}
        disabled={exam.is_open}
      >
        Open Exam
      </button>
      <button
        className="close-btn"
        onClick={closeExam}
        disabled={!exam.is_open}
      >
        Close Exam
      </button>
      <ToastContainer />
    </div>
  );
}
