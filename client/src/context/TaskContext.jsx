import { createContext, useState, useContext } from "react";
import {
  getTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
} from "../api/tasks.api";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState([]);

  const loadTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id);
    if (res.status === 204) loadTasks();
    console.log(res);
  };

  const createTask = async (data) => {
    try {
      const res = await createTaskRequest(data);
      setTasks([...tasks, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) setError([error.response.data.message]);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        deleteTask,
        createTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
