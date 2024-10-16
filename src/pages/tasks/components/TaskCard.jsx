import {
  convertTo12HourFormat,
  getMonthName,
  parseDateFromYYYYMMDD,
} from "../../../utils/helpers";

import plainCircleIcon from "../../../icons/plainCircleIcon.svg";
import tickCircleIcon from "../../../icons/tickCircleIcon.svg";
import repeatIcon from "../../../icons/repeatIcon.svg";
import completedRepeatIcon from "../../../icons/completedRepeatIcon.svg";
import alarmIcon from "../../../icons/alarmIcon.svg";
import completedAlarmIcon from "../../../icons/completedAlarmIcon.svg";
import groupIcon from "../../../icons/groupIcon.svg";
import completedGroupIcon from "../../../icons/completedGroupIcon.svg";

function TaskCard({ task }) {
  const isCompleted = task.completed;
  const isGroupTask = Object.hasOwn(task, "completedBy");
  const isRepeatTaskNone = task.repeatTask === "none";
  const isAlarm = true;

  return (
    <div className="w-full rounded-[12px] bg-blue900 p-4 flex items-center gap-x-4 md:px-6 md:gap-x-7">
      {/**** Completed task status */}
      <img
        src={isCompleted ? tickCircleIcon : plainCircleIcon}
        className="w-6 md:w-8"
        alt={isCompleted ? "tick circle icon" : "plain circle icon"}
      />

      <main className="w-full">
        {/**** Task title */}
        <p
          className={`w-full text-white font-semibold whitespace-nowrap overflow-hidden text-ellipsis md:text-[18px] ${
            isCompleted && "!text-[#797B86] line-through"
          }`}
        >
          {task.title}
        </p>

        {/**** Task description */}
        <p
          className={`w-full text-white text-[14px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis md:text-base  ${
            isCompleted && "!text-[#797B86] line-through"
          }`}
        >
          {task.description}
        </p>

        {/**** Task info */}
        <section
          className={`w-full flex items-center space-x-3 text-[14px] text-[#B2B3BD] md:text-base ${
            isCompleted && "!text-[#797B86]"
          }`}
        >
          {/*** Due date */}
          <p>
            {getMonthName(parseDateFromYYYYMMDD(task.dueDate).getMonth()).slice(
              0,
              3
            )}{" "}
            {String(parseDateFromYYYYMMDD(task.dueDate).getDate()).padStart(
              2,
              "0"
            )}{" "}
            {parseDateFromYYYYMMDD(task.dueDate).getFullYear()}
          </p>

          {/*** Dot */}
          <div
            className={`w-1 h-1 rounded-full bg-[#B2B3BD] md:w-2 md:h-2 ${
              isCompleted && "!bg-[#797B86]"
            }`}
          ></div>

          {/*** Time */}
          <p>{convertTo12HourFormat(task.time)}</p>

          {/**** Group icon */}
          {isGroupTask && (
            <img
              src={isCompleted ? completedGroupIcon : groupIcon}
              className="h-3 md:h-4"
            />
          )}

          {/**** Repeat icon */}
          {!isRepeatTaskNone && (
            <img
              src={isCompleted ? completedRepeatIcon : repeatIcon}
              className="h-3 md:h-4"
            />
          )}

          {/**** Alarm icon */}
          {isAlarm && (
            <img
              src={isCompleted ? completedAlarmIcon : alarmIcon}
              className="h-3 md:h-4"
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default TaskCard;
