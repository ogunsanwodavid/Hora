import { useEffect } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

import LoadingPage from "../entry/LoadingPage";

import AccessDenied from "../error/AccessDenied";

function ProtectedRoute({ isAuthenticated }) {
  const { userId, onboardUser, isOnboardingUser, isLoggingOut } = useAuth();

  //Fetch new user information using user's id on mount
  useEffect(() => {
    if (isAuthenticated) {
      //onboardUser(userId);
    }
  }, [userId]);

  //Navigate to onboarding page when onboarding user
  if (isOnboardingUser && isAuthenticated) return <Navigate to="/onboarding" />;

  //Displays Accessdenied page if user is not authenticated
  if (isAuthenticated === false && !isLoggingOut) return <AccessDenied />;

  //Show Spinner if user is logging out
  if (isAuthenticated === false && isLoggingOut) return <LoadingPage />;

  return isAuthenticated & !isOnboardingUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
}

export default ProtectedRoute;
