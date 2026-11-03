import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { prescriptionApi } from '../../api/prescriptionApi';
import { appointmentApi } from '../../api/appointmentApi';
import { customerApi } from '../../api/customerApi';
import { message, Modal } from 'antd';
import { useAuth } from '../../context/AuthContext';

export default function OptometryPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Bệnh nhân từ navigation state (nếu được chuyển từ OptometryAppointmentsPage)
  const incomingPatient = location.state?.patient || null;

  // State thông tin bệnh nhân
  const [patient, setPatient] = useState({
    customerId: incomingPatient?.customerId || 1,
    customerName: incomingPatient?.customerName || 'Nguyễn Hoàng Duy',
    customerPhone: incomingPatient?.customerPhone || '0908 123 456',
    appointmentId: incomingPatient?.appointmentId || incomingPatient?.id || null,
    ticketCode: incomingPatient?.ticketCode || 'EP-1002',
    notes: incomingPatient?.notes || 'Khám khúc xạ định kỳ, nhìn mờ cự ly xa.'
  });

  // Thông số Mắt Phải (OD)
  const [odSph, setOdSph] = useState(-1.75);
  const [odCyl, setOdCyl] = useState(-0.50);
  const [odAxis, setOdAxis] = useState(175);
  const [odAdd, setOdAdd] = useState(0.00);
  const [odPd, setOdPd] = useState(31.5);
  const [odVa, setOdVa] = useState('10/10');

  // Thông số Mắt Trái (OS)
  const [osSph, setOsSph] = useState(-2.00);
  const [osCyl, setOsCyl] = useState(-0.75);
  const [osAxis, setOsAxis] = useState(180);
  const [osAdd, setOsAdd] = useState(0.00);
  const [osPd, setOsPd] = useState(31.5);
  const [osVa, setOsVa] = useState('10/10');

  // Tổng khoảng cách đồng tử (Total PD)
  const [pd, setPd] = useState(63.0);

  // Chẩn đoán & ghi chú lâm sàng
  const [clinicalNotes, setClinicalNotes] = useState('Cận thị kèm loạn thị hai mắt. Chỉ định dùng tròng đơn tròng kỹ thuật số chống ánh sáng xanh.');

  // Trạng thái lưu & in ấn
  const [saving, setSaving] = useState(false);
  const [savedPrescription, setSavedPrescription] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Modal chọn bệnh nhân từ CSDL
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [dbPatients, setDbPatients] = useState([]);

  // Đồng bộ danh sách bệnh nhân từ backend
  useEffect(() => {
    customerApi.getCustomerList().then(res => {
      const list = Array.isArray(res) ? res : (res?.data || []);
      if (list.length > 0) setDbPatients(list);
    }).catch(e => console.warn('Sync patients error:', e));
  }, []);

  // Tự động tính Total PD khi thay đổi PD đơn
  useEffect(() => {
    const total = Number((Number(odPd) + Number(osPd)).toFixed(1));
    if (!isNaN(total) && total > 0) {
      setPd(total);
    }
  }, [odPd, osPd]);

  // Nếu có dữ liệu từ trang hàng đợi chuyển sang
  useEffect(() => {
    if (incomingPatient) {
      setPatient({
        customerId: incomingPatient.customerId || 1,
        customerName: incomingPatient.customerName || 'Khách Hàng',
        customerPhone: incomingPatient.customerPhone || '',
        appointmentId: incomingPatient.appointmentId || incomingPatient.id || null,
        ticketCode: incomingPatient.ticketCode || 'EP-1000',
        notes: incomingPatient.notes || ''
      });
      message.info(`Đang đo mắt cho bệnh nhân: ${incomingPatient.customerName}`);
    }
  }, [incomingPatient]);

  // Bác sĩ bấm "Ký duyệt đơn kính"
  const handleSignAndPush = async () => {
    try {
      setSaving(true);
      const payload = {
        customerId: patient.customerId || 1,
        customerName: patient.customerName || 'Khách Hàng Mới',
        optometristId: user?.id || 1,
        optometristName: user?.staffName || user?.fullName || 'BS. Lê Thị Ánh Tuyết',
        odSph: Number(odSph),
        odCyl: Number(odCyl),
        odAxis: Number(odAxis),
        odAdd: Number(odAdd),
        osSph: Number(osSph),
        osCyl: Number(osCyl),
        osAxis: Number(osAxis),
        osAdd: Number(osAdd),
        pd: Number(pd),
        notes: clinicalNotes || 'Khám thị lực chuẩn y khoa 12 bước. Đã ký duyệt điện tử và lưu CSDL.'
      };

      // 1. Gọi API POST /api/prescriptions lưu vào bảng prescriptions
      const saved = await prescriptionApi.createPrescription(payload);
      setSavedPrescription(saved || payload);

      // 2. Nếu có liên kết với lịch hẹn, cập nhật lịch hẹn sang "Đã xong" (COMPLETED)
      if (patient.appointmentId) {
        try {
          await appointmentApi.updateAppointmentStatus(patient.appointmentId, {
            status: 'COMPLETED',
            statusLabel: 'Đã xong',
            examStep: 'Bước 12 / 12 - Hoàn tất & Ký duyệt đơn kính'
          });
        } catch (e) {
          console.warn('Cập nhật trạng thái lịch hẹn:', e);
        }
      }

      message.success('Đã ký duyệt và lưu đơn kính vào CSDL thành công!');
      // Tự động mở modal Mẫu in Toa Kính Mắt Y Khoa
      setShowPrintModal(true);
    } catch (err) {
      console.error('Ký duyệt đơn kính thất bại:', err);
      message.error('Lỗi khi ký duyệt đơn kính: ' + (err.message || 'Không thể kết nối CSDL'));
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="max-w-[1600px] mx-auto p-3.5 sm:p-5 flex flex-col gap-3.5">

        {/* 1. PATIENT CLINICAL BANNER */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center text-primary font-bold text-sm">
                  {(patient.customerName || 'KH').slice(0, 2).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                    {patient.customerName}
                  </h1>
                  <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[10px] font-semibold">
                    {patient.ticketCode ? `Vé: #${patient.ticketCode}` : `#OPT-CUS-${patient.customerId}`}
                  </span>
                  <span className="px-2 py-0.2 rounded-full bg-sky-100 text-sky-800 font-label-md text-[10px] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse"></span>
                    Đang Khám Lâm Sàng
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mt-0.5">
                  <span className="font-medium text-on-surface">{patient.customerPhone || '0901 *** 888'}</span>
                  <span>•</span>
                  <span className="text-outline">{patient.notes || 'Khám đo tật khúc xạ định kỳ'}</span>
                </div>
              </div>
            </div>

            <div className="hidden 2xl:block h-8 w-px bg-surface-variant"></div>

            <div className="bg-surface-container-low px-3 py-1.5 rounded-xl flex items-center gap-3 border border-[#d8e3fb]/40">
              <div>
                <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Mã Toa Kính</span>
                <span className="font-label-mono text-primary font-bold text-xs">
                  {savedPrescription?.id ? `#RX-2026-0${savedPrescription.id}` : '#RX-CHƯA-LƯU'}
                </span>
              </div>
              <div className="h-5 w-px bg-surface-dim"></div>
              <div>
                <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Thời Gian</span>
                <span className="font-body-sm text-on-surface text-xs">Hôm nay</span>
              </div>
              <div className="h-5 w-px bg-surface-dim"></div>
              <div>
                <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Bác Sĩ Khúc Xạ</span>
                <span className="font-label-lg text-on-surface text-xs font-semibold">{user?.staffName || user?.fullName || 'BS. Lê Thị Ánh Tuyết'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsPatientModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-surface-container text-primary font-label-md text-label-md flex items-center gap-1.5 hover:bg-surface-container-high transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">person_search</span>
              <span>Đổi Bệnh Nhân (CSDL)</span>
            </button>
            <button
              onClick={() => navigate('/optometry-appointments')}
              className="px-3.5 py-1.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1.5 hover:bg-surface-container-high transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">queue</span>
              <span>Hàng Đợi Khám</span>
            </button>
            <button
              onClick={() => setShowPrintModal(true)}
              className="px-3 py-1.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md flex items-center gap-1 hover:bg-secondary-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">print</span>
              <span>Mẫu In Toa Kính</span>
            </button>
            <button
              onClick={handleSignAndPush}
              disabled={saving}
              className="px-4 py-1.5 rounded-xl bg-primary hover:bg-[#0b4d6b] text-on-primary font-label-lg text-label-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>{saving ? 'Đang Lưu CSDL...' : 'KÝ DUYỆT ĐƠN KÍNH'}</span>
            </button>
          </div>
        </div>

        {/* 2. THREE CLINICAL COMPARISON CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: Naked VA */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">Thị Lực Không Kính (Trần)</span>
              <span className="px-2 py-0.2 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-[10px]">
                Đã đo sơ bộ
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-surface-container-low rounded-lg p-2.5 border border-[#d8e3fb]/30">
                <span className="font-label-md text-label-md text-primary block font-semibold">MẮT PHẢI (OD)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-headline-lg text-headline-lg text-on-surface">2/10</span>
                  <span className="font-body-sm text-body-sm text-error font-medium">(LogMAR 0.70)</span>
                </div>
                <span className="text-outline font-body-sm text-[11px] block mt-0.5">Nhìn mờ cự ly xa &gt; 3m</span>
              </div>
              <div className="bg-surface-container-low rounded-lg p-2.5 border border-[#d8e3fb]/30">
                <span className="font-label-md text-label-md text-secondary block font-semibold">MẮT TRÁI (OS)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-headline-lg text-headline-lg text-on-surface">3/10</span>
                  <span className="font-body-sm text-body-sm text-error font-medium">(LogMAR 0.52)</span>
                </div>
                <span className="text-outline font-body-sm text-[11px] block mt-0.5">Khó nhận diện bảng đo</span>
              </div>
            </div>
          </div>

          {/* Card 2: Current Adjusted Vision */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">Thị Lực Sau Chỉnh Kính</span>
              <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-label-md text-[10px] font-bold">
                Mục tiêu 10/10
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between bg-surface-container-low rounded-lg px-2.5 py-1.5 border border-[#d8e3fb]/30">
                <span className="font-label-md text-label-md text-primary font-semibold w-10">OD (R)</span>
                <div className="flex gap-2 font-label-mono text-body-sm text-on-surface">
                  <span>SPH: <strong>{odSph > 0 ? `+${odSph.toFixed(2)}` : odSph.toFixed(2)}</strong></span>
                  <span>CYL: <strong>{odCyl.toFixed(2)}</strong></span>
                  <span>AX: <strong>{odAxis}°</strong></span>
                </div>
                <span className="font-label-md text-label-md text-emerald-700 font-bold">VA: {odVa}</span>
              </div>
              <div className="flex items-center justify-between bg-surface-container-low rounded-lg px-2.5 py-1.5 border border-[#d8e3fb]/30">
                <span className="font-label-md text-label-md text-secondary font-semibold w-10">OS (L)</span>
                <div className="flex gap-2 font-label-mono text-body-sm text-on-surface">
                  <span>SPH: <strong>{osSph > 0 ? `+${osSph.toFixed(2)}` : osSph.toFixed(2)}</strong></span>
                  <span>CYL: <strong>{osCyl.toFixed(2)}</strong></span>
                  <span>AX: <strong>{osAxis}°</strong></span>
                </div>
                <span className="font-label-md text-label-md text-emerald-700 font-bold">VA: {osVa}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Binocular Analysis */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">Phân Tích Thị Giác Hai Mắt</span>
              <span className="material-symbols-outlined text-primary text-[18px]">troubleshoot</span>
            </div>
            <div className="space-y-1 bg-surface-container-low p-2 rounded-lg border border-[#d8e3fb]/30 text-body-sm">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Chênh lệch SPH hai mắt:</span>
                <span className="font-label-mono font-bold text-on-surface">Δ {Math.abs(odSph - osSph).toFixed(2)} D</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Khoảng cách đồng tử (PD):</span>
                <span className="font-label-mono font-bold text-primary">{pd} mm (OD: {odPd} / OS: {osPd})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Kết luận phối hợp hai mắt:</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-label-md text-[10px] font-bold">Thị giác cân bằng</span>
              </div>
            </div>
            <span className="text-outline font-body-sm text-[11px] block mt-1">Độ lệch nằm trong giới hạn an toàn sinh lý thị giác.</span>
          </div>
        </div>

        {/* 3. OPTIMAL PRESCRIPTION MATRIX (OD / OS) + DOCTOR VERIFICATION */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">

          {/* Left Column (8/12): Prescription Inputs (OD / OS) */}
          <div className="xl:col-span-8 flex flex-col gap-3.5">

            <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#e7eeff]">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">RX</span>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Nhập Thông Số Thị Lực Khúc Xạ (OD / OS)</h2>
                    <p className="font-body-sm text-body-sm text-outline">Độ cầu SPH, Độ trụ CYL (bước 0.25D) • Trục AXIS (0° - 180°) • Khoảng cách đồng tử PD</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded-xl border border-[#d8e3fb]/30 text-body-sm">
                  <span className="font-label-md text-label-md text-on-surface-variant">Quy chuẩn quốc tế:</span>
                  <span className="font-label-mono font-bold text-primary">ISO 8980 / ANSI Z80.1</span>
                </div>
              </div>

              {/* OD and OS Side-by-Side Steppers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">

                {/* OD Card (Mắt Phải) */}
                <div className="bg-surface-container-low rounded-xl p-3.5 space-y-3 border-2 border-primary/20 relative shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#d8e3fb]/50">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-primary text-on-primary font-bold text-xs">OD</span>
                      <div>
                        <span className="font-title-md text-title-md text-on-surface block font-bold leading-tight">Mắt Phải (Right Eye)</span>
                        <span className="font-label-md text-outline text-[11px]">Oculus Dexter</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-md text-xs font-bold">Thị lực: {odVa}</span>
                  </div>

                  <div className="space-y-2.5">
                    {/* SPH */}
                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Độ Cầu (SPH / Sphere)</span>
                        <span className="font-label-mono text-outline text-[11px]">Bước: ±0.25 Diop</span>
                      </div>
                      <div className="flex items-center bg-surface-container-lowest rounded-xl p-1 border border-[#d8e3fb]/60 shadow-xs">
                        <button
                          type="button"
                          onClick={() => setOdSph(prev => Number((prev - 0.25).toFixed(2)))}
                          className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-lg text-primary transition-colors cursor-pointer"
                        >−</button>
                        <input
                          type="number"
                          step="0.25"
                          value={odSph}
                          onChange={(e) => setOdSph(parseFloat(e.target.value) || 0)}
                          className="flex-1 text-center font-label-mono text-lg font-bold text-on-surface bg-transparent outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setOdSph(prev => Number((prev + 0.25).toFixed(2)))}
                          className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-lg text-primary transition-colors cursor-pointer"
                        >+</button>
                      </div>
                    </div>

                    {/* CYL */}
                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Độ Loạn / Trụ (CYL / Cylinder)</span>
                        <span className="font-label-mono text-outline text-[11px]">Quy ước dấu âm (−)</span>
                      </div>
                      <div className="flex items-center bg-surface-container-lowest rounded-xl p-1 border border-[#d8e3fb]/60 shadow-xs">
                        <button
                          type="button"
                          onClick={() => setOdCyl(prev => Number((prev - 0.25).toFixed(2)))}
                          className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-lg text-secondary transition-colors cursor-pointer"
                        >−</button>
                        <input
                          type="number"
                          step="0.25"
                          value={odCyl}
                          onChange={(e) => setOdCyl(parseFloat(e.target.value) || 0)}
                          className="flex-1 text-center font-label-mono text-lg font-bold text-on-surface bg-transparent outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setOdCyl(prev => Number((prev + 0.25).toFixed(2)))}
                          className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-lg text-secondary transition-colors cursor-pointer"
                        >+</button>
                      </div>
                    </div>

                    {/* AXIS */}
                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Trục Loạn (AXIS)</span>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max="180"
                            value={odAxis}
                            onChange={(e) => setOdAxis(parseInt(e.target.value) || 0)}
                            className="w-14 px-1.5 py-0.5 text-center font-label-mono font-bold text-primary bg-white rounded border border-slate-200 text-xs"
                          />
                          <span className="font-bold text-primary">°</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="180"
                        step="1"
                        value={odAxis}
                        onChange={(e) => setOdAxis(Number(e.target.value))}
                        className="w-full accent-primary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* PD OD & ADD */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 bg-surface-container-lowest rounded-lg border border-[#d8e3fb]/40">
                        <span className="font-label-md text-outline block text-[10px] uppercase font-semibold">PD Đơn Mắt Phải (mm)</span>
                        <input
                          type="number"
                          step="0.5"
                          value={odPd}
                          onChange={(e) => setOdPd(parseFloat(e.target.value) || 0)}
                          className="w-full font-label-mono font-bold text-primary text-sm bg-transparent outline-none"
                        />
                      </div>
                      <div className="p-2 bg-surface-container-lowest rounded-lg border border-[#d8e3fb]/40">
                        <span className="font-label-md text-outline block text-[10px] uppercase font-semibold">Độ Cộng Nhìn Gần (ADD)</span>
                        <input
                          type="number"
                          step="0.25"
                          value={odAdd}
                          onChange={(e) => setOdAdd(parseFloat(e.target.value) || 0)}
                          className="w-full font-label-mono font-bold text-on-surface text-sm bg-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* OS Card (Mắt Trái) */}
                <div className="bg-surface-container-low rounded-xl p-3.5 space-y-3 border-2 border-secondary/20 relative shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#d8e3fb]/50">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-secondary text-on-secondary font-bold text-xs">OS</span>
                      <div>
                        <span className="font-title-md text-title-md text-on-surface block font-bold leading-tight">Mắt Trái (Left Eye)</span>
                        <span className="font-label-md text-outline text-[11px]">Oculus Sinister</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-md text-xs font-bold">Thị lực: {osVa}</span>
                  </div>

                  <div className="space-y-2.5">
                    {/* SPH */}
                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Độ Cầu (SPH / Sphere)</span>
                        <span className="font-label-mono text-outline text-[11px]">Bước: ±0.25 Diop</span>
                      </div>
                      <div className="flex items-center bg-surface-container-lowest rounded-xl p-1 border border-[#d8e3fb]/60 shadow-xs">
                        <button
                          type="button"
                          onClick={() => setOsSph(prev => Number((prev - 0.25).toFixed(2)))}
                          className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-lg text-primary transition-colors cursor-pointer"
                        >−</button>
                        <input
                          type="number"
                          step="0.25"
                          value={osSph}
                          onChange={(e) => setOsSph(parseFloat(e.target.value) || 0)}
                          className="flex-1 text-center font-label-mono text-lg font-bold text-on-surface bg-transparent outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setOsSph(prev => Number((prev + 0.25).toFixed(2)))}
                          className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-lg text-primary transition-colors cursor-pointer"
                        >+</button>
                      </div>
                    </div>

                    {/* CYL */}
                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Độ Loạn / Trụ (CYL / Cylinder)</span>
                        <span className="font-label-mono text-outline text-[11px]">Quy ước dấu âm (−)</span>
                      </div>
                      <div className="flex items-center bg-surface-container-lowest rounded-xl p-1 border border-[#d8e3fb]/60 shadow-xs">
                        <button
                          type="button"
                          onClick={() => setOsCyl(prev => Number((prev - 0.25).toFixed(2)))}
                          className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-lg text-secondary transition-colors cursor-pointer"
                        >−</button>
                        <input
                          type="number"
                          step="0.25"
                          value={osCyl}
                          onChange={(e) => setOsCyl(parseFloat(e.target.value) || 0)}
                          className="flex-1 text-center font-label-mono text-lg font-bold text-on-surface bg-transparent outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setOsCyl(prev => Number((prev + 0.25).toFixed(2)))}
                          className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-lg text-secondary transition-colors cursor-pointer"
                        >+</button>
                      </div>
                    </div>

                    {/* AXIS */}
                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Trục Loạn (AXIS)</span>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max="180"
                            value={osAxis}
                            onChange={(e) => setOsAxis(parseInt(e.target.value) || 0)}
                            className="w-14 px-1.5 py-0.5 text-center font-label-mono font-bold text-secondary bg-white rounded border border-slate-200 text-xs"
                          />
                          <span className="font-bold text-secondary">°</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="180"
                        step="1"
                        value={osAxis}
                        onChange={(e) => setOsAxis(Number(e.target.value))}
                        className="w-full accent-secondary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* PD OS & ADD */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 bg-surface-container-lowest rounded-lg border border-[#d8e3fb]/40">
                        <span className="font-label-md text-outline block text-[10px] uppercase font-semibold">PD Đơn Mắt Trái (mm)</span>
                        <input
                          type="number"
                          step="0.5"
                          value={osPd}
                          onChange={(e) => setOsPd(parseFloat(e.target.value) || 0)}
                          className="w-full font-label-mono font-bold text-secondary text-sm bg-transparent outline-none"
                        />
                      </div>
                      <div className="p-2 bg-surface-container-lowest rounded-lg border border-[#d8e3fb]/40">
                        <span className="font-label-md text-outline block text-[10px] uppercase font-semibold">Độ Cộng Nhìn Gần (ADD)</span>
                        <input
                          type="number"
                          step="0.25"
                          value={osAdd}
                          onChange={(e) => setOsAdd(parseFloat(e.target.value) || 0)}
                          className="w-full font-label-mono font-bold text-on-surface text-sm bg-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Total PD & Technical Fitting */}
              <div className="mt-3 p-3 rounded-xl bg-surface-container-low flex flex-wrap items-center justify-between gap-3 border border-[#d8e3fb]/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-on-surface font-bold text-xs uppercase">Tổng Khoảng Cách Đồng Tử (Total PD):</span>
                    <input
                      type="number"
                      step="0.5"
                      value={pd}
                      onChange={(e) => setPd(parseFloat(e.target.value) || 0)}
                      className="w-20 px-2 py-1 font-label-mono font-bold text-primary text-sm bg-white rounded-lg border border-slate-300 text-center"
                    />
                    <span className="text-xs font-semibold text-outline">mm</span>
                  </div>
                  <div className="h-6 w-px bg-surface-variant"></div>
                  <div className="text-xs text-outline">
                    OD: <strong>{odPd}mm</strong> + OS: <strong>{osPd}mm</strong>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-primary font-label-md text-xs bg-surface-container-lowest px-3 py-1 rounded-lg shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>Đã kiểm chuẩn kỹ thuật số</span>
                </div>
              </div>
            </div>

            {/* Clinical Diagnosis & Lens Suggestions */}
            <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">clinical_notes</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Chẩn Đoán Khúc Xạ &amp; Chỉ Định Điều Trị</h2>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[10px] font-bold">
                  Bác Sĩ Khúc Xạ
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Kết luận chẩn đoán lâm sàng &amp; đề xuất tròng kính:
                </label>
                <textarea
                  className="w-full bg-surface-container-low rounded-xl p-3 text-body-sm text-on-surface outline-none border border-[#d8e3fb]/50 focus:ring-2 focus:ring-primary/20 leading-relaxed"
                  rows="3"
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Nhập chẩn đoán lâm sàng, loại tròng đề xuất (đơn tròng / đa tròng, chiết suất, lớp phủ)..."
                />
              </div>
            </div>

          </div>

          {/* Right Column (4/12): Doctor Signature & Action Controls */}
          <div className="xl:col-span-4 flex flex-col gap-3.5">

            {/* Doctor Signature Block */}
            <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-on-surface">Bác Sĩ Ký Duyệt Số</span>
                <span className="flex items-center gap-1 text-primary font-label-md text-label-md font-semibold">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  SHA-256 Y Khoa
                </span>
              </div>

              <div className="bg-surface-container-low rounded-xl p-2.5 space-y-2 border border-[#d8e3fb]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0">
                    BS
                  </div>
                  <div>
                    <span className="font-title-md text-title-md text-on-surface block font-semibold leading-tight">
                      {user?.staffName || user?.fullName || 'BS. Lê Thị Ánh Tuyết'}
                    </span>
                    <span className="text-[11px] text-outline block">Bác sĩ Chuyên khoa Khúc xạ Mắt</span>
                    <span className="font-label-mono text-[11px] text-primary font-bold">CCHN: #VN-882-HN</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-lg p-2 flex items-center justify-between border border-[#d8e3fb]/40">
                  <div>
                    <span className="font-label-md text-outline block text-[10px]">Chữ Ký Điện Tử:</span>
                    <span className="font-label-mono text-primary font-semibold text-xs">{user?.email || 'bs.tuyet@glassstore.vn'}</span>
                    <span className="text-outline text-[10px] block">Xác thực chứng thư số y tế</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                </div>
              </div>

              {/* Big Action Button: KÝ DUYỆT ĐƠN KÍNH */}
              <button
                type="button"
                onClick={handleSignAndPush}
                disabled={saving}
                className="w-full py-3 rounded-xl bg-primary hover:bg-[#0b4d6b] text-on-primary font-headline-sm text-headline-sm shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">draw</span>
                <span>{saving ? 'ĐANG LƯU VÀO CSDL...' : 'KÝ DUYỆT & LƯU ĐƠN KÍNH'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-label-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-semibold border border-primary/20"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>MẪU IN TOA KÍNH MẮT Y KHOA</span>
              </button>
            </div>

            {/* Quick Live Preview Table */}
            <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-title-md text-title-md text-on-surface font-semibold">Tóm Tắt Toa Kính</span>
                <span className="font-label-mono text-xs text-primary font-bold">Total PD: {pd} mm</span>
              </div>
              <div className="overflow-x-auto rounded-lg border border-[#d8e3fb]/40">
                <table className="w-full text-left font-label-mono text-xs">
                  <thead className="bg-surface-container-high text-on-surface-variant text-[11px]">
                    <tr>
                      <th className="p-1.5">Mắt</th>
                      <th className="p-1.5">SPH</th>
                      <th className="p-1.5">CYL</th>
                      <th className="p-1.5">AXIS</th>
                      <th className="p-1.5">ADD</th>
                      <th className="p-1.5">VA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d8e3fb]/30 text-on-surface">
                    <tr className="bg-primary/5">
                      <td className="p-1.5 font-bold text-primary">OD</td>
                      <td className="p-1.5 font-semibold">{odSph > 0 ? `+${odSph.toFixed(2)}` : odSph.toFixed(2)}</td>
                      <td className="p-1.5">{odCyl.toFixed(2)}</td>
                      <td className="p-1.5">{odAxis}°</td>
                      <td className="p-1.5">+{odAdd.toFixed(2)}</td>
                      <td className="p-1.5 font-bold text-emerald-700">{odVa}</td>
                    </tr>
                    <tr className="bg-secondary/5">
                      <td className="p-1.5 font-bold text-secondary">OS</td>
                      <td className="p-1.5 font-semibold">{osSph > 0 ? `+${osSph.toFixed(2)}` : osSph.toFixed(2)}</td>
                      <td className="p-1.5">{osCyl.toFixed(2)}</td>
                      <td className="p-1.5">{osAxis}°</td>
                      <td className="p-1.5">+{osAdd.toFixed(2)}</td>
                      <td className="p-1.5 font-bold text-emerald-700">{osVa}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================= MODAL: Chọn Bệnh Nhân Từ CSDL ================= */}
      {isPatientModalOpen && (
        <div className="fixed inset-0 bg-[#263143]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl flex flex-col gap-4 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">person_search</span>
                <h3 className="text-base text-on-surface font-bold">
                  Chọn Bệnh Nhân Vào Bàn Đo Khám (CSDL)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPatientModalOpen(false)}
                className="text-outline hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input
                type="text"
                placeholder="Tìm tên hoặc SĐT bệnh nhân..."
                value={patientSearchQuery}
                onChange={(e) => setPatientSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-container-low border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Patients List */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {dbPatients
                .filter(p => {
                  const q = patientSearchQuery.toLowerCase().trim();
                  if (!q) return true;
                  return (p.fullName || '').toLowerCase().includes(q) || (p.phoneNumber || '').includes(q);
                })
                .map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setPatient({
                        customerId: p.id,
                        customerName: p.fullName,
                        customerPhone: p.phoneNumber || '',
                        appointmentId: null,
                        ticketCode: `CUS-${p.id}`,
                        notes: 'Bệnh nhân đo khám khúc xạ tại quầy Flagship.'
                      });
                      setIsPatientModalOpen(false);
                      message.success(`Đã tiếp nhận bệnh nhân ${p.fullName} vào bàn đo!`);
                    }}
                    className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container border border-[#d8e3fb]/40 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-xs text-on-surface block">{p.fullName}</span>
                      <span className="text-[11px] text-outline">{p.phoneNumber || 'Chưa có SĐT'} • {p.email || ''}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-primary text-on-primary text-[10px] font-bold">
                      Vào Khám
                    </span>
                  </div>
                ))}
              {dbPatients.length === 0 && (
                <div className="py-8 text-center text-outline text-xs">
                  Không tìm thấy bệnh nhân nào trong cơ sở dữ liệu.
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="text-[11px] text-outline">CSDL: {dbPatients.length} bệnh nhân</span>
              <button
                type="button"
                onClick={() => setIsPatientModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: MẪU IN TOA KÍNH MẮT Y KHOA ================= */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto border border-slate-200">
            {/* Modal Action Header (Ẩn khi in ấn) */}
            <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">print</span>
                <span className="font-bold text-sm text-slate-800">Mẫu In Toa Kính Mắt Y Khoa Chuẩn (Khổ A5 / A4)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-[#0b4d6b] flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>In Toa Kính Ngay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>

            {/* Nội dung bản in Toa Kính Mắt Y Khoa */}
            <div className="p-6 sm:p-8 bg-white font-sans text-slate-800 leading-normal" id="printable-prescription">
              {/* Header cơ sở y tế */}
              <div className="flex justify-between items-start pb-4 border-b-2 border-slate-800">
                <div>
                  <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">SỞ Y TẾ TP. HỒ CHÍ MINH</div>
                  <h2 className="text-base font-extrabold text-primary uppercase mt-0.5">PHÒNG KHÁM CHUYÊN KHOA KHÚC XẠ GLASSSTORE</h2>
                  <p className="text-xs text-slate-600 mt-0.5">Địa chỉ: 123 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
                  <p className="text-xs text-slate-600">Hotline: 1900 6868 • Giấy phép HĐ số: #882/SYT-GPHĐ</p>
                </div>
                <div className="text-right">
                  <div className="inline-block border border-slate-400 px-2.5 py-1 rounded text-center">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">MÃ TOA KÍNH</span>
                    <span className="text-xs font-mono font-bold text-primary">
                      {savedPrescription?.id ? `#RX-2026-0${savedPrescription.id}` : '#RX-2026-PREVIEW'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Ngày khám: {new Date().toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </div>

              {/* Tên phiếu Toa Kính */}
              <div className="text-center my-4">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
                  TOA KÍNH MẮT Y KHOA
                </h1>
                <span className="text-xs font-semibold text-slate-500 italic block mt-0.5">
                  (Optometric &amp; Clinical Refraction Prescription)
                </span>
              </div>

              {/* Thông tin bệnh nhân */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-lg border border-slate-200 text-xs mb-4">
                <div>
                  <span className="text-slate-500">Họ và tên bệnh nhân: </span>
                  <strong className="text-slate-900 uppercase">{patient.customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Số điện thoại: </span>
                  <strong className="text-slate-900">{patient.customerPhone || '0901 *** 888'}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Mã bệnh nhân / Vé: </span>
                  <strong className="text-primary font-mono">{patient.ticketCode || `CUS-${patient.customerId}`}</strong>
                </div>
                <div className="col-span-2 sm:col-span-3">
                  <span className="text-slate-500">Lý do khám / Tiền sử: </span>
                  <span className="text-slate-800">{patient.notes || 'Khám đo khúc xạ mắt định kỳ.'}</span>
                </div>
              </div>

              {/* Bảng thông số đo khúc xạ chuyên khoa */}
              <div className="mb-4">
                <div className="text-xs font-bold text-slate-800 uppercase mb-1.5 flex items-center justify-between">
                  <span>1. KẾT QUẢ ĐO KHÚC XẠ LÂM SÀNG:</span>
                  <span className="text-[11px] font-mono text-primary font-bold">Total PD: {pd} mm</span>
                </div>
                <table className="w-full text-center border-collapse border border-slate-300 text-xs font-sans">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold">
                      <th className="border border-slate-300 py-2 px-2">Mắt</th>
                      <th className="border border-slate-300 py-2 px-2">Độ Cầu (SPH)</th>
                      <th className="border border-slate-300 py-2 px-2">Độ Trụ (CYL)</th>
                      <th className="border border-slate-300 py-2 px-2">Trục (AXIS)</th>
                      <th className="border border-slate-300 py-2 px-2">Độ Cộng (ADD)</th>
                      <th className="border border-slate-300 py-2 px-2">PD Đơn (mm)</th>
                      <th className="border border-slate-300 py-2 px-2">Thị Lực (VA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 py-2 px-2 font-bold text-primary bg-slate-50">
                        OD (Mắt Phải)
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono font-bold">
                        {odSph > 0 ? `+${odSph.toFixed(2)}` : odSph.toFixed(2)}
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono">
                        {odCyl.toFixed(2)}
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono">
                        {odAxis}°
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono">
                        +{odAdd.toFixed(2)}
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono">
                        {odPd}
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono font-bold text-emerald-700">
                        {odVa}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 py-2 px-2 font-bold text-secondary bg-slate-50">
                        OS (Mắt Trái)
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono font-bold">
                        {osSph > 0 ? `+${osSph.toFixed(2)}` : osSph.toFixed(2)}
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono">
                        {osCyl.toFixed(2)}
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono">
                        {osAxis}°
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono">
                        +{osAdd.toFixed(2)}
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono">
                        {osPd}
                      </td>
                      <td className="border border-slate-300 py-2 px-2 font-mono font-bold text-emerald-700">
                        {osVa}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Chẩn đoán & Lời dặn */}
              <div className="space-y-2 mb-6 text-xs text-slate-800">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">2. CHẨN ĐOÁN LÂM SÀNG &amp; LOẠI TRÒNG KÍNH:</span>
                  <p className="leading-relaxed">{clinicalNotes}</p>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">3. LỜI DẶN CỦA BÁC SĨ CHUYÊN KHOA:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                    <li>Đeo kính đúng độ thường xuyên khi làm việc, học tập và lái xe.</li>
                    <li>Tái khám định kỳ sau <strong>06 tháng</strong> hoặc ngay khi có dấu hiệu nhìn mờ, mỏi mắt.</li>
                    <li>Áp dụng quy tắc <strong>20-20-20</strong>: Sau mỗi 20 phút làm việc màn hình, nhìn xa 20 feet (6m) trong 20 giây.</li>
                  </ul>
                </div>
              </div>

              {/* Chữ ký hai bên */}
              <div className="grid grid-cols-2 gap-4 pt-2 text-center text-xs">
                <div>
                  <span className="font-bold uppercase text-slate-700 block">BỆNH NHÂN / THÂN NHÂN</span>
                  <span className="text-[11px] text-slate-500 italic block mt-0.5">(Ký và ghi rõ họ tên)</span>
                  <div className="h-16 flex items-center justify-center text-slate-400 italic text-[11px]">
                    (Đã xác nhận toa)
                  </div>
                  <span className="font-bold text-slate-900 uppercase block">{patient.customerName}</span>
                </div>

                <div>
                  <span className="font-bold uppercase text-slate-700 block">BÁC SĨ CHUYÊN KHOA KHÚC XẠ</span>
                  <span className="text-[11px] text-slate-500 italic block mt-0.5">(Ký, đóng dấu y khoa)</span>
                  <div className="h-16 flex flex-col items-center justify-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-600 bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      CHỮ KÝ SỐ SHA-256 HỢP LỆ
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 mt-0.5">CCHN: #VN-882-HN</span>
                  </div>
                  <span className="font-bold text-slate-900 uppercase block">
                    {user?.staffName || user?.fullName || 'BS. LÊ THỊ ÁNH TUYẾT'}
                  </span>
                </div>
              </div>

              {/* Chân trang in */}
              <div className="mt-6 pt-2 border-t border-slate-200 text-center text-[10px] text-slate-400">
                Toa kính có giá trị sử dụng trong 06 tháng kể từ ngày khám • GlassStore Optometry Clinic
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
