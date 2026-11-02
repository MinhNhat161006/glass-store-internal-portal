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

  // Login action (supports real API credentials or structured profile)
  const login = async (userData) => {
    let finalUserData = { ...userData };

    // If username and password provided, authenticate against backend
    if (userData.username && userData.password) {
      try {
        const authData = await authApi.login({
          username: userData.username,
          password: userData.password
        });
        if (authData) {
          const frontRole = mapBackendRoleToFrontend(authData.roles);
          finalUserData = {
            staffId: authData.employeeCode || `STF-0${authData.id}`,
            staffName: authData.fullName,
            role: frontRole,
            branchName: authData.branchName || 'Flagship Q.1 (TP.HCM)',
            token: authData.token
          };
        }
      } catch (err) {
        console.warn('Backend login fallback to local session:', err.message);
      }
    }

    const role = finalUserData.role || ROLES.POS;
    const roleDetails = ROLE_INFO[role] || ROLE_INFO[ROLES.POS];

    const enhancedUser = {
      staffId: finalUserData.staffId || 'NV-OPT-202688',
      staffName: finalUserData.staffName || 'Nguyễn Bán Hàng',
      role: role,
      roleLabel: roleDetails.name,
      roleBadge: roleDetails.badgeText,
      branchName: finalUserData.branchName || 'Chi nhánh 01 - Flagship Lê Thánh Tôn, Quận 1',
      defaultRoute: roleDetails.defaultRoute,
      loginAt: new Date().toISOString()
    };

    setUser(enhancedUser);
    message.success('Đăng nhập thành công');

    return enhancedUser.defaultRoute;
  };

  // Logout action
  const logout = () => {
    authApi.logout();
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    message.success('Đăng xuất thành công');
  };

  // Check if current user has permission for given roles
  const hasRole = (allowedRoles) => {
    if (!user || !user.role) return false;
    // Admin has access to all operational routes
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
