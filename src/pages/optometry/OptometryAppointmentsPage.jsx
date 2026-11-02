import React, { useState } from 'react';
import { message } from 'antd';

export default function OptometryAppointmentsPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full px-space-lg py-space-md space-y-space-lg">

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_4px_20px_-2px_rgba(8,98,136,0.06)]">
<div className="space-y-1">
<div className="flex items-center gap-space-sm">
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">FR-EYE-01 • Điều Phối Thời Gian Thực</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-md text-label-md">
<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
          Auto-Sync Hàng Đợi: 08s
        </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Lịch Hẹn &amp; Hàng Đợi Khám Thị Lực</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Quản lý tiếp nhận, phân luồng đo khúc xạ tự động và luân chuyển hồ sơ lâm sàng sang hệ thống POS.</p>
</div>

<div className="grid grid-cols-2 sm:grid-cols-5 gap-space-sm min-w-fit">
<div className="bg-surface-container-low p-space-sm rounded-xl">
<div className="flex items-center justify-between text-outline">
<span className="font-label-md text-label-md">Tổng Ca Hôm Nay</span>
<span className="material-symbols-outlined text-[18px]">calendar_today</span>
</div>
<div className="mt-1 flex items-baseline gap-1">
<span className="font-headline-md text-headline-md text-on-surface font-bold">28</span>
<span className="font-body-sm text-body-sm text-outline">ca</span>
</div>
<div className="mt-1 font-body-sm text-body-sm text-on-surface-variant flex gap-1">
<span className="text-primary font-semibold">18</span> E-Pass • <span className="font-semibold">10</span> Kiosk
        </div>
</div>
<div className="bg-secondary-fixed/50 p-space-sm rounded-xl">
<div className="flex items-center justify-between text-primary">
<span className="font-label-md text-label-md">Đang Chờ Gọi</span>
<span className="material-symbols-outlined text-[18px]">hourglass_top</span>
</div>
<div className="mt-1 flex items-baseline gap-1">
<span className="font-headline-md text-headline-md text-primary font-bold">06</span>
<span className="font-body-sm text-body-sm text-primary">người</span>
</div>
<div className="mt-1 font-body-sm text-body-sm text-on-surface-variant">Check-in tại sảnh</div>
</div>
<div className="bg-primary p-space-sm rounded-xl text-on-primary">
<div className="flex items-center justify-between text-on-primary/80">
<span className="font-label-md text-label-md">Đang Khám</span>
<span className="material-symbols-outlined text-[18px]">meeting_room</span>
</div>
<div className="mt-1 flex items-baseline gap-1">
<span className="font-headline-md text-headline-md text-on-primary font-bold">02</span>
<span className="font-body-sm text-body-sm text-on-primary/80">/ 02 phòng</span>
</div>
<div className="mt-1 font-body-sm text-body-sm text-on-primary-container truncate">100% công suất</div>
</div>
<div className="bg-surface-container-low p-space-sm rounded-xl">
<div className="flex items-center justify-between text-outline">
<span className="font-label-md text-label-md">Xong &amp; Đẩy Toa</span>
<span className="material-symbols-outlined text-[18px]">check_circle</span>
</div>
<div className="mt-1 flex items-baseline gap-1">
<span className="font-headline-md text-headline-md text-on-surface font-bold">15</span>
<span className="font-body-sm text-body-sm text-outline">hồ sơ</span>
</div>
<div className="mt-1 font-body-sm text-body-sm text-outline">Đã chuyển quầy POS</div>
</div>
<div className="bg-error-container/40 p-space-sm rounded-xl">
<div className="flex items-center justify-between text-error">
<span className="font-label-md text-label-md">Trễ / Vắng Mặt</span>
<span className="material-symbols-outlined text-[18px]">person_off</span>
</div>
<div className="mt-1 flex items-baseline gap-1">
<span className="font-headline-md text-headline-md text-error font-bold">05</span>
<span className="font-body-sm text-body-sm text-error">lượt</span>
</div>
<div className="mt-1 font-body-sm text-body-sm text-error/80">Cần liên hệ lại</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-center bg-surface-container-lowest p-space-md rounded-xl shadow-[0_4px_20px_-2px_rgba(8,98,136,0.04)]">

