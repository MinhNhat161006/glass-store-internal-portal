import { apiFetch } from './client';

export const labApi = {
  /**
   * Lấy danh sách lệnh mài lắp gia công xưởng
   */
  async getAllLabJobs(status = null) {
    const url = status ? `/api/lab-jobs?status=${status}` : '/api/lab-jobs';
    const res = await apiFetch(url);
    return res?.data || [];
  },

  /**
   * Lấy chi tiết lệnh mài kính theo ID
   */
  async getLabJobById(id) {
    const res = await apiFetch(`/api/lab-jobs/${id}`);
    return res?.data;
  },

  /**
   * Cập nhật trạng thái lệnh gia công và ghi chú QC
   */
  async updateStatus(id, status, qcNotes = '') {
    const res = await apiFetch(`/api/lab-jobs/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, qcNotes }),
    });
    return res?.data;
  }
};

