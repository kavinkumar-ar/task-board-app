import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from '../TaskCard';

describe('TaskCard Component', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    status: 'todo',
    dueDate: '2024-12-31',
    reminder: false,
    createdAt: '2024-01-01T00:00:00.000Z'
  };

  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task title', () => {
    render(
      <TaskCard
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  test('renders due date when provided', () => {
    render(
      <TaskCard
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/Due:/)).toBeInTheDocument();
  });

  test('does not render due date when not provided', () => {
    const taskWithoutDate = { ...mockTask, dueDate: null };
    render(
      <TaskCard
        task={taskWithoutDate}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.queryByText(/Due:/)).not.toBeInTheDocument();
  });

  test('renders reminder badge when reminder is enabled', () => {
    const taskWithReminder = { ...mockTask, reminder: true };
    render(
      <TaskCard
        task={taskWithReminder}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByTitle('Reminder enabled')).toBeInTheDocument();
  });

  test('calls onUpdate when status button is clicked', () => {
    render(
      <TaskCard
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const inProgressButton = screen.getByText('In Progress');
    fireEvent.click(inProgressButton);

    expect(mockOnUpdate).toHaveBeenCalledWith('1', { status: 'in-progress' });
  });

  test('calls onDelete when delete button is clicked', () => {
    // Mock window.confirm to return true
    window.confirm = jest.fn(() => true);

    render(
      <TaskCard
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  test('enters edit mode when edit button is clicked', () => {
    render(
      <TaskCard
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls onUpdate when task is saved in edit mode', () => {
    render(
      <TaskCard
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const titleInput = screen.getByDisplayValue('Test Task');
    fireEvent.change(titleInput, { target: { value: 'Updated Task' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(mockOnUpdate).toHaveBeenCalledWith('1', {
      title: 'Updated Task',
      dueDate: '2024-12-31',
      reminder: false,
    });
  });
});

