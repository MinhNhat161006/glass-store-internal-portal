import { apiFetch } from './client';

const request = (path, options) => apiFetch(`/api/catalog/admin/${path}`, options);

export const catalogManagementApi = {
  getCategories: () => request('categories'),
  createCategory: (data) => request('categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id, data) => request(`categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id) => request(`categories/${id}`, { method: 'DELETE' }),
  getBrands: () => request('brands'),
  createBrand: (data) => request('brands', { method: 'POST', body: JSON.stringify(data) }),
  updateBrand: (id, data) => request(`brands/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBrand: (id) => request(`brands/${id}`, { method: 'DELETE' }),
  getLocations: () => request('locations'),
  createLocation: (data) => request('locations', { method: 'POST', body: JSON.stringify(data) }),
  updateLocation: (id, data) => request(`locations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  setLocationActive: (id, active) => request(`locations/${id}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ active })
  }),
  deleteLocation: (id) => request(`locations/${id}`, { method: 'DELETE' }),
  getPublicLocations: () => apiFetch('/api/locations')
};
