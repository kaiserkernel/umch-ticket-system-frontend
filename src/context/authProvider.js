import React, { createContext, useContext, useState, useEffect } from "react";

// Create an Auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAvatarUpdated, setAvatarUpdated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return (
      localStorage.getItem("isAuthenticated") === "true" ||
      sessionStorage.getItem("isAuthenticated") === "true"
    );
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isAvatarUpdated,
        setAvatarUpdated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
