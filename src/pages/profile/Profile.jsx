import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useTasks } from "../../contexts/tasksContext";
import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import DailyProgressBox from "./components/DailyProgressBox";
import DailySummaryBox from "./components/DailySummaryBox";
import DailyStreakBox from "./components/DailyStreakBox";

import rightCaretIcon from "../../icons/rightCaretIcon.svg";

import { FaUserCircle } from "react-icons/fa";

function Profile() {
  //User credentials
  const { user } = useAuth();
  const userId = user?._id;
  const username = user?.username;
  const userEmail = user?.email;

  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Variables from tasks context
  const { getTodayTasksInfo, todayTasksTotal } = useTasks();

  //Get today tasks info on mount
  useEffect(() => {
    getTodayTasksInfo(userId);
  }, []);

  return (
    <div
      className="w-full max-w-[700px] mx-auto relative  pb-[100px] lg:!min-h-[552px] lg:pb-0  lg:max-w-none"
      style={{
        minHeight: `${windowHeight - 77}px`,
      }}
    >
      {/**** Header */}
      <header className="w-full flex items-center justify-between lg:mt-4">
        <h2 className="text-[20px] text-white font-semibold md:text-[22px]">
          Profile
        </h2>
      </header>

      {/**** User details */}
      <Link
        className="w-full flex items-center gap-x-3 mt-4"
        to="/profile/settings"
      >
        {/**** Profile picture */}
        <FaUserCircle className="h-[40px] w-[40px] flex-shrink-0 md:h-[43px] md:w-[43px] rounded-full object-cover fill-blue700" />

        {/**** Username and email */}
        <div className="flex-grow overflow-hidden text-ellipsis">
          <p className=" text-white text-[17px] font-semibold  overflow-hidden text-ellipsis md:text-[19px]">
            {username}
          </p>
          <p className="text-[#B2B3BD] text-[14px] overflow-hidden text-ellipsis md:text-base">
            {userEmail}
          </p>
        </div>

        {/**** Right caret icon */}
        <img src={rightCaretIcon} className="h-4 ml-auto" alt="" />
      </Link>

      {/**** Daiy progress box*/}
      <DailyProgressBox />

      {/**** Daily activities summary box */}
      {/**** Show only if there is at least a task today */}
      {todayTasksTotal > 0 && <DailySummaryBox />}

      {/*** Daily streak summary box */}
      <DailyStreakBox />
    </div>
  );
}

export default Profile;
