import { apiFetch } from './client';

export const prescriptionApi = {
  /**
   * Lấy danh sách tất cả toa kính
   */
  async getAllPrescriptions() {
    const res = await apiFetch('/api/prescriptions');
    return res?.data || [];
  },

  /**
   * Lấy lịch sử khúc xạ theo ID khách hàng
   */
  async getByCustomerId(customerId) {
    const res = await apiFetch(`/api/prescriptions/customer/${customerId}`);
    return res?.data || [];
  },

  /**
   * Lấy chi tiết một toa kính
   */
  async getById(id) {
    const res = await apiFetch(`/api/prescriptions/${id}`);
    return res?.data;
  },

  /**
   * Bác sĩ ký duyệt và lưu toa kính mới
   */
  async createPrescription(data) {
    const rules = (await apiFetch('/api/prescriptions/validation-rules'))?.data;
    if (!rules) throw new Error('Kh?ng t?i ???c quy t?c toa k?nh.');
    for (const [field, rule] of Object.entries(rules)) {
      const value = data[field];
      if (value == null || value === '') {
        if (rule.required) throw new Error(field + ': thi?u d? li?u');
        continue;
      }
      if (rule.min != null || rule.max != null || rule.integer || rule.fraction != null) {
        const number = Number(value);
        if (!Number.isFinite(number) || (rule.min != null && number < Number(rule.min))
          || (rule.max != null && number > Number(rule.max))
          || (rule.integer && !Number.isInteger(number))
          || (rule.fraction != null && Math.abs(number * 10 ** rule.fraction - Math.round(number * 10 ** rule.fraction)) > 1e-7)) {
          throw new Error(field + ': s? ?o ngo?i mi?n h?p l?');
        }
      }
    }
    const res = await apiFetch('/api/prescriptions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res?.data;
  }
};

