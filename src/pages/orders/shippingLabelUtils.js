const PAID_STATUSES = new Set(['PAID', 'LAB_DISPATCH_FAILED', 'PENDING_CONFIRMATION', 'CONFIRMED', 'PREPARING', 'PROCESSING', 'READY_FOR_PICKUP', 'COMPLETED']);

/** Unknown collection amounts must remain unknown; the label cannot imply payment. */
export function collectionAmount(order) {
  if (order.codAmount != null && order.codAmount !== '' && Number.isFinite(Number(order.codAmount)) && Number(order.codAmount) >= 0) return Number(order.codAmount);
  if (order.paymentStatus === 'SUCCESS' || order.paymentStatus === 'PAID' || PAID_STATUSES.has(order.status)) return 0;
  return null;
}

export function assertSavedTransition(saved, orderId, targetStatus) {
  const expected = targetStatus === 'PROCESSING' ? 'PREPARING' : targetStatus;
  if (saved?.id !== orderId || saved?.status !== expected) throw new Error('Máy chủ chưa xác nhận đúng đơn và trạng thái đã lưu.');
  return saved;
}
