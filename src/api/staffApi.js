import { apiFetch } from './client';

export const staffApi = {
  /**
   * Lấy toàn bộ danh sách nhân viên từ db_identity
   */
  async getStaffList() {
    const res = await apiFetch('/api/users/staff');
    return res?.data || [];
  },

  /**
   * Lấy chi tiết nhân viên theo ID
   */
  async getStaffById(id) {
    const res = await apiFetch(`/api/users/${id}`);
    return res?.data;
  },

  /**
   * Tạo mới nhân viên
   * @param {Object} data { username, email, fullName, phoneNumber, role, employeeCode, branchName }
   */
  async createStaff(data) {
    const res = await apiFetch('/api/users/staff', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res?.data;
  },

  /**
   * Đổi trạng thái kích hoạt / khóa nhân viên
   * @param {number} id
   */
  async toggleStaffStatus(id) {
    const res = await apiFetch(`/api/users/${id}/status`, {
      method: 'PATCH',
    });
    return res?.data;
  }
};
