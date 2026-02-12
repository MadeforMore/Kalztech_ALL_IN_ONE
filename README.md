# Contact Manager - Full Stack Application

A professional contact management system with authentication, CRUD operations, and a modern React frontend.

## Features

- User Authentication (Login/Signup with JWT)
- Create, Read, Update, Delete contacts
- MongoDB database integration
- RESTful API backend
- Modern React frontend with Vite
- Responsive design
- Form validation
- Protected routes

## Tech Stack

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing
- CORS enabled

### Frontend
- React 18
- Vite
- React Router for navigation
- Axios for API calls
- CSS3 for styling

## Project Structure

```
WeeklyTask1-ContactManager/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.jsx
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Create `.env` file:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Create `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user

### Contacts (Protected)
- GET `/api/contacts` - Get all contacts
- GET `/api/contacts/:id` - Get single contact
- POST `/api/contacts` - Create contact
- PUT `/api/contacts/:id` - Update contact
- DELETE `/api/contacts/:id` - Delete contact

## Features Overview

- Secure authentication with JWT tokens
- Password encryption using bcrypt
- Protected API routes with middleware
- User-specific contact management
- Real-time form validation
- Responsive UI design
- Error handling and user feedback
