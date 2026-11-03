import { apiFetch } from './client';

export const orderApi = {
  getAllOrders: () => apiFetch('/api/orders'),
  getOrderById: (id) => apiFetch(`/api/orders/${id}`),
  getOrderByCode: (orderCode) => apiFetch(`/api/orders/code/${orderCode}`),
  createOrder: (orderData, idempotencyKey) => apiFetch('/api/orders', {
    method: 'POST',
    headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {},
    body: JSON.stringify(orderData)
  }),
  updateOrderStatus: (id, statusData) => apiFetch(`/api/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(statusData)
  })
};
