import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

  return (
    <>
    <h1>logout</h1>
    <Navigate to="/login" />;
    </>
    
  )
};