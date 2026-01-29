# MongoDB Task

A simple backend application that connects to MongoDB Atlas and saves data to the database.

## Features
- MongoDB Atlas connection
- Data persistence
- Simple API endpoints
- Clean backend architecture

## Setup
1. Create MongoDB Atlas account
2. Get connection string
3. Install dependencies: `npm install`
4. Create `.env` file with your MongoDB connection string
5. Run: `npm start`

## API Endpoints
- POST /api/data - Save data to database
- GET /api/data - Retrieve all data

## Environment Variables
- MONGODB_URI - Your MongoDB Atlas connection string