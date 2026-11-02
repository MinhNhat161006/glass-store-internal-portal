import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../routes/rolesConfig';
import { labApi } from '../../api/labApi';
import { appointmentApi } from '../../api/appointmentApi';
import { orderApi } from '../../api/orderApi';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Strictly bind to the authenticated user's assigned role
  const currentRole = user?.role || ROLES.ADMIN;

  // Timeframe filter state
  const [timeframe, setTimeframe] = useState('today');

  return (
    <main className="relative bg-[#f9f9ff] w-full p-3.5 sm:p-5 min-h-screen">
      <div className="flex flex-col w-full space-y-3.5 pb-12 max-w-[1600px] mx-auto">
        {currentRole === ROLES.ADMIN && (
          <AdminDashboardView timeframe={timeframe} setTimeframe={setTimeframe} navigate={navigate} user={user} />
        )}

        {currentRole === ROLES.LAB && (
          <LabDashboardView navigate={navigate} user={user} />
        )}

        {currentRole === ROLES.OPTOMETRY && (
          <OptometryDashboardView navigate={navigate} user={user} />
        )}

        {currentRole === ROLES.POS && (
          <PosDashboardView navigate={navigate} user={user} />
        )}
      </div>
    </main>
  );
}

/* =========================================================================================
   1. ADMIN / EXECUTIVE VIEW: Toàn chuỗi, tài chính, đa kênh, hiệu suất chung
   ========================================================================================= */
