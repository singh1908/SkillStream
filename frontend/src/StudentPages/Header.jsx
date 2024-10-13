import { useState, useEffect } from "react";
import CurrentDate from "./CurrentDate"

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

    return (
      <div className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-xl font-bold">Good morning,</h1>
          <p className="text-gray-500">{ loggedInUser }</p>
        </div>
        <div className="flex items-center">
          {/* Placeholder for Image */}
          {/* <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div> */}
          <div>
            <p className="text-gray-500">Today,</p>
            <p className="text-xl font-bold"><CurrentDate /></p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;
  