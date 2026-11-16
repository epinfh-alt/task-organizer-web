import { getTodayString } from './dateUtils.js';

const STORAGE_KEY = 'student_task_organizer_tasks';

function getRelativeDate(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Submit Artificial Intelligence Lab Report',
    description: 'Complete the neural network backpropagation experiment and write up performance comparisons in IEEE format.',
    category: 'Computer Science',
    priority: 'high',
    dueDate: getRelativeDate(2),
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Read Database Systems: Chapter 6 Indexing',
    description: 'Study B-Tree and Hash Index mechanisms. Answer the review exercises at the end of the chapter.',
    category: 'Database Systems',
    priority: 'medium',
    dueDate: getRelativeDate(1),
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Midterm Research Paper - Literature Review',
    description: 'Find 5 peer-reviewed journals on transformer models and summarize findings for Dr. Aris.',
    category: 'Research Methodology',
    priority: 'high',
    dueDate: getRelativeDate(-2), // overdue example
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-4',
    title: 'Calculus II Problem Set 4',
    description: 'Solve problems on volume of solids of revolution and improper integrals (questions 1 to 15).',
    category: 'Mathematics',
    priority: 'medium',
    dueDate: getRelativeDate(5),
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-5',
    title: 'Prepare Capstone Project Pitch Deck',
    description: 'Design 10 presentation slides highlighting problem statement, tech stack, architecture, and timeline.',
    category: 'Software Engineering',
    priority: 'high',
    dueDate: getRelativeDate(4),
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-6',
    title: 'Register for Next Semester Elective Courses',
    description: 'Check prerequisites for Cloud Computing & Mobile Development before course portal opens.',
    category: 'Academic Affairs',
    priority: 'low',
    dueDate: getRelativeDate(7),
    completed: false,
    createdAt: new Date().toISOString()
  }
];

export function loadTasks() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      saveTasks(INITIAL_TASKS);
      return INITIAL_TASKS;
    }
    const parsed = JSON.parse(rawData);
    if (!Array.isArray(parsed)) {
      return INITIAL_TASKS;
    }
    return parsed;
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return INITIAL_TASKS;
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}

export const CATEGORIES = [
  'Computer Science',
  'Mathematics',
  'Software Engineering',
  'Database Systems',
  'Research Methodology',
  'Physics',
  'Academic Affairs',
  'General Study'
];
