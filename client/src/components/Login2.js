
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import Course from './Home';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/user/login', 
        credentials,
        {withCredentials:true}
      );

      console.log('Login successful:', response.data);


      const userRole = response.data.user.role.name;
      if (userRole === 'SuperAdmin') {
        navigate('/dashboard');
      } else if (userRole === 'Admin') {
        navigate('/admin-dashboard');
      } else if (userRole === 'Student') {
        navigate('/user-dashboard');
      } else {
        setErrorMessage('Invalid role.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
      console.error('Login failed:', error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4" method='post'>
          <div>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>

    
    </div>
  );
};

export default Login;
