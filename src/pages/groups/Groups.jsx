import { Link } from "react-router-dom";

import { useGroups } from "../../contexts/groupsContext.jsx";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import GroupsList from "./components/GroupsList";
import NoGroupError from "./components/NoGroupError";

import NotificationsIcon from "../../icons/NotificationsIcon.jsx";

function Groups() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Variables from groups context
  const { groups } = useGroups();

  return (
    <div
      className="w-full max-w-[700px] mx-auto relative flex flex-col pb-[40px] lg:!min-h-[552px] lg:pb-0  lg:max-w-none"
      style={{
        minHeight: `${windowHeight - 130}px`,
      }}
    >
      {/**** Header */}
      <header className="w-full flex items-center justify-between lg:mt-4">
        <h2 className="text-[20px] text-white font-semibold md:text-[22px]">
          Groups
        </h2>

        <Link to="/notifications" className="relative lg:hidden">
          {/**** Notification icon */}
          <main className="w-[40px] h-[40px] bg-blue900 rounded-[100px] flex items-center justify-center">
            <NotificationsIcon className="w-[18px]" />
          </main>

          {/**** Notification count */}
          <div className="absolute top-0 -right-[5px] w-4 h-4 rounded-full bg-blue200 flex items-center justify-center">
            <span className="text-[11px] text-white font-semibold">3</span>
          </div>
        </Link>
      </header>

      {/**** Show error if no group else show list of groups */}
      {groups ? <GroupsList /> : <NoGroupError />}
    </div>
  );
}

export default Groups;
