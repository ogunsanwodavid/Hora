import { createContext, useContext, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const BASE_URL = "https://hora-1daj.onrender.com/user";

  const [user, setUser] = useState(null);
  const [userId, setUserId, removeUserId] = useLocalStorageState("", "userId");
  const [token, setToken, removeToken] = useLocalStorageState("", "token");

  const [verifyEmailId, setVerifyEmailId] = useState("");
  const [verifyEmailAddress, setVerifyEmailAddress] = useState("");

  const [verificationOtp, setVerificationOtp] = useState("");
  const [verificationOtpError, setVerificationOtpError] = useState(false);

  const [resetPasswordId, setResetPasswordId] = useState("");
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isRequestingReset, setIsRequestingReset] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [isOnboardingUser, setIsOnboardingUser] = useState(false);
  const [isGettingUser, setIsGettingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  const navigate = useNavigate();

  //Store the url first visited before the auth wall
  const [userVisitedRoute, setUserVisitedRoute] = useState("");
  const location = useLocation();
  const fullPath = location.pathname;

  //This effect set the first visited route if it is not an auth page
  useEffect(() => {
    if (
      fullPath !== "/" ||
      fullPath !== "/signin" ||
      fullPath !== "/createaccount" ||
      fullPath !== "/forgotpassword" ||
      fullPath !== "/resetpassword" ||
      fullPath !== "/verifyemail"
    ) {
      setUserVisitedRoute(fullPath);
    }
  }, []);

  //Signup Function
  const signup = async ({ username, email, password }) => {
    setIsSigningUp(true);
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Registration successful
        const { message: signUpMessage } = data;

        toast.success(signUpMessage);

        //Set sign up user's id and email
        setVerifyEmailId(data.register.createUser._id);
        setVerifyEmailAddress(data.register.createUser.email);

        //Set token
        setToken(data.register.token);
        //setUserId(data.register.createUser._id);

        //Set otp
        setVerificationOtp(data.register.createUser.onetime);

        //Navigate to verify email page
        navigate("/verifyemail");

        return { success: true, signUpMessage };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsSigningUp(false);
    }
  };

  //VerifyEmail function
  const verifyEmail = async ({ otp, email }) => {
    setIsVerifyingEmail(true);
    setVerificationOtpError(false);
    try {
      const response = await fetch(
        `${BASE_URL}/verify-email/${verifyEmailId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, email }),
          redirect: "follow",
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Verification successful
        const { message: verifyEmailMessage } = data;

        //toast verify email message
        toast.success(verifyEmailMessage);

        //removeToken
        removeToken();

        //Navigate to signin page
        navigate("/signin");

        return { success: true, verifyEmailMessage, user };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        //set verification error
        setVerificationOtpError(true);

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      //set verification error
      //setVerificationOtpError(true);

      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  //Onboard User function
  const onboardUser = async (userId) => {
    setIsOnboardingUser(true);
    try {
      const response = await fetch(`${BASE_URL}/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });

      const data = await response.json();

      // Check if the response is Ok
      if (response.ok) {
        const onboardedUser = data.get.user;

        //remove password key from user object
        const noPasswordOnboardedUser = Object.fromEntries(
          Object.entries(onboardedUser).filter(([key]) => key !== "password")
        );

        //console.log(noPasswordOnboardedUser);

        //set User to the fetched user information
        await setUser(noPasswordOnboardedUser);
      } else {
        console.error(data.message);

        //Toast error message
        toast.error(data.message);

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      console.error(error);

      //Toast error
      toast.error("Failed to onboard user");

      //Remove token and userId
      await removeToken();
      await removeUserId();

      //Navigate to sign in
      navigate("/signin");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsOnboardingUser(false);
    }
  };

  //Onboard User function
  const getUser = async (userId) => {
    setIsGettingUser(true);
    try {
      const response = await fetch(`${BASE_URL}/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });

      const data = await response.json();

      // Check if the response is Ok
      if (response.ok) {
        const gotUser = data.get.user;

        //remove password key from user object
        const noPasswordGottenUser = Object.fromEntries(
          Object.entries(gotUser).filter(([key]) => key !== "password")
        );

        //console.log(noPasswordOnboardedUser);

        //set User to the fetched user information
        await setUser(noPasswordGottenUser);
      } else {
        console.error(data.message);

        //Toast error message
        //toast.error(data.message);

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      console.error(error);

      //Toast error
      //toast.error("Failed to get user");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsGettingUser(false);
    }
  };

  //Login function
  const login = async ({ email, password }) => {
    setIsLoggingIn(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Login successful
        const { message: loginMessage } = data;
        //const token = data.login.login.token;
        const token = data.login.token;

        //set user information and token to local storage
        await setToken(token);
        //await setUserId(data.login.login._id);

        //await getUser(data.login.login._id);

        //toast.success(loginMessage);

        //Navigate to the real route user wanted to before being bounced out the auth wall
        //Else navigate to home page
        if (userVisitedRoute && userVisitedRoute !== "/signin") {
          navigate(userVisitedRoute);
        } else {
          navigate("/");
        }

        return { success: true, loginMessage, user };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsLoggingIn(false);
    }
  };

  //Request reset Function
  const requestReset = async ({ email }) => {
    setIsRequestingReset(true);
    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Reset Request successful
        const { message: resetRequestMessage } = data;
        //const token = data.login.login.token;

        //set token to local storage
        //setToken(token);

        //toast message
        toast.success(resetRequestMessage);

        //set reset password id and email
        setResetPasswordId(data.forgetRoute.userInfo.id);
        setResetPasswordEmail(email);

        //Navigate to reset password page
        navigate("/resetpassword");

        return { success: true, resetRequestMessage, user };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsRequestingReset(false);
    }
  };

  //Reset password function
  const resetPassword = async ({ email, otp, newPassword }) => {
    setIsResettingPassword(true);
    try {
      const response = await fetch(
        `${BASE_URL}/reset-password/${resetPasswordId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp, newPassword }),
          redirect: "follow",
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Reset Request successful
        const { message: resetPasswordMessage } = data;

        //toast message
        toast.success(resetPasswordMessage);

        //Navigate to signin page
        navigate("/signin");

        return { success: true, resetPasswordMessage, user };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsResettingPassword(false);
    }
  };

  //Resend otp function
  const resendOtp = async ({ email, userId }) => {
    setIsResendingOtp(true);
    try {
      const response = await fetch(`${BASE_URL}/resend-otp/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Resend otp successful
        const { message: resendOtpMessage } = data;

        return { success: true, resendOtpMessage, user };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsResendingOtp(false);
    }
  };

  //Change password function
  const changePassword = async ({ oldPassword, newPassword }) => {
    setIsChangingPassword(true);
    try {
      const response = await fetch(`${BASE_URL}/change-password/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Change password successful
        const { message: changePasswordMessage } = data;

        //toast message
        toast.success(changePasswordMessage);

        //Navigate to profile settinga page
        navigate("/profile/settings");

        return { success: true, changePasswordMessage, user };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsChangingPassword(false);
    }
  };

  //Update user function
  const updateUser = async ({ username, email, password }) => {
    setIsUpdatingUser(true);
    try {
      const response = await fetch(`${BASE_URL}/update/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Update user successful
        const { message: updateUserMessage } = data;

        //Get user
        await getUser(userId);

        //Navigate to profile page
        navigate("/profile");

        //toast message
        //toast.success(updateUserMessage);

        //Navigate to profile settinga page
        //navigate("/profile/settings");

        return { success: true, updateUserMessage, user };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsUpdatingUser(false);
    }
  };

  //Logout Function
  const logout = async () => {
    setIsLoggingOut(true);
    try {
      //remove token from local storage
      await removeToken();

      //remove user from local storage
      await removeUserId();

      //Redirect to landing page
      navigate("/");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  //Delete user function
  const deleteUser = async (userId) => {
    setIsDeletingUser(true);
    try {
      const response = await fetch(`${BASE_URL}/delete/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        // Delete user successful
        const { message: deleteUserMessage } = data;

        //Toast info
        toast.success(deleteUserMessage);

        //Logout
        await logout();

        //Navigate to home
        navigate("/");

        return { success: true, deleteUserMessage, user };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsDeletingUser(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        token,
        removeToken,
        verifyEmailId,
        setVerifyEmailId,
        verifyEmailAddress,
        setVerifyEmailAddress,
        signup,
        login,
        onboardUser,
        getUser,
        changePassword,
        logout,
        verifyEmail,
        requestReset,
        resetPassword,
        resendOtp,
        updateUser,
        deleteUser,
        verificationOtp,
        setVerificationOtp,
        verificationOtpError,
        setVerificationOtpError,
        resetPasswordEmail,
        resetPasswordId,
        setResetPasswordId,
        setResetPasswordEmail,
        isSigningUp,
        isVerifyingEmail,
        isLoggingIn,
        isLoggingOut,
        isRequestingReset,
        isResettingPassword,
        isResendingOtp,
        isOnboardingUser,
        isGettingUser,
        isUpdatingUser,
        isChangingPassword,
        isDeletingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
