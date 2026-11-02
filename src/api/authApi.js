import { apiFetch } from './client';

export const authApi = {
  /**
   * Đăng nhập hệ thống (Staff / Admin / KTV)
   * @param {Object} credentials { username, password }
   */
  async login(credentials) {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (res?.data?.token) {
      localStorage.setItem('optivision_jwt_token', res.data.token);
    }

    return res?.data;
  },

  logout() {
    localStorage.removeItem('optivision_jwt_token');
    localStorage.removeItem('optivision_auth_user');
  }
};
