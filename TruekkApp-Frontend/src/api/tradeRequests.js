import apiClient from './client';

export const createTradeRequest = (payload) => apiClient.post('/api/trade-requests', payload);
export const getTradeRequests = () => apiClient.get('/api/trade-requests');
export const acceptTradeRequest = (id) => apiClient.patch(`/api/trade-requests/${id}/accept`);
export const rejectTradeRequest = (id) => apiClient.patch(`/api/trade-requests/${id}/reject`);
export const cancelTradeRequest = (id) => apiClient.patch(`/api/trade-requests/${id}/cancel`);
export const completeTradeRequest = (id) => apiClient.patch(`/api/trade-requests/${id}/complete`);
