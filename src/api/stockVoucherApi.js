import { apiFetch } from './client';

export const stockVoucherApi = {
  getVouchers: () => apiFetch('/api/inventory/vouchers'),
  createVoucher: (voucher, idempotencyKey) => apiFetch('/api/inventory/vouchers', {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(voucher)
  }),
  approveVoucher: (id) => apiFetch(`/api/inventory/vouchers/${id}/approve`, { method: 'POST' }),
  rejectVoucher: (id, reason) => apiFetch(`/api/inventory/vouchers/${id}/reject`, {
    method: 'POST',
    body: JSON.stringify({ reason })
  }),
  getSuppliers: () => apiFetch('/api/inventory/suppliers'),
  createSupplier: (supplier) => apiFetch('/api/inventory/suppliers', {
    method: 'POST',
    body: JSON.stringify(supplier)
  }),
  updateSupplier: (id, supplier) => apiFetch(`/api/inventory/suppliers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(supplier)
  }),
  setSupplierActive: (id, active) => apiFetch(`/api/inventory/suppliers/${id}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ active })
  }),
  getDefectiveInventory: () => apiFetch('/api/inventory/defects')
};
