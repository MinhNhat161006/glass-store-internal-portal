import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { ROLES, ROLE_INFO } from '../routes/rolesConfig';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

const STORAGE_KEY = 'optivision_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error loading auth from localStorage', e);
      return null;
    }
  });

  const isAuthenticated = Boolean(user && user.staffId);

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // Map backend role (e.g. ROLE_ADMIN, ROLE_OPTOMETRIST) to frontend internal role
  const mapBackendRoleToFrontend = (roles = []) => {
    const r = Array.isArray(roles) ? roles : Array.from(roles || []);
    if (r.includes('ROLE_ADMIN')) return ROLES.ADMIN;
    if (r.includes('ROLE_OPTOMETRIST')) return ROLES.OPTOMETRY;
    if (r.includes('ROLE_LAB_TECH')) return ROLES.LAB;
    return ROLES.POS;
  };

  // Login action (STRICT: Bắt buộc xác thực qua Backend, không fallback)
  const login = async (userData) => {
    const inputUsername = (userData.username || '').trim();
    const inputPassword = (userData.password || '').trim();

    if (!inputUsername) {
      throw new Error('Vui lòng nhập Mã nhân viên (Staff ID) hoặc Tên đăng nhập!');
    }
    if (!inputPassword) {
      throw new Error('Vui lòng nhập Mật khẩu tài khoản!');
    }

    // Call real backend authentication API
    const authData = await authApi.login({
      username: inputUsername,
      password: inputPassword
    });

    if (!authData || !authData.token) {
      throw new Error('Đăng nhập thất bại: Máy chủ không trả về phiên làm việc hợp lệ.');
    }

    const frontRole = mapBackendRoleToFrontend(authData.roles);
    const roleDetails = ROLE_INFO[frontRole] || ROLE_INFO[ROLES.POS];

    const enhancedUser = {
      staffId: authData.employeeCode || inputUsername,
      staffName: authData.fullName || 'Nhân Sự OptiVision',
      role: frontRole,
      roleLabel: roleDetails.name,
      roleBadge: roleDetails.badgeText,
      branchName: authData.branchName || userData.branchName || 'Chi nhánh 01 - Flagship Lê Thánh Tôn, Quận 1',
      defaultRoute: roleDetails.defaultRoute,
      token: authData.token,
      loginAt: new Date().toISOString()
    };

    setUser(enhancedUser);
    message.success(`Đăng nhập thành công! Xin chào ${enhancedUser.staffName}`);

    return enhancedUser.defaultRoute;
  };

  // Logout action
  const logout = () => {
    authApi.logout();
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('optivision_jwt_token');
    message.success('Đã đăng xuất khỏi hệ thống');
  };

  // Check if current user has permission for given roles
  const hasRole = (allowedRoles) => {
    if (!user || !user.role) return false;
    if (user.role === ROLES.ADMIN) return true;
    if (!allowedRoles || allowedRoles.length === 0) return true;
    return allowedRoles.includes(user.role);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    hasRole,
    roleInfo: user ? ROLE_INFO[user.role] : null
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
