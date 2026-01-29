# Contact API - Complete CRUD Operations

A robust Contact API built with Node.js and Express, featuring full CRUD operations (GET, POST, PUT, DELETE) with validation, search, pagination, and error handling.

## 🚀 Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete contacts
- ✅ **Data Validation** - Comprehensive input validation using Joi
- ✅ **Search & Filter** - Search contacts by name, email, phone, or company
- ✅ **Pagination** - Efficient data pagination for large contact lists
- ✅ **Sorting** - Sort contacts by any field in ascending/descending order
- ✅ **Error Handling** - Detailed error messages and proper HTTP status codes
- ✅ **CORS Support** - Ready for frontend integration
- ✅ **Duplicate Prevention** - Prevents duplicate email addresses
- ✅ **UUID Generation** - Unique identifiers for all contacts
- ✅ **Timestamps** - Automatic createdAt and updatedAt tracking

## 📋 API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API documentation and available endpoints |
| GET | `/health` | Health check with server status |
| GET | `/api/contacts` | Get all contacts (with search, pagination, sorting) |
| GET | `/api/contacts/:id` | Get a specific contact by ID |
| POST | `/api/contacts` | Create a new contact |
| PUT | `/api/contacts/:id` | Update an existing contact |
| DELETE | `/api/contacts/:id` | Delete a contact |

## 🏗️ Contact Data Structure

```json
{
  "id": "uuid-string",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0123",
  "address": "123 Main St, New York, NY 10001",
  "company": "Tech Corp",
  "notes": "Important client contact",
  "createdAt": "2026-01-29T10:30:45.123Z",
  "updatedAt": "2026-01-29T10:30:45.123Z"
}
```

### Required Fields
- `firstName` (string, 1-50 characters)
- `lastName` (string, 1-50 characters)
- `email` (valid email format, unique)
- `phone` (valid phone number format)

### Optional Fields
- `address` (string, max 200 characters)
- `company` (string, max 100 characters)
- `notes` (string, max 500 characters)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+ recommended)
- npm package manager

### Installation & Setup

1. **Navigate to project directory:**
```bash
cd backend-setup
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```bash
npm start
```

4. **For development with auto-restart:**
```bash
npm run dev
```

### Server Output
```
🚀 Contact API Server is running on http://localhost:3000
📊 Health check available at http://localhost:3000/health
📋 API Documentation at http://localhost:3000/
👥 Total contacts loaded: 2

📡 Available API Endpoints:
   GET    /api/contacts     - Get all contacts
   GET    /api/contacts/:id - Get contact by ID
   POST   /api/contacts     - Create new contact
   PUT    /api/contacts/:id - Update contact
   DELETE /api/contacts/:id - Delete contact
```

## 📖 API Usage Examples

### 1. GET All Contacts
```bash
curl http://localhost:3000/api/contacts
```

**With Query Parameters:**
```bash
# Search contacts
curl "http://localhost:3000/api/contacts?search=john"

# Pagination
curl "http://localhost:3000/api/contacts?page=1&limit=5"

# Sorting
curl "http://localhost:3000/api/contacts?sortBy=lastName&sortOrder=desc"

