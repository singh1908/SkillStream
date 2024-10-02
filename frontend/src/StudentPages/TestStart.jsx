import React from "react";
import StudentNavSide from "./StudentNavSide";
import Student from "../StudentPages/Student";

const StudentTest = () => {
  return (
    <div>
      <StudentNavSide />
      <div className="bg-gray-100 flex flex-col items-center pt-4">
        <h1 className="text-4xl font-bold mb-8">Quiz</h1>
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="flex-1">
            <Student />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTest;