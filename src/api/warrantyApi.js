import { apiFetch } from './client.js';

const request = async (path, options) => {
  const response = await apiFetch(path, options);
  return response?.data ?? response;
};

export const warrantyApi = {
  search: (kind, value) => request(`/api/warranties/search?${kind === 'barcode' ? 'barcode' : 'phone'}=${encodeURIComponent(value.trim())}`),
  getRepairs: (query = '') => {
    const value = query.trim();
    const field = /^[+0-9 ()-]+$/.test(value) ? 'phone' : 'code';
    return request(`/api/repair-services${value ? `?${field}=${encodeURIComponent(value)}` : ''}`);
  },
  createRepair: payload => request('/api/repair-services', { method: 'POST', body: JSON.stringify(payload) }),
  updateRepair: (id, payload) => request(`/api/repair-services/${id}/status`, { method: 'PATCH', body: JSON.stringify(payload) }),
  getAllWarranties: () => apiFetch('/api/warranties'),
  getWarrantyById: (id) => apiFetch(`/api/warranties/${id}`),
  createWarranty: (data) => apiFetch('/api/warranties', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateWarrantyStatus: (id, updateData) => apiFetch(`/api/warranties/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(updateData)
  })
};

