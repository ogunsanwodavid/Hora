import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";
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

  //User credentials
  const { user } = useAuth();
  const userId = user?._id;

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
  const {
    currentGroupInfo,
    getCurrentGroupTasks,
    isGettingCurrentGroupTasks,
    currentGroupTasks,
  } = useGroups();

  //Get current group tasks on mount
  useEffect(() => {
    getCurrentGroupTasks(groupId);
  }, []);

  //Group information
  const groupName = currentGroupInfo?.groupName;

  //Group members info
  const groupMembers = currentGroupInfo?.members;

  //active state of scroll
  const [scrollDisplay, setScrollDisplay] = useState("grouptasks");
  const isScrollDisplayGroupTasks = scrollDisplay === "grouptasks";
  const isScrollDisplayTasksTable = scrollDisplay === "taskstable";

  return (
    <>
      <div
        className="w-full relative max-w-[700px] mx-auto px-3 pb-[80px] flex flex-col lg:!min-h-full lg:max-w-[725px]"
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
              {groupMembers &&
                groupMembers
                  .map((member) =>
                    member._id === userId ? "You" : member.username
                  )
                  .join(", ")}
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

        {/**** Loader when getting current group tasks */}
        {isGettingCurrentGroupTasks && <GettingCurrentGroupTasksLoader />}
      </div>

      {/**** Show create group task button  */}
      {!isGettingCurrentGroupTasks && !isScrollDisplayTasksTable && (
        <CreateGroupTaskButton />
      )}
    </>
  );
}

export default GroupTasks;
