import React, { useState } from 'react';
import { formatDate, isOverdue, isDueSoon } from '../utils/dateUtils';
import './TaskCard.css';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [editReminder, setEditReminder] = useState(task.reminder);

  const handleSave = () => {
    onUpdate(task.id, {
      title: editTitle,
      dueDate: editDueDate || null,
      reminder: editReminder,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDueDate(task.dueDate || '');
    setEditReminder(task.reminder);
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    onUpdate(task.id, { status: newStatus });
  };

  const getCardClassName = () => {
    let className = 'task-card';
    if (task.dueDate) {
      if (isOverdue(task.dueDate)) {
        className += ' overdue';
      } else if (isDueSoon(task.dueDate)) {
        className += ' due-soon';
      }
    }
    return className;
  };

  if (isEditing) {
    return (
      <div className={`${getCardClassName()} editing`}>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="edit-input"
          autoFocus
        />
        <input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
          className="edit-date-input"
        />
        <label className="reminder-checkbox">
          <input
            type="checkbox"
            checked={editReminder}
            onChange={(e) => setEditReminder(e.target.checked)}
          />
          <span>Reminder</span>
        </label>
        <div className="card-actions">
          <button onClick={handleSave} className="btn-save">Save</button>
          <button onClick={handleCancel} className="btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={getCardClassName()}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        {task.reminder && (
          <span className="reminder-badge" title="Reminder enabled">
            🔔
          </span>
        )}
      </div>
      
      {task.dueDate && (
        <div className="task-due-date">
          Due: {formatDate(task.dueDate)}
        </div>
      )}

      <div className="card-actions">
        <div className="status-buttons">
          <button
            onClick={() => handleStatusChange('todo')}
            className={`btn-status ${task.status === 'todo' ? 'active' : ''}`}
            disabled={task.status === 'todo'}
          >
            To Do
          </button>
          <button
            onClick={() => handleStatusChange('in-progress')}
            className={`btn-status ${task.status === 'in-progress' ? 'active' : ''}`}
            disabled={task.status === 'in-progress'}
          >
            In Progress
          </button>
          <button
            onClick={() => handleStatusChange('done')}
            className={`btn-status ${task.status === 'done' ? 'active' : ''}`}
            disabled={task.status === 'done'}
          >
            Done
          </button>
        </div>
        <div className="action-buttons">
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            Edit
          </button>
          <button onClick={() => onDelete(task.id)} className="btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

