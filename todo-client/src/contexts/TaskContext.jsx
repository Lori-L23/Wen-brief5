import { createContext, useContext, useState } from "react";
// import {register,login,getUser,isAuthenticated,logout} from '../services/api';
import api from "../services/Api"; // Adjust the import based on your project structure

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const { data } = await api.post("/tasks", taskData);
      setTasks([...tasks, data]);
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, updates);
      setTasks(tasks.map((task) => (task.id === id ? data : task)));
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  const toggleTask = async (id) => {
    try {
      const { data } = await api.patch(`/tasks/${id}/toggle`);
      setTasks(tasks.map((task) => (task.id === id ? data : task)));
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
