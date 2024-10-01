import React from "react";
import StudentNavSide from './StudentNavSide'
import Header from './Header';
import TestAlertBox from './TestAlertBox';
import OngoingTest from './OngoingTest';
import AvgReport from './AvgReport';
import TotalAttempts from './TotalAttempts';

const StudentHome = () => {

  return (
    <div>
    <StudentNavSide />
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <Header />

      {/* Test Alert Box */}
      <div className="mt-4">
        <TestAlertBox />
      </div>

      {/* Ongoing Test Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <OngoingTest />
        <OngoingTest />
        <OngoingTest />
      </div>

      {/* Avg Report and Total Attempts */}
      <div className="mt-4">
        <AvgReport />
      </div>
      <div className="mt-4">
        <TotalAttempts />
      </div>
    </div>
    </div>
    
  );
};

export default StudentHome;
