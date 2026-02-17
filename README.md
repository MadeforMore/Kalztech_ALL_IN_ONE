# Task 12: Security Audit Task

## Overview
This task focuses on implementing and understanding application security best practices in a Node.js/Express backend with user management.

## Requirements

### Core Security Features
1. **Input Validation**: Validate all request bodies (manual or library-based)
2. **Duplicate Prevention**: Prevent duplicate user registration
3. **Authorization Control**: Ensure users cannot access other users' data
4. **Rate Limiting** (Optional): Implement rate limiting to prevent abuse

### Deliverable
Submit a 1-page document (`SECURITY_AUDIT.md`) identifying at least 3 potential security flaws in the project.

## Evaluation Focus
- Security awareness
- Input validation techniques
- Authorization control implementation
- Practical understanding of backend security risks

## Project Structure
```
Task12-SecurityAudit/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── middleware/
│   │   ├── validation.js
│   │   ├── auth.js
│   │   └── rateLimiter.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── SECURITY_AUDIT.md (Your submission)
└── README.md
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd Task12-SecurityAudit/backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### 3. Start the Server
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### User Management (Protected)
- `GET /api/users/profile` - Get own profile
- `PUT /api/users/profile` - Update own profile
- `GET /api/users/:id` - Get user by ID (should be protected)
- `DELETE /api/users/:id` - Delete user (should be protected)

## Security Features Implemented

### 1. Input Validation
- Email format validation
- Password strength requirements
- Request body sanitization
- Type checking

### 2. Duplicate Prevention
- Unique email constraint in database
- Pre-registration email check
- Proper error handling

### 3. Authorization Control
- JWT-based authentication
- User-specific data access
- Protected routes middleware

### 4. Rate Limiting (Optional)
- Request rate limiting per IP
- Configurable time windows
- Brute force protection

## Testing the Security Features

### Test Duplicate Registration
```bash
# Register first user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"SecurePass123!"}'

# Try to register again with same email
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"john@example.com","password":"AnotherPass123!"}'
```

### Test Authorization
```bash
# Login as user 1
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@example.com","password":"password123"}'

# Try to access user 2's data with user 1's token
curl -X GET http://localhost:5000/api/users/USER2_ID \
  -H "Authorization: Bearer USER1_TOKEN"
```

### Test Input Validation
```bash
# Invalid email format
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"invalid-email","password":"pass"}'

# Weak password
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"123"}'
```

## Your Task: Security Audit

Create `SECURITY_AUDIT.md` and identify at least 3 security flaws. Consider:

1. **Authentication vulnerabilities**
   - Weak password policies?
   - Token expiration issues?
   - Session management problems?

2. **Authorization issues**
   - Can users access other users' data?
   - Are admin routes properly protected?
   - Privilege escalation possibilities?

3. **Input validation gaps**
   - SQL/NoSQL injection risks?
   - XSS vulnerabilities?
   - Missing sanitization?

4. **Data exposure**
   - Sensitive data in responses?
   - Error messages revealing too much?
   - Logging sensitive information?

5. **Rate limiting & DoS**
   - Brute force attack protection?
   - Resource exhaustion risks?
   - API abuse prevention?

## Bonus Challenges
- Implement HTTPS in production
- Add CORS configuration
- Implement refresh tokens
- Add account lockout after failed attempts
- Implement password reset functionality
- Add audit logging for sensitive operations

## Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
