import React, { useState, useEffect } from 'react';
import { message, Modal, Spin } from 'antd';
import { staffApi } from '../../api/staffApi';

const INITIAL_STAFF = []; // Cleared mock staff
const OLD_STAFF = [
  {
    id: 'STF-088',
    name: 'Trần Minh Anh',
    email: 'minhanh.tran@optivision.vn',
    branch: 'Flagship Q.1',
    roleName: 'Thu Ngân POS & Bán Lẻ',
    roleCode: 'cashier',
    status: 'active',
    lastActive: '10 phút trước',
    avatar: 'MA',
    color: 'bg-[#004967] text-white',
    permissions: ['pos_create', 'pos_voucher', 'pos_reprint', 'optom_queue', 'stock_view']
  },
  {
    id: 'STF-021',
    name: 'BS. CKI Vũ Anh Tuấn',
    email: 'tuan.vu@optivision.vn',
    branch: 'Flagship Q.1',
    roleName: 'Bác Sĩ Khúc Xạ (CCHN)',
    roleCode: 'optometrist',
    status: 'active',
    lastActive: 'Live (Phòng 01)',
    avatar: 'AT',
    color: 'bg-emerald-700 text-white',
    permissions: ['optom_queue', 'optom_exam', 'optom_sign_rx', 'crm_view_rx', 'stock_view']
  },
  {
    id: 'STF-045',
    name: 'Trần Văn Bách',
    email: 'bach.tran@optivision.vn',
    branch: 'Flagship Q.1',
    roleName: 'Kỹ Thuật Viên Xưởng Lab',
    roleCode: 'lab_tech',
    status: 'active',
    lastActive: '45 phút trước',
    avatar: 'TB',
    color: 'bg-indigo-700 text-white',
    permissions: ['lab_queue', 'lab_edging', 'lab_qc_sign', 'stock_view', 'stock_transfer']
  },
  {
    id: 'STF-014',
    name: 'Lê Hoàng Nam',
    email: 'nam.le@optivision.vn',
    branch: 'Tràng Tiền Plaza (HN)',
    roleName: 'Quản Lý Cửa Hàng (Store Manager)',
    roleCode: 'manager',
    status: 'active',
    lastActive: '25 phút trước',
    avatar: 'HN',
    color: 'bg-amber-700 text-white',
    permissions: ['pos_create', 'pos_discount_override', 'pos_refund', 'stock_adjust', 'reports_branch', 'staff_view']
  },
  {
    id: 'STF-092',
    name: 'Nguyễn Thảo Vy',
    email: 'vy.nguyen@optivision.vn',
    branch: 'Thảo Điền Store (Q.2)',
    roleName: 'Thủ Kho Chi Nhánh',
    roleCode: 'inventory',
    status: 'active',
    lastActive: '3 giờ trước',
    avatar: 'TV',
    color: 'bg-teal-700 text-white',
    permissions: ['stock_view', 'stock_transfer', 'stock_receipt', 'stock_audit']
  },
  {
    id: 'STF-063',
    name: 'Đỗ Gia Huy',
    email: 'huy.do@optivision.vn',
    branch: 'Hub E-Com Online',
    roleName: 'CSKH & Vận Hành Đơn OMS',
    roleCode: 'oms_staff',
    status: 'active',
    lastActive: '5 phút trước',
    avatar: 'GH',
    color: 'bg-sky-700 text-white',
    permissions: ['oms_view', 'oms_confirm', 'crm_view', 'warranty_create']
  },
  {
    id: 'STF-031',
    name: 'Hoàng Văn Đức',
    email: 'duc.hoang@optivision.vn',
    branch: 'Flagship Q.1',
    roleName: 'Nhân Viên Bán Hàng Thời Vụ',
    roleCode: 'cashier',
    status: 'locked',
    lastActive: '14 ngày trước',
    avatar: 'HĐ',
    color: 'bg-gray-500 text-white',
    permissions: []
  }
];

