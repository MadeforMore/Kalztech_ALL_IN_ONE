# Task 6 - Error Handling Project

A comprehensive error handling demonstration project showcasing proper HTTP status codes, request validation, and user-friendly error messages.

## 🎯 Features

- **Proper HTTP Status Codes** (200, 400, 401, 403, 404, 422, 500)
- **Request Validation** with detailed error messages
- **Custom Error Classes** for different error types
- **Error Logging** and monitoring
- **User-friendly Error Pages** with recovery suggestions
- **API Error Responses** in consistent JSON format
- **Client-side Error Handling** with retry mechanisms

## 🚀 Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Validation:** Joi validation library
- **Logging:** Custom error logger
- **HTTP Client:** Fetch API with error handling

## 📋 Error Types Covered

1. **400 Bad Request** - Invalid request format
2. **401 Unauthorized** - Authentication required
3. **403 Forbidden** - Access denied
4. **404 Not Found** - Resource not found
5. **422 Unprocessable Entity** - Validation errors
6. **500 Internal Server Error** - Server errors

## 🛠️ Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open `index.html` in your browser

## 📁 Project Structure

```
Task6-ErrorHandling/
├── server.js          # Express server with error handling
├── package.json       # Dependencies
├── index.html         # Frontend interface
├── style.css          # Styling
├── script.js          # Client-side error handling
├── errors/            # Custom error classes
└── logs/              # Error logs
```

## 🎨 Demo Features

- User registration with validation
- API testing interface
- Error simulation buttons
- Real-time error display
- Error recovery suggestions