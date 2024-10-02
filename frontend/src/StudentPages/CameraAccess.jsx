import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const CameraAccess = () => {
  const [error, setError] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Function to access the camera
  const accessCamera = async () => {
    try {
      // Request access to the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.style.display = 'block'; // Make video visible
      }
      setError(false);
      // After camera access, navigate to the next page
      navigate('/screen-access');
    } catch (err) {
      // Handle error if camera access is denied
      console.error('Error accessing camera: ', err);
      setError(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-xl font-bold text-blue-600 mb-4">Camera Access</h1>
        <ol className="text-gray-800 space-y-2 mb-6">
          <li>1. To take this test, you must enable camera access on your device.</li>
          <li>2. When prompted by your browser, click "Allow" to give access to your camera.</li>
          <li>
            3. Before starting the test, ensure your camera is functioning properly:
            <ul className="ml-4 list-disc">
              <li>The test environment will run a brief camera check.</li>
              <li>
                If issues arise, troubleshoot by checking your settings, restarting the browser, or using a different device.
              </li>
            </ul>
          </li>
          <li>4. Your face must be fully visible at all times during the test.</li>
          <li>5. A stable internet connection is required throughout the test.</li>
          <li>6. Camera access is mandatory; otherwise, the test cannot be taken.</li>
          <li>7. If camera access is lost during the test, it may be paused or disqualified.</li>
        </ol>
        <Link>
            <button onClick={accessCamera} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Enable Access
            </button>
        </Link>
        <video
        ref={videoRef}
        className="w-full max-w-md mt-6"
        autoPlay
        playsInline
        style={{ display: 'none' }} // Initially hidden
      ></video>

      {error && (
        <p className="text-red-500 mt-4">Error: Unable to access your camera.</p>
      )}
      </div>
    </div>
  );
};

export default CameraAccess;
