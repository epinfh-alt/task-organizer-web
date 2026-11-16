import React, { useState, useEffect, useRef } from 'react';
import { XIcon, PlusIcon, EditIcon } from './Icons';
import { getTodayString } from '../utils/dateUtils';

export function TaskModal({ isOpen, onClose, onSave, taskToEdit, categories }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Computer Science');
  const [customCategory, setCustomCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title || '');
        setDescription(taskToEdit.description || '');
        if (categories.includes(taskToEdit.category)) {
          setCategory(taskToEdit.category);
          setCustomCategory('');
        } else if (taskToEdit.category) {
          setCategory('Other');
          setCustomCategory(taskToEdit.category);
        } else {
          setCategory('General Study');
        }
        setDueDate(taskToEdit.dueDate || getTodayString());
        setPriority(taskToEdit.priority || 'medium');
        setCompleted(Boolean(taskToEdit.completed));
      } else {
        // Reset for new task
        setTitle('');
        setDescription('');
        setCategory(categories[0] || 'Computer Science');
        setCustomCategory('');
        // Default due date: tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const y = tomorrow.getFullYear();
        const m = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const d = String(tomorrow.getDate()).padStart(2, '0');
        setDueDate(`${y}-${m}-${d}`);
        setPriority('medium');
        setCompleted(false);
      }
      setError('');
      setTimeout(() => {
        if (titleInputRef.current) {
          titleInputRef.current.focus();
        }
      }, 50);
    }
  }, [isOpen, taskToEdit, categories]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      if (titleInputRef.current) titleInputRef.current.focus();
      return;
    }

    const finalCategory = category === 'Other'
      ? (customCategory.trim() || 'General Study')
      : category;

    onSave({
      id: taskToEdit ? taskToEdit.id : undefined,
      title: title.trim(),
      description: description.trim(),
      category: finalCategory,
      dueDate: dueDate || getTodayString(),
      priority,
      completed,
      createdAt: taskToEdit?.createdAt || new Date().toISOString()
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon">
              {taskToEdit ? <EditIcon size={20} /> : <PlusIcon size={20} />}
            </div>
            <div>
              <h2 className="modal-title">
                {taskToEdit ? 'Edit Task' : 'Add New Task'}
              </h2>
              <p className="modal-subtitle">
                {taskToEdit ? 'Update task details and deadlines' : 'Track a new coursework or study objective'}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="form-error-alert">{error}</div>}

          {/* Title */}
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Task Title <span className="required-star">*</span>
            </label>
            <input
              id="task-title"
              ref={titleInputRef}
              type="text"
              className={`form-input ${error ? 'input-error' : ''}`}
              placeholder="e.g. Complete Operating Systems Homework 3"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              required
            />
          </div>

          {/* Category & Due Date Row */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="task-category" className="form-label">
                Subject / Category
              </label>
              <select
                id="task-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="Other">+ Custom Subject...</option>
              </select>

              {category === 'Other' && (
                <input
                  type="text"
                  className="form-input mt-2"
                  placeholder="Type subject name..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  autoFocus
                />
              )}
            </div>

            <div className="form-group flex-1">
              <label htmlFor="task-duedate" className="form-label">
                Due Date <span className="required-star">*</span>
              </label>
              <input
                id="task-duedate"
                type="date"
                className="form-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Priority Selection */}
          <div className="form-group">
            <label className="form-label">Priority Level</label>
            <div className="priority-select-cards">
              <label
                className={`priority-radio-card radio-high ${priority === 'high' ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={priority === 'high'}
                  onChange={() => setPriority('high')}
                />
                <span className="dot dot-high"></span>
                <span className="radio-text">High</span>
              </label>

              <label
                className={`priority-radio-card radio-medium ${priority === 'medium' ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={priority === 'medium'}
                  onChange={() => setPriority('medium')}
                />
                <span className="dot dot-medium"></span>
                <span className="radio-text">Medium</span>
              </label>

              <label
                className={`priority-radio-card radio-low ${priority === 'low' ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={priority === 'low'}
                  onChange={() => setPriority('low')}
                />
                <span className="dot dot-low"></span>
                <span className="radio-text">Low</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Description / Notes (Optional)
            </label>
            <textarea
              id="task-description"
              rows={3}
              className="form-textarea"
              placeholder="Add key instructions, submission portal link, or study guidelines..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Edit status toggle if editing */}
          {taskToEdit && (
            <div className="form-group">
              <label className="checkbox-status-label">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
                <span>Mark this task as completed</span>
              </label>
            </div>
          )}

          {/* Actions */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
