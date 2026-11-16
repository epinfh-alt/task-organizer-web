import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardStats } from './components/DashboardStats';
import { TaskFilters } from './components/TaskFilters';
import { TaskCard } from './components/TaskCard';
import { TaskModal } from './components/TaskModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Toast } from './components/Toast';
import {
  MenuIcon,
  PlusIcon,
  BookOpenIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  SparklesIcon
} from './components/Icons';
import { loadTasks, saveTasks, INITIAL_TASKS, CATEGORIES } from './utils/storage';
import { isOverdue } from './utils/dateUtils';

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all'); // 'all' | 'pending' | 'completed' | 'overdue'
  const [selectedPriority, setSelectedPriority] = useState('all'); // 'all' | 'high' | 'medium' | 'low'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('due-asc');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Save to LocalStorage whenever tasks state changes
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Derive unique categories from existing tasks plus defaults
  const allCategories = useMemo(() => {
    const set = new Set(CATEGORIES);
    tasks.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return Array.from(set);
  }, [tasks]);

  // Real-time Counts
  const counts = useMemo(() => {
    let pending = 0;
    let completed = 0;
    let overdue = 0;
    let high = 0;
    let medium = 0;
    let low = 0;

    tasks.forEach((task) => {
      if (task.completed) {
        completed++;
      } else {
        pending++;
        if (isOverdue(task.dueDate, task.completed)) {
          overdue++;
        }
      }

      if (task.priority === 'high') high++;
      else if (task.priority === 'medium') medium++;
      else if (task.priority === 'low') low++;
    });

    return {
      total: tasks.length,
      pending,
      completed,
      overdue,
      high,
      medium,
      low
    };
  }, [tasks]);

  // Filter & Sort Logic
  const filteredTasks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return tasks
      .filter((task) => {
        // Search filter
        if (q) {
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchDesc = (task.description || '').toLowerCase().includes(q);
          const matchCat = (task.category || '').toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }

        // Status view filter
        if (currentFilter === 'pending' && task.completed) return false;
        if (currentFilter === 'completed' && !task.completed) return false;
        if (currentFilter === 'overdue' && !isOverdue(task.dueDate, task.completed)) return false;

        // Priority filter
        if (selectedPriority !== 'all' && task.priority !== selectedPriority) return false;

        // Category filter
        if (selectedCategory !== 'all' && task.category !== selectedCategory) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'due-asc') {
          return (a.dueDate || '').localeCompare(b.dueDate || '');
        }
        if (sortBy === 'due-desc') {
          return (b.dueDate || '').localeCompare(a.dueDate || '');
        }
        if (sortBy === 'priority-desc') {
          const weight = { high: 3, medium: 2, low: 1 };
          return (weight[b.priority] || 0) - (weight[a.priority] || 0);
        }
        if (sortBy === 'priority-asc') {
          const weight = { high: 3, medium: 2, low: 1 };
          return (weight[a.priority] || 0) - (weight[b.priority] || 0);
        }
        if (sortBy === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'created-desc') {
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        }
        return 0;
      });
  }, [tasks, searchQuery, currentFilter, selectedPriority, selectedCategory, sortBy]);

  // CRUD Handlers
  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      // Edit mode
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...taskData } : t))
      );
      showToast('Task updated successfully!');
    } else {
      // Create mode
      const newTask = {
        ...taskData,
        id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        createdAt: new Date().toISOString()
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast('New task added successfully!');
    }
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newStatus = !t.completed;
          showToast(
            newStatus ? 'Task marked as completed! 🎯' : 'Task moved to pending',
            newStatus ? 'success' : 'info'
          );
          return { ...t, completed: newStatus };
        }
        return t;
      })
    );
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    showToast(`Deleted "${taskToDelete.title}"`, 'info');
    setTaskToDelete(null);
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset tasks back to default university demo items?')) {
      setTasks(INITIAL_TASKS);
      showToast('Demo tasks reloaded!', 'info');
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        counts={counts}
        categories={allCategories}
        onOpenAddModal={() => {
          setTaskToEdit(null);
          setIsModalOpen(true);
        }}
        onResetDemoData={handleResetDemoData}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <main className="main-viewport">
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="nav-left">
            <button
              type="button"
              className="btn-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open sidebar navigation"
            >
              <MenuIcon size={22} />
            </button>
            <div className="app-heading">
              <h1 className="page-title">
                Student Task Organizer
              </h1>
              <p className="page-subtitle">
                Plan assignments, track university deadlines, and boost academic productivity.
              </p>
            </div>
          </div>

          <div className="nav-right">
            <button
              type="button"
              className="btn btn-primary btn-quick-add"
              onClick={() => {
                setTaskToEdit(null);
                setIsModalOpen(true);
              }}
            >
              <PlusIcon size={18} />
              <span>New Task</span>
            </button>
          </div>
        </header>

        {/* Dashboard Metrics Section */}
        <div className="content-container">
          <DashboardStats
            counts={counts}
            currentFilter={currentFilter}
            onSelectFilter={(filter) => {
              setCurrentFilter(filter);
              setSelectedPriority('all');
              setSelectedCategory('all');
            }}
          />

          {/* Filtering, Search & Sorting Controls */}
          <TaskFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={allCategories}
            counts={counts}
            onOpenAddModal={() => {
              setTaskToEdit(null);
              setIsModalOpen(true);
            }}
          />

          {/* Task Cards Grid / List */}
          <section className="tasks-section" aria-label="Tasks List">
            <div className="tasks-section-header">
              <h2 className="tasks-section-title">
                {currentFilter === 'all' && 'All Coursework Tasks'}
                {currentFilter === 'pending' && 'Pending Tasks'}
                {currentFilter === 'completed' && 'Completed Tasks'}
                {currentFilter === 'overdue' && 'Overdue Tasks (Urgent)'}
                <span className="tasks-count-pill">{filteredTasks.length}</span>
              </h2>
            </div>

            {filteredTasks.length > 0 ? (
              <div className="tasks-grid">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onEdit={(t) => {
                      setTaskToEdit(t);
                      setIsModalOpen(true);
                    }}
                    onDelete={(t) => setTaskToDelete(t)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="empty-state-card">
                <div className="empty-state-icon">
                  {currentFilter === 'completed' ? (
                    <CheckCircleIcon size={36} />
                  ) : (
                    <SparklesIcon size={36} />
                  )}
                </div>
                <h3 className="empty-state-title">No tasks found</h3>
                <p className="empty-state-text">
                  {searchQuery || selectedPriority !== 'all' || selectedCategory !== 'all'
                    ? 'No tasks match your current search and filter criteria.'
                    : currentFilter === 'overdue'
                    ? 'Awesome! You have no overdue coursework.'
                    : currentFilter === 'completed'
                    ? 'No completed tasks yet. Finish a task to see it here!'
                    : 'Your task list is empty. Add a task to start organizing your studies!'}
                </p>
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={() => {
                    if (searchQuery || selectedPriority !== 'all' || selectedCategory !== 'all') {
                      setSearchQuery('');
                      setSelectedPriority('all');
                      setSelectedCategory('all');
                      setCurrentFilter('all');
                    } else {
                      setTaskToEdit(null);
                      setIsModalOpen(true);
                    }
                  }}
                >
                  <PlusIcon size={18} />
                  <span>
                    {searchQuery || selectedPriority !== 'all' || selectedCategory !== 'all'
                      ? 'Clear Filters'
                      : 'Create Your First Task'}
                  </span>
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Add / Edit Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        categories={allCategories}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(taskToDelete)}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title || ''}
      />

      {/* Toast Alert Feedback */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
