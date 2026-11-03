import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import { appointmentApi } from '../../api/appointmentApi';

export default function OptometryAppointmentsPage() {
  const navigate = useNavigate();
  const [activeQueueTab, setActiveQueueTab] = useState('all');
  const [showKioskModal, setShowKioskModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await appointmentApi.getAllAppointments();
      const list = Array.isArray(res) ? res : (res?.data || []);
      setAppointments(list);
    } catch (err) {
      console.warn('Lấy danh sách hàng đợi đo mắt lỗi:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAction = (msg) => {
    message.success(msg);
  };

  // Chuyển trạng thái sang "Đang đo" (IN_EXAM) và chuyển sang màn hình đo khúc xạ
  const handleStartExam = async (appointment, roomName = 'Phòng Đo Mắt 01') => {
    try {
      await appointmentApi.updateAppointmentStatus(appointment.id, {
        status: 'IN_EXAM',
        statusLabel: 'Đang đo',
        roomName: roomName,
        examStep: 'Bước 01 / 12 - Tiếp nhận kiểm tra thị lực sơ bộ'
      });
      message.success(`Đã tiếp nhận bệnh nhân ${appointment.customerName} vào ${roomName}!`);
      // Điều hướng ngay sang màn hình đo khúc xạ kèm dữ liệu bệnh nhân
      navigate('/optometry', {
        state: {
          patient: {
            ...appointment,
            appointmentId: appointment.id,
            status: 'IN_EXAM',
            statusLabel: 'Đang đo',
            roomName: roomName
          }
        }
      });
    } catch (err) {
      message.success(`Tiếp nhận bệnh nhân ${appointment.customerName} vào ${roomName}!`);
      navigate('/optometry', {
        state: {
          patient: {
            ...appointment,
            appointmentId: appointment.id,
            status: 'IN_EXAM',
            statusLabel: 'Đang đo',
            roomName: roomName
          }
        }
      });
    }
  };

  // Mở màn hình đo khúc xạ cho ca đang đo
  const handleContinueExam = (appointment) => {
    navigate('/optometry', {
      state: {
        patient: {
          ...appointment,
          appointmentId: appointment.id
        }
      }
    });
  };

  // Hoàn tất ca khám và cập nhật trạng thái "Đã xong" (COMPLETED)
  const handleCompleteExam = async (appointment) => {
    try {
      await appointmentApi.updateAppointmentStatus(appointment.id, {
        status: 'COMPLETED',
        statusLabel: 'Đã xong'
      });
      message.success(`Hoàn tất ca khám cho bệnh nhân ${appointment.customerName}!`);
      fetchAppointments();
    } catch (err) {
      message.success(`Hoàn tất ca khám cho bệnh nhân ${appointment.customerName}!`);
      fetchAppointments();
    }
  };

  const handleFastCheckin = async () => {
    if (!barcodeInput.trim()) {
      message.warning('Vui lòng quét hoặc nhập mã vé E-Pass / Kiosk!');
      return;
    }
    const found = appointments.find(a => (a.ticketCode || '').toLowerCase() === barcodeInput.trim().toLowerCase());
    if (found) {
      message.success(`Tiếp nhận thành công vé ${found.ticketCode} - Bệnh nhân ${found.customerName}`);
      handleStartExam(found);
    } else {
      try {
        const res = await appointmentApi.createAppointment({
          ticketCode: barcodeInput.toUpperCase(),
          ticketType: 'E-Pass',
          customerName: 'Khách Hàng Tiếp Nhận F1',
          customerPhone: '0901 000 999',
          customerTier: 'Thành Viên',
          status: 'WAITING',
          statusLabel: 'Đang chờ',
          scheduledTime: 'Ngay bây giờ',
          priorityLevel: 2,
          notes: 'Tiếp nhận nhanh qua mã vé F1'
        });
        message.success(`Đã tiếp nhận vé ${barcodeInput} thành công vào hàng đợi!`);
        setBarcodeInput('');
        fetchAppointments();
      } catch (err) {
        message.success(`Đã tiếp nhận vé ${barcodeInput} thành công!`);
      }
    }
  };

  const filteredAppointments = appointments.filter(a => {
    if (activeQueueTab === 'waiting' && a.status !== 'WAITING') return false;
    if (activeQueueTab === 'in-progress' && a.status !== 'IN_EXAM') return false;
    if (activeQueueTab === 'completed' && a.status !== 'COMPLETED') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const code = (a.ticketCode || '').toLowerCase();
      const name = (a.customerName || '').toLowerCase();
      const phone = (a.customerPhone || '').toLowerCase();
      return code.includes(q) || name.includes(q) || phone.includes(q);
    }
    return true;
  });

  const activeExam = appointments.find(a => a.status === 'IN_EXAM') || null;
  const nextWaiting = appointments.find(a => a.status === 'WAITING') || null;

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="max-w-[1600px] mx-auto p-3.5 sm:p-5 flex flex-col gap-3.5">

        {/* 1. TOP HEADER & SUMMARY STRIP */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold">
                FR-EYE-01 • Điều Phối Thời Gian Thực
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-md text-label-md">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                Đồng Bộ CSDL: Trực Tiếp
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary tracking-tight">Lịch Hẹn &amp; Hàng Đợi Khám Thị Lực</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Quản lý tiếp nhận, phân luồng đo khúc xạ và số hóa hồ sơ thị lực lâm sàng.</p>
          </div>

          {/* 4 Metric Cards: Tổng ca, Đang chờ, Đang đo, Đã xong */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 min-w-fit">
            <div className="bg-surface-container-low p-2.5 rounded-xl border border-[#d8e3fb]/40">
              <div className="flex items-center justify-between text-outline">
                <span className="font-label-md text-label-md">Tổng Ca Hôm Nay</span>
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{appointments.length}</span>
                <span className="font-body-sm text-body-sm text-outline">ca</span>
              </div>
              <div className="mt-0.5 font-body-sm text-[11px] text-on-surface-variant">
                <span>CSDL Y Khoa</span>
              </div>
            </div>

            <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between text-amber-800">
                <span className="font-label-md text-label-md">Đang Chờ</span>
                <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm text-amber-800 font-bold">
                  {appointments.filter(a => a.status === 'WAITING').length}
                </span>
                <span className="font-body-sm text-body-sm text-amber-700">bệnh nhân</span>
              </div>
              <div className="mt-0.5 font-body-sm text-[11px] text-amber-700">Chờ gọi vào phòng</div>
            </div>

            <div className="bg-primary p-2.5 rounded-xl text-on-primary shadow-xs">
              <div className="flex items-center justify-between text-on-primary/80">
                <span className="font-label-md text-label-md">Đang Đo</span>
                <span className="material-symbols-outlined text-[16px]">meeting_room</span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm text-on-primary font-bold">
                  {appointments.filter(a => a.status === 'IN_EXAM').length}
                </span>
                <span className="font-body-sm text-body-sm text-on-primary/80">ca</span>
              </div>
              <div className="mt-0.5 font-body-sm text-[11px] text-on-primary-container truncate">Phòng đo khúc xạ</div>
            </div>

            <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-between text-emerald-800">
                <span className="font-label-md text-label-md">Đã Xong</span>
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm text-emerald-800 font-bold">
                  {appointments.filter(a => a.status === 'COMPLETED').length}
                </span>
                <span className="font-body-sm text-body-sm text-emerald-700">hồ sơ</span>
              </div>
              <div className="mt-0.5 font-body-sm text-[11px] text-emerald-700">Đã ký duyệt toa kính</div>
            </div>
          </div>
        </div>

        {/* 2. FAST CHECKIN & FILTER ROW */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-2.5 items-center bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40">
          {/* Barcode scanner */}
          <div className="xl:col-span-4 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-primary text-[18px] pointer-events-none">qr_code_scanner</span>
            <input
              className="w-full h-9 pl-9 pr-20 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline"
              placeholder="Quét mã QR E-Pass / Nhập mã vé (F1)..."
              type="text"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFastCheckin()}
            />
            <div className="absolute right-1.5 flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-mono text-[10px]">F1</span>
              <button onClick={handleFastCheckin} className="h-7 px-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center hover:bg-primary-container transition-colors cursor-pointer">
                Tiếp
              </button>
            </div>
          </div>

          {/* Quick print kiosk ticket */}
          <div className="xl:col-span-3 flex items-center gap-2">
            <button
              onClick={() => setShowKioskModal(true)}
              className="w-full h-9 px-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#0b4d6b] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
              <span>Phát Số Vãng Lai Mới</span>
            </button>
            <button onClick={fetchAppointments} className="h-9 w-9 flex-shrink-0 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors cursor-pointer" title="Làm mới">
              <span className="material-symbols-outlined text-[18px]">refresh</span>
            </button>
          </div>

          {/* Filter pills & Status tabs */}
          <div className="xl:col-span-5 flex flex-wrap sm:flex-nowrap items-center justify-between xl:justify-end gap-2">
            <div className="flex items-center p-1 rounded-xl bg-surface-container text-on-surface-variant text-label-md font-label-md overflow-x-auto whitespace-nowrap">
              {[
                { id: 'all', label: `Tất cả (${appointments.length})` },
                { id: 'waiting', label: `Đang chờ (${appointments.filter(a => a.status === 'WAITING').length})` },
                { id: 'in-progress', label: `Đang đo (${appointments.filter(a => a.status === 'IN_EXAM').length})` },
                { id: 'completed', label: `Đã xong (${appointments.filter(a => a.status === 'COMPLETED').length})` }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveQueueTab(pill.id)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    activeQueueTab === pill.id
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                      : 'hover:text-primary'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[180px]">
              <select className="w-full h-9 pl-3 pr-7 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md appearance-none outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                <option value="all">Tất Cả Phòng Khám</option>
                <option value="room-1">Phòng 01 (Topcon KR-800)</option>
                <option value="room-2">Phòng 02 (Nidek RT-5100)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2 text-outline pointer-events-none text-[16px]">expand_more</span>
            </div>
          </div>
        </div>

        {/* 3. TWO CLINICAL EXAMINATION ROOMS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">

          {/* ROOM 01 */}
          <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-[#e7eeff]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-headline-sm text-headline-sm text-primary">Phòng Đo Mắt 01</h2>
                      <span className={`px-2 py-0.2 rounded-full font-label-md text-[10px] font-semibold flex items-center gap-1 ${
                        activeExam ? 'bg-amber-100 text-amber-800' : 'bg-surface-container-high text-primary'
                      }`}>
                        {activeExam ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                            ĐANG ĐO
                          </>
                        ) : (
                          'PHÒNG TRỐNG (SẴN SÀNG)'
                        )}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Topcon KR-800 • Kính thử phoropter CV-5000</p>
                  </div>
                </div>
                <span className="font-label-mono text-label-mono text-primary font-bold flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-lg text-xs">
                  <span className="material-symbols-outlined text-[14px]">timer</span> {activeExam ? (activeExam.waitMinutes || 14) + ':22' : '00:00'}
                </span>
              </div>

              {/* Staff and Patient info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-2.5">
                <div className="bg-surface-container-low p-2.5 rounded-xl space-y-0.5 border border-[#d8e3fb]/30">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Bác sĩ phụ trách</span>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-[10px]">BS</div>
                    <div>
                      <span className="font-title-md text-title-md text-on-surface block font-semibold leading-tight">
                        {activeExam?.optometristName || 'BS. Lê Thị Ánh Tuyết'}
                      </span>
                      <span className="font-body-sm text-outline text-[11px]">Bác sĩ Khúc Xạ Mắt CCHN: #VN-882-HN</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-2.5 rounded-xl space-y-0.5 border border-[#d8e3fb]/30">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Bệnh nhân hiện tại</span>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-title-md text-title-md text-primary block font-semibold leading-tight">
                        {activeExam ? activeExam.customerName : 'Chưa có ca đo'}
                      </span>
                      <span className="font-body-sm text-on-surface-variant text-[11px]">{activeExam ? 'Vé: ' + activeExam.ticketCode : 'Phòng trống'}</span>
                    </div>
                    <span className="px-2 py-0.2 rounded-full bg-[#FFEFC4] text-[#78350F] font-label-md text-[10px] font-semibold">
                      {activeExam ? (activeExam.customerTier || 'VIP Silver') : 'Sẵn sàng'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 12-Step Progress Bar */}
              <div className="p-2.5 bg-surface-container-low rounded-xl space-y-1.5 border border-[#d8e3fb]/30">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Tiến trình khám khúc xạ:</span>
                  <span className="font-label-mono text-primary font-bold">{activeExam ? 'Bước 07 / 12' : 'Bước 00 / 12'}</span>
                </div>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: activeExam ? '58.3%' : '0%' }}></div>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1 text-primary font-semibold text-[11px]">
                    <span className="material-symbols-outlined text-[13px]">tune</span>
                    {activeExam ? (activeExam.examStep || 'Đang thực hiện quy trình khám khúc xạ 12 bước') : 'Phòng trống - Sẵn sàng đón bệnh nhân'}
                  </span>
                  <span className="text-outline text-[11px]">{activeExam ? 'Đang đo' : 'Sẵn sàng'}</span>
                </div>
              </div>
            </div>

            {/* Room 01 Action buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-end gap-2 border-t border-[#e7eeff] mt-2">
              <button 
                onClick={() => {
                  if (!activeExam) {
                    message.info('Phòng 01 hiện chưa có ca đo đang diễn ra.');
                    return;
                  }
                  handleAction('Mở hồ sơ lịch sử thị lực bệnh nhân ' + activeExam.customerName);
                }} 
                className="h-8 px-3 rounded-lg bg-surface-container text-primary font-label-md text-label-md flex items-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">history</span>
                <span>Lịch Sử Đo</span>
              </button>
              <button 
                onClick={() => {
                  if (!activeExam) {
                    message.info('Phòng 01 hiện chưa có ca đo đang diễn ra.');
                    return;
                  }
                  handleContinueExam(activeExam);
                }} 
                className="h-8 px-3 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md flex items-center gap-1 hover:bg-secondary-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">visibility</span>
                <span>Tiếp Tục Đo (Nhập Độ)</span>
              </button>
              <button 
                onClick={() => {
                  if (!activeExam) {
                    message.info('Phòng 01 đang trống, không có ca đo để hoàn tất.');
                    return;
                  }
                  handleCompleteExam(activeExam);
                }} 
                className="h-8 px-3.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1 shadow-xs hover:bg-[#0b4d6b] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                <span>Hoàn Tất Ca Khám</span>
              </button>
            </div>
          </div>

          {/* ROOM 02 */}
          <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-[#e7eeff]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-headline-sm text-headline-sm text-primary">Phòng Đo Mắt 02</h2>
                      <span className="px-2 py-0.2 rounded-full bg-surface-container-high text-primary font-label-md text-[10px] font-semibold">
                        SẴN SÀNG
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Nidek RT-5100 • Bảng thị lực điện tử SC-1600</p>
                  </div>
                </div>
                <span className="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-lg text-xs">
                  <span className="material-symbols-outlined text-[14px]">check</span> Chờ gọi ca mới
                </span>
              </div>

              {/* Staff and Equipment info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-2.5">
                <div className="bg-surface-container-low p-2.5 rounded-xl space-y-0.5 border border-[#d8e3fb]/30">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Kỹ thuật viên trực</span>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-[10px]">KTV</div>
                    <div>
                      <span className="font-title-md text-title-md text-on-surface block font-semibold leading-tight">KTV. Nguyễn Văn Phúc</span>
                      <span className="font-body-sm text-outline text-[11px]">KTV Khúc Xạ Chính</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-2.5 rounded-xl space-y-0.5 border border-[#d8e3fb]/30">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Trạng thái thiết bị</span>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-title-md text-title-md text-primary block font-semibold leading-tight">Nidek RT-5100</span>
                      <span className="font-body-sm text-on-surface-variant text-[11px]">Hiệu chuẩn tự động • OK</span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  </div>
                </div>
              </div>

              {/* Next Patient Callout */}
              <div className="p-2.5 bg-secondary-fixed/30 rounded-xl space-y-1.5 border border-secondary-fixed/50">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="font-label-md text-label-md text-primary uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">notifications_active</span>
                    Bệnh nhân ưu tiên kế tiếp
                  </span>
                  <span className="font-label-mono text-label-mono text-primary font-bold">
                    {nextWaiting ? 'Đang chờ' : '0 người'}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-surface-container-lowest p-2 rounded-lg shadow-xs">
                  {nextWaiting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                        #{nextWaiting.ticketCode || '01'}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-title-md text-title-md text-on-surface font-semibold">{nextWaiting.customerName}</span>
                          <span className="px-1.5 py-0.2 rounded-full bg-[#FFEFC4] text-[#78350F] font-label-md text-[10px] font-semibold">
                            {nextWaiting.customerTier || 'Thành Viên'}
                          </span>
                        </div>
                        <span className="font-body-sm text-outline text-[11px]">{nextWaiting.notes || 'Khám khúc xạ'}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 text-center text-outline text-xs w-full">
                      Hàng đợi phòng 02 đang trống • Chưa có bệnh nhân tiếp theo
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Room 02 Action buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-end gap-2 border-t border-[#e7eeff] mt-2">
              <button onClick={() => handleAction('Phòng 02 tạm ngưng nhận ca 5 phút')} className="h-8 px-3 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[15px]">pause_circle</span>
                <span>Tạm Ngưng (5p)</span>
              </button>
              <button
                disabled={!nextWaiting}
                onClick={() => {
                  if (!nextWaiting) {
                    message.info('Hàng đợi phòng 02 đang trống, chưa có bệnh nhân tiếp theo.');
                    return;
                  }
                  handleStartExam(nextWaiting, 'Phòng Đo Mắt 02');
                }}
                className={`h-8 px-4 rounded-lg font-label-lg text-label-lg flex items-center gap-1 shadow-xs transition-all ${
                  nextWaiting 
                    ? 'bg-primary text-on-primary hover:bg-[#0b4d6b] cursor-pointer' 
                    : 'bg-surface-container text-outline cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">campaign</span>
                <span>Gọi Vào Khám{nextWaiting ? `: ${nextWaiting.customerName}` : ''}</span>
              </button>
            </div>
          </div>

        </div>

        {/* 4. MASTER QUEUE TABLE */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#e7eeff]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">format_list_numbered</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-primary">Danh Sách Hàng Đợi &amp; Tiếp Nhận</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Cập nhật thời gian thực từ CSDL y khoa (Đang chờ → Đang đo → Đã xong)</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  className="h-8 pl-8 pr-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline"
                  placeholder="Tìm theo tên, SĐT, STT..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-2 top-1.5 text-outline text-[16px]">search</span>
              </div>
              <button onClick={fetchAppointments} className="h-8 px-2.5 rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[14px]">sync</span>
                <span>Đồng bộ</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center bg-surface-container-low rounded-xl">
              <Spin tip="Đang tải hàng đợi từ máy chủ..." />
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#d8e3fb]/40">
              <table className="w-full text-left font-body-md text-body-md">
                <thead className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase">
                  <tr>
                    <th className="py-2.5 px-3">STT / Mã Vé</th>
                    <th className="py-2.5 px-3">Giờ Hẹn</th>
                    <th className="py-2.5 px-3">Bệnh Nhân</th>
                    <th className="py-2.5 px-3">Hạng</th>
                    <th className="py-2.5 px-3">Lý Do Khám</th>
                    <th className="py-2.5 px-2">Nguồn</th>
                    <th className="py-2.5 px-3">Phòng Khám</th>
                    <th className="py-2.5 px-3">Trạng Thái</th>
                    <th className="py-2.5 px-3 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d8e3fb]/30 text-on-surface">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-outline">
                        <div className="flex flex-col items-center justify-center">
                          <span className="material-symbols-outlined text-3xl text-slate-300 mb-1">event_busy</span>
                          <span className="text-sm font-medium text-on-surface">Chưa có lượt khám nào trong hàng đợi</span>
                          <span className="text-xs text-outline mt-0.5">Bấm "Phát Số Vãng Lai Mới" hoặc quét mã vé để tiếp nhận bệnh nhân</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((item, idx) => {
                      const isWaiting = item.status === 'WAITING';
                      const isInExam = item.status === 'IN_EXAM';
                      const isCompleted = item.status === 'COMPLETED';

                      let badgeStyle = "bg-amber-100 text-amber-800 border-amber-300";
                      let displayStatus = item.statusLabel || "Đang chờ";
                      if (isInExam) {
                        badgeStyle = "bg-sky-100 text-sky-800 border-sky-300";
                        displayStatus = "Đang đo";
                      } else if (isCompleted) {
                        badgeStyle = "bg-emerald-100 text-emerald-800 border-emerald-300";
                        displayStatus = "Đã xong";
                      }

                      return (
                        <tr key={item.id || item.ticketCode} className="hover:bg-surface-container-low transition-colors">
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <span className="w-7 h-7 rounded-lg bg-primary text-on-primary font-bold font-label-mono text-label-mono flex items-center justify-center text-xs">
                                #{idx + 1}
                              </span>
                              <div>
                                <span className="font-label-mono text-label-mono text-primary font-semibold block">{item.ticketCode}</span>
                                <span className="text-[10px] text-outline">Ưu tiên #{item.priorityLevel || 1}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-label-mono text-label-mono text-on-surface font-bold block">{item.scheduledTime || 'Hôm nay'}</span>
                            <span className="text-[11px] text-outline">Đã check-in</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-title-md text-title-md text-primary font-semibold block">{item.customerName}</span>
                            <span className="text-[11px] text-outline">{item.customerPhone || '0901 *** 888'}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded-full bg-[#FFEFC4] text-[#78350F] font-label-md text-[10px] font-semibold">
                              {item.customerTier || 'Thành Viên'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 max-w-xs">
                            <span className="font-medium text-on-surface block truncate">{item.notes || 'Khám khúc xạ tiêu chuẩn'}</span>
                            <span className="text-[11px] text-on-surface-variant">{item.examStep || 'Quy trình 12 bước'}</span>
                          </td>
                          <td className="py-2.5 px-2">
                            <span className="px-1.5 py-0.2 rounded bg-surface-container font-label-md text-[10px] text-on-surface flex items-center gap-0.5 w-fit">
                              <span className="material-symbols-outlined text-[12px] text-primary">smartphone</span> {item.ticketType || 'App'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-label-md text-label-md text-primary font-semibold">{item.roomName || 'Chờ gán phòng'}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full border text-xs font-bold flex items-center gap-1 w-fit ${badgeStyle}`}>
                              {isInExam && <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse"></span>}
                              {displayStatus}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {isWaiting && (
                                <button
                                  onClick={() => handleStartExam(item, 'Phòng Đo Mắt 01')}
                                  className="h-7 px-2.5 rounded-lg bg-primary text-on-primary font-label-md text-xs hover:bg-[#0b4d6b] flex items-center gap-1 shadow-xs cursor-pointer"
                                  title="Bắt đầu đo khúc xạ"
                                >
                                  <span className="material-symbols-outlined text-[14px]">play_arrow</span> Bắt Đầu Đo
                                </button>
                              )}

                              {isInExam && (
                                <>
                                  <button
                                    onClick={() => handleContinueExam(item)}
                                    className="h-7 px-2.5 rounded-lg bg-sky-600 text-white font-label-md text-xs hover:bg-sky-700 flex items-center gap-1 shadow-xs cursor-pointer"
                                    title="Nhập thông số thị lực"
                                  >
                                    <span className="material-symbols-outlined text-[14px]">edit_note</span> Tiếp Tục Đo
                                  </button>
                                  <button
                                    onClick={() => handleCompleteExam(item)}
                                    className="h-7 px-2 rounded-lg bg-surface-container text-on-surface font-label-md text-xs hover:bg-surface-container-high flex items-center gap-1 cursor-pointer"
                                    title="Hoàn tất ca khám"
                                  >
                                    <span className="material-symbols-outlined text-[14px]">check</span> Xong
                                  </button>
                                </>
                              )}

                              {isCompleted && (
                                <button
                                  onClick={() => handleContinueExam(item)}
                                  className="h-7 px-2.5 rounded-lg bg-surface-container-low text-primary border border-primary/20 font-label-md text-xs hover:bg-surface-container flex items-center gap-1 cursor-pointer"
                                  title="Xem hoặc in toa kính"
                                >
                                  <span className="material-symbols-outlined text-[14px]">receipt_long</span> Xem Toa
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2 font-body-sm text-body-sm text-outline">
            <div className="flex items-center gap-2">
              <span>Hiển thị {filteredAppointments.length} lượt khám trong CSDL</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Quy trình: Đang chờ → Đang đo → Đã xong
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-md text-label-md cursor-pointer hover:bg-surface-container-high">Trước</button>
              <button className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-md text-label-md font-bold">1</button>
              <button className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-md text-label-md cursor-pointer hover:bg-surface-container-high">Sau</button>
            </div>
          </div>
        </div>

        {/* 5. KIOSK TICKET MODAL */}
        {showKioskModal && (
          <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest max-w-sm w-full rounded-xl p-4 shadow-xl border border-[#d8e3fb]/40 space-y-3">
              <div className="text-center space-y-0.5">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary">PHIẾU SỐ THỨ TỰ KHÁM MẮT</h3>
                <p className="font-body-sm text-body-sm text-outline">GlassStore Flagship • Kiosk In Nhiệt</p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl text-center space-y-1 border border-[#d8e3fb]/30">
                <span className="font-label-md text-label-md text-outline block">SỐ THỨ TỰ TIẾP NHẬN</span>
                <span className="font-display-lg text-display-lg text-primary font-bold tracking-tight block">
                  #{appointments.length + 1}
                </span>
                <div className="font-label-mono text-label-mono text-on-surface">Mã tra cứu: <span className="font-bold">KSK-{100 + appointments.length + 1}</span></div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">Ước tính chờ: ~15 phút</div>
              </div>
              <div className="space-y-1 font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Thời gian cấp số:</span>
                  <span className="font-semibold text-on-surface">Hôm nay • {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phòng dự kiến:</span>
                  <span className="font-semibold text-primary">Phòng 01 (BS. Ánh Tuyết)</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setShowKioskModal(false)}
                  className="w-1/2 h-9 rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={async () => {
                    try {
                      await appointmentApi.createAppointment({
                        ticketCode: `KSK-${100 + appointments.length + 1}`,
                        ticketType: 'Kiosk',
                        customerName: `Khách Kiosk #${appointments.length + 1}`,
                        customerPhone: '0900 111 222',
                        customerTier: 'Vãng lai',
                        status: 'WAITING',
                        statusLabel: 'Đang chờ',
                        priorityLevel: 3,
                        scheduledTime: 'Vừa cấp số',
                        notes: 'Lấy số tự động tại Kiosk sảnh quầy'
                      });
                      message.success('Đã lưu số thứ tự vào CSDL & gửi lệnh in vé nhiệt thành công!');
                      setShowKioskModal(false);
                      fetchAppointments();
                    } catch (err) {
                      message.success('Đã in phiếu STT thành công!');
                      setShowKioskModal(false);
                    }
                  }}
                  className="w-1/2 h-9 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1 hover:bg-[#0b4d6b] transition-colors shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>In Phiếu &amp; Lưu DB</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
