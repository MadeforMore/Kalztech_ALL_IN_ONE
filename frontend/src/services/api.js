import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth APIs
export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const signup = async (userData) => {
  const { data } = await api.post('/auth/signup', userData);
  return data;
};

// Contact APIs
export const getContacts = async () => {
  const { data } = await api.get('/contacts');
  return data;
};

export const getContact = async (id) => {
  const { data } = await api.get(`/contacts/${id}`);
  return data;
};

export const createContact = async (contactData) => {
  const { data } = await api.post('/contacts', contactData);
  return data;
};

export const updateContact = async (id, contactData) => {
  const { data } = await api.put(`/contacts/${id}`, contactData);
  return data;
};

export const deleteContact = async (id) => {
  const { data } = await api.delete(`/contacts/${id}`);
  return data;
};

export default api;
