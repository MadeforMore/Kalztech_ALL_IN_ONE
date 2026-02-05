# Task 9 - API Integration with React Forms

A full-stack application demonstrating React forms integrated with a Node.js backend and MongoDB database.

## Features

- **Frontend (React + Vite)**
  - Modern React forms with validation
  - API integration for CRUD operations
  - Responsive design
  - Real-time data fetching

- **Backend (Node.js + Express)**
  - RESTful API endpoints
  - MongoDB integration with Mongoose
  - Input validation and error handling
  - CORS enabled for frontend communication

- **Database (MongoDB)**
  - User data storage
  - Flexible schema design

## Project Structure

```
Task9-APIIntegration/
├── frontend/          # React application
├── backend/           # Node.js API server
└── README.md
```

## Setup Instructions

### Backend Setup
1. Navigate to backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with MongoDB connection string
4. Start server: `npm run dev`

### Frontend Setup
1. Navigate to frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## API Endpoints

- `GET /api/users` - Fetch all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Technologies Used

- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Styling**: CSS3 with modern design