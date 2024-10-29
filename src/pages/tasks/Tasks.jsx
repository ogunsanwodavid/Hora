import { useEffect } from "react";

import { useTasks } from "../../contexts/tasksContext";
import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import TasksList from "./components/TasksList";

import NoTasksError from "./components/NoTasksError";
import CreateTaskButton from "./components/CreateTaskButton";
import SummaryBox from "./components/SummaryBox";
import TasksSkeletonLoader from "./components/TasksSkeletonLoader";

function Tasks() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //User credentials
  const { user } = useAuth();
  const userId = user?._id;

  //Tasks information
  const { isGettingAllTasks, getAllTasks, allTasks } = useTasks();

  //Get all tasks on mount
  useEffect(() => {
    if (userId) {
      getAllTasks(userId);
    }
  }, []);

  return (
    <>
      <div
        className="w-full relative max-w-[700px] mx-auto px-0 flex flex-col lg:pb-0 lg:!min-h-[552px] lg:max-w-none"
        style={{
          minHeight: `${windowHeight - 70}px`,
        }}
      >
        {/**** User summary box */}
        <SummaryBox />

        {/**** Showcase list of tasks if there is a task or a skeleton loader is loading tasks*/}
        {isGettingAllTasks ? (
          <TasksSkeletonLoader />
        ) : !isGettingAllTasks && allTasks.length ? (
          <TasksList />
        ) : (
          <NoTasksError />
        )}
      </div>

      {/**** Button to click and create new tasks */}
      {!isGettingAllTasks && <CreateTaskButton />}
    </>
  );
}

export default Tasks;
