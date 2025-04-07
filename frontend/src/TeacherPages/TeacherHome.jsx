import React from 'react'
import TeacherNavSide from './TeacherNavSide'
import ChatbotPopup from "../components/ChatbotPopup";
import Header from './TeacherHeader';
import TeacherAlert from './TeacherAlert';
import TeacherOngoing from './TeacherOngoing';

const TeacherHome = () => {
  return (
    <div>
      <TeacherNavSide />
      <div className="min-h-screen bg-gray-100 p-4 ml-64">
      {/* Header */}
      <Header />

      {/* Test Alert Box */}
      <div className="mt-4">
        <TeacherAlert />
      </div>

      {/* Ongoing Test Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <TeacherOngoing />
        <TeacherOngoing />
        <TeacherOngoing />
      </div>
    </div>
      <ChatbotPopup/>
    </div>
  )
}

export default TeacherHome
