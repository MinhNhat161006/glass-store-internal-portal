import { apiFetch } from './client';

export const customerApi = {
  /**
   * Lấy danh sách khách hàng từ db_identity
   */
  async getCustomerList() {
    const res = await apiFetch('/api/users/customers');
    return res?.data || [];
  },

  /**
   * Lấy thông tin chi tiết một khách hàng theo ID
   */
  async getCustomerById(id) {
    const res = await apiFetch(`/api/users/${id}`);
    return res?.data;
  },

  /**
   * Tạo mới hồ sơ khách hàng
   * @param {Object} data { fullName, phoneNumber, email, address, membershipTier }
   */
  async createCustomer(data) {
    const res = await apiFetch('/api/users/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res?.data;
  }
};
