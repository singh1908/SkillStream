import React, { useEffect, useState } from "react";
import StudentNavSide from "./StudentNavSide";
import axios from "axios";

const StudentNotes = () => {
  const [allFile, setAllFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:8080/get-files");
    console.log(result.data.data);
    setAllFile(result.data.data);
  };

  const showPdf = (file) => {
    window.open(`http://localhost:8080/files/${file}`, "_blank", "noreferrer");
  };

  return (
    <div className="bg-gray-100">
      <StudentNavSide />
      <div className="ml-64">
        <p className="text-3xl font-bold flex justify-center my-5">
          Uploaded Files
        </p>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
          {allFile == null
            ? ""
            : allFile.map((data) => {
                return (
                  <div>
                    <div className="flex items-center mb-4 mt-2 justify-between">
                      <h6 className="text-lg font-semibold text-gray-800">
                        Title: {data.title}
                      </h6>
                      <button
                        onClick={() => showPdf(data.file)}
                        className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                      >
                        Show File
                      </button>
                    </div>
                    <hr className="border-gray-300" />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default StudentNotes;
