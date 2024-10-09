import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCamera } from "./CameraContext";

function TestStart() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await axios.get('http://localhost:8080/api/quizzes');
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, []);

   // camera access
   const { videoStream } = useCamera();
   const videoRef = useRef(null);
 
   useEffect(() => {
     if (videoStream && videoRef.current) {
       videoRef.current.srcObject = videoStream;
     }
   }, [videoStream]);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Available Quizzes</h1>
      {quizzes.map((quiz) => (
        <div key={quiz._id} className="border p-4 my-4 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-semibold mb-2">{quiz.subject}</h2>
          <p className="mb-2">Total Questions: {quiz.questions.length}</p>
          <Link to={`/quiz/${quiz._id}`} className="bg-blue-500 text-white p-2 rounded">Start Quiz</Link>
        </div>
      ))}

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
  );
}

export default TestStart;
