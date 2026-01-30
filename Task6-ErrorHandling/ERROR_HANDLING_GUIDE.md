# Complete Error Handling Guide

## 🎯 Overview

This project demonstrates comprehensive error handling in web applications, covering both server-side and client-side error management with proper HTTP status codes and user-friendly error messages.

## 📋 HTTP Status Codes Implemented

### 2xx Success
- **200 OK** - Request successful
- **201 Created** - Resource created successfully

### 4xx Client Errors
- **400 Bad Request** - Invalid request format or parameters
- **401 Unauthorized** - Authentication required
- **403 Forbidden** - Access denied (insufficient permissions)
- **404 Not Found** - Resource not found
- **409 Conflict** - Resource already exists (duplicate email)
- **422 Unprocessable Entity** - Validation errors

### 5xx Server Errors
- **500 Internal Server Error** - Unexpected server error

## 🛠️ Error Handling Features

### Server-Side (Node.js/Express)

1. **Custom Error Classes**
   ```javascript
   class AppError extends Error {
       constructor(message, statusCode, errorCode = null) {
           super(message);
           this.statusCode = statusCode;
           this.errorCode = errorCode;
           this.isOperational = true;
       }
   }
   ```

2. **Validation with Joi**
   - Email format validation
   - Password strength requirements
   - Age range validation
   - Name length validation

3. **Error Logging**
   - Structured error logs
   - Request context logging
   - File-based logging system

4. **Global Error Handler**
   - Centralized error processing
   - Consistent error response format
   - Development vs production error details

### Client-Side (JavaScript)

1. **API Error Handling**
   ```javascript
   class APIError extends Error {
       constructor(message, statusCode, code, details = null) {
           super(message);
           this.statusCode = statusCode;
           this.code = code;
           this.details = details;
       }
   }
   ```

2. **Network Error Detection**
   - Connection timeout handling
   - Server unavailable detection
   - Retry mechanisms

3. **Form Validation**
   - Real-time field validation
   - Visual error indicators
   - User-friendly error messages

4. **User Experience**
   - Loading states
   - Toast notifications
   - Error recovery suggestions

## 🎨 Error Response Format

### Success Response
```json
{
    "status": "success",
    "message": "Operation completed successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com"
        }
    },
    "timestamp": "2024-01-30T10:30:00.000Z"
}
```

### Error Response
```json
{
    "status": "error",
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Validation failed",
        "details": [
            {
                "field": "email",
                "message": "Please provide a valid email address",
                "value": "invalid-email"
            }
        ]
    },
    "timestamp": "2024-01-30T10:30:00.000Z"
}
```

## 🧪 Testing Error Scenarios

### 1. Validation Errors (422)
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A",
    "email": "invalid-email",
    "age": 5,
    "password": "123"
  }'
```

### 2. Authentication Error (401)
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'
```

### 3. Not Found Error (404)
```bash
curl http://localhost:3000/api/users/999
```

### 4. Bad Request (400)
```bash
curl http://localhost:3000/api/users/invalid-id
```

## 🔧 Setup and Usage

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
```bash
npm start
```

### 3. Run Tests
```bash
npm test
```

### 4. Open Frontend
Navigate to `http://localhost:3000` in your browser

## 📊 Error Statistics

The application tracks:
- Total requests made
- Successful requests
- Error requests
- Error rate percentage

## 🎯 Best Practices Demonstrated

### Server-Side
1. **Consistent Error Format** - All errors follow the same JSON structure
2. **Proper Status Codes** - HTTP status codes match the error type
3. **Error Logging** - All errors are logged with context
4. **Input Validation** - Comprehensive validation with detailed messages
5. **Security** - Sensitive information not exposed in production

### Client-Side
1. **Error Boundaries** - Graceful error handling at component level
2. **User Feedback** - Clear error messages and recovery suggestions
3. **Loading States** - Visual feedback during API calls
4. **Retry Logic** - Automatic retry for network errors
5. **Form Validation** - Real-time validation with visual indicators

## 🚀 Advanced Features

### 1. Error Recovery
- Automatic retry for transient errors
- Fallback mechanisms
- Graceful degradation

### 2. Error Monitoring
- Error rate tracking
- Performance impact analysis
- User experience metrics

### 3. Security Considerations
- Input sanitization
- Rate limiting
- Error message sanitization

## 📝 Error Codes Reference

| Code | Description | Status | Action |
|------|-------------|--------|--------|
| VALIDATION_ERROR | Input validation failed | 422 | Fix input data |
| AUTHENTICATION_ERROR | Auth required | 401 | Provide valid token |
| AUTHORIZATION_ERROR | Access denied | 403 | Check permissions |
| NOT_FOUND_ERROR | Resource not found | 404 | Check resource ID |
| EMAIL_EXISTS | Duplicate email | 409 | Use different email |
| NETWORK_ERROR | Connection failed | 0 | Check connection |
| INTERNAL_ERROR | Server error | 500 | Contact support |

## 🎓 Learning Outcomes

After exploring this project, you'll understand:

1. **HTTP Status Codes** - When and how to use different status codes
2. **Error Handling Patterns** - Best practices for error management
3. **User Experience** - How to make errors user-friendly
4. **API Design** - Consistent error response formats
5. **Validation** - Comprehensive input validation strategies
6. **Logging** - Effective error logging and monitoring
7. **Security** - Safe error handling practices

## 🔗 Related Resources

- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Error Handling Best Practices](https://expressjs.com/en/guide/error-handling.html)
- [Joi Validation](https://joi.dev/api/)
- [REST API Error Handling](https://blog.restcase.com/rest-api-error-codes-101/)