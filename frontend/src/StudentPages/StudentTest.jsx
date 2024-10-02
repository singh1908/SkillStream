import React from "react";
import StudentNavSide from "./StudentNavSide";
import { Link } from "react-router-dom";

const StudentTest = () => {
  return (
    <div>
      <StudentNavSide />
      <Link to="/camera-access">
        <button>Start Quiz</button>
      </Link>
    </div>
  );
};

export default StudentTest;