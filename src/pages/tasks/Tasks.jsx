import { useTasks } from "../../contexts/tasksContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import TasksList from "./components/TasksList";

import NoTasksError from "./components/NoTasksError";
import CreateTaskButton from "./components/CreateTaskButton";
import SummaryBox from "./components/SummaryBox";

function Tasks() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Tasks information
  const { allTasks } = useTasks();

  return (
    <div
      className="w-full  max-w-[700px] mx-auto relative flex flex-col lg:!min-h-[552px]"
      style={{
        minHeight: `${windowHeight - 130}px`,
      }}
    >
      {/**** User summary box */}
      <SummaryBox />

      {/**** Showcase list of tasks if there is a task*/}
      {allTasks.length ? <TasksList /> : <NoTasksError />}

      {/**** Button to click and create new tasks */}
      <CreateTaskButton />
    </div>
  );
}

export default Tasks;
