import { apiFetch } from './client';

export const labApi = {
  /**
   * Lấy danh sách lệnh mài lắp gia công xưởng
   * @param {string|null} status - PENDING, IN_PROGRESS, QC_PENDING, QC_PASSED, QC_FAILED
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
  },

  /**
   * Tương thích với interface updateLabJobStatus(id, { status, qcNotes, ... })
   */
  async updateLabJobStatus(id, dataOrStatus, qcNotes = '') {
    if (typeof dataOrStatus === 'object' && dataOrStatus !== null) {
      const { status, qcNotes: notes = '', notes: generalNotes = '' } = dataOrStatus;
      const effectiveNotes = notes || generalNotes || '';
      const res = await apiFetch(`/api/lab-jobs/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({
          status,
          qcNotes: effectiveNotes,
          notes: effectiveNotes,
          technicianNotes: dataOrStatus.technicianNotes,
          technicianName: dataOrStatus.technicianName
        }),
      });
      return res?.data;
    }
    return this.updateStatus(id, dataOrStatus, qcNotes);
  }
};
