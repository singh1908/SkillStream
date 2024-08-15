import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../toast';


const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"))
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logout Successfully");
    setTimeout(() => {
      navigate("/login");
      //logout karne ke baad previous arrow daba ke wapas se logout wale pe nhi jaa payenge
      window.location.reload(false);
    }, 1000);
  }

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout} className="w-20 h-8 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Logout</button>
    </div>
  )
}

export default Home