const ROLES_LIST = [
  { code: 'all', label: 'Tất cả vai trò' },
  { code: 'admin', label: 'Quản Trị Viên (Admin)' },
  { code: 'manager', label: 'Quản Lý Cửa Hàng' },
  { code: 'cashier', label: 'Thu Ngân & Bán Lẻ POS' },
  { code: 'optometrist', label: 'Bác Sĩ / KTV Khúc Xạ' },
  { code: 'lab_tech', label: 'Kỹ Thuật Viên Lab & Mài Lắp' },
  { code: 'inventory', label: 'Thủ Kho Vật Tư' }
];

const RBAC_MODULES = [
  {
    group: '1. Bán Hàng & Thu Ngân POS',
    icon: 'point_of_sale',
    permissions: [
      { key: 'pos_create', name: 'Tạo đơn bán lẻ & quét mã vạch', admin: true, manager: true, cashier: true, optom: false, lab: false },
      { key: 'pos_discount', name: 'Áp dụng khuyến mãi & Voucher', admin: true, manager: true, cashier: true, optom: false, lab: false },
      { key: 'pos_override', name: 'Duyệt chiết khấu ngoài chính sách', admin: true, manager: true, cashier: false, optom: false, lab: false },
      { key: 'pos_refund', name: 'Hủy đơn & hoàn tiền giao dịch', admin: true, manager: true, cashier: false, optom: false, lab: false },
    ]
  },
  {
    group: '2. Khúc Xạ & Đo Khám Thị Lực',
    icon: 'visibility',
    permissions: [
      { key: 'optom_queue', name: 'Tiếp nhận hàng đợi khám mắt', admin: true, manager: true, cashier: true, optom: true, lab: false },
      { key: 'optom_exam', name: 'Nhập thông số khúc xạ máy & thử kính', admin: true, manager: false, cashier: false, optom: true, lab: false },
      { key: 'optom_sign_rx', name: 'Ký duyệt đơn kính y khoa (CCHN)', admin: true, manager: false, cashier: false, optom: true, lab: false },
    ]
  },
  {
    group: '3. Xưởng Lab & Mài Lắp Kính',
    icon: 'precision_manufacturing',
    permissions: [
      { key: 'lab_queue', name: 'Theo dõi hàng đợi gia công mài kính', admin: true, manager: true, cashier: false, optom: false, lab: true },
      { key: 'lab_edging', name: 'Điều khiển máy mài Essilor/Nidek', admin: true, manager: false, cashier: false, optom: false, lab: true },
      { key: 'lab_qc_sign', name: 'Kiểm định chất lượng QC & xác nhận đạt', admin: true, manager: false, cashier: false, optom: false, lab: true },
    ]
  },
  {
    group: '4. Kho Vận & Điều Chuyển',
    icon: 'inventory_2',
    permissions: [
      { key: 'stock_view', name: 'Tra cứu tồn kho đa chi nhánh', admin: true, manager: true, cashier: true, optom: true, lab: true },
      { key: 'stock_transfer', name: 'Lập phiếu yêu cầu điều chuyển kho', admin: true, manager: true, cashier: false, optom: false, lab: true },
      { key: 'stock_adjust', name: 'Điều chỉnh kiểm kê tồn kho', admin: true, manager: true, cashier: false, optom: false, lab: false },
    ]
  },
  {
    group: '5. Báo Cáo & Quản Trị Hệ Thống',
    icon: 'admin_panel_settings',
    permissions: [
      { key: 'reports_view', name: 'Xem báo cáo doanh thu chuỗi', admin: true, manager: false, cashier: false, optom: false, lab: false },
      { key: 'staff_manage', name: 'Quản trị nhân sự & phân quyền vai trò', admin: true, manager: false, cashier: false, optom: false, lab: false },
    ]
  }
];

