# Task 7 - React Counter App

A simple React counter application built with Vite that demonstrates basic React concepts including state management, event handling, and component structure.

## Features

- **Increment Counter**: Click the "+" button to increase the count
- **Decrement Counter**: Click the "-" button to decrease the count  
- **Reset Counter**: Click the "Reset" button to set count back to 0
- **Modern UI**: Beautiful gradient background with glassmorphism design
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React 18
- Vite (Build tool)
- CSS3 with modern styling
- ES6+ JavaScript

## Project Structure

```
Task7-ReactCounter/
├── src/
│   ├── components/
│   │   ├── Counter.jsx
│   │   └── Counter.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Installation & Setup

1. Navigate to the project directory:
   ```bash
   cd Task7-ReactCounter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## React Concepts Demonstrated

1. **Functional Components**: Using modern React functional components
2. **useState Hook**: Managing component state with React hooks
3. **Event Handling**: Handling button click events
4. **Props**: Component communication (though minimal in this simple app)
5. **CSS Modules**: Separate CSS files for component styling
6. **Component Structure**: Organized file structure with separate components

## How It Works

The Counter component uses React's `useState` hook to manage the count state. Three functions handle the different actions:

- `increment()`: Increases count by 1
- `decrement()`: Decreases count by 1  
- `reset()`: Sets count back to 0

The current count is displayed in real-time as the user interacts with the buttons.

## Styling

The app features a modern design with:
- Gradient background
- Glassmorphism effects
- Smooth hover animations
- Responsive button design
- Clean typography