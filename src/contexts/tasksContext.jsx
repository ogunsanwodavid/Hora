import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  //BASE URL
  const BASE_URL = "https://hora-1daj.onrender.com/task";

  //navigate
  const navigate = useNavigate();

  const [allTasks, setAllTasks] = useState([
    {
      _id: "67065c3bd60343ec0707dc2c",
      title: "Start looking for jobs",
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
      dueDate: "2024-10-16",
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
      dueDate: "2024-09-11",
      time: "09:30",
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

  const [currentTaskInfo, setCurrentTaskInfo] = useState(null);

  //Loading states
  const [isGettingTasks, setIsGettingTasks] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);
  const [isGettingCurrentTask, setIsGettingCurrentTask] = useState(true);
  const [isCompletingTask, setIsCompletingTask] = useState(false);

  //Showcase time query setters
  const [showcaseTaskDueDatePicker, setShowcaseTaskDueDatePicker] =
    useState(false);
  const [showcaseTaskTimeSetter, setShowcaseTaskTimeSetter] = useState(false);
  const [showcaseRepeatTaskSetter, setShowcaseRepeatTaskSetter] =
    useState(false);

  //Show task completed modal
  const [showcaseTaskCompletedModal, setShowcaseTaskCompletedModal] =
    useState(false);

  //Function to get all tasks
  const getAllTasks = async ({
    title,
    description,
    dueDate,
    time,
    repeatTask,
    createdBy,
  }) => {
    setIsCreatingTask(true);
    try {
      const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          time,
          repeatTask,
          createdBy,
        }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Task creation successful
        const { message: createTaskMesssage } = data;

        //Toast message
        toast.success(createTaskMesssage);

        //Navigate to task page
        navigate("/tasks");

        return { success: true, createTaskMesssage };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsCreatingTask(false);
    }
  };

  //Function to get current task
  const getCurrentTask = async (taskId) => {
    setIsGettingCurrentTask(true);
    try {
      const response = await fetch(`${BASE_URL}/status/${taskId}`, {
        method: "GET",
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Current task gotten successful
        const { message: getCurrentTaskMessage } = data;

        //Toast message
        toast.success(getCurrentTaskMessage);

        //set current task info
        await setCurrentTaskInfo(data.getTask);

        return { success: true, getCurrentTaskMessage };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        //Navigate to tasks
        navigate("/tasks");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      //Navigate to tasks
      navigate("/tasks");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsGettingCurrentTask(false);
    }
  };

  //Function to create a task
  const createTask = async ({
    title,
    description,
    dueDate,
    time,
    repeatTask,
    createdBy,
  }) => {
    setIsCreatingTask(true);
    try {
      const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          time,
          repeatTask,
          createdBy,
        }),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Task creation successful
        const { message: createTaskMessage } = data;

        //Toast message
        toast.success(createTaskMessage);

        //Navigate to task page
        navigate("/tasks");

        return { success: true, createTaskMessage };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsCreatingTask(false);
    }
  };

  //Function to delete a task
  const deleteTask = async (taskId) => {
    setIsDeletingTask(true);
    try {
      const response = await fetch(`${BASE_URL}/delete/${taskId}`, {
        method: "DELETE",
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Task deletion successful
        const { message: deleteTaskMessage } = data;

        //Toast message
        toast.success(deleteTaskMessage);

        //Navigate to task page
        navigate("/tasks");

        return { success: true, deleteTaskMessage };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsDeletingTask(false);
    }
  };

  //Function to complete a task
  const completeTask = async (taskId) => {
    const completedJSON = {
      completed: true,
    };

    setIsCompletingTask(true);
    try {
      const response = await fetch(`${BASE_URL}/status/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completedJSON),
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        // Task completion successful
        const { message: completeTaskMessage } = data;

        //Toast message
        toast.success(completeTaskMessage);

        //show task completed modal
        setShowcaseTaskCompletedModal(true);

        return { success: true, completeTaskMessage };
      } else {
        console.log(data);
        // toast error
        toast.error(data.message || "An unexpected error occurred");

        return {
          success: false,
          error: data.message || "An unexpected error occurred",
        };
      }
    } catch (error) {
      // Network or other errors
      toast.error("Something went wrong.");

      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    } finally {
      setIsCompletingTask(false);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        allTasks,
        personalTasks,
        groupTasks,
        currentTaskInfo,
        setCurrentTaskInfo,
        getAllTasks,
        getCurrentTask,
        createTask,
        deleteTask,
        completeTask,
        isGettingTasks,
        isCreatingTask,
        isGettingCurrentTask,
        isDeletingTask,
        isCompletingTask,
        showcaseTaskDueDatePicker,
        setShowcaseTaskDueDatePicker,
        showcaseTaskTimeSetter,
        showcaseTaskCompletedModal,
        setShowcaseTaskTimeSetter,
        showcaseRepeatTaskSetter,
        setShowcaseRepeatTaskSetter,
        setShowcaseTaskCompletedModal,
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
