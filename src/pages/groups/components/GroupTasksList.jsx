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

  //Tasks before current day
  const previousTasks = currentGroupTasks.filter((task) => {
    const isTaskDueDatePrevious = isDatePrevious(
      parseDateFromYYYYMMDD(task.dueDate.substring(0, 10))
    );
    const isTaskNotCompleted = !task.completed;

    return isTaskDueDatePrevious && isTaskNotCompleted;
  });
  const [showcasePreviousTasks, setShowcasePreviousTasks] = useState(false);

  //Today's tasks
  const todayTasks = currentGroupTasks.filter((task) => {
    const isTaskDueDateToday = isDateToday(
      parseDateFromYYYYMMDD(task.dueDate.substring(0, 10))
    );

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
