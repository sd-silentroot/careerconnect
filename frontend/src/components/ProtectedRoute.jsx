import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Agar user hai -> children render karo (Dashboard component)
  if (user) return children;

  // Nahi toh login page pe redirect karo
  return <Navigate to="/login" replace />;
}
