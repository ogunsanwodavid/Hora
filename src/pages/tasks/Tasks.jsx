import { useTasks } from "../../contexts/tasksContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import TasksList from "./components/TasksList";

import NoTasksError from "./components/NoTasksError";
import CreateTaskButton from "./components/CreateTaskButton";
import SummaryBox from "./components/SummaryBox";
import TasksSkeletonLoader from "./components/TasksSkeletonLoader";

function Tasks() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Tasks information
  const { isGettingTasks, allTasks } = useTasks();

  return (
    <>
      <div
        className="w-full  max-w-[700px] mx-auto relative flex flex-col pb-[40px] lg:!min-h-[552px] lg:max-w-none"
        style={{
          minHeight: `${windowHeight - 130}px`,
          paddingBottom: isGettingTasks ? "0px" : "40px",
        }}
      >
        {/**** User summary box */}
        <SummaryBox />

        {/**** Showcase list of tasks if there is a task or a skeleton loader is loading tasks*/}
        {isGettingTasks ? (
          <TasksSkeletonLoader />
        ) : !isGettingTasks && allTasks.length ? (
          <TasksList />
        ) : (
          <NoTasksError />
        )}
      </div>

      {/**** Button to click and create new tasks */}
      {!isGettingTasks && <CreateTaskButton />}
    </>
  );
}

export default Tasks;
