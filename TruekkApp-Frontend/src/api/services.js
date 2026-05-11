import apiClient from "./client";

export const getPublicServices = (params = {}) =>
  apiClient.get("/api/services", { params });

export const getServiceById = (id) => apiClient.get(`/api/services/${id}`);
// Endpoints clave del flujo de creación/edición y moderación de servicios.
export const createService = (payload) =>
  apiClient.post("/api/services", payload);
export const updateService = (id, payload) =>
  apiClient.put(`/api/services/${id}`, payload);
export const deleteService = (id) => apiClient.delete(`/api/services/${id}`);

export const getMyServices = () => apiClient.get("/api/my-services");

export const getAdminServices = () => apiClient.get("/api/admin/services");
export const getPendingAdminServices = () =>
  apiClient.get("/api/admin/services/pending");

export const approveService = (id) =>
  apiClient.patch(`/api/admin/services/${id}/approve`);

export const rejectService = (id, rejection_reason) =>
  apiClient.patch(`/api/admin/services/${id}/reject`, { rejection_reason });

export const deleteAdminService = (id) =>
  apiClient.delete(`/api/admin/services/${id}`);

export const getCategories = () => apiClient.get("/api/categories");

export const getServiceMatches = (id, limit = 6) =>
  apiClient.get(`/api/services/${id}/matches`, {
    params: { limit },
  });

export const getRecommendations = (limit = 6) =>
  apiClient.get("/api/recommendations", {
    params: { limit },
  });


  export const getTopServices = () =>
  apiClient.get('/api/services?sort=top');