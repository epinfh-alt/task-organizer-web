import React, { useState } from 'react';
import {
  CalendarIcon,
  EditIcon,
  TrashIcon,
  CheckIcon,
  AlertTriangleIcon,
  BookOpenIcon,
  ClockIcon
} from './Icons';
import { formatDueDate, getRelativeDueLabel, isOverdue } from '../utils/dateUtils';

export function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const overdue = isOverdue(task.dueDate, task.completed);
  const relativeDate = getRelativeDueLabel(task.dueDate, task.completed);

  const priorityLabels = {
    high: { label: 'High Priority', class: 'badge-priority-high' },
    medium: { label: 'Medium Priority', class: 'badge-priority-medium' },
    low: { label: 'Low Priority', class: 'badge-priority-low' }
  };

  const priorityMeta = priorityLabels[task.priority] || priorityLabels.medium;

  return (
    <article
      className={`task-card ${task.completed ? 'task-completed' : ''} ${overdue ? 'task-overdue-border' : ''} priority-${task.priority}`}
    >
      <div className="task-card-main">
        {/* Checkbox circle toggle */}
        <button
          type="button"
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? 'Mark task as pending' : 'Mark task as completed'}
          title={task.completed ? 'Mark as pending' : 'Mark as complete'}
        >
          {task.completed && <CheckIcon size={14} />}
        </button>

        {/* Task Details Content */}
        <div className="task-content">
          {/* Header row: Badges */}
          <div className="task-badges-row">
            {task.category && (
              <span className="badge badge-category">
                <BookOpenIcon size={12} />
                <span>{task.category}</span>
              </span>
            )}

            <span className={`badge ${priorityMeta.class}`}>
              <span className="badge-dot"></span>
              {priorityMeta.label}
            </span>

            {overdue && (
              <span className="badge badge-overdue-alert">
                <AlertTriangleIcon size={12} />
                <span>Overdue</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className={`task-title ${task.completed ? 'title-completed' : ''}`}
            onClick={() => onToggleComplete(task.id)}
            title="Click to toggle completion"
          >
            {task.title}
          </h3>

          {/* Description */}
          {task.description && (
            <div className="task-description-wrapper">
              <p className={`task-description ${isExpanded ? 'expanded' : 'clamped'}`}>
                {task.description}
              </p>
              {task.description.length > 100 && (
                <button
                  type="button"
                  className="btn-toggle-expand"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          )}

          {/* Footer: Due date info & Action buttons */}
          <div className="task-footer">
            <div className="task-date-info">
              <CalendarIcon size={14} className="date-icon" />
              <span className="date-text">{formatDueDate(task.dueDate)}</span>
              {relativeDate && !task.completed && (
                <span className={`relative-due-pill pill-${relativeDate.type}`}>
                  {relativeDate.text}
                </span>
              )}
              {task.completed && (
                <span className="relative-due-pill pill-completed">
                  Completed
                </span>
              )}
            </div>

            {/* Actions: Edit & Delete */}
            <div className="task-actions">
              <button
                type="button"
                className="action-btn action-edit"
                onClick={() => onEdit(task)}
                aria-label={`Edit task "${task.title}"`}
                title="Edit task"
              >
                <EditIcon size={15} />
              </button>
              <button
                type="button"
                className="action-btn action-delete"
                onClick={() => onDelete(task)}
                aria-label={`Delete task "${task.title}"`}
                title="Delete task"
              >
                <TrashIcon size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
