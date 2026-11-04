import { apiFetch } from './client';
export const promotionApi = {
  quote: payload => apiFetch('/api/promotions/apply', { method: 'POST', body: JSON.stringify(payload) }),
  account: customerId => apiFetch(`/api/loyalty/accounts/${customerId}`),
};
