
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskList from '../composants/TaskList';
import TaskForm from '../composants/TaskForm';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import based on your project structure


const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/Login');
                    return;
                }
                
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get('http://127.0.0.1:8000/api/auth/tasks');
                setTasks(response.data);
            } catch (error) {
                <div>
                {console.error('Error fetching tasks:', error)}
                setError(error.message);

                </div>                
                setError(error.message);
                
                if (error.response?.status === 401) {
                    navigate('/Login');
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchTasks();
    }, [navigate]);
    

    const handleAddTask = async (newTask) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/tasks', newTask);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
            setError('Failed to add task.');
        }
    };

    const handleUpdateTask = async (id, updatedTask) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/auth/tasks/${id}`, updatedTask);
            setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
        } catch (error) {
            console.error('Error updating task:', error);
            setError('Failed to update task.');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/auth/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task.');
        }
    };

    const handleToggleComplete = async (id) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/auth/tasks/${id}/toggle`);
            setTasks(tasks.map(task => (task.id === id ? response.data : task)));
        } catch (error) {
            console.error('Error toggling task:', error);
            setError('Failed to toggle task status.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading tasks...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">
                Logout
            </button>
            <TaskForm onAddTask={handleAddTask} />
            <TaskList
                tasks={tasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
            />
        </div>
    );
};

export default Dashboard;