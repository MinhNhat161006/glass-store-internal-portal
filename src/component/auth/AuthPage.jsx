import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { message, Modal } from 'antd';

// Role configuration matching official OptiVision specification
const ROLE_CONFIGS = {
  pos: {
    key: 'pos',
    name: 'Thu Ngân / POS',
    staffId: 'NV-OPT-202688',
    staffName: 'Nguyễn Bán Hàng (Thu Ngân)',
    branch: 'CN-01',
    branchName: 'Chi nhánh 01 - Flagship Lê Thánh Tôn, Quận 1, TP.HCM',
    defaultRoute: '/pos'
  },
  optometry: {
    key: 'optometry',
    name: 'KTV Khúc Xạ',
    staffId: 'KTV-OPT-104592',
    staffName: 'BS. Lê Thị Ánh Tuyết (Khúc Xạ)',
    branch: 'CN-01',
    branchName: 'Chi nhánh 01 - Flagship Lê Thánh Tôn, Quận 1, TP.HCM',
    defaultRoute: '/optometry'
  },
  lab: {
    key: 'lab',
    name: 'KTV Lab Lens',
    staffId: 'LAB-OPT-308115',
    staffName: 'Trần Văn Kỹ Thuật (Lab Lens)',
    branch: 'CN-LAB',
    branchName: 'Trung tâm Gia công & Lab Lens Tân Bình, TP.HCM',
    defaultRoute: '/lab'
  },
  admin: {
    key: 'admin',
    name: 'Quản Trị / Admin',
    staffId: 'ADM-OPT-001099',
    staffName: 'Phạm Quản Trị Hệ Thống',
    branch: 'HQ',
    branchName: 'Trụ sở Quản trị Toàn quốc (OptiVision Head Office)',
    defaultRoute: '/dashboard'
  }
};

const BRANCH_OPTIONS = [
  { value: 'CN-01', label: 'Chi nhánh 01 - Flagship Lê Thánh Tôn, Quận 1, TP.HCM' },
  { value: 'CN-02', label: 'Chi nhánh 02 - Trung tâm Tràng Tiền, Hoàn Kiếm, Hà Nội' },
  { value: 'CN-LAB', label: 'Trung tâm Gia công & Lab Lens Tân Bình, TP.HCM' },
  { value: 'HQ', label: 'Trụ sở Quản trị Toàn quốc (OptiVision Head Office)' }
];

