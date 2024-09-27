import { useEffect } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

import AccessDenied from "../error/AccessDenied";

function ProtectedRoute({ isAuthenticated }) {
  const { user, getUser, isLoggingOut } = useAuth();

  const userId = user?._id || null;

  console.log(isAuthenticated);

  //Fetch new user information using user's id on mount
  useEffect(() => {
    if (isAuthenticated) {
      //getUser(userId);
    }
  }, [userId]);

  //Displays Accessdenied page if user is not authenticated
  if (isAuthenticated === false && !isLoggingOut) return <AccessDenied />;

  //Show Spinner if user is logging out
  /* if (isAuthenticated === false && isLoggingOut) return <Spinner />; */

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;
