# Student Task Organizer 🎓

A modern, responsive, university-tailored web application built to help students manage coursework, prioritize assignments, track impending deadlines, and maintain academic productivity.

Built using **React with Vite**, **Plain CSS**, and browser **LocalStorage** for frictionless offline persistence without requiring any backend or database.

---

## 🌟 Key Features

1. **Task Management (CRUD)**:
   - **Create**: Add new tasks with title, academic subject/category, due date, priority level (High, Medium, Low), and detailed description notes.
   - **Read & Browse**: View tasks in a clean card layout with priority badges, subject tags, and relative countdown indicators (*Due Today*, *Due Tomorrow*, *X days left*, or *Overdue*).
   - **Update**: Edit existing tasks with an intuitive modal pre-populated with current values.
   - **Delete**: Remove tasks with a confirmation safety prompt to prevent accidental data loss.

2. **Status Toggling**:
   - Single-click circular checkbox toggle between **Completed** and **Pending** states.
   - Visual strikethrough styling and opacity feedback on completion.

3. **Smart Dashboard Metrics**:
   - **Total Tasks**: Overall count of registered coursework.
   - **Pending Tasks**: Items awaiting completion.
   - **Completed Tasks**: Real-time completion percentage and count.
   - **Overdue Tasks**: Dynamic calculation comparing due date with current date, highlighted in alert styling if action is urgently needed.
   - **Interactive Cards**: Click any stat card to instantly filter tasks by that status.

4. **Search & Multi-Dimensional Filtering**:
   - **Live Search**: Instant keyword search matching titles, descriptions, and subject tags with a one-click clear button.
   - **Status Tabs**: Fast switching between *All*, *Pending*, *Completed*, and *Overdue*.
   - **Priority Filter**: Filter specifically for High, Medium, or Low priority items.
   - **Subject Filter**: Filter by academic subjects (Computer Science, Mathematics, Software Engineering, etc.) or custom subjects.
   - **Sorting Options**: Sort by due date (soonest/latest), priority level (high to low/low to high), title alphabetical (A-Z), or creation date.

5. **LocalStorage Data Persistence**:
   - Automatically synchronizes all task changes, completions, additions, and deletions to the browser's `localStorage`.
   - Data persists across page reloads and browser sessions.
   - Includes a *Reset Demo Tasks* button in the sidebar to easily restore sample university coursework for demonstration.

6. **Responsive Purple & White Design**:
   - Custom purple-themed UI palette (`#7C3AED` primary, `#EDE9FE` tint, and `#F8FAFC` page surface).
   - Mobile-first responsive layout with collapsible sidebar drawer, hamburger menu, and adaptive multi-column grid.
   - Custom SVG icons with zero external icon library overhead.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool & Dev Server**: [Vite 5](https://vitejs.dev/)
- **Styling**: Pure CSS3 (CSS Variables, Flexbox, CSS Grid, media queries, smooth animations)
- **State & Storage**: React Hooks (`useState`, `useEffect`, `useMemo`, `useRef`) + HTML5 `localStorage`
- **Dependencies**: Zero runtime dependencies outside of React and React-DOM.

---

## 🚀 Getting Started & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- `npm` (bundled with Node.js)

### Installation Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd "Farmasi AI"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/` (or the URL displayed in your terminal).

4. **Production Build & Preview**:
   ```bash
   # Build optimized production bundle to /dist
   npm run build

   # Preview production build locally
   npm run preview
   ```

---

## 📁 Project Structure

```text
├── index.html                   # Entry HTML document with viewport, favicon, and fonts
├── package.json                 # Project configuration, scripts, and dependencies
├── vite.config.js               # Vite development and build settings
├── .gitignore                   # Ignored files for version control
├── README.md                    # Project documentation
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main application controller, state management & layout
    ├── index.css                # Pure CSS design system (variables, responsive styles)
    ├── components/
    │   ├── Sidebar.jsx          # Sidebar with brand logo, views, priority filters & study pace
    │   ├── DashboardStats.jsx   # Interactive metric cards (Total, Pending, Completed, Overdue)
    │   ├── TaskFilters.jsx      # Search input, status tabs, dropdown filters & sort selector
    │   ├── TaskCard.jsx         # Individual task card with priority badge, date pill & actions
    │   ├── TaskModal.jsx        # Dialog modal for adding and editing tasks
    │   ├── DeleteConfirmModal.jsx # Confirmation dialog before deleting a task
    │   ├── Toast.jsx            # Action feedback notification toasts
    │   └── Icons.jsx            # Handcrafted lightweight SVG icons (0 external dependencies)
    └── utils/
        ├── dateUtils.js         # Date comparisons, overdue checks, and human-friendly formatting
        └── storage.js           # LocalStorage helpers and initial university mock data
```

---

## 💡 Usage Notes

- **Overdue Detection**: Tasks are marked as overdue if their due date is earlier than today's local date and they are not yet marked as completed.
- **Demo Data**: When opened for the first time, initial coursework tasks are automatically populated so that the dashboard shows active metrics immediately.
- **Custom Subjects**: When creating or editing a task, selecting `+ Custom Subject...` lets students input custom university course codes or names.

---

## 📄 License
This project is prepared as an academic submission demonstrating front-end application architecture and responsive UI design using Google Antigravity.