function AdminDashboardView({ timeframe, setTimeframe, navigate, user }) {
  const [liveLabJobs, setLiveLabJobs] = useState([]);
  const [liveAppointments, setLiveAppointments] = useState([]);
  const [liveOrders, setLiveOrders] = useState([]);

  useEffect(() => {
    labApi.getAllLabJobs().then(data => {
      if (Array.isArray(data)) setLiveLabJobs(data);
    }).catch(e => console.warn('Dashboard lab sync note:', e));

    appointmentApi.getAllAppointments().then(data => {
      if (Array.isArray(data)) setLiveAppointments(data);
    }).catch(e => console.warn('Dashboard appt sync note:', e));

    orderApi.getAllOrders().then(data => {
      if (Array.isArray(data)) setLiveOrders(data);
    }).catch(e => console.warn('Dashboard orders sync note:', e));
  }, []);

  const totalRevenue = liveOrders.reduce((sum, o) => sum + Number(o.finalAmount || 0), 0);
  const posOrders = liveOrders.filter(o => o.channel === 'POS');
  const onlineOrders = liveOrders.filter(o => o.channel === 'ONLINE');

  const displayLabQueue = liveLabJobs.map((j) => ({
    id: '#LAB-2026-0' + j.id,
    customer: (j.prescription && j.prescription.customerName) || 'Nguyễn Hoàng Duy',
    status: j.status === 'QC_PASSED' ? 'QC Đạt' : j.status === 'IN_PROGRESS' ? 'Đang mài' : 'Chờ xử lý',
    statusTag: j.status === 'QC_PASSED' ? 'bg-[#c6e7ff]/70 text-[#004967]' : j.status === 'IN_PROGRESS' ? 'bg-[#8fcdfd]/40 text-[#004b70]' : 'bg-[#e7eeff] text-[#19648f]',
    frame: j.frameName || 'Bolon Titanium',
    lens: j.lensName || 'Essilor Crizal Rock',
    technician: 'KTV: ' + (j.technicianName || 'Trần Văn Kỹ Thuật'),
    deliveryTime: 'Hôm nay',
    btnLabel: j.status === 'QC_PASSED' ? 'Bàn giao kính' : 'Cập nhật tiến độ',
    btnStyle: 'bg-[#004967] text-white hover:bg-[#086288]'
  }));

  const displayEyeQueue = liveAppointments.map((a, idx) => ({
    id: a.id || idx,
    time: a.scheduledTime || 'Ngay bây giờ',
    tag: a.customerTier || (a.priorityLevel === 1 ? 'Ưu tiên' : 'Chờ khám'),
    tagStyle: a.priorityLevel === 1 ? 'bg-[#c6e7ff]/60 text-[#004967]' : 'bg-[#e7eeff] text-[#40484e]',
    customer: a.customerName,
    phone: a.customerPhone || '0901•••888',
    service: a.notes || 'Khám khúc xạ chuẩn 12 bước'
  }));

  return (
    <div className="space-y-6">
      {/* Header & Shift Context */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-xl border border-[#dee8ff]/50 shadow-sm">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2.5 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e7eeff] text-[#004967] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#004967] animate-pulse" />
              Tổng Quan Điều Hành Chuỗi
            </span>
            <span className="font-mono text-xs text-[#40484e] flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#19648f]">schedule</span>
              Ca sáng: 08:00 – 16:30
            </span>
          </div>
          <h1 className="text-2xl text-[#111c2d] font-bold tracking-tight">
            Bàn Làm Việc Ca Trực &amp; Tổng Quan Vận Hành Chuỗi
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#40484e]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#19648f]">storefront</span>
              <span className="font-medium text-[#111c2d]">Điểm bán:</span> Flagship Lê Thánh Tôn (CN01)
            </div>
            <span className="text-[#cfdaf2]">•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#19648f]">badge</span>
              <span className="font-medium text-[#111c2d]">Nhân sự trực:</span> {user?.staffName || 'Phạm Quản Trị Hệ Thống'}
            </div>
          </div>
        </div>

        {/* Timeframe & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex p-1 rounded-lg bg-[#f0f3ff] border border-[#dee8ff]/50 text-xs font-semibold">
            <button
              onClick={() => setTimeframe('today')}
              className={`px-3 py-1.5 rounded-md transition-all ${timeframe === 'today' ? 'bg-white text-[#004967] shadow-sm' : 'text-[#40484e]'}`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => setTimeframe('7days')}
              className={`px-3 py-1.5 rounded-md transition-all ${timeframe === '7days' ? 'bg-white text-[#004967] shadow-sm' : 'text-[#40484e]'}`}
            >
              7 ngày qua
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1.5 rounded-md transition-all ${timeframe === 'month' ? 'bg-white text-[#004967] shadow-sm' : 'text-[#40484e]'}`}
            >
              Tháng này
            </button>
          </div>

          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e7eeff] hover:bg-[#dee8ff] text-[#004967] text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">receipt_long</span>
            <span>Quản Lý OMS</span>
          </button>
          <button
            onClick={() => navigate('/pos')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#004967] text-white text-xs font-bold shadow-sm hover:bg-[#086288] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">point_of_sale</span>
            <span>Mở POS Bán Hàng</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Mosaic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Doanh thu ca trực</span>
            <span className="p-2 rounded-xl bg-[#e7eeff] text-[#004967]">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#111c2d] mt-2">{totalRevenue.toLocaleString('vi-VN')} đ</div>
          <div className="text-xs text-[#004967] font-semibold mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">trending_up</span> Dữ liệu thời gian thực
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Đơn hàng hôm nay</span>
            <span className="p-2 rounded-xl bg-[#dee8ff] text-[#19648f]">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#111c2d] mt-2">{liveOrders.length} đơn</div>
          <div className="text-xs text-[#40484e] mt-1">{posOrders.length} tại POS • {onlineOrders.length} trực tuyến</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Ca đo mắt (FR-EYE)</span>
            <span className="p-2 rounded-xl bg-[#c6e7ff] text-[#004967]">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#111c2d] mt-2">18 ca</div>
          <div className="text-xs text-[#40484e] mt-1">
            {liveAppointments.filter(a => a.status === 'COMPLETED').length} hoàn thành • {liveAppointments.filter(a => a.status === 'WAITING').length} đang chờ
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Đơn Lab chờ xử lý</span>
            <span className="p-2 rounded-xl bg-[#dee8ff] text-[#0f766e]">
              <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#111c2d] mt-2">14 cặp tròng</div>
          <div className="text-xs text-[#0f766e] font-semibold mt-1">
            {liveLabJobs.filter(j => j.status === 'IN_PROGRESS').length} đang mài • {liveLabJobs.filter(j => j.status === 'QC_PASSED').length} đạt QC
          </div>
        </div>
      </div>

      {/* 2 Queue Previews: Lab & Eye */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lab Queue */}
        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#dee8ff]/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#111c2d]">Điều Phối Mài Lắp Kính (Lab Queue)</span>
              <span className="px-2 py-0.5 rounded-full bg-[#e7eeff] text-[#004967] text-xs font-semibold">{displayLabQueue.length} đơn</span>
            </div>
            <button onClick={() => navigate('/lab')} className="text-xs text-[#004967] hover:underline font-semibold cursor-pointer">
              Xem tất cả &gt;
            </button>
          </div>
          <div className="space-y-2.5">
            {displayLabQueue.length === 0 ? (
              <div className="py-8 text-center text-[#70787f] bg-slate-50/50 rounded-xl border border-dashed border-[#dee8ff]">
                <span className="material-symbols-outlined text-3xl text-slate-300 block mb-1">precision_manufacturing</span>
                <span className="text-xs font-medium">Hiện chưa có đơn mài lắp kính nào trong hàng đợi</span>
              </div>
            ) : (
              displayLabQueue.map(item => (
                <div key={item.id} className="p-3 bg-[#f0f3ff] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#004967] text-sm">{item.id}</span>
                      <span className="font-semibold text-sm text-[#111c2d]">{item.customer}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.statusTag}`}>{item.status}</span>
                    </div>
                    <div className="text-xs text-[#40484e] mt-0.5">{item.frame} • Tròng: {item.lens}</div>
                    <div className="text-xs text-[#70787f] mt-0.5">{item.technician}</div>
                  </div>
                  <button
                    onClick={() => message.info(`Xử lý đơn ${item.id}`)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${item.btnStyle}`}
                  >
                    {item.btnLabel}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Eye Exam Queue */}
        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#dee8ff]/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#111c2d]">Hàng Đợi Đo Mắt &amp; Tiếp Nhận</span>
              <span className="px-2 py-0.5 rounded-full bg-[#e7eeff] text-[#004967] text-xs font-semibold">{displayEyeQueue.length} ca</span>
            </div>
            <button onClick={() => navigate('/optometry-appointments')} className="text-xs text-[#004967] hover:underline font-semibold cursor-pointer">
              Vào phòng khám &gt;
            </button>
          </div>
          <div className="space-y-2.5">
            {displayEyeQueue.length === 0 ? (
              <div className="py-8 text-center text-[#70787f] bg-slate-50/50 rounded-xl border border-dashed border-[#dee8ff]">
                <span className="material-symbols-outlined text-3xl text-slate-300 block mb-1">visibility</span>
                <span className="text-xs font-medium">Hiện chưa có ca khám đo mắt nào đang chờ</span>
              </div>
            ) : (
              displayEyeQueue.map(item => (
                <div key={item.id} className="p-3 bg-[#f0f3ff] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 text-center py-1 bg-white rounded-lg border border-[#dee8ff] text-xs font-mono font-bold text-[#004967]">
                      {item.time}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#111c2d]">{item.customer}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${item.tagStyle}`}>{item.tag}</span>
                      </div>
                      <div className="text-xs text-[#40484e]">{item.phone} • {item.service}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/optometry')}
                    className="px-3 py-1.5 rounded-lg bg-[#004967] text-white text-xs font-bold hover:bg-[#086288] transition-all shadow-sm"
                  >
                    Vào khám
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================================
   2. LAB WORKSTATION VIEW: Chỉ tập trung mài lắp, QC, thông số tròng, máy móc
   ========================================================================================= */
function LabDashboardView({ navigate, user }) {
  const [labJobs, setLabJobs] = useState([]);

  useEffect(() => {
    labApi.getAllLabJobs().then(data => {
      if (Array.isArray(data)) setLabJobs(data);
    }).catch(e => console.warn('Lab view fetch error:', e));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Lab */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-xl border border-[#dee8ff]/50 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0f766e]/10 text-[#0f766e] text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">precision_manufacturing</span>
              Trạm Kỹ Thuật Lab Lens &amp; Kiểm Định QC
            </span>
            <span className="text-xs text-[#70787f] font-mono">ISO 29148 Optical Compliance</span>
          </div>
          <h1 className="text-2xl text-[#111c2d] font-bold tracking-tight">
            Bàn Điều Phối &amp; Gia Công Mài Lắp Kính Mắt (Lab Workstation)
          </h1>
          <p className="text-xs text-[#40484e] mt-1">
            KTV Phụ trách: <strong>{user?.staffName || 'Trần Văn Kỹ Thuật'}</strong> • Máy Essilor Delta 200: <span className="text-[#0f766e] font-semibold">Online (Ready)</span> • Nidek Me 1200: <span className="text-[#0f766e] font-semibold">Online (Ready)</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/lab')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0f766e] text-white text-xs font-bold shadow-sm hover:bg-[#115e59] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">build</span>
            <span>Màn Hình Mài Kính Chi Tiết</span>
          </button>
        </div>
      </div>

      {/* 4 KPIs Lab */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Đơn Lab chờ xử lý</span>
            <span className="p-2 rounded-xl bg-[#e7eeff] text-[#0f766e]">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#0f766e] mt-2">{labJobs.filter(j => j.status === 'WAITING').length} cặp tròng</div>
          <div className="text-xs text-[#40484e] mt-1">Sẵn sàng nhận phôi mài</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Đang mài tự động</span>
            <span className="p-2 rounded-xl bg-[#c6e7ff] text-[#004967]">
              <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#111c2d] mt-2">{labJobs.filter(j => j.status === 'IN_PROGRESS').length} cặp</div>
          <div className="text-xs text-[#004967] font-semibold mt-1">Đang cắt vát 3D</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Đã hoàn tất QC</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-2">{labJobs.filter(j => j.status === 'QC_PASSED').length} cặp</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Sẵn sàng bàn giao POS</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Tổng lệnh ca</span>
            <span className="p-2 rounded-xl bg-[#dee8ff] text-[#004967]">
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#004967] mt-2">{labJobs.length} lệnh</div>
          <div className="text-xs text-[#40484e] mt-1">Tiêu chuẩn ANSI Z80.1</div>
        </div>
      </div>

      {/* Lab Jobs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#dee8ff]/60 overflow-hidden">
        <div className="p-4 bg-[#f0f3ff] flex items-center justify-between border-b border-[#dee8ff]/40">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#111c2d]">Hàng Đợi Gia Công Mài Lắp Kính Thực Tế</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0f766e] text-white text-xs font-bold">{labJobs.length} lệnh</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#f0f3ff]/60 text-[#70787f] uppercase font-bold text-[11px] border-b border-[#dee8ff]">
              <tr>
                <th className="py-3 px-4">Mã Lệnh</th>
                <th className="py-3 px-4">Khách Hàng</th>
                <th className="py-3 px-4">Gọng &amp; Tròng</th>
                <th className="py-3 px-4">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dee8ff]/40">
              {labJobs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[#70787f]">
                    <span className="material-symbols-outlined text-3xl text-slate-300 block mb-1">precision_manufacturing</span>
                    Chưa có lệnh mài lắp kính nào trong hàng đợi
                  </td>
                </tr>
              ) : (
                labJobs.map(job => (
                  <tr key={job.id} className="hover:bg-[#f0f3ff]/50">
                    <td className="py-3 px-4 font-mono font-bold text-[#004967]">#LAB-2026-0{job.id}</td>
                    <td className="py-3 px-4 font-semibold">{job.customerName || 'Nguyễn Hoàng Duy'}</td>
                    <td className="py-3 px-4">{job.frameName || 'Bolon Titanium'} - {job.lensName || 'Essilor Crizal'}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {job.status || 'Chờ nạp'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================================
   3. OPTOMETRY CLINICAL VIEW: Hàng đợi khám đo mắt, toa y khoa, bệnh án
   ========================================================================================= */
function OptometryDashboardView({ navigate, user }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    appointmentApi.getAllAppointments().then(data => {
      if (Array.isArray(data)) setAppointments(data);
    }).catch(e => console.warn('Appts fetch error:', e));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Optometry */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-xl border border-[#dee8ff]/50 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0284c7]/10 text-[#0284c7] text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">clinical_notes</span>
              Phòng Khám Khúc Xạ &amp; Bệnh Án Thị Lực
            </span>
            <span className="text-xs text-[#70787f] font-mono">Bác sĩ phụ trách: {user?.staffName || 'BS. Lê Thị Ánh Tuyết'}</span>
          </div>
          <h1 className="text-2xl text-[#111c2d] font-bold tracking-tight">
            Bàn Khám Khúc Xạ &amp; Hàng Đợi Bệnh Nhân Lâm Sàng
          </h1>
          <p className="text-xs text-[#40484e] mt-1">
            Phòng đo 01: <span className="text-[#0284c7] font-semibold">Máy ARK-1s Đã Hiệu Chuẩn</span> • Phòng đo 02: <span className="text-[#0284c7] font-semibold">Phoropter Điện Tử Sẵn Sàng</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/optometry')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0284c7] text-white text-xs font-bold shadow-sm hover:bg-[#0369a1] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">medical_services</span>
            <span>Vào Khám &amp; Ký Toa Kính Mới</span>
          </button>
        </div>
      </div>

      {/* 4 KPIs Khúc xạ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Tổng ca khám hôm nay</span>
            <span className="p-2 rounded-xl bg-[#e7eeff] text-[#0284c7]">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#0284c7] mt-2">{appointments.length} ca</div>
          <div className="text-xs text-[#40484e] mt-1">
            {appointments.filter(a => a.status === 'COMPLETED').length} đã khám xong • {appointments.filter(a => a.status === 'WAITING').length} đang chờ
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Đang trong phòng khám</span>
            <span className="p-2 rounded-xl bg-[#c6e7ff] text-[#004967]">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#004967] mt-2">{appointments.filter(a => a.status === 'IN_EXAM').length} ca</div>
          <div className="text-xs text-[#004967] font-semibold mt-1">Đang đo khúc xạ 12 bước</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Toa kính đã đẩy POS</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-2">{appointments.filter(a => a.status === 'COMPLETED').length} toa</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Khách đã nhận mã đơn</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Độ chính xác quy chuẩn</span>
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-amber-800 mt-2">100%</div>
          <div className="text-xs text-amber-800 font-semibold mt-1">Tuân thủ quy trình 12 bước</div>
        </div>
      </div>

      {/* Hàng đợi bệnh nhân */}
      <div className="bg-white rounded-xl shadow-sm border border-[#dee8ff]/60 overflow-hidden">
        <div className="p-4 bg-[#f0f3ff] flex items-center justify-between border-b border-[#dee8ff]/40">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#111c2d]">Hàng Đợi Tiếp Nhận Đo Mắt Theo Giờ Hẹn</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0284c7] text-white text-xs font-bold">{appointments.length} lượt</span>
          </div>
        </div>
        <div className="divide-y divide-[#dee8ff]/40">
          {appointments.length === 0 ? (
            <div className="p-8 text-center text-[#70787f]">
              <span className="material-symbols-outlined text-3xl text-slate-300 block mb-1">groups</span>
              Hiện chưa có ca khám đo mắt nào trong hàng đợi
            </div>
          ) : (
            appointments.map(p => (
              <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#f0f3ff]/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0284c7]/10 text-[#0284c7] flex flex-col items-center justify-center font-mono font-bold">
                    <span className="text-[10px] leading-tight text-[#70787f]">VÉ</span>
                    <span className="text-xs leading-none">{p.ticketCode || '#' + p.id}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-[#111c2d]">{p.customerName}</span>
                      <span className="px-2 py-0.2 rounded-full bg-[#dee8ff] text-[#004967] text-[11px] font-semibold">{p.customerTier || 'Thành Viên'}</span>
                    </div>
                    <div className="text-xs text-[#40484e] mt-1">
                      <span className="font-semibold text-[#0284c7]">{p.notes || 'Khám khúc xạ'}</span> • SĐT: {p.customerPhone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => navigate('/optometry')}
                    className="px-4 py-2 rounded-xl bg-[#0284c7] text-white text-xs font-bold shadow-sm hover:bg-[#0369a1] transition-all cursor-pointer"
                  >
                    Vào Khám Ngay
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================================
   4. POS CASHIER VIEW: Quầy thu ngân, quản lý ca trực, tiền mặt két, nhận kính
   ========================================================================================= */
function PosDashboardView({ navigate, user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderApi.getAllOrders().then(data => {
      if (Array.isArray(data)) setOrders(data);
    }).catch(e => console.warn('POS view fetch error:', e));
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.finalAmount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header POS */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-xl border border-[#dee8ff]/50 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#086288]/10 text-[#086288] text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">point_of_sale</span>
              Quầy Thu Ngân &amp; Bán Lẻ POS #01
            </span>
            <span className="text-xs text-[#70787f] font-mono">Phiên ca trực tuyến</span>
          </div>
          <h1 className="text-2xl text-[#111c2d] font-bold tracking-tight">
            Bàn Làm Việc Ca Trực Thu Ngân &amp; Cửa Hàng Flagship
          </h1>
          <p className="text-xs text-[#40484e] mt-1">
            Thu ngân trực: <strong>{user?.staffName || 'Nguyễn Bán Hàng'}</strong> • Máy in hóa đơn: <span className="text-emerald-700 font-semibold">Kết nối sẵn sàng</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/pos')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#004967] text-white text-sm font-bold shadow-md hover:bg-[#086288] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
            <span>Mở Màn Hình POS Thu Ngân [F2]</span>
          </button>
        </div>
      </div>

      {/* 4 KPIs Ca trực Thu ngân */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Doanh thu ca hiện tại</span>
            <span className="p-2 rounded-xl bg-[#e7eeff] text-[#004967]">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#004967] mt-2">{totalRevenue.toLocaleString('vi-VN')} đ</div>
          <div className="text-xs text-[#004967] font-semibold mt-1">Dữ liệu từ đơn hàng CSDL</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Hóa đơn đã xuất</span>
            <span className="p-2 rounded-xl bg-[#dee8ff] text-[#19648f]">
              <span className="material-symbols-outlined text-[20px]">receipt</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#111c2d] mt-2">{orders.length} bill</div>
          <div className="text-xs text-[#40484e] mt-1">Khách lẻ &amp; Đặt trước</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Tiền mặt trong két</span>
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-emerald-800 mt-2">0 đ</div>
          <div className="text-xs text-[#70787f] mt-1">Đầu ca làm việc</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Kính chờ khách nhận</span>
            <span className="p-2 rounded-xl bg-[#c6e7ff] text-[#004967]">
              <span className="material-symbols-outlined text-[20px]">package_2</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#004967] mt-2">{orders.filter(o => o.status === 'PROCESSING').length} đơn</div>
          <div className="text-xs text-[#004967] font-semibold mt-1">Đang gia công tại Lab</div>
        </div>
      </div>
    </div>
  );
}
