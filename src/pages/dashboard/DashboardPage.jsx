import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd';

export default function DashboardPage() {
  const navigate = useNavigate();

  // Filter timeframe state
  const [timeframe, setTimeframe] = useState('today');

  // Dynamic Lab queue state to support interactive clicks
  const [labQueue, setLabQueue] = useState([
    {
      id: '#LAB-1092',
      customer: 'Trần H. Nam',
      status: 'Đang mài',
      statusTag: 'bg-[#8fcdfd]/40 text-[#004b70]',
      frame: 'Bolon BL3020',
      lens: 'Essilor 1.60 Crizal',
      technician: 'KTV: Lê Văn C',
      deliveryTime: '17:30',
      isOverdue: false,
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
      isOverdue: false,
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

  // Dynamic Clinical Eye Exam queue
  const [eyeQueue, setEyeQueue] = useState([
    {
      id: 1,
      time: '14:30',
      tag: 'Ưu tiên',
      tagStyle: 'bg-[#c6e7ff]/60 text-[#004967]',
      customer: 'Hoàng Đình Trọng',
      phone: '0912•••554',
      service: 'Đo cận loạn học đường',
      btnLabel: 'Vào khám',
      btnStyle: 'bg-[#004967] text-white hover:bg-[#086288]'
    },
    {
      id: 2,
      time: '15:00',
      tag: 'Chờ khám',
      tagStyle: 'bg-[#e7eeff] text-[#40484e]',
      customer: 'Vũ Thị Mai Hoa',
      phone: '0973•••109',
      service: 'Khám đa tròng PAL',
      btnLabel: 'Nhập toa',
      btnStyle: 'bg-[#e7eeff] text-[#004967] hover:bg-[#dee8ff]'
    },
    {
      id: 3,
      time: '15:30',
      tag: 'Lịch hẹn',
      tagStyle: 'bg-[#e7eeff] text-[#40484e]',
      customer: 'Đỗ Quang Dũng',
      phone: '0903•••667',
      service: 'Kiểm tra lại kính cũ',
      btnLabel: 'Tiếp nhận',
      btnStyle: 'bg-[#e7eeff] text-[#004967] hover:bg-[#dee8ff]'
    }
  ]);

  // Handle Lab action buttons
  const handleLabAction = (item) => {
    if (item.btnLabel === 'Cập nhật tiến độ') {
      Modal.confirm({
        title: `Cập nhật tiến độ gia công ${item.id}`,
        content: `Xác nhận chuyển lệnh mài kính cho bệnh nhân ${item.customer} sang bước "Chờ Kiểm Tra QC"?`,
        onOk: () => {
          setLabQueue((prev) =>
            prev.map((j) =>
              j.id === item.id
                ? {
                    ...j,
                    status: 'Chờ QC',
                    statusTag: 'bg-[#e7eeff] text-[#19648f]',
                    btnLabel: 'Duyệt QC đạt',
                    btnStyle: 'bg-[#e7eeff] text-[#004967] hover:bg-[#dee8ff]'
                  }
                : j
            )
          );
          message.success(`Đã cập nhật trạng thái ${item.id} -> Chờ QC!`);
        }
      });
    } else if (item.btnLabel === 'Duyệt QC đạt') {
      Modal.confirm({
        title: `Phê duyệt kiểm định chất lượng (QC) ${item.id}`,
        content: `Xác nhận tiêu cự, tâm mắt và độ nghiêng của tròng ${item.lens} đạt chuẩn quang học?`,
        onOk: () => {
          setLabQueue((prev) =>
            prev.map((j) =>
              j.id === item.id
                ? {
                    ...j,
                    status: 'Sẵn sàng giao',
                    statusTag: 'bg-[#c6e7ff]/70 text-[#004967]',
                    technician: 'Đã gửi SMS / Zalo thông báo tới khách hàng',
                    isZns: true,
                    btnLabel: 'Bàn giao kính',
                    btnStyle: 'bg-[#004967] text-white hover:bg-[#086288]'
                  }
                : j
            )
          );
          message.success(`Đơn ${item.id} đạt chuẩn QC. Đã sẵn sàng trả khách!`);
        }
      });
    } else {
      Modal.success({
        title: `Bàn giao kính thành công ${item.id}`,
        content: `Đã hoàn tất bàn giao kính cho khách hàng ${item.customer}. Kích hoạt bảo hành điện tử 365 ngày.`
      });
    }
  };

  // Handle Eye queue actions
  const handleEyeAction = (item) => {
    if (item.btnLabel === 'Vào khám' || item.btnLabel === 'Nhập toa') {
      navigate('/optometry');
    } else {
      message.success(`Đã tiếp nhận bệnh nhân ${item.customer} vào phòng chờ đo mắt.`);
    }
  };

  return (
    <main className="relative bg-[#f9f9ff] w-full px-6 sm:px-8 py-6 min-h-screen">
      <div className="flex flex-col w-full space-y-6 pb-12">
        {/* ================= SECTION 1: HEADER & SHIFT CONTEXT ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-xl border border-[#dee8ff]/50 shadow-sm">
          {/* Shift info and title */}
          <div className="flex flex-col space-y-2">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e7eeff] text-[#004967] text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#004967] animate-pulse" />
                  Ca trực Real-time
                </span>
                <span className="font-mono text-xs text-[#40484e] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#19648f]">schedule</span>
                  Ca sáng: 08:00 – 16:30
                </span>
              </div>
              <h1 className="text-2xl text-[#111c2d] font-bold tracking-tight">
                Bàn Làm Việc Ca Trực &amp; Tổng Quan Vận Hành
              </h1>
            </div>

            {/* Context details */}
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
              <span className="text-[#cfdaf2]">•</span>
              <div className="flex items-center gap-1.5 text-[#19648f] font-medium">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>FR-POS/LAB v2.4 Kết nối ổn định</span>
              </div>
            </div>
          </div>

          {/* Timeframe pill & action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Timeframe Switcher */}
            <div className="inline-flex p-1 rounded-lg bg-[#f0f3ff] border border-[#dee8ff]/50 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTimeframe('today')}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeframe === 'today'
                    ? 'bg-white text-[#004967] shadow-sm font-bold'
                    : 'text-[#40484e] hover:text-[#111c2d]'
                }`}
              >
                Hôm nay
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('7days')}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeframe === '7days'
                    ? 'bg-white text-[#004967] shadow-sm font-bold'
                    : 'text-[#40484e] hover:text-[#111c2d]'
                }`}
              >
                7 ngày qua
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('month')}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeframe === 'month'
                    ? 'bg-white text-[#004967] shadow-sm font-bold'
                    : 'text-[#40484e] hover:text-[#111c2d]'
                }`}
              >
                Tháng này
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/pos')}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#e7eeff] text-[#004967] text-xs font-bold hover:bg-[#dee8ff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
                <span>Mở ca POS</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/optometry')}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#004967] text-white text-xs font-bold hover:bg-[#086288] transition-colors shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Tạo lịch đo mắt</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: 4-CARD STATISTICAL KPI MOSAIC ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Doanh thu ca */}
          <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/50 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#40484e] font-semibold">Doanh thu ca trực</span>
              <div className="w-7 h-7 rounded-lg bg-[#f0f3ff] flex items-center justify-center text-[#004967]">
                <span className="material-symbols-outlined text-[16px]">payments</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-2xl text-[#111c2d] font-bold tracking-tight">48.650.000</span>
                <span className="text-xs text-[#40484e] font-semibold">đ</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#19648f]">
                <span className="material-symbols-outlined text-[15px]">trending_up</span>
                <span className="font-bold">+14.2%</span>
                <span className="text-[#40484e]">so với hôm qua</span>
              </div>
            </div>
          </div>

          {/* Card 2: Đơn hàng hôm nay */}
          <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/50 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#40484e] font-semibold">Đơn hàng hôm nay</span>
              <div className="w-7 h-7 rounded-lg bg-[#f0f3ff] flex items-center justify-center text-[#19648f]">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-2xl text-[#111c2d] font-bold tracking-tight">34</span>
                <span className="text-sm text-[#40484e]">đơn</span>
              </div>
              <div className="text-xs text-[#40484e]">22 đơn có độ • 12 gọng &amp; râm</div>
            </div>
          </div>

          {/* Card 3: Ca đo mắt */}
          <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/50 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#40484e] font-semibold">Ca đo mắt (FR-EYE)</span>
              <div className="w-7 h-7 rounded-lg bg-[#f0f3ff] flex items-center justify-center text-[#004967]">
                <span className="material-symbols-outlined text-[16px]">visibility</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-2xl text-[#111c2d] font-bold tracking-tight">18</span>
                <span className="text-sm text-[#40484e]">ca</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#19648f] font-bold">12 hoàn thành</span>
                <span className="text-[#cfdaf2]">•</span>
                <span className="text-[#40484e]">6 đang chờ</span>
              </div>
            </div>
          </div>

          {/* Card 4: Đơn Lab chờ xử lý */}
          <div className="bg-white p-5 rounded-xl border border-[#dee8ff]/50 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#40484e] font-semibold">Đơn Lab chờ xử lý</span>
              <div className="w-7 h-7 rounded-lg bg-[#f0f3ff] flex items-center justify-center text-[#004967]">
                <span className="material-symbols-outlined text-[16px]">precision_manufacturing</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-2xl text-[#111c2d] font-bold tracking-tight">14</span>
                <span className="text-sm text-[#40484e]">cặp tròng</span>
              </div>
              <div className="text-xs text-[#19648f] font-semibold">Hiệu suất trạm: 94.8% SLA</div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: CORE WORKFLOW BENTO GRID ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left: Điều Phối Mài Lắp Kính (Lab Queue) */}
          <div className="xl:col-span-7 flex flex-col space-y-4">
            <div className="bg-white rounded-xl p-5 border border-[#dee8ff]/50 shadow-sm">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#dee8ff]/60">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base text-[#111c2d] font-bold">
                      Điều Phối Mài Lắp Kính (Lab Queue)
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-[#e7eeff] text-[#004967] text-[11px] font-bold">
                      {labQueue.length} đơn đang làm
                    </span>
                  </div>
                  <p className="text-xs text-[#40484e] mt-0.5">
                    Tiến độ gia công mài lắp kính theo quy chuẩn kỹ thuật
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/lab')}
                  className="text-[#19648f] text-xs font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Xem tất cả</span>
                  <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                </button>
              </div>

              {/* Lab Queue Cards */}
              <div className="mt-3.5 space-y-2.5">
                {labQueue.map((job) => (
                  <div
                    key={job.id}
                    className="p-3.5 rounded-lg bg-white border border-[#dee8ff]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#f0f3ff] transition-colors"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#004967] text-xs">{job.id}</span>
                        <span className="text-sm text-[#111c2d] font-bold">{job.customer}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${job.statusTag}`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#40484e]">
                        <span className="text-[#111c2d]">Gọng:</span> {job.frame} •{' '}
                        <span className="text-[#19648f]">Tròng:</span> {job.lens}
                      </div>
                      <div className="text-xs text-[#40484e] flex items-center gap-2">
                        {job.isZns ? (
                          <span className="text-[#19648f] flex items-center gap-1 font-medium">
                            <span className="material-symbols-outlined text-[14px]">sms</span>
                            {job.technician}
                          </span>
                        ) : (
                          <>
                            <span>{job.technician}</span>
                            <span className="text-[#cfdaf2]">•</span>
                            <span className="text-[#ba1a1a] font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]">alarm</span>
                              Hẹn trả: {job.deliveryTime}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleLabAction(job)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer ${job.btnStyle}`}
                    >
                      {job.btnLabel}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Hàng Đợi Đo Mắt & Tiếp Nhận */}
          <div className="xl:col-span-5 flex flex-col space-y-4">
            <div className="bg-white rounded-xl p-5 border border-[#dee8ff]/50 shadow-sm">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#dee8ff]/60">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base text-[#111c2d] font-bold">Hàng Đợi Đo Mắt &amp; Tiếp Nhận</h2>
                    <span className="w-2 h-2 rounded-full bg-[#19648f] animate-pulse" />
                  </div>
                  <p className="text-xs text-[#40484e] mt-0.5">Lịch hẹn khám mắt ca trực hôm nay</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/optometry')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#e7eeff] text-[#004967] text-xs font-bold hover:bg-[#dee8ff] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                  <span>Thêm ca</span>
                </button>
              </div>

              {/* Queue Items */}
              <div className="mt-3.5 space-y-2.5">
                {eyeQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-white border border-[#dee8ff]/60 flex items-center justify-between gap-3 hover:bg-[#f0f3ff] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-2 py-1.5 rounded-md font-mono text-center min-w-[54px] ${item.tagStyle}`}
                      >
                        <div className="text-xs font-bold leading-tight">{item.time}</div>
                        <div className="text-[10px] uppercase font-bold">{item.tag}</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#111c2d] font-bold">{item.customer}</div>
                        <div className="text-xs text-[#40484e]">
                          {item.phone} • {item.service}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleEyeAction(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer ${item.btnStyle}`}
                    >
                      {item.btnLabel}
                    </button>
                  </div>
                ))}
              </div>

              {/* Clinic Equipment Calibration Footer */}
              <div className="mt-3.5 pt-2.5 border-t border-[#dee8ff]/60 flex items-center justify-between text-xs text-[#40484e]">
                <div className="flex items-center gap-1.5 text-[#19648f] font-semibold">
                  <span className="material-symbols-outlined text-[16px]">devices_other</span>
                  <span>Máy ARK-1s: Đã hiệu chuẩn</span>
                </div>
                <span className="font-bold text-[#111c2d]">Phòng đo 01 &amp; 02</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 4: OMNICHANNEL REVENUE ANALYTICS & CHART ================= */}
        <div className="bg-white rounded-xl p-5 border border-[#dee8ff]/50 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#dee8ff]/60">
            <div>
              <h2 className="text-base text-[#111c2d] font-bold">
                Tổng Quan Doanh Thu &amp; Kênh Bán Hàng
              </h2>
              <p className="text-xs text-[#40484e] mt-0.5">
                Phân bổ doanh số giữa POS tại cửa hàng và kênh trực tuyến
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#004967]" />
                <span className="text-[#111c2d]">POS Cửa hàng: 30.45M (62.6%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8fcdfd]" />
                <span className="text-[#40484e]">Online: 18.20M (37.4%)</span>
              </div>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="w-full h-44 py-2 mt-2">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 150">
              {/* Grid guide lines */}
              <line
                className="text-[#dee8ff]/60"
                stroke="currentColor"
                strokeDasharray="3 3"
                x1="0"
                x2="600"
                y1="20"
                y2="20"
              />
              <line
                className="text-[#dee8ff]/60"
                stroke="currentColor"
                strokeDasharray="3 3"
                x1="0"
                x2="600"
                y1="65"
                y2="65"
              />
              <line
                className="text-[#dee8ff]/60"
                stroke="currentColor"
                strokeDasharray="3 3"
                x1="0"
                x2="600"
                y1="110"
                y2="110"
              />
              <line className="text-[#dee8ff]" stroke="currentColor" x1="0" x2="600" y1="145" y2="145" />

              {/* Day 1: Thứ 2 */}
              <rect className="fill-[#004967]" height="85" rx="2" width="18" x="36" y="60" />
              <rect className="fill-[#8fcdfd]" height="55" rx="2" width="18" x="58" y="90" />

              {/* Day 2: Thứ 3 */}
              <rect className="fill-[#004967]" height="95" rx="2" width="18" x="126" y="50" />
              <rect className="fill-[#8fcdfd]" height="52" rx="2" width="18" x="148" y="93" />

              {/* Day 3: Thứ 4 */}
              <rect className="fill-[#004967]" height="100" rx="2" width="18" x="216" y="45" />
              <rect className="fill-[#8fcdfd]" height="65" rx="2" width="18" x="238" y="80" />

              {/* Day 4: Thứ 5 */}
              <rect className="fill-[#004967]" height="110" rx="2" width="18" x="306" y="35" />
              <rect className="fill-[#8fcdfd]" height="70" rx="2" width="18" x="328" y="75" />

              {/* Day 5: Thứ 6 */}
              <rect className="fill-[#004967]" height="115" rx="2" width="18" x="396" y="30" />
              <rect className="fill-[#8fcdfd]" height="80" rx="2" width="18" x="418" y="65" />

              {/* Day 6: Hôm nay (T7) */}
              <rect className="fill-[#004967]" height="130" rx="2" width="18" x="486" y="15" />
              <rect className="fill-[#8fcdfd]" height="92" rx="2" width="18" x="508" y="53" />
            </svg>
          </div>

          {/* Days axis */}
          <div className="grid grid-cols-6 text-center text-xs text-[#40484e] pt-1 pb-3 border-b border-[#dee8ff]/60">
            <span>Thứ 2</span>
            <span>Thứ 3</span>
            <span>Thứ 4</span>
            <span>Thứ 5</span>
            <span>Thứ 6</span>
            <span className="text-[#004967] font-bold">Hôm nay (T7)</span>
          </div>

          {/* Analytics Summary Footer */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between text-xs text-[#40484e]">
            <div className="flex items-center gap-3">
              <span>
                Tỷ lệ hoàn tất thanh toán: <strong className="text-[#111c2d]">98.2%</strong>
              </span>
              <span className="text-[#cfdaf2]">•</span>
              <span>
                AOV trung bình: <strong className="text-[#004967]">2.210.000 đ</strong>
              </span>
            </div>
            <a
              href="#reports"
              onClick={(e) => {
                e.preventDefault();
                message.info('Hệ thống báo cáo chi tiết KPIs đang kết nối dữ liệu từ Cloud Data Warehouse.');
              }}
              className="text-[#19648f] font-bold hover:underline flex items-center gap-0.5"
            >
              <span>Xem báo cáo chi tiết</span>
              <span className="material-symbols-outlined text-[15px]">chevron_right</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
