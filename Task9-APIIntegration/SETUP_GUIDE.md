# 🚀 Task 9 - API Integration Setup Guide

This guide will help you set up and run the full-stack application with React frontend, Node.js backend, and MongoDB database.

## 📋 Prerequisites

Before starting, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - **Local MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
  - **MongoDB Atlas** (Cloud) - [Sign up here](https://www.mongodb.com/atlas)
- **Git** (optional) - [Download here](https://git-scm.com/)

## 🛠️ Installation Steps

### Step 1: Install Backend Dependencies

```bash
# Navigate to backend folder
cd Task9-APIIntegration/backend

# Install dependencies
npm install
```

### Step 2: Install Frontend Dependencies

```bash
# Navigate to frontend folder (open new terminal)
cd Task9-APIIntegration/frontend

# Install dependencies
npm install
```

### Step 3: Database Setup

#### Option A: Local MongoDB
1. Install and start MongoDB locally
2. MongoDB will run on `mongodb://localhost:27017` by default
3. The `.env` file is already configured for local MongoDB

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `.env` file in the backend folder:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task9_database
   ```

## 🚀 Running the Application

### Start Backend Server (Terminal 1)
```bash
cd Task9-APIIntegration/backend
npm run dev
```
The backend will run on: http://localhost:5000

### Start Frontend Development Server (Terminal 2)
```bash
cd Task9-APIIntegration/frontend
npm run dev
```
The frontend will run on: http://localhost:3000

## 🧪 Testing the Application

1. **Open your browser** and go to http://localhost:3000
2. **Fill out the form** with user information
3. **Submit the form** - the data will be sent to the backend and stored in MongoDB
4. **View the users list** - data will be fetched from the database and displayed
5. **Edit/Delete users** - test the full CRUD functionality

## 📡 API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🔧 Troubleshooting

### Backend Issues
- **Port 5000 already in use**: Change PORT in `.env` file
- **MongoDB connection failed**: Check MongoDB is running or verify Atlas connection string
- **Dependencies error**: Delete `node_modules` and run `npm install` again

### Frontend Issues
- **Port 3000 already in use**: Vite will automatically suggest another port
- **API calls failing**: Ensure backend is running on port 5000
- **Build errors**: Check Node.js version (should be v16+)

### Database Issues
- **Local MongoDB**: Ensure MongoDB service is running
- **Atlas MongoDB**: Check network access and database user permissions

## 📁 Project Structure

```
Task9-APIIntegration/
├── backend/                 # Node.js + Express API
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env               # Environment variables
│   └── .gitignore         # Git ignore rules
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service functions
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── README.md              # Project documentation
```

## 🎯 Features Demonstrated

- ✅ **React Forms** with validation
- ✅ **API Integration** with Axios
- ✅ **CRUD Operations** (Create, Read, Update, Delete)
- ✅ **MongoDB Integration** with Mongoose
- ✅ **Error Handling** on both frontend and backend
- ✅ **Responsive Design** with modern CSS
- ✅ **Real-time Updates** after operations
- ✅ **Form Validation** and user feedback

## 🎨 Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **MongoDB** - NoSQL document database

## 🔄 Development Workflow

1. **Make changes** to frontend or backend code
2. **Hot reload** will automatically update the application
3. **Test changes** in the browser
4. **Check console** for any errors or API logs
5. **Verify database** changes in MongoDB

## 🚀 Next Steps

To extend this application, you could add:
- User authentication and authorization
- File upload functionality
- Search and filtering capabilities
- Pagination for large datasets
- Real-time updates with WebSockets
- Unit and integration tests
- Docker containerization
- Deployment to cloud platforms

Happy coding! 🎉