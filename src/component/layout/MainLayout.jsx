import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../routes/rolesConfig';


export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Current logged in role
  const currentRole = user?.role || ROLES.ADMIN;

  const [selectedBranch, setSelectedBranch] = useState('Chi nhánh 01 - Lê Thánh Tôn');

  const branches = [
    'Chi nhánh 01 - Lê Thánh Tôn',
    'Chi nhánh 02 - Tràng Tiền (HN)',
    'Trung tâm Lab Lens Tân Bình',
    'Trụ sở Quản trị Toàn quốc'
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Master definition of all navigation categories with strict RBAC access control
  const allNavSections = [
    {
      title: 'TỔNG QUAN',
      allowedRoles: [ROLES.ADMIN, ROLES.POS, ROLES.OPTOMETRY, ROLES.LAB],
      items: [
        {
          key: '/dashboard',
          label: 'Bàn làm việc (Overview)',
          icon: 'space_dashboard',
          allowedRoles: [ROLES.ADMIN, ROLES.POS, ROLES.OPTOMETRY, ROLES.LAB]
        }
      ]
    },
    {
      title: 'BÁN HÀNG & POS',
      allowedRoles: [ROLES.ADMIN, ROLES.POS],
      items: [
        {
          key: '/pos',
          label: 'POS Thu Ngân (FR-POS)',
          icon: 'point_of_sale',
          allowedRoles: [ROLES.ADMIN, ROLES.POS]
        },
        {
          key: '/orders',
          label: 'Quản Lý Đơn Hàng OMS',
          icon: 'receipt_long',
          allowedRoles: [ROLES.ADMIN, ROLES.POS]
        }
      ]
    },
    {
      title: 'KHÚC XẠ & LÂM SÀNG',
      allowedRoles: [ROLES.ADMIN, ROLES.OPTOMETRY],
      items: [
        {
          key: '/optometry-appointments',
          label: 'Lịch hẹn đo mắt (FR-EYE)',
          icon: 'calendar_month',
          allowedRoles: [ROLES.ADMIN, ROLES.OPTOMETRY]
        },
        {
          key: '/optometry',
          label: 'Hồ sơ toa kính OD/OS',
          icon: 'medical_information',
          allowedRoles: [ROLES.ADMIN, ROLES.OPTOMETRY]
        }
      ]
    },
    {
      title: 'LAB GIA CÔNG',
      allowedRoles: [ROLES.ADMIN, ROLES.LAB],
      items: [
        {
          key: '/lab',
          label: 'Điều phối mài lắp (FR-LAB)',
          icon: 'precision_manufacturing',
          allowedRoles: [ROLES.ADMIN, ROLES.LAB]
        },
        {
          key: '/lab-qc',
          label: 'Kiểm tra chất lượng (QC)',
          icon: 'verified',
          allowedRoles: [ROLES.ADMIN, ROLES.LAB]
        }
      ]
    },
    {
      title: 'KHO VẬN & VẬT TƯ',
      allowedRoles: [ROLES.ADMIN, ROLES.LAB],
      items: [
        {
          key: '/inventory',
          label: 'Tồn kho chi nhánh (FR-INV)',
          icon: 'inventory_2',
          allowedRoles: [ROLES.ADMIN, ROLES.LAB]
        },
        {
          key: '/stock-transfer',
          label: 'Nhập / Xuất / Chuyển kho',
          icon: 'move_up',
          allowedRoles: [ROLES.ADMIN, ROLES.LAB]
        }
      ]
    },
    {
      title: 'KHÁCH HÀNG & BẢO HÀNH',
      allowedRoles: [ROLES.ADMIN, ROLES.POS, ROLES.OPTOMETRY],
      items: [
        {
          key: '/crm',
          label: 'Hồ sơ CRM (FR-CRM)',
          icon: 'badge',
          allowedRoles: [ROLES.ADMIN, ROLES.POS, ROLES.OPTOMETRY]
        },
        {
          key: '/warranty',
          label: 'Phiếu BH & Đổi trả (FR-WAR)',
          icon: 'assignment_return',
          allowedRoles: [ROLES.ADMIN, ROLES.POS]
        }
      ]
    },
    {
      title: 'QUẢN TRỊ & BÁO CÁO',
      allowedRoles: [ROLES.ADMIN],
      items: [
        {
          key: '/reports',
          label: 'Báo cáo KPIs (FR-REP)',
          icon: 'analytics',
          allowedRoles: [ROLES.ADMIN]
        },
        {
          key: '/settings',
          label: 'Cấu hình hệ thống (FR-ADM)',
          icon: 'settings',
          allowedRoles: [ROLES.ADMIN]
        }
      ]
    }
  ];

  // Strictly filter navigation sections and items by the logged in role
  const navSections = allNavSections
    .filter(section => !section.allowedRoles || section.allowedRoles.includes(currentRole))
    .map(section => ({
      ...section,
      items: section.items.filter(item => !item.allowedRoles || item.allowedRoles.includes(currentRole))
    }))
    .filter(section => section.items.length > 0);

  const handleNavClick = (key) => {
    navigate(key);
  };

  return (
    <div className="bg-[#f9f9ff] font-sans text-[#111c2d] min-h-screen flex selection:bg-[#c6e7ff]">
      {/* ---------------- 1. FIXED LEFT SIDEBAR ---------------- */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#f0f3ff] z-50 flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#d8e3fb]/50">
        {/* Brand Header */}
        <div
          className="h-16 px-6 flex items-center gap-3 bg-[#f0f3ff] border-b border-[#e7eeff] cursor-pointer select-none"
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-9 h-9 rounded-xl bg-[#086288] flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[#cae6ff] text-[20px]">eyeglasses</span>
          </div>
          <div>
            <span className="text-lg text-[#004967] font-bold block leading-tight">OptiVision</span>
            <span className="text-[10px] text-[#19648f] tracking-widest uppercase block font-bold">
              Clinical &amp; Retail
            </span>
          </div>
        </div>

        {/* Navigation Menu (Filtered by Current User's Role) */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {navSections.map((sec, secIdx) => (
            <div key={secIdx}>
              <div className="px-3 mb-1.5 text-[11px] text-[#40484e] font-bold uppercase tracking-wider">
                {sec.title}
              </div>
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const isActive =
                    location.pathname === item.key ||
                    (item.key === '/dashboard' && location.pathname === '/');
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleNavClick(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#086288] text-white font-bold shadow-sm'
                          : 'text-[#40484e] hover:bg-[#dee8ff] hover:text-[#111c2d]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer User Info & Logout */}
        <div className="p-3 border-t border-[#e7eeff] bg-[#e7eeff]/60 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#004967] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">person</span>
            </div>
            <div className="overflow-hidden leading-tight">
              <div className="text-xs font-bold text-[#111c2d] truncate">
                {user?.staffName || 'Nhân sự OptiVision'}
              </div>
              <div className="text-[10px] text-[#086288] font-semibold truncate">
                {user?.roleLabel || 'Nhân viên'}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Đăng xuất ca"
            className="p-1.5 rounded-lg text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </aside>

      {/* ---------------- 2. MAIN CONTAINER (PL-72) ---------------- */}
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-6 sm:px-8 flex items-center justify-between gap-4 border-b border-[#e7eeff]">
          {/* Branch Selector */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="appearance-none bg-[#e7eeff] hover:bg-[#dee8ff] text-[#111c2d] text-xs font-bold pl-8 pr-7 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#086288] cursor-pointer transition-colors"
              >
                {branches.map((b, i) => (
                  <option key={i} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#004967] text-[18px] pointer-events-none">
                store
              </span>
              <span className="material-symbols-outlined absolute right-2 top-2.5 text-[#40484e] text-[16px] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-4">
            {/* Quick POS Order Button (for Admin & POS only) */}
            {(currentRole === ROLES.ADMIN || currentRole === ROLES.POS) && (
              <button
                type="button"
                onClick={() => navigate('/pos')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#086288] hover:bg-[#004967] text-white text-xs font-bold shadow-[0_4px_14px_rgba(8,98,136,0.2)] transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Tạo đơn POS nhanh</span>
              </button>
            )}

            {/* Quick Optometry Room Button (for Optometry) */}
            {currentRole === ROLES.OPTOMETRY && (
              <button
                type="button"
                onClick={() => navigate('/optometry')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow-[0_4px_14px_rgba(2,132,199,0.2)] transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">medical_services</span>
                <span>Phòng khám khúc xạ</span>
              </button>
            )}

            {/* Quick Lab Workstation Button (for Lab) */}
            {currentRole === ROLES.LAB && (
              <button
                type="button"
                onClick={() => navigate('/lab')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-bold shadow-[0_4px_14px_rgba(15,118,110,0.2)] transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
                <span>Xưởng mài lắp Lab</span>
              </button>
            )}

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() =>
                Modal.info({
                  title: 'Thông Báo Ca Trực Mới Nhất',
                  content: (
                    <div className="space-y-2 pt-2 text-xs text-slate-600">
                      <p>• Đơn mài kính #LAB-1091 đã được kiểm tra QC đạt chuẩn.</p>
                      <p>• Khách hàng Hoàng Đình Trọng (14:30) đã check-in tại quầy tiếp tân.</p>
                      <p>• Máy đo khúc xạ ARK-1s đã hoàn thành cân chỉnh ca sáng.</p>
                    </div>
                  )
                })
              }
              className="relative p-2 rounded-xl text-[#40484e] hover:bg-[#e7eeff] hover:text-[#111c2d] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              
            </button>

            <div className="h-6 w-px bg-[#dee8ff]" />

            {/* User Profile */}
            <div
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={handleLogout}
              title="Nhấn để đăng xuất"
            >
              <div className="w-8 h-8 rounded-full bg-[#004967] text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-[#111c2d] font-bold leading-tight">
                  {user?.staffName || 'Nhân sự OptiVision'}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#8fcdfd]/30 text-[#005881] text-[10px] font-bold w-fit leading-tight mt-0.5">
                  {user?.roleLabel || 'Nhân viên'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="pt-16 flex-1 flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}



