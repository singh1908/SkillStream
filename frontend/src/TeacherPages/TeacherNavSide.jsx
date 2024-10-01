import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../toast";

const TeacherNavSide = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [loggedInTeacher, setLoggedInTeacher] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInTeacher(localStorage.getItem("loggedInTeacher"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("teacher_token");
    localStorage.removeItem("loggedInTeacher");
    handleSuccess("User Logout Successfully");
    setTimeout(() => {
      navigate("/teacher-login");
      //logout karne ke baad previous arrow daba ke wapas se logout wale pe nhi jaa payenge
      window.location.reload(false);
    }, 1000);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-10`}
      >
        <h2 className="text-lg font-bold mb-4">Welcome, {loggedInTeacher}</h2>
        <hr className="my-2 border-gray-600" />
        <nav
          className={`flex flex-col transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={toggleSidebar}
        >
          <Link to="/teacher-home" className="p-2 hover:bg-gray-700 rounded-lg">
            Home
          </Link>
          <Link
            to="/teacher-courses"
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            Courses
          </Link>
          <Link
            to="/teacher-notes"
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            Notes
          </Link>
          <Link to="/teacher-test" className="p-2 hover:bg-gray-700 rounded-lg">
            Test
          </Link>
        </nav>
      </div>

      {/* Overlay for sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Main content */}
      <div className="w-lvw">
        {/* Navbar */}
        <div className="flex bg-white shadow-md p-5 justify-between">
          <div className="flex justify-center items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <Link to="/teacher-home" className="text-xl font-semibold">
              SkillStream
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherNavSide;
