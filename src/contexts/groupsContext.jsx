import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "./authContext";

import { toast } from "react-toastify";

const GroupsContext = createContext();

const GroupsProvider = ({ children }) => {
  //BASE URL
  const BASE_URL = "https://hora-1daj.onrender.com/group";

  //navigate
  const navigate = useNavigate();

  //User credentials
  const { user } = useAuth();
  const userId = user?._id;

  //Group variables
  const [groups, setGroups] = useState([]);

  //Make sure user is a member of the group on display
  const groupsUserIn = groups.length
    ? groups.filter((group) =>
        group.members.some((member) => member._id === userId)
      )
    : [];

  const [currentGroupInfo, setCurrentGroupInfo] = useState(null);

  const [currentGroupTasks, setCurrentGroupTasks] = useState([]);
  const [currentGroupTaskInfo, setCurrentGroupTaskInfo] = useState(null);

  const [searchNewMemberResult, setSearchNewMemberResult] = useState([]);

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
  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
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
  const [isRemovingGroupMember, setIsRemovingGroupMember] = useState(false);
  const [isInvitingNewMembers, setIsInvitingNewMembers] = useState(false);

  //Variables related to the created group success modal
  const [showcaseCreateGroupSuccessModal, setShowcaseCreateGroupSuccessModal] =
    useState(false);
  const [createGroupSuccessName, setCreateGroupSuccessName] = useState("");
  const [createGroupSuccessCode, setCreateGroupSuccessCode] = useState("");
  const [createGroupSuccessInviteLink, setCreateGroupSuccessInviteLink] =
    useState("https://hora-student-app.vercel.app/groups/joingroup");

  //Variables related to the joinGroup page
  const [joinGroupError, setJoinGroupError] = useState("");

  //Showcase modal after completing group task
  const [showcaseGroupTaskCompletedModal, setShowcaseGroupTaskCompletedModal] =
    useState(false);

  //Info of currently edited group
  const [editedGroupInfo, setEditedGroupInfo] = useState(null);

  //Function to get all groups
  const getAllGroups = async (userId) => {
    setIsGettingAllGroups(true);
    try {
      const response = await fetch(`${BASE_URL}/allgroups/${userId}`, {
        method: "GET",
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        //console.log(data);

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
        //console.log(data);

        // Group creation successful
        const {
          message: createGroupMessage,
          create: {
            groupName: createdGroupName,
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
        // console.log(data);

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

  //Function to edit group name
  const editGroup = async ({ groupId, groupName }) => {
    setIsEditingGroupName(true);
    try {
      const response = await fetch(`${BASE_URL}/groupName/${groupId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName,
        }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Edit group successful
        const { message: editGroupMessage } = data;

        //Navigate to group page
        navigate(`/groups/group/${groupId}`);

        return { success: true, editGroupMessage };
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
      setIsEditingGroupName(false);
    }
  };

  //Function to exit a group
  const exitGroup = async ({ groupId, userId }) => {
    setIsExitingGroup(true);
    try {
      const response = await fetch(`${BASE_URL}/${groupId}/leave/${userId}`, {
        method: "DELETE",
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
        //console.log(data);

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
  const deleteGroup = async (groupId, userId) => {
    setIsDeletingGroup(true);
    try {
      const response = await fetch(`${BASE_URL}/delete-group/${groupId}`, {
        method: "DELETE",
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        //console.log(data);

        // Delete group successful
        const { message: deleteGroupMessage } = data;

        //Toast message
        //toast.success(deleteGroupMessage);

        //Navigate to group page
        navigate("/groups");
        await getAllGroups(userId);

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
        //console.log(data);

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
        //console.log(data);

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

  //Function to complete a group task
  const completeGroupTask = async (taskId) => {
    const completedJSON = {
      completed: true,
    };

    setIsCompletingGroupTask(true);
    try {
      const response = await fetch(
        `https://hora-1daj.onrender.com/task/status/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completedJSON),
          redirect: "follow",
        }
      );

      const data = await response.json();

      if (response.ok) {
        //console.log(data);

        // Group Task completion successful
        const { message: completeGroupTaskMessage } = data;

        //Toast message
        //toast.success(completeGroupTaskMessage);

        //show group task completed modal
        setShowcaseGroupTaskCompletedModal(true);

        return { success: true, completeGroupTaskMessage };
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
      setIsCompletingGroupTask(false);
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
  const searchNewMember = async (searchString) => {
    setIsSearchingNewMember(true);
    try {
      const response = await fetch(
        `https://hora-1daj.onrender.com/user/search/?username=${searchString}`,
        {
          method: "GET",
          redirect: "follow",
        }
      );

      const data = await response.json();

      if (response.ok) {
        //console.log(data);

        // Search new member successful
        const { message: searchNewMemberMessage, data: searchNewMemberData } =
          data;

        //set search new member result
        await setSearchNewMemberResult(searchNewMemberData);

        return { success: true, searchNewMemberMessage };
      } else {
        //console.log(data);

        // toast error
        //toast.error(data.message || "An unexpected error occurred");

        //set search member result empty
        setSearchNewMemberResult([]);

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
      setIsSearchingNewMember(false);
    }
  };

  //Function to remove a group member
  const removeGroupMember = async (groupId, memberId) => {
    setIsRemovingGroupMember(true);
    try {
      const response = await fetch(
        `${BASE_URL}/${groupId}/member/${memberId}`,
        {
          method: "DELETE",
          redirect: "follow",
        }
      );

      const data = await response.json();

      if (response.ok) {
        //console.log(data);

        // Remove group member successful
        const { message: removeGroupMemberMessage } = data;

        //Get new info of the group
        await getCurrentGroup(groupId);

        return { success: true, removeGroupMemberMessage };
      } else {
        //console.log(data);

        // toast error
        //toast.error(data.message || "An unexpected error occurred");

        //set search member result empty

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
      setIsRemovingGroupMember(false);
    }
  };

  //Function to invite group members
  const inviteMembers = async ({ groupId, inviteLink, inviterId, emails }) => {
    setIsInvitingNewMembers(true);
    try {
      const response = await fetch(`${BASE_URL}/send-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId,
          inviteLink,
          inviterId,
          emails,
        }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        //console.log(data);

        // Invite member successful
        const { message: inviteMemberMessage } = data;

        //Toast message
        //toast.success(inviteMemberMessage);

        //Navigate to previous page
        navigate(-1);

        return { success: true, inviteMemberMessage };
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
      setIsInvitingNewMembers(false);
    }
  };

  return (
    <GroupsContext.Provider
      value={{
        groups,
        groupsUserIn,
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
        editGroup,
        exitGroup,
        deleteGroup,
        getCurrentGroupTasks,
        getCurrentGroupTask,
        createGroupTask,
        completeGroupTask,
        deleteGroupTask,
        searchNewMember,
        removeGroupMember,
        inviteMembers,
        isGettingAllGroups,
        isGettingCurrentGroup,
        isCreatingGroup,
        isJoiningGroup,
        isEditingGroupName,
        isExitingGroup,
        isDeletingGroup,
        isGettingCurrentGroupTasks,
        isGettingCurrentGroupTask,
        isCreatingGroupTask,
        isCompletingGroupTask,
        isDeletingGroupTask,
        isSearchingNewMember,
        isRemovingGroupMember,
        isInvitingNewMembers,
        joinGroupError,
        editedGroupInfo,
        setJoinGroupError,
        createGroupSuccessCode,
        createGroupSuccessName,
        createGroupSuccessInviteLink,
        showcaseCreateGroupSuccessModal,
        showcaseGroupTaskCompletedModal,
        setShowcaseCreateGroupSuccessModal,
        setSelectedUsers,
        setEditedGroupInfo,
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
