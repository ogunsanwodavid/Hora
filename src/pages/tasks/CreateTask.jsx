import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAppDesign } from "../../contexts/appDesignContext";
import { useTasks } from "../../contexts/tasksContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import RepeatTaskSetter from "./components/RepeatTaskSetter";

import backButton from "../../icons/leftArrowIcon.svg";
import kebabIcon from "../../icons/kebabIcon.svg";
import calendarIcon from "../../icons/calendarIcon.svg";
import clockIcon from "../../icons/clockIcon.svg";
import repeatIcon from "../../icons/repeatIcon.svg";
import rightCaretIcon from "../../icons/rightCaretIcon.svg";

function CreateTask() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Navigate
  const navigate = useNavigate();

  //App design info
  const { setShowcaseMobileNav } = useAppDesign();

  //Values from task Context
  const { showcaseRepeatTaskSetter, setShowcaseRepeatTaskSetter } = useTasks();

  //Dont show mobile navbar on mount
  useEffect(() => {
    setShowcaseMobileNav(false);

    return () => {
      setShowcaseMobileNav(true);
      setShowcaseRepeatTaskSetter(false);
    };
  }, [setShowcaseMobileNav, setShowcaseRepeatTaskSetter]);

  const buttonOpen = false;

  return (
    <div
      className="w-full px-3 lg:!min-h-0"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      {/*** Header */}
      <header className="w-full flex items-center justify-between">
        {/*** Back button */}
        <img
          src={backButton}
          className="w-4"
          alt="Back button"
          onClick={() => navigate(-1)}
        />

        {/*** More icon  */}
        <img src={kebabIcon} className="h-4" alt="Kebab menu icon" />
      </header>

      {/**** Create Task form */}
      <form>
        {/**** Task description text input */}
        <textarea
          placeholder="Enter your new task here."
          className="w-full h-[200px] bg-blue900 rounded-[10px] p-4 mt-6 text-white resize-none placeholder:text-[#B2B3BD]"
        />

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

            {/**** Right caret icon */}
            <img src={rightCaretIcon} className="h-4" alt="" />
          </div>

          {/**** Time setter */}
          <div className="w-full h-[63px] border-y-[2px] border-[#111725] py-4 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              {/**** Clock icon */}
              <img src={clockIcon} className="w-[20px]" alt="calendar icon" />

              <p className="text-white">Time</p>
            </div>

            {/**** Right caret icon */}
            <img src={rightCaretIcon} className="h-4" alt="" />
          </div>

          {/**** Repeat setter */}
          <div
            className="w-full h-[63px] border-y-[2px] border-[#111725] py-4 flex items-center justify-between"
            onClick={() => setShowcaseRepeatTaskSetter(true)}
          >
            <div className="flex items-center gap-x-4">
              {/**** Repeat icon */}
              <img src={repeatIcon} className="w-[20px]" alt="calendar icon" />

              <p className="text-white">Repeat Task</p>
            </div>

            {/**** Right caret icon */}
            <img src={rightCaretIcon} className="h-4" alt="" />
          </div>
        </section>

        {/**** Add task button */}
        <button
          className="w-full bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center mt-16"
          style={{
            backgroundColor: !buttonOpen && "#303136",
            boxShadow: "0px 4px 8px 0px #14080014",
            opacity: !buttonOpen && 0.4,
          }}
          disabled={!buttonOpen}
        >
          Add Task
        </button>
      </form>

      {/***** Showcase query setters only when triggered */}
      {showcaseRepeatTaskSetter && <RepeatTaskSetter />}
    </div>
  );
}

export default CreateTask;
