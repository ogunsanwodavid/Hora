import { NavLink } from "react-router-dom";

import { useAuth } from "../contexts/authContext";

import useOnlineStatus from "../hooks/useOnlineStatus";

import fullLogo from "../assets/fullLogo.svg";

import TasksIcon from "../icons/TasksIcon";
import GroupsIcon from "../icons/GroupsIcon";
import NotificationsIcon from "../icons/NotificationsIcon";

import { RiUser3Fill } from "react-icons/ri";

import { FiLogOut } from "react-icons/fi";

import profilePicDefault from "../assets/dave.jpeg";

function Sidebar() {
  const isOnline = useOnlineStatus();
  const { user, logout } = useAuth();
  const username = user?.username;
  const userEmail = user?.email;

  function handleLogout() {
    logout();
  }

  return (
    <div className="hidden w-[200px] h-full bg-blue800 rounded-3xl py-8 lg:flex lg:flex-col">
      {/**** Logo */}
      <img src={fullLogo} className="h-6 mx-auto" alt="" />
      {/**** Navlist */}
      <nav className="sidebar w-full flex flex-col gap-y-2 mt-8">
        {/**** Tasks navlink */}
        <NavLink
          to="/tasks"
          className="h-16 flex items-center gap-x-5 rounded-[2.5px]"
        >
          <div className="showcase-tag opacity-0 h-full w-[5px] rounded-[2.5px] bg-[#3f71fd]"></div>

          <main className="h-max flex items-center gap-x-3">
            <TasksIcon className="w-5 h-4" />
            <p className="navtext h-max text-[#d5e2ff] font-semibold">Tasks</p>
          </main>
        </NavLink>

        {/**** Groups navlink */}
        <NavLink
          to="/groups"
          className="h-16 flex items-center gap-x-5 rounded-[2.5px]"
        >
          <div className="showcase-tag opacity-0 h-full w-[5px] rounded-[2.5px] bg-[#3f71fd]"></div>

          <main className="h-max flex items-center gap-x-3">
            <GroupsIcon className="w-5" />
            <p className="navtext h-max text-[#d5e2ff] font-semibold">Groups</p>
          </main>
        </NavLink>

        {/**** Notifications navlink */}
        <NavLink
          to="/notifications"
          className="h-16 flex items-center gap-x-5 rounded-[2.5px]"
        >
          <div className="showcase-tag opacity-0 h-full w-[5px] rounded-[2.5px] bg-[#3f71fd]"></div>

          <main className="h-max flex items-center gap-x-3">
            <NotificationsIcon className="w-5 h-4" />
            <p className="navtext h-max text-[#d5e2ff] font-semibold">
              Notifications
            </p>
          </main>
        </NavLink>

        {/**** Profile navlink */}
        <NavLink
          to="/profile"
          className="h-16 flex items-center gap-x-5 rounded-[2.5px]"
        >
          <div className="showcase-tag opacity-0 h-full w-[5px] rounded-[2.5px] bg-[#3f71fd]"></div>

          <main className="h-max flex items-center gap-x-3">
            <RiUser3Fill className="w-5 text-[#d5e2ff]" />
            <p className="navtext h-max text-[#d5e2ff] font-semibold">
              Profile
            </p>
          </main>
        </NavLink>
      </nav>

      {/**** Footer of the sidebar */}
      <footer className="w-full mt-auto">
        {/**** Displays user profile information */}
        <div className="h-16 flex items-center mt-auto pl-[25px] gap-x-3 cursor-pointer">
          {/**** User Profile picture */}
          {/**** Shows online symbol only if user is online */}
          <section
            className={`relative w-5 h-5 ${
              isOnline &&
              "before:absolute before:-bottom-[2px] before:right-0 before:w-2 before:h-2 before:rounded-full before:bg-[#3f71fd]"
            }`}
          >
            <img
              src={profilePicDefault}
              className="h-5 w-5 rounded-full object-cover"
              alt=""
            />
          </section>

          {/**** Username and email */}
          <section className="space-y-0">
            <p className="text-[14px] text-white font-semibold text-ellipsis line-clamp-1">
              hoaxthegod
            </p>
            <p className="max-w-[120px] text-[14px] text-[#d5e2ff] font-regular whitespace-nowrap overflow-hidden text-ellipsis">
              minuteone969@gmail.com
            </p>
          </section>
        </div>

        {/**** Logout button */}
        <section
          className="h-16 flex items-center cursor-pointer pl-[25px]"
          onClick={handleLogout}
        >
          <main className="h-max flex items-center gap-x-3">
            <FiLogOut className="w-5 text-[#d5e2ff]" />
            <p className="navtext h-max text-[#d5e2ff] font-semibold">
              Log Out
            </p>
          </main>
        </section>
      </footer>
    </div>
  );
}

export default Sidebar;
