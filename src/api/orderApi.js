import { apiFetch } from './client';

export const orderApi = {
  cancel: (id, reason, refundConfirmed) => apiFetch(`/api/orders/${id}/cancel`, { method: 'PATCH', body: JSON.stringify({ reason, refundConfirmed }) }),
  confirmRefund: id => apiFetch(`/api/orders/${id}/refund-confirm`, { method: 'POST' }),
  retryInventory: (id, branchCode) => apiFetch(`/api/orders/${id}/inventory/retry`, { method: 'POST', body: JSON.stringify({ branchCode }) }),
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
