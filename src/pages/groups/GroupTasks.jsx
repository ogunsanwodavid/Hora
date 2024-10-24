import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useGroups } from "../../contexts/groupsContext";
import { useAppDesign } from "../../contexts/appDesignContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import GroupTasksList from "./components/GroupTasksList";
import GroupTasksTable from "./components/GroupTasksTable";
import GettingCurrentGroupTasksLoader from "./components/GettingCurrentGroupTasksLoader";
import CreateGroupTaskButton from "./components/CreateGroupTaskButton";
import NoTasksTableError from "./components/NoTasksTableError";

import NoTasksError from "../../pages/tasks/components/NoTasksError";

import backButton from "../../icons/leftArrowIcon.svg";

function GroupTasks() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Navigate
  const navigate = useNavigate();

  //App design info
  const { setShowcaseMobileNav } = useAppDesign();

  //Dont show mobile navbar on mount
  useEffect(() => {
    setShowcaseMobileNav(false);

    return () => {
      setShowcaseMobileNav(true);
    };
  }, [setShowcaseMobileNav]);

  //Route parameters
  const { groupId } = useParams();

  //Variables from groups context
  const { isGettingCurrentGroupTasks, currentGroupTasks } = useGroups();

  //Group information
  const groupName = "Designers in Group 8";

  //Group members info
  const groupMembers = [
    {
      _id: "01",
      username: "desire007",
    },
    {
      _id: "02",
      username: "boluwatife010",
    },
    {
      _id: "03",
      username: "hoaxthagod",
    },
    {
      _id: "04",
      username: "00xdave",
    },
    {
      _id: "05",
      username: "incognito_lord",
    },
    {
      _id: "06",
      username: "Redemptionsync",
    },
    {
      _id: "07",
      username: "Beatthemyth",
    },
    {
      _id: "08",
      username: "blink200",
    },
  ];

  //active state of scroll
  const [scrollDisplay, setScrollDisplay] = useState("grouptasks");
  const isScrollDisplayGroupTasks = scrollDisplay === "grouptasks";
  const isScrollDisplayTasksTable = scrollDisplay === "taskstable";

  return (
    <>
      <div
        className="w-full relative max-w-[700px] mx-auto px-3 pb-[80px] flex flex-col lg:!min-h-full lg:max-w-[747.52px]"
        style={{
          minHeight: `${windowHeight - 40}px`,
        }}
      >
        {/*** Header */}
        <header className="relative w-full flex items-center gap-x-4 md:mt-4 md:gap-x-8">
          {/*** Back button */}
          <img
            src={backButton}
            className="w-4"
            alt="Back button"
            onClick={() => navigate(-1)}
          />

          {/**** Group info */}
          <section className="w-full relative flex flex-col">
            <h3 className="text-white text-lg font-semibold line-clamp-1 overflow-hidden text-ellipsis md:text-[20px]">
              {groupName}
            </h3>

            {/***** Group members */}
            <p className="w-full text-white text-[14px] line-clamp-1 overflow-hidden text-ellipsis md:text-base">
              {groupMembers.map((member) => member.username).join(", ")}
            </p>
          </section>
        </header>

        {/**** Scroll */}
        {!isGettingCurrentGroupTasks && (
          <nav className="grouptasks-nav-scroll w-full flex mt-6 cursor-pointer md:mt-8">
            <div
              to="/groups/group/tasks/grouptasks/:id"
              className={`w-1/2 border-b-[0.8px] border-[#393A40] pb-1 md:pb-2 ${
                isScrollDisplayGroupTasks && "!border-blue200 !border-b-[1.4px]"
              }`}
              onClick={() => setScrollDisplay("grouptasks")}
            >
              <p
                className={`text-[#828282] text-center md:text-lg ${
                  isScrollDisplayGroupTasks && "!text-blue200 font-semibold"
                }`}
              >
                Group Tasks
              </p>
            </div>

            <div
              className={`w-1/2 border-b-[0.8px] border-[#393A40] pb-1 md:pb-2 ${
                isScrollDisplayTasksTable && "!border-blue200 !border-b-[1.4px]"
              }`}
              onClick={() => setScrollDisplay("taskstable")}
            >
              <p
                className={`text-[#828282] text-center md:text-lg ${
                  isScrollDisplayTasksTable && "!text-blue200 font-semibold"
                }`}
              >
                Task Table
              </p>
            </div>
          </nav>
        )}

        {/**** Main content */}
        {!isGettingCurrentGroupTasks && (
          <main className="w-full mt-4 flex flex-col flex-grow md:mt-6">
            {isScrollDisplayGroupTasks &&
              (currentGroupTasks.length ? (
                <GroupTasksList />
              ) : (
                <NoTasksError />
              ))}
            {isScrollDisplayTasksTable &&
              (currentGroupTasks.length ? (
                <GroupTasksTable />
              ) : (
                <NoTasksTableError />
              ))}
          </main>
        )}

        {isGettingCurrentGroupTasks && <GettingCurrentGroupTasksLoader />}
      </div>

      {!isGettingCurrentGroupTasks && <CreateGroupTaskButton />}
    </>
  );
}

export default GroupTasks;
