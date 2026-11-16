import React from 'react';
import {
  GraduationCapIcon,
  PlusIcon,
  LayersIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  BookOpenIcon,
  XIcon,
  RefreshCwIcon
} from './Icons';

export function Sidebar({
  currentFilter,
  setCurrentFilter,
  selectedCategory,
  setSelectedCategory,
  selectedPriority,
  setSelectedPriority,
  counts,
  categories,
  onOpenAddModal,
  onResetDemoData,
  isMobileOpen,
  setIsMobileOpen
}) {
  const percentComplete = counts.total > 0
    ? Math.round((counts.completed / counts.total) * 100)
    : 0;

  const handleNavClick = (filter) => {
    setCurrentFilter(filter);
    setSelectedPriority('all');
    setSelectedCategory('all');
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority === selectedPriority ? 'all' : priority);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? 'all' : category);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isMobileOpen ? 'sidebar-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-logo-wrap">
            <div className="brand-icon">
              <GraduationCapIcon size={24} />
            </div>
            <div className="brand-text">
              <h2>TaskOrganizer</h2>
              <span className="brand-tag">Student Edition</span>
            </div>
          </div>
          <button
            className="mobile-close-btn"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close sidebar menu"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Primary Action Button */}
        <div className="sidebar-action">
          <button
            type="button"
            className="btn btn-primary btn-add-task"
            onClick={() => {
              onOpenAddModal();
              if (setIsMobileOpen) setIsMobileOpen(false);
            }}
          >
            <PlusIcon size={18} />
            <span>New Task</span>
          </button>
        </div>

        {/* Navigation Section */}
        <div className="sidebar-nav-container">
          <div className="nav-section-title">Views</div>
          <nav className="sidebar-nav">
            <button
              type="button"
              className={`nav-item ${currentFilter === 'all' && selectedPriority === 'all' && selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleNavClick('all')}
            >
              <div className="nav-item-content">
                <LayersIcon size={18} />
                <span>All Tasks</span>
              </div>
              <span className="nav-badge">{counts.total}</span>
            </button>

            <button
              type="button"
              className={`nav-item ${currentFilter === 'pending' ? 'active' : ''}`}
              onClick={() => handleNavClick('pending')}
            >
              <div className="nav-item-content">
                <ClockIcon size={18} />
                <span>Pending</span>
              </div>
              <span className="nav-badge badge-pending">{counts.pending}</span>
            </button>

            <button
              type="button"
              className={`nav-item ${currentFilter === 'completed' ? 'active' : ''}`}
              onClick={() => handleNavClick('completed')}
            >
              <div className="nav-item-content">
                <CheckCircleIcon size={18} />
                <span>Completed</span>
              </div>
              <span className="nav-badge badge-completed">{counts.completed}</span>
            </button>

            <button
              type="button"
              className={`nav-item ${currentFilter === 'overdue' ? 'active' : ''}`}
              onClick={() => handleNavClick('overdue')}
            >
              <div className="nav-item-content">
                <AlertTriangleIcon size={18} />
                <span>Overdue</span>
              </div>
              {counts.overdue > 0 && (
                <span className="nav-badge badge-overdue">{counts.overdue}</span>
              )}
            </button>
          </nav>

          {/* Priority Quick Filter */}
          <div className="nav-section-title">Priorities</div>
          <div className="priority-nav-list">
            <button
              type="button"
              className={`priority-filter-chip priority-chip-high ${selectedPriority === 'high' ? 'active' : ''}`}
              onClick={() => handlePriorityClick('high')}
            >
              <span className="dot dot-high"></span>
              <span className="chip-label">High Priority</span>
              <span className="chip-count">{counts.high}</span>
            </button>
            <button
              type="button"
              className={`priority-filter-chip priority-chip-medium ${selectedPriority === 'medium' ? 'active' : ''}`}
              onClick={() => handlePriorityClick('medium')}
            >
              <span className="dot dot-medium"></span>
              <span className="chip-label">Medium Priority</span>
              <span className="chip-count">{counts.medium}</span>
            </button>
            <button
              type="button"
              className={`priority-filter-chip priority-chip-low ${selectedPriority === 'low' ? 'active' : ''}`}
              onClick={() => handlePriorityClick('low')}
            >
              <span className="dot dot-low"></span>
              <span className="chip-label">Low Priority</span>
              <span className="chip-count">{counts.low}</span>
            </button>
          </div>

          {/* Subjects / Categories */}
          {categories.length > 0 && (
            <>
              <div className="nav-section-title">Subjects & Modules</div>
              <div className="category-nav-list">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`category-item-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    <BookOpenIcon size={15} />
                    <span className="category-name">{cat}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sidebar Footer: Study Progress Card */}
        <div className="sidebar-footer">
          <div className="study-progress-card">
            <div className="progress-card-header">
              <span className="progress-title">Study Completion</span>
              <span className="progress-pct">{percentComplete}%</span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <p className="progress-subtext">
              {percentComplete === 100
                ? '🎉 All coursework cleared!'
                : `${counts.completed} of ${counts.total} tasks completed`}
            </p>
          </div>

          <button
            type="button"
            className="btn-reset-demo"
            onClick={onResetDemoData}
            title="Load initial university sample tasks"
          >
            <RefreshCwIcon size={14} />
            <span>Reset Demo Tasks</span>
          </button>
        </div>
      </aside>
    </>
  );
}
