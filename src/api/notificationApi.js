import { apiFetch } from './client';

export const notificationApi = {
  async getInbox({ unreadOnly = false, category = '' } = {}) {
    const params = new URLSearchParams();
    if (unreadOnly) params.set('unreadOnly', 'true');
    if (category && category !== 'ALL') params.set('category', category);
    const qs = params.toString();
    const res = await apiFetch(`/api/notifications${qs ? `?${qs}` : ''}`);
    if (!res?.data || !Array.isArray(res.data.items)) {
      throw new Error('Dữ liệu hộp thư thông báo không hợp lệ.');
    }
    return res.data;
  },

  async getUnreadSummary() {
    const res = await apiFetch('/api/notifications/unread-count');
    if (res?.data == null || typeof res.data.unreadCount !== 'number') {
      throw new Error('Không đọc được số thông báo chưa đọc.');
    }
    return res.data;
  },

  async markAsRead(id) {
    const res = await apiFetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
    if (!res?.data?.id) {
      throw new Error('Máy chủ chưa xác nhận đánh dấu đã đọc.');
    }
    return res.data;
  },

  async markAllAsRead() {
    const res = await apiFetch('/api/notifications/read-all', { method: 'PATCH' });
    if (!res?.data) {
      throw new Error('Máy chủ chưa xác nhận đánh dấu tất cả đã đọc.');
    }
    return res.data;
  },

  async getChannelConfig() {
    const res = await apiFetch('/api/notification-channels');
    if (!res?.data) {
      throw new Error('Không tải được cấu hình kênh thông báo.');
    }
    return res.data;
  },

  async updateChannelConfig(payload) {
    const res = await apiFetch('/api/notification-channels', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    if (!res?.data) {
      throw new Error('Không lưu được cấu hình kênh thông báo.');
    }
    return res.data;
  },
};