<div className="xl:col-span-4 relative flex items-center">
<div className="absolute left-3.5 flex items-center text-primary pointer-events-none">
<span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
</div>
<input autocomplete="off" className="w-full h-12 pl-11 pr-24 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:shadow-[0_0_0_3px_rgba(151,215,255,0.6)] outline-none transition-all placeholder:text-outline" id="qr-scan-input" placeholder="Quét mã QR E-Pass hoặc nhập mã vé hẹn (F1)..." type="text"/>
<div className="absolute right-2 flex items-center gap-1">
<kbd className="px-2 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-mono text-label-mono text-[11px] shadow-sm">F1</kbd>
<button className="h-8 px-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1 hover:bg-primary transition-colors" id="btn-fast-checkin">
<span>Tiếp</span>
</button>
</div>
</div>

<div className="xl:col-span-3 flex items-center gap-space-sm">
<button className="w-full h-12 px-4 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(8,98,136,0.2)] hover:bg-[#0b4d6b] transition-all active:scale-[0.99]" id="btn-print-kiosk-ticket">
<span className="material-symbols-outlined text-[20px]">confirmation_number</span>
<span>Phát Số Vãng Lai Mới</span>
</button>
<button className="h-12 w-12 flex-shrink-0 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors" title="Làm mới hàng đợi">
<span className="material-symbols-outlined text-[20px]">refresh</span>
</button>
</div>

<div className="xl:col-span-5 flex flex-wrap sm:flex-nowrap items-center justify-between xl:justify-end gap-space-sm">

<div className="flex items-center p-1 rounded-full bg-surface-container text-on-surface-variant text-label-md font-label-md overflow-x-auto max-w-full">
<button className="queue-tab-filter px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary font-bold shadow-sm transition-all" data-status="all">Tất cả (28)</button>
<button className="queue-tab-filter px-3 py-1.5 rounded-full hover:text-primary transition-all" data-status="waiting">Chờ (6)</button>
<button className="queue-tab-filter px-3 py-1.5 rounded-full hover:text-primary transition-all" data-status="in-progress">Đang khám (2)</button>
<button className="queue-tab-filter px-3 py-1.5 rounded-full hover:text-primary transition-all" data-status="completed">Xong (15)</button>
</div>

<div className="relative min-w-[210px]">
<select className="w-full h-10 pl-3 pr-8 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md appearance-none outline-none focus:shadow-[0_0_0_3px_rgba(151,215,255,0.6)] cursor-pointer" id="room-filter-select">
<option value="all">Tất Cả Phòng Khám</option>
<option value="room-1">Phòng 01 (Topcon KR-800)</option>
<option value="room-2">Phòng 02 (Nidek RT-5100)</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-[18px]">expand_more</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">

<div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_20px_-2px_rgba(8,98,136,0.06)] flex flex-col justify-between">
<div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
<div>

<div className="flex items-center justify-between pb-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
<span>01</span>
</div>
<div>
<div className="flex items-center gap-2">
<h2 className="font-headline-sm text-headline-sm text-primary">Phòng Đo Mắt 01</h2>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                  ĐANG KHÁM
                </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Topcon KR-800 Auto Ref-Keratometer • Kính thử phoropter CV-5000</p>
</div>
</div>
<div className="text-right">
<span className="font-label-mono text-label-mono text-primary font-bold flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-lg">
<span className="material-symbols-outlined text-[16px]">timer</span> 14:22
            </span>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md py-space-sm">
