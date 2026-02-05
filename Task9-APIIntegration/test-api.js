// Simple API test script
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');

    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health check:', healthResponse.data);

    // Test get users (should be empty initially)
    console.log('\n2. Testing get users...');
    const usersResponse = await axios.get(`${API_BASE}/users`);
    console.log('✅ Get users:', usersResponse.data);

    // Test create user
    console.log('\n3. Testing create user...');
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
      phone: '+1-555-0123',
      profession: 'Software Developer',
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA',
        zipCode: '10001'
      },
      interests: ['Programming', 'Reading', 'Gaming']
    };

    const createResponse = await axios.post(`${API_BASE}/users`, newUser);
    console.log('✅ Create user:', createResponse.data);

    const userId = createResponse.data.data._id;

    // Test get users again (should have one user)
    console.log('\n4. Testing get users after creation...');
    const usersResponse2 = await axios.get(`${API_BASE}/users`);
    console.log('✅ Get users (after creation):', usersResponse2.data);

    // Test update user
    console.log('\n5. Testing update user...');
    const updateData = {
      name: 'John Smith',
      age: 31,
      profession: 'Senior Software Developer'
    };

    const updateResponse = await axios.put(`${API_BASE}/users/${userId}`, updateData);
    console.log('✅ Update user:', updateResponse.data);

    // Test get single user
    console.log('\n6. Testing get single user...');
    const singleUserResponse = await axios.get(`${API_BASE}/users/${userId}`);
    console.log('✅ Get single user:', singleUserResponse.data);

    console.log('\n🎉 All API tests passed successfully!');
    console.log('\n📝 Summary:');
    console.log('- Health check: ✅');
    console.log('- Get users: ✅');
    console.log('- Create user: ✅');
    console.log('- Update user: ✅');
    console.log('- Get single user: ✅');
    console.log('\n🌐 Frontend is running at: http://localhost:3000');
    console.log('🔧 Backend is running at: http://localhost:5000');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

testAPI();