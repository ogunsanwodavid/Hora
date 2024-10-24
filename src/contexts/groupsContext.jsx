import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

import { toast } from "react-toastify";

const GroupsContext = createContext();

const GroupsProvider = ({ children }) => {
  //Group variables
  const [groups, setGroups] = useState([
    {
      type: [],
      _id: "66f4eeaa028275fa0620f25b",
      name: "computer engineering groups",
      members: ["66f3e60308383b211af0e2ad"],
      tasks: [],
      inviteLink: "9d61a0e1-13cc-4580-beeb-51299dbff8d2",
      isFull: false,
      expiresAt: "2024-09-27T05:18:34.092Z",
      createdAt: "2024-09-26T05:18:34.170Z",
      __v: 4,
    },
    {
      _id: "671511badf6b964cc7a5aa64",
      name: "growth group",
      type: [],
      members: [
        "6714bd9832d90617a39f8ddf",
        "6715125fdf6b964cc7a5aa70",
        "67151241df6b964cc7a5aa6d",
        "6715120fdf6b964cc7a5aa6a",
      ],
      tasks: ["67151367df6b964cc7a5aa7d"],
      inviteLink: "rvdZBH",
      isFull: true,
      expiresAt: "2024-10-21T14:20:42.352Z",
      createdAt: "2024-10-20T14:20:42.355Z",
      __v: 4,
    },
  ]);
  const [currentGroupTasks, setCurrentGroupTasks] = useState([
    {
      _id: "670782168774060eefe22gggha",
      title: "Gymming",
      description: "Spend more time for my gym sessions",
      type: "Group",
      dueDate: "2024-10-24",
      time: "18:35",
      completedBy: [],
      repeatTask: "none",
      completed: true,
      createdBy: {
        username: "000xdave",
      },
      createdAt: "2024-10-10T07:28:22.825Z",
      updatedAt: "2024-10-10T07:28:22.825Z",
      __v: 0,
    },
    {
      _id: "67065c3bd60343ec0707dc2c",
      title: "Start looking for jobs",
      type: "Group",
      description: "Have to work",
      dueDate: "2024-09-22",
      time: "02:15",
      repeatTask: "daily",
      completed: false,
      createdBy: {
        username: "hoaxthagod",
      },
      createdAt: "2024-10-09T10:34:35.131Z",
      updatedAt: "2024-10-09T10:34:35.131Z",
      __v: 0,
    },
    {
      _id: "67065c3bd60343ed1807dc2c",
      title: "SIWES Report",
      description: "Begin writing my SIWES report everyday",
      type: "Group",
      dueDate: "2024-10-17",
      time: "20:15",
      completedBy: [],
      repeatTask: "weekly",
      completed: false,
      createdBy: {
        username: "boluwatife010",
      },
      createdAt: "2024-10-09T10:34:35.131Z",
      updatedAt: "2024-10-09T10:34:35.131Z",
      __v: 0,
    },
    {
      _id: "670782168774060eee22fcba",
      title: "Complete project report",
      description: "Finish writing the final project report and submit it.",
      type: "Group",
      dueDate: "2024-08-10",
      time: "14:30",
      repeatTask: "none",
      completed: false,
      createdBy: {
        username: "desire007",
      },
      createdAt: "2024-10-10T07:28:22.825Z",
      updatedAt: "2024-10-10T07:28:22.825Z",
      __v: 0,
    },
    {
      _id: "670782168774060eee22gggba",
      title: "Go Skydiving",
      description: "Take a trip to Ibadan and go skydiving with friends",
      type: "Group",
      dueDate: "2025-11-22",
      time: "04:45",
      completedBy: [],
      repeatTask: "none",
      completed: true,
      createdBy: {
        username: "00xdave",
      },
      createdAt: "2024-10-10T07:28:22.825Z",
      updatedAt: "2024-10-10T07:28:22.825Z",
      __v: 0,
    },
    {
      _id: "670782168774060eefe22gggha",
      title: "Read Gulag Archipelago",
      description:
        "Time to study my favourite history book and jot down unknown words",
      type: "Group",
      dueDate: "2024-10-24",
      time: "09:30",
      completedBy: [],
      repeatTask: "none",
      completed: true,
      createdBy: {
        username: "blink200",
      },
      createdAt: "2024-10-10T07:28:22.825Z",
      updatedAt: "2024-10-10T07:28:22.825Z",
      __v: 0,
    },
  ]);
  const [currentGroupTaskInfo, setCurrentGroupTaskInfo] = useState({
    _id: "67065c3bd60343ec0707dc2c",
    title: "Start looking for jobs",
    type: "Group",
    description: "Have to work",
    dueDate: "2024-09-22",
    time: "02:15",
    repeatTask: "daily",
    completed: false,
    createdBy: "6703d9cb0e71d411ae3e23f3",
    createdAt: "2024-10-09T10:34:35.131Z",
    updatedAt: "2024-10-09T10:34:35.131Z",
    __v: 0,
  });
  const [searchNewMemberResult, setSearchNewMemberResult] = useState([
    {
      _id: "01",
      username: "desire007",
      email: "destinydesire@gmail.com",
    },
    {
      _id: "02",
      username: "boluwatife010",
      email: "ojoboluwatife@gmail.com",
    },
    {
      _id: "03",
      username: "hoaxthagod",
      email: "hoaxgod777@gmail.com",
    },
    {
      _id: "04",
      username: "00xdave",
      email: "ogunsanwodavid123@gmail.com",
    },
    {
      _id: "05",
      username: "incognito_lord",
      email: "lordincognito54@gmail.com",
    },
    {
      _id: "06",
      username: "Redemptionsync",
      email: "syncredeems66@gmail.com",
    },
    {
      _id: "07",
      username: "Beatthemyth",
      email: "mythbeaterrocks@gmail.com",
    },
    {
      _id: "08",
      username: "blink200",
      email: "idoblink200@gmail.com",
    },
  ]);

  //Search result ordered alphabetically by username
  const orderedSearchNewMemberResult = searchNewMemberResult.length
    ? searchNewMemberResult.sort((userA, userB) =>
        userA.username.localeCompare(userB.username)
      )
    : [];

  const [selectedUsers, setSelectedUsers] = useState([]);

  //Selected users ordered alphabetically by username
  const orderedSelectedUsers = selectedUsers.length
    ? selectedUsers.sort((userA, userB) =>
        userA.username.localeCompare(userB.username)
      )
    : [];

  //Loading states
  const [isGettingAllGroups, setIsGettingAllGroups] = useState(false);
  const [isGettingCurrentGroup, setIsGettingCurrentGroup] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isJoiningGroup, setIsJoiningGroup] = useState(false);
  const [isExitingGroup, setIsExitingGroup] = useState(false);
  const [isDeletingGroup, setIsDeletingGroup] = useState(false);
  const [isGettingCurrentGroupTasks, setIsGettingCurrentGroupTasks] =
    useState(false);
  const [isGettingCurrentGroupTask, setIsGettingCurrentGroupTask] =
    useState(false);
  const [isCreatingGroupTask, setIsCreatingGroupTask] = useState(false);
  const [isCompletingGroupTask, setIsCompletingGroupTask] = useState(false);
  const [isDeletingGroupTask, setIsDeletingGroupTask] = useState(false);
  const [isSearchingNewMember, setIsSearchingNewMember] = useState(false);

  //Variables related to the created group success modal
  const [showcaseCreateGroupSuccessModal, setShowcaseCreateGroupSuccessModal] =
    useState(true);
  const [createGroupSuccessName, setCreateGroupSuccessName] = useState(
    "Designers in Group 9"
  );
  const [createGroupSuccessCode, setCreateGroupSuccessCode] =
    useState("9697XZ");
  const [createGroupSuccessInviteLink, setCreateGroupSuccessInviteLink] =
    useState("https://hora-student-app.vercel.app");

  //Variables related to the joinGroup page
  const [joinGroupError, setJoinGroupError] = useState("Some error");

  //Showcase modal after completing group task
  const [showcaseGroupTaskCompletedModal, setShowcaseGroupTaskCompletedModal] =
    useState(false);

  return (
    <GroupsContext.Provider
      value={{
        groups,
        currentGroupTaskInfo,
        currentGroupTasks,
        searchNewMemberResult,
        orderedSearchNewMemberResult,
        selectedUsers,
        orderedSelectedUsers,
        isGettingAllGroups,
        isGettingCurrentGroup,
        isCreatingGroup,
        isJoiningGroup,
        isExitingGroup,
        isDeletingGroup,
        isGettingCurrentGroupTasks,
        isGettingCurrentGroupTask,
        isCreatingGroupTask,
        isCompletingGroupTask,
        isDeletingGroupTask,
        isSearchingNewMember,
        joinGroupError,
        setJoinGroupError,
        createGroupSuccessCode,
        createGroupSuccessName,
        createGroupSuccessInviteLink,
        showcaseCreateGroupSuccessModal,
        setSelectedUsers,
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
