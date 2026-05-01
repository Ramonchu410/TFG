import apiClient from './client';

export const getTradeMessages = (tradeRequestId) =>
  apiClient.get(`/api/trade-requests/${tradeRequestId}/messages`);

export const sendTradeMessage = (tradeRequestId, payload) =>
  apiClient.post(`/api/trade-requests/${tradeRequestId}/messages`, payload);