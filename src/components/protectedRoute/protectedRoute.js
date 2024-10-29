import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get auth status from context or state

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
