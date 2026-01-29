const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for frontend integration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// In-memory storage for contacts (in production, use a database)
let contacts = [
    {
        id: uuidv4(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0123',
        address: '123 Main St, New York, NY 10001',
        company: 'Tech Corp',
        notes: 'Important client contact',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1-555-0456',
        address: '456 Oak Ave, Los Angeles, CA 90210',
        company: 'Design Studio',
        notes: 'Creative director',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// Validation schema for contact
const contactSchema = Joi.object({
    firstName: Joi.string().min(1).max(50).required().messages({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 1 character',
        'string.max': 'First name cannot exceed 50 characters'
    }),
    lastName: Joi.string().min(1).max(50).required().messages({
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 1 character',
        'string.max': 'Last name cannot exceed 50 characters'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required'
    }),
    phone: Joi.string().pattern(/^[\+]?[\d\-\s\(\)]{7,20}$/).required().messages({
        'string.pattern.base': 'Please provide a valid phone number (7-20 characters, can include +, -, spaces, parentheses)',
        'string.empty': 'Phone number is required'
    }),
    address: Joi.string().max(200).optional().allow(''),
    company: Joi.string().max(100).optional().allow(''),
    notes: Joi.string().max(500).optional().allow('')
});

// Utility functions
const findContactById = (id) => contacts.find(contact => contact.id === id);
const findContactByEmail = (email, excludeId = null) => 
    contacts.find(contact => contact.email.toLowerCase() === email.toLowerCase() && contact.id !== excludeId);

// Error handling middleware
const handleValidationError = (error, res) => {
    const errors = error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
    }));
    
    return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
    });
};

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Contact API Server is running!',
        version: '1.0.0',
        endpoints: {
            health: 'GET /health',
            contacts: {
                getAll: 'GET /api/contacts',
                getById: 'GET /api/contacts/:id',
                create: 'POST /api/contacts',
                update: 'PUT /api/contacts/:id',
                delete: 'DELETE /api/contacts/:id'
            }
        },
        documentation: 'See README.md for detailed API documentation'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        message: 'Contact API Server is healthy',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        totalContacts: contacts.length
    });
});

// ==================== CONTACT API ROUTES ====================

// GET /api/contacts - Get all contacts with optional filtering and pagination
app.get('/api/contacts', (req, res) => {
    try {
        const { search, page = 1, limit = 10, sortBy = 'firstName', sortOrder = 'asc' } = req.query;
        
        let filteredContacts = [...contacts];
        
        // Search functionality
        if (search) {
            const searchTerm = search.toLowerCase();
            filteredContacts = filteredContacts.filter(contact =>
                contact.firstName.toLowerCase().includes(searchTerm) ||
                contact.lastName.toLowerCase().includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm) ||
                contact.phone.includes(searchTerm) ||
                (contact.company && contact.company.toLowerCase().includes(searchTerm))
            );
        }
        
        // Sorting
        filteredContacts.sort((a, b) => {
            const aValue = a[sortBy] || '';
            const bValue = b[sortBy] || '';
            
            if (sortOrder === 'desc') {
                return bValue.localeCompare(aValue);
            }
            return aValue.localeCompare(bValue);
        });
        
        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedContacts = filteredContacts.slice(startIndex, endIndex);
        
        res.json({
            success: true,
            message: 'Contacts retrieved successfully',
            data: {
                contacts: paginatedContacts,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(filteredContacts.length / limit),
                    totalContacts: filteredContacts.length,
                    hasNext: endIndex < filteredContacts.length,
                    hasPrev: startIndex > 0
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve contacts',
            error: error.message
        });
    }
});

// GET /api/contacts/:id - Get a specific contact by ID
app.get('/api/contacts/:id', (req, res) => {
    try {
        const { id } = req.params;
        const contact = findContactById(id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
                error: `No contact exists with ID: ${id}`
            });
        }
        
        res.json({
            success: true,
            message: 'Contact retrieved successfully',
            data: { contact }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve contact',
            error: error.message
        });
    }
});

// POST /api/contacts - Create a new contact
app.post('/api/contacts', (req, res) => {
    try {
        // Validate request body
        const { error, value } = contactSchema.validate(req.body);
        if (error) {
            return handleValidationError(error, res);
        }
        
        // Check for duplicate email
        if (findContactByEmail(value.email)) {
            return res.status(409).json({
                success: false,
                message: 'Contact creation failed',
                error: 'A contact with this email already exists'
            });
        }
        
        // Create new contact
        const newContact = {
            id: uuidv4(),
            ...value,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        contacts.push(newContact);
        
        res.status(201).json({
            success: true,
            message: 'Contact created successfully',
            data: { contact: newContact }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create contact',
            error: error.message
        });
    }
});

// PUT /api/contacts/:id - Update an existing contact
app.put('/api/contacts/:id', (req, res) => {
    try {
        const { id } = req.params;
        const contactIndex = contacts.findIndex(contact => contact.id === id);
        
        if (contactIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Contact update failed',
                error: `No contact exists with ID: ${id}`
            });
        }
        
        // Validate request body
        const { error, value } = contactSchema.validate(req.body);
        if (error) {
            return handleValidationError(error, res);
        }
        
        // Check for duplicate email (excluding current contact)
        if (findContactByEmail(value.email, id)) {
            return res.status(409).json({
                success: false,
                message: 'Contact update failed',
                error: 'Another contact with this email already exists'
            });
        }
        
        // Update contact
        const updatedContact = {
            ...contacts[contactIndex],
            ...value,
            updatedAt: new Date().toISOString()
        };
        
        contacts[contactIndex] = updatedContact;
        
        res.json({
            success: true,
            message: 'Contact updated successfully',
            data: { contact: updatedContact }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update contact',
            error: error.message
        });
    }
});

// DELETE /api/contacts/:id - Delete a contact
app.delete('/api/contacts/:id', (req, res) => {
    try {
        const { id } = req.params;
        const contactIndex = contacts.findIndex(contact => contact.id === id);
        
        if (contactIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Contact deletion failed',
                error: `No contact exists with ID: ${id}`
            });
        }
        
        const deletedContact = contacts[contactIndex];
        contacts.splice(contactIndex, 1);
        
        res.json({
            success: true,
            message: 'Contact deleted successfully',
            data: { 
                deletedContact,
                remainingContacts: contacts.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact',
            error: error.message
        });
    }
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        error: `The requested endpoint ${req.method} ${req.originalUrl} does not exist`,
        availableEndpoints: {
            root: 'GET /',
            health: 'GET /health',
            contacts: {
                getAll: 'GET /api/contacts',
                getById: 'GET /api/contacts/:id',
                create: 'POST /api/contacts',
                update: 'PUT /api/contacts/:id',
                delete: 'DELETE /api/contacts/:id'
            }
        }
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Contact API Server is running on http://localhost:${PORT}`);
    console.log(`📊 Health check available at http://localhost:${PORT}/health`);
    console.log(`📋 API Documentation at http://localhost:${PORT}/`);
    console.log(`👥 Total contacts loaded: ${contacts.length}`);
    console.log('\n📡 Available API Endpoints:');
    console.log('   GET    /api/contacts     - Get all contacts');
    console.log('   GET    /api/contacts/:id - Get contact by ID');
    console.log('   POST   /api/contacts     - Create new contact');
    console.log('   PUT    /api/contacts/:id - Update contact');
    console.log('   DELETE /api/contacts/:id - Delete contact');
});

module.exports = app;