<div className="bg-surface-container-low p-space-sm rounded-xl space-y-1">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Bác sĩ phụ trách</span>
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-semibold text-xs">BS</div>
<div>
<span className="font-title-md text-title-md text-on-surface block leading-tight">BS. Vũ Anh Tuấn</span>
<span className="font-body-sm text-body-sm text-outline">CCHN: 014829/BYT-CCHN</span>
</div>
</div>
</div>
<div className="bg-surface-container-low p-space-sm rounded-xl space-y-1">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Khách hàng hiện tại</span>
<div className="flex items-center justify-between">
<div>
<span className="font-title-md text-title-md text-primary block leading-tight">Nguyễn Hoàng Duy</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">32 tuổi • Nam • STT #04</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-[#FFEFC4] text-[#78350F] font-label-md text-label-md">VIP Silver</span>
</div>
</div>
</div>

<div className="mt-space-md p-space-md bg-surface-container-low rounded-xl space-y-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface">Tiến trình khám khúc xạ 12 bước tiêu chuẩn:</span>
<span className="font-label-mono text-label-mono text-primary font-bold">Bước 07 / 12</span>
</div>

<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '58.3%' }}></div>
</div>
<div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
<span className="flex items-center gap-1 text-primary font-semibold">
<span className="material-symbols-outlined text-[16px]">tune</span>
              Đang thử kính mẫu &amp; Cân bằng thị giác hai mắt (Binocular Balance)
            </span>
<span className="text-outline">Dự kiến xong: 3 phút</span>
</div>
</div>
</div>

<div className="pt-space-md flex flex-wrap items-center justify-end gap-space-sm">
<button className="h-10 px-4 rounded-xl bg-surface-container text-primary font-label-md text-label-md flex items-center gap-2 hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[18px]">history_toggle_off</span>
<span>Xem Lịch Sử Thị Lực</span>
</button>
<button className="h-10 px-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md flex items-center gap-2 hover:bg-secondary-container transition-colors">
<span className="material-symbols-outlined text-[18px]">description</span>
<span>Mở Toa Kính Đang Khám</span>
</button>
<button className="h-10 px-5 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-sm hover:bg-[#0b4d6b] transition-all">
<span className="material-symbols-outlined text-[18px]">check_circle</span>
<span>Hoàn Tất &amp; Đẩy Toa POS</span>
</button>
</div>
</div>

<div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_20px_-2px_rgba(8,98,136,0.06)] flex flex-col justify-between">
<div className="absolute -right-12 -top-12 w-48 h-48 bg-secondary-fixed/30 rounded-full blur-2xl pointer-events-none"></div>
<div>

<div className="flex items-center justify-between pb-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center font-bold">
<span>02</span>
</div>
<div>
<div className="flex items-center gap-2">
<h2 className="font-headline-sm text-headline-sm text-primary">Phòng Đo Mắt 02</h2>
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  SẴN SÀNG TIẾP NHẬN
                </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Nidek RT-5100 Intelligent Refractor • Bảng đo thị lực điện tử SC-1600</p>
</div>
</div>
<div className="text-right">
<span className="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded-lg">
<span className="material-symbols-outlined text-[16px]">check</span> Chờ gọi ca mới
            </span>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md py-space-sm">
<div className="bg-surface-container-low p-space-sm rounded-xl space-y-1">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Kỹ thuật viên trực</span>
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-semibold text-xs">KTV</div>
<div>
<span className="font-title-md text-title-md text-on-surface block leading-tight">Lâm Hoàng Phúc</span>
<span className="font-body-sm text-body-sm text-outline">KTV Khúc Xạ Chính [STF-102]</span>
</div>
</div>
</div>
<div className="bg-surface-container-low p-space-sm rounded-xl space-y-1">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Trạng thái thiết bị</span>
<div className="flex items-center justify-between">
<div>
<span className="font-title-md text-title-md text-primary block leading-tight">Nidek RT-5100</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hiệu chuẩn 08:00 sáng nay • OK</span>
</div>
<span className="material-symbols-outlined text-primary text-[22px]">verified</span>
</div>
</div>
</div>

