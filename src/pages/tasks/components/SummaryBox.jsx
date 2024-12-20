import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts/authContext";
import { useTasks } from "../../../contexts/tasksContext";

import ProgressBar from "../components/ProgressBar";

import NotificationsIcon from "../../../icons/NotificationsIcon";

import { FaUserCircle } from "react-icons/fa";

function SummaryBox() {
  //User credentials
  const { user } = useAuth();
  const userId = user?._id;
  const username = user?.username;

  //Variables from tasks context
  const { getTodayTasksInfo, todayTasksProgress } = useTasks();

  //Get today tasks info on mount
  useEffect(() => {
    getTodayTasksInfo(userId);
  }, []);

  return (
    <section
      className="w-full p-4 rounded-xl space-y-4 lg:p-8"
      style={{
        background: "linear-gradient(250.88deg, #1D2E61 2.69%, #172448 100%)",
      }}
    >
      <main className="w-full flex items-center justify-between">
        {/**** Profile Picture and username */}
        <div className="flex items-center gap-x-2 lg:gap-x-4">
          {/**** Default profile picture */}
          <FaUserCircle className="h-[40px] w-[40px] rounded-full border-[0px] border-white object-cover md:h-[43px] md:w-[43px] fill-blue900 " />

          <p className="text-white text-[15px] font-regular md:text-[17px]">
            Hi, {username}
          </p>
        </div>

        <Link
          //to="/notifications"
          className="relative lg:hidden"
        >
          {/**** Notification icon */}
          <main className="w-[40px] h-[40px] bg-blue600 rounded-[100px] flex items-center justify-center">
            <NotificationsIcon className="w-[18px]" />
          </main>

          {/**** Notification count */}
          <div className="absolute top-0 -right-[5px] w-4 h-4 rounded-full bg-blue200 flex items-center justify-center">
            <span className="text-[11px] text-white font-semibold">3</span>
          </div>
        </Link>
      </main>

      <section>
        <h3 className="text-white text-[19px] font-semibold md:text-[21px]">
          Daily Progress bar
        </h3>
        <h4 className="text-blue100 text-[14px] md:text-base">
          Visualizing your memories to help you reach them.
        </h4>

        {/**** Progress bar and value */}
        <main className="w-full mt-1">
          <ProgressBar progress={todayTasksProgress} />
        </main>
      </section>
    </section>
  );
}

export default SummaryBox;
