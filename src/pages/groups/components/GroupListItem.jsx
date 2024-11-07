import { useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts/authContext";
import { useGroups } from "../../../contexts/groupsContext";

import { capitalizeWords } from "../../../utils/helpers";

import DeleteGroupConfirmationModal from "./DeleteGroupConfirmationModal";
import DeletingGroupLoader from "./DeletingGroupLoader";
import EditingGroupNameLoader from "./EditingGroupNameLoader";

import kebabIcon from "../../../icons/kebabIcon.svg";

function GroupListItem({ group }) {
  //Variables from user context
  const { user } = useAuth();
  const userId = user?._id;

  //Variables from groups context
  const { isDeletingGroup, isEditingGroupName } = useGroups();

  //Group id
  const groupId = group._id;

  //Check if group was created by user
  const isGroupCreatedByUser = group?.createdBy?._id === userId;

  const [showcaseDropdown, setShowcaseDropdown] = useState(false);

  //state to showcase delete confirm modal
  const [
    showcaseDeleteConfirmationModal,
    setShowcaseDeleteGroupConfirmationModal,
  ] = useState(false);

  function handleDeleteGroup() {
    setShowcaseDeleteGroupConfirmationModal(true);
    setShowcaseDropdown(false);
    //console.log("delete group");
  }

  return (
    <>
      <div className="w-full relative flex items-center justify-between gap-x-2">
        {/**** Group info */}
        <Link to={`/groups/group/${groupId}`} className="w-full">
          {/**** Group name */}
          <h4 className="text-white font-semibold md:text-lg">
            {capitalizeWords(group?.groupName)}
          </h4>
          <p className="text-[14px] text-[#B2B3BD] line-clamp-1 overflow-hidden text-ellipsis md:text-base">
            {/* Created by Desire Destiny */}
            Created by{" "}
            {isGroupCreatedByUser ? "You" : group?.createdBy?.username}
          </p>
        </Link>

        {/**** More icon */}
        {isGroupCreatedByUser && (
          <img
            src={kebabIcon}
            className="h-4"
            alt="kebab icon"
            onClick={() => setShowcaseDropdown((state) => !state)}
          />
        )}

        {/****** Dropdown */}
        {showcaseDropdown && (
          <section className="w-[140px] rounded-[8px] overflow-hidden absolute top-6 mt-3 -right-2 text-white cursor-pointer z-10">
            <Link
              to={`/groups/group/edit/${groupId}`}
              className="block w-full p-3 bg-blue800"
            >
              Edit
            </Link>
            <div className="w-full p-3 bg-blue900" onClick={handleDeleteGroup}>
              Delete
            </div>
          </section>
        )}
      </div>

      {/*** Showcase Deleting Group loader */}
      {isDeletingGroup && <DeletingGroupLoader />}

      {/*** Showcase Editing Group Name loader */}
      {isEditingGroupName && <EditingGroupNameLoader />}

      {/**** Delete Group Confirmation Modal */}
      {showcaseDeleteConfirmationModal && !isDeletingGroup && (
        <DeleteGroupConfirmationModal
          groupId={groupId}
          setShowcaseDeleteGroupConfirmationModal={
            setShowcaseDeleteGroupConfirmationModal
          }
        />
      )}
    </>
  );
}

export default GroupListItem;
