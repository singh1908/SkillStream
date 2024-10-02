import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Student = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/quiz/attempt');
        setQuestions(res.data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        alert('Failed to fetch questions. Please try again later.');
      }
    };

    fetchQuestions();
  }, []);

  // Timer logic
  useEffect(() => {
    if (timer > 0 && !isAnswered) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !isAnswered) {
      setIsAnswered(true);
    }
  }, [timer, isAnswered]);

  const handleOptionClick = (index) => {
    if (isAnswered) return; // Prevent multiple selections
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimer(10);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimer(10);
    setScore(0);
  };

  if (questions.length === 0) {
    return (
      <div className="bg-white p-8 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4">Student: Take the Quiz</h2>
        <p>No questions available. Please ask the teacher to add questions.</p>
      </div>
    );
  }

  if (currentQuestion >= questions.length) {
    return (
      <div className="bg-white p-8 shadow-lg rounded-md text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="mb-4">Your Score: {score} / {questions.length}</p>
        <button
          onClick={restartQuiz}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white p-8 shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Student: Take the Quiz</h2>
      <div className="mb-4">
        <span className="font-bold">Question {currentQuestion + 1} of {questions.length}</span>
      </div>
      <h3 className="text-xl mb-6">{currentQ.question}</h3>
      <ul className="space-y-2">
        {currentQ.options.map((option, index) => {
          let optionClass = 'p-2 rounded cursor-pointer text-white';
          if (isAnswered) {
            if (index === currentQ.answer) {
              optionClass += ' bg-green-500';
            } else if (index === selectedOption) {
              optionClass += ' bg-red-500';
            } else {
              optionClass += ' bg-gray-400';
            }
          } else {
            optionClass += ' bg-blue-500 hover:bg-blue-700';
          }

          return (
            <li
              key={index}
              onClick={() => handleOptionClick(index)}
              className={optionClass}
            >
              {option}
            </li>
          );
        })}
      </ul>
      {!isAnswered ? (
        <div className="mt-4 text-red-500 font-bold">Time left: {timer} seconds</div>
      ) : (
        <button
          onClick={nextQuestion}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Student;