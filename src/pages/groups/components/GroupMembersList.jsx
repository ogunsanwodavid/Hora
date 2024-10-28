import { useState } from "react";

import defaultProfilePic from "../../../assets/dave.jpeg";
import { FaUserCircle } from "react-icons/fa";

const GroupMembersList = ({ groupMembers }) => {
  const [visibleMembers, setVisibleMembers] = useState(5); // Start by showing 5 members

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

        return (
          <div className="flex items-center gap-x-3 md:gap-x-5" key={memberId}>
            {/**** Profile picture of member */}
            {/* <img
              src={defaultProfilePic}
              className="h-[40px] w-[40px] object-cover rounded-full md:h-[45px] md:w-[45px]"
              alt=""
            /> */}
            <FaUserCircle className="h-[40px] w-[40px] object-cover rounded-full md:h-[45px] md:w-[45px] fill-blue600 " />

            {/**** Member username */}
            <h5 className="text-white font-semibold md:text-lg">
              {member.username}
            </h5>
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
