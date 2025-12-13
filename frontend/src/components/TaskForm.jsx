import React, { useState } from 'react';
import { getTodayDate } from '../utils/dateUtils';
import './TaskForm.css';

const TaskForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    onSubmit({
      title: title.trim(),
      dueDate: dueDate || null,
      reminder,
    });

    // Reset form
    setTitle('');
    setDueDate('');
    setReminder(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={getTodayDate()}
        />
      </div>
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={reminder}
            onChange={(e) => setReminder(e.target.checked)}
          />
          <span>Enable Reminder</span>
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-submit">
          Create Task
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;

