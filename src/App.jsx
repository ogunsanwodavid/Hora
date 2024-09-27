import { useState, useEffect } from "react";

import { BrowserRouter } from "react-router-dom";

import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./contexts/authContext";

import AppRoutes from "./AppRoutes";

import LoadingPage from "./pages/entry/LoadingPage";

import "./App.css";

function App() {
  const [isLoadingApp, setIsLoadingApp] = useState(true);

  useEffect(() => {
    // Simulating a 1-second delay before loading the main page
    const timer = setTimeout(() => {
      setIsLoadingApp(false);
    }, 4000);

    return () => clearTimeout(timer); // Clear the timer when the component is unmounted
  }, []);

  return isLoadingApp ? (
    <LoadingPage />
  ) : (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />

        {/*** This contains toasted information display */}
        <ToastContainer
          position="top-center"
          theme="dark"
          transition={Zoom}
          autoClose={2000}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
