import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchAndFilter from '../SearchAndFilter';

describe('SearchAndFilter Component', () => {
  const mockOnSearchChange = jest.fn();
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input', () => {
    render(
      <SearchAndFilter
        onSearchChange={mockOnSearchChange}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(
      screen.getByPlaceholderText('Search tasks by title...')
    ).toBeInTheDocument();
  });

  test('calls onSearchChange when search input changes', () => {
    render(
      <SearchAndFilter
        onSearchChange={mockOnSearchChange}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search tasks by title...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('test search');
  });

  test('renders status filter dropdown', () => {
    render(
      <SearchAndFilter
        onSearchChange={mockOnSearchChange}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(screen.getByLabelText('Filter by Status:')).toBeInTheDocument();
    expect(screen.getByText('All Statuses')).toBeInTheDocument();
  });

  test('calls onFilterChange when status filter changes', () => {
    render(
      <SearchAndFilter
        onSearchChange={mockOnSearchChange}
        onFilterChange={mockOnFilterChange}
      />
    );

    const statusFilter = screen.getByLabelText('Filter by Status:');
    fireEvent.change(statusFilter, { target: { value: 'done' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      status: 'done',
      date: 'all',
    });
  });

  test('renders date filter dropdown', () => {
    render(
      <SearchAndFilter
        onSearchChange={mockOnSearchChange}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(screen.getByLabelText('Filter by Due Date:')).toBeInTheDocument();
    expect(screen.getByText('All Dates')).toBeInTheDocument();
  });

  test('calls onFilterChange when date filter changes', () => {
    render(
      <SearchAndFilter
        onSearchChange={mockOnSearchChange}
        onFilterChange={mockOnFilterChange}
      />
    );

    const dateFilter = screen.getByLabelText('Filter by Due Date:');
    fireEvent.change(dateFilter, { target: { value: 'overdue' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      status: 'all',
      date: 'overdue',
    });
  });

  test('shows clear filters button when filters are active', () => {
    render(
      <SearchAndFilter
        onSearchChange={mockOnSearchChange}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Initially, clear button should not be visible
    expect(screen.queryByText('Clear Filters')).not.toBeInTheDocument();

    // Activate a filter
    const searchInput = screen.getByPlaceholderText('Search tasks by title...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Now clear button should be visible
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
  });

  test('clears all filters when clear button is clicked', () => {
    render(
      <SearchAndFilter
        onSearchChange={mockOnSearchChange}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Set some filters
    const searchInput = screen.getByPlaceholderText('Search tasks by title...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const statusFilter = screen.getByLabelText('Filter by Status:');
    fireEvent.change(statusFilter, { target: { value: 'done' } });

    // Click clear button
    const clearButton = screen.getByText('Clear Filters');
    fireEvent.click(clearButton);

    expect(mockOnSearchChange).toHaveBeenCalledWith('');
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      status: 'all',
      date: 'all',
    });
  });
});

