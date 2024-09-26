import { useState, useEffect } from "react";

import "./App.css";
import LoadingPage from "./pages/entry/LoadingPage";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

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
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
