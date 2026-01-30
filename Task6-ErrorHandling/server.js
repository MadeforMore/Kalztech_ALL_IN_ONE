const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Custom Error Classes
class AppError extends Error {
    constructor(message, statusCode, errorCode = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message, details = []) {
        super(message, 422, 'VALIDATION_ERROR');
        this.details = details;
    }
}

class AuthenticationError extends AppError {
    constructor(message = 'Authentication required') {
        super(message, 401, 'AUTHENTICATION_ERROR');
    }
}

class AuthorizationError extends AppError {
    constructor(message = 'Access denied') {
        super(message, 403, 'AUTHORIZATION_ERROR');
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404, 'NOT_FOUND_ERROR');
    }
}

// Error Logger
const logError = (error, req = null) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        error: {
            message: error.message,
            stack: error.stack,
            statusCode: error.statusCode || 500,
            errorCode: error.errorCode || 'UNKNOWN_ERROR'
        },
        request: req ? {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req.body,
            ip: req.ip
        } : null
    };

    // Ensure logs directory exists
    if (!fs.existsSync('./logs')) {
        fs.mkdirSync('./logs');
    }

    // Write to log file
    fs.appendFileSync('./logs/error.log', JSON.stringify(logEntry) + '\n');
    
    // Also log to console in development
    if (process.env.NODE_ENV !== 'production') {
        console.error('Error logged:', logEntry);
    }
};

// Validation Schemas
const userSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name cannot exceed 50 characters',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    age: Joi.number().integer().min(13).max(120).required().messages({
        'number.min': 'Age must be at least 13',
        'number.max': 'Age cannot exceed 120',
        'any.required': 'Age is required'
    }),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        'any.required': 'Password is required'
    })
});

// Mock database
let users = [];
let currentUserId = 1;

// Authentication middleware
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        throw new AuthenticationError('Authorization token is required');
    }
    
    if (token !== 'Bearer valid-token') {
        throw new AuthenticationError('Invalid or expired token');
    }
    
    req.user = { id: 1, role: 'user' };
    next();
};

// Admin authorization middleware
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        throw new AuthorizationError('Admin access required');
    }
    next();
};

// Routes

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running properly',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Get all users
app.get('/api/users', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            users: users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                age: user.age
            }))
        },
        count: users.length
    });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
        throw new AppError('User ID must be a valid number', 400, 'INVALID_USER_ID');
    }
    
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        throw new NotFoundError(`User with ID ${userId} not found`);
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                age: user.age
            }
        }
    });
});

// Create user
app.post('/api/users', (req, res) => {
    // Validate request body
    const { error, value } = userSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        const details = error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message,
            value: detail.context.value
        }));
        
        throw new ValidationError('Validation failed', details);
    }
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === value.email);
    if (existingUser) {
        throw new AppError('Email already exists', 409, 'EMAIL_EXISTS');
    }
    
    // Create new user
    const newUser = {
        id: currentUserId++,
        ...value,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,
                createdAt: newUser.createdAt
            }
        }
    });
});

// Update user
app.put('/api/users/:id', requireAuth, (req, res) => {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
        throw new AppError('User ID must be a valid number', 400, 'INVALID_USER_ID');
    }
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        throw new NotFoundError(`User with ID ${userId} not found`);
    }
    
    // Validate request body (partial update)
    const updateSchema = userSchema.fork(['name', 'email', 'age', 'password'], (schema) => schema.optional());
    const { error, value } = updateSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        const details = error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message,
            value: detail.context.value
        }));
        
        throw new ValidationError('Validation failed', details);
    }
    
    // Update user
    users[userIndex] = { ...users[userIndex], ...value, updatedAt: new Date().toISOString() };
    
    res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: {
            user: {
                id: users[userIndex].id,
                name: users[userIndex].name,
                email: users[userIndex].email,
                age: users[userIndex].age,
                updatedAt: users[userIndex].updatedAt
            }
        }
    });
});

// Delete user (Admin only)
app.delete('/api/users/:id', requireAuth, requireAdmin, (req, res) => {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
        throw new AppError('User ID must be a valid number', 400, 'INVALID_USER_ID');
    }
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        throw new NotFoundError(`User with ID ${userId} not found`);
    }
    
    users.splice(userIndex, 1);
    
    res.status(200).json({
        status: 'success',
        message: 'User deleted successfully'
    });
});

// Error simulation routes for testing
app.get('/api/test/400', (req, res) => {
    throw new AppError('This is a simulated bad request error', 400, 'BAD_REQUEST_TEST');
});

app.get('/api/test/401', (req, res) => {
    throw new AuthenticationError('This is a simulated authentication error');
});

app.get('/api/test/403', (req, res) => {
    throw new AuthorizationError('This is a simulated authorization error');
});

app.get('/api/test/404', (req, res) => {
    throw new NotFoundError('This is a simulated not found error');
});

app.get('/api/test/422', (req, res) => {
    throw new ValidationError('This is a simulated validation error', [
        { field: 'email', message: 'Invalid email format', value: 'invalid-email' },
        { field: 'age', message: 'Age must be a number', value: 'not-a-number' }
    ]);
});

app.get('/api/test/500', (req, res) => {
    // Simulate server error
    throw new Error('This is a simulated internal server error');
});

// 404 handler for undefined routes
app.all('*', (req, res) => {
    throw new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`);
});

// Global error handling middleware
app.use((error, req, res, next) => {
    // Log the error
    logError(error, req);
    
    // Default error values
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';
    let errorCode = error.errorCode || 'INTERNAL_ERROR';
    
    // Handle different error types
    if (error.name === 'ValidationError' && error.details) {
        // Joi validation error or custom validation error
        return res.status(statusCode).json({
            status: 'error',
            error: {
                code: errorCode,
                message: message,
                details: error.details
            },
            timestamp: new Date().toISOString()
        });
    }
    
    if (error.name === 'SyntaxError' && error.status === 400 && 'body' in error) {
        // JSON parsing error
        return res.status(400).json({
            status: 'error',
            error: {
                code: 'INVALID_JSON',
                message: 'Invalid JSON format in request body'
            },
            timestamp: new Date().toISOString()
        });
    }
    
    // Generic error response
    const response = {
        status: 'error',
        error: {
            code: errorCode,
            message: statusCode === 500 ? 'Internal Server Error' : message
        },
        timestamp: new Date().toISOString()
    };
    
    // Add stack trace in development
    if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
        response.error.stack = error.stack;
    }
    
    res.status(statusCode).json(response);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Error Handling Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📝 Error logs will be saved to ./logs/error.log`);
});