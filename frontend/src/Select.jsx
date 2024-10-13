import React from "react";
import { Link } from "react-router-dom";
import welcome from "./assets/welcome.jpg"

const Select = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="bg-white rounded-lg shadow-lg p-10 w-80">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to SkillStream
        </h1>
        <img src={welcome} alt="Welcome" className="mb-5"/>
        <div className="flex flex-col space-y-4 items-center">
          <Link to="/teacher-login">
          <button className="bg-blue-500 text-white py-3 w-60 rounded-md hover:bg-blue-600 transition">
            Teacher
          </button>
          </Link>
          <Link to="/student-login">
          <button className="bg-blue-500 text-white py-3 w-60 rounded-md hover:bg-blue-600 transition">
            Student
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Select;
