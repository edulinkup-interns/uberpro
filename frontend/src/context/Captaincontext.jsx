import React, { createContext, useContext, useState } from "react";

// Create the context
export const Captaindatacontext = createContext();

// Provider component
const Captaincontext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error , setError] = useState(null);

  const updatecaptain = (captainData) => {
    setCaptain(captainData);
  };

  const value = {
    captain,
    setCaptain,
    isLoading,
    error,
    setError,
    setIsLoading,
    updatecaptain,
  };

  return (
    <Captaindatacontext.Provider value={{captain, setCaptain}}>
      {children}
    </Captaindatacontext.Provider>
  );
}

export default Captaincontext;