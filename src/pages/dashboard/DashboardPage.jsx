import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../routes/rolesConfig';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Strictly bind to the authenticated user's assigned role
  const currentRole = user?.role || ROLES.ADMIN;

  // Timeframe filter state
  const [timeframe, setTimeframe] = useState('today');

  return (
    <main className="relative bg-[#f9f9ff] w-full px-4 sm:px-6 lg:px-8 py-5 min-h-screen">
      <div className="flex flex-col w-full space-y-5 pb-12 max-w-[1920px] mx-auto">
        {/* ================= STRICT CONDITIONAL DASHBOARD RENDERING BASED ON USER'S ROLE ================= */}
        {currentRole === ROLES.ADMIN && (
          <AdminDashboardView timeframe={timeframe} setTimeframe={setTimeframe} navigate={navigate} />
        )}

        {currentRole === ROLES.LAB && (
          <LabDashboardView navigate={navigate} />
        )}

        {currentRole === ROLES.OPTOMETRY && (
          <OptometryDashboardView navigate={navigate} />
        )}

        {currentRole === ROLES.POS && (
          <PosDashboardView navigate={navigate} />
        )}
      </div>
    </main>
  );
}

/* =========================================================================================
   1. ADMIN / EXECUTIVE VIEW: Toàn chuỗi, tài chính, đa kênh, hiệu suất chung
   ========================================================================================= */
