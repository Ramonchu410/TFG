import apiClient from './client';

export const registerUser = (payload) => apiClient.post('/api/register', payload);

export const loginUser = (payload) => apiClient.post('/api/login', payload);

export const logoutUser = () => apiClient.post('/api/logout');

export const fetchCurrentUser = () => apiClient.get('/api/me');