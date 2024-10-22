import { useState } from "react";

import { Link } from "react-router-dom";

import { capitalizeWords } from "../../../utils/helpers";

import kebabIcon from "../../../icons/kebabIcon.svg";

function GroupListItem({ group }) {
  //Group id
  const groupId = group._id;

  //Check if group was created by user
  const isGroupCreatedByUser = false;

  const [showcaseDropdown, setShowcaseDropdown] = useState(false);

  function handleEditGroup() {
    setShowcaseDropdown(false);
    console.log("edit group");
  }

  function handleDeleteGroup() {
    setShowcaseDropdown(false);
    console.log("delete group");
  }

  return (
    <div className="w-full relative flex items-center justify-between gap-x-2">
      {/**** Group info */}
      <Link to={`/groups/group/${groupId}`} className="w-full">
        {/**** Group name */}
        <h4 className="text-white font-semibold md:text-lg">
          {capitalizeWords(group.name)}
        </h4>
        <p className="text-[14px] text-[#B2B3BD] line-clamp-1 overflow-hidden text-ellipsis md:text-base">
          Created by Desire Destiny
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
          <div className="w-full p-3 bg-blue800" onClick={handleEditGroup}>
            Edit
          </div>
          <div className="w-full p-3 bg-blue900" onClick={handleDeleteGroup}>
            Delete
          </div>
        </section>
      )}
    </div>
  );
}

export default GroupListItem;
