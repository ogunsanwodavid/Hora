import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

import { toast } from "react-toastify";

const GroupsContext = createContext();

const GroupsProvider = ({ children }) => {
  //Group variables
  const [groups, setGroups] = useState(null);

  //Loading states
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  //Variables related to the created group success modal
  const [showcaseCreateGroupSuccessModal, setShowcaseCreateGroupSuccessModal] =
    useState(false);
  const [createGroupSuccessName, setCreateGroupSuccessName] = useState(
    "Designers in Group 9"
  );
  const [createGroupSuccessCode, setCreateGroupSuccessCode] =
    useState("9697XZ");
  const [createGroupSuccessInviteLink, setCreateGroupSuccessInviteLink] =
    useState("https://hora-student-app.vercel.app");

  return (
    <GroupsContext.Provider
      value={{
        groups,
        isCreatingGroup,
        createGroupSuccessCode,
        createGroupSuccessName,
        createGroupSuccessInviteLink,
        showcaseCreateGroupSuccessModal,
      }}
    >
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
