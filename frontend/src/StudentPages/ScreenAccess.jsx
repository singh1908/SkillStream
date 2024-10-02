import React from "react";
import { Link } from "react-router-dom";

const ScreenAccess = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Screen Access</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            To take the test, you must share your screen with the proctoring system. 
            This will allow us to monitor your test session to ensure compliance with test policies.
          </li>
          <li>
            When prompted by your browser, select the option to share your screen.
          </li>
          <li>
            When sharing, ensure you select the screen or application where you will 
            be working on the test. If you have multiple screens, only the test window 
            should be visible.
          </li>
          <li>
            Make sure no confidential or sensitive data is visible on your screen before 
            the test begins. Only test-related activities should be present.
          </li>
          <li>
            A stable internet connection is required to maintain your screen-sharing 
            feed throughout the test.
          </li>
          <li>
            Screen sharing is mandatory. If you do not allow screen sharing, you will 
            not be able to start or continue the test.
          </li>
          <li>
            Your screen will be monitored throughout the test. Any attempts to stop 
            or disable screen sharing may result in the immediate disqualification of 
            your test.
          </li>
          <li>
            If screen sharing is lost or disabled during the test, your test may be 
            automatically paused or disqualified. Make sure screen sharing remains active 
            for the duration of the test.
          </li>
        </ol>
        <Link to="/attempt-quiz">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-5">
          Enable Access
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ScreenAccess;
