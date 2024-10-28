import { useState } from "react";

import { Link } from "react-router-dom";

import { useTasks } from "../../../contexts/tasksContext";

import TaskCard from "./TaskCard";

import blue50CaretIcon from "../../../icons/blue50CaretIcon.svg";

import {
  isDatePrevious,
  isDateToday,
  parseDateFromYYYYMMDD,
} from "../../../utils/helpers";

function TasksList() {
  //Variables from tasks context
  const { allTasks, personalTasks, groupTasks } = useTasks();

  //The current type of tasks being displayed
  const [currentTasksDisplayed, setCurrentTasksDisplayed] = useState("all");
  const isAllTasksDisplayed = currentTasksDisplayed === "all";
  const isPersonalTasksDisplayed = currentTasksDisplayed === "personal";
  const isGroupTasksDisplayed = currentTasksDisplayed === "group";

  const currentTasks = isAllTasksDisplayed
    ? allTasks
    : isPersonalTasksDisplayed
    ? personalTasks
    : groupTasks;

  //Tasks before current day
  const previousTasks = currentTasks.filter((task) => {
    const isTaskDueDatePrevious = isDatePrevious(
      parseDateFromYYYYMMDD(task.dueDate.substring(0, 10))
    );

    return isTaskDueDatePrevious;
  });
  const [showcasePreviousTasks, setShowcasePreviousTasks] = useState(false);

  //Today's tasks
  const todayTasks = currentTasks.filter((task) => {
    const isTaskDueDateToday = isDateToday(
      parseDateFromYYYYMMDD(task.dueDate.substring(0, 10))
    );

    return isTaskDueDateToday;
  });

  const [showcaseTodayTasks, setShowcaseTodayTasks] = useState(false);

  //Completed tasks
  const completedTasks = currentTasks.filter((task) => {
    return task.completed;
  });
  const [showcaseCompletedTasks, setShowcaseCompletedTasks] = useState(false);

  //Function to show all tasks
  function handleSelectAll() {
    setCurrentTasksDisplayed("all");
    setShowcaseTodayTasks(false);
    setShowcasePreviousTasks(false);
    setShowcaseCompletedTasks(false);
  }

  //Function to show personal tasks
  function handleSelectPersonal() {
    setCurrentTasksDisplayed("personal");
    setShowcaseTodayTasks(false);
    setShowcasePreviousTasks(false);
    setShowcaseCompletedTasks(false);
  }

  //Function to show group tasks
  function handleSelectGroup() {
    setCurrentTasksDisplayed("group");
    setShowcaseTodayTasks(false);
    setShowcasePreviousTasks(false);
    setShowcaseCompletedTasks(false);
  }

  return (
    <div className="w-full mt-4 cursor-pointer">
      {/*** Task list Navigator */}
      <section className="w-full flex flex-wrap gap-3">
        {/**** All tasks selector */}
        <div
          className={`px-[20px] py-[10px] border-[1px] border-[#5F606A] text-[#B2B3BD] rounded-full md:text-[18px] ${
            isAllTasksDisplayed && "border-blue500 bg-blue500 text-white"
          }`}
          onClick={handleSelectAll}
        >
          All
        </div>

        {/**** Personal tasks selector */}
        {personalTasks.length && (
          <div
            className={`px-[20px] py-[10px] border-[1px] border-[#5F606A] text-[#B2B3BD] rounded-full md:text-[18px] ${
              isPersonalTasksDisplayed && "border-blue500 bg-blue500 text-white"
            }`}
            onClick={handleSelectPersonal}
          >
            Personal
          </div>
        )}

        {/**** Group tasks selector */}
        {groupTasks.length && (
          <div
            className={`px-[20px] py-[10px] border-[1px] border-[#5F606A] text-[#B2B3BD] rounded-full md:text-[18px] ${
              isGroupTasksDisplayed && "border-blue500 bg-blue500 text-white"
            }`}
            onClick={handleSelectGroup}
          >
            Group
          </div>
        )}
      </section>

      {/**** Tasks list display */}
      <main className="w-full mt-6 space-y-4">
        {/**** Previous Tasks */}
        {Boolean(previousTasks.length) &&
          !(showcaseTodayTasks || showcaseCompletedTasks) && (
            <section className="w-full space-y-3">
              <header
                className="flex items-center gap-x-3"
                onClick={() => setShowcasePreviousTasks((show) => !show)}
              >
                <p className="text-[18px] text-[#B2B3BD] font-semibold md:text-[20px]">
                  Previous
                </p>
                <img
                  src={blue50CaretIcon}
                  className={`h-2 rotate-0 ${
                    showcasePreviousTasks && "!rotate-180"
                  }`}
                  alt="blue caret icon"
                />
              </header>

              {showcasePreviousTasks && (
                <main className="flex flex-col gap-y-3">
                  {previousTasks.map((task) => {
                    const taskId = task?._id;
                    return (
                      <Link to={`/tasks/task/${taskId}`} key={taskId}>
                        <TaskCard task={task} />{" "}
                      </Link>
                    );
                  })}
                </main>
              )}
            </section>
          )}

        {/**** Today Tasks */}
        {Boolean(todayTasks.length) &&
          !(showcasePreviousTasks || showcaseCompletedTasks) && (
            <section className="w-full space-y-3">
              <header
                className="flex items-center gap-x-3"
                onClick={() => setShowcaseTodayTasks((show) => !show)}
              >
                <p className="text-[18px] text-[#B2B3BD] font-semibold md:text-[20px]">
                  Today
                </p>
                <img
                  src={blue50CaretIcon}
                  className={`h-2 rotate-0 ${
                    showcaseTodayTasks && "!rotate-180"
                  }`}
                  alt="blue caret icon"
                />
              </header>

              {showcaseTodayTasks && (
                <main className="flex flex-col gap-y-3">
                  {todayTasks.map((task) => {
                    const taskId = task?._id;
                    return (
                      <Link to={`/tasks/task/${taskId}`} key={taskId}>
                        <TaskCard task={task} />{" "}
                      </Link>
                    );
                  })}
                </main>
              )}
            </section>
          )}

        {/**** Completed Tasks */}
        {Boolean(completedTasks.length) &&
          !(showcasePreviousTasks || showcaseTodayTasks) && (
            <section className="w-full space-y-3">
              <header
                className="flex items-center gap-x-3"
                onClick={() => setShowcaseCompletedTasks((show) => !show)}
              >
                <p className="text-[18px] text-[#B2B3BD] font-semibold md:text-[20px]">
                  Completed
                </p>
                <img
                  src={blue50CaretIcon}
                  className={`h-2 rotate-0 ${
                    showcaseCompletedTasks && "!rotate-180"
                  }`}
                  alt="blue caret icon"
                />
              </header>

              {showcaseCompletedTasks && (
                <main className="flex flex-col gap-y-3">
                  {completedTasks.map((task) => {
                    const taskId = task?._id;
                    return (
                      <Link to={`/tasks/task/${taskId}`} key={taskId}>
                        <TaskCard task={task} />{" "}
                      </Link>
                    );
                  })}
                </main>
              )}
            </section>
          )}
      </main>
    </div>
  );
}

export default TasksList;
