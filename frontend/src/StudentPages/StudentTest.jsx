import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StudentNavSide from "./StudentNavSide";
import ChatbotPopup from "../components/ChatbotPopup";

const StudentTest = () => {
  return (
    <div>
      <StudentNavSide />
      <div className="flex justify-center items-center mt-36 ml-64">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
          <h1 className="text-xl font-bold text-blue-600 mb-4">
            Steps to start the Test
          </h1>
          <ol className="text-gray-800 space-y-2 mb-6">
            <li>1. Allow access to the camera and share the screen.</li>
            <li>2. Begin with the Test.</li>
          </ol>
          <Link to="/camera-access">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Next
            </button>
          </Link>
        </div>
      </div>
      <ChatbotPopup/>
    </div>
  );
};

export default StudentTest;
