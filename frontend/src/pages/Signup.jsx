import React from 'react'
import {useState} from "react"
import { handleError, handleSuccess } from '../toast';
import { useNavigate, Link} from 'react-router-dom'; 
import {FaEye, FaEyeSlash} from "react-icons/fa"


const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleShow = () => {
        setShowPassword(!showPassword);
    }

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const {name, email, password} = signupInfo;
        if(!name || !email || !password){
          return handleError("All fields are required")
        }
        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }else if (error) {
              const details = error?.details[0].message;
              handleError(details);
            } else if (!success) {
              handleError(message);
          }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg ">
            <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
            <form onSubmit={handleSignup}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">Name <span className='text-red-600'>*</span></label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-blue-500"
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email <span className='text-red-600'>*</span></label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-blue-500"
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div className="mb-6 relative">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password <span className='text-red-600'>*</span></label>
                    <input
                        onChange={handleChange}
                        type= {showPassword ? "text" : "password"}
                        name='password'
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-blue-500"
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                    <div className="absolute top-11 right-4 cursor-pointer text-gray-600" onClick={ handleShow }>{showPassword ? <FaEyeSlash/> : <FaEye/>}</div>
                </div>
                <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Signup</button>
                <div className='mt-4 flex justify-center'>Already have an account ?
                    <Link to="/login" className='underline pl-1 font-semibold'>Login</Link>
                </div>
            </form>
          </div>
      </div>
  )
}

export default Signup
