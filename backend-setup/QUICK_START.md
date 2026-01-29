# 🚀 Contact API - Quick Start Guide

## ⚡ Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd backend-setup
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Test the API
Open your browser and go to:
- **API Documentation**: http://localhost:3000/
- **Health Check**: http://localhost:3000/health
- **Test Frontend**: Open `test-frontend.html` in your browser

## 🎯 What You Get

✅ **Complete CRUD API** with all 4 operations:
- **GET** `/api/contacts` - Get all contacts (with search, pagination, sorting)
- **GET** `/api/contacts/:id` - Get specific contact
- **POST** `/api/contacts` - Create new contact
- **PUT** `/api/contacts/:id` - Update contact
- **DELETE** `/api/contacts/:id` - Delete contact

✅ **Advanced Features**:
- Data validation with detailed error messages
- Search functionality across all fields
- Pagination for large datasets
- Sorting by any field (ascending/descending)
- Duplicate email prevention
- CORS support for frontend integration
- Comprehensive error handling

✅ **Testing Tools**:
- Interactive HTML frontend (`test-frontend.html`)
- Complete curl examples (`api-test-examples.md`)
- Pre-loaded sample data (2 contacts)

## 📱 Quick Test Commands

```bash
# Get all contacts
curl http://localhost:3000/api/contacts

# Create a new contact
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "phone": "+1-555-0123",
    "company": "Tech Corp"
  }'

# Search contacts
curl "http://localhost:3000/api/contacts?search=john"

# Get with pagination
curl "http://localhost:3000/api/contacts?page=1&limit=5"
```

## 🌐 Frontend Testing

1. Start the server: `npm start`
2. Open `test-frontend.html` in your browser
3. Use the interactive interface to test all API endpoints

## 📋 Contact Data Structure

**Required Fields:**
- `firstName` (1-50 characters)
- `lastName` (1-50 characters)  
- `email` (valid email, unique)
- `phone` (7-20 characters, supports international formats)

**Optional Fields:**
- `address` (max 200 characters)
- `company` (max 100 characters)
- `notes` (max 500 characters)

## 🔧 Server Output

When you run `npm start`, you'll see:
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

## 📚 Documentation Files

- `README.md` - Complete API documentation
- `api-test-examples.md` - Detailed testing examples
- `test-frontend.html` - Interactive testing interface
- `QUICK_START.md` - This file

## 🎉 You're Ready!

Your Contact API is now running with full CRUD operations, validation, search, pagination, and more. Start building amazing applications!

**Need help?** Check the complete documentation in `README.md` or use the interactive frontend in `test-frontend.html`.