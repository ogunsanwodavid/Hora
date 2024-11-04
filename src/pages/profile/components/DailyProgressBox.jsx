import { useTasks } from "../../../contexts/tasksContext";

import ProgressBar from "../../tasks/components/ProgressBar";

import yellowStarIcon from "../../../icons/yellowStarIcon.svg";

function DailyProgressBox() {
  //Variables from tasks context
  const { todayTasksProgress } = useTasks();

  return (
    <section
      className="w-full p-4 rounded-xl mt-6 lg:p-8"
      style={{
        background: "linear-gradient(250.88deg, #1D2E61 2.69%, #172448 100%)",
      }}
    >
      {/*** Yellow star icon */}
      <img
        src={yellowStarIcon}
        className="w-[20px] md:w-[22px]"
        alt="yellow star icon"
      />

      {/**** Texts */}
      <h3 className="text-white text-[19px] font-semibold mt-2 md:text-[21px]">
        Daily Progress bar
      </h3>

      <h4 className="text-blue100 text-[14px] md:text-base">
        Complete all daily tasks to max your progress bar
      </h4>

      {/**** Progress bar and value */}
      <main className="w-full mt-1">
        <ProgressBar progress={todayTasksProgress} />
      </main>
    </section>
  );
}

export default DailyProgressBox;
