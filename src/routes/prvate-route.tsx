import type React from "react";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  // TODO: replace with actual user check
  const user = true;

  if (user) return children;

  return <Navigate to="/login" />;
};
