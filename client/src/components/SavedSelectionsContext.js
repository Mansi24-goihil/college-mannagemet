// import React, { createContext, useContext, useState, useEffect } from 'react';

// const SavedSelectionsContext = createContext();

// export const SavedSelectionsProvider = ({ children }) => {
//   const [savedSelections, setSavedSelections] = useState(() => {
//     // Load initial selections from localStorage
//     return JSON.parse(localStorage.getItem('savedSelections')) || {};
//   });

//   useEffect(() => {
//     // Sync changes to localStorage
//     localStorage.setItem('savedSelections', JSON.stringify(savedSelections));
//   }, [savedSelections]);

//   return (
//     <SavedSelectionsContext.Provider value={{ savedSelections, setSavedSelections }}>
//       {children}
//     </SavedSelectionsContext.Provider>
//   );
// };

// export const useSavedSelections = () => useContext(SavedSelectionsContext);



import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedSelectionsContext = createContext();

export const SavedSelectionsProvider = ({ children }) => {
  const [savedSelections, setSavedSelections] = useState(() => {
    return JSON.parse(localStorage.getItem('savedSelections')) || {};
  });

  useEffect(() => {
    localStorage.setItem('savedSelections', JSON.stringify(savedSelections));
  }, [savedSelections]);

  return (
    <SavedSelectionsContext.Provider value={{ savedSelections, setSavedSelections }}>
      {children}
    </SavedSelectionsContext.Provider>
  );
};

export const useSavedSelections = () => useContext(SavedSelectionsContext);
