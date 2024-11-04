import { useTasks } from "../../../contexts/tasksContext";

import calendarIcon from "../../../icons/calendarIcon.svg";

function DailySummaryBox() {
  //Variables from tasks context
  const { todayTasksCompleted, todayTasksTotal } = useTasks();

  return (
    <div className="w-full p-4 border-[1px] border-[#46484F] rounded-[10px] mt-4 flex items-center gap-x-3 md:gap-x-5 lg:p-8">
      {/**** Calendar icon */}
      <section className="w-[40px] h-[40px] rounded-full border-[0.5px] border-[#46484F] flex items-center justify-center md:w-[44px] md:h-[44px]">
        <img
          src={calendarIcon}
          className="w-[18px]"
          alt="gray calendar icon md:w-[20px]"
        />
      </section>

      {/**** Daily task completion summary */}
      <section>
        <p className="font-inter text-white font-semibold md:text-lg">
          {todayTasksCompleted}/{todayTasksTotal}
        </p>
        <p className="text-[#B2B3BD] text-[14px] md:text-base">
          Daily activities completed.
        </p>
      </section>
    </div>
  );
}

export default DailySummaryBox;
