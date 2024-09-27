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

      if (response.ok) {
        console.log(data);
        // Registration successful
        const { message: signUpMessage } = data;

        toast.success(signUpMessage);

        //Set sign up user's id and email
        setVerifyEmailId(data.register.createUser._id);
        setVerifyEmailAddress(data.register.createUser.email);

        //Set token
        setToken(data.register.createUser.token);

        //Set otp
        setVerificationOtp(data.register.createUser.onetime);

        //Navigate to verify email page
        navigate("/verifyemail");

        return { success: true, signUpMessage };
      } else {
        console.log(data);
        // if an error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // set is signing to false
      setIsSigningUp(false);

      // Network or other errors
      toast.error(error.message || "An unexpected error occurred");

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

        // set is veryifying email to false
        setIsVerifyingEmail(false);

        toast.success(verifyEmailMessage);

        //Navigate to signin page
        navigate("/signin");

        return { success: true, verifyEmailMessage, user };
      } else {
        console.log(data);
        // if an error
        toast.error(data.message || "An unexpected error occurred");

        //remove Token
        removeToken();

        //set verification error
        setVerificationOtpError(true);

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // set is verifying email to false
      setIsVerifyingEmail(false);

      //set verification error
      setVerificationOtpError(true);

      // Network or other errors
      toast.error(error.message || "An unexpected error occurred");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  //Get User function
  const getUser = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`, {
        method: "GET",
        redirect: "follow",
      });

      const data = await response.json();

      // Check if the response is OK (status 200)
      if (response.ok) {
        //set User to the fetched user information
        await setUser(data.get.user);
      } else {
        console.error(data.message);

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      console.log(error);

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
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

      if (response.status === 200) {
        console.log(data);
        // Login successful
        const { message: loginMessage } = data;
        const token = data.login.login.token;

        //set user information and token to local storage
        setToken(token);
        await getUser(data.login.login._id);

        // set is logging up to false
        setIsLoggingIn(false);

        toast.success(loginMessage);

        //Navigate to verify email page
        navigate("/verifyemail");

        //Set otp
        setVerificationOtp(data.register.createUser.onetime);

        return { success: true, loginMessage, user };
      } else {
        console.log(data);
        // if an error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // set is logging in to false
      setIsLoggingIn(false);

      // Network or other errors
      toast.error(error.message || "An unexpected error occurred");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsLoggingIn(false);
    }
  };

  //Logout Function
  const logout = async () => {
    setIsLoggingOut(true);
    try {
      //remove token from local storage
      await removeToken();

      //remove user from local storage
      await removeUser();

      //Redirect to landing page
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoggingOut(false);
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
        login,
        logout,
        getUser,
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
