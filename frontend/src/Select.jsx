import React from "react";
import { Link } from "react-router-dom";

const Select = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg ">
        <h1 className="text-2xl font-bold mb-6 text-center">Select Role</h1>
        <div className="flex justify-between">
          <Link to="/teacher-login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Teacher
            </button>
          </Link>
          <Link to="/student-login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Student
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Select;
