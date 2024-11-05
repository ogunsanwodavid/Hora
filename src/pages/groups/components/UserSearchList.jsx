import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useGroups } from "../../../contexts/groupsContext";

import UserSearchListItem from "./UserSearchListItem";

function UserSearchList() {
  //Variables from groups context
  const {
    orderedSearchNewMemberResult,
    selectedUsers,
    orderedSelectedUsers,
    setSelectedUsers,
  } = useGroups();

  //Reset the selected users array empty on unmount
  useEffect(() => {
    return () => {
      setSelectedUsers([]);
    };
  }, []);

  //Check if selected user has reached max value
  const isSelectedUsersMax = selectedUsers.length === 4;

  return (
    <section className="w-full space-y-5 mt-6 md:space-y-8">
      {orderedSelectedUsers.map((newMember) => {
        const newMemberId = newMember?._id;

        //Check if user is already seelcted
        const isUserSelected = selectedUsers.some(
          (user) => user._id === newMemberId
        );

        function handleClickUser() {
          setSelectedUsers(
            selectedUsers.filter((selectedUser) => {
              return selectedUser?._id !== newMemberId;
            })
          );
        }

        return (
          <UserSearchListItem
            newMember={newMember}
            isUserSelected={isUserSelected}
            key={newMemberId}
            onClick={handleClickUser}
          />
        );
      })}

      {orderedSearchNewMemberResult.map((newMember) => {
        const newMemberId = newMember?._id;

        //Check if user is already seelcted
        const isUserSelected = selectedUsers.some(
          (user) => user._id === newMemberId
        );

        //Function when a user item is clicked
        async function handleClickUser() {
          if (!isSelectedUsersMax) {
            // setSelectedUsers([...selectedUsers, newMember]);
            await setSelectedUsers((prevUsers) => [...prevUsers, newMember]);
          } else {
            //Toast error
            toast.dismiss();
            toast.error("Max of 4 users can be added");
            return;
          }
        }

        if (isUserSelected) return;

        return (
          <UserSearchListItem
            newMember={newMember}
            isUserSelected={isUserSelected}
            key={newMemberId}
            onClick={handleClickUser}
          />
        );
      })}
    </section>
  );
}

export default UserSearchList;
