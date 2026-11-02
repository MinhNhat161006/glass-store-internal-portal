import React, { useState, useEffect } from 'react';
import { message, Modal, Spin } from 'antd';
import { customerApi } from '../../api/customerApi';

export default function CrmPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState('#OPT-CUS-9842');
  const [activeTab, setActiveTab] = useState('rx');

  const [customerList, setCustomerList] = useState([]);

  const [loading, setLoading] = useState(false);

  // Avatar presets for real seeded customers
  const AVATARS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCN6A5Zry9WqS2KKpur9_SXR7FEsNxIv5u70kYDDHcPfSzRI8xZ3BNDMJqGm8H5O-ApKUVZclmL5YPyteetztlhOBmVmDpeCX85t2ltbbOcuntTv1zyjpPMlt3CutGb7_GLwegBHqUFA4EmVKsu-7LadvgLmnk1yp1uM93_PMI56natfovynZGSkxCp9DfQ6JYBBVYfyT2vEqeXSAwoijbAi3SWiRvlEhe0nFGIdTM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA7p9c_umMS8JlFzUMDtlfI55LOFh-EgPAVx_fowj68SVdXXGW8oL_cR8h0XnIMj-8xk2bbPQrYRlpD7xeXd1xeKibNIh0ZeBpcnuMdE-TzQG_FSr9J0xFqKqfSj2kOYqdY-FfxLVMgjSheXidJJcc_Yv6WhRxXEv5AEns5AiDkeYja6QKP2qJIXBI406Wc4M_XP-qb8cdAEUXf0345vEYfPRYooS3xQJmB34xtMu8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD1A6W3DcNV1YNQnxh4m5zHa-hd_zfP2voqBo4eeuIfzQp6F5sJSr8ecncr8HBMDeH7q7oITPTqQYGFZo2pVcgPEsxvCS1nBz0PX_RFkOmAAhjAdMmgllgyyqHZgHqJeSPwu9fVbIIL_33Smz2TSXt0WOc3MAwKu2XrfW9RVXNx1dExeGdqswNSnYU-zdb-5tHWdZZ5bHL3jGPJ1-S0vMEyKGBEluo1XyNk3N5b_4Q',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDxZLxAp7hHJVQ4ycIvGLm-4LR4V3mFbhpd_5UIBgAGKMCZtKQRboA_CyV2j1c496O1v8-KERE-FpD-itrk4t73SLl4xhOssktjAKRma_vW_nQeDRKhfRuG2HQj1iinAmTSqviG-njb4tKyxvA4Kg6Dv46XQHa9rDekAh4H2Th_wVN_-XaxxqfETn8_KPhV0BxznGAksDH6umbXETYoTs35-fEW4itci4Snry30aQ4'
  ];

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerApi.getCustomerList();
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map((u, idx) => {
          const code = u.employeeCode || `VIP-0${idx + 1}`;
          let tierName = 'Thành Viên';
          let tierClass = 'bg-surface-container text-on-surface';

          if (code.includes('VIP-01')) {
            tierName = 'VIP 3 Silver';
            tierClass = 'bg-surface-container-high text-on-surface';
          } else if (code.includes('VIP-02')) {
            tierName = 'VIP Gold';
            tierClass = 'bg-secondary-fixed text-on-secondary-fixed';
          } else if (code.includes('VIP-03')) {
            tierName = 'Platinum';
            tierClass = 'bg-primary-fixed text-on-primary-fixed';
          }

          const rxPresets = [
            'OD: -3.25 | OS: -2.75',
            'OD: -2.00 | OS: -1.75',
            'OD: -7.50 | OS: -7.00',
            'Viễn +1.50 / Add +2.00',
            'OD: -1.25 | OS: -1.50'
          ];

          return {
            dbId: u.id,
            id: `#OPT-CUS-${u.id * 890 + 942}`,
            name: u.fullName,
            tier: tierName,
            tierClass: tierClass,
            age: 26 + (idx * 4) % 20,
            gender: idx % 2 === 0 ? 'Nam' : 'Nữ',
            pts: `${450 + idx * 750} pts`,
            rx: rxPresets[idx % rxPresets.length],
            lastOrder: idx === 0 ? 'Hôm nay 10:15 (Kính Râm)' : `${idx * 4 + 2} ngày trước`,
            phone: u.phoneNumber,
            email: u.email,
            address: u.branchName || '120 Hai Bà Trưng, P. Đa Kao, Q.1, TP.HCM',
            avatar: AVATARS[idx % AVATARS.length]
          };
        });

        setCustomerList(mapped);
        if (mapped.length > 0 && !mapped.some(c => c.id === selectedCustomerId)) {
          setSelectedCustomerId(mapped[0].id);
        }
      }
    } catch (err) {
      console.warn('Lấy danh sách khách hàng từ backend thất bại, dùng mock data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Form states
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    gender: 'Nam',
    tier: 'Thành Viên',
    address: '',
    rx: 'OD: 0.00 | OS: 0.00'
  });

  const activeCustomer = customerList.find(c => c.id === selectedCustomerId) || customerList[0];

  const [editFormData, setEditFormData] = useState({
    name: activeCustomer.name,
    phone: activeCustomer.phone,
    email: activeCustomer.email || '',
    address: activeCustomer.address || '',
    tier: activeCustomer.tier
  });

  const [bookingFormData, setBookingFormData] = useState({
    date: '2026-11-05',
    time: '10:00',
    room: 'Phòng 01 - Bác Sĩ CKI Khúc Xạ',
    note: 'Tái khám định kỳ 6 tháng & kiểm tra độ loạn'
  });

  const handleAction = (msg) => {
    message.success(msg);
  };

  const handleCreateCustomerSubmit = async () => {
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) {
      message.error('Vui lòng nhập họ tên và số điện thoại khách hàng');
      return;
    }
    const newId = `#OPT-CUS-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await customerApi.createCustomer({
        fullName: newCustomer.name,
        phoneNumber: newCustomer.phone,
        email: newCustomer.email || `${newCustomer.phone}@customer.optivision.vn`,
        address: newCustomer.address || 'TP. Hồ Chí Minh',
        membershipTier: newCustomer.tier
      });

      setIsCreateModalOpen(false);
      setNewCustomer({ name: '', phone: '', email: '', gender: 'Nam', tier: 'Thành Viên', address: '', rx: 'OD: 0.00 | OS: 0.00' });
      message.success(`Đã lưu khách hàng mới vào cơ sở dữ liệu: ${newCustomer.name}!`);
      await loadCustomers();
    } catch (err) {
      // Fallback local addition if network glitch
      const created = {
        id: newId,
        name: newCustomer.name,
        phone: newCustomer.phone,
        email: newCustomer.email || 'customer@optivision.vn',
        tier: newCustomer.tier,
        tierClass: newCustomer.tier.includes('VIP') ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container text-on-surface',
        age: 30,
        gender: newCustomer.gender,
        pts: '100 pts',
        rx: newCustomer.rx,
        lastOrder: 'Mới đăng ký',
        address: newCustomer.address || 'TP. Hồ Chí Minh',
        avatar: activeCustomer.avatar
      };
      setCustomerList([created, ...customerList]);
      setSelectedCustomerId(newId);
      setIsCreateModalOpen(false);
      setNewCustomer({ name: '', phone: '', email: '', gender: 'Nam', tier: 'Thành Viên', address: '', rx: 'OD: 0.00 | OS: 0.00' });
      message.success(`Đã tạo hồ sơ khách hàng mới: ${created.name} (${newId})!`);
    }
  };

  const handleEditCustomerSubmit = () => {
    setCustomerList(prev => prev.map(c => {
      if (c.id === activeCustomer.id) {
        return {
          ...c,
          name: editFormData.name,
          phone: editFormData.phone,
          email: editFormData.email,
          address: editFormData.address,
          tier: editFormData.tier
        };
      }
      return c;
    }));
    setIsEditModalOpen(false);
    message.success(`Đã cập nhật thông tin khách hàng ${editFormData.name} thành công!`);
  };

  const handleBookingSubmit = () => {
    setIsBookingModalOpen(false);
    message.success(`Đã lên lịch khám thành công cho ${activeCustomer.name} vào lúc ${bookingFormData.time} ngày ${bookingFormData.date}!`);
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="max-w-[1600px] mx-auto p-3.5 sm:p-5 flex flex-col gap-3.5">

        {/* 1. TOP HEADER & CRM ACTIONS */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40">
          <div className="flex flex-col gap-1">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-label-md text-body-sm text-outline">
              <span>KHÁCH HÀNG CRM</span>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span>HỒ SƠ KHÁCH HÀNG 360°</span>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="text-primary font-semibold">Chi Tiết Hồ Sơ &amp; Lịch Sử Thị Lực</span>
            </nav>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md">
                <span className="material-symbols-outlined text-[13px] text-primary">security</span>
                Dữ Liệu Y Khoa Bảo Mật
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-mono text-label-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Đồng Bộ Trực Tiếp POS
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setIsCreateModalOpen(true)} className="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-1.5 shadow-xs hover:bg-primary-container transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span>Tạo Khách Mới</span>
              <span className="px-1.5 py-0.2 rounded bg-on-primary/20 text-on-primary font-label-mono text-[10px]">F1</span>
            </button>
            <button onClick={() => setIsBookingModalOpen(true)} className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-lg text-label-lg flex items-center gap-1.5 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[16px] text-primary">event</span>
              <span>Đặt Lịch Đo</span>
              <span className="px-1.5 py-0.2 rounded bg-surface-container-highest font-label-mono text-[10px]">F2</span>
            </button>
            <button onClick={() => handleAction('Chuyển sang màn hình POS [F3]')} className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-lg text-label-lg flex items-center gap-1.5 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[16px] text-primary">point_of_sale</span>
              <span>Tạo Đơn Bán</span>
              <span className="px-1.5 py-0.2 rounded bg-surface-container-highest font-label-mono text-[10px]">F3</span>
            </button>
            <button onClick={() => handleAction('Mở cổng nhắn Zalo ZNS / SMS chăm sóc')} className="px-3 py-1.5 rounded-xl bg-surface-container-low text-primary hover:bg-secondary-fixed transition-all font-label-lg text-label-lg flex items-center gap-1.5 cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">mark_chat_read</span>
              <span>Zalo ZNS / SMS</span>
            </button>
            <button onClick={() => handleAction('Đang xuất hồ sơ y tế A5 PDF...')} className="p-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-all cursor-pointer" title="Xuất PDF/A5 Y Tế">
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            </button>
          </div>
        </div>

        {/* 2. 4 COMPACT CRM KPI METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Tổng Khách Hàng Hệ Thống</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-primary tracking-tight">42,850</span>
                  <span className="font-label-md text-label-md text-primary font-semibold">+18.4% YoY</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">group</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
              <span>Flagship Q.1: <strong className="text-on-surface font-semibold">18,240</strong></span>
              <span>Active 30 ngày: <strong className="text-primary font-semibold">3,120</strong></span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Phân Hạng Hội Viên VIP</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-on-surface tracking-tight">85% VIP</span>
                  <span className="font-label-md text-label-md text-secondary">4 Tier Level</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] space-y-1">
              <div className="w-full h-1.5 rounded-full bg-surface-container flex overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '45%' }}></div>
                <div className="h-full bg-secondary" style={{ width: '28%' }}></div>
                <div className="h-full bg-secondary-fixed-dim" style={{ width: '12%' }}></div>
                <div className="h-full bg-surface-dim" style={{ width: '15%' }}></div>
              </div>
              <div className="flex items-center justify-between font-label-mono text-[10px] text-outline">
                <span>Silver 45%</span>
                <span>Gold 28%</span>
                <span>Plat 12%</span>
                <span className="text-primary font-semibold">1.42M pts</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Cảnh Báo Tái Khám (6T)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-error tracking-tight">142</span>
                  <span className="font-label-md text-label-md text-error font-medium">Khách đến hạn</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">notification_important</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] flex items-center justify-between font-body-sm text-body-sm">
              <span className="text-on-surface-variant truncate">Cần kích hoạt ZNS định kỳ</span>
              <button onClick={() => handleAction('Đã gửi thông báo ZNS hàng loạt tới 142 khách hàng')} className="px-2 py-0.5 bg-primary text-on-primary rounded text-[10px] font-semibold hover:bg-primary-container shrink-0 cursor-pointer">
                Gửi hàng loạt
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Chất Lượng CSAT / NPS</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-primary tracking-tight">98.4%</span>
                  <span className="font-label-md text-label-md text-primary font-bold">NPS +78</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">sentiment_very_satisfied</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
              <span className="truncate">Chuẩn ISO Y Tế &amp; Mài Lắp QC Pass</span>
            </div>
          </div>
        </div>

        {/* 3. TWO-COLUMN CRM DIRECTORY VS 360 PROFILE */}
        <div className="grid grid-cols-12 gap-3.5 items-start">

          {/* Left Column (4/12): Patient List */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-2.5">

            {/* Search and Tag filter */}
            <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 flex flex-col gap-2">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input
                  className="w-full pl-9 pr-20 py-1.5 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-xl focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Tìm tên, SĐT, CCCD..."
                  type="text"
                  defaultValue="Nguyễn Hoàng Duy"
                />
                <button onClick={() => handleAction('Quét QR thẻ thành viên camera')} className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-surface-container text-primary hover:bg-secondary-fixed text-[10px] font-label-mono rounded-lg flex items-center gap-1 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-[13px]">qr_code_scanner</span>
                  QR
                </button>
              </div>

              <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap pb-0.5 text-label-md font-label-md">
                <button className="px-2.5 py-1 rounded-full bg-primary text-on-primary shrink-0 transition-colors cursor-pointer">Tất cả (42.8k)</button>
                <button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high shrink-0 transition-colors cursor-pointer">VIP Gold/Plat</button>
                <button className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container hover:opacity-90 shrink-0 flex items-center gap-1 transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  Tái khám (142)
                </button>
                <button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high shrink-0 transition-colors cursor-pointer">Mới đăng ký</button>
              </div>
            </div>

            {/* Customer List items */}
            <div className="flex flex-col gap-2 max-h-[720px] overflow-y-auto pr-0.5">
              {customerList.map((item) => {
                const isSelected = selectedCustomerId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedCustomerId(item.id);
                      setEditFormData({
                        name: item.name,
                        phone: item.phone,
                        email: item.email || '',
                        address: item.address || '',
                        tier: item.tier
                      });
                    }}
                    className={`p-3 rounded-xl transition-all cursor-pointer relative border ${
                      isSelected
                        ? 'bg-surface-container-lowest border-primary/30 shadow-sm ring-1 ring-primary/20'
                        : 'bg-surface-container-lowest border-[#d8e3fb]/40 hover:border-primary/20 hover:shadow-xs'
                    }`}
                  >
                    {isSelected && <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>}
                    <div className="flex items-start justify-between pl-1">
                      <div className="flex items-center gap-2.5">
                        <div className="relative">
                          <img className="w-9 h-9 rounded-xl object-cover shadow-xs" alt={item.name} src={item.avatar} />
                          {isSelected && <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary text-on-primary text-[8px] flex items-center justify-center font-bold">✓</span>}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-title-md text-title-md text-on-surface font-semibold">{item.name}</span>
                            <span className={`px-1.5 py-0.2 rounded-full font-label-md text-[10px] font-semibold ${item.tierClass}`}>
                              {item.tier}
                            </span>
                          </div>
                          <div className="font-label-mono text-body-sm text-outline">
                            {item.id} • {item.age}t • {item.gender}
                          </div>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container font-label-mono text-[10px] text-on-surface-variant">{item.pts}</span>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px] bg-surface-container-low p-1.5 rounded-lg font-body-sm pl-1.5">
                      <div className="flex flex-col">
                        <span className="text-outline text-[10px]">Độ đo gần nhất:</span>
                        <span className="font-label-mono text-primary font-semibold">{item.rx}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-outline text-[10px]">Đơn gần nhất:</span>
                        <span className="text-on-surface truncate">{item.lastOrder}</span>
                      </div>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between font-label-mono text-[11px] text-outline pl-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-primary">phone</span>
                        {item.phone}
                      </span>
                      {isSelected ? (
                        <span className="text-primary font-semibold flex items-center gap-0.5">
                          Đang xem
                          <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                        </span>
                      ) : (
                        <span className="text-outline hover:text-primary">Xem hồ sơ</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (8/12): Customer 360 Full Profile */}
          <div className="col-span-12 xl:col-span-8 flex flex-col gap-3.5">

            {/* Profile Overview Card */}
            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 flex flex-col gap-3 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img
                    className="w-14 h-14 rounded-2xl object-cover shadow-sm shrink-0"
                    alt={activeCustomer.name}
                    src={activeCustomer.avatar}
                  />
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-headline-md text-headline-md text-on-surface">{activeCustomer.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold">{activeCustomer.tier}</span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-mono text-[11px]">{activeCustomer.id}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-body-sm font-body-sm text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-outline">call</span>
                        {activeCustomer.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-outline">mail</span>
                        {activeCustomer.email || 'customer@optivision.vn'}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-outline">calendar_month</span>
                        Hồ sơ thị lực lưu trữ
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-body-sm font-body-sm text-outline">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {activeCustomer.address || 'TP. Hồ Chí Minh'}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditFormData({
                          name: activeCustomer.name,
                          phone: activeCustomer.phone,
                          email: activeCustomer.email || '',
                          address: activeCustomer.address || '',
                          tier: activeCustomer.tier
                        });
                        setIsEditModalOpen(true);
                      }}
                      className="px-2.5 py-1 bg-surface-container text-primary hover:bg-secondary-fixed rounded-lg font-label-md text-label-md flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">edit</span>
                      Sửa
                    </button>
                    <button onClick={() => handleAction('Đã lưu ghi chú chăm sóc khách hàng')} className="p-1 bg-surface-container hover:bg-surface-container-high text-on-surface-variant rounded-lg transition-colors cursor-pointer" title="Thêm ghi chú">
                      <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
                    </button>
                  </div>
                  <span className="font-label-mono text-[10px] text-outline">Cập nhật bởi KTV Khúc Xạ</span>
                </div>
              </div>

              {/* 4 Stat Boxes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 bg-surface-container-low p-2.5 rounded-xl border border-[#d8e3fb]/40">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-outline">Tổng Chi Tiêu (LTV)</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">18,650,000 đ</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">5 đơn hoàn tất</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-outline">Điểm Tích Lũy</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline-sm text-headline-sm text-secondary font-bold">450</span>
                    <span className="font-label-mono text-label-mono text-outline">OptiPoints</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">~ 45,000đ khấu trừ POS</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-outline">Lịch Sử Đo Khám</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">4 Lần Đo</span>
                  <span className="font-body-sm text-body-sm text-primary font-semibold">Tái khám: Định kỳ 6T</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-outline">Chỉ Số Bảo Hành</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">0 Lỗi / 0 Khiếu nại</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Hài lòng: 100%</span>
                </div>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-[#d8e3fb]/40 overflow-x-auto whitespace-nowrap">
              {[
                { id: 'rx', label: 'Hồ Sơ Thị Lực & Biểu Đồ OD/OS (FR-CUS-05)', icon: 'biotech' },
                { id: 'orders', label: 'Lịch Sử Mua Hàng & Đơn Kính (5)', icon: 'receipt_long' },
                { id: 'warranty', label: 'Bảo Hành & Đổi Trả (2)', icon: 'verified' },
                { id: 'notes', label: 'Nhật Ký Chăm Sóc CRM & Hẹn', icon: 'support_agent' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-1.5 px-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Diopter Progression Chart Card */}
            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 flex flex-col gap-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <span className="font-title-md text-title-md text-on-surface font-semibold block">Tiến Triển Độ Cận &amp; Loạn Thị (Diopter Progression Curve)</span>
                  <span className="font-body-sm text-body-sm text-outline">Dữ liệu khúc xạ OD &amp; OS (2023 - 2026) chuẩn ISO 13666</span>
                </div>
                <div className="flex items-center gap-3 font-label-md text-label-md">
                  <span className="flex items-center gap-1 text-primary">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    Mắt Phải (OD)
                  </span>
                  <span className="flex items-center gap-1 text-secondary">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    Mắt Trái (OS)
                  </span>
                </div>
              </div>

              {/* Chart SVG */}
              <div className="w-full bg-surface-container-low p-2.5 rounded-xl border border-[#d8e3fb]/40">
                <svg className="w-full h-36 overflow-visible" viewBox="0 0 760 160">
                  <line className="text-surface-variant" stroke="currentColor" strokeDasharray="4" x1="50" x2="730" y1="20" y2="20"></line>
                  <text className="fill-current text-outline font-label-mono text-[9px]" textAnchor="end" x="35" y="24">-2.00D</text>
                  <line className="text-surface-variant" stroke="currentColor" strokeDasharray="4" x1="50" x2="730" y1="55" y2="55"></line>
                  <text className="fill-current text-outline font-label-mono text-[9px]" textAnchor="end" x="35" y="59">-2.50D</text>
                  <line className="text-surface-variant" stroke="currentColor" strokeDasharray="4" x1="50" x2="730" y1="90" y2="90"></line>
                  <text className="fill-current text-outline font-label-mono text-[9px]" textAnchor="end" x="35" y="94">-3.00D</text>
                  <line className="text-surface-variant" stroke="currentColor" strokeDasharray="4" x1="50" x2="730" y1="125" y2="125"></line>
                  <text className="fill-current text-outline font-label-mono text-[9px]" textAnchor="end" x="35" y="129">-3.50D</text>

                  <text className="fill-current text-outline font-label-mono text-[10px]" textAnchor="middle" x="120" y="148">14/03/2023</text>
                  <text className="fill-current text-outline font-label-mono text-[10px]" textAnchor="middle" x="310" y="148">20/10/2024</text>
                  <text className="fill-current text-outline font-label-mono text-[10px]" textAnchor="middle" x="500" y="148">15/04/2025</text>
                  <text className="fill-current text-primary font-label-mono font-semibold text-[10px]" textAnchor="middle" x="680" y="148">Hôm Nay (04/2026)</text>

                  {/* OS Curve */}
                  <path d="M 120 38 L 310 55 L 500 55 L 680 72" fill="none" stroke="#19648f" strokeDasharray="5 3" strokeWidth="2.5"></path>
                  {/* OD Curve */}
                  <path d="M 120 55 L 310 72 L 500 90 L 680 108" fill="none" stroke="#004967" strokeWidth="3"></path>

                  <circle cx="120" cy="55" fill="#004967" r="4"></circle>
                  <text className="fill-current text-primary font-label-mono text-[9px]" textAnchor="middle" x="120" y="47">-2.50</text>
                  <circle cx="310" cy="72" fill="#004967" r="4"></circle>
                  <text className="fill-current text-primary font-label-mono text-[9px]" textAnchor="middle" x="310" y="64">-2.75</text>
                  <circle cx="500" cy="90" fill="#004967" r="4"></circle>
                  <text className="fill-current text-primary font-label-mono text-[9px]" textAnchor="middle" x="500" y="82">-3.00</text>
                  <circle cx="680" cy="108" fill="#004967" r="5"></circle>
                  <text className="fill-current text-primary font-label-mono font-bold text-[10px]" textAnchor="middle" x="680" y="99">-3.25D</text>

                  <circle cx="120" cy="38" fill="#19648f" r="3.5"></circle>
                  <circle cx="310" cy="55" fill="#19648f" r="3.5"></circle>
                  <circle cx="500" cy="55" fill="#19648f" r="3.5"></circle>
                  <circle cx="680" cy="72" fill="#19648f" r="4.5"></circle>
                  <text className="fill-current text-secondary font-label-mono font-bold text-[10px]" textAnchor="middle" x="680" y="63">-2.75D</text>
                </svg>
              </div>

              {/* Assessment */}
              <div className="p-2.5 bg-surface-container rounded-xl flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">clinical_notes</span>
                <div className="font-body-md text-body-md text-on-surface leading-snug">
                  <strong className="text-primary font-semibold">Đánh giá chuyên môn Bác sĩ Khúc Xạ:</strong>
                  {' '}Tốc độ tiến triển khúc xạ ổn định. Mắt phải tăng nhẹ -0.25D sau 12 tháng do công việc phần mềm nhìn gần kéo dài. Trục loạn thị không biến thiên (OD 180°, OS 175°). Duy trì kiểm tra định kỳ 6 tháng.
                </div>
              </div>
            </div>

            {/* Prescriptions History Table */}
            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-title-md text-title-md text-on-surface font-semibold block">Lịch Sử Toa Kính &amp; Hồ Sơ Lâm Sàng</span>
                  <span className="font-body-sm text-body-sm text-outline">Bảo toàn vĩnh viễn theo chuẩn Y Khoa NFR-SEC-04</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleAction('Đang mở chi tiết Toa Kính #RX-2026-889')} className="px-2.5 py-1 bg-primary text-on-primary rounded-lg text-label-md font-label-md flex items-center gap-1 shadow-xs hover:bg-primary-container transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-[15px]">visibility</span>
                    Xem #RX-2026-889
                  </button>
                  <button onClick={() => handleAction('Đã gửi lệnh in sổ khám A5 ra máy in')} className="px-2.5 py-1 bg-surface-container text-on-surface rounded-lg text-label-md font-label-md flex items-center gap-1 hover:bg-surface-container-high transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-[15px]">print</span>
                    In Sổ (A5)
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#d8e3fb]/40">
                <table className="w-full text-left font-body-md text-body-md">
                  <thead className="bg-surface-container-low text-outline font-label-md text-label-md uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Toa Kính</th>
                      <th className="py-2.5 px-3">Bác sĩ / KTV</th>
                      <th className="py-2.5 px-3">Mắt Phải (OD)</th>
                      <th className="py-2.5 px-3">Mắt Trái (OS)</th>
                      <th className="py-2.5 px-2">PD / VA</th>
                      <th className="py-2.5 px-3">Tròng Kê Đơn</th>
                      <th className="py-2.5 px-3 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d8e3fb]/30 text-on-surface">
                    <tr className="bg-surface-container/40 hover:bg-surface-container transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                          <div>
                            <strong className="font-label-mono text-primary font-bold block text-[12px]">#RX-2026-889</strong>
                            <span className="font-body-sm text-[11px] text-outline">10:15 Hôm nay</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-title-md text-[12px] text-on-surface block font-semibold">BS. CKI Vũ Anh Tuấn</span>
                        <span className="text-[10px] text-outline">Phòng Khúc Xạ Q.1</span>
                      </td>
                      <td className="py-2.5 px-3 font-label-mono text-[12px]">
                        <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-primary font-bold">
                          -3.25 | -0.75 | 180°
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-label-mono text-[12px]">
                        <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-secondary font-bold">
                          -2.75 | -0.50 | 175°
                        </span>
                      </td>
                      <td className="py-2.5 px-2 font-label-mono text-[11px]">
                        <span>PD: <strong>64mm</strong></span>
                        <span className="block text-primary font-semibold">VA: 10/10</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-on-surface text-[12px]">Essilor Crizal Sapphire HR 1.67</span>
                          <span className="font-label-md text-[10px] text-primary">Đã đẩy POS Thu Ngân</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button onClick={() => handleAction('Tái nạp toa sang POS')} className="px-2 py-0.5 bg-primary text-on-primary rounded text-[11px] font-label-md hover:bg-primary-container transition-all cursor-pointer">
                          Tái đặt POS
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-2.5 px-3">
                        <span className="font-label-mono text-on-surface font-semibold block text-[12px]">#RX-2025-412</span>
                        <span className="text-[11px] text-outline">15/04/2025</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="text-[12px] text-on-surface block font-medium">BS. Trần Minh Khôi</span>
                        <span className="text-[10px] text-outline">Phòng Khúc Xạ Q.1</span>
                      </td>
                      <td className="py-2.5 px-3 font-label-mono text-[11px] text-on-surface-variant">
                        -3.00 | -0.50 | 180°
                      </td>
                      <td className="py-2.5 px-3 font-label-mono text-[11px] text-on-surface-variant">
                        -2.50 | -0.50 | 175°
                      </td>
                      <td className="py-2.5 px-2 font-label-mono text-[11px]">
                        <span>PD: 64mm</span>
                        <span className="block text-outline">VA: 10/10</span>
                      </td>
                      <td className="py-2.5 px-3 text-[12px]">
                        Bolon Acetate + Chemi 1.60
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button onClick={() => handleAction('Xem lại hóa đơn #RX-2025-412')} className="p-1 text-outline hover:text-primary transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-[16px]">receipt</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Workplace ergonomics & Dispensing advice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">laptop_mac</span>
                    <span className="font-title-md text-title-md text-on-surface font-semibold">Thói Quen Thị Giác &amp; Nghề Nghiệp</span>
                  </div>
                  <div className="p-2.5 bg-surface-container-low rounded-xl text-body-sm font-body-sm text-on-surface-variant space-y-1">
                    <div><strong>Kỹ sư phần mềm cao cấp:</strong> Tiếp xúc màn hình OLED/LED 8-10 giờ/ngày.</div>
                    <div className="text-error font-medium">Triệu chứng: Khô mỏi mắt lúc 16h-18h, chói lóa khi lái xe đêm, nhạy cảm ánh sáng xanh 415-455nm.</div>
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between font-label-mono text-[10px] text-outline">
                  <span>Cập nhật 04/2026</span>
                  <span onClick={() => handleAction('Mở bài kiểm tra Schirmer Test')} className="text-primary font-semibold cursor-pointer hover:underline">Khám khô mắt Schirmer →</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">recommend</span>
                    <span className="font-title-md text-title-md text-on-surface font-semibold">Khuyến Cáo Kỹ Thuật Kính (Dispensing Rx)</span>
                  </div>
                  <div className="p-2.5 bg-surface-container-low rounded-xl text-body-sm font-body-sm text-on-surface-variant space-y-1">
                    <div>• <strong>Chiết suất:</strong> 1.60 hoặc 1.67 Aspheric (mỏng hơn 30%, chống quang sai rìa)</div>
                    <div>• <strong>Lớp phủ:</strong> Crizal Blue UV Capture hoặc EyeZen Relax giảm căng điều tiết</div>
                    <div>• <strong>Dáng gọng:</strong> Khuyên dùng gọng có đệm ve mũi rời để chuẩn Vertex Distance 12mm</div>
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <button onClick={() => handleAction('Đã đẩy toa khám sang POS [F3]')} className="flex-1 py-1.5 px-3 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-label-md text-label-md font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer">
                    <span className="material-symbols-outlined text-[15px]">shopping_cart_checkout</span>
                    Đẩy Sang POS [F3]
                  </button>
                  <button onClick={() => handleAction('Đã gửi bản tóm tắt ZNS tới SĐT khách hàng')} className="py-1.5 px-3 bg-surface-container text-on-surface hover:bg-surface-container-high rounded-xl font-label-md text-label-md transition-all flex items-center gap-1 cursor-pointer">
                    <span className="material-symbols-outlined text-[15px]">sms</span>
                    ZNS
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
