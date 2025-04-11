import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onToggleComplete }) => {
    return (
        <div>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                    onToggleComplete={onToggleComplete}
                />
            ))}
        </div>
    );
};

export default TaskList;