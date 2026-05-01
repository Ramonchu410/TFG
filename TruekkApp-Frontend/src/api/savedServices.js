import apiClient from './client';

export const getSavedServices = () => apiClient.get('/api/saved-services');

export const checkSavedService = (serviceId) =>
  apiClient.get(`/api/services/${serviceId}/saved`);

export const saveService = (serviceId) =>
  apiClient.post(`/api/services/${serviceId}/save`);

export const unsaveService = (serviceId) =>
  apiClient.delete(`/api/services/${serviceId}/save`);