import React from 'react';
import {
  LayersIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon
} from './Icons';

export function DashboardStats({ counts, currentFilter, onSelectFilter }) {
  const percentComplete = counts.total > 0
    ? Math.round((counts.completed / counts.total) * 100)
    : 0;

  return (
    <section className="dashboard-stats-grid" aria-label="Dashboard Task Statistics">
      {/* Total Tasks Card */}
      <div
        className={`stat-card stat-total ${currentFilter === 'all' ? 'active-card' : ''}`}
        onClick={() => onSelectFilter('all')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectFilter('all')}
      >
        <div className="stat-card-top">
          <span className="stat-label">Total Tasks</span>
          <div className="stat-icon-wrapper icon-total">
            <LayersIcon size={22} />
          </div>
        </div>
        <div className="stat-number">{counts.total}</div>
        <div className="stat-footer">
          <span className="stat-subtext">All registered coursework</span>
        </div>
      </div>

      {/* Pending Tasks Card */}
      <div
        className={`stat-card stat-pending ${currentFilter === 'pending' ? 'active-card' : ''}`}
        onClick={() => onSelectFilter('pending')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectFilter('pending')}
      >
        <div className="stat-card-top">
          <span className="stat-label">Pending</span>
          <div className="stat-icon-wrapper icon-pending">
            <ClockIcon size={22} />
          </div>
        </div>
        <div className="stat-number">{counts.pending}</div>
        <div className="stat-footer">
          <span className="stat-subtext">Awaiting submission</span>
        </div>
      </div>

      {/* Completed Tasks Card */}
      <div
        className={`stat-card stat-completed ${currentFilter === 'completed' ? 'active-card' : ''}`}
        onClick={() => onSelectFilter('completed')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectFilter('completed')}
      >
        <div className="stat-card-top">
          <span className="stat-label">Completed</span>
          <div className="stat-icon-wrapper icon-completed">
            <CheckCircleIcon size={22} />
          </div>
        </div>
        <div className="stat-number">{counts.completed}</div>
        <div className="stat-footer">
          <span className="stat-tag-success">{percentComplete}% Done</span>
          <span className="stat-subtext">Graded & finished</span>
        </div>
      </div>

      {/* Overdue Tasks Card */}
      <div
        className={`stat-card stat-overdue ${counts.overdue > 0 ? 'has-overdue' : ''} ${currentFilter === 'overdue' ? 'active-card' : ''}`}
        onClick={() => onSelectFilter('overdue')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectFilter('overdue')}
      >
        <div className="stat-card-top">
          <span className="stat-label">Overdue</span>
          <div className="stat-icon-wrapper icon-overdue">
            <AlertTriangleIcon size={22} />
          </div>
        </div>
        <div className="stat-number">{counts.overdue}</div>
        <div className="stat-footer">
          {counts.overdue > 0 ? (
            <span className="stat-tag-danger">Action Required</span>
          ) : (
            <span className="stat-tag-good">All on schedule</span>
          )}
        </div>
      </div>
    </section>
  );
}
