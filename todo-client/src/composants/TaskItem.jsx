import React, { useState } from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask, onToggleComplete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const handleSave = () => {
        onUpdateTask(task.id, { title: editTitle });
        setIsEditing(false);
    };

    return (
        <div className="bg-white shadow-md rounded p-4 mb-2 flex items-center justify-between">
            {isEditing ? (
                <div className="flex-grow mr-2">
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                </div>
            ) : (
                <div className={`flex-grow mr-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                </div>
            )}

            <div>
                <button onClick={() => onToggleComplete(task.id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded mr-2 focus:outline-none focus:shadow-outline">
                    {task.completed ? 'Undo' : 'Done'}
                </button>
                {isEditing ? (
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2 focus:outline-none focus:shadow-outline">
                        Save
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2 focus:outline-none focus:shadow-outline">
                        Edit
                    </button>
                )}
                <button onClick={() => onDeleteTask(task.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;