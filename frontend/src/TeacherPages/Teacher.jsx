import React, { useState } from 'react';
import axios from 'axios';

function Teacher() {
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSubmit = async () => {
    await axios.post('http://localhost:8080/api/add-quiz', { subject, questions });
    alert('Quiz added successfully');
    // Reset the form
    setSubject('');
    setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Add Quiz</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      {questions.map((q, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
          <label className="block text-gray-700 text-sm font-bold mb-2">Question {index + 1}</label>
          <input
            type="text"
            placeholder="Question"
            value={q.questionText}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].questionText = e.target.value;
              setQuestions(newQuestions);
            }}
            className="w-full border rounded p-2 mb-2"
          />
          {q.options.map((option, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={option}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].options[i] = e.target.value;
                setQuestions(newQuestions);
              }}
              className="w-full border rounded p-2 mb-2"
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].correctAnswer = e.target.value;
              setQuestions(newQuestions);
            }}
            className="w-full border rounded p-2"
          />
        </div>
      ))}
      <div className="flex justify-between">
        <button onClick={handleAddQuestion} className="bg-blue-500 text-white p-2 rounded">Add Question</button>
        <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">Submit Quiz</button>
      </div>
    </div>
  );
}

export default Teacher;
