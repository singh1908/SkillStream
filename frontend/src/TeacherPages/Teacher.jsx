import React, { useState } from 'react';
import axios from 'axios';

const Teacher = () => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = async () => {
    // Validate inputs
    if (!questionText.trim()) {
      alert('Please enter a question.');
      return;
    }
    for (let i = 0; i < options.length; i++) {
      if (!options[i].trim()) {
        alert(`Please enter option ${i + 1}.`);
        return;
      }
    }
    if (correctOption === '') {
      alert('Please select the correct option.');
      return;
    }

    const newQuestion = {
      question: questionText,
      options: options,
      answer: parseInt(correctOption),
    };

    try {
      await axios.post('http://localhost:8080/api/quiz/add', newQuestion);
      alert('Question added successfully!');
      // Reset form
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectOption('');
    } catch (error) {
      console.error('Failed to add question:', error);
      alert('Failed to add question. Please try again.');
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6">Teacher: Add Questions</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Question:
        </label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="border rounded w-full py-2 px-3"
          placeholder="Enter your question here"
        />
      </div>
      {options.map((option, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Option {index + 1}:
          </label>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="border rounded w-full py-2 px-3"
            placeholder={`Enter option ${index + 1}`}
          />
        </div>
      ))}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Correct Option:
        </label>
        <select
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
          className="border rounded w-full py-2 px-3"
        >
          <option value="">Select correct option</option>
          {options.map((option, index) => (
            <option key={index} value={index}>
              Option {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddQuestion}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
      >
        Add Question
      </button>
    </div>
  );
};

export default Teacher;
