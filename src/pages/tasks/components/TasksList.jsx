import { useState } from "react";

import { Link } from "react-router-dom";

import { useTasks } from "../../../contexts/tasksContext";

import TaskCard from "./TaskCard";

function TasksList() {
  {
    /*** Variables from tasks context */
  }
  const { allTasks, setCurrentTaskInfo } = useTasks();

  const [currentTasksDisplayed, setCurrentTasksDisplayed] = useState("all");
  const isAllTasksDisplayed = currentTasksDisplayed === "all";
  const isPersonalTasksDisplayed = currentTasksDisplayed === "personal";
  const isGroupTasksDisplayed = currentTasksDisplayed === "group";

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
      <main className="w-full mt-6 flex flex-col gap-y-4">
        {allTasks.map((task) => {
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
    </div>
  );
}

export default TasksList;
