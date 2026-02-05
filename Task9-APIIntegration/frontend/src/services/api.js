import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    
    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check if the backend server is running on port 5000.';
    }
    
    return Promise.reject(error);
  }
);

// API functions
export const getUsers = () => {
  return api.get('/users');
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

export const createUser = (userData) => {
  return api.post('/users', userData);
};

export const updateUser = (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export const healthCheck = () => {
  return api.get('/health');
};

export default api;