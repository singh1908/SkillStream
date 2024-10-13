import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCamera } from "./CameraContext";
import { Link } from "react-router-dom";

function Student() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds for each question

  // camera access
  const { videoStream } = useCamera();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/quizzes/${id}`
        );
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    if (!selectedOption) {
      // Allow selection only if no option is selected yet
      setSelectedOption(option);
      if (option === quiz.questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption("");
      setTimeLeft(10); // Reset timer for next question
    } else {
      setShowScore(true);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg relative">
      {showScore ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Score: {score} / {quiz.questions.length} </h1>
          <Link to="/attempt-quiz">
            <button className="bg-blue-500 text-white p-2 rounded">Back</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{quiz.subject}</h1>
            <div className="text-red-500 text-xl">
              Time Left: {timeLeft} seconds
            </div>
          </div>
          <div className="mb-4 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-2xl mb-2">
              {quiz.questions[currentQuestion].questionText}
            </h2>
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`w-full border p-2 my-2 rounded ${
                  selectedOption
                    ? option === quiz.questions[currentQuestion].correctAnswer
                      ? "bg-green-500"
                      : option === selectedOption
                      ? "bg-red-500"
                      : ""
                    : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Next Question
            </button>
          </div>

          {/* camera access */}
          {videoStream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute top-5 right-5 w-44"
            />
          ) : (
            <p>No video stream available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Student;
