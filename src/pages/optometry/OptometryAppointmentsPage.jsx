import React, { useState } from 'react';
import { message } from 'antd';

export default function OptometryAppointmentsPage() {
  const [activeQueueTab, setActiveQueueTab] = useState('all');
  const [showKioskModal, setShowKioskModal] = useState(false);

  const handleAction = (msg) => {
    message.success(msg);
  };

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
                Auto-Sync: 08s
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary tracking-tight">Lịch Hẹn &amp; Hàng Đợi Khám Thị Lực</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Quản lý tiếp nhận, phân luồng đo khúc xạ tự động và luân chuyển hồ sơ sang POS.</p>
          </div>

          {/* 5 Compact Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 min-w-fit">
            <div className="bg-surface-container-low p-2.5 rounded-xl border border-[#d8e3fb]/40">
              <div className="flex items-center justify-between text-outline">
                <span className="font-label-md text-label-md">Tổng Ca Hôm Nay</span>
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">28</span>
                <span className="font-body-sm text-body-sm text-outline">ca</span>
              </div>
              <div className="mt-0.5 font-body-sm text-[11px] text-on-surface-variant">
                <strong className="text-primary">18</strong> App • <strong>10</strong> Kiosk
              </div>
            </div>

            <div className="bg-secondary-fixed/40 p-2.5 rounded-xl border border-secondary-fixed">
              <div className="flex items-center justify-between text-primary">
                <span className="font-label-md text-label-md">Đang Chờ Gọi</span>
                <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">06</span>
                <span className="font-body-sm text-body-sm text-primary">người</span>
              </div>
              <div className="mt-0.5 font-body-sm text-[11px] text-on-surface-variant">Sảnh chờ</div>
            </div>

            <div className="bg-primary p-2.5 rounded-xl text-on-primary shadow-xs">
              <div className="flex items-center justify-between text-on-primary/80">
                <span className="font-label-md text-label-md">Đang Khám</span>
                <span className="material-symbols-outlined text-[16px]">meeting_room</span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm text-on-primary font-bold">02</span>
                <span className="font-body-sm text-body-sm text-on-primary/80">/ 02 p.</span>
              </div>
              <div className="mt-0.5 font-body-sm text-[11px] text-on-primary-container truncate">100% công suất</div>
            </div>

            <div className="bg-surface-container-low p-2.5 rounded-xl border border-[#d8e3fb]/40">
              <div className="flex items-center justify-between text-outline">
                <span className="font-label-md text-label-md">Xong &amp; Đẩy Toa</span>
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">15</span>
                <span className="font-body-sm text-body-sm text-outline">hồ sơ</span>
              </div>
              <div className="mt-0.5 font-body-sm text-[11px] text-outline">Đã sang POS</div>
            </div>

            <div className="bg-error-container/30 p-2.5 rounded-xl border border-error-container">
              <div className="flex items-center justify-between text-error">
                <span className="font-label-md text-label-md">Trễ / Vắng</span>
                <span className="material-symbols-outlined text-[16px]">person_off</span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm text-error font-bold">05</span>
                <span className="font-body-sm text-body-sm text-error">lượt</span>
              </div>
              <div className="mt-0.5 font-body-sm text-[11px] text-error/80">Cần liên hệ</div>
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
            />
            <div className="absolute right-1.5 flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-mono text-[10px]">F1</span>
              <button onClick={() => handleAction('Đã tiếp nhận vé hẹn thành công')} className="h-7 px-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center hover:bg-primary transition-colors cursor-pointer">
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
            <button onClick={() => handleAction('Đã làm mới dữ liệu hàng đợi')} className="h-9 w-9 flex-shrink-0 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors cursor-pointer" title="Làm mới">
              <span className="material-symbols-outlined text-[18px]">refresh</span>
            </button>
          </div>

          {/* Filter pills & Room selector */}
          <div className="xl:col-span-5 flex flex-wrap sm:flex-nowrap items-center justify-between xl:justify-end gap-2">
            <div className="flex items-center p-1 rounded-xl bg-surface-container text-on-surface-variant text-label-md font-label-md overflow-x-auto whitespace-nowrap">
              {[
                { id: 'all', label: 'Tất cả (28)' },
                { id: 'waiting', label: 'Chờ (6)' },
                { id: 'in-progress', label: 'Đang khám (2)' },
                { id: 'completed', label: 'Xong (15)' }
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
                      <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[10px] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                        ĐANG KHÁM
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Topcon KR-800 • Kính thử phoropter CV-5000</p>
                  </div>
                </div>
                <span className="font-label-mono text-label-mono text-primary font-bold flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-lg text-xs">
                  <span className="material-symbols-outlined text-[14px]">timer</span> 14:22
                </span>
              </div>

              {/* Staff and Patient info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-2.5">
                <div className="bg-surface-container-low p-2.5 rounded-xl space-y-0.5 border border-[#d8e3fb]/30">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Bác sĩ phụ trách</span>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-[10px]">BS</div>
                    <div>
                      <span className="font-title-md text-title-md text-on-surface block font-semibold leading-tight">BS. Vũ Anh Tuấn</span>
                      <span className="font-body-sm text-outline text-[11px]">CCHN: 014829/BYT-CCHN</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-2.5 rounded-xl space-y-0.5 border border-[#d8e3fb]/30">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Khách hàng hiện tại</span>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-title-md text-title-md text-primary block font-semibold leading-tight">Nguyễn Hoàng Duy</span>
                      <span className="font-body-sm text-on-surface-variant text-[11px]">32t • Nam • STT #04</span>
                    </div>
                    <span className="px-2 py-0.2 rounded-full bg-[#FFEFC4] text-[#78350F] font-label-md text-[10px] font-semibold">VIP Silver</span>
                  </div>
                </div>
              </div>

              {/* 12-Step Progress Bar */}
              <div className="p-2.5 bg-surface-container-low rounded-xl space-y-1.5 border border-[#d8e3fb]/30">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Tiến trình khám khúc xạ tiêu chuẩn:</span>
                  <span className="font-label-mono text-primary font-bold">Bước 07 / 12</span>
                </div>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '58.3%' }}></div>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1 text-primary font-semibold text-[11px]">
                    <span className="material-symbols-outlined text-[13px]">tune</span>
                    Cân bằng thị giác hai mắt (Binocular Balance)
                  </span>
                  <span className="text-outline text-[11px]">Dự kiến: 3 phút</span>
                </div>
              </div>
            </div>

            {/* Room 01 Action buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-end gap-2 border-t border-[#e7eeff] mt-2">
              <button onClick={() => handleAction('Mở hồ sơ lịch sử thị lực bệnh nhân')} className="h-8 px-3 rounded-lg bg-surface-container text-primary font-label-md text-label-md flex items-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[15px]">history</span>
                <span>Lịch Sử Đo</span>
              </button>
              <button onClick={() => handleAction('Mở toa kính đang khám')} className="h-8 px-3 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md flex items-center gap-1 hover:bg-secondary-container transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[15px]">description</span>
                <span>Mở Toa Kính</span>
              </button>
              <button onClick={() => handleAction('Hoàn tất ca khám & đẩy sang POS')} className="h-8 px-3.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1 shadow-xs hover:bg-[#0b4d6b] transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                <span>Hoàn Tất &amp; Đẩy POS</span>
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
                      <span className="px-2 py-0.2 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-[10px] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
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
                      <span className="font-title-md text-title-md text-on-surface block font-semibold leading-tight">Lâm Hoàng Phúc</span>
                      <span className="font-body-sm text-outline text-[11px]">KTV Khúc Xạ Chính [STF-102]</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-2.5 rounded-xl space-y-0.5 border border-[#d8e3fb]/30">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Trạng thái thiết bị</span>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-title-md text-title-md text-primary block font-semibold leading-tight">Nidek RT-5100</span>
                      <span className="font-body-sm text-on-surface-variant text-[11px]">Hiệu chuẩn 08:00 sáng nay • OK</span>
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
                  <span className="font-label-mono text-label-mono text-primary font-bold">Đã chờ: 06 phút</span>
                </div>
                <div className="flex items-center justify-between bg-surface-container-lowest p-2 rounded-lg shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                      #08
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-title-md text-title-md text-on-surface font-semibold">Võ Thị Mai Lan</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-[#FFEFC4] text-[#78350F] font-label-md text-[10px] font-semibold">VIP Gold</span>
                      </div>
                      <span className="font-body-sm text-outline text-[11px]">EP-9921 • Hẹn 09:15 • Đo đa tròng</span>
                    </div>
                  </div>
                  <span className="font-label-md text-label-md text-primary bg-primary/10 px-2 py-0.5 rounded font-semibold text-[10px]">Ưu tiên #1</span>
                </div>
              </div>
            </div>

            {/* Room 02 Action buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-end gap-2 border-t border-[#e7eeff] mt-2">
              <button onClick={() => handleAction('Phòng 02 tạm ngưng nhận ca 5 phút')} className="h-8 px-3 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[15px]">pause_circle</span>
                <span>Tạm Ngưng (5p)</span>
              </button>
              <button onClick={() => handleAction('Đã gọi loa thông báo STT #08 (Võ Thị Mai Lan) vào phòng 02')} className="h-8 px-4 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-1 shadow-xs hover:bg-[#0b4d6b] transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">campaign</span>
                <span>Gọi Vào Khám: #08 (Mai Lan)</span>
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
                <p className="font-body-sm text-body-sm text-on-surface-variant">Thứ tự ưu tiên: VIP &gt; Hẹn đúng giờ E-Pass &gt; Vãng lai tại Kiosk</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  className="h-8 pl-8 pr-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline"
                  placeholder="Tìm theo tên, SĐT, STT..."
                  type="text"
                />
                <span className="material-symbols-outlined absolute left-2 top-1.5 text-outline text-[16px]">search</span>
              </div>
              <button onClick={() => handleAction('Mở bộ lọc danh sách nâng cao')} className="h-8 px-2.5 rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[14px]">tune</span>
                <span>Lọc nâng cao</span>
              </button>
            </div>
          </div>

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
                {/* Row 1: Calling */}
                <tr className="bg-secondary-fixed/15 hover:bg-secondary-fixed/30 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-7 h-7 rounded-lg bg-primary text-on-primary font-bold font-label-mono text-label-mono flex items-center justify-center text-xs">#08</span>
                      <div>
                        <span className="font-label-mono text-label-mono text-primary font-semibold block">EP-9921</span>
                        <span className="text-[10px] text-outline">Ưu tiên #1</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-label-mono text-label-mono text-on-surface font-bold block">09:15</span>
                    <span className="text-[11px] text-primary flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">done_all</span> Đã đến
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-title-md text-title-md text-primary font-semibold block">Võ Thị Mai Lan</span>
                    <span className="text-[11px] text-outline">48t • Nữ • 0903 *** 812</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#FFEFC4] text-[#78350F] font-label-md text-[10px] font-semibold">VIP Gold</span>
                  </td>
                  <td className="py-2.5 px-3 max-w-xs">
                    <span className="font-medium text-on-surface block truncate">Đo đổi tròng đa tròng</span>
                    <span className="text-[11px] text-on-surface-variant">Tái khám 6 tháng, nhìn gần mờ</span>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="px-1.5 py-0.2 rounded bg-surface-container font-label-md text-[10px] text-on-surface flex items-center gap-0.5 w-fit">
                      <span className="material-symbols-outlined text-[12px] text-primary">smartphone</span> App
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-label-md text-label-md text-primary font-semibold">Phòng 02 (Nidek)</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-[10px] font-bold flex items-center gap-1 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                      Đang gọi
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => handleAction('Đã chuyển bệnh nhân Võ Thị Mai Lan vào phòng 02')} className="h-7 px-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 flex items-center gap-1 shadow-xs ml-auto cursor-pointer">
                      <span className="material-symbols-outlined text-[14px]">play_arrow</span> Vào Phòng
                    </button>
                  </td>
                </tr>

                {/* Row 2: Waiting */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-7 h-7 rounded-lg bg-surface-container text-on-surface font-bold font-label-mono text-label-mono flex items-center justify-center text-xs">#09</span>
                      <div>
                        <span className="font-label-mono text-label-mono text-on-surface font-semibold block">EP-9924</span>
                        <span className="text-[10px] text-outline">Chờ 12p</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-label-mono text-label-mono text-on-surface block">09:30</span>
                    <span className="text-[11px] text-outline">Đúng giờ</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-title-md text-title-md text-on-surface block">Trần Đình Khang</span>
                    <span className="text-[11px] text-outline">24t • Nam • 0918 *** 441</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.2 rounded-full bg-surface-container text-on-surface-variant font-label-md text-[10px]">Thành Viên</span>
                  </td>
                  <td className="py-2.5 px-3 max-w-xs">
                    <span className="font-medium text-on-surface block truncate">Đo mắt cận loạn mới</span>
                    <span className="text-[11px] text-on-surface-variant">Mỏi mắt khi nhìn màn hình</span>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="px-1.5 py-0.2 rounded bg-surface-container font-label-md text-[10px] text-on-surface flex items-center gap-0.5 w-fit">
                      <span className="material-symbols-outlined text-[12px] text-primary">language</span> Web
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-label-md text-label-md text-on-surface">Phòng 01 (Topcon)</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-md text-[10px] font-semibold w-fit block">
                      Đang chờ
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => handleAction('Đã gọi loa thông báo STT #09')} className="h-7 px-2.5 rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-secondary-fixed transition-colors flex items-center gap-1 ml-auto cursor-pointer">
                      <span className="material-symbols-outlined text-[14px]">call</span> Gọi số
                    </button>
                  </td>
                </tr>

                {/* Row 3: Missed */}
                <tr className="bg-error-container/15 hover:bg-error-container/25 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-7 h-7 rounded-lg bg-error-container text-error font-bold font-label-mono text-label-mono flex items-center justify-center text-xs">#05</span>
                      <div>
                        <span className="font-label-mono text-label-mono text-error font-semibold block">EP-9912</span>
                        <span className="text-[10px] text-error font-medium">Gọi 3 lần</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-label-mono text-label-mono text-error block">08:45</span>
                    <span className="text-[11px] text-error font-semibold">Trễ 45p</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-title-md text-title-md text-on-surface block">Lê Thị Cẩm Vân</span>
                    <span className="text-[11px] text-outline">39t • Nữ • 0977 *** 210</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.2 rounded-full bg-surface-container text-on-surface-variant font-label-md text-[10px]">Thành Viên</span>
                  </td>
                  <td className="py-2.5 px-3 max-w-xs">
                    <span className="font-medium text-on-surface block truncate">Khám khô mắt &amp; ASXC</span>
                    <span className="text-[11px] text-on-surface-variant">Không có mặt khi gọi số lúc 08:50</span>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="px-1.5 py-0.2 rounded bg-surface-container font-label-md text-[10px] text-on-surface flex items-center gap-0.5 w-fit">
                      <span className="material-symbols-outlined text-[12px] text-primary">smartphone</span> App
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-label-md text-label-md text-outline">Chưa gán phòng</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-error-container text-error font-label-md text-[10px] font-bold flex items-center gap-0.5 w-fit">
                      <span className="material-symbols-outlined text-[12px]">warning</span> Bỏ lỡ lượt
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => handleAction('Đã gọi lại số STT #05 qua điện thoại')} className="h-7 px-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 ml-auto cursor-pointer">
                      <span className="material-symbols-outlined text-[14px]">refresh</span> Gọi Lại
                    </button>
                  </td>
                </tr>

                {/* Row 4: Done & pushed to POS */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-7 h-7 rounded-lg bg-surface-container-high text-on-surface-variant font-bold font-label-mono text-label-mono flex items-center justify-center text-xs">#03</span>
                      <div>
                        <span className="font-label-mono text-label-mono text-outline block">EP-9908</span>
                        <span className="text-[10px] text-outline">Xong 09:05</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-label-mono text-label-mono text-outline block">08:30</span>
                    <span className="text-[11px] text-outline">Hoàn tất</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-title-md text-title-md text-on-surface block">Đặng Minh Quân</span>
                    <span className="text-[11px] text-outline">28t • Nam • 0932 *** 654</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#FFEFC4] text-[#78350F] font-label-md text-[10px]">VIP Plat</span>
                  </td>
                  <td className="py-2.5 px-3 max-w-xs">
                    <span className="font-medium text-on-surface block truncate">Cận loạn cao kèm giác mạc</span>
                    <span className="text-[11px] text-primary font-medium">Toa #TK-2024-089</span>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="px-1.5 py-0.2 rounded bg-surface-container font-label-md text-[10px] text-on-surface flex items-center gap-0.5 w-fit">
                      <span className="material-symbols-outlined text-[12px] text-primary">smartphone</span> App
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-label-md text-label-md text-on-surface">Phòng 01 (BS. Tuấn)</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-md text-[10px] font-semibold flex items-center gap-1 w-fit">
                      <span className="material-symbols-outlined text-[12px]">send_to_mobile</span> Đã Đẩy POS
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => handleAction('Đang mở xem Toa Kính #TK-2024-089')} className="h-7 px-2.5 rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 ml-auto cursor-pointer">
                      <span className="material-symbols-outlined text-[14px]">visibility</span> Xem Toa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2 font-body-sm text-body-sm text-outline">
            <div className="flex items-center gap-2">
              <span>Hiển thị 4 / 28 lượt khám</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Độ trễ trung bình: 4.8 phút/ca
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-md text-label-md cursor-pointer hover:bg-surface-container-high">Trước</button>
              <button className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-md text-label-md font-bold">1</button>
              <button className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-md text-label-md cursor-pointer hover:bg-surface-container-high">2</button>
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
                <p className="font-body-sm text-body-sm text-outline">OptiVision Flagship Q.1 • Kiosk In Nhiệt</p>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl text-center space-y-1 border border-[#d8e3fb]/30">
                <span className="font-label-md text-label-md text-outline block">SỐ THỨ TỰ TIẾP NHẬN</span>
                <span className="font-display-lg text-display-lg text-primary font-bold tracking-tight block">#11</span>
                <div className="font-label-mono text-label-mono text-on-surface">Mã tra cứu: <span className="font-bold">KS-0103</span></div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">Ước tính chờ: ~15 phút</div>
              </div>
              <div className="space-y-1 font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Thời gian cấp số:</span>
                  <span className="font-semibold text-on-surface">Hôm nay • 10:48</span>
                </div>
                <div className="flex justify-between">
                  <span>Phòng dự kiến:</span>
                  <span className="font-semibold text-primary">Phòng 02 (KTV. Phúc)</span>
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
                  onClick={() => {
                    setShowKioskModal(false);
                    handleAction('Đã gửi lệnh in vé nhiệt STT #11 thành công!');
                  }}
                  className="w-1/2 h-9 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1 hover:bg-[#0b4d6b] transition-colors shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>In Phiếu</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
