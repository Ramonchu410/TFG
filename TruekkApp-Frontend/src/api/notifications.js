import apiClient from './client';

export const getNotifications = () => apiClient.get('/api/notifications');

export const markNotificationAsRead = (id) =>
  apiClient.patch(`/api/notifications/${id}/read`);

export const markAllNotificationsAsRead = () =>
  apiClient.patch('/api/notifications/read-all');