export default function AuthPage({ onLoginSuccess }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');

  // Selected Role for Quick Role Pill Switcher
  const [selectedRole, setSelectedRole] = useState('pos');

  // Form states for Login
  const [storeBranch, setStoreBranch] = useState('CN-01');
  const [staffId, setStaffId] = useState(ROLE_CONFIGS.pos.staffId);
  const [password, setPassword] = useState('Password2026@');
  const [showPassword, setShowPassword] = useState(false);

  // 6-digit OTP state
  const [otpDigits, setOtpDigits] = useState(['7', '4', '1', '9', '0', '2']);
  const [otpTimer, setOtpTimer] = useState(28);
  const otpRefs = useRef([]);

  // Registration Form States
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('pos');
  const [regBranch, setRegBranch] = useState('CN-01');
  const [regMedicalCert, setRegMedicalCert] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAgreed, setRegAgreed] = useState(true);

  // Loading & Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState(false);

  // OTP Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          const randomOtp = Math.floor(100000 + Math.random() * 900000).toString().split('');
          setOtpDigits(randomOtp);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Quick Role Switching
  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    const conf = ROLE_CONFIGS[roleKey];
    if (conf) {
      setStaffId(conf.staffId);
      setStoreBranch(conf.branch);
    }
  };

  // Handle OTP digit changes
  const handleOtpInput = (index, value) => {
    const char = value.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    if (char && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasted)) {
      setOtpDigits(pasted.split(''));
      message.success('Đã dán mã Smart OTP 6 số thành công!');
      otpRefs.current[5]?.focus();
    }
  };

  // Submit Login
  const handleStaffLogin = (e) => {
    if (e) e.preventDefault();

    if (!staffId.trim()) {
      message.error('Vui lòng nhập Mã định danh nhân viên (Staff ID)!');
      return;
    }
    if (!password.trim()) {
      message.error('Vui lòng nhập Mật khẩu tài khoản nội bộ!');
      return;
    }
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 6) {
      message.error('Vui lòng nhập đủ 6 chữ số Smart OTP!');
      return;
    }

    setIsSubmitting(true);
    setLoginFeedback(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const conf = ROLE_CONFIGS[selectedRole];
      const branchObj = BRANCH_OPTIONS.find((b) => b.value === storeBranch);

      const userData = {
        role: selectedRole,
        staffId: staffId,
        staffName: conf ? conf.staffName : 'Nhân Sự OptiVision',
        branchName: branchObj ? branchObj.label : 'Chi nhánh 01 - Flagship Lê Thánh Tôn, Quận 1',
        defaultRoute: conf ? conf.defaultRoute : '/pos'
      };

      const defaultRoute = login(userData);

      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

      const returnUrl = location.state?.from?.pathname || defaultRoute || conf.defaultRoute || '/pos';
      navigate(returnUrl, { replace: true });
    }, 900);
  };

  // Submit Registration
  const handleStaffRegister = (e) => {
    if (e) e.preventDefault();

    if (!regFullName.trim()) {
      message.error('Vui lòng nhập Họ và tên nhân sự!');
      return;
    }
    if (!regEmail.trim()) {
      message.error('Vui lòng nhập Email công vụ (@optivision.vn)!');
      return;
    }
    if (!regPhone.trim()) {
      message.error('Vui lòng nhập Số điện thoại liên hệ!');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      message.error('Mật khẩu phải có tối thiểu 6 ký tự!');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      message.error('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (!regAgreed) {
      message.error('Vui lòng chấp thuận quy chuẩn bảo mật y khoa ISO 29148!');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Modal.success({
        title: 'Hồ sơ đăng ký nhân sự đã được tiếp nhận!',
        content: (
          <div className="space-y-2 text-slate-600 text-sm pt-2">
            <p>
              Chào mừng <strong>{regFullName}</strong>. Yêu cầu cấp tài khoản thuộc phân hệ{' '}
              <strong className="text-[#086288]">{ROLE_CONFIGS[regRole]?.name}</strong> tại chi nhánh{' '}
              <strong>{BRANCH_OPTIONS.find((b) => b.value === regBranch)?.label}</strong> đã được gửi tới Ban Giám Đốc
              và IT Helpdesk.
            </p>
            <p className="p-2 bg-slate-100 rounded text-xs font-mono">
              Mã hồ sơ tiếp nhận: REQ-OPT-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <p className="text-xs text-slate-500">
              Bạn có thể sử dụng các tài khoản tác nghiệp demo có sẵn để trải nghiệm hệ thống ngay.
            </p>
          </div>
        ),
        onOk: () => {
          setAuthMode('login');
          handleRoleSelect(regRole);
        }
      });
    }, 800);
  };

  return (
    <div className="bg-[#f9f9ff] font-sans text-[#111c2d] antialiased min-h-screen flex flex-col justify-between selection:bg-[#c6e7ff]">
      {/* ---------------- 1. FIXED TOP NAVBAR ---------------- */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f9f9ff]/85 backdrop-blur-xl border-b border-[#e7eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 w-full max-w-[1440px] mx-auto px-6 sm:px-8 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3.5 cursor-pointer select-none"
            onClick={() => setAuthMode('login')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#004967] flex items-center justify-center text-white shadow-[0_4px_14px_rgba(8,98,136,0.25)]">
              <span className="material-symbols-outlined text-[24px]">visibility</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl text-[#004967] tracking-tight font-bold leading-tight">OptiVision</span>
              <span className="text-[11px] text-[#40484e] uppercase tracking-wider font-semibold">
                Cổng Vận Hành Nội Bộ
              </span>
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-4">
            <div
              className="hidden sm:flex items-center gap-2 text-[#40484e] bg-[#e7eeff] hover:bg-[#d8e3fb] py-2 px-4 rounded-full text-xs font-medium transition-colors cursor-pointer"
              onClick={() =>
                Modal.info({
                  title: 'Hỗ Trợ Kỹ Thuật IT Helpdesk',
                  content: (
                    <div className="space-y-2 pt-2 text-sm text-slate-600">
                      <p>
                        Hotline nội bộ 24/7: <strong>1800 420 OPTIC (Nhánh 108)</strong>
                      </p>
                      <p>
                        Email hỗ trợ cấp quyền: <strong>it-security@optivision.vn</strong>
                      </p>
                      <p>Kênh trao đổi nội bộ Slack: <strong>#it-support-eyecare</strong></p>
                    </div>
                  )
                })
              }
            >
              <span className="material-symbols-outlined text-[18px] text-[#19648f]">support_agent</span>
              <span className="font-mono">IT Helpdesk / Hotline: +1 (800) 420-OPTIC (Ext 108)</span>
            </div>

            {/* User Icon Badge */}
            <div
              className="w-9 h-9 rounded-full bg-[#004967] hover:bg-[#086288] text-white flex items-center justify-center cursor-pointer shadow-sm transition-all"
              title="Thông tin chứng danh nội bộ"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- 2. MAIN WORKSPACE ---------------- */}
      <main className="w-full pt-28 pb-12 flex-1 flex flex-col justify-center items-center bg-[#f9f9ff]">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* ================= LEFT PANEL: RBAC & Operations Overview ================= */}
            <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-[#f0f3ff] shadow-sm relative overflow-hidden border border-[#d8e3fb]/60">
              {/* Background ambient blurs */}
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#8fcdfd]/20 blur-3xl pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-[#c6e7ff]/30 blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-full gap-8">
                <div className="flex flex-col gap-6">
                  {/* Eyecare Badge */}
                  <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#004967] text-white w-fit shadow-sm">
                      <span className="material-symbols-outlined text-[16px] text-[#c5e7ff]">visibility</span>
                      <span className="text-xs tracking-wide font-semibold">OptiVision Retail & Eyecare</span>
                    </div>
                    <h1 className="text-3xl sm:text-[32px] text-[#004967] tracking-tight font-bold pt-1 leading-snug">
                      Cổng Vận Hành Nội Bộ
                    </h1>
                    <p className="text-sm text-[#40484e] leading-relaxed">
                      Hệ thống quản lý bán hàng, phòng khám đo mắt và trung tâm gia công kính mắt tập trung.
                    </p>
                  </div>

                  {/* 3 Core System Cards */}
                  <div className="flex flex-col gap-3 pt-1">
                    {/* Module 1: POS */}
                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/90 shadow-sm border border-slate-100/90 transition-transform hover:translate-x-1 duration-200">
                      <div className="w-11 h-11 rounded-lg bg-[#c6e7ff]/40 flex items-center justify-center text-[#004967] flex-shrink-0">
                        <span className="material-symbols-outlined text-[22px]">point_of_sale</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-[#004967] font-bold">Bán lẻ & POS</span>
                        <span className="text-xs text-[#40484e]">Thanh toán hóa đơn & quản lý bán lẻ tại điểm</span>
                      </div>
                    </div>

                    {/* Module 2: Optometry */}
                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/90 shadow-sm border border-slate-100/90 transition-transform hover:translate-x-1 duration-200">
                      <div className="w-11 h-11 rounded-lg bg-[#c6e7ff]/40 flex items-center justify-center text-[#004967] flex-shrink-0">
                        <span className="material-symbols-outlined text-[22px]">medical_services</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-[#004967] font-bold">Khúc xạ & Đơn kính</span>
                        <span className="text-xs text-[#40484e]">Hồ sơ thị lực và theo dõi toa thuốc chuẩn y khoa</span>
                      </div>
                    </div>

                    {/* Module 3: Lab & Logistics */}
                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/90 shadow-sm border border-slate-100/90 transition-transform hover:translate-x-1 duration-200">
                      <div className="w-11 h-11 rounded-lg bg-[#c6e7ff]/40 flex items-center justify-center text-[#004967] flex-shrink-0">
                        <span className="material-symbols-outlined text-[22px]">precision_manufacturing</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-[#004967] font-bold">Mài lắp & Kho vận</span>
                        <span className="text-xs text-[#40484e]">Điều phối Lab Lens và kiểm soát tồn kho toàn chuỗi</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Security Notice (Warm Cream Box) */}
                <div className="p-3.5 rounded-xl bg-[#FFEFC4]/70 border border-[#FFEFC4] flex items-center gap-3">
                  <span className="material-symbols-outlined text-[22px] text-[#004967] flex-shrink-0">
                    lock_clock
                  </span>
                  <span className="text-xs text-[#004967] font-medium leading-relaxed">
                    Vui lòng đăng xuất sau ca làm việc và không chia sẻ mã bảo mật OTP.
                  </span>
                </div>
              </div>
            </div>

            {/* ================= RIGHT PANEL: Login / Register Form ================= */}
            <div className="lg:col-span-7 flex flex-col justify-center p-8 sm:p-10 rounded-2xl bg-white shadow-md border border-slate-100">
              {/* Header with Title and Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 gap-3 border-b border-[#e7eeff]">
                <div className="flex flex-col">
                  <h2 className="text-2xl text-[#004967] font-bold">
                    {authMode === 'login' ? 'Đăng Nhập Cổng Nội Bộ' : 'Đăng Ký Tài Khoản Tác Nghiệp'}
                  </h2>
                  <span className="text-xs text-[#40484e]">
                    {authMode === 'login'
                      ? 'Xác thực chứng danh nhân sự y khoa & chuỗi bán lẻ'
                      : 'Cấp mới chứng danh nhân sự y tế & chuỗi cửa hàng mắt kính'}
                  </span>
                </div>

                {/* RBAC + 2FA Badge / Mode Pill */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8fcdfd]/25 text-[#004967] text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-[#19648f]">
                      {authMode === 'login' ? 'encrypted' : 'badge'}
                    </span>
                    <span>{authMode === 'login' ? 'RBAC + 2FA Active' : 'Yêu cầu cấp phép'}</span>
                  </div>

                  {/* Mode Toggle Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === 'login' ? 'register' : 'login');
                      setLoginFeedback(false);
                    }}
                    className="text-xs font-bold text-[#086288] hover:text-[#004967] px-3 py-1 rounded-full bg-[#f0f3ff] hover:bg-[#e7eeff] transition-all border border-[#c6e7ff]"
                  >
                    {authMode === 'login' ? 'Đăng Ký Mới →' : '← Đăng Nhập'}
                  </button>
                </div>
              </div>

              {/* ---------------- A. LOGIN FORM ---------------- */}
              {authMode === 'login' ? (
                <form className="flex flex-col gap-4 mt-5" onSubmit={handleStaffLogin}>
                  {/* Role Fast-Pill Switcher */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#40484e] uppercase tracking-wider font-semibold">
                      Chọn phân hệ tác nghiệp nhanh
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#e7eeff]">
                      {Object.values(ROLE_CONFIGS).map((item) => {
                        const isActive = selectedRole === item.key;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => handleRoleSelect(item.key)}
                            className={`py-2 px-2 rounded-lg text-xs text-center font-bold transition-all ${
                              isActive
                                ? 'bg-[#086288] text-white shadow-sm'
                                : 'text-[#40484e] hover:text-[#111c2d] hover:bg-white/50'
                            }`}
                          >
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Store Branch Selection */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#111c2d]">
                      <span>
                        Cơ sở / Chi nhánh làm việc <span className="text-[#ba1a1a]">*</span>
                      </span>
                      <span className="font-mono text-[#19648f] text-[11px]">ISO-LOC-2026</span>
                    </div>
                    <div className="relative">
                      <select
                        value={storeBranch}
                        onChange={(e) => setStoreBranch(e.target.value)}
                        className="w-full h-12 pl-11 pr-10 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-sm focus:bg-white focus:ring-2 focus:ring-[#086288] focus:outline-none transition-all appearance-none cursor-pointer border border-transparent focus:border-[#086288]"
                      >
                        {BRANCH_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute left-3.5 top-3 text-[20px] text-[#004967] pointer-events-none">
                        storefront
                      </span>
                      <span className="material-symbols-outlined absolute right-3.5 top-3 text-[20px] text-[#40484e] pointer-events-none">
                        arrow_drop_down
                      </span>
                    </div>
                  </div>

                  {/* Staff ID */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#111c2d]">
                      <span>
                        Mã định danh nhân viên (Staff ID) <span className="text-[#ba1a1a]">*</span>
                      </span>
                      <span className="text-[#40484e] font-normal text-[11px]">Định dạng NV-OPT-XXXXXX</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={staffId}
                        onChange={(e) => setStaffId(e.target.value)}
                        placeholder="Nhập mã nhân viên..."
                        className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-sm focus:bg-white focus:ring-2 focus:ring-[#086288] focus:outline-none transition-all placeholder:text-[#70787f] border border-transparent focus:border-[#086288]"
                      />
                      <span className="material-symbols-outlined absolute left-3.5 top-3 text-[20px] text-[#004967]">
                        badge
                      </span>
                    </div>
                  </div>

                  {/* Password with Visibility Toggle */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#111c2d]">
                      <span>
                        Mật khẩu tài khoản nội bộ <span className="text-[#ba1a1a]">*</span>
                      </span>
                      <div className="flex items-center gap-1 text-[#086288]">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span className="font-mono text-[11px]">Mã hóa SHA-256</span>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                        className="w-full h-12 pl-11 pr-12 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-sm focus:bg-white focus:ring-2 focus:ring-[#086288] focus:outline-none transition-all placeholder:text-[#70787f] border border-transparent focus:border-[#086288]"
                      />
                      <span className="material-symbols-outlined absolute left-3.5 top-3 text-[20px] text-[#004967]">
                        lock
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        title="Ẩn/Hiện mật khẩu"
                        className="absolute right-2.5 top-2.5 w-8 h-8 rounded-lg flex items-center justify-center text-[#40484e] hover:text-[#004967] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* 2FA Smart OTP */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#111c2d]">
                      <div className="flex items-center gap-1.5">
                        <span>Mã Smart OTP xác thực 2 bước (2FA)</span>
                        <span className="material-symbols-outlined text-[16px] text-[#19648f]">token</span>
                      </div>
                      <span
                        className="font-mono text-[11px] text-[#40484e] hover:text-[#086288] cursor-pointer flex items-center gap-1"
                        onClick={() => {
                          const randomOtp = Math.floor(100000 + Math.random() * 900000).toString().split('');
                          setOtpDigits(randomOtp);
                          setOtpTimer(30);
                          message.info('Đã tạo mã OTP mới từ YubiKey Authenticator');
                        }}
                      >
                        <span className="material-symbols-outlined text-[14px]">refresh</span>
                        Làm mới: {otpTimer}s
                      </span>
                    </div>

                    {/* 6 OTP Boxes */}
                    <div className="grid grid-cols-6 gap-2" onPaste={handleOtpPaste}>
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => (otpRefs.current[idx] = el)}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpInput(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="h-12 text-center text-xl font-bold rounded-lg bg-[#f0f3ff] text-[#004967] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#086288] border border-transparent focus:border-[#086288] transition-all"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#40484e]">
                      Nhập chuỗi OTP từ ứng dụng OptiVision Authenticator hoặc khóa bảo mật phần cứng YubiKey.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-full bg-[#086288] hover:bg-[#004967] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-75 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">lock_open</span>
                      <span>
                        {isSubmitting ? 'Đang xác thực thông tin...' : 'Đăng nhập ca làm việc (Secure Login)'}
                      </span>
                    </button>

                    {loginFeedback && (
                      <div className="p-2.5 rounded-lg bg-[#c6e7ff] text-[#004967] text-xs text-center font-semibold animate-pulse">
                        Xác thực danh tính &amp; Phân quyền RBAC thành công. Đang tải không gian làm việc...
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                /* ---------------- B. REGISTRATION FORM ---------------- */
                <form className="flex flex-col gap-3.5 mt-5" onSubmit={handleStaffRegister}>
                  {/* Select Role to Register */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[#40484e] uppercase tracking-wider font-semibold">
                      Phân hệ xin cấp quyền công tác <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#e7eeff]">
                      {Object.values(ROLE_CONFIGS).map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setRegRole(item.key)}
                          className={`py-2 px-2 rounded-lg text-xs text-center font-bold transition-all ${
                            regRole === item.key
                              ? 'bg-[#086288] text-white shadow-sm'
                              : 'text-[#40484e] hover:text-[#111c2d]'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Full Name & Staff Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#111c2d]">
                        Họ và tên nhân sự <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={regFullName}
                          onChange={(e) => setRegFullName(e.target.value)}
                          placeholder="Nguyễn Văn A"
                          className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-sm focus:bg-white focus:ring-2 focus:ring-[#086288] focus:outline-none transition-all"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-[#004967]">
                          person
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#111c2d]">
                        Email công vụ <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="staff@optivision.vn"
                          className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-sm focus:bg-white focus:ring-2 focus:ring-[#086288] focus:outline-none transition-all"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-[#004967]">
                          mail
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Phone & Branch */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#111c2d]">
                        Số điện thoại liên hệ <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="0912 345 678"
                          className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-sm focus:bg-white focus:ring-2 focus:ring-[#086288] focus:outline-none transition-all"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-[#004967]">
                          call
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#111c2d]">
                        Chi nhánh công tác <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={regBranch}
                          onChange={(e) => setRegBranch(e.target.value)}
                          className="w-full h-11 pl-10 pr-8 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-sm focus:bg-white focus:ring-2 focus:ring-[#086288] focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {BRANCH_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-[#004967] pointer-events-none">
                          storefront
                        </span>
                        <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-[#40484e] pointer-events-none">
                          arrow_drop_down
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* If Optometry selected: Medical License */}
                  {regRole === 'optometry' && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#111c2d]">
                        Số Chứng Chỉ Hành Nghề Y Khoa (CCHN Khúc Xạ) <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={regMedicalCert}
                          onChange={(e) => setRegMedicalCert(e.target.value)}
                          placeholder="Ví dụ: CCHN-YK-009182/SYT-TPHCM"
                          className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-sm focus:bg-white focus:ring-2 focus:ring-[#086288] focus:outline-none transition-all"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-[#004967]">
                          medical_information
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Password & Confirm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#111c2d]">
                        Mật khẩu khởi tạo <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="Tối thiểu 6 ký tự"
                          className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-sm focus:bg-white focus:ring-2 focus:ring-[#086288] focus:outline-none transition-all"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-[#004967]">
                          lock
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#111c2d]">
                        Xác nhận mật khẩu <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="Nhập lại mật khẩu"
                          className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-sm focus:bg-white focus:ring-2 focus:ring-[#086288] focus:outline-none transition-all"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-[#004967]">
                          lock_reset
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ISO 29148 Compliance Agreement */}
                  <label className="flex items-start gap-2.5 text-xs text-[#40484e] pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={regAgreed}
                      onChange={(e) => setRegAgreed(e.target.checked)}
                      className="mt-0.5 rounded text-[#086288] focus:ring-[#086288]"
                    />
                    <span>
                      Tôi cam kết tuân thủ quy chuẩn bảo mật hồ sơ đơn kính thuốc và bảo mật thông tin y khoa bệnh nhân
                      theo chuẩn ISO/IEC/IEEE 29148:2018 của OptiVision.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-full bg-[#086288] hover:bg-[#004967] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-75 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                      <span>{isSubmitting ? 'Đang gửi hồ sơ...' : 'Gửi hồ sơ đăng ký nhân sự'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ---------------- C. BOTTOM LINKS ---------------- */}
              <div className="mt-6 pt-4 border-t border-[#e7eeff] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <a
                  href="#support"
                  onClick={(e) => {
                    e.preventDefault();
                    Modal.info({
                      title: 'Cấp lại Mật khẩu / IT Helpdesk',
                      content: (
                        <div className="text-slate-600 text-sm space-y-2 pt-2">
                          <p>
                            Vui lòng liên hệ Trưởng ca chi nhánh hoặc IT Helpdesk nội bộ:{' '}
                            <strong className="text-[#086288]">Ext 108</strong> để kích hoạt quy trình xác minh danh tính
                            và cấp lại mật khẩu.
                          </p>
                          <p className="text-xs text-slate-500">
                            Email bảo mật: <strong>security-reset@optivision.vn</strong>
                          </p>
                        </div>
                      )
                    });
                  }}
                  className="text-[#19648f] hover:text-[#004967] flex items-center gap-1.5 transition-colors font-medium"
                >
                  <span className="material-symbols-outlined text-[16px]">contact_support</span>
                  <span>Quên mật khẩu / Yêu cầu cấp lại qua IT Support</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'register' : 'login');
                    setLoginFeedback(false);
                  }}
                  className="text-[#086288] hover:text-[#004967] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>
                    {authMode === 'login'
                      ? 'Chưa có tài khoản? Đăng ký cấp quyền →'
                      : '← Đã có tài khoản? Đăng nhập ca'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ---------------- 3. FOOTER ---------------- */}
      <footer className="w-full bg-white shadow-[0_-1px_8px_rgba(0,0,0,0.02)] py-5 border-t border-[#e7eeff]">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#40484e]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="font-mono text-[#004967] font-bold">OptiVision OS v1.0</span>
            <span className="hidden sm:inline text-[#c0c7cf]">•</span>
            <span>ISO/IEC/IEEE 29148:2018 Optical Specification Compliant</span>
            <span className="hidden sm:inline text-[#c0c7cf]">•</span>
            <span>Encrypted Clinical Dispatch</span>
          </div>

          <div className="flex items-center gap-5">
            <a href="#notice" className="hover:text-[#004967] transition-colors">
              Security Notice
            </a>
            <a href="#support" className="hover:text-[#004967] transition-colors">
              Dispensing Support
            </a>
            <span className="font-mono text-[#70787f]">© 2026 OptiVision Retail Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
