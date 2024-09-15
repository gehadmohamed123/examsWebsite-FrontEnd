import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateExam.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateExam() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      question_text: '',
      answers: [
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false }
      ]
    }
  ]);

  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[aIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: '',
        answers: [
          { answer_text: '', is_correct: false },
          { answer_text: '', is_correct: false },
          { answer_text: '', is_correct: false },
          { answer_text: '', is_correct: false }
        ]
      }
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const examData = {
      title,
      description,
      questions
    };
  
    const token = localStorage.getItem('userToken');
  
    try {
      await axios.post('http://localhost:3000/api/admin/add-exam', examData, {
        headers: {
          authorization: token
        }
      });
      
      toast.success('Exam created successfully!');
  
      setTimeout(() => {
        navigate('/exams'); 
      }, 3000);
    } catch (error) {
      console.error('Error creating exam', error);
      toast.error('Failed to create exam. Please try again.');
    }
  };
  

  return (
    <div className="container-create">
      <h3 className='text-dark text-center'>Create New Exam</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {questions.map((question, qIndex) => (
          <div key={qIndex} className="question-block text-dark">
            <h4>
              Question {qIndex + 1} 
              <button type="button" className="remove-question" onClick={() => removeQuestion(qIndex)}>X</button>
            </h4>
            <input
              type="text"
              placeholder="Question Text"
              value={question.question_text}
              onChange={(e) =>
                handleQuestionChange(qIndex, 'question_text', e.target.value)
              }
              required
            />

            {question.answers.map((answer, aIndex) => (
              <div key={aIndex} className="answer-block">
                <input
                  type="text"
                  placeholder={`Answer ${aIndex + 1}`}
                  value={answer.answer_text}
                  onChange={(e) =>
                    handleAnswerChange(qIndex, aIndex, 'answer_text', e.target.value)
                  }
                  required
                />
                <label>
                  <input
                    type="checkbox"
                    checked={answer.is_correct}
                    onChange={(e) =>
                      handleAnswerChange(qIndex, aIndex, 'is_correct', e.target.checked)
                    }
                  />
                  Correct
                </label>
              </div>
            ))}
          </div>
        ))}

        <button type="button" className="add-question" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit">Save</button>
      </form>
      <ToastContainer />
    </div>
  );
}
