import apiClient from './client';

// Operaciones de administración de usuarios y perfil público.
export const getAdminUsers = () => apiClient.get('/api/admin/users');

export const verifyUser = (id) => apiClient.patch(`/api/admin/users/${id}/verify`);

export const blockUser = (id) => apiClient.patch(`/api/admin/users/${id}/block`);

export const getPublicUserProfile = (id) => apiClient.get(`/api/users/${id}`);



export const updateMyAvatar = (file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  return apiClient.post('/api/me/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};  