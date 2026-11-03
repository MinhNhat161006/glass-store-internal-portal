import { apiFetch } from './client';

export const inventoryApi = {
  getInventory: () => apiFetch('/api/inventory'),
  getTransfers: () => apiFetch('/api/inventory/transfers'),
  createTransfer: (transfer) => apiFetch('/api/inventory/transfers', {
    method: 'POST',
    body: JSON.stringify(transfer)
  }),
  dispatchTransfer: (id) => apiFetch(`/api/inventory/transfers/${id}/dispatch`, {
    method: 'PATCH'
  }),
  receiveTransfer: (id) => apiFetch(`/api/inventory/transfers/${id}/receive`, {
    method: 'PATCH'
  })
};
