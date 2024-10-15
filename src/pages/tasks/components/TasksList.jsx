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
  {
    /*** Variables from tasks context */
  }
  const { allTasks, personalTasks, groupTasks, setCurrentTaskInfo } =
    useTasks();

  const [currentTasksDisplayed, setCurrentTasksDisplayed] = useState("all");
  const isAllTasksDisplayed = currentTasksDisplayed === "all";
  const isPersonalTasksDisplayed = currentTasksDisplayed === "personal";
  const isGroupTasksDisplayed = currentTasksDisplayed === "group";

  const currentTasks = isAllTasksDisplayed
    ? allTasks
    : isPersonalTasksDisplayed
    ? personalTasks
    : groupTasks;

  const previousTasks = currentTasks.filter((task) => {
    const isTaskDueDatePrevious = isDatePrevious(
      parseDateFromYYYYMMDD(task.dueDate)
    );

    return isTaskDueDatePrevious;
  });
  const [showcasePreviousTasks, setShowcasePreviousTasks] = useState(false);

  const todayTasks = currentTasks.filter((task) => {
    const isTaskDueDateToday = isDateToday(parseDateFromYYYYMMDD(task.dueDate));

    return isTaskDueDateToday;
  });
  const [showcaseTodayTasks, setShowcaseTodayTasks] = useState(false);

  const completedTasks = currentTasks.filter((task) => {
    return task.completed;
  });
  const [showcaseCompletedTasks, setShowcaseCompletedTasks] = useState(false);

  return (
    <div className="w-full mt-4">
      {/*** Task list Navigator */}
      <section className="w-full flex flex-wrap gap-3">
        {/**** All tasks selector */}
        <div
          className={`px-[20px] py-[10px] border-[1px] border-[#5F606A] text-[#B2B3BD] rounded-full ${
            isAllTasksDisplayed && "border-blue500 bg-blue500 text-white"
          }`}
          onClick={() => setCurrentTasksDisplayed("all")}
        >
          All
        </div>

        {/**** Personal tasks selector */}
        <div
          className={`px-[20px] py-[10px] border-[1px] border-[#5F606A] text-[#B2B3BD] rounded-full ${
            isPersonalTasksDisplayed && "border-blue500 bg-blue500 text-white"
          }`}
          onClick={() => setCurrentTasksDisplayed("personal")}
        >
          Personal
        </div>

        {/**** All tasks selector */}
        <div
          className={`px-[20px] py-[10px] border-[1px] border-[#5F606A] text-[#B2B3BD] rounded-full ${
            isGroupTasksDisplayed && "border-blue500 bg-blue500 text-white"
          }`}
          onClick={() => setCurrentTasksDisplayed("group")}
        >
          Group
        </div>
      </section>

      {/**** Tasks list display */}
      <main className="w-full mt-6 space-y-4">
        {/**** Previous Tasks */}
        {previousTasks && (
          <section className="w-full space-y-3">
            <header
              className="flex items-center gap-x-3"
              onClick={() => setShowcasePreviousTasks((show) => !show)}
            >
              <p className="text-[20px] text-[#B2B3BD] font-semibold">
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
                    <Link
                      to={`/tasks/${taskId}`}
                      key={taskId}
                      onClick={() => setCurrentTaskInfo(task)}
                    >
                      <TaskCard task={task} />{" "}
                    </Link>
                  );
                })}
              </main>
            )}
          </section>
        )}

        {/**** Today Tasks */}
        {todayTasks && (
          <section className="w-full space-y-3">
            <header
              className="flex items-center gap-x-3"
              onClick={() => setShowcaseTodayTasks((show) => !show)}
            >
              <p className="text-[20px] text-[#B2B3BD] font-semibold">Today</p>
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
                    <Link
                      to={`/tasks/${taskId}`}
                      key={taskId}
                      onClick={() => setCurrentTaskInfo(task)}
                    >
                      <TaskCard task={task} />{" "}
                    </Link>
                  );
                })}
              </main>
            )}
          </section>
        )}

        {/**** Completed Tasks */}
        {completedTasks && (
          <section className="w-full space-y-3">
            <header
              className="flex items-center gap-x-3"
              onClick={() => setShowcaseCompletedTasks((show) => !show)}
            >
              <p className="text-[20px] text-[#B2B3BD] font-semibold">
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
                    <Link
                      to={`/tasks/${taskId}`}
                      key={taskId}
                      onClick={() => setCurrentTaskInfo(task)}
                    >
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
