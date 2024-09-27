import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const BASE_URL = "https://hora-1daj.onrender.com/user";

  const [user, setUser, removeUser] = useLocalStorageState(null, "user");
  const [token, setToken, removeToken] = useLocalStorageState("", "token");

  const [verifyEmailId, setVerifyEmailId] = useState("");
  const [verifyEmailAddress, setVerifyEmailAddress] = useState("");

  const [verificationOtp, setVerificationOtp] = useState("");
  const [verificationOtpError, setVerificationOtpError] = useState(false);

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

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

      if (response.status === 200) {
        console.log(data);
        // Registration successful
        const { message: signUpMessage } = data;

        // set is signing up to false
        setIsSigningUp(false);

        //Set sign up user's id and email
        setVerifyEmailId(data.register.createUser._id);
        setVerifyEmailAddress(data.register.createUser.email);

        toast.success(signUpMessage);

        //Navigate to verify email page
        navigate("/verifyemail");

        //Set otp
        setVerificationOtp(data.register.createUser.onetime);

        return { success: true, signUpMessage, user };
      } else {
        console.log(data);
        // if an error
        toast.warning(data.error || "An unexpected error occurred");

        return {
          success: false,
          error: data.error || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // set is signing to false
      setIsSigningUp(false);

      // Network or other errors
      toast.warning(error.message || "An unexpected error occurred");

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
    try {
      const response = await fetch(
        `${BASE_URL}/verify-email/${verifyEmailId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, email }),
          redirect: "follow",
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        // Registration successful
        const { message: verifyEmailMessage } = data;

        // set is veryifying email to false
        setIsVerifyingEmail(false);

        toast.success(verifyEmailMessage);

        //Navigate to signin page
        navigate("/signin");

        return { success: true, verifyEmailMessage, user };
      } else {
        console.log(data);
        // if an error
        toast.warning(data.error || "An unexpected error occurred");

        //set verification error
        setVerificationOtpError(true);

        return {
          success: false,
          error: data.error || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // set is verifying email to false
      setIsVerifyingEmail(false);

      //set verification error
      setVerificationOtpError(true);

      // Network or other errors
      toast.warning(error.message || "An unexpected error occurred");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        removeToken,
        verifyEmailId,
        setVerifyEmailId,
        verifyEmailAddress,
        setVerifyEmailAddress,
        signup,
        verifyEmail,
        verificationOtp,
        setVerificationOtp,
        verificationOtpError,
        setVerificationOtpError,
        isSigningUp,
        isVerifyingEmail,
        isLoggingIn,
        isLoggingOut,
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
