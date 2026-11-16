import React from 'react';
import { TrashIcon, AlertTriangleIcon } from './Icons';

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, taskTitle }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon-wrap">
          <TrashIcon size={24} className="icon-danger" />
        </div>
        <h3 className="confirm-title">Delete Task?</h3>
        <p className="confirm-text">
          Are you sure you want to delete <strong>"{taskTitle}"</strong>? This action cannot be undone.
        </p>
        <div className="modal-actions mt-4">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
