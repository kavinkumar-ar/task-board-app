import React from 'react';
import TaskCard from './TaskCard';
import './StatusColumn.css';

const StatusColumn = ({ status, tasks, onUpdateTask, onDeleteTask }) => {
  const getStatusLabel = (status) => {
    const labels = {
      'todo': 'To Do',
      'in-progress': 'In Progress',
      'done': 'Done',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      'todo': '#9e9e9e',
      'in-progress': '#2196f3',
      'done': '#4caf50',
    };
    return colors[status] || '#9e9e9e';
  };

  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div className="status-column">
      <div className="column-header" style={{ borderTopColor: getStatusColor(status) }}>
        <h2>{getStatusLabel(status)}</h2>
        <span className="task-count">{filteredTasks.length}</span>
      </div>
      <div className="tasks-container">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">No tasks</div>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StatusColumn;

