import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./components/layout/Loader/Loader";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (loading) return <Loader/>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (isAdmin && user?.role !== "admin") return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
