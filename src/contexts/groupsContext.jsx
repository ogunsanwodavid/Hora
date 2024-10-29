import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const GroupsContext = createContext();

const GroupsProvider = ({ children }) => {
  //BASE URL
  const BASE_URL = "https://hora-1daj.onrender.com/group";

  //navigate
  const navigate = useNavigate();

  //Group variables
  const [groups, setGroups] = useState([
    /*
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
    }, */
  ]);
  const [currentGroupInfo, setCurrentGroupInfo] = useState(null);

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
        username: "00xdave",
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
    /*     {
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
    }, */
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
  const [isInvitingNewMembers, setIsInvitingNewMembers] = useState(false);

  //Variables related to the created group success modal
  const [showcaseCreateGroupSuccessModal, setShowcaseCreateGroupSuccessModal] =
    useState(false);
  const [createGroupSuccessName, setCreateGroupSuccessName] = useState("");
  const [createGroupSuccessCode, setCreateGroupSuccessCode] = useState("");
  const [createGroupSuccessInviteLink, setCreateGroupSuccessInviteLink] =
    useState("https://hora-student-app.vercel.app/groups/joingroup");

  //Variables related to the joinGroup page
  const [joinGroupError, setJoinGroupError] = useState("Some error");

  //Showcase modal after completing group task
  const [showcaseGroupTaskCompletedModal, setShowcaseGroupTaskCompletedModal] =
    useState(false);

  //Function to get all groups
  const getAllGroups = async (userId) => {
    setIsGettingAllGroups(true);
    try {
      const response = await fetch(`${BASE_URL}/all-groups/${userId}`, {
        method: "GET",
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // All tasks gotten successful
        const { message: getAllGroupsMessage } = data;

        //Toast message
        //toast.success(getAllTasksMessage);

        //set all tasks
        await setGroups(data.groups);

        return { success: true, getAllGroupsMessage };
      } else {
        //console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        //set all tasks empty
        setGroups([]);

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
      setIsGettingAllGroups(false);
    }
  };

  //Function to get current group
  const getCurrentGroup = async (groupId) => {
    setIsGettingCurrentGroup(true);
    try {
      const response = await fetch(`${BASE_URL}/${groupId}`, {
        method: "GET",
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Current task gotten successful
        const { message: getCurrentGroupMessage } = data;

        //Toast message
        // toast.success(getCurrentGroupMessage);

        //set current task info
        await setCurrentGroupInfo(data.group);

        return { success: true, getCurrentGroupMessage };
      } else {
        //console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        //Navigate to groups page
        navigate("/groups");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      //Navigate to groups page
      navigate("/groups");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsGettingCurrentGroup(false);
    }
  };

  //Function to create a group
  const createGroup = async ({ groupName, userId }) => {
    setIsCreatingGroup(true);
    try {
      const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName,
          userId,
        }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Group creation successful
        const {
          message: createGroupMessage,
          create: {
            name: createdGroupName,
            inviteLink: createdGroupInviteCode,
          },
        } = data;

        //Toast message
        //toast.success(createGroupMessage);

        //showcase create group successful modal
        setShowcaseCreateGroupSuccessModal(true);

        //created group name and invite code
        setCreateGroupSuccessName(createdGroupName);
        setCreateGroupSuccessCode(createdGroupInviteCode);

        //Navigate to group page
        //navigate("/groups");

        return { success: true, createGroupMessage };
      } else {
        //console.log(data);
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
      setIsCreatingGroup(false);
    }
  };

  //Function to join a group
  const joinGroup = async ({ userId, inviteLink }) => {
    setIsJoiningGroup(true);
    try {
      const response = await fetch(`${BASE_URL}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          inviteLink,
        }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Join group successful
        const { message: joinGroupMessage } = data;

        //Toast message
        //toast.success(joinGroupMessage);

        //Navigate to group page
        navigate("/groups");

        return { success: true, joinGroupMessage };
      } else {
        //console.log(data);
        // toast error
        //toast.error(data.message || "An unexpected error occurred");

        //set join group error
        setJoinGroupError(data.message);

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      //toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsJoiningGroup(false);
    }
  };

  //Function to exit a group
  const exitGroup = async ({ groupId, userId }) => {
    setIsExitingGroup(true);
    try {
      const response = await fetch(`${BASE_URL}/${groupId}/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Exit group successful
        const { message: exitGroupMessage } = data;

        //Toast message
        //toast.success(exitGroupMessage);

        //Navigate to group page
        navigate("/groups");

        return { success: true, exitGroupMessage };
      } else {
        //console.log(data);
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
      setIsExitingGroup(false);
    }
  };

  //Function to delete a group
  const deleteGroup = async (groupId) => {
    setIsDeletingGroup(true);
    try {
      const response = await fetch(`${BASE_URL}/delete-group/${groupId}`, {
        method: "DELETE",
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Delete group successful
        const { message: deleteGroupMessage } = data;

        //Toast message
        //toast.success(deleteGroupMessage);

        //Navigate to group page
        navigate("/groups");

        return { success: true, deleteGroupMessage };
      } else {
        //console.log(data);
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
      setIsDeletingGroup(false);
    }
  };

  //Function to get all current group tasks
  const getCurrentGroupTasks = async (groupId) => {
    setIsGettingCurrentGroupTasks(true);
    try {
      const response = await fetch(`${BASE_URL}/${groupId}/tasks`, {
        method: "GET",
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // All current group tasks gotten successful
        const { message: getCurrentGroupTasksMessage } = data;

        //Toast message
        //toast.success(getCurrentGroupTasksMessage);

        //set all tasks
        await setCurrentGroupTasks(data.allTasks);

        return { success: true, getCurrentGroupTasksMessage };
      } else {
        //console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        //set all tasks empty
        setCurrentGroupTasks(null);

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
      setIsGettingCurrentGroupTasks(false);
    }
  };

  //Function to get current group task
  const getCurrentGroupTask = async (groupId, taskId) => {
    setIsGettingCurrentGroupTask(true);
    try {
      const response = await fetch(`${BASE_URL}/${groupId}/task/${taskId}`, {
        method: "GET",
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Current group task gotten successful
        const { message: getCurrentGroupTaskMessage } = data;

        //Toast message
        //toast.success(getCurrentGroupTaskMessage);

        //set all tasks
        await setCurrentGroupTaskInfo(data.task);

        return { success: true, getCurrentGroupTaskMessage };
      } else {
        //console.log(data);

        // toast error
        toast.error(data.message || "An unexpected error occurred");

        //set group task info empty
        setCurrentGroupTaskInfo(null);

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
      setIsGettingCurrentGroupTask(false);
    }
  };

  //Function to create a group task
  const createGroupTask = async ({
    groupId,
    title,
    description,
    dueDate,
    time,
    repeatTask,
    createdBy,
  }) => {
    setIsCreatingGroupTask(true);
    try {
      const response = await fetch(`${BASE_URL}/new-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId,
          title,
          description,
          dueDate,
          time,
          repeatTask,
          createdBy,
        }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        //console.log(data);

        // Group ask creation successful
        const { message: createGroupTaskMessage } = data;

        //Toast message
        //toast.success(createGroupTaskMessage);

        //Navigate to previous page
        navigate(-1);

        return { success: true, createGroupTaskMessage };
      } else {
        //console.log(data);
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
      setIsCreatingGroupTask(false);
    }
  };

  //Function to delete a group task
  const deleteGroupTask = async (groupId, taskId) => {
    setIsDeletingGroupTask(true);
    try {
      const response = await fetch(`${BASE_URL}/${groupId}/task/${taskId}`, {
        method: "DELETE",
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        //console.log(data);

        // Group task deletion successful
        const { message: deleteGroupTaskMessage } = data;

        //Toast message
        //toast.success(deleteGroupTaskMessage);

        //Navigate to previous page
        navigate(-1);

        return { success: true, deleteGroupTaskMessage };
      } else {
        //console.log(data);
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
      setIsDeletingGroupTask(false);
    }
  };

  //Function to search for a new member
  const searchNewMember = async (userId, searchString) => {
    setIsSearchingNewMember(true);
    try {
      const response = await fetch(
        `"https://hora-1daj.onrender.com/user/username/${userId}?username=${searchString}`,
        {
          method: "GET",
          redirect: "follow",
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Search new member successful
        const { message: searchNewMemberMessage } = data;

        //Toast message
        //toast.success(searchNewMemberMessage);

        //set all tasks
        await setSearchNewMemberResult(data.data);

        return { success: true, searchNewMemberMessage };
      } else {
        //console.log(data);

        // toast error
        toast.error(data.message || "An unexpected error occurred");

        //set search member resulyt empty
        setSearchNewMemberResult([]);

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
      setIsSearchingNewMember(false);
    }
  };

  return (
    <GroupsContext.Provider
      value={{
        groups,
        currentGroupInfo,
        currentGroupTaskInfo,
        currentGroupTasks,
        searchNewMemberResult,
        orderedSearchNewMemberResult,
        selectedUsers,
        orderedSelectedUsers,
        getAllGroups,
        getCurrentGroup,
        createGroup,
        joinGroup,
        exitGroup,
        deleteGroup,
        getCurrentGroupTasks,
        getCurrentGroupTask,
        createGroupTask,
        deleteGroupTask,
        searchNewMember,
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
        isInvitingNewMembers,
        joinGroupError,
        setJoinGroupError,
        createGroupSuccessCode,
        createGroupSuccessName,
        createGroupSuccessInviteLink,
        showcaseCreateGroupSuccessModal,
        showcaseGroupTaskCompletedModal,
        setShowcaseCreateGroupSuccessModal,
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