export default function StaffRbacPage() {
  const [activeTab, setActiveTab] = useState('staff'); // 'staff' | 'matrix'
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingStaff, setEditingStaff] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    branch: 'Flagship Q.1',
    roleCode: 'cashier',
    roleName: 'Thu Ngân POS & Bán Lẻ'
  });

  // Map roles from backend
  const mapRoleToInfo = (roles = []) => {
    const roleList = Array.isArray(roles) ? roles : Array.from(roles || []);
    if (roleList.includes('ROLE_ADMIN')) {
      return { code: 'admin', label: 'Quản Trị Viên (Admin)', color: 'bg-purple-700 text-white' };
    }
    if (roleList.includes('ROLE_OPTOMETRIST')) {
      return { code: 'optometrist', label: 'Bác Sĩ / KTV Khúc Xạ (CCHN)', color: 'bg-emerald-700 text-white' };
    }
    if (roleList.includes('ROLE_LAB_TECH')) {
      return { code: 'lab_tech', label: 'Kỹ Thuật Viên Xưởng Lab', color: 'bg-indigo-700 text-white' };
    }
    if (roleList.includes('ROLE_SALES_STAFF')) {
      return { code: 'cashier', label: 'Thu Ngân POS & Bán Lẻ', color: 'bg-[#004967] text-white' };
    }
    return { code: 'cashier', label: 'Nhân Viên Bán Hàng', color: 'bg-slate-700 text-white' };
  };

  const mapCodeToBackendRole = (code) => {
    switch (code) {
      case 'admin': return 'ROLE_ADMIN';
      case 'optometrist': return 'ROLE_OPTOMETRIST';
      case 'lab_tech': return 'ROLE_LAB_TECH';
      case 'manager': return 'ROLE_ADMIN';
      default: return 'ROLE_SALES_STAFF';
    }
  };

  const loadStaff = async () => {
    try {
      setLoading(true);
      const data = await staffApi.getStaffList();
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map((u) => {
          const roleInfo = mapRoleToInfo(u.roles);
          const initials = (u.fullName || 'NV')
            .split(' ')
            .map((n) => n[0])
            .slice(-2)
            .join('')
            .toUpperCase();

          return {
            dbId: u.id,
            id: u.employeeCode || `STF-0${u.id}`,
            name: u.fullName,
            email: u.email,
            phone: u.phoneNumber || '0901000000',
            branch: u.branchName || 'Flagship Q.1 (TP.HCM)',
            roleName: roleInfo.label,
            roleCode: roleInfo.code,
            status: u.status === 'ACTIVE' ? 'active' : 'locked',
            lastActive: 'Trực tuyến hôm nay',
            avatar: initials,
            color: roleInfo.color,
            permissions: ['pos_create', 'stock_view']
          };
        });
        setStaffList(mapped);
      }
    } catch (err) {
      console.warn('Lấy dữ liệu nhân viên từ backend thất bại, dùng danh sách dự phòng:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  // Filtered staff list
  const filteredStaff = staffList.filter(staff => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || staff.name.toLowerCase().includes(q) || staff.id.toLowerCase().includes(q) || staff.email.toLowerCase().includes(q);
    const matchRole = roleFilter === 'all' || staff.roleCode === roleFilter;
    const matchStatus = statusFilter === 'all' || staff.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const handleToggleStatus = async (staff) => {
    try {
      if (staff.dbId) {
        await staffApi.toggleStaffStatus(staff.dbId);
      }
      const newStatus = staff.status === 'active' ? 'locked' : 'active';
      setStaffList(prev => prev.map(s => s.id === staff.id ? { ...s, status: newStatus } : s));
      message.success(`Đã ${newStatus === 'active' ? 'mở khóa' : 'tạm khóa'} tài khoản ${staff.name} (${staff.id})`);
    } catch (err) {
      message.error(`Không thể cập nhật trạng thái nhân viên: ${err.message}`);
    }
  };

  const handleCreateStaff = async () => {
    if (!newStaff.name.trim() || !newStaff.email.trim()) {
      message.error('Vui lòng nhập họ tên và email nhân viên');
      return;
    }
    const newId = `STF-0${Math.floor(100 + Math.random() * 900)}`;

    try {
      const created = await staffApi.createStaff({
        fullName: newStaff.name,
        email: newStaff.email,
        phoneNumber: newStaff.phone || '0901000000',
        branchName: newStaff.branch,
        employeeCode: newId,
        role: mapCodeToBackendRole(newStaff.roleCode)
      });
      setIsAddModalOpen(false);
      setNewStaff({ name: '', email: '', phone: '', branch: 'Flagship Q.1', roleCode: 'cashier', roleName: 'Thu Ngân POS & Bán Lẻ' });
      message.success(`Tạo mới hồ sơ nhân sự ${created?.fullName || newStaff.name} (${newId}) thành công!`);
      await loadStaff();
    } catch (err) {
      message.error(`Lỗi tạo nhân sự: ${err.message}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full max-w-[1600px] mx-auto p-3.5 sm:p-5 gap-4">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-sm">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#70787f]">
              <span>Hệ Thống</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Cấu Hình</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#004967] font-semibold">Nhân Sự &amp; Phân Quyền</span>
            </div>
            <h1 className="text-lg font-bold text-[#111c2d] mt-1">Quản Trị Nhân Viên &amp; Phân Quyền Vai Trò (RBAC)</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => message.success('Đang xuất danh sách nhân sự định dạng Excel (.xlsx)...')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#004967] text-xs font-semibold transition-all border border-[#d8e3fb]"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Xuất Excel</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#004967] hover:bg-[#086288] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>+ Thêm Nhân Viên</span>
            </button>
          </div>
        </div>

        {/* 4 Core KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-[#d8e3fb]/40 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#70787f] uppercase tracking-wider block">Tổng nhân sự</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xl font-bold text-[#004967]">{staffList.length}</span>
                <span className="text-xs text-[#70787f]">hồ sơ</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-medium">{staffList.filter(s => s.status === 'active').length} đang hoạt động</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#e7eeff] text-[#004967] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#d8e3fb]/40 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#70787f] uppercase tracking-wider block">Vai trò hệ thống</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xl font-bold text-[#004967]">5</span>
                <span className="text-xs text-[#70787f]">nhóm chính</span>
              </div>
              <span className="text-[11px] text-[#70787f]">Phân quyền chặt chẽ</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#e7eeff] text-[#004967] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">shield_person</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#d8e3fb]/40 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#70787f] uppercase tracking-wider block">Phiên trực tuyến</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xl font-bold text-emerald-700">{staffList.filter(s => s.status === 'active').length}</span>
                <span className="text-xs text-[#70787f]">tài khoản</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Kết nối an toàn
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">devices</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#d8e3fb]/40 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#70787f] uppercase tracking-wider block">Nhật ký 24H</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xl font-bold text-[#004967]">{staffList.length * 2}</span>
                <span className="text-xs text-[#70787f]">thao tác</span>
              </div>
              <span className="text-[11px] text-[#70787f]">Được lưu vết tự động</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#e7eeff] text-[#004967] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">history_toggle_off</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-[#e7eeff] pb-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('staff')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'staff'
                  ? 'bg-[#004967] text-white shadow-sm'
                  : 'bg-white text-[#70787f] hover:bg-[#f0f3ff] border border-[#d8e3fb]/60'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">group</span>
              <span>Danh Sách Nhân Sự ({staffList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'matrix'
                  ? 'bg-[#004967] text-white shadow-sm'
                  : 'bg-white text-[#70787f] hover:bg-[#f0f3ff] border border-[#d8e3fb]/60'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              <span>Ma Trận Phân Quyền (RBAC Matrix)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DANH SÁCH NHÂN SỰ */}
        {activeTab === 'staff' && (
          <div className="bg-white rounded-xl border border-[#d8e3fb]/40 shadow-sm overflow-hidden flex flex-col">
            {/* Filter toolbar */}
            <div className="p-3.5 bg-[#f0f3ff]/50 border-b border-[#e7eeff] flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="w-full md:w-80 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#70787f]">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên, mã STF, email..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white border border-[#d8e3fb] text-xs text-[#111c2d] placeholder-[#70787f] focus:outline-none focus:ring-1 focus:ring-[#004967]"
                />
              </div>

              <div className="w-full md:w-auto flex flex-wrap items-center gap-2">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#d8e3fb] text-xs font-medium text-[#111c2d] focus:outline-none"
                >
                  {ROLES_LIST.map(r => (
                    <option key={r.code} value={r.code}>{r.label}</option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#d8e3fb] text-xs font-medium text-[#111c2d] focus:outline-none"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Đang hoạt động</option>
                  <option value="locked">Tạm khóa</option>
                </select>
              </div>
            </div>

            {/* Staff Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[880px]">
                <thead>
                  <tr className="bg-[#dee8ff]/30 text-[#70787f] uppercase text-[11px] font-bold tracking-wider border-b border-[#e7eeff]">
                    <th className="py-3 px-4">Nhân viên</th>
                    <th className="py-3 px-3">Chi nhánh</th>
                    <th className="py-3 px-3">Vai trò phân quyền</th>
                    <th className="py-3 px-3">Hoạt động gần nhất</th>
                    <th className="py-3 px-3">Trạng thái</th>
                    <th className="py-3 px-4 text-right">Tác vụ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff] text-xs text-[#111c2d]">
                  {filteredStaff.map(staff => (
                    <tr key={staff.id} className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${staff.color} font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm`}>
                            {staff.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-[13px] text-[#111c2d] flex items-center gap-1.5">
                              {staff.name}
                              <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-[#e7eeff] text-[#004967]">{staff.id}</span>
                            </div>
                            <div className="text-[11px] text-[#70787f]">{staff.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-[#111c2d]">{staff.branch}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#dee8ff] text-[#004967] font-semibold text-[11px] inline-block">
                          {staff.roleName}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#70787f] font-mono">
                        {staff.lastActive}
                      </td>
                      <td className="py-3 px-3">
                        {staff.status === 'active' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            Tạm khóa
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingStaff(staff)}
                            className="p-1.5 rounded-lg text-[#004967] hover:bg-[#dee8ff] transition-colors"
                            title="Chỉnh sửa phân quyền"
                          >
                            <span className="material-symbols-outlined text-[17px]">edit</span>
                          </button>
                          <button
                            onClick={() => handleToggleStatus(staff)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              staff.status === 'active' ? 'text-rose-600 hover:bg-rose-50' : 'text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={staff.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                          >
                            <span className="material-symbols-outlined text-[17px]">
                              {staff.status === 'active' ? 'lock' : 'lock_open'}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MA TRẬN PHÂN QUYỀN (RBAC MATRIX) */}
        {activeTab === 'matrix' && (
          <div className="bg-white rounded-xl border border-[#d8e3fb]/40 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-[#f0f3ff]/50 border-b border-[#e7eeff] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#111c2d]">Bảng Phân Quyền Vai Trò Theo Phân Hệ Nghiệp Vụ</h3>
                <p className="text-xs text-[#70787f] mt-0.5">Xác lập ranh giới quyền hạn vận hành giữa các bộ phận Bán lẻ, Phòng khám, Xưởng mài và Kho vận</p>
              </div>
              <button
                onClick={() => message.success('Đã lưu ma trận phân quyền hệ thống!')}
                className="px-3.5 py-1.5 rounded-xl bg-[#004967] hover:bg-[#086288] text-white text-xs font-semibold shadow-sm transition-all"
              >
                Lưu Thay Đổi
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr className="bg-[#dee8ff]/30 text-[#70787f] uppercase text-[11px] font-bold tracking-wider border-b border-[#e7eeff]">
                    <th className="py-3 px-4 w-2/5">Chức năng &amp; Phân hệ</th>
                    <th className="py-3 px-3 text-center">Admin</th>
                    <th className="py-3 px-3 text-center">Quản Lý</th>
                    <th className="py-3 px-3 text-center">Thu Ngân POS</th>
                    <th className="py-3 px-3 text-center">KTV Khúc Xạ</th>
                    <th className="py-3 px-3 text-center">KTV Lab</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff] text-xs text-[#111c2d]">
                  {RBAC_MODULES.map((module, idx) => (
                    <React.Fragment key={idx}>
                      <tr className="bg-[#f0f3ff]/80 font-bold text-[#004967]">
                        <td colSpan={6} className="py-2.5 px-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px]">{module.icon}</span>
                          <span>{module.group}</span>
                        </td>
                      </tr>
                      {module.permissions.map((perm) => (
                        <tr key={perm.key} className="hover:bg-gray-50/60">
                          <td className="py-2.5 px-6 text-[#40484e]">{perm.name}</td>
                          <td className="py-2.5 px-3 text-center">
                            {perm.admin ? (
                              <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {perm.manager ? (
                              <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {perm.cashier ? (
                              <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {perm.optom ? (
                              <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {perm.lab ? (
                              <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Role Modal */}
      {editingStaff && (
        <Modal
          open={!!editingStaff}
          onCancel={() => setEditingStaff(null)}
          title={`Phân quyền nhân sự: ${editingStaff.name} (${editingStaff.id})`}
          footer={[
            <button
              key="cancel"
              onClick={() => setEditingStaff(null)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 mr-2"
            >
              Hủy
            </button>,
            <button
              key="submit"
              onClick={() => {
                message.success(`Đã cập nhật vai trò và phân quyền cho ${editingStaff.name}`);
                setEditingStaff(null);
              }}
              className="px-4 py-1.5 rounded-lg bg-[#004967] text-xs font-semibold text-white hover:bg-[#086288]"
            >
              Lưu Cấu Hình
            </button>
          ]}
        >
          <div className="space-y-3 pt-2 text-xs">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Vai trò chính</label>
              <select
                value={editingStaff.roleCode}
                onChange={(e) => {
                  const roleObj = ROLES_LIST.find(r => r.code === e.target.value);
                  setEditingStaff({ ...editingStaff, roleCode: e.target.value, roleName: roleObj ? roleObj.label : editingStaff.roleName });
                }}
                className="w-full p-2 border border-gray-300 rounded-lg text-xs"
              >
                {ROLES_LIST.filter(r => r.code !== 'all').map(r => (
                  <option key={r.code} value={r.code}>{r.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Chi nhánh làm việc</label>
              <input
                type="text"
                value={editingStaff.branch}
                onChange={(e) => setEditingStaff({ ...editingStaff, branch: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Trạng thái tài khoản</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="modal_status"
                    checked={editingStaff.status === 'active'}
                    onChange={() => setEditingStaff({ ...editingStaff, status: 'active' })}
                  />
                  <span>Hoạt động</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="modal_status"
                    checked={editingStaff.status === 'locked'}
                    onChange={() => setEditingStaff({ ...editingStaff, status: 'locked' })}
                  />
                  <span className="text-rose-600">Tạm khóa</span>
                </label>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <Modal
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          title="Thêm Nhân Viên Mới Vào Hệ Thống"
          footer={[
            <button
              key="cancel"
              onClick={() => setIsAddModalOpen(false)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 mr-2"
            >
              Hủy
            </button>,
            <button
              key="submit"
              onClick={handleCreateStaff}
              className="px-4 py-1.5 rounded-lg bg-[#004967] text-xs font-semibold text-white hover:bg-[#086288]"
            >
              Tạo Hồ Sơ
            </button>
          ]}
        >
          <div className="space-y-3 pt-2 text-xs">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Họ và tên *</label>
              <input
                type="text"
                placeholder="Ví dụ: Nguyễn Văn An"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Email nội bộ *</label>
              <input
                type="email"
                placeholder="an.nguyen@optivision.vn"
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Vai trò hệ thống</label>
              <select
                value={newStaff.roleCode}
                onChange={(e) => setNewStaff({ ...newStaff, roleCode: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg text-xs"
              >
                {ROLES_LIST.filter(r => r.code !== 'all').map(r => (
                  <option key={r.code} value={r.code}>{r.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Chi nhánh phân công</label>
              <select
                value={newStaff.branch}
                onChange={(e) => setNewStaff({ ...newStaff, branch: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg text-xs"
              >
                <option value="Flagship Q.1">Flagship Q.1 (TP.HCM)</option>
                <option value="Tràng Tiền HN">Tràng Tiền Plaza (Hà Nội)</option>
                <option value="Thảo Điền Q.2">Thảo Điền Store (Q.2)</option>
                <option value="Hub E-Com Online">Hub E-Com Online</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
