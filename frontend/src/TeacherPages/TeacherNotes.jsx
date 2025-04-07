import React, { useState } from "react";
import TeacherNavSide from "./TeacherNavSide";
import axios from "axios";
import { handleSuccess } from "../toast";
import ChatbotPopup from "../components/ChatbotPopup";

const TeacherNotes = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");

  const submitFile = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);
    const result = await axios.post("http://localhost:8080/upload-files", formData, {
      headers: {"Content-Type" : "multipart/form-data"}
    });
    console.log(result);
    if(result.data.status == "ok"){
      handleSuccess("File Uploaded Successfully!!!");
    }
    e.target.reset();  // Form ko reset kar dega submit ke baad.
  }

  return (
    <div>
      <TeacherNavSide />
      <div className="flex justify-center mt-32 ml-64">
        <form onSubmit={submitFile} className="space-y-4 w-full max-w-md shadow-lg p-6">
          <div>
            <label
              htmlFor="textInput"
              className="block text-xl font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="textInput"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Title name..."
              onChange={(e) => {setTitle(e.target.value)}}
            />
          </div>

          <div>
            <label
              htmlFor="fileInput"
              required
              className="block text-xl font-medium text-gray-700"
            >
              File
            </label>
            <input
              type="file"
              id="fileInput"
              accept="application/pdf, image/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              onChange={(e) => {setFile(e.target.files[0])}}
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
      <ChatbotPopup/>
    </div>
  );
};

export default TeacherNotes;
