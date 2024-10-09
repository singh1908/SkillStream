import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useCamera } from './CameraContext';

const CameraAccess = () => {
  const { enableCamera } = useCamera();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEnableCamera = async () => {
    try {
      await enableCamera(); // This enables the camera and stores the stream in the context
      navigate('/screen-access');
    } catch (err) {
      setErrorMessage(`Error: Unable to access your camera. ${err.message}`);
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
            <button onClick={handleEnableCamera} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Enable Access
            </button>
        </Link>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CameraAccess;
