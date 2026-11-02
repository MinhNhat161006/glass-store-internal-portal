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
    const res = await apiFetch('/api/prescriptions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res?.data;
  }
};