function AdminDashboardView({ timeframe, setTimeframe, navigate }) {
  const [labQueue] = useState([
    {
      id: '#LAB-1092',
      customer: 'Trần H. Nam',
      status: 'Đang mài',
      statusTag: 'bg-[#8fcdfd]/40 text-[#004b70]',
      frame: 'Bolon BL3020',
      lens: 'Essilor 1.60 Crizal',
      technician: 'KTV: Lê Văn C',
      deliveryTime: '17:30',
      btnLabel: 'Cập nhật tiến độ',
      btnStyle: 'bg-[#004967] text-white hover:bg-[#086288]'
    },
    {
      id: '#LAB-1091',
      customer: 'Lê Minh Châu',
      status: 'Chờ QC',
      statusTag: 'bg-[#e7eeff] text-[#19648f]',
      frame: 'Ray-Ban RB3025',
      lens: 'Zeiss DriveSafe 1.67',
      technician: 'KTV: Ngô Thế K.',
      deliveryTime: '16:45',
      btnLabel: 'Duyệt QC đạt',
      btnStyle: 'bg-[#e7eeff] text-[#004967] hover:bg-[#dee8ff]'
    },
    {
      id: '#LAB-1089',
      customer: 'Phạm Thu Trang',
      status: 'Sẵn sàng giao',
      statusTag: 'bg-[#c6e7ff]/70 text-[#004967]',
      frame: 'Vogue VO5243SB',
      lens: 'Hoya 1.55 BlueControl',
      technician: 'Đã gửi ZNS thông báo nhận kính',
      isZns: true,
      btnLabel: 'Bàn giao kính',
      btnStyle: 'bg-[#004967] text-white hover:bg-[#086288]'
    }
  ]);

  const [eyeQueue] = useState([
    { id: 1, time: '14:30', tag: 'Ưu tiên', tagStyle: 'bg-[#c6e7ff]/60 text-[#004967]', customer: 'Hoàng Đình Trọng', phone: '0912•••554', service: 'Đo cận loạn học đường' },
    { id: 2, time: '15:00', tag: 'Chờ khám', tagStyle: 'bg-[#e7eeff] text-[#40484e]', customer: 'Vũ Thị Mai Hoa', phone: '0973•••109', service: 'Khám đa tròng PAL' },
    { id: 3, time: '15:30', tag: 'Lịch hẹn', tagStyle: 'bg-[#e7eeff] text-[#40484e]', customer: 'Đỗ Quang Dũng', phone: '0903•••667', service: 'Kiểm tra lại kính cũ' }
  ]);

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
              <span className="font-medium text-[#111c2d]">KTV &amp; Thu ngân:</span> BS. Nguyễn Văn A &amp; NV. Trần Linh
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
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e7eeff] hover:bg-[#dee8ff] text-[#004967] text-xs font-bold transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[17px]">receipt_long</span>
            <span>Quản Lý OMS</span>
          </button>
          <button
            onClick={() => navigate('/pos')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#004967] text-white text-xs font-bold shadow-sm hover:bg-[#086288] transition-all"
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
          <div className="text-2xl font-bold text-[#111c2d] mt-2">48.650.000 đ</div>
          <div className="text-xs text-[#004967] font-semibold mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">trending_up</span> +14.2% so với hôm qua
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Đơn hàng hôm nay</span>
            <span className="p-2 rounded-xl bg-[#dee8ff] text-[#19648f]">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#111c2d] mt-2">34 đơn</div>
          <div className="text-xs text-[#40484e] mt-1">22 đơn có độ • 12 gọng &amp; râm</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Ca đo mắt (FR-EYE)</span>
            <span className="p-2 rounded-xl bg-[#c6e7ff] text-[#004967]">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#111c2d] mt-2">18 ca</div>
          <div className="text-xs text-[#40484e] mt-1">12 hoàn thành • 6 đang chờ</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Đơn Lab chờ xử lý</span>
            <span className="p-2 rounded-xl bg-[#dee8ff] text-[#0f766e]">
              <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#111c2d] mt-2">14 cặp tròng</div>
          <div className="text-xs text-[#0f766e] font-semibold mt-1">Hiệu suất trạm: 94.8% SLA</div>
        </div>
      </div>

      {/* 2 Queue Previews: Lab & Eye */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lab Queue */}
        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#dee8ff]/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#111c2d]">Điều Phối Mài Lắp Kính (Lab Queue)</span>
              <span className="px-2 py-0.5 rounded-full bg-[#e7eeff] text-[#004967] text-xs font-semibold">3 đơn đang làm</span>
            </div>
            <button onClick={() => navigate('/lab')} className="text-xs text-[#004967] hover:underline font-semibold">
              Xem tất cả &gt;
            </button>
          </div>
          <div className="space-y-2.5">
            {labQueue.map(item => (
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
            ))}
          </div>
        </div>

        {/* Eye Exam Queue */}
        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#dee8ff]/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#111c2d]">Hàng Đợi Đo Mắt &amp; Tiếp Nhận</span>
              <span className="w-2 h-2 rounded-full bg-[#004967] animate-pulse" />
            </div>
            <button onClick={() => navigate('/optometry')} className="text-xs text-[#004967] hover:underline font-semibold">
              Vào phòng khám &gt;
            </button>
          </div>
          <div className="space-y-2.5">
            {eyeQueue.map(item => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Omnichannel Revenue Chart */}
      <div className="bg-white p-6 rounded-xl border border-[#dee8ff]/60 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dee8ff]/40 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#111c2d]">Tổng Quan Doanh Thu &amp; Kênh Bán Hàng</h2>
            <p className="text-xs text-[#40484e]">Phân bổ doanh số giữa POS tại cửa hàng và kênh trực tuyến</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#004967]">
              <span className="w-3 h-3 rounded-sm bg-[#004967]" /> POS Cửa hàng: 30.45M (62.6%)
            </span>
            <span className="flex items-center gap-1.5 text-[#8fcdfd]">
              <span className="w-3 h-3 rounded-sm bg-[#8fcdfd]" /> Online: 18.20M (37.4%)
            </span>
          </div>
        </div>

        <div className="h-44 w-full flex items-end justify-between gap-4 pt-6 px-4">
          {[
            { day: 'Thứ 2', pos: 55, onl: 35 },
            { day: 'Thứ 3', pos: 60, onl: 40 },
            { day: 'Thứ 4', pos: 65, onl: 45 },
            { day: 'Thứ 5', pos: 70, onl: 50 },
            { day: 'Thứ 6', pos: 75, onl: 55 },
            { day: 'Hôm nay (T7)', pos: 90, onl: 65 }
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div className="w-full max-w-[48px] flex items-end justify-center gap-1.5 h-full">
                <div style={{ height: `${bar.pos}%` }} className="w-1/2 bg-[#004967] rounded-t-md hover:bg-[#086288] transition-all" />
                <div style={{ height: `${bar.onl}%` }} className="w-1/2 bg-[#8fcdfd] rounded-t-md hover:bg-[#c5e7ff] transition-all" />
              </div>
              <span className="text-xs text-[#40484e] font-semibold">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================================
   2. LAB WORKSTATION VIEW: Chỉ tập trung mài lắp, QC, thông số tròng, máy móc (ẨN DOANH THU)
   ========================================================================================= */
function LabDashboardView({ navigate }) {
  const [labJobs, setLabJobs] = useState([
    { id: '#LAB-2088', orderId: '#OPT-8842-SG', customer: 'Nguyễn Hoàng Nam', frame: 'Bolon BJ3120 Classic', lens: 'Essilor Crizal Rock 1.67 Blue UV', od: '-3.25 / -0.50 x 175°', os: '-2.75 / -0.75 x 05°', pd: '63.0 mm', sh: '21.5 mm', machine: 'Essilor Delta 200', status: 'Đang mài tự động', progress: 65, priority: 'Hỏa tốc 2H' },
    { id: '#LAB-2087', orderId: '#OPT-8835-HN', customer: 'Phạm Thị Bích Ngọc', frame: 'Charmant ZT2233 Titan', lens: 'Varilux Comfort Max Đa Tròng PAL', od: '+1.50 / -0.50 x 90°', os: '+1.25 / -0.25 x 85°', pd: '61.5 mm', sh: '19.5 mm', machine: 'Nidek Me 1200', status: 'Chờ kiểm định QC', progress: 90, priority: 'Khách VIP' },
    { id: '#LAB-2085', orderId: '#OPT-8839-WEB', customer: 'Trịnh Minh Quang', frame: 'Molsion MO5089', lens: 'Tròng Siêu Mỏng 1.74 Freeform', od: '-7.50 / -2.50 x 165°', os: '-7.00 / -2.25 x 15°', pd: '69.0 mm', sh: '23.0 mm', machine: 'Chờ phân công', status: 'Chờ duyệt toa OD/OS', progress: 20, priority: 'Độ cao' }
  ]);

  const handleUpdateJobStatus = (id) => {
    setLabJobs(prev => prev.map(j => {
      if (j.id === id) {
        return { ...j, status: 'Đã hoàn thành QC', progress: 100 };
      }
      return j;
    }));
    message.success(`Đã phê duyệt đạt chuẩn QC cho lệnh ${id}. Chuyển bàn bàn giao!`);
  };

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
            KTV Phụ trách: <strong>Lê Văn Cường [STF-LAB-04]</strong> • Máy Essilor Delta 200: <span className="text-[#0f766e] font-semibold">Online (Ready)</span> • Nidek Me 1200: <span className="text-[#0f766e] font-semibold">Online (Ready)</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/lab')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0f766e] text-white text-xs font-bold shadow-sm hover:bg-[#115e59] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">build</span>
            <span>Màn Hình Mài Kính Chi Tiết</span>
          </button>
        </div>
      </div>

      {/* 4 KPIs chuyên ngành Lab */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Đơn Lab chờ xử lý</span>
            <span className="p-2 rounded-xl bg-[#e7eeff] text-[#0f766e]">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#0f766e] mt-2">14 cặp tròng</div>
          <div className="text-xs text-[#40484e] mt-1">8 đang mài • 6 chờ nhận phôi</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Tỷ lệ đúng hạn SLA</span>
            <span className="p-2 rounded-xl bg-[#c6e7ff] text-[#004967]">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#111c2d] mt-2">98.5%</div>
          <div className="text-xs text-[#004967] font-semibold mt-1">+1.2% so với ca trước</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Chờ kiểm tra QC</span>
            <span className="p-2 rounded-xl bg-[#dee8ff] text-[#19648f]">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#19648f] mt-2">5 cặp</div>
          <div className="text-xs text-[#40484e] mt-1">Chuẩn 12 thông số quang học</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Tỷ lệ mài lại (Scrap)</span>
            <span className="p-2 rounded-xl bg-[#ffdad6] text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[20px]">flaky</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#ba1a1a] mt-2">0.8%</div>
          <div className="text-xs text-[#0f766e] font-semibold mt-1">Đạt chỉ tiêu an toàn (&lt; 1.5%)</div>
        </div>
      </div>

      {/* Main Lab Processing Station Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#dee8ff]/60 overflow-hidden">
        <div className="p-4 bg-[#f0f3ff] flex items-center justify-between border-b border-[#dee8ff]/40">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#111c2d]">Hàng Đợi Gia Công Mài Lắp Kỹ Thuật (Lab Queue)</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0f766e] text-white text-xs font-bold">3 lệnh trực tiếp</span>
          </div>
          <span className="text-xs text-[#70787f]">Tự động đồng bộ hóa lệnh từ OMS &amp; Phòng Khúc Xạ</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#dee8ff]/40 text-[#40484e] text-xs uppercase font-semibold border-b border-[#dee8ff]">
              <tr>
                <th className="py-3 px-4">Lệnh Lab / Đơn OMS</th>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">Gọng kính &amp; Tròng</th>
                <th className="py-3 px-4">Thông số OD / OS [PD, SH]</th>
                <th className="py-3 px-4">Máy gia công</th>
                <th className="py-3 px-4">Tiến độ</th>
                <th className="py-3 px-4 text-right">Tác vụ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dee8ff]/40">
              {labJobs.map(job => (
                <tr key={job.id} className="hover:bg-[#f0f3ff] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#0f766e]">{job.id}</div>
                    <div className="text-xs font-mono text-[#70787f]">{job.orderId}</div>
                    <span className="inline-block mt-1 px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                      {job.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#111c2d]">{job.customer}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-xs text-[#111c2d]">{job.frame}</div>
                    <div className="text-xs text-[#0f766e] font-semibold">{job.lens}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs">
                    <div>OD: {job.od}</div>
                    <div>OS: {job.os}</div>
                    <div className="text-[#004967] font-semibold">PD: {job.pd} | SH: {job.sh}</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-[#40484e]">
                    <span className="material-symbols-outlined text-[15px] align-middle text-[#0f766e] mr-1">precision_manufacturing</span>
                    {job.machine}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-xs font-bold text-[#111c2d] mb-1">{job.status} ({job.progress}%)</div>
                    <div className="w-28 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div style={{ width: `${job.progress}%` }} className="h-full bg-[#0f766e] rounded-full" />
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleUpdateJobStatus(job.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#0f766e] text-white text-xs font-bold hover:bg-[#115e59] transition-all shadow-sm"
                    >
                      Duyệt QC
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================================
   3. OPTOMETRY CLINICAL VIEW: Hàng đợi khám đo mắt, toa y khoa, bệnh án (ẨN DOANH THU)
   ========================================================================================= */
function OptometryDashboardView({ navigate }) {
  const [patients] = useState([
    { id: 1, stt: '01', time: '14:30', name: 'Hoàng Đình Trọng', age: 16, phone: '0912•••554', type: 'Đo cận loạn học đường', status: 'Đang đo khúc xạ', room: 'Phòng 01 (ARK-1s)' },
    { id: 2, stt: '02', time: '15:00', name: 'Vũ Thị Mai Hoa', age: 48, phone: '0973•••109', type: 'Khám đa tròng PAL & Đo Visioffice', status: 'Chờ vào khám', room: 'Phòng 02 (Phoropter)' },
    { id: 3, stt: '03', time: '15:30', name: 'Đỗ Quang Dũng', age: 32, phone: '0903•••667', type: 'Kiểm tra mỏi mắt & Ánh sáng xanh', status: 'Đã check-in', room: 'Ghế chờ A2' }
  ]);

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
            <span className="text-xs text-[#70787f] font-mono">Bác sĩ phụ trách: BS. Lâm Hoàng Phúc (CK1 Mắt)</span>
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
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0284c7] text-white text-xs font-bold shadow-sm hover:bg-[#0369a1] transition-all"
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
          <div className="text-2xl font-bold text-[#0284c7] mt-2">18 ca</div>
          <div className="text-xs text-[#40484e] mt-1">12 đã khám xong • 6 đang chờ</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Ca khúc xạ phức tạp</span>
            <span className="p-2 rounded-xl bg-[#ffdad6] text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[20px]">priority_high</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#ba1a1a] mt-2">5 ca</div>
          <div className="text-xs text-[#ba1a1a] font-semibold mt-1">Loạn thị cao / Cận &gt; 6.0D</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Đa tròng PAL &amp; Lão thị</span>
            <span className="p-2 rounded-xl bg-[#dee8ff] text-[#004967]">
              <span className="material-symbols-outlined text-[20px]">eyeglasses</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#004967] mt-2">4 ca</div>
          <div className="text-xs text-[#40484e] mt-1">Đo thông số cá nhân hóa 3D</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Toa chờ ký duyệt số</span>
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <span className="material-symbols-outlined text-[20px]">draw</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-amber-800 mt-2">3 toa</div>
          <div className="text-xs text-amber-800 font-semibold mt-1">Cần ký duyệt để chuyển Lab</div>
        </div>
      </div>

      {/* Hàng đợi bệnh nhân chi tiết */}
      <div className="bg-white rounded-xl shadow-sm border border-[#dee8ff]/60 overflow-hidden">
        <div className="p-4 bg-[#f0f3ff] flex items-center justify-between border-b border-[#dee8ff]/40">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#111c2d]">Hàng Đợi Tiếp Nhận Đo Mắt Theo Giờ Hẹn</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0284c7] text-white text-xs font-bold">Live Sync</span>
          </div>
          <span className="text-xs text-[#70787f]">Gọi bệnh nhân theo số thứ tự hiển thị tại màn hình chờ sảnh</span>
        </div>

        <div className="divide-y divide-[#dee8ff]/40">
          {patients.map(p => (
            <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#f0f3ff]/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0284c7]/10 text-[#0284c7] flex flex-col items-center justify-center font-mono font-bold">
                  <span className="text-[10px] leading-tight text-[#70787f]">STT</span>
                  <span className="text-lg leading-none">{p.stt}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-[#111c2d]">{p.name}</span>
                    <span className="text-xs text-[#70787f]">({p.age} tuổi)</span>
                    <span className="px-2 py-0.2 rounded-full bg-[#dee8ff] text-[#004967] text-[11px] font-semibold">{p.room}</span>
                  </div>
                  <div className="text-xs text-[#40484e] mt-1">
                    <span className="font-semibold text-[#0284c7]">{p.type}</span> • Giờ hẹn: <span className="font-mono">{p.time}</span> • SĐT: {p.phone}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => navigate('/optometry')}
                  className="px-4 py-2 rounded-xl bg-[#0284c7] text-white text-xs font-bold shadow-sm hover:bg-[#0369a1] transition-all"
                >
                  Vào Khám Ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================================
   4. POS CASHIER VIEW: Quầy thu ngân, quản lý ca trực, tiền mặt két, nhận kính
   ========================================================================================= */
function PosDashboardView({ navigate }) {
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
            <span className="text-xs text-[#70787f] font-mono">Phiên ca: #POS-Q1-2026330</span>
          </div>
          <h1 className="text-2xl text-[#111c2d] font-bold tracking-tight">
            Bàn Làm Việc Ca Trực Thu Ngân &amp; Cửa Hàng Flagship
          </h1>
          <p className="text-xs text-[#40484e] mt-1">
            Thu ngân trực: <strong>Trần Minh Anh [STF-088]</strong> • Ca sáng: <strong>08:30 – 15:30</strong> • Máy in hóa đơn: <span className="text-emerald-700 font-semibold">Kết nối sẵn sàng</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/pos')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#004967] text-white text-sm font-bold shadow-md hover:bg-[#086288] transition-all"
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
          <div className="text-2xl font-bold text-[#004967] mt-2">30.450.000 đ</div>
          <div className="text-xs text-[#004967] font-semibold mt-1">POS Quầy trực tiếp</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Hóa đơn đã xuất</span>
            <span className="p-2 rounded-xl bg-[#dee8ff] text-[#19648f]">
              <span className="material-symbols-outlined text-[20px]">receipt</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#111c2d] mt-2">22 bill</div>
          <div className="text-xs text-[#40484e] mt-1">AOV: 1.384.000 đ / bill</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Tiền mặt trong két</span>
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-emerald-800 mt-2">8.450.000 đ</div>
          <div className="text-xs text-[#70787f] mt-1">Tiền đầu ca: 2.000.000 đ</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#40484e] uppercase tracking-wider">Kính chờ khách nhận</span>
            <span className="p-2 rounded-xl bg-[#c6e7ff] text-[#004967]">
              <span className="material-symbols-outlined text-[20px]">package_2</span>
            </span>
          </div>
          <div className="text-2xl font-bold text-[#004967] mt-2">4 khách</div>
          <div className="text-xs text-[#004967] font-semibold mt-1">Đã mài xong - ZNS thông báo</div>
        </div>
      </div>

      {/* Khách chờ nhận kính tại quầy */}
      <div className="bg-white rounded-xl shadow-sm border border-[#dee8ff]/60 p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-[#dee8ff]/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#111c2d]">Kính Hoàn Thiện Sẵn Sàng Bàn Giao Khách (Pickup Queue)</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">4 sẵn sàng</span>
          </div>
          <span className="text-xs text-[#70787f]">Khách nhận được ZNS mã QR sẽ đến lấy tại quầy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: '#OPT-8830', customer: 'Phạm Thu Trang', phone: '0903•••112', frame: 'Vogue VO5243SB + Hoya BlueControl', slot: 'Khay A-12', payment: 'Đã thanh toán 100%' },
            { id: '#OPT-8828', customer: 'Hoàng Văn Thắng', phone: '0918•••443', frame: 'Ray-Ban RB3025 Aviator', slot: 'Khay A-15', payment: 'Còn nợ 500.000đ khi nhận' }
          ].map(k => (
            <div key={k.id} className="p-3.5 bg-[#f0f3ff] rounded-xl flex items-center justify-between border border-[#dee8ff]/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#004967] text-sm">{k.id}</span>
                  <span className="font-semibold text-sm text-[#111c2d]">{k.customer}</span>
                  <span className="px-2 py-0.2 rounded-full bg-white text-xs font-mono font-bold text-[#004967] border border-[#dee8ff]">{k.slot}</span>
                </div>
                <div className="text-xs text-[#40484e] mt-1">{k.frame}</div>
                <div className="text-xs text-emerald-700 font-semibold mt-0.5">{k.payment}</div>
              </div>
              <button
                onClick={() => message.success(`Bàn giao kính cho khách ${k.customer} thành công!`)}
                className="px-3.5 py-2 rounded-xl bg-[#004967] text-white text-xs font-bold hover:bg-[#086288] transition-all shadow-sm"
              >
                Trả Kính
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
