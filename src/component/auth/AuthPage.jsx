import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { staffApi } from '../../api/staffApi';
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
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


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


  // Handle Quick Role Switching
  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    const conf = ROLE_CONFIGS[roleKey];
    if (conf) {
      setStaffId(conf.staffId);
      setStoreBranch(conf.branch);
    }
  };

    // Password Strength Evaluator (Simplified)
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '', textColor: '', percent: 0 };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;

    if (score <= 1) return { score, label: 'Yếu', color: 'bg-rose-500', textColor: 'text-rose-600', percent: 33 };
    if (score === 2) return { score, label: 'Trung bình', color: 'bg-amber-500', textColor: 'text-amber-600', percent: 66 };
    return { score, label: 'Mạnh', color: 'bg-emerald-500', textColor: 'text-emerald-600', percent: 100 };
  };

  const passwordStrength = getPasswordStrength(regPassword);
  const isConfirmEntered = regConfirmPassword.length > 0;
  const isPasswordMatch = isConfirmEntered && regPassword === regConfirmPassword;
  const isPasswordMismatch = isConfirmEntered && regPassword !== regConfirmPassword;
// Submit Login
  const handleStaffLogin = async (e) => {
    if (e) e.preventDefault();

    const trimmedStaffId = staffId.trim();
    if (!trimmedStaffId) {
      message.error('Vui lòng nhập Tài khoản, Email hoặc Mã nhân viên!');
      return;
    }
    if (trimmedStaffId.length < 3) {
      message.error('Tài khoản hoặc Mã nhân viên phải có ít nhất 3 ký tự!');
      return;
    }

    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      message.error('Vui lòng nhập Mật khẩu tài khoản nội bộ!');
      return;
    }
    if (trimmedPassword.length < 6) {
      message.error('Mật khẩu phải có tối thiểu 6 ký tự!');
      return;
    }

    setIsSubmitting(true);
    setLoginFeedback(true);

    try {
      const conf = ROLE_CONFIGS[selectedRole];
      const branchObj = BRANCH_OPTIONS.find((b) => b.value === storeBranch);

      const userData = {
        username: trimmedStaffId,
        password: trimmedPassword,
        role: selectedRole,
        staffId: trimmedStaffId,
        staffName: conf ? conf.staffName : 'Nhân Sự OptiVision',
        branchName: branchObj ? branchObj.label : 'Chi nhánh 01 - Flagship Lê Thánh Tôn, Quận 1',
        defaultRoute: conf ? conf.defaultRoute : '/pos'
      };

      const defaultRoute = await login(userData);

      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

      const returnUrl = location.state?.from?.pathname || defaultRoute || conf?.defaultRoute || '/pos';
      navigate(returnUrl, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      message.error(err.message || 'Mật khẩu không chính xác hoặc tài khoản không tồn tại!');
    } finally {
      setIsSubmitting(false);
      setLoginFeedback(false);
    }
  };

  // Submit Registration with Strict Validations
  const handleStaffRegister = async (e) => {
    if (e) e.preventDefault();

    // 1. Họ và tên
    const trimmedName = regFullName.trim();
    if (!trimmedName) {
      message.error('Vui lòng nhập Họ và tên nhân sự!');
      return;
    }
    if (trimmedName.length < 3) {
      message.error('Họ và tên nhân sự phải có tối thiểu 3 ký tự!');
      return;
    }
    if (/^\d+$/.test(trimmedName)) {
      message.error('Họ và tên không hợp lệ (không được chỉ chứa toàn chữ số)!');
      return;
    }

    // 2. Email công vụ
    const trimmedEmail = regEmail.trim();
    if (!trimmedEmail) {
      message.error('Vui lòng nhập Email công vụ (@optivision.vn)!');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      message.error('Email công vụ không đúng định dạng (Ví dụ: ten@optivision.vn)!');
      return;
    }

    // 3. Số điện thoại Việt Nam
    const trimmedPhone = regPhone.trim().replace(/\s+/g, '');
    if (!trimmedPhone) {
      message.error('Vui lòng nhập Số điện thoại liên hệ!');
      return;
    }
    const phoneRegex = /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      message.error('Số điện thoại không hợp lệ! Vui lòng nhập số di động 10 số Việt Nam (đầu 03, 05, 07, 08, 09).');
      return;
    }

    // 4. Mật khẩu: Tối thiểu 8 ký tự, có cả chữ hoa, chữ thường và số
    if (!regPassword) {
      message.error('Vui lòng nhập Mật khẩu khởi tạo!');
      return;
    }
    if (regPassword.length < 8) {
      message.error('Mật khẩu phải có tối thiểu 8 ký tự!');
      return;
    }
    const hasLower = /[a-z]/.test(regPassword);
    const hasUpper = /[A-Z]/.test(regPassword);
    const hasNumber = /\d/.test(regPassword);
    if (!hasLower || !hasUpper) {
      message.error('Mật khẩu phải chứa cả chữ thường (a-z) và chữ in hoa (A-Z)!');
      return;
    }
    if (!hasNumber) {
      message.error('Mật khẩu phải chứa ít nhất 1 chữ số (0-9)!');
      return;
    }

    // 5. Xác nhận mật khẩu
    if (!regConfirmPassword) {
      message.error('Vui lòng nhập lại mật khẩu tại ô Xác nhận mật khẩu!');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      message.error('Mật khẩu xác nhận không trùng khớp với mật khẩu đã nhập!');
      return;
    }

    // 6. Chứng chỉ CCHN nếu là Khúc xạ
    if (regRole === 'optometry' && (!regMedicalCert.trim() || regMedicalCert.trim().length < 4)) {
      message.error('Vui lòng nhập Số Chứng Chỉ Hành Nghề (CCHN) y khoa hợp lệ!');
      return;
    }

    // 7. Chấp thuận bảo mật y khoa
    if (!regAgreed) {
      message.error('Vui lòng tích chọn chấp thuận quy chuẩn bảo mật y khoa ISO 29148!');
      return;
    }

    setIsSubmitting(true);
    try {
      const roleMapping = {
        pos: 'ROLE_SALES_STAFF',
        optometry: 'ROLE_OPTOMETRIST',
        lab: 'ROLE_LAB_TECH',
        admin: 'ROLE_ADMIN'
      };

      const branchObj = BRANCH_OPTIONS.find((b) => b.value === regBranch);
      const randomCode = `STF-${Math.floor(100 + Math.random() * 900)}`;

      const created = await staffApi.createStaff({
        fullName: trimmedName,
        email: trimmedEmail,
        phoneNumber: trimmedPhone,
        branchName: branchObj ? branchObj.label : 'Flagship Q.1 (TP.HCM)',
        employeeCode: randomCode,
        roleName: roleMapping[regRole] || 'ROLE_SALES_STAFF',
        password: regPassword.trim(),
        status: 'PENDING'
      });

      Modal.success({
        title: 'Gửi yêu cầu cấp tài khoản thành công!',
        content: (
          <div className="space-y-2 text-slate-600 text-sm pt-2">
            <p>
              Chào mừng <strong>{trimmedName}</strong>. Yêu cầu cấp tài khoản thuộc phân hệ{' '}
              <strong className="text-[#086288]">{ROLE_CONFIGS[regRole]?.name}</strong> tại chi nhánh{' '}
              <strong>{branchObj?.label}</strong> đã được gửi tới Ban Quản Trị hệ thống ở trạng thái <strong>Chờ Duyệt (PENDING)</strong>.
            </p>
            <p className="p-2 bg-emerald-50 text-emerald-800 rounded text-xs font-mono">
              Mã hồ sơ: {created?.employeeCode || randomCode} • Email: {trimmedEmail}
            </p>
            <p className="text-xs text-slate-500">
              Yêu cầu của bạn hiện đã hiển thị tại mục <strong>"Yêu Cầu Cấp Quyền"</strong> trong trang Quản Trị Nhân Viên (FR-ADM) của Admin để phê duyệt kích hoạt.
            </p>
          </div>
        ),
        onOk: () => {
          setAuthMode('login');
          handleRoleSelect(regRole);
        }
      });
    } catch (err) {
      message.error(`Không thể gửi yêu cầu cấp tài khoản: ${err.message || 'Lỗi kết nối'}`);
    } finally {
      setIsSubmitting(false);
    }
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
                    <span>{authMode === 'login' ? 'Phân Quyền RBAC' : 'Yêu cầu cấp phép'}</span>
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
                      <span className="text-[#40484e] font-normal text-[11px]">Username, Email hoặc Staff ID</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={staffId}
                        onChange={(e) => setStaffId(e.target.value)}
                        placeholder="admin, nv_pos hoặc email..."
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
                          placeholder="Nhập mật khẩu..."
                          className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-sm focus:bg-white focus:ring-2 focus:ring-[#086288] focus:outline-none transition-all border border-transparent focus:border-[#086288]"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-[#004967]">
                          lock
                        </span>
                      </div>

                      {/* Password strength meter - clean & compact */}
                      {regPassword && (
                        <div className="flex flex-col gap-1 pt-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">
                              Độ mạnh: <span className={`font-semibold ${passwordStrength.textColor}`}>{passwordStrength.label}</span>
                            </span>
                            <span className="text-[10px] text-slate-400">≥8 ký tự • Chữ hoa, thường • Số</span>
                          </div>
                          <div className="w-full h-1 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                              style={{ width: `${passwordStrength.percent}%` }}
                            />
                          </div>
                        </div>
                      )}
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
                          placeholder="Nhập lại mật khẩu..."
                          className={`w-full h-11 pl-10 pr-3 rounded-xl text-sm transition-all focus:outline-none ${
                            isPasswordMatch
                              ? 'bg-emerald-50/50 border-2 border-emerald-500 text-slate-900 focus:border-emerald-600'
                              : isPasswordMismatch
                              ? 'bg-rose-50/50 border-2 border-rose-400 text-slate-900 focus:border-rose-500'
                              : 'bg-[#f0f3ff] border border-transparent focus:bg-white focus:ring-2 focus:ring-[#086288]'
                          }`}
                        />
                        <span className={`material-symbols-outlined absolute left-3 top-2.5 text-[20px] ${
                          isPasswordMatch ? 'text-emerald-600' : 'text-[#004967]'
                        }`}>
                          {isPasswordMatch ? 'verified' : 'lock_reset'}
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
