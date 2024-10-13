import React from "react";
import TeacherNavSide from "./TeacherNavSide";
import Teacher from "./Teacher";

const TeacherTest = () => {
  return (
    <div>
      <TeacherNavSide />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 ml-64">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
          <div className="flex-1">
            <Teacher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherTest;