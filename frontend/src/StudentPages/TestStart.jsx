import React, { useEffect, useRef } from "react";
import StudentNavSide from "./StudentNavSide";
import Student from "../StudentPages/Student";
import { useCamera } from "./CameraContext";

const StudentTest = () => {
  // camera access
  const { videoStream } = useCamera();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <div>
      {/* <StudentNavSide /> */}
      <div className="bg-gray-100 flex flex-col items-center pt-4">
        <h1 className="text-4xl font-bold mb-8">Quiz</h1>
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="flex-1">
            <Student />
          </div>
        </div>
        
        {/* camera access */}
        {videoStream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute top-5 right-5 w-44"
          />
        ) : (
          <p>No video stream available</p>
        )}
      </div>
    </div>
  );
};

export default StudentTest;
