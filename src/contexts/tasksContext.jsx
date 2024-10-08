import { createContext, useContext, useState } from "react";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(null);

  const [showcaseRepeatTaskSetter, setShowcaseRepeatTaskSetter] =
    useState(false);

  return (
    <TasksContext.Provider
      value={{ tasks, showcaseRepeatTaskSetter, setShowcaseRepeatTaskSetter }}
    >
      {children}
    </TasksContext.Provider>
  );
};

function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined)
    throw new Error("TasksContext was used outside of TasksProvider");
  return context;
}

export { TasksProvider, useTasks };
