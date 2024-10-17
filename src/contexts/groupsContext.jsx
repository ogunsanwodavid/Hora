import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

import { toast } from "react-toastify";

const GroupsContext = createContext();

const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState(null);

  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  return (
    <GroupsContext.Provider value={{ groups, isCreatingGroup }}>
      {children}
    </GroupsContext.Provider>
  );
};

function useGroups() {
  const context = useContext(GroupsContext);
  if (context === undefined)
    throw new Error("GroupsContext was used outside of GroupsProvider");
  return context;
}

export { GroupsProvider, useGroups };
