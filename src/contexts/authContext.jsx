import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const BASE_URL = "https://hora-1daj.onrender.com/user";

  const [user, setUser, removeUser] = useLocalStorageState(null, "user");
  const [token, setToken, removeToken] = useLocalStorageState("", "token");
  const [otp, setOtp, removeOtp] = useLocalStorageState("", "otp");

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

  //Signup Function
  const signup = async ({ fullName, email, password }) => {
    setIsSigningUp(true);
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Registration successful
        const { message: signUpMessage } = data;

        // set is signing up to false
        setIsSigningUp(false);

        toast.success(signUpMessage);

        //Navigate to signin page
        navigate("/signin");

        return { success: true, signUpMessage, user };
      } else {
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

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
