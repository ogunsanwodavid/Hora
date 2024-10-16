import { NavLink } from "react-router-dom";

import useOnlineStatus from "../hooks/useOnlineStatus";

import TasksIcon from "../icons/TasksIcon";
import GroupsIcon from "../icons/GroupsIcon";

import profilePicDefault from "../assets/dave.jpeg";

function MobileNavbar() {
  //Online status
  const isOnline = useOnlineStatus();

  return (
    <nav className="mobile-navbar w-full bg-darkestBlue fixed bottom-0 left-0 border-t-[1.5px] border-[#303136] h-[70px] md:h-[80px] lg:hidden">
      <main className="w-full h-full max-w-[700px] mx-auto flex items-center md:justify-between">
        {/***** Tasks navlink */}
        <NavLink
          to="/tasks"
          className="w-1/3 space-y-2 flex flex-col items-center justify-center md:w-max"
        >
          <TasksIcon className="w-5 md:w-6" />
          <p className="navtext text-[14px] text-[#EEEEF0] font-semibold md:text-base">
            Tasks
          </p>
        </NavLink>

        {/***** Groups navlink */}
        <NavLink
          to="/groups"
          className="w-1/3 space-y-2 flex flex-col items-center justify-center md:w-max"
        >
          <GroupsIcon className="w-5 md:w-6" />
          <p className="navtext text-[14px] text-[#EEEEF0] font-semibold md:text-base">
            Groups
          </p>
        </NavLink>

        {/***** Profile navlink */}
        <NavLink
          to="/profile"
          className="w-1/3 space-y-2 flex flex-col items-center justify-center md:w-max"
        >
          <section
            className={`relative w-max ${
              isOnline &&
              "before:absolute before:-bottom-[2px] before:right-0 before:w-2 before:h-2 before:rounded-full before:bg-[#3f71fd]"
            }`}
          >
            <img
              src={profilePicDefault}
              className="w-5 h-5 rounded-full object-cover md:w-6 md:h-6"
            />
          </section>
          <p className="navtext text-[14px] text-[#EEEEF0] font-semibold md:text-base">
            Profile
          </p>
        </NavLink>
      </main>
    </nav>
  );
}

export default MobileNavbar;
