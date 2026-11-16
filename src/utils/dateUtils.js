/**
 * Utility functions for date calculations and formatting.
 */

export function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isOverdue(dueDate, completed) {
  if (!dueDate || completed) return false;
  const today = getTodayString();
  return dueDate < today;
}

export function isDueToday(dueDate) {
  if (!dueDate) return false;
  return dueDate === getTodayString();
}

export function isDueTomorrow(dueDate) {
  if (!dueDate) return false;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return dueDate === `${year}-${month}-${day}`;
}

export function formatDueDate(dateString) {
  if (!dateString) return 'No due date';
  
  if (isDueToday(dateString)) return 'Due Today';
  if (isDueTomorrow(dateString)) return 'Due Tomorrow';

  try {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  } catch {
    return dateString;
  }
}

export function getRelativeDueLabel(dueDate, completed) {
  if (!dueDate) return null;
  if (completed) return { text: 'Completed', type: 'completed' };

  const today = new Date(getTodayString());
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const daysAgo = Math.abs(diffDays);
    return {
      text: daysAgo === 1 ? 'Overdue by 1 day' : `Overdue by ${daysAgo} days`,
      type: 'overdue'
    };
  }
  if (diffDays === 0) {
    return { text: 'Due Today', type: 'today' };
  }
  if (diffDays === 1) {
    return { text: 'Due Tomorrow', type: 'tomorrow' };
  }
  return {
    text: `${diffDays} days left`,
    type: 'upcoming'
  };
}
