import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTask({ title });
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex">
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    placeholder="Add new task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;