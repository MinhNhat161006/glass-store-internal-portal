import { apiFetch } from './client.js';
import { validateMeasurements } from '../pages/optometry/prescriptionUtils.js';

const list = response => {
  if (!Array.isArray(response?.data)) throw new Error('Dữ liệu toa kính không hợp lệ.');
  return response.data;
};
const record = response => {
  if (!response?.data?.id || response.data.version == null) {
    throw new Error('Chưa nhận được toa kính và phiên bản đã lưu. Vui lòng tải lại để kiểm tra.');
  }
  return response.data;
};
async function validate(data) {
  const rules = await prescriptionApi.getValidationRules();
  const errors = validateMeasurements(data, rules);
  if (errors.length) throw new Error(errors.join('; '));
}

export const prescriptionApi = {
  async getAllPrescriptions() { return list(await apiFetch('/api/prescriptions')); },
  async getByCustomerId(customerId) { return list(await apiFetch(`/api/prescriptions/customer/${customerId}`)); },
  async getById(id) { return record(await apiFetch(`/api/prescriptions/${id}`)); },
  async getValidationRules() {
    const rules = (await apiFetch('/api/prescriptions/validation-rules'))?.data;
    if (!rules?.odSph || !rules?.pd) throw new Error('Không tải được quy tắc kiểm tra toa kính.');
    return rules;
  },
  async getRevisions(id) { return list(await apiFetch(`/api/prescriptions/${id}/revisions`)); },
  async createPrescription(data) {
    await validate(data);
    return record(await apiFetch('/api/prescriptions', { method: 'POST', body: JSON.stringify(data) }));
  },
  async updatePrescription(id, data) {
    if (!Number.isInteger(data.expectedVersion) || data.expectedVersion < 0) throw new Error('Thiếu phiên bản của toa kính.');
    if (!data.reason?.trim() || data.reason.trim().length > 500) throw new Error('Nhập lý do cập nhật từ 1 đến 500 ký tự.');
    await validate(data);
    return record(await apiFetch(`/api/prescriptions/${id}`, { method: 'PATCH', body: JSON.stringify({ ...data, reason: data.reason.trim() }) }));
  },
};
