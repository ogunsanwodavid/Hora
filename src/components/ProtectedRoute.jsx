import { useEffect } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/authContext";

import LoadingPage from "../pages/entry/LoadingPage";

import AccessDenied from "../pages/error/AccessDenied";
import OnboardingPageLoader from "../pages/auth/OnboardingUserLoader";
import LoggingOutLoader from "../pages/auth/LoggingOutLoader";

function ProtectedRoute({ isAuthenticated }) {
  const { userId, onboardUser, isOnboardingUser, isLoggingOut } = useAuth();

  //Fetch new user information using user's id on mount
  useEffect(() => {
    if (isAuthenticated) {
      onboardUser(userId);
    }
  }, [userId]);

  //Navigate to onboarding page when onboarding user
  //if (isOnboardingUser && isAuthenticated) return <Navigate to="/onboarding" />;
  if (isOnboardingUser && isAuthenticated) return <OnboardingPageLoader />;

  //Displays Accessdenied page if user is not authenticated
  if (!isAuthenticated && !isLoggingOut) return <AccessDenied />;

  //Show Spinner if user is logging out
  if (!isAuthenticated && isLoggingOut) return <LoggingOutLoader />;

  return isAuthenticated & !isOnboardingUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
}

export default ProtectedRoute;
