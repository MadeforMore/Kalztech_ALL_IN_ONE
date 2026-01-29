# Contact API - Test Examples & Usage Guide

This file contains practical examples for testing all Contact API endpoints using curl commands and expected responses.

## 🚀 Quick Test Commands

### 1. Start the Server
```bash
cd backend-setup
npm install
npm start
```

### 2. Basic Health Check
```bash
curl http://localhost:3000/health
```

## 📋 Complete API Testing Guide

### GET All Contacts
```bash
# Get all contacts (default pagination)
curl http://localhost:3000/api/contacts

# Search for contacts containing "john"
curl "http://localhost:3000/api/contacts?search=john"

# Get page 1 with 5 contacts per page
curl "http://localhost:3000/api/contacts?page=1&limit=5"

# Sort by lastName in descending order
curl "http://localhost:3000/api/contacts?sortBy=lastName&sortOrder=desc"

# Combined: search + pagination + sorting
curl "http://localhost:3000/api/contacts?search=tech&page=1&limit=10&sortBy=firstName&sortOrder=asc"
```

### GET Contact by ID
```bash
# First, get all contacts to find an ID
curl http://localhost:3000/api/contacts

# Then use a specific ID (replace with actual ID from above response)
curl http://localhost:3000/api/contacts/REPLACE_WITH_ACTUAL_ID
```

### CREATE New Contact
```bash
# Create a new contact with all fields
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

# Create a contact with only required fields
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Bob",
    "lastName": "Wilson",
    "email": "bob.wilson@example.com",
    "phone": "+1-555-0999"
  }'

# Create contact with international phone
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Maria",
    "lastName": "Garcia",
    "email": "maria.garcia@example.com",
    "phone": "+34-123-456-789",
    "address": "Calle Mayor 123, Madrid, Spain",
    "company": "Global Solutions"
  }'
```

### UPDATE Contact
```bash
# First create a contact, then update it using the returned ID
# Step 1: Create
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test.user@example.com",
    "phone": "+1-555-1234"
  }'

# Step 2: Update (replace CONTACT_ID with actual ID from create response)
curl -X PUT http://localhost:3000/api/contacts/CONTACT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test Updated",
    "lastName": "User Updated",
    "email": "test.user.updated@example.com",
    "phone": "+1-555-1234",
    "address": "123 Updated St",
    "company": "Updated Company",
    "notes": "This contact has been updated"
  }'
```

### DELETE Contact
```bash
# Delete a contact (replace CONTACT_ID with actual ID)
curl -X DELETE http://localhost:3000/api/contacts/CONTACT_ID
```

## 🧪 Error Testing Examples

### Test Validation Errors
```bash
# Missing required fields
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John"
  }'

# Invalid email format
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "invalid-email",
    "phone": "+1-555-0123"
  }'

# Invalid phone format
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "invalid-phone"
  }'

# Field too long
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "ThisIsAVeryLongFirstNameThatExceedsTheFiftyCharacterLimit",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1-555-0123"
  }'
```

### Test Duplicate Email
```bash
# Try to create a contact with existing email
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Duplicate",
    "lastName": "User",
    "email": "john.doe@example.com",
    "phone": "+1-555-9999"
  }'
```

### Test Not Found Errors
```bash
# Try to get non-existent contact
curl http://localhost:3000/api/contacts/non-existent-id

# Try to update non-existent contact
curl -X PUT http://localhost:3000/api/contacts/non-existent-id \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+1-555-0123"
  }'

# Try to delete non-existent contact
curl -X DELETE http://localhost:3000/api/contacts/non-existent-id
```

### Test Invalid Routes
```bash
# Test non-existent endpoint
curl http://localhost:3000/api/invalid-endpoint

# Test wrong HTTP method
curl -X PATCH http://localhost:3000/api/contacts
```

## 📊 Expected Response Examples

### Successful Contact Creation
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "contact": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
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

### Validation Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "phone",
      "message": "Please provide a valid phone number"
    }
  ]
}
```

### Paginated Contacts Response
```json
{
  "success": true,
  "message": "Contacts retrieved successfully",
  "data": {
    "contacts": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
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
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalContacts": 3,
      "hasNext": false,
      "hasPrev": false
    }
  }
}
```

## 🔄 Complete Test Workflow

Here's a complete workflow to test all functionality:

```bash
# 1. Check server health
curl http://localhost:3000/health

# 2. Get initial contacts
curl http://localhost:3000/api/contacts

# 3. Create a new contact
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "Contact",
    "email": "test.contact@example.com",
    "phone": "+1-555-TEST",
    "company": "Test Company"
  }'

# 4. Get all contacts again (should show new contact)
curl http://localhost:3000/api/contacts

# 5. Get the specific contact by ID (use ID from step 3 response)
curl http://localhost:3000/api/contacts/CONTACT_ID_FROM_STEP_3

# 6. Update the contact
curl -X PUT http://localhost:3000/api/contacts/CONTACT_ID_FROM_STEP_3 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Updated Test",
    "lastName": "Updated Contact",
    "email": "updated.test.contact@example.com",
    "phone": "+1-555-UPDATED",
    "company": "Updated Test Company",
    "notes": "This contact has been updated"
  }'

# 7. Search for the updated contact
curl "http://localhost:3000/api/contacts?search=updated"

# 8. Delete the contact
curl -X DELETE http://localhost:3000/api/contacts/CONTACT_ID_FROM_STEP_3

# 9. Verify deletion (should return 404)
curl http://localhost:3000/api/contacts/CONTACT_ID_FROM_STEP_3
```

## 🛠️ PowerShell Examples (Windows)

If you're using PowerShell on Windows, use these commands instead:

```powershell
# GET request
Invoke-RestMethod -Uri "http://localhost:3000/api/contacts" -Method Get

# POST request
$body = @{
    firstName = "Alice"
    lastName = "Johnson"
    email = "alice.johnson@example.com"
    phone = "+1-555-0789"
    company = "Marketing Pro"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/contacts" -Method Post -Body $body -ContentType "application/json"

# PUT request
$updateBody = @{
    firstName = "Alice Updated"
    lastName = "Johnson Updated"
    email = "alice.updated@example.com"
    phone = "+1-555-0789"
    company = "Marketing Pro Updated"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/contacts/CONTACT_ID" -Method Put -Body $updateBody -ContentType "application/json"

# DELETE request
Invoke-RestMethod -Uri "http://localhost:3000/api/contacts/CONTACT_ID" -Method Delete
```

## 📱 Frontend Integration Examples

### JavaScript Fetch API
```javascript
// GET all contacts
fetch('http://localhost:3000/api/contacts')
  .then(response => response.json())
  .then(data => console.log(data));

// CREATE new contact
fetch('http://localhost:3000/api/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    phone: '+1-555-0789'
  })
})
.then(response => response.json())
.then(data => console.log(data));

// UPDATE contact
fetch('http://localhost:3000/api/contacts/CONTACT_ID', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'Alice Updated',
    lastName: 'Johnson Updated',
    email: 'alice.updated@example.com',
    phone: '+1-555-0789'
  })
})
.then(response => response.json())
.then(data => console.log(data));

// DELETE contact
fetch('http://localhost:3000/api/contacts/CONTACT_ID', {
  method: 'DELETE'
})
.then(response => response.json())
.then(data => console.log(data));
```

---

**🎉 Use these examples to thoroughly test your Contact API and ensure all functionality works correctly!**