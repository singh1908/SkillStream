import React, { createContext, useContext, useState } from 'react';

// Create the context
const CameraContext = createContext();

// Custom hook to use the camera context
export const useCamera = () => useContext(CameraContext);

// Provider component to wrap the app
export const CameraProvider = ({ children }) => {
  const [videoStream, setVideoStream] = useState(null);

  const enableCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      return stream;
    } catch (error) {
      throw new Error(`Unable to access the camera: ${error.message}`);
    }
  };

  return (
    <CameraContext.Provider value={{ videoStream, enableCamera }}>
      {children}
    </CameraContext.Provider>
  );
};
