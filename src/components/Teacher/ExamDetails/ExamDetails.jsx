import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ExamDetails() {
  const { id } = useParams();  
  const [error, setError] = useState(null);

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
      console.error(err);
    }
  };

  return (
    <div className="container mt-5 text-dark">
      <h2>Exam Results</h2>
      {error && <p>{error}</p>}
      <button className="btn btn-primary" onClick={downloadExamResults}>
        Download Results as Excel
      </button>
    </div>
  );
}
