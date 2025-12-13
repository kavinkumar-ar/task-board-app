import React, { useState } from 'react';
import './SearchAndFilter.css';

const SearchAndFilter = ({ onSearchChange, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    onFilterChange({ status: value, date: dateFilter });
  };

  const handleDateFilterChange = (e) => {
    const value = e.target.value;
    setDateFilter(value);
    onFilterChange({ status: statusFilter, date: value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('all');
    onSearchChange('');
    onFilterChange({ status: 'all', date: 'all' });
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || dateFilter !== 'all';

  return (
    <div className="search-and-filter">
      <div className="search-section">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="date-filter">Filter by Due Date:</label>
          <select
            id="date-filter"
            value={dateFilter}
            onChange={handleDateFilterChange}
            className="filter-select"
          >
            <option value="all">All Dates</option>
            <option value="overdue">Overdue</option>
            <option value="due-today">Due Today</option>
            <option value="due-soon">Due Soon (3 days)</option>
            <option value="upcoming">Upcoming</option>
            <option value="no-date">No Due Date</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;

