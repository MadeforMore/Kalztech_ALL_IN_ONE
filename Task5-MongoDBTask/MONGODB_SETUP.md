# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" or "Sign Up"
3. Create your account with email and password
4. Verify your email address

## Step 2: Create a Cluster

1. After logging in, click "Create a Deployment"
2. Choose "M0 Sandbox" (Free tier)
3. Select your preferred cloud provider and region
4. Name your cluster (e.g., "TaskCluster")
5. Click "Create Deployment"

## Step 3: Create Database User

1. In the "Security" section, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Configure Network Access

1. In the "Security" section, click "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

## Step 5: Get Connection String

1. Go to "Database" section
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string

## Step 6: Configure Your Application

1. Create a `.env` file in your project root
2. Add your connection string:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/taskdb?retryWrites=true&w=majority
PORT=3000
```
3. Replace `<username>`, `<password>`, and `<cluster-url>` with your actual values

## Step 7: Install Dependencies and Run

```bash
cd Task5-MongoDBTask
npm install
npm start
```

Your application will be available at `http://localhost:3000`

## Troubleshooting

- **Connection Error**: Check your username, password, and IP whitelist
- **Authentication Failed**: Verify database user credentials
- **Network Error**: Ensure your IP is whitelisted in Network Access
- **Database Not Found**: The database will be created automatically when you first save data