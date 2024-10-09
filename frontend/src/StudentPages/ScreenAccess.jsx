import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCamera } from "./CameraContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const ScreenAccess = () => {
  const navigate = useNavigate();
  
  // camera access
  const { videoStream } = useCamera();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  
  
  // screen access
  const [screenStream, setScreenStream] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  // const videoRef = useRef(null);

  const shareScreen = async () => {
    try {
      // Request access to screen sharing
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      // Set screen stream
      setScreenStream(stream);
      setErrorMessage("");

      console.log("Screen sharing started. Stream:", stream);

      // Optional: Stop screen share when user stops the stream
      stream.getVideoTracks()[0].addEventListener("ended", () => {
        setScreenStream(null);
        console.log("Screen sharing stopped.");
      });
      navigate("/attempt-quiz")
    } catch (err) {
      // If the user denies screen sharing access or an error occurs
      console.error("Error accessing screen sharing:", err);
      setErrorMessage(`Error: Unable to access screen sharing. ${err.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Screen Access</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            To take the test, you must share your screen with the proctoring
            system. This will allow us to monitor your test session to ensure
            compliance with test policies.
          </li>
          <li>
            When prompted by your browser, select the option to share your
            screen.
          </li>
          <li>
            When sharing, ensure you select the screen or application where you
            will be working on the test. If you have multiple screens, only the
            test window should be visible.
          </li>
          <li>
            Make sure no confidential or sensitive data is visible on your
            screen before the test begins. Only test-related activities should
            be present.
          </li>
          <li>
            A stable internet connection is required to maintain your
            screen-sharing feed throughout the test.
          </li>
          <li>
            Screen sharing is mandatory. If you do not allow screen sharing, you
            will not be able to start or continue the test.
          </li>
          <li>
            Your screen will be monitored throughout the test. Any attempts to
            stop or disable screen sharing may result in the immediate
            disqualification of your test.
          </li>
          <li>
            If screen sharing is lost or disabled during the test, your test may
            be automatically paused or disqualified. Make sure screen sharing
            remains active for the duration of the test.
          </li>
        </ol>
        <Link>
          <button
            onClick={shareScreen}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-5"
          >
            Enable Access
          </button>
        </Link>

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

        {/* screen access */}
        {screenStream && (
          <video
            ref={videoRef}
            className="w-full max-w-lg mt-4"
            autoPlay
            playsInline
            style={{ display: screenStream ? "block" : "none" }}
            refs={(video) => {
              if (video) video.srcObject = screenStream;
            }}
          ></video>
        )}

        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ScreenAccess;
