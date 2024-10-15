import { createContext, useContext, useState } from "react";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([
    {
      _id: "67065c3bd60343ec0707dc2c",
      title: "Start looking for jobs",
      description: "Have to work",
      dueDate: "2024-10-15",
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
      dueDate: "2024-10-15",
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
      dueDate: "2024-12-02",
      time: "14:30",
      repeatTask: "none",
      completed: true,
      createdBy: "6703d9cb0e71d411ae3e23f3",
      createdAt: "2024-10-10T07:28:22.825Z",
      updatedAt: "2024-10-10T07:28:22.825Z",
      __v: 0,
    },
    {
      _id: "670782168774060eee22gggba",
      title: "Go Skydiving",
      description: "Take a trip to Ibadan and go skydiving with friends",
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
  ]);

  const personalTasks = allTasks.filter((task) => {
    return !Object.hasOwn(task, "completedBy");
  });

  const groupTasks = allTasks.filter((task) => {
    return Object.hasOwn(task, "completedBy");
  });

  console.log(personalTasks);
  console.log(groupTasks);

  const [currentTaskInfo, setCurrentTaskInfo] = useState(null);

  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isGettingCurrentTask, setIsGettingCurrentTask] = useState(false);
  const [isCompletingTask, setIsCompletingTask] = useState(false);

  const [showcaseTaskDueDatePicker, setShowcaseTaskDueDatePicker] =
    useState(false);
  const [showcaseTaskTimeSetter, setShowcaseTaskTimeSetter] = useState(false);
  const [showcaseRepeatTaskSetter, setShowcaseRepeatTaskSetter] =
    useState(false);

  return (
    <TasksContext.Provider
      value={{
        allTasks,
        currentTaskInfo,
        setCurrentTaskInfo,
        isCreatingTask,
        isGettingCurrentTask,
        isCompletingTask,
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
