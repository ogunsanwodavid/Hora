import { useState } from "react";

import { Route, Routes } from "react-router-dom";

import CreateAccount from "./pages/auth/CreateAccount";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";

import PageNotFound from "./pages/error/PageNotFound";

import ProtectedRoute from "./pages/entry/ProtectedRoute";
import WelcomePage from "./pages/entry/WelcomePage";

function AppRoutes() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  /* const { token, user, isLoggingOut } = useAuth();
  const userId = user?._id || null;

  //Authenticate user if token and user id exists in the local Storage
  useEffect(() => {
    if (token && userId) {
      setisAuthenticated(true);
    } else {
      setisAuthenticated(false);
    }
  }, [token, userId]);
 */
  return (
    <Routes>
      {/**** Route to profile page if user is authenticated else go to the landing page */}
      <Route path="/" element={isAuthenticated ? null : <WelcomePage />} />

      <Route
        element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
      ></Route>

      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
