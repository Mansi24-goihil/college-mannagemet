// MenuContext.js
import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [submenuVisibility, setSubmenuVisibility] = useState({});

  const toggleSubmenuVisibility = (name) => {
    setSubmenuVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <MenuContext.Provider value={{ submenuVisibility, toggleSubmenuVisibility }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);
