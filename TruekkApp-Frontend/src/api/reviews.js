    import apiClient from './client';

export const createReview = (payload) =>
  apiClient.post('/api/reviews', payload);

export const getUserReviews = (userId) =>
  apiClient.get(`/api/users/${userId}/reviews`);