# Blog Platform - Full Stack Application

A professional blogging platform with authentication, CRUD operations for posts, comments, and a modern React frontend.

## Features

- User Authentication (Login/Signup with JWT)
- Create, Read, Update, Delete blog posts
- Comment system on posts
- Category and tag filtering
- Search functionality
- User-specific post management
- View counter for posts
- MongoDB database integration
- RESTful API backend
- Modern React frontend with Vite
- Responsive design

## Tech Stack

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing
- CORS enabled
- Text search indexing

### Frontend
- React 18
- Vite
- React Router for navigation
- Axios for API calls
- CSS3 for styling

## Project Structure

```
WeeklyTask2-BlogPlatform/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── commentRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── PostCard.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   ├── PostDetail.jsx
│       │   ├── CreatePost.jsx
│       │   ├── EditPost.jsx
│       │   └── MyPosts.jsx
│       ├── services/
│       │   └── api.js
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
   PORT=5001
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
   VITE_API_URL=http://localhost:5001/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user

### Posts
- GET `/api/posts` - Get all posts (with optional category and search filters)
- GET `/api/posts/my-posts` - Get logged-in user's posts (Protected)
- GET `/api/posts/:id` - Get single post
- POST `/api/posts` - Create post (Protected)
- PUT `/api/posts/:id` - Update post (Protected)
- DELETE `/api/posts/:id` - Delete post (Protected)

### Comments
- GET `/api/comments/:postId` - Get all comments for a post
- POST `/api/comments/:postId` - Create comment (Protected)
- DELETE `/api/comments/:id` - Delete comment (Protected)

## Features Overview

### Authentication
- Secure JWT-based authentication
- Password encryption with bcrypt
- Protected routes and API endpoints

### Blog Posts
- Rich text content support
- Categories: Technology, Lifestyle, Travel, Food, Health, Business, General
- Tags for better organization
- Excerpt/summary support
- View counter
- Publish/unpublish functionality
- Full-text search capability

### Comments
- Nested comment system
- User-specific comment management
- Real-time comment updates

### User Experience
- Responsive design for all devices
- Intuitive navigation
- Form validation
- Error handling with user feedback
- Loading states
- Empty state handling

## Categories

- Technology
- Lifestyle
- Travel
- Food
- Health
- Business
- General

## Development Notes

- Backend runs on port 5001 by default
- Frontend runs on port 3001 by default
- MongoDB connection required
- JWT secret must be set for authentication
- CORS enabled for frontend-backend communication