<div className="mt-space-md p-space-md bg-secondary-fixed/30 rounded-xl space-y-2">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-primary uppercase font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">notifications_active</span>
              Bệnh nhân kế tiếp theo thứ tự ưu tiên
            </span>
<span className="font-label-mono text-label-mono text-primary font-bold">Đã chờ: 06 phút</span>
</div>
<div className="flex items-center justify-between bg-surface-container-lowest p-space-sm rounded-lg">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                #08
              </div>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Võ Thị Mai Lan</span>
<span className="px-2 py-0.5 rounded-full bg-[#FFEFC4] text-[#78350F] font-label-md text-label-md font-semibold">VIP Gold</span>
</div>
<span className="font-body-sm text-body-sm text-outline">E-Pass: EP-9921 • Hẹn lúc 09:15 • Đo tái khám &amp; Đổi tròng đa tròng</span>
</div>
</div>
<div className="text-right">
<span className="font-label-md text-label-md text-primary bg-primary/10 px-2 py-1 rounded">Ưu tiên số 1</span>
</div>
</div>
</div>
</div>

<div className="pt-space-md flex flex-wrap items-center justify-end gap-space-sm">
<button className="h-10 px-4 rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center gap-2 hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[18px]">pause_circle</span>
<span>Tạm Ngưng Nhận Ca (5p)</span>
</button>
<button className="h-10 px-6 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-2 shadow-[0_4px_14px_rgba(8,98,136,0.25)] hover:bg-[#0b4d6b] transition-all scale-100 active:scale-95 animate-pulse">
<span className="material-symbols-outlined text-[20px]">campaign</span>
<span>Gọi Vào Khám: STT #08 (Võ Thị Mai Lan)</span>
</button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_20px_-2px_rgba(8,98,136,0.06)] space-y-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">format_list_numbered</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-primary">Danh Sách Hàng Đợi &amp; Tiếp Nhận Khám</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Sắp xếp theo thứ tự ưu tiên: VIP &gt; Hẹn đúng giờ E-Pass &gt; Vãng lai tại Kiosk</p>
</div>
</div>
<div className="flex items-center gap-2">
<div className="relative">
<input className="h-9 pl-9 pr-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_rgba(8,98,136,0.3)] outline-none transition-all placeholder:text-outline" placeholder="Tìm theo tên, SĐT, STT..." type="text"/>
<span className="material-symbols-outlined absolute left-2.5 top-2 text-outline text-[18px]">search</span>
</div>
<button className="h-9 px-3 rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center gap-1.5 hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[16px]">tune</span>
<span>Lọc nâng cao</span>
</button>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left font-body-md text-body-md">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
<th className="py-3 px-4 rounded-l-xl">STT / Mã Vé</th>
<th className="py-3 px-3">Giờ Hẹn</th>
<th className="py-3 px-4">Bệnh Nhân &amp; Độ Tuổi</th>
<th className="py-3 px-3">Hạng Khách</th>
<th className="py-3 px-4">Lý Do Khám / Triệu Chứng</th>
<th className="py-3 px-3">Nguồn</th>
<th className="py-3 px-3">Phòng Đề Xuất</th>
<th className="py-3 px-3">Trạng Thái</th>
<th className="py-3 px-4 text-right rounded-r-xl">Thao Tác</th>
</tr>
</thead>
<tbody className="divide-y-0 space-y-2">

<tr className="bg-secondary-fixed/15 hover:bg-secondary-fixed/30 transition-colors group">
<td className="py-3.5 px-4 rounded-l-xl">
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold font-label-mono text-label-mono flex items-center justify-center">#08</span>
<div>
<span className="font-label-mono text-label-mono text-primary font-semibold block">EP-9921</span>
<span className="font-body-sm text-body-sm text-outline">Ưu tiên #1</span>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-mono text-label-mono text-on-surface font-bold block">09:15</span>
<span className="font-body-sm text-body-sm text-primary flex items-center gap-0.5">
<span className="material-symbols-outlined text-[14px]">done_all</span> Đã đến
              </span>
