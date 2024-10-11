import { createContext, useContext, useState } from "react";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(null);

  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const [showcaseTaskDueDatePicker, setShowcaseTaskDueDatePicker] =
    useState(false);
  const [showcaseTaskTimeSetter, setShowcaseTaskTimeSetter] = useState(false);
  const [showcaseRepeatTaskSetter, setShowcaseRepeatTaskSetter] =
    useState(false);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isCreatingTask,
        showcaseTaskDueDatePicker,
        setShowcaseTaskDueDatePicker,
        showcaseTaskTimeSetter,
        setShowcaseTaskTimeSetter,
        showcaseRepeatTaskSetter,
        setShowcaseRepeatTaskSetter,
      }}
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
