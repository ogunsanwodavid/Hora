import { NavLink } from "react-router-dom";

import TasksIcon from "../icons/TasksIcon";
import GroupsIcon from "../icons/GroupsIcon";

import profilePicDefault from "../assets/dave.jpeg";

function MobileNavbar() {
  return (
    <nav className="mobile-navbar w-full bg-darkestBlue fixed bottom-0 left-0 border-t-[1.5px] border-[#303136] h-[70px] flex items-center lg:hidden">
      {/***** Tasks navlink */}
      <NavLink
        to="/tasks"
        className="w-1/3 space-y-2 flex flex-col items-center justify-center"
      >
        <TasksIcon className="w-5" />
        <p className="navtext text-[14px] text-[#EEEEF0] font-semibold">
          Tasks
        </p>
      </NavLink>

      {/***** Groups navlink */}
      <NavLink
        to="/groups"
        className="w-1/3 space-y-2 flex flex-col items-center justify-center"
      >
        <GroupsIcon className="w-5" />
        <p className="navtext text-[14px] text-[#EEEEF0] font-semibold">
          Groups
        </p>
      </NavLink>

      {/***** Profile navlink */}
      <NavLink
        to="/profile"
        className="w-1/3 space-y-2 flex flex-col items-center justify-center"
      >
        <img
          src={profilePicDefault}
          className="w-5 h-5 rounded-full object-cover"
        />
        <p className="navtext text-[14px] text-[#EEEEF0] font-semibold">
          Profile
        </p>
      </NavLink>
    </nav>
  );
}

export default MobileNavbar;
