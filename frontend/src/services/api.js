import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

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

// Post APIs
export const getPosts = async (params) => {
  const { data } = await api.get('/posts', { params });
  return data;
};

export const getPost = async (id) => {
  const { data } = await api.get(`/posts/${id}`);
  return data;
};

export const getMyPosts = async () => {
  const { data } = await api.get('/posts/my-posts');
  return data;
};

export const createPost = async (postData) => {
  const { data } = await api.post('/posts', postData);
  return data;
};

export const updatePost = async (id, postData) => {
  const { data } = await api.put(`/posts/${id}`, postData);
  return data;
};

export const deletePost = async (id) => {
  const { data } = await api.delete(`/posts/${id}`);
  return data;
};

// Comment APIs
export const getComments = async (postId) => {
  const { data } = await api.get(`/comments/${postId}`);
  return data;
};

export const createComment = async (postId, content) => {
  const { data } = await api.post(`/comments/${postId}`, { content });
  return data;
};

export const deleteComment = async (id) => {
  const { data } = await api.delete(`/comments/${id}`);
  return data;
};

export default api;
