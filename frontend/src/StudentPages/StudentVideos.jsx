import React, { useEffect, useState } from "react";
import StudentNavSide from "./StudentNavSide";
import axios from "axios";
import ChatbotPopup from "../components/ChatbotPopup";

const StudentCourses = () => {
  const [allVideo, setAllVideo] = useState(null);

  useEffect(() => {
    getVideo();
  }, []);

  const getVideo = async () => {
    const result = await axios.get("http://localhost:8080/get-videos");
    console.log(result.data.data);
    setAllVideo(result.data.data);
  };

  const showVideo = (video) => {
    window.open(
      `http://localhost:8080/videos/${video}`,
      "_blank",
      "noreferrer"
    );
  };

  return (
    <div className="bg-gray-100">
      <StudentNavSide />
      <div className="ml-64">
        <p className="text-3xl font-bold flex justify-center my-5">
          Uploaded Videos
        </p>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
          {allVideo == null
            ? ""
            : allVideo.map((data) => {
                return (
                  <div>
                    <div className="flex items-center mb-4 mt-2 justify-between">
                      <h6 className="text-lg font-semibold text-gray-800">
                        Title: {data.title}
                      </h6>
                      <button
                        onClick={() => showVideo(data.video)}
                        className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                      >
                        Show Video
                      </button>
                    </div>
                    <hr className="border-gray-300"/>
                  </div>
                );
              })}
        </div>
      </div>
      <ChatbotPopup/>
    </div>
  );
};

export default StudentCourses;
