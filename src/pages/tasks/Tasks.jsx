import { useTasks } from "../../contexts/tasksContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import TasksList from "./components/TasksList";

import NoTasksError from "./components/NoTasksError";
import CreateTasksButton from "./components/CreateTasksButton";
import SummaryBox from "./components/SummaryBox";

function Tasks() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Tasks information
  const { tasks } = useTasks();

  return (
    <div
      className="w-full relative flex flex-col lg:!min-h-[592px]"
      style={{
        minHeight: `${windowHeight - 130}px`,
      }}
    >
      {/**** User summary box */}
      <SummaryBox />

      {/**** Showcase list of tasks if there is a task*/}
      {tasks ? <TasksList /> : <NoTasksError />}

      {/**** Button to click and create new tasks */}
      <CreateTasksButton />
    </div>
  );
}

export default Tasks;
