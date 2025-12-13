import React from 'react';
import StatusColumn from './StatusColumn';
import './TaskList.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const statuses = ['todo', 'in-progress', 'done'];

  return (
    <div className="task-list">
      {statuses.map(status => (
        <StatusColumn
          key={status}
          status={status}
          tasks={tasks}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;

