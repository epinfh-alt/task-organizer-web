import React from 'react';
import {
  SearchIcon,
  XIcon,
  FilterIcon,
  ArrowUpDownIcon,
  PlusIcon
} from './Icons';

export function TaskFilters({
  searchQuery,
  setSearchQuery,
  currentFilter,
  setCurrentFilter,
  selectedPriority,
  setSelectedPriority,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  counts,
  onOpenAddModal
}) {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedPriority !== 'all' ||
    selectedCategory !== 'all' ||
    currentFilter !== 'all';

  const handleClearFilters = () => {
    setSearchQuery('');
    setCurrentFilter('all');
    setSelectedPriority('all');
    setSelectedCategory('all');
  };

  return (
    <div className="task-filters-container">
      {/* Top row: Search & Primary Action */}
      <div className="filters-top-row">
        <div className="search-input-wrapper">
          <SearchIcon className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks by title, subject, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
            >
              <XIcon size={14} />
            </button>
          )}
        </div>

        <button
          type="button"
          className="btn btn-primary btn-add-header"
          onClick={onOpenAddModal}
        >
          <PlusIcon size={18} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Middle row: Filter status tabs & Dropdown controls */}
      <div className="filters-controls-row">
        {/* Status Filter Tabs */}
        <div className="status-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={currentFilter === 'all'}
            className={`status-tab ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('all')}
          >
            All <span className="tab-pill">{counts.total}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={currentFilter === 'pending'}
            className={`status-tab ${currentFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('pending')}
          >
            Pending <span className="tab-pill">{counts.pending}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={currentFilter === 'completed'}
            className={`status-tab ${currentFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('completed')}
          >
            Completed <span className="tab-pill">{counts.completed}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={currentFilter === 'overdue'}
            className={`status-tab tab-overdue ${currentFilter === 'overdue' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('overdue')}
          >
            Overdue {counts.overdue > 0 && <span className="tab-pill pill-danger">{counts.overdue}</span>}
          </button>
        </div>

        {/* Dropdowns & Sort */}
        <div className="filter-dropdowns-group">
          {/* Priority Dropdown */}
          <div className="select-wrapper">
            <select
              className="filter-select"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              aria-label="Filter by priority"
            >
              <option value="all">All Priorities</option>
              <option value="high">🔴 High Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="low">🟢 Low Priority</option>
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="select-wrapper">
            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by subject"
            >
              <option value="all">All Subjects</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="select-wrapper sort-wrapper">
            <ArrowUpDownIcon className="select-icon" size={14} />
            <select
              className="filter-select sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort tasks"
            >
              <option value="due-asc">Due Date (Soonest)</option>
              <option value="due-desc">Due Date (Latest)</option>
              <option value="priority-desc">Priority (High to Low)</option>
              <option value="priority-asc">Priority (Low to High)</option>
              <option value="title-asc">Title (A - Z)</option>
              <option value="created-desc">Date Created (Newest)</option>
            </select>
          </div>

          {/* Reset Filters Chip */}
          {hasActiveFilters && (
            <button
              type="button"
              className="btn-clear-filters"
              onClick={handleClearFilters}
              title="Reset all active filters"
            >
              <XIcon size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
