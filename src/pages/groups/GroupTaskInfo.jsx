import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDesign } from "../../contexts/appDesignContext";
import { useGroups } from "../../contexts/groupsContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import TaskCompletedModal from "../../pages/tasks/components/TaskCompletedModal";
import DeletingTaskLoader from "../../pages/tasks/components/DeletingTaskLoader";
import DeleteGroupTaskConfirmationModal from "./components/DeleteGroupTaskConfirmationModal";

import { ClassicSpinner } from "react-spinners-kit";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
import alarmIcon from "../../icons/alarmIcon.svg";
import { useAuth } from "../../contexts/authContext";

function GroupTaskInfo() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //User credentials
  const { user } = useAuth();
  const userId = user?._id;

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
  const { groupId, taskId } = useParams();

  //Variables from groups context
  const {
    currentGroupTaskInfo,
    getCurrentGroupTask,
    completeGroupTask,
    isGettingCurrentGroupTask,
    isDeletingGroupTask,
    isCompletingGroupTask,
    showcaseGroupTaskCompletedModal,
    setShowcaseGroupTaskCompletedModal,
  } = useGroups();

  //Get current group task on mount
  useEffect(() => {
    getCurrentGroupTask(groupId, taskId);
  }, []);

  //Variables of current task info on display
  const title = currentGroupTaskInfo?.title;
  const description = currentGroupTaskInfo?.description;
  const dueDate = currentGroupTaskInfo?.dueDate.substring(0, 10);
  const time = currentGroupTaskInfo?.time;
  const repeat = currentGroupTaskInfo?.repeatTask;
  const isCompleted = currentGroupTaskInfo?.completed;

  //Date variables
  const month =
    dueDate && getMonthName(parseDateFromYYYYMMDD(dueDate)?.getMonth());
  const day =
    dueDate &&
    String(parseDateFromYYYYMMDD(dueDate)?.getDate())?.padStart(2, "0");
  const year = dueDate && parseDateFromYYYYMMDD(dueDate)?.getFullYear();

  const isDueDateToday = dueDate
    ? isDateToday(parseDateFromYYYYMMDD(dueDate))
    : "";
  const currentTime = formatTimeTo24Hour(new Date());
  const isDueTimeAfter = time && isAfterCurrentTime(currentTime, time);

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
    showcaseDeleteGroupTaskConfirmationModal,
    setShowcaseDeleteGroupTaskConfirmationModal,
  ] = useState(false);

  //Check if user created the task
  const isGroupTaskCreatedByUser = true;

  //Delete task function
  function handleDeleteTask() {
    setShowcaseDeleteGroupTaskConfirmationModal(true);
    setShowcaseDropdown(false);
  }

  //Complete task function
  async function handleCompleteTask(e) {
    e.preventDefault();
    setShowcaseDropdown(false);

    await completeGroupTask(taskId);
  }

  return (
    <>
      <div
        className="w-full relative max-w-[700px] mx-auto px-3 pb-[40px] lg:!min-h-0 lg:max-w-none"
        style={{
          minHeight: `${windowHeight}px`,
        }}
      >
        {/*** Header */}
        <header className="relative w-full flex items-center justify-between md:mt-4">
          {/*** Back button */}
          <img
            src={backButton}
            className="w-4"
            alt="Back button"
            onClick={() => navigate(-1)}
          />

          {/*** More icon  */}
          {!isGettingCurrentGroupTask && (
            <img
              src={kebabIcon}
              className="h-4"
              alt="Kebab menu icon"
              onClick={() => setShowcaseDropdown((show) => !show)}
            />
          )}

          {/**** Dropdown */}
          {showcaseDropdown && (
            <section className="w-[160px] rounded-[8px] overflow-hidden absolute top-full mt-3 right-0 text-white cursor-pointer">
              {!isCompleted && (
                <div
                  className="w-full p-3 bg-blue700"
                  onClick={handleCompleteTask}
                >
                  Complete
                </div>
              )}
              {isGroupTaskCreatedByUser && (
                <div
                  className="w-full p-3 bg-blue800"
                  onClick={handleDeleteTask}
                >
                  Delete
                </div>
              )}
            </section>
          )}
        </header>

        {/**** Create Task form */}
        <form>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            {/**** Task title text input */}
            <section className="w-full mt-6 space-y-1 md:mt-7">
              <p className="text-white md:text-[18px]">Title</p>
              {
                //Show skeleton if loading current task
                !isGettingCurrentGroupTask ? (
                  <input
                    type="text"
                    value={title}
                    placeholder="Enter your task title here."
                    className="w-full bg-blue900 h-[48px] px-4 py-3 text-base text-white outline-none rounded-[4px] placeholder:normal-case placeholder:text-[#B2B3BD] md:h-[60px] md:px-6 md:py-5 md:text-[18px] md:placeholder:text-[18px]"
                    disabled
                  />
                ) : (
                  <Skeleton className="w-full rounded-[4px] h-[48px] md:h-[60px]"></Skeleton>
                )
              }
            </section>

            {/**** Task description text input */}
            <section className="w-full mt-6 space-y-1 md:mt-7">
              <p className="text-white md:text-[18px]">Description</p>

              {
                //Show skeleton if loading current task
                !isGettingCurrentGroupTask ? (
                  <textarea
                    value={description}
                    placeholder="Enter your task description here."
                    className="w-full h-[200px] bg-blue900 rounded-[10px] p-4  text-white resize-none placeholder:text-[#B2B3BD] md:h-[230px] md:text-[18px] md:p-6"
                    disabled
                  />
                ) : (
                  <Skeleton className="w-full h-[200px] rounded-[10px] md:h-[230px]"></Skeleton>
                )
              }
            </section>

            <section className="w-full mt-6 md:mt-7">
              {/**** Due date showcase */}
              <div className="w-full h-[63px] border-y-[2px] border-[#111725] py-4 flex items-center justify-between md:h-[72px]">
                <div className="flex items-center gap-x-4 md:gap-x-5">
                  {/**** Calendar icon */}
                  {}
                  <img
                    src={calendarIcon}
                    className="w-[20px] md:w-[22px]"
                    alt="calendar icon"
                  />

                  <p className="text-white md:text-[18px]">Due Date</p>
                </div>

                {dueDate && !isGettingCurrentGroupTask && (
                  <p
                    className={`bg-blue900 p-2  rounded-[4px] text-[13px] text-[#EEEEF0] flex items-center justify-center gap-x-1 md:text-[15px] ${
                      !isCompleted && isDueDateToday && "!text-errorRed"
                    }`}
                  >
                    <span className="leading-[12px] md:leading-[14px]">{`${month} ${day}, ${year}`}</span>
                  </p>
                )}

                {
                  //Show skeleton if loading current task
                  isGettingCurrentGroupTask && (
                    <Skeleton className="w-[100px] h-[30px] rounded-[4px] md:h-[31px]"></Skeleton>
                  )
                }
              </div>

              {/**** Time setter */}
              <div className="w-full h-[63px] border-y-[2px] border-[#111725] py-4 flex items-center justify-between md:h-[72px]">
                <div className="flex items-center gap-x-4 md:gap-x-5">
                  {/**** Clock icon */}
                  <img
                    src={clockIcon}
                    className="w-[20px] md:w-[22px]"
                    alt="calendar icon"
                  />

                  <p className="text-white md:text-[18px]">Time</p>
                </div>

                {time && !isGettingCurrentGroupTask && (
                  <p
                    className={`bg-blue900 p-2  rounded-[4px] text-[13px] text-[#EEEEF0] flex items-center justify-center gap-x-1 md:text-[15px] ${
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
                      className="h-[14px] md:h-[15px]"
                      alt=""
                    />
                    <span className="leading-[12px] md:leading-[14px]">
                      {convertTo12HourFormat(time)}
                    </span>
                  </p>
                )}

                {
                  //Show skeleton if loading current task
                  isGettingCurrentGroupTask && (
                    <Skeleton className="w-[100px] h-[30px] rounded-[4px] md:h-[31px]"></Skeleton>
                  )
                }
              </div>

              {/**** Repeat setter */}
              <div className="w-full h-[63px] border-y-[2px] border-[#111725] py-4 flex items-center justify-between md:h-[72px]">
                <div className="flex items-center gap-x-4 md:gap-x-5">
                  {/**** Repeat icon */}
                  <img
                    src={repeatIcon}
                    className="w-[20px] md:w-[22px]"
                    alt="calendar icon"
                  />

                  <p className="text-white md:text-[18px]">Repeat Task</p>
                </div>

                {repeat && !isGettingCurrentGroupTask && (
                  <p className="bg-blue900 p-2  rounded-[4px] text-[13px] text-[#EEEEF0] flex items-center justify-center md:text-[15px]">
                    <span>{RepeatValueShowcase(repeat)}</span>
                  </p>
                )}

                {
                  //Show skeleton if loading current task
                  isGettingCurrentGroupTask && (
                    <Skeleton className="w-[100px] h-[30px] rounded-[4px] md:h-[31px]"></Skeleton>
                  )
                }
              </div>
            </section>

            {/**** Complete task button */}
            {!isCompleted && !isGettingCurrentGroupTask && (
              <button
                className="w-full bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center mt-16 md:h-[52px] md:text-[18px]"
                onClick={handleCompleteTask}
              >
                {isCompletingGroupTask ? (
                  <ClassicSpinner size={20} color="#fff" />
                ) : (
                  "Complete Task"
                )}
              </button>
            )}
          </SkeletonTheme>
        </form>
      </div>

      {/**** Show DeletingTaskLoader when getting current task */}
      {isDeletingGroupTask && <DeletingTaskLoader />}

      {/**** Show Delete Task Modal */}
      {showcaseDeleteGroupTaskConfirmationModal && !isDeletingGroupTask && (
        <DeleteGroupTaskConfirmationModal
          groupId={groupId}
          taskId={taskId}
          setShowcaseDeleteGroupTaskConfirmationModal={
            setShowcaseDeleteGroupTaskConfirmationModal
          }
        />
      )}

      {/**** Show Task Completed */}
      {showcaseGroupTaskCompletedModal && (
        <TaskCompletedModal
          setShowcaseTaskCompletedModal={setShowcaseGroupTaskCompletedModal}
        />
      )}
    </>
  );
}

export default GroupTaskInfo;
