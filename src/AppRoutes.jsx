import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "./contexts/authContext";

import ProtectedRoute from "./pages/entry/ProtectedRoute";
import LandingPage from "./pages/entry/LandingPage";

import PageNotFound from "./pages/error/PageNotFound";

import CreateAccount from "./pages/auth/CreateAccount";
import VerifyEmail from "./pages/auth/VerifyEmail";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import OnboardingUserLoader from "./pages/auth/OnboardingUserLoader";

import Tasks from "./pages/tasks/Tasks";

function AppRoutes() {
  const { token, userId, isLoggingOut } = useAuth();

  //set user authenticated if userId and token exists in local storage
  const isAuthenticated = Boolean(token && userId);

  return (
    <Routes>
      {/**** Route to profile page if user is authenticated else go to the landing page */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/tasks" replace /> : <LandingPage />
        }
      />

      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/tasks" element={<Tasks />} />
      </Route>

      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/verifyemail" element={<VerifyEmail />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/onboarding" element={<OnboardingUserLoader />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
