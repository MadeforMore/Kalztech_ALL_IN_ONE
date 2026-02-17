# Security Testing Guide

This guide helps you test the security features and identify vulnerabilities in the application.

## Setup for Testing

### 1. Install a REST Client
- **Postman** (Recommended): https://www.postman.com/downloads/
- **Thunder Client** (VS Code Extension)
- **curl** (Command line)

### 2. Start the Server
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm start
```

---

## Test Scenarios

### Test 1: Input Validation

#### Test Invalid Email Format
```bash
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "invalid-email",
  "password": "SecurePass123!"
}
```

**Expected:** 400 error with validation message

#### Test Weak Password
```bash
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123"
}
```

**Expected:** 400 error about password requirements

#### Test SQL Injection Attempt
```bash
POST http://localhost:5000/api/users/login
Content-Type: application/json

{
  "email": "admin@example.com' OR '1'='1",
  "password": "anything"
}
```

**Expected:** Should not bypass authentication

---

### Test 2: Duplicate User Prevention

#### Register First User
```bash
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Expected:** 201 success with user data and token

#### Try to Register with Same Email
```bash
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "john@example.com",
  "password": "AnotherPass123!"
}
```

**Expected:** 400 error - "User with this email already exists"

---

### Test 3: Authorization Control

#### Step 1: Register Two Users
```bash
# User 1
POST http://localhost:5000/api/users/register
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "AlicePass123!"
}

# User 2
POST http://localhost:5000/api/users/register
{
  "name": "Bob",
  "email": "bob@example.com",
  "password": "BobPass123!"
}
```

Save both tokens and user IDs from responses.

#### Step 2: Try to Access Another User's Data
```bash
GET http://localhost:5000/api/users/[BOB_USER_ID]
Authorization: Bearer [ALICE_TOKEN]
```

**Expected:** 403 Forbidden - "Not authorized to access this resource"

#### Step 3: Access Own Data
```bash
GET http://localhost:5000/api/users/[ALICE_USER_ID]
Authorization: Bearer [ALICE_TOKEN]
```

**Expected:** 200 success with user data

#### Step 4: Try to Delete Another User
```bash
DELETE http://localhost:5000/api/users/[BOB_USER_ID]
Authorization: Bearer [ALICE_TOKEN]
```

**Expected:** 403 Forbidden

---

### Test 4: Rate Limiting

#### Test Authentication Rate Limit
Run this request 6 times quickly:
```bash
POST http://localhost:5000/api/users/login
Content-Type: application/json

{
  "email": "wrong@example.com",
  "password": "wrongpassword"
}
```

**Expected:** After 5 failed attempts, should get rate limit error

#### Test Registration Rate Limit
Try to register 4 users from the same IP within an hour:
```bash
POST http://localhost:5000/api/users/register
# ... repeat with different emails
```

**Expected:** After 3 registrations, should get rate limit error

---

### Test 5: JWT Token Security

#### Test Expired Token
1. Get a token
2. Wait for it to expire (or modify JWT_EXPIRE in .env to 1s)
3. Try to access protected route

**Expected:** 401 Unauthorized - "Token is invalid or expired"

#### Test Invalid Token
```bash
GET http://localhost:5000/api/users/profile
Authorization: Bearer invalid_token_here
```

**Expected:** 401 Unauthorized

#### Test Missing Token
```bash
GET http://localhost:5000/api/users/profile
```

**Expected:** 401 Unauthorized - "Not authorized to access this route"

---

### Test 6: Password Security

#### Test Password Hashing
1. Register a user
2. Check the database directly
3. Verify password is hashed (not plain text)

```bash
# In MongoDB shell or Compass
db.users.findOne({ email: "test@example.com" })
```

**Expected:** Password field should be a bcrypt hash (starts with $2a$ or $2b$)

---

### Test 7: Data Exposure

#### Test Password in Response
```bash
POST http://localhost:5000/api/users/register
# or
GET http://localhost:5000/api/users/profile
```

**Expected:** Password should NOT be in the response

#### Test Error Messages
```bash
POST http://localhost:5000/api/users/login
Content-Type: application/json

{
  "email": "nonexistent@example.com",
  "password": "anything"
}
```

**Expected:** Generic error message, not revealing if user exists

---

## Common Vulnerabilities to Look For

### 1. Authentication Issues
- [ ] Weak password requirements
- [ ] No account lockout mechanism
- [ ] Tokens don't expire
- [ ] Password reset without verification

### 2. Authorization Issues
- [ ] Users can access other users' data
- [ ] Missing role checks
- [ ] Privilege escalation possible
- [ ] IDOR (Insecure Direct Object Reference)

### 3. Input Validation
- [ ] No input sanitization
- [ ] SQL/NoSQL injection possible
- [ ] XSS vulnerabilities
- [ ] Missing length limits

### 4. Data Exposure
- [ ] Passwords in responses
- [ ] Sensitive data in error messages
- [ ] Detailed stack traces in production
- [ ] User enumeration possible

### 5. Rate Limiting
- [ ] No rate limiting on auth endpoints
- [ ] Brute force attacks possible
- [ ] No protection against DoS

### 6. Session Management
- [ ] Tokens stored insecurely
- [ ] No token refresh mechanism
- [ ] Sessions don't expire
- [ ] No logout functionality

---

## Tools for Security Testing

### Automated Scanners
- **OWASP ZAP**: https://www.zaproxy.org/
- **Burp Suite**: https://portswigger.net/burp
- **npm audit**: `npm audit` (for dependency vulnerabilities)

### Manual Testing Tools
- **Postman**: API testing
- **curl**: Command-line testing
- **Browser DevTools**: Network inspection

---

## Reporting Format

When you find a vulnerability, document it with:

1. **Title**: Clear, descriptive name
2. **Severity**: Critical/High/Medium/Low
3. **Description**: What is the vulnerability?
4. **Location**: Where in the code?
5. **Impact**: What could happen?
6. **Steps to Reproduce**: How to trigger it?
7. **Fix**: How to resolve it?

---

## Additional Resources

- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [HackerOne Hacker101](https://www.hacker101.com/)
