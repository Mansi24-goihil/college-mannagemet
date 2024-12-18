import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by making a request to the backend
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:5001/protected-route', {
          withCredentials: true, // Include credentials (cookies) in the request
        });
        setAuthenticated(true); // If the response is successful, set authenticated to true
      } catch (error) {
        setAuthenticated(false); // If error, user is not authenticated
      }
    };
    
    checkAuthentication();
  }, []);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children; // Return protected content if authenticated
};

export default ProtectedRoute;
