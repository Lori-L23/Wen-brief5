import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Configurer les en-têtes d'authentification
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer {token}`,
      'Content-Type': 'application/json'
    }
  };
};

export const fetchTasks = async () => {
  try {
    const response = await axios.get({API_URL}/tasks, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post({API_URL}/tasks, taskData, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// export const updateTask = async (taskId, taskData) => {
//   try {
//     const response = await axios.put(${API_URL}/tasks/${taskId}, taskData, getAuthConfig());
//     return response.data;
//   } catch (error) {
//     console.error('Error updating task:', error);
//     throw error;
//   }
// };

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put({API_URL}/tasks/{taskId}, taskData, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};
export const deleteTask = async (taskId) => {
  try {
    await axios.delete({API_URL}/tasks/{taskId}, getAuthConfig());
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const toggleTaskStatus = async (taskId) => {
  try {
    const response = await axios.patch({API_URL}/tasks/{taskId}/toggle, {}, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Error toggling task status:', error);
    throw error;
  }
};