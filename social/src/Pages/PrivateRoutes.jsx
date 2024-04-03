import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let token = sessionStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
