import { useState } from "react";

import { useAuth } from "../../../contexts/authContext";

import { FaUserCircle } from "react-icons/fa";

import kebabIcon from "../../../icons/kebabIcon.svg";

const GroupMembersList = ({
  isGroupCreatedByUser,
  groupMembers,
  setRemoveMemberInfo,
  setShowcaseRemoveMemberModal,
}) => {
  //User credentials
  const { user } = useAuth();
  const userId = user?._id;

  //Visible members
  const [visibleMembers, setVisibleMembers] = useState(5); // Start by showing 5 members

  //State of dropdown member
  const [showcaseMemberDropdown, setShowcaseMemberDropdown] = useState("");

  // Function to show 5 more members each time
  const handleShowMore = () => {
    setVisibleMembers((prev) => prev + 5);
  };

  // Function to reset to only 5 members
  const handleShowLess = () => {
    setVisibleMembers(5);
  };

  return (
    <>
      {groupMembers.slice(0, visibleMembers).map((member) => {
        const memberId = member?._id;

        //Check if member is the user
        const isMemberUser = memberId === userId;

        //Check member's dropdown is showcased
        const isMemberDropdownShowcased = showcaseMemberDropdown === memberId;

        //Function to show more options for a member
        function handleMore() {
          //Empty showcase member dropdown is current member's dropdown is showcased
          if (isMemberDropdownShowcased) {
            setShowcaseMemberDropdown("");
          } else {
            //else, set current member's dropdown to show
            setShowcaseMemberDropdown(memberId);
          }
        }

        //Function to remove member
        function handleRemoveMember() {
          setShowcaseMemberDropdown("");
          setRemoveMemberInfo(member);
          setShowcaseRemoveMemberModal(true);
        }

        return (
          <div
            className="flex items-center gap-x-3 relative md:gap-x-5"
            key={memberId}
          >
            {/**** Profile picture of member */}
            <FaUserCircle className="h-[40px] w-[40px] object-cover rounded-full md:h-[45px] md:w-[45px] fill-blue600 " />

            {/**** Member username */}
            <h5 className="text-white font-semibold md:text-lg">
              {member.username}
            </h5>

            {/**** More icon */}
            {isGroupCreatedByUser && !isMemberUser && (
              <img
                src={kebabIcon}
                className="h-3 ml-auto"
                alt="white kebab icon"
                onClick={() => handleMore()}
              />
            )}

            {/**** Dropdown */}
            {isMemberDropdownShowcased && (
              <section
                className="z-10 rounded-[8px] overflow-hidden absolute top-3/4 mt-0 right-0 text-white text-[13px] cursor-pointer md:text-[15px]"
                onClick={handleRemoveMember}
              >
                <div className="block w-full p-2 bg-blue700 md:p-3">
                  Remove member
                </div>
              </section>
            )}
          </div>
        );
      })}

      <div className="mt-4">
        {/**** Show More button */}
        {visibleMembers < groupMembers.length && (
          <button
            className="text-blue200 font-semibold"
            onClick={handleShowMore}
          >
            Show More...
          </button>
        )}

        {/**** Show Less button */}
        {visibleMembers >= groupMembers.length && groupMembers.length > 5 && (
          <button
            className="text-blue200 font-semibold"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        )}
      </div>
    </>
  );
};

export default GroupMembersList;
