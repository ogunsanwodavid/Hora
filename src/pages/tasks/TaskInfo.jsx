import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDesign } from "../../contexts/appDesignContext";
import { useTasks } from "../../contexts/tasksContext";
import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import GettingCurrentTaskLoader from "./components/GettingCurrentTaskLoader";
import DeleteTaskConfirmationModal from "./components/DeleteTaskConfirmationModal";
import TaskCompletedModal from "./components/TaskCompletedModal";

import { ClassicSpinner } from "react-spinners-kit";

import {
  convertTo12HourFormat,
  parseDateFromYYYYMMDD,
  getMonthName,
  isDateToday,
  formatTimeTo24Hour,
  isAfterCurrentTime,
} from "../../utils/helpers";

import backButton from "../../icons/leftArrowIcon.svg";
import kebabIcon from "../../icons/kebabIcon.svg";
import calendarIcon from "../../icons/calendarIcon.svg";
import clockIcon from "../../icons/clockIcon.svg";
import redAlarmIcon from "../../icons/redAlarmIcon.svg";

import repeatIcon from "../../icons/repeatIcon.svg";
import rightCaretIcon from "../../icons/rightCaretIcon.svg";
import alarmIcon from "../../icons/alarmIcon.svg";

function TaskInfo() {
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

  //Route params
  const { taskId } = useParams();

  //Variables from task context
  const { currentTaskInfo, isGettingCurrentTask, isCompletingTask } =
    useTasks();

  //Variables of current task info on display
  const title = currentTaskInfo?.title;
  const description = currentTaskInfo?.description;
  const dueDate = currentTaskInfo?.dueDate;
  const time = currentTaskInfo?.time;
  const repeat = currentTaskInfo?.repeatTask;
  const isCompleted = currentTaskInfo?.completed;

  //Date variables
  const month = getMonthName(parseDateFromYYYYMMDD(dueDate).getMonth());
  const day = String(parseDateFromYYYYMMDD(dueDate).getDate()).padStart(2, "0");
  const year = parseDateFromYYYYMMDD(dueDate).getFullYear();

  const isDueDateToday = isDateToday(parseDateFromYYYYMMDD(dueDate));
  const currentTime = formatTimeTo24Hour(new Date());
  const isDueTimeAfter = isAfterCurrentTime(currentTime, time);

  function RepeatValueShowcase(repeat) {
    if (repeat === "daily") {
      return "Every day";
    } else if (repeat === "weekly") {
      return "Every week";
    } else {
      return "Don't repeat";
    }
  }

  //States to display dropdown and modals
  const [showcaseDropdown, setShowcaseDropdown] = useState(false);
  const [
    showcaseDeleteTaskConfirmationModal,
    setShowcaseDeleteTaskConfirmationModal,
  ] = useState(false);
  const [showcaseTaskCompletedModal, setShowcaseTaskCompletedModal] =
    useState(false);

  //Delete task function
  function handleDeleteTask() {
    setShowcaseDeleteTaskConfirmationModal(true);
    setShowcaseDropdown(false);
  }

  //Complete task function
  function handleCompleteTask(e) {
    e.preventDefault();
    setShowcaseDropdown(false);
    console.log(taskId);
  }

  return (
    <>
      <div
        className="w-full relative max-w-[700px] mx-auto px-3 lg:!min-h-0"
        style={{
          minHeight: `${windowHeight}px`,
        }}
      >
        {/*** Header */}
        <header className="relative w-full flex items-center justify-between">
          {/*** Back button */}
          <img
            src={backButton}
            className="w-4"
            alt="Back button"
            onClick={() => navigate(-1)}
          />

          {/*** More icon  */}
          <img
            src={kebabIcon}
            className="h-4"
            alt="Kebab menu icon"
            onClick={() => setShowcaseDropdown((show) => !show)}
          />

          {/**** Dropdown */}
          {showcaseDropdown && (
            <section className="w-[160px] rounded-[8px] overflow-hidden absolute top-full mt-3 right-0 text-white">
              {!isCompleted && (
                <div
                  className="w-full p-3 bg-blue700"
                  onClick={handleCompleteTask}
                >
                  Complete
                </div>
              )}
              <div className="w-full p-3 bg-blue800" onClick={handleDeleteTask}>
                Delete
              </div>
            </section>
          )}
        </header>

        {/**** Create Task form */}
        <form>
          {/**** Task title text input */}
          <section className="w-full mt-6 space-y-1">
            <p className="text-white ">Title</p>
            <input
              type="text"
              value={title}
              placeholder="Enter your task title here."
              className="w-full bg-blue900 h-[48px] px-4 py-3 text-base text-white outline-none rounded-[4px] placeholder:normal-case placeholder:text-[#B2B3BD]"
              disabled
            />
          </section>

          {/**** Task description text input */}
          <section className="w-full mt-6 space-y-1">
            <p className="text-white ">Description</p>
            <textarea
              value={description}
              placeholder="Enter your task description here."
              className="w-full h-[200px] bg-blue900 rounded-[10px] p-4  text-white resize-none placeholder:text-[#B2B3BD]"
              disabled
            />
          </section>

          <section className="w-full mt-6">
            {/**** Due date setter */}
            <div className="w-full h-[63px] border-y-[2px] border-[#111725] py-4 flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                {/**** Calendar icon */}
                <img
                  src={calendarIcon}
                  className="w-[20px]"
                  alt="calendar icon"
                />

                <p className="text-white">Due Date</p>
              </div>

              {dueDate ? (
                <p
                  className={`bg-blue900 p-2  rounded-[4px] text-[13px] text-[#EEEEF0] flex items-center justify-center gap-x-1 ${
                    !isCompleted && isDueDateToday && "!text-errorRed"
                  }`}
                >
                  <span className="leading-[12px]">{`${month} ${day}, ${year}`}</span>
                </p>
              ) : (
                <img src={rightCaretIcon} className="h-4" alt="" />
              )}
            </div>

            {/**** Time setter */}
            <div className="w-full h-[63px] border-y-[2px] border-[#111725] py-4 flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                {/**** Clock icon */}
                <img src={clockIcon} className="w-[20px]" alt="calendar icon" />

                <p className="text-white">Time</p>
              </div>

              {time ? (
                <p
                  className={`bg-blue900 p-2  rounded-[4px] text-[13px] text-[#EEEEF0] flex items-center justify-center gap-x-1 ${
                    !isCompleted &&
                    isDueDateToday &&
                    !isDueTimeAfter &&
                    "!text-errorRed"
                  } `}
                >
                  <img
                    src={
                      !isCompleted && isDueDateToday && !isDueTimeAfter
                        ? redAlarmIcon
                        : alarmIcon
                    }
                    className="h-[14px]"
                    alt=""
                  />
                  <span className="leading-[12px]">
                    {convertTo12HourFormat(time)}
                  </span>
                </p>
              ) : (
                <img src={rightCaretIcon} className="h-4" alt="" />
              )}
            </div>

            {/**** Repeat setter */}
            <div className="w-full h-[63px] border-y-[2px] border-[#111725] py-4 flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                {/**** Repeat icon */}
                <img
                  src={repeatIcon}
                  className="w-[20px]"
                  alt="calendar icon"
                />

                <p className="text-white">Repeat Task</p>
              </div>

              {repeat ? (
                <p className="bg-blue900 p-2  rounded-[4px] text-[13px] text-[#EEEEF0] flex items-center justify-center">
                  <span>{RepeatValueShowcase(repeat)}</span>
                </p>
              ) : (
                <img src={rightCaretIcon} className="h-4" alt="" />
              )}
            </div>
          </section>

          {/**** Complete task button */}
          {!isCompleted && (
            <button
              className="w-full bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center mt-16"
              onClick={handleCompleteTask}
            >
              {isCompletingTask ? (
                <ClassicSpinner size={20} color="#fff" />
              ) : (
                "Complete Task"
              )}
            </button>
          )}
        </form>
      </div>

      {/**** Show GettingCurrent TaskLoader when getting current task */}
      {isGettingCurrentTask && <GettingCurrentTaskLoader />}

      {/**** Show Delete Task Modal */}
      {showcaseDeleteTaskConfirmationModal && (
        <DeleteTaskConfirmationModal
          taskId={taskId}
          setShowcaseDeleteTaskConfirmationModal={
            setShowcaseDeleteTaskConfirmationModal
          }
        />
      )}

      {/**** Show Task Completed */}
      {showcaseTaskCompletedModal && (
        <TaskCompletedModal
          setShowcaseTaskCompletedModal={setShowcaseTaskCompletedModal}
        />
      )}
    </>
  );
}

export default TaskInfo;
