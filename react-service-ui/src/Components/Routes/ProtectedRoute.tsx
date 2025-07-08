// src/Library/Routes/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { AuthService } from "./AuthService";
import type React from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!AuthService.isAuthenticated()) {
    AuthService.logout();
    return <Navigate to="/" replace />; // Redirect to login
  }

  return children;
};

export default ProtectedRoute;
