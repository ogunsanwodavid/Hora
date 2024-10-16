import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAppDesign } from "../../contexts/appDesignContext";
import { useTasks } from "../../contexts/tasksContext";
import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { toast } from "react-toastify";

import CreatingTaskLoader from "./components/CreatingTaskLoader";
import TaskDueDatePicker from "./components/TaskDueDatePicker";

import TaskTimeSetter from "./components/TaskTimeSetter";
import RepeatTaskSetter from "./components/RepeatTaskSetter";

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
import repeatIcon from "../../icons/repeatIcon.svg";
import rightCaretIcon from "../../icons/rightCaretIcon.svg";
import alarmIcon from "../../icons/alarmIcon.svg";

function CreateTask() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Navigate
  const navigate = useNavigate();

  //User credentials
  const { user } = useAuth();
  const userId = user?._id;

  //App design info
  const { setShowcaseMobileNav } = useAppDesign();

  //Values from task Context
  const {
    showcaseTaskDueDatePicker,
    setShowcaseTaskDueDatePicker,
    showcaseTaskTimeSetter,
    setShowcaseTaskTimeSetter,
    showcaseRepeatTaskSetter,
    setShowcaseRepeatTaskSetter,
    createTask,
    isCreatingTask,
  } = useTasks();

  //Dont show mobile navbar on mount
  useEffect(() => {
    setShowcaseMobileNav(false);

    return () => {
      setShowcaseMobileNav(true);
    };
  }, [setShowcaseMobileNav]);

  //Create task queries
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");
  const [repeat, setRepeat] = useState("");
  const [isAlarm, setIsAlarm] = useState(false);

  const isAddTaskBtnClickable =
    title && description && dueDate && time && repeat;

  //Date variables
  const month = getMonthName(parseDateFromYYYYMMDD(dueDate).getMonth());
  const day = String(parseDateFromYYYYMMDD(dueDate).getDate()).padStart(2, "0");
  const year = parseDateFromYYYYMMDD(dueDate).getFullYear();

  function RepeatValueShowcase(repeat) {
    if (repeat === "daily") {
      return "Every day";
    } else if (repeat === "weekly") {
      return "Every week";
    } else {
      return "Don't repeat";
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();

    const isDueDateToday = isDateToday(parseDateFromYYYYMMDD(dueDate));
    const currentTime = formatTimeTo24Hour(new Date());
    const isDueTimeAfter = isAfterCurrentTime(currentTime, time);

    //Form data
    const formData = {
      title: title,
      description: description,
      dueDate: dueDate,
      time: time,
      repeatTask: repeat,
      createdBy: userId,
    };

    //Check if date is today and make sure time isnt set to before current time
    if (isDueDateToday && !isDueTimeAfter) {
      //toast error message
      toast.error(
        `Can't set time to before current time ${convertTo12HourFormat(
          currentTime
        )}`
      );
    } else {
      //Add task
      await createTask(formData);

      //Reset all values
      setTitle("");
      setDescription("");
      setDueDate("");
      setTime("");
      setRepeat("");
    }
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
        <header className="w-full flex items-center justify-between md:mt-4">
          {/*** Back button */}
          <img
            src={backButton}
            className="w-4"
            alt="Back button"
            onClick={() => navigate(-1)}
          />

          {/*** More icon  */}
          {/* <img src={kebabIcon} className="h-4" alt="Kebab menu icon" /> */}
        </header>

        {/**** Create Task form */}
        <form className="w-full">
          {/**** Task title text input */}
          <section className="w-full mt-6 space-y-1 md:mt-7">
            <p className="text-white md:text-[18px]">Title</p>
            <input
              type="text"
              value={title}
              placeholder="Enter your task title here."
              className="w-full bg-blue900 h-[48px] px-4 py-3 text-base text-white outline-none rounded-[4px] placeholder:normal-case placeholder:text-[#B2B3BD] md:h-[60px] md:px-6 md:py-5 md:text-[18px] md:placeholder:text-[18px]"
              onChange={(e) => setTitle(e.target.value)}
            />
          </section>

          {/**** Task description text input */}
          <section className="w-full mt-6 space-y-1 md:mt-7">
            <p className="text-white md:text-[18px]">Description</p>
            <textarea
              value={description}
              placeholder="Enter your task description here."
              className="w-full h-[200px] bg-blue900 rounded-[10px] p-4  text-white resize-none placeholder:text-[#B2B3BD] md:h-[230px] md:text-[18px] md:p-6"
              onChange={(e) => setDescription(e.target.value)}
            />
          </section>

          <section className="w-full mt-6 md:mt-7">
            {/**** Due date setter */}
            <div
              className="w-full h-[63px] border-y-[2px] border-[#111725] py-4 flex items-center justify-between md:h-[72px]"
              onClick={() => setShowcaseTaskDueDatePicker(true)}
            >
              <div className="flex items-center gap-x-4 md:gap-x-5">
                {/**** Calendar icon */}
                <img
                  src={calendarIcon}
                  className="w-[20px] md:w-[22px]"
                  alt="calendar icon"
                />

                <p className="text-white md:text-[18px]">Due Date</p>
              </div>

              {dueDate ? (
                <p className="bg-blue900 p-2  rounded-[4px] text-[13px] text-[#EEEEF0] flex items-center justify-center gap-x-1 md:text-[15px]">
                  <span className="leading-[12px] md:leading-[14px]">{`${month} ${day}, ${year}`}</span>
                </p>
              ) : (
                <img src={rightCaretIcon} className="h-4" alt="" />
              )}
            </div>

            {/**** Time setter */}
            <div
              className="w-full h-[63px] border-y-[2px] border-[#111725] py-4 flex items-center justify-between md:h-[72px]"
              onClick={() => setShowcaseTaskTimeSetter(true)}
            >
              <div className="flex items-center gap-x-4 md:gap-x-5">
                {/**** Clock icon */}
                <img
                  src={clockIcon}
                  className="w-[20px] md:w-[22px]"
                  alt="calendar icon"
                />

                <p className="text-white md:text-[18px]">Time</p>
              </div>

              {time ? (
                <p className="bg-blue900 p-2  rounded-[4px] text-[13px] text-[#EEEEF0] flex items-center justify-center gap-x-1 md:text-[15px]">
                  <img
                    src={alarmIcon}
                    className="h-[14px] md:h-[15px]"
                    alt=""
                  />
                  <span className="leading-[12px] md:leading-[14px]">
                    {convertTo12HourFormat(time)}
                  </span>
                </p>
              ) : (
                <img src={rightCaretIcon} className="h-4" alt="" />
              )}
            </div>

            {/**** Repeat setter */}
            <div
              className="w-full h-[63px] border-y-[2px] border-[#111725] py-4 flex items-center justify-between md:h-[72px]"
              onClick={() => setShowcaseRepeatTaskSetter(true)}
            >
              <div className="flex items-center gap-x-4 md:gap-x-5">
                {/**** Repeat icon */}
                <img
                  src={repeatIcon}
                  className="w-[20px] md:w-[22px]"
                  alt="calendar icon"
                />

                <p className="text-white md:text-[18px]">Repeat Task</p>
              </div>

              {repeat ? (
                <p className="bg-blue900 p-2  rounded-[4px] text-[13px] text-[#EEEEF0] flex items-center justify-center md:text-[15px]">
                  <span>{RepeatValueShowcase(repeat)}</span>
                </p>
              ) : (
                <img src={rightCaretIcon} className="h-4" alt="" />
              )}
            </div>
          </section>

          {/**** Add task button */}
          <button
            className="w-full bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center mt-16 md:h-[52px] md:text-[18px]"
            style={{
              backgroundColor: !isAddTaskBtnClickable && "#303136",
              boxShadow: "0px 4px 8px 0px #14080014",
              opacity: !isAddTaskBtnClickable && 0.4,
            }}
            disabled={!isAddTaskBtnClickable}
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </form>
      </div>

      {/**** Show CreatingTaskLoader when creating task */}
      {isCreatingTask && <CreatingTaskLoader />}

      {/***** Showcase query setters only when triggered */}
      {showcaseRepeatTaskSetter && (
        <RepeatTaskSetter
          repeat={repeat}
          setRepeat={setRepeat}
          setShowcaseRepeatTaskSetter={setShowcaseRepeatTaskSetter}
        />
      )}

      {showcaseTaskTimeSetter && (
        <TaskTimeSetter
          time={time}
          setTime={setTime}
          isAlarm={isAlarm}
          setIsAlarm={setIsAlarm}
          setShowcaseTaskTimeSetter={setShowcaseTaskTimeSetter}
        />
      )}

      {showcaseTaskDueDatePicker && (
        <TaskDueDatePicker
          dueDate={dueDate}
          setDueDate={setDueDate}
          setShowcaseTaskDueDatePicker={setShowcaseTaskDueDatePicker}
        />
      )}
    </>
  );
}

export default CreateTask;
