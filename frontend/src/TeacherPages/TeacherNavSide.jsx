import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../toast";

const TeacherNavSide = () => {
  const [isVideoDropdownOpen, setIsVideoDropdownOpen] = useState(false);

  const toggleVideoDropdown = () => {
    setIsVideoDropdownOpen(!isVideoDropdownOpen);
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
      window.location.reload(false);
    }, 1000);
  };

  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <div className="w-64 p-4 fixed inset-y-0 left-0 z-10 border-r border-gray-300 bg-blue-700">
        <h2 className="text-lg font-bold mb-4 text-white">Welcome, {loggedInTeacher}</h2>
        <hr className="my-2 border-gray-300" />
        <nav className="flex flex-col">
          <Link to="/teacher-home" className="p-2 hover:text-black hover:bg-blue-300 rounded-lg text-white">
            Home
          </Link>
          <button onClick={toggleVideoDropdown} className="p-2 text-white hover:text-black hover:bg-blue-300 rounded-lg flex justify-between">
            Courses
            <span className={`transform transition-transform ${isVideoDropdownOpen ? "rotate-180" : "rotate-0"}`}>
              &#9662; {/* Unicode for a downward arrow */}
            </span>
          </button>
          <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isVideoDropdownOpen ? 'max-h-40' : 'max-h-0'}`}>
            <div className="pl-6 flex flex-col">
              <Link to="/teacher-videos" className="p-2 hover:bg-blue-300 hover:text-black rounded-lg text-white">
                Videos
              </Link>
              <Link to="/teacher-notes" className="p-2 hover:bg-blue-300 hover:text-black rounded-lg text-white">
                Notes
              </Link>
              <Link to="/teacher-test" className="p-2 hover:bg-blue-300 hover:text-black rounded-lg text-white">
                Test
              </Link>
            </div>
          </div>
        </nav>
      </div>
      {/* Main content */}
      <div className="w-full ml-64">
        {/* Navbar */}
        <div className="flex bg-white shadow-md p-5 justify-between">
          <div className="flex justify-center items-center">
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
