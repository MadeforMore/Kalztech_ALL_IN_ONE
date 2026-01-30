// Error Handling Test Suite
const http = require('http');

const BASE_URL = 'http://localhost:3000/api';

// Test helper function
async function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const requestOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.pathname,
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        const req = http.request(requestOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve({ statusCode: res.statusCode, data: jsonData });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, data: data });
                }
            });
        });

        req.on('error', reject);
        
        if (options.body) {
            req.write(options.body);
        }
        
        req.end();
    });
}

// Test cases
async function runTests() {
    console.log('🧪 Starting Error Handling Tests...\n');

    const tests = [
        {
            name: '✅ Health Check (200)',
            url: `${BASE_URL}/health`,
            expectedStatus: 200
        },
        {
            name: '❌ Bad Request (400)',
            url: `${BASE_URL}/test/400`,
            expectedStatus: 400
        },
        {
            name: '🔒 Unauthorized (401)',
            url: `${BASE_URL}/test/401`,
            expectedStatus: 401
        },
        {
            name: '🚫 Forbidden (403)',
            url: `${BASE_URL}/test/403`,
            expectedStatus: 403
        },
        {
            name: '🔍 Not Found (404)',
            url: `${BASE_URL}/test/404`,
            expectedStatus: 404
        },
        {
            name: '📝 Validation Error (422)',
            url: `${BASE_URL}/test/422`,
            expectedStatus: 422
        },
        {
            name: '💥 Server Error (500)',
            url: `${BASE_URL}/test/500`,
            expectedStatus: 500
        },
        {
            name: '👤 Invalid User ID',
            url: `${BASE_URL}/users/invalid-id`,
            expectedStatus: 400
        },
        {
            name: '👻 Non-existent User',
            url: `${BASE_URL}/users/999`,
            expectedStatus: 404
        },
        {
            name: '📋 Create User - Invalid Data',
            url: `${BASE_URL}/users`,
            method: 'POST',
            body: JSON.stringify({
                name: 'A', // Too short
                email: 'invalid-email', // Invalid format
                age: 5, // Too young
                password: '123' // Too weak
            }),
            expectedStatus: 422
        },
        {
            name: '✨ Create User - Valid Data',
            url: `${BASE_URL}/users`,
            method: 'POST',
            body: JSON.stringify({
                name: 'John Doe',
                email: 'john@example.com',
                age: 25,
                password: 'SecurePass123'
            }),
            expectedStatus: 201
        },
        {
            name: '🔐 Update User - No Auth',
            url: `${BASE_URL}/users/1`,
            method: 'PUT',
            body: JSON.stringify({ name: 'Updated Name' }),
            expectedStatus: 401
        }
    ];

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
        try {
            const result = await makeRequest(test.url, {
                method: test.method,
                body: test.body,
                headers: test.headers
            });

            const success = result.statusCode === test.expectedStatus;
            
            if (success) {
                console.log(`✅ ${test.name}`);
                console.log(`   Status: ${result.statusCode} (Expected: ${test.expectedStatus})`);
                passed++;
            } else {
                console.log(`❌ ${test.name}`);
                console.log(`   Status: ${result.statusCode} (Expected: ${test.expectedStatus})`);
                failed++;
            }

            if (result.data.error) {
                console.log(`   Error: ${result.data.error.message}`);
            }
            
            console.log('');
        } catch (error) {
            console.log(`💥 ${test.name} - Network Error`);
            console.log(`   ${error.message}\n`);
            failed++;
        }
    }

    console.log('📊 Test Results:');
    console.log(`   ✅ Passed: ${passed}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
}

// Run tests if server is running
console.log('🚀 Make sure the server is running on http://localhost:3000');
console.log('   Run: npm start\n');

setTimeout(runTests, 2000);