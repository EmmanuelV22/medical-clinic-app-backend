// ProtectedRoute.js
import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({
  canActivate,
  redirectPath = "/acceso-denegado",
  children,
}) => {
  return canActivate ? (
    <Route>{children}</Route>
  ) : (
    <Navigate to={redirectPath} replace />
  );
};

export default ProtectedRoute;
