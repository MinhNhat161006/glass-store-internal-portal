import { apiFetch } from './client.js';

const requestOrder = async (path, options) => {
  const response = await apiFetch(path, options);
  return response?.data ?? response;
};

export const orderApi = {
  cancel: (id, reason, refundConfirmed) => requestOrder(`/api/orders/${id}/cancel`, { method: 'PATCH', body: JSON.stringify({ reason, refundConfirmed }) }),
  confirmRefund: id => requestOrder(`/api/orders/${id}/refund-confirm`, { method: 'POST' }),
  retryInventory: (id, branchCode) => requestOrder(`/api/orders/${id}/inventory/retry`, { method: 'POST', body: JSON.stringify({ branchCode }) }),
  getAllOrders: () => requestOrder('/api/orders'),
  getOrderById: (id) => requestOrder(`/api/orders/${id}`),
  getOrderByCode: (orderCode) => requestOrder(`/api/orders/code/${encodeURIComponent(orderCode)}`),
  createOrder: (orderData, idempotencyKey) => requestOrder('/api/orders', {
    method: 'POST',
    headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {},
    body: JSON.stringify(orderData)
  }),
  updateOrderStatus: (id, statusData) => requestOrder(`/api/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(statusData)
  }),
  getOrderHistory: (id) => requestOrder(`/api/orders/${id}/history`),
  initiatePayment: (orderId) => requestOrder(`/api/payments/order/${orderId}/initiate`, { method: 'POST' }),
  syncPayment: (orderId) => requestOrder(`/api/payments/order/${orderId}/sync`, { method: 'POST' }),
  getPaymentHistory: (orderId) => requestOrder(`/api/payments/order/${orderId}`),
  settleCash: (orderId) => requestOrder(`/api/orders/${orderId}/settle-cash`, { method: 'POST' }),
  getSepayConfig: () => requestOrder('/api/payments/sepay/configuration')
};
