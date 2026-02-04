# Task 8 - React Todo App

## Components & State Management

A comprehensive React Todo application demonstrating component composition, state management, and modern React patterns.

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit existing todos (inline editing)
- ✅ Delete todos
- ✅ Clear all completed todos
- ✅ Real-time statistics (total, completed, remaining)
- ✅ Responsive design
- ✅ Timestamps for each todo

## Component Architecture

### App.jsx (Main Container)
- Manages global todo state
- Handles all todo operations (add, toggle, delete, edit)
- Provides statistics and clear completed functionality

### TodoForm.jsx
- Controlled input component for adding new todos
- Form validation and submission handling

### TodoList.jsx
- Renders list of todos or empty state
- Maps over todos and renders TodoItem components

### TodoItem.jsx
- Individual todo item with inline editing
- Toggle completion, edit, and delete functionality
- Keyboard shortcuts (Enter to save, Escape to cancel)

## Key React Concepts Demonstrated

### State Management
- `useState` for component state
- State lifting and prop drilling
- Immutable state updates

### Component Composition
- Breaking UI into reusable components
- Props for component communication
- Conditional rendering

### Event Handling
- Form submissions
- Click handlers
- Keyboard events

### Modern React Patterns
- Functional components with hooks
- Controlled components
- Component lifecycle with useEffect (implicit)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## Project Structure

```
src/
├── components/
│   ├── TodoForm.jsx      # Add new todos
│   ├── TodoForm.css
│   ├── TodoList.jsx      # List container
│   ├── TodoList.css
│   ├── TodoItem.jsx      # Individual todo
│   └── TodoItem.css
├── App.jsx               # Main application
├── App.css
├── main.jsx             # React entry point
└── index.css            # Global styles
```

## Learning Objectives

- Understanding React component hierarchy
- Managing state with useState hook
- Passing data between components via props
- Handling user interactions and form submissions
- Implementing CRUD operations in React
- Creating responsive and accessible UI components

## Next Steps

- Add local storage persistence
- Implement todo categories/tags
- Add drag-and-drop reordering
- Include due dates and priorities
- Add search and filter functionality