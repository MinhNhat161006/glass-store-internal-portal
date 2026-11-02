import { apiFetch } from './client';

export const productApi = {
  getAllProducts: () => apiFetch('/api/products'),
  getProductById: (id) => apiFetch(`/api/products/${id}`),
};
