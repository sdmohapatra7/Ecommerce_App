import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./components/layout/Loader/Loader";

const ProtectedRoute = ({ children, isAdmin }) => {
  const {loading, user } = useSelector((state) => state.user);

  const token = localStorage.getItem("authToken");

  // Show loader while loading
  if (loading) return <Loader />;

  // If no token and not authenticated, redirect to login
  if (!token) return <Navigate to="/login" replace />;

  // If admin route and user role is not admin, redirect to home
  if (isAdmin && user?.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
