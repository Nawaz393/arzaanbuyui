import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const SecureRoute = () => {
  const authState = JSON.parse(localStorage.getItem("token"));
  console.log("authState", authState);

  if (!authState) {
    return <Navigate to="/login" replace={true} />;
  }

  return authState.user.role === 1100 ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace={true} />
  );
};

export default SecureRoute;
