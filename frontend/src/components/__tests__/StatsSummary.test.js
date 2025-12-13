import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatsSummary from '../StatsSummary';

describe('StatsSummary Component', () => {
  test('renders total tasks count', () => {
    const tasks = [
      { id: '1', title: 'Task 1', status: 'todo' },
      { id: '2', title: 'Task 2', status: 'in-progress' },
    ];

    render(<StatsSummary tasks={tasks} />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
  });

  test('renders status counts', () => {
    const tasks = [
      { id: '1', title: 'Task 1', status: 'todo' },
      { id: '2', title: 'Task 2', status: 'todo' },
      { id: '3', title: 'Task 3', status: 'in-progress' },
      { id: '4', title: 'Task 4', status: 'done' },
      { id: '5', title: 'Task 5', status: 'done' },
    ];

    render(<StatsSummary tasks={tasks} />);

    expect(screen.getByText('2')).toBeInTheDocument(); // To Do
    expect(screen.getByText('1')).toBeInTheDocument(); // In Progress
    expect(screen.getByText('2')).toBeInTheDocument(); // Done
  });

  test('renders overdue count when tasks are overdue', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5);
    const overdueDate = pastDate.toISOString().split('T')[0];

    const tasks = [
      {
        id: '1',
        title: 'Overdue Task',
        status: 'todo',
        dueDate: overdueDate,
      },
      {
        id: '2',
        title: 'Another Overdue',
        status: 'in-progress',
        dueDate: overdueDate,
      },
    ];

    render(<StatsSummary tasks={tasks} />);

    expect(screen.getByText('2')).toBeInTheDocument(); // Overdue count
    expect(screen.getByText('Overdue')).toBeInTheDocument();
  });

  test('does not render overdue for completed tasks', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5);
    const overdueDate = pastDate.toISOString().split('T')[0];

    const tasks = [
      {
        id: '1',
        title: 'Completed Overdue Task',
        status: 'done',
        dueDate: overdueDate,
      },
    ];

    render(<StatsSummary tasks={tasks} />);

    expect(screen.queryByText('Overdue')).not.toBeInTheDocument();
  });

  test('renders reminder count when tasks have reminders', () => {
    const tasks = [
      { id: '1', title: 'Task 1', status: 'todo', reminder: true },
      { id: '2', title: 'Task 2', status: 'in-progress', reminder: true },
      { id: '3', title: 'Task 3', status: 'done', reminder: false },
    ];

    render(<StatsSummary tasks={tasks} />);

    expect(screen.getByText('2')).toBeInTheDocument(); // With Reminder
    expect(screen.getByText('With Reminder')).toBeInTheDocument();
  });

  test('renders empty state correctly', () => {
    render(<StatsSummary tasks={[]} />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
  });
});

