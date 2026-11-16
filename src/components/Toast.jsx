import React, { useEffect } from 'react';
import { CheckCircleIcon, XIcon } from './Icons';

export function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <aside
      className={`toast-notification toast-${toast.type || 'info'}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-icon">
        <CheckCircleIcon size={18} />
      </div>
      <div className="toast-message">{toast.message}</div>
      <button
        type="button"
        className="toast-close-btn"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        <XIcon size={14} />
      </button>
    </aside>
  );
}
