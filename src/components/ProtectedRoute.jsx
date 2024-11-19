import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const uid = useSelector((state) => state.user.uid);

  return uid ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
