import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { toast } from "react-toastify";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);
  toast.success("Logged out successfully!");
  return <Navigate to="/login" />;
};
