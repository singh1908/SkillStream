import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import TeacherRefreshHandler from "./TeacherRefreshHandler";

import { CameraProvider } from "./StudentPages/CameraContext";

import StudentHome from "./StudentPages/StudentHome";
import StudentLogin from "./StudentPages/StudentLogin";
import StudentSignup from "./StudentPages/StudentSignup";
import StudentVideos from "./StudentPages/StudentVideos";
import StudentNotes from "./StudentPages/StudentNotes";
import StudentTest from "./StudentPages/StudentTest";
import CameraAccess from "./StudentPages/CameraAccess";
import ScreenAccess from "./StudentPages/ScreenAccess";
import TestStart from "./StudentPages/TestStart";
import Student from "./StudentPages/Student";

import TeacherLogin from "./TeacherPages/TeacherLogin";
import TeacherSignup from "./TeacherPages/TeacherSignup";
import TeacherHome from "./TeacherPages/TeacherHome";
import TeacherVideos from "./TeacherPages/TeacherVideos";
import TeacherNotes from "./TeacherPages/TeacherNotes";
import TeacherTest from "./TeacherPages/TeacherTest";
import Select from "./Select";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/student-login" />;
  };
  const TeacherPrivateRoute = ({ element }) => {
    return isTeacherAuthenticated ? element : <Navigate to="/teacher-login" />;
  };

  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <TeacherRefreshHandler setIsTeacherAuthenticated={setIsTeacherAuthenticated} />

      <Routes>
        <Route path="/" element={<Select />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/student-home" element={<PrivateRoute element={<StudentHome />} />} />
        <Route path="/student-videos" element={<StudentVideos />} />
        <Route path="/student-notes" element={<StudentNotes />} />
        <Route path="/student-test" element={<StudentTest />} />
        


        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-signup" element={<TeacherSignup />} />
        <Route path="/teacher-home" element={<TeacherPrivateRoute element={<TeacherHome />} />} />
        <Route path="/teacher-videos" element={<TeacherVideos />} />
        <Route path="/teacher-notes" element={<TeacherNotes />} />
        <Route path="/teacher-test" element={<TeacherTest />} />
      </Routes>

      <CameraProvider>
        <Routes>
          <Route path="/camera-access" element={<CameraAccess/>}/>
          <Route path="/screen-access" element={<ScreenAccess/>}/>
          <Route path="/attempt-quiz" element={<TestStart/>}/>
          <Route path="/quiz/:id" element={<Student />} />
        </Routes>
      </CameraProvider>


    </div>
    
    
  );
}

export default App;
