import React, { createContext, useContext, useState } from 'react';

// Create context
const UserRightsContext = createContext();

// Provider component
export const UserRightsProvider = ({ children }) => {
  const [userRights, setUserRights] = useState({}); // Default rights
  const toggleRight = (name) => {
    setUserRights((prevRights) => ({
      ...prevRights,
      [name]: !prevRights[name],
    }));
  };

  return (
    <UserRightsContext.Provider value={{ userRights, toggleRight }}>
      {children}
    </UserRightsContext.Provider>
  );
};

// Hook for using the context
export const useUserRights = () => {
  const context = useContext(UserRightsContext);
  if (!context) {
    throw new Error('useUserRights must be used within a UserRightsProvider');
  }
  return context;
};
