import { apiFetch } from './client';

export const warrantyApi = {
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
