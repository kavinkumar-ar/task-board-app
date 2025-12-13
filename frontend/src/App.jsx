import React, { useState, useEffect, useMemo } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchAndFilter from './components/SearchAndFilter';
import StatsSummary from './components/StatsSummary';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import { isOverdue, isDueSoon } from './utils/dateUtils';
import { parseISO, isToday, isFuture } from 'date-fns';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', date: 'all' });

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please make sure the backend server is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask({
        ...taskData,
        status: 'todo',
      });
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await updateTask(id, updates);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  // Filter tasks based on search and filter criteria
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    // Apply date filter
    if (filters.date !== 'all') {
      filtered = filtered.filter(task => {
        if (!task.dueDate) {
          return filters.date === 'no-date';
        }

        try {
          const date = parseISO(task.dueDate);
          switch (filters.date) {
            case 'overdue':
              return isOverdue(task.dueDate);
            case 'due-today':
              return isToday(date);
            case 'due-soon':
              return isDueSoon(task.dueDate);
            case 'upcoming':
              return isFuture(date);
            case 'no-date':
              return false;
            default:
              return true;
          }
        } catch {
          return false;
        }
      });
    }

    return filtered;
  }, [tasks, searchTerm, filters]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Board</h1>
        <p className="subtitle">Status Tracking & Reminder App</p>
      </header>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)} className="close-error">×</button>
        </div>
      )}

      <main className="app-main">
        <StatsSummary tasks={tasks} />
        <SearchAndFilter
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />
        <TaskForm onSubmit={handleCreateTask} />
        <TaskList
          tasks={filteredTasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;

