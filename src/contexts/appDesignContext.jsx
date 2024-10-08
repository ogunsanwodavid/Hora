import { createContext, useContext, useState } from "react";

const AppDesignContext = createContext();

const AppDesignProvider = ({ children }) => {
  const [showcaseMobileNav, setShowcaseMobileNav] = useState(true);
  return (
    <AppDesignContext.Provider
      value={{ showcaseMobileNav, setShowcaseMobileNav }}
    >
      {children}
    </AppDesignContext.Provider>
  );
};

function useAppDesign() {
  const context = useContext(AppDesignContext);
  if (context === undefined)
    throw new Error("AppDesignContext was used outside of AppDesignProvider");
  return context;
}

export { AppDesignProvider, useAppDesign };
