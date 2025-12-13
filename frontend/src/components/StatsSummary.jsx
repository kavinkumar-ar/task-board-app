import React from 'react';
import { isOverdue, isDueSoon } from '../utils/dateUtils';
import { parseISO, isToday, isFuture } from 'date-fns';
import './StatsSummary.css';

const StatsSummary = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    overdue: tasks.filter(t => {
      if (!t.dueDate) return false;
      try {
        const date = parseISO(t.dueDate);
        return isOverdue(t.dueDate) && t.status !== 'done';
      } catch {
        return false;
      }
    }).length,
    dueToday: tasks.filter(t => {
      if (!t.dueDate) return false;
      try {
        const date = parseISO(t.dueDate);
        return isToday(date) && t.status !== 'done';
      } catch {
        return false;
      }
    }).length,
    dueSoon: tasks.filter(t => {
      if (!t.dueDate) return false;
      return isDueSoon(t.dueDate) && t.status !== 'done';
    }).length,
    withReminder: tasks.filter(t => t.reminder).length,
  };

  return (
    <div className="stats-summary">
      <h3 className="stats-title">Summary Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card status-todo">
          <div className="stat-value">{stats.todo}</div>
          <div className="stat-label">To Do</div>
        </div>
        <div className="stat-card status-in-progress">
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card status-done">
          <div className="stat-value">{stats.done}</div>
          <div className="stat-label">Completed</div>
        </div>
        {stats.overdue > 0 && (
          <div className="stat-card status-overdue">
            <div className="stat-value">{stats.overdue}</div>
            <div className="stat-label">Overdue</div>
          </div>
        )}
        {stats.dueToday > 0 && (
          <div className="stat-card status-due-today">
            <div className="stat-value">{stats.dueToday}</div>
            <div className="stat-label">Due Today</div>
          </div>
        )}
        {stats.dueSoon > 0 && (
          <div className="stat-card status-due-soon">
            <div className="stat-value">{stats.dueSoon}</div>
            <div className="stat-label">Due Soon</div>
          </div>
        )}
        {stats.withReminder > 0 && (
          <div className="stat-card status-reminder">
            <div className="stat-value">{stats.withReminder}</div>
            <div className="stat-label">With Reminder</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsSummary;

