import DefaultProfilePic from "../../../assets/dave.jpeg";
import { FaUserCircle } from "react-icons/fa";

import { FaCheck } from "react-icons/fa6";

function UserSearchListItem({ newMember, isUserSelected, onClick }) {
  return (
    <div
      className="w-full flex items-center gap-x-3 cursor-pointer md:gap-x-4"
      onClick={onClick}
    >
      {/***** Select status box: shows tick if user is selected */}
      <div
        className={`h-[15px] w-[15px] flex-shrink-0 border-white border-[0.8px] rounded-[3px] flex items-center justify-center md:h-[17px] md:w-[17px] ${
          isUserSelected && "!border-blue200 bg-blue200"
        }`}
      >
        {isUserSelected && (
          <FaCheck className="text-white text-[11px] md:text-[13px]" />
        )}
      </div>

      {/**** User profile picture */}
      {/* <img
        src={DefaultProfilePic}
        className="h-[35px] w-[35px] flex-shrink-0 rounded-full object-cover md:h-[40px] md:w-[40px]"
        alt="user profile picture"
      /> */}
      <FaUserCircle className="h-[35px] w-[35px] flex-shrink-0 rounded-full object-cover md:h-[40px] md:w-[40px] fill-blue600" />

      {/**** User details */}
      <section className="w-full flex-grow">
        <h5 className="w-full text-white font-semibold md:text-[17px]">
          {newMember.username}
        </h5>
        <p className="w-full text-white text-[14px]  md:text-[15px]">
          {newMember.email}
        </p>
      </section>
    </div>
  );
}

export default UserSearchListItem;
