import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const userData = sessionStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (!user) {
    // 🚫 Not logged in
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    // 🚫 Logged in but not admin
    return <Navigate to="/dashboard" />;
  }

  // ✅ Admin access granted
  return children;
};

export default AdminRoute;
