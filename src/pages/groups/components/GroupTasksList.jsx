import { useState } from "react";

import { Link, useParams } from "react-router-dom";

import TaskCard from "../../../pages/tasks/components/TaskCard";

import blue50CaretIcon from "../../../icons/blue50CaretIcon.svg";

import {
  isDatePrevious,
  isDateToday,
  parseDateFromYYYYMMDD,
} from "../../../utils/helpers";
import { useGroups } from "../../../contexts/groupsContext";

function GroupTasksList() {
  //Route parameters
  const { groupId } = useParams();

  //Variables from groups context
  const { currentGroupTasks } = useGroups();

  //Group tasks
  /*  const groupTasks = [
    {
      _id: "67065c3bd60343ec0707dc2c",
      title: "Start looking for jobs",
      type: "Group",
      description: "Have to work",
      dueDate: "2024-09-22",
      time: "02:15",
      repeatTask: "daily",
      completed: false,
      createdBy: "6703d9cb0e71d411ae3e23f3",
      createdAt: "2024-10-09T10:34:35.131Z",
      updatedAt: "2024-10-09T10:34:35.131Z",
      __v: 0,
    },
    {
      _id: "67065c3bd60343ed1807dc2c",
      title: "SIWES Report",
      description: "Begin writing my SIWES report everyday",
      type: "Group",
      dueDate: "2024-10-17",
      time: "20:15",
      completedBy: [],
      repeatTask: "weekly",
      completed: false,
      createdBy: "6703d9cb0e71d411ae3e23f3",
      createdAt: "2024-10-09T10:34:35.131Z",
      updatedAt: "2024-10-09T10:34:35.131Z",
      __v: 0,
    },
    {
      _id: "670782168774060eee22fcba",
      title: "Complete project report",
      description: "Finish writing the final project report and submit it.",
      type: "Group",
      dueDate: "2024-08-10",
      time: "14:30",
      repeatTask: "none",
      completed: false,
      createdBy: "6703d9cb0e71d411ae3e23f3",
      createdAt: "2024-10-10T07:28:22.825Z",
      updatedAt: "2024-10-10T07:28:22.825Z",
      __v: 0,
    },
    {
      _id: "670782168774060eee22gggba",
      title: "Go Skydiving",
      description: "Take a trip to Ibadan and go skydiving with friends",
      type: "Group",
      dueDate: "2025-11-22",
      time: "04:45",
      completedBy: [],
      repeatTask: "none",
      completed: true,
      createdBy: "6703d9cb0e71d411ae3e23f3",
      createdAt: "2024-10-10T07:28:22.825Z",
      updatedAt: "2024-10-10T07:28:22.825Z",
      __v: 0,
    },
    {
      _id: "670782168774060eefe22gggha",
      title: "Read Gulag Archipelago",
      description:
        "Time to study my favourite history book and jot down unknown words",
      type: "Group",
      dueDate: "2024-10-22",
      time: "09:30",
      completedBy: [],
      repeatTask: "none",
      completed: true,
      createdBy: "6703d9cb0e71d411ae3e23f3",
      createdAt: "2024-10-10T07:28:22.825Z",
      updatedAt: "2024-10-10T07:28:22.825Z",
      __v: 0,
    },
  ]; */

  //Tasks before current day
  const previousTasks = currentGroupTasks.filter((task) => {
    const isTaskDueDatePrevious = isDatePrevious(
      parseDateFromYYYYMMDD(task.dueDate)
    );

    return isTaskDueDatePrevious;
  });
  const [showcasePreviousTasks, setShowcasePreviousTasks] = useState(false);

  //Today's tasks
  const todayTasks = currentGroupTasks.filter((task) => {
    const isTaskDueDateToday = isDateToday(parseDateFromYYYYMMDD(task.dueDate));

    return isTaskDueDateToday;
  });
  const [showcaseTodayTasks, setShowcaseTodayTasks] = useState(false);

  //Completed tasks
  const completedTasks = currentGroupTasks.filter((task) => {
    return task.completed;
  });
  const [showcaseCompletedTasks, setShowcaseCompletedTasks] = useState(false);

  return (
    <div className="w-full flex-grow flex flex-col cursor-pointer">
      {/**** Tasks list display */}
      <main className="w-full space-y-4">
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
                      <Link
                        to={`/groups/group/task/${groupId}/${taskId}`}
                        key={taskId}
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
                      <Link
                        to={`/groups/group/task/${groupId}/${taskId}`}
                        key={taskId}
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
                      <Link
                        to={`/groups/group/task/${groupId}/${taskId}`}
                        key={taskId}
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

export default GroupTasksList;