# Combined
curl "http://localhost:3000/api/contacts?search=tech&page=1&limit=10&sortBy=firstName&sortOrder=asc"
```

**Response:**
```json
{
  "success": true,
  "message": "Contacts retrieved successfully",
  "data": {
    "contacts": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalContacts": 2,
      "hasNext": false,
      "hasPrev": false
    }
  }
}
```

### 2. GET Contact by ID
```bash
curl http://localhost:3000/api/contacts/CONTACT_ID
```

**Response:**
```json
{
  "success": true,
  "message": "Contact retrieved successfully",
  "data": {
    "contact": {
      "id": "uuid-string",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1-555-0123",
      "address": "123 Main St, New York, NY 10001",
      "company": "Tech Corp",
      "notes": "Important client contact",
      "createdAt": "2026-01-29T10:30:45.123Z",
      "updatedAt": "2026-01-29T10:30:45.123Z"
    }
  }
}
```

### 3. CREATE New Contact
```bash
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+1-555-0789",
    "address": "789 Pine St, Chicago, IL 60601",
    "company": "Marketing Pro",
    "notes": "New business partner"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "contact": {
      "id": "new-uuid-string",
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice.johnson@example.com",
      "phone": "+1-555-0789",
      "address": "789 Pine St, Chicago, IL 60601",
      "company": "Marketing Pro",
      "notes": "New business partner",
      "createdAt": "2026-01-29T10:35:22.456Z",
      "updatedAt": "2026-01-29T10:35:22.456Z"
    }
  }
}
```

### 4. UPDATE Contact
```bash
curl -X PUT http://localhost:3000/api/contacts/CONTACT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson-Smith",
    "email": "alice.johnson@example.com",
    "phone": "+1-555-0789",
    "address": "789 Pine St, Chicago, IL 60601",
    "company": "Marketing Pro LLC",
    "notes": "Updated company name"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Contact updated successfully",
  "data": {
    "contact": {
      "id": "uuid-string",
      "firstName": "Alice",
      "lastName": "Johnson-Smith",
      "email": "alice.johnson@example.com",
      "phone": "+1-555-0789",
      "address": "789 Pine St, Chicago, IL 60601",
      "company": "Marketing Pro LLC",
      "notes": "Updated company name",
      "createdAt": "2026-01-29T10:35:22.456Z",
      "updatedAt": "2026-01-29T10:40:15.789Z"
    }
  }
}
```

### 5. DELETE Contact
```bash
curl -X DELETE http://localhost:3000/api/contacts/CONTACT_ID
```

**Response:**
```json
{
  "success": true,
  "message": "Contact deleted successfully",
  "data": {
    "deletedContact": {
      "id": "uuid-string",
      "firstName": "Alice",
      "lastName": "Johnson-Smith",
      "email": "alice.johnson@example.com",
      "phone": "+1-555-0789",
      "address": "789 Pine St, Chicago, IL 60601",
      "company": "Marketing Pro LLC",
      "notes": "Updated company name",
      "createdAt": "2026-01-29T10:35:22.456Z",
      "updatedAt": "2026-01-29T10:40:15.789Z"
    },
    "remainingContacts": 2
  }
}
```

## ❌ Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Contact not found",
  "error": "No contact exists with ID: invalid-id"
}
```

### Duplicate Email (409)
```json
{
  "success": false,
  "message": "Contact creation failed",
  "error": "A contact with this email already exists"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Something went wrong"
}
```

## 🔧 Query Parameters

### GET /api/contacts

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Search in firstName, lastName, email, phone, company | `?search=john` |
| `page` | number | Page number for pagination (default: 1) | `?page=2` |
| `limit` | number | Number of contacts per page (default: 10) | `?limit=5` |
| `sortBy` | string | Field to sort by (default: firstName) | `?sortBy=lastName` |
| `sortOrder` | string | Sort order: 'asc' or 'desc' (default: asc) | `?sortOrder=desc` |

## 🛡️ Data Validation Rules

- **firstName**: Required, 1-50 characters
- **lastName**: Required, 1-50 characters
- **email**: Required, valid email format, unique across all contacts
- **phone**: Required, valid phone number format (supports international)
- **address**: Optional, max 200 characters
- **company**: Optional, max 100 characters
- **notes**: Optional, max 500 characters

## 🔄 Response Format

All API responses follow a consistent format:

```json
{
  "success": boolean,
  "message": "string",
  "data": object,     // Present on success
  "error": string,    // Present on error
  "errors": array     // Present on validation errors
}
```

## 🧪 Testing the API

### Using curl (Command Line)
See the examples above for complete curl commands.

### Using Postman
1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:3000`
3. Use the provided JSON examples for request bodies

### Using Browser (GET requests only)
- Visit `http://localhost:3000/` for API documentation
- Visit `http://localhost:3000/health` for health check
- Visit `http://localhost:3000/api/contacts` to see all contacts

## 📊 Sample Data

The API comes pre-loaded with 2 sample contacts for testing:

1. **John Doe** - Tech Corp contact
2. **Jane Smith** - Design Studio contact

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

### Setting Custom Port
```bash
PORT=8080 npm start
```

## 🏗️ Architecture

- **Express.js**: Web framework
- **UUID**: Unique identifier generation
- **Joi**: Data validation
- **In-Memory Storage**: Contact data (replace with database in production)
- **CORS**: Cross-origin resource sharing support
- **Error Handling**: Comprehensive error management

## 🚀 Production Considerations

For production deployment, consider:

1. **Database Integration**: Replace in-memory storage with MongoDB, PostgreSQL, etc.
2. **Authentication**: Add JWT or OAuth authentication
3. **Rate Limiting**: Implement API rate limiting
4. **Logging**: Add structured logging (Winston, Morgan)
5. **Environment Config**: Use dotenv for environment variables
6. **Input Sanitization**: Add additional security measures
7. **API Documentation**: Consider Swagger/OpenAPI documentation
8. **Testing**: Add unit and integration tests

## 📝 License

MIT License - Feel free to use this code for your projects!

---

**🎉 Your Contact API is ready to use! Start making requests and building amazing applications!**