</td>
<td className="py-3.5 px-4">
<span className="font-title-md text-title-md text-primary font-semibold block">Võ Thị Mai Lan</span>
<span className="font-body-sm text-body-sm text-outline">48t • Nữ • 0903 *** 812</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-[#FFEFC4] text-[#78350F] font-label-md text-label-md font-semibold">VIP Gold</span>
</td>
<td className="py-3.5 px-4 max-w-xs">
<span className="font-title-md text-title-md text-on-surface block truncate">Đo đổi tròng đa tròng (Presbyopia)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Tái khám định kỳ 6 tháng, nhìn gần mờ</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-md text-label-md text-on-surface flex items-center gap-1 w-fit">
<span className="material-symbols-outlined text-[14px] text-primary">smartphone</span> App
              </span>
</td>
<td className="py-3.5 px-3">
<span className="font-label-md text-label-md text-primary font-semibold">Phòng 02 (Nidek)</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold flex items-center gap-1 w-fit">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                Đang gọi vào
              </span>
</td>
<td className="py-3.5 px-4 text-right rounded-r-xl">
<div className="flex items-center justify-end gap-1.5">
<button className="h-8 px-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[16px]">play_arrow</span> Vào Phòng
                </button>
<button className="h-8 w-8 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high flex items-center justify-center" title="Đổi phòng khám">
<span className="material-symbols-outlined text-[16px]">swap_horiz</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-4 rounded-l-xl">
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-lg bg-surface-container text-on-surface font-bold font-label-mono text-label-mono flex items-center justify-center">#09</span>
<div>
<span className="font-label-mono text-label-mono text-on-surface font-semibold block">EP-9924</span>
<span className="font-body-sm text-body-sm text-outline">Chờ 12p</span>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-mono text-label-mono text-on-surface block">09:30</span>
<span className="font-body-sm text-body-sm text-outline">Đúng giờ</span>
</td>
<td className="py-3.5 px-4">
<span className="font-title-md text-title-md text-on-surface block">Trần Đình Khang</span>
<span className="font-body-sm text-body-sm text-outline">24t • Nam • 0918 *** 441</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md">Thành Viên</span>
</td>
<td className="py-3.5 px-4 max-w-xs">
<span className="font-title-md text-title-md text-on-surface block truncate">Đo mắt cận loạn mới</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Làm việc màn hình nhiều, mỏi mắt nhức đầu</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-md text-label-md text-on-surface flex items-center gap-1 w-fit">
<span className="material-symbols-outlined text-[14px] text-primary">language</span> Web
              </span>
</td>
<td className="py-3.5 px-3">
<span className="font-label-md text-label-md text-on-surface">Phòng 01 (Topcon)</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold w-fit block">
                Đang chờ
              </span>
</td>
<td className="py-3.5 px-4 text-right rounded-r-xl">
<div className="flex items-center justify-end gap-1.5">
<button className="h-8 px-3 rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-secondary-fixed transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">call</span> Gọi số
                </button>
<button className="h-8 w-8 rounded-lg bg-surface-container-low text-outline hover:text-on-surface flex items-center justify-center" title="Thao tác khác">
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-4 rounded-l-xl">
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-lg bg-surface-container text-on-surface font-bold font-label-mono text-label-mono flex items-center justify-center">#10</span>
<div>
<span className="font-label-mono text-label-mono text-on-surface font-semibold block">KS-0102</span>
<span className="font-body-sm text-body-sm text-outline">Chờ 08p</span>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-mono text-label-mono text-on-surface block">09:35</span>
<span className="font-body-sm text-body-sm text-outline">Lấy số quầy</span>
</td>
<td className="py-3.5 px-4">
<span className="font-title-md text-title-md text-on-surface block">Phạm Gia Hưng</span>
<span className="font-body-sm text-body-sm text-outline">19t • Nam • 0382 *** 773</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed/50 text-primary font-label-md text-label-md">Khách Mới</span>
</td>
<td className="py-3.5 px-4 max-w-xs">
<span className="font-title-md text-title-md text-on-surface block truncate">Kiểm tra thị lực tổng quát</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Làm vỡ kính cũ, cần cắt kính gấp</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-md text-label-md text-on-surface flex items-center gap-1 w-fit">
<span className="material-symbols-outlined text-[14px] text-primary">point_of_sale</span> Kiosk Q1
              </span>
</td>
<td className="py-3.5 px-3">
<span className="font-label-md text-label-md text-outline">Tự động điều phối</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold w-fit block">
                Đang chờ
              </span>
</td>
<td className="py-3.5 px-4 text-right rounded-r-xl">
<div className="flex items-center justify-end gap-1.5">
<button className="h-8 px-3 rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-secondary-fixed transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">call</span> Gọi số
                </button>
<button className="h-8 w-8 rounded-lg bg-surface-container-low text-outline hover:text-on-surface flex items-center justify-center" title="Thao tác khác">
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="bg-error-container/20 hover:bg-error-container/30 transition-colors">
<td className="py-3.5 px-4 rounded-l-xl">
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-lg bg-error-container text-error font-bold font-label-mono text-label-mono flex items-center justify-center">#05</span>
<div>
<span className="font-label-mono text-label-mono text-error font-semibold block">EP-9912</span>
<span className="font-body-sm text-body-sm text-error">Gọi 3 lần</span>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-mono text-label-mono text-error block">08:45</span>
<span className="font-body-sm text-body-sm text-error font-semibold">Trễ 45 phút</span>
</td>
<td className="py-3.5 px-4">
<span className="font-title-md text-title-md text-on-surface block">Lê Thị Cẩm Vân</span>
<span className="font-body-sm text-body-sm text-outline">39t • Nữ • 0977 *** 210</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md">Thành Viên</span>
</td>
<td className="py-3.5 px-4 max-w-xs">
<span className="font-title-md text-title-md text-on-surface block truncate">Kiểm tra khô mắt &amp; Cắt kính chống ASXC</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Không có mặt khi gọi số lúc 08:50</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-md text-label-md text-on-surface flex items-center gap-1 w-fit">
<span className="material-symbols-outlined text-[14px] text-primary">smartphone</span> App
              </span>
</td>
<td className="py-3.5 px-3">
<span className="font-label-md text-label-md text-outline">Chưa phân phòng</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-error-container text-error font-label-md text-label-md font-bold flex items-center gap-1 w-fit">
<span className="material-symbols-outlined text-[14px]">warning</span> Bỏ lỡ lượt
              </span>
</td>
<td className="py-3.5 px-4 text-right rounded-r-xl">
<div className="flex items-center justify-end gap-1.5">
<button className="h-8 px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">refresh</span> Gọi Lại
                </button>
<button className="h-8 px-2 rounded-lg bg-error-container text-error hover:bg-error hover:text-on-error transition-colors text-xs font-semibold" title="Đóng ca hủy">
                  Hủy Ca
                </button>
</div>
</td>
</tr>

<tr className="opacity-75 hover:opacity-100 hover:bg-surface-container-low transition-all">
<td className="py-3.5 px-4 rounded-l-xl">
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant font-bold font-label-mono text-label-mono flex items-center justify-center">#03</span>
<div>
<span className="font-label-mono text-label-mono text-outline block">EP-9908</span>
<span className="font-body-sm text-body-sm text-outline">Xong 09:05</span>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-mono text-label-mono text-outline block">08:30</span>
<span className="font-body-sm text-body-sm text-outline">Đã hoàn tất</span>
</td>
<td className="py-3.5 px-4">
<span className="font-title-md text-title-md text-on-surface block">Đặng Minh Quân</span>
<span className="font-body-sm text-body-sm text-outline">28t • Nam • 0932 *** 654</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2 py-0.5 rounded-full bg-[#FFEFC4] text-[#78350F] font-label-md text-label-md">VIP Platinum</span>
</td>
<td className="py-3.5 px-4 max-w-xs">
<span className="font-title-md text-title-md text-on-surface block truncate">Khúc xạ cận loạn cao kèm khúc xạ giác mạc</span>
<span className="font-body-sm text-body-sm text-primary font-semibold">Đã xuất Toa Kính #TK-2024-089</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-md text-label-md text-on-surface flex items-center gap-1 w-fit">
<span className="material-symbols-outlined text-[14px] text-primary">smartphone</span> App
              </span>
</td>
<td className="py-3.5 px-3">
<span className="font-label-md text-label-md text-on-surface">Phòng 01 (BS. Tuấn)</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold flex items-center gap-1 w-fit">
<span className="material-symbols-outlined text-[14px]">send_to_mobile</span> Đã Đẩy POS
              </span>
</td>
<td className="py-3.5 px-4 text-right rounded-r-xl">
<div className="flex items-center justify-end gap-1.5">
<button className="h-8 px-3 rounded-lg bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">visibility</span> Xem Toa
                </button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-outline">
<div className="flex items-center gap-2">
<span>Hiển thị 5 / 28 lượt khám hôm nay</span>
<span>•</span>
<span className="flex items-center gap-1 text-primary">
<span className="w-2 h-2 rounded-full bg-primary"></span>
          Độ trễ trung bình: 4.8 phút/ca
        </span>
</div>
<div className="flex items-center gap-1">
<button className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors" disabled="">Trước</button>
<button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold">1</button>
<button className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors">2</button>
<button className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors">3</button>
<button className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors">Sau</button>
</div>
</div>
</div>

<div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm hidden items-center justify-center p-space-md" id="kiosk-ticket-modal">
<div className="bg-surface-container-lowest max-w-sm w-full rounded-xl p-space-lg shadow-[0_12px_32px_-4px_rgba(8,98,136,0.18)] space-y-space-md">
<div className="text-center space-y-1">
<div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
<span className="material-symbols-outlined text-[26px]">receipt_long</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary">PHIẾU SỐ THỨ TỰ KHÁM MẮT</h3>
<p className="font-body-sm text-body-sm text-outline">OptiVision Flagship Q.1 • Kiosk In Nhiệt</p>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl text-center space-y-2">
<span className="font-label-md text-label-md text-outline block">SỐ THỨ TỰ TIẾP NHẬN</span>
<span className="font-display-lg text-display-lg text-primary font-bold tracking-tight block">#11</span>
<div className="font-label-mono text-label-mono text-on-surface">Mã tra cứu: <span className="font-bold">KS-0103</span></div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Ước tính thời gian chờ: ~15 phút</div>
</div>
<div className="space-y-1 font-body-sm text-body-sm text-on-surface-variant">
<div className="flex justify-between">
<span>Thời gian cấp số:</span>
<span className="font-semibold text-on-surface">09:42 • 28/10/2024</span>
</div>
<div className="flex justify-between">
<span>Phòng dự kiến:</span>
<span className="font-semibold text-primary">Phòng 02 (KTV. Phúc)</span>
</div>
<div className="flex justify-between">
<span>Loại yêu cầu:</span>
<span className="font-semibold text-on-surface">Vãng lai (Đo thị lực)</span>
</div>
</div>
<div className="flex items-center gap-space-sm pt-space-xs">
<button className="w-1/2 h-10 rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors" id="btn-close-ticket-modal">
          Đóng
        </button>
<button className="w-1/2 h-10 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1 hover:bg-[#0b4d6b] transition-colors shadow-sm" id="btn-confirm-print">
<span className="material-symbols-outlined text-[18px]">print</span> In Phiếu Nhiệt
        </button>
</div>
</div>
</div>
</div>

    </div>
  );
}
