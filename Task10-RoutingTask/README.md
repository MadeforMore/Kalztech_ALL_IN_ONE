# Task 10 - Routing Task: Login & Dashboard

A React application demonstrating routing with authentication flow between Login and Dashboard pages.

## Features

- **React Router DOM** for navigation
- **Protected Routes** with authentication
- **Login Page** with form validation
- **Dashboard Page** with user interface
- **Responsive Design** for mobile and desktop
- **Modern UI** with gradient backgrounds and animations

## Demo Credentials

- **Username:** admin
- **Password:** password

## Project Structure

```
Task10-RoutingTask/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Login page component
│   │   ├── Login.css          # Login page styles
│   │   ├── Dashboard.jsx      # Dashboard page component
│   │   └── Dashboard.css      # Dashboard page styles
│   ├── App.jsx                # Main app with routing logic
│   ├── App.css                # App styles
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
└── vite.config.js             # Vite configuration
```

## How It Works

1. **Initial Route:** App starts at `/` and redirects to `/login`
2. **Login Flow:** User enters credentials on login page
3. **Authentication:** Simple validation (admin/password)
4. **Protected Dashboard:** Only accessible after login
5. **Logout:** Returns user to login page

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open browser to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and animations

## Key Concepts Demonstrated

- Client-side routing with React Router
- Protected routes and authentication state
- Conditional rendering based on auth status
- Form handling and validation
- Responsive CSS design
- Component-based architecture