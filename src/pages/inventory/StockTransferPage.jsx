import React, { useState } from 'react';
import { message } from 'antd';

export default function StockTransferPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full max-w-[1600px] mx-auto p-3.5 sm:p-5 gap-3.5">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-xs">
<nav className="flex items-center gap-2 font-label-md text-label-md text-outline">
<span className="hover:text-primary cursor-pointer transition-colors">KHO VẬN &amp; VẬT TƯ</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="hover:text-primary cursor-pointer transition-colors">QUẢN LÝ ĐIỀU VẬN</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary font-title-md">Nhập / Xuất / Điều Chuyển Kho</span>
</nav>
<div className="flex items-center gap-space-sm">
<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-mono text-label-mono text-on-surface-variant shadow-sm">
<span className="material-symbols-outlined text-primary text-[15px]">verified</span>
<span>BR-10: Kiểm soát lệch tồn ±0%</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-mono text-label-mono shadow-sm">
<span className="material-symbols-outlined text-[15px]">barcode_scanner</span>
<span>Honeywell Xenon 1950G Connected</span>
</div>
</div>
</div>

<div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="space-y-1">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
<span className="material-symbols-outlined text-[24px]">sync_alt</span>
</div>
<div>
<h1 className="font-headline-md text-headline-md text-on-surface tracking-tight leading-none">
              Quản Lý Nhập, Xuất &amp; Điều Chuyển Kho Liên Chi Nhánh
            </h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Phân hệ luân chuyển tròng kính, gọng luxury, phụ kiện &amp; xử lý kiểm kê theo quy chuẩn BR-10, BR-11, BR-12 (AC-13 đến AC-15).
            </p>
</div>
</div>
</div>

<div className="flex flex-wrap items-center gap-2.5">
<button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-tertiary text-on-primary font-label-lg text-label-lg shadow-sm transition-all active:scale-[0.98]">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
<span>Lập Phiếu Nhập NCC (F1)</span>
</button>
<button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg shadow-sm transition-all active:scale-[0.98]">
<span className="material-symbols-outlined text-[18px]">swap_horiz</span>
<span>Tạo Lệnh Điều Chuyển (F2)</span>
</button>
<button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-all active:scale-[0.98]">
<span className="material-symbols-outlined text-[18px]">fact_check</span>
<span>Lập Phiếu Kiểm Kê (F3)</span>
</button>
<button className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-lg text-label-lg transition-all active:scale-[0.98]" title="Xuất Báo Cáo Logistics">
<span className="material-symbols-outlined text-[18px]">download</span>
<span>Báo Cáo (.xlsx)</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="space-y-1">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">PHIẾU NHẬP HÀNG NCC</span>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-primary leading-none">08</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">chứng từ</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">local_shipping</span>
</div>
</div>
<div className="mt-4 pt-3 bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg py-2.5">
<div className="flex items-center justify-between font-label-mono text-label-mono text-on-surface-variant">
<span>Tổng: 450 SKU • 1.15 tỷ đ</span>
<span className="text-primary font-semibold">6 nhập • 2 đang giao</span>
</div>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="space-y-1">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">ĐIỀU CHUYỂN ĐI CHI NHÁNH</span>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-secondary leading-none">14</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">lệnh xuất</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">outbox</span>
</div>
</div>
<div className="mt-4 pt-3 bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg py-2.5">
<div className="flex items-center justify-between font-label-mono text-label-mono text-on-surface-variant">
<span>Đích: Tràng Tiền • Thảo Điền</span>
<span className="text-secondary font-semibold">110 SKU luân chuyển</span>
</div>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="space-y-1">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">ĐIỀU CHUYỂN ĐẾN (CHỜ NHẬN)</span>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-tertiary-container leading-none">05</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">kiện hàng</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">move_to_inbox</span>
</div>
</div>
<div className="mt-4 pt-3 bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg py-2.5">
<div className="flex items-center justify-between font-label-mono text-label-mono text-on-surface-variant">
<span>Yêu cầu quét kiểm barcode</span>
<span className="text-tertiary-container font-semibold">48 SKU chờ nhận</span>
</div>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="space-y-1">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">CHÊNH LỆCH CẦN DUYỆT KIỂM KÊ</span>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-error leading-none">02</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">biên bản</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">balance</span>
</div>
</div>
<div className="mt-4 pt-3 bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg py-2.5">
<div className="flex items-center justify-between font-label-mono text-label-mono text-on-surface-variant">
<span>Tồn kho lệch: -2 gọng, +1 tròng</span>
<span className="text-error font-semibold">Chờ Quản lý phê duyệt</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex items-center gap-1.5 overflow-x-auto">
<button className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-sm transition-all flex items-center gap-2">
<span>Tất Cả Phiếu Giao Dịch</span>
<span className="px-2 py-0.5 rounded-full bg-on-primary/20 text-on-primary text-label-md font-mono">29</span>
</button>
<button className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-lg text-label-lg transition-all flex items-center gap-2">
<span>Nhập Kho Nhà Cung Cấp</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-label-md font-mono">08</span>
</button>
<button className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-lg text-label-lg transition-all flex items-center gap-2">
<span>Xuất Chuyển Chi Nhánh Khác</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-label-md font-mono">14</span>
</button>
<button className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-lg text-label-lg transition-all flex items-center gap-2">
<span>Nhận Hàng Chuyển Về</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-label-md font-mono">05</span>
</button>
<button className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-lg text-label-lg transition-all flex items-center gap-2">
<span>Biên Bản Kiểm Kê Cân Đối</span>
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-label-md font-mono">02</span>
</button>
</div>
<div className="flex items-center gap-2">
<span className="font-body-sm text-body-sm text-outline">Đồng bộ lúc: 11:24:08</span>
<button className="p-2 rounded-xl hover:bg-surface-container text-primary transition-colors" title="Làm mới bảng">
<span className="material-symbols-outlined text-[18px]">refresh</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm bg-surface-container-lowest p-space-md rounded-xl shadow-sm">

<div className="md:col-span-4 relative flex items-center">
<span className="material-symbols-outlined absolute left-3.5 text-primary text-[20px]">qr_code_scanner</span>
<input className="w-full h-11 pl-11 pr-24 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md focus:bg-surface-container-lowest focus:shadow-sm outline-none transition-all" placeholder="Quét Barcode kiện / Nhập mã phiếu (F2)..." type="text" value=""/>
<span className="absolute right-2 px-2 py-0.5 rounded bg-surface-container text-outline font-label-mono text-[11px]">AUTO SCAN</span>
</div>

<div className="md:col-span-3 relative flex items-center">
<span className="material-symbols-outlined absolute left-3.5 text-outline text-[18px]">warehouse</span>
<select className="w-full h-11 pl-10 pr-8 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:shadow-sm outline-none appearance-none transition-all cursor-pointer">
<option value="all">Tất cả Tuyến Kho (Nguồn &amp; Đích)</option>
<option value="catlai">Kho Tổng Cát Lái (Hub trung tâm)</option>
<option defaultValue="" value="q1">Flagship Q.1 (Kho hiện hành)</option>
<option value="hn">CN Tràng Tiền - Hà Nội</option>
<option value="q2">CN Thảo Điền - TP. Thủ Đức</option>
</select>
<span className="material-symbols-outlined absolute right-3 text-outline pointer-events-none text-[18px]">expand_more</span>
</div>

<div className="md:col-span-3 relative flex items-center">
<span className="material-symbols-outlined absolute left-3.5 text-outline text-[18px]">domain</span>
<select className="w-full h-11 pl-10 pr-8 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:shadow-sm outline-none appearance-none transition-all cursor-pointer">
<option defaultValue="" value="all">Tất cả Nhà Cung Cấp</option>
<option value="essilor">EssilorLuxottica Vietnam</option>
<option value="zeiss">Carl Zeiss Vision Vietnam</option>
<option value="bolon">Bolon Eyewear Distributor</option>
<option value="charmant">Charmant Titanium Japan</option>
</select>
<span className="material-symbols-outlined absolute right-3 text-outline pointer-events-none text-[18px]">expand_more</span>
</div>

<div className="md:col-span-2 relative flex items-center">
<span className="material-symbols-outlined absolute left-3.5 text-outline text-[18px]">calendar_today</span>
<select className="w-full h-11 pl-10 pr-8 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:shadow-sm outline-none appearance-none transition-all cursor-pointer">
<option defaultValue="" value="today">Hôm nay (06/03)</option>
<option value="7days">7 ngày vừa qua</option>
<option value="month">Tháng 03/2026</option>
<option value="custom">Tùy chỉnh ngày...</option>
</select>
<span className="material-symbols-outlined absolute right-3 text-outline pointer-events-none text-[18px]">expand_more</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low text-outline font-label-md text-label-md uppercase tracking-wider">
<th className="py-3.5 px-space-md">Mã Phiếu &amp; Barcode</th>
<th className="py-3.5 px-space-md">Phân Loại Giao Dịch</th>
<th className="py-3.5 px-space-md">Đối Tác / Kho Xuất - Nhập</th>
<th className="py-3.5 px-space-md text-right">Quy Mô SKU</th>
<th className="py-3.5 px-space-md text-right">Tổng Giá Trị</th>
<th className="py-3.5 px-space-md">Nhân Sự Xử Lý</th>
<th className="py-3.5 px-space-md">Trạng Thái Điều Vận</th>
<th className="py-3.5 px-space-md text-center">Tác Vụ</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md divide-y-0 text-on-surface">

<tr className="bg-primary-fixed/20 hover:bg-primary-fixed/30 transition-colors">
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">radio_button_checked</span>
<div>
<span className="font-title-md text-title-md text-primary font-mono block">#PX-TRANS-142</span>
<span className="font-body-sm text-body-sm text-outline font-mono block">SEAL: #SEAL-9981</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span>
<span>Chuyển Đi CN</span>
</span>
</td>
<td className="py-3.5 px-space-md">
<div>
<div className="flex items-center gap-1 font-title-md text-title-md text-on-surface">
<span>Flagship Q.1</span>
<span className="material-symbols-outlined text-[14px] text-outline">arrow_forward</span>
<span className="text-secondary font-semibold">CN Thảo Điền Q.2</span>
</div>
<span className="font-body-sm text-body-sm text-outline">Đơn vị: Đội Xe Nội Bộ (Trip #04)</span>
</div>
</td>
<td className="py-3.5 px-space-md text-right font-label-mono text-label-mono">
<span className="font-bold text-on-surface">23 Cây/Cặp</span>
<span className="block text-body-sm text-outline">3 chủng loại</span>
</td>
<td className="py-3.5 px-space-md text-right font-label-mono text-label-mono">
<span className="font-bold text-primary">84.250.000 đ</span>
<span className="block text-body-sm text-outline">Bảo hiểm 100%</span>
</td>
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary font-label-md text-label-md">
                    TM
                  </div>
<div>
<span className="font-label-lg text-label-lg text-on-surface block leading-tight">Trần Minh Anh</span>
<span className="font-body-sm text-body-sm text-outline block leading-tight">[STF-088]</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md">
<span className="w-1.5 h-1.5 rounded-full bg-on-secondary-container animate-pulse"></span>
<span>Đang Giao Vận (Trip In-Transit)</span>
</span>
</td>
<td className="py-3.5 px-space-md text-center">
<div className="flex items-center justify-center gap-1.5">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary transition-colors" title="Xem chi tiết phiếu">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="In phiếu 3 liên A4/A5">
<span className="material-symbols-outlined text-[18px]">print</span>
</button>
<button className="p-1.5 rounded-lg bg-primary hover:bg-tertiary text-on-primary transition-colors" title="Quét đối soát kiện">
<span className="material-symbols-outlined text-[18px]">qr_code_2</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md">
<div>
<span className="font-title-md text-title-md text-on-surface font-mono block">#PN-2026-088</span>
<span className="font-body-sm text-body-sm text-outline font-mono block">PO: #PO-ESL-7741</span>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px]">inventory_2</span>
<span>Nhập Kho NCC</span>
</span>
</td>
<td className="py-3.5 px-space-md">
<div>
<span className="font-title-md text-title-md text-on-surface block">EssilorLuxottica Vietnam Co.</span>
<span className="font-body-sm text-body-sm text-outline">Kho nhận: Flagship Q.1 (Kho Tròng Crizal)</span>
</div>
</td>
<td className="py-3.5 px-space-md text-right font-label-mono text-label-mono">
<span className="font-bold text-on-surface">320 Cặp Tròng</span>
<span className="block text-body-sm text-outline">18 thang độ</span>
</td>
<td className="py-3.5 px-space-md text-right font-label-mono text-label-mono">
<span className="font-bold text-primary">648.500.000 đ</span>
<span className="block text-body-sm text-outline">VAT 8% Đã khấu trừ</span>
</td>
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-md text-label-md">
                    LH
                  </div>
<div>
<span className="font-label-lg text-label-lg text-on-surface block leading-tight">Lê Hoàng Nam</span>
<span className="font-body-sm text-body-sm text-outline block leading-tight">[STF-014]</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
<span>Đã Nhập Kho (BR-10 Pass)</span>
</span>
</td>
<td className="py-3.5 px-space-md text-center">
<div className="flex items-center justify-center gap-1.5">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary transition-colors" title="Xem chi tiết">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="In phiếu nhập">
<span className="material-symbols-outlined text-[18px]">print</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md">
<div>
<span className="font-title-md text-title-md text-on-surface font-mono block">#PN-TRANS-099</span>
<span className="font-body-sm text-body-sm text-outline font-mono block">REF: #HUB-EXP-992</span>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px]">arrow_downward</span>
<span>Chuyển Đến CN</span>
</span>
</td>
<td className="py-3.5 px-space-md">
<div>
<div className="flex items-center gap-1 font-title-md text-title-md text-on-surface">
<span>Kho Tổng Cát Lái</span>
<span className="material-symbols-outlined text-[14px] text-outline">arrow_forward</span>
<span className="text-primary font-semibold">Flagship Q.1</span>
</div>
<span className="font-body-sm text-body-sm text-outline">Đơn vị: Viettel Post Logistics (#VT-8819)</span>
</div>
</td>
<td className="py-3.5 px-space-md text-right font-label-mono text-label-mono">
<span className="font-bold text-on-surface">48 Gọng Kính</span>
<span className="block text-body-sm text-outline">Ray-Ban &amp; Oakley</span>
</td>
<td className="py-3.5 px-space-md text-right font-label-mono text-label-mono">
<span className="font-bold text-primary">195.400.000 đ</span>
<span className="block text-body-sm text-outline">Chờ đối soát seal</span>
</td>
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-label-md text-label-md">
                    TH
                  </div>
<div>
<span className="font-label-lg text-label-lg text-on-surface block leading-tight">Tạ Hữu Thắng</span>
<span className="font-body-sm text-body-sm text-outline block leading-tight">[STF-045]</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px]">inventory</span>
<span>Chờ Quét Nhận Hàng</span>
</span>
</td>
<td className="py-3.5 px-space-md text-center">
<div className="flex items-center justify-center gap-1.5">
<button className="px-2.5 py-1 rounded-lg bg-primary hover:bg-tertiary text-on-primary font-label-md text-label-md flex items-center gap-1 transition-all">
<span className="material-symbols-outlined text-[15px]">barcode_scanner</span>
<span>Nhận Kho</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md">
<div>
<span className="font-title-md text-title-md text-error font-mono block">#PKK-2026-014</span>
<span className="font-body-sm text-body-sm text-outline font-mono block">AUDIT-ROUTINE-W10</span>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px]">rule</span>
<span>Kiểm Kê Cân Đối</span>
</span>
</td>
<td className="py-3.5 px-space-md">
<div>
<span className="font-title-md text-title-md text-on-surface block">Kho Trưng Bày &amp; Kính Mát Flagship</span>
<span className="font-body-sm text-body-sm text-error">Phát hiện lệch: Thiếu 2 cây gọng Cartier</span>
</div>
</td>
<td className="py-3.5 px-space-md text-right font-label-mono text-label-mono">
<span className="font-bold text-error">-02 / +01 SKU</span>
<span className="block text-body-sm text-outline">Lệch chỉ số vật lý</span>
</td>
<td className="py-3.5 px-space-md text-right font-label-mono text-label-mono">
<span className="font-bold text-error">-38.200.000 đ</span>
<span className="block text-body-sm text-outline">BR-12 Pending Rule</span>
</td>
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-label-md text-label-md">
                    VA
                  </div>
<div>
<span className="font-label-lg text-label-lg text-on-surface block leading-tight">Vũ Tuấn Anh</span>
<span className="font-body-sm text-body-sm text-outline block leading-tight">[STF-003] QLCN</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-label-md">
<span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
<span>Chờ Giám Đốc Phê Duyệt</span>
</span>
</td>
<td className="py-3.5 px-space-md text-center">
<div className="flex items-center justify-center gap-1.5">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-error transition-colors" title="Xem giải trình &amp; camera">
<span className="material-symbols-outlined text-[18px]">verified_user</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="In biên bản cân đối">
<span className="material-symbols-outlined text-[18px]">print</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md">
<div>
<span className="font-title-md text-title-md text-on-surface font-mono block">#PX-TRANS-141</span>
<span className="font-body-sm text-body-sm text-outline font-mono block">SEAL: #SEAL-9877</span>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span>
<span>Chuyển Đi CN</span>
</span>
</td>
<td className="py-3.5 px-space-md">
<div>
<div className="flex items-center gap-1 font-title-md text-title-md text-on-surface">
<span>Flagship Q.1</span>
<span className="material-symbols-outlined text-[14px] text-outline">arrow_forward</span>
<span className="text-secondary font-semibold">CN Tràng Tiền Hà Nội</span>
</div>
<span className="font-body-sm text-body-sm text-outline">Hàng không Vietjet Cargo Express</span>
</div>
</td>
<td className="py-3.5 px-space-md text-right font-label-mono text-label-mono">
<span className="font-bold text-on-surface">87 Vật tư/Tròng</span>
<span className="block text-body-sm text-outline">Zeiss Photofusion X</span>
</td>
<td className="py-3.5 px-space-md text-right font-label-mono text-label-mono">
<span className="font-bold text-primary">246.000.000 đ</span>
<span className="block text-body-sm text-outline">Vận đơn: #VJ-9902</span>
</td>
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary font-label-md text-label-md">
                    TM
                  </div>
<div>
<span className="font-label-lg text-label-lg text-on-surface block leading-tight">Trần Minh Anh</span>
<span className="font-body-sm text-body-sm text-outline block leading-tight">[STF-088]</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px] text-primary">mark_chat_read</span>
<span>Đã Nhận Đủ Tại Tràng Tiền</span>
</span>
</td>
<td className="py-3.5 px-space-md text-center">
<div className="flex items-center justify-center gap-1.5">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary transition-colors" title="Xem chi tiết">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="In lại phiếu lưu">
<span className="material-symbols-outlined text-[18px]">print</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm font-body-sm text-body-sm text-outline">
<div className="flex items-center gap-2">
<span>Hiển thị 1 - 5 trong tổng số 29 chứng từ giao vận</span>
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
<span>Tổng giá trị luân chuyển trong ngày: <strong className="text-primary font-mono text-label-md">2.282.150.000 đ</strong></span>
</div>
<div className="flex items-center gap-1">
<button className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40" disabled="">
            Trước
          </button>
<button className="px-3 py-1 rounded-lg bg-primary text-on-primary font-semibold">1</button>
<button className="px-3 py-1 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors">2</button>
<button className="px-3 py-1 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors">3</button>
<button className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors">
            Sau
          </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg space-y-space-md relative overflow-hidden">

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-sm">
<div className="flex items-center gap-3">
<div className="w-11 h-11 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[26px]">local_shipping</span>
</div>
<div>
<div className="flex items-center gap-2.5">
<h2 className="font-headline-sm text-headline-sm text-on-surface">Chi Tiết Lệnh Điều Chuyển Đi #PX-TRANS-142</h2>
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Đang Giao Vận (Trip In-Transit)</span>
<span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-mono text-label-mono text-outline">Quy tắc BR-11</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
              Lộ trình luân chuyển: <strong>Flagship Q.1</strong> → <strong>Chi nhánh Thảo Điền Q.2</strong> • Lập phiếu lúc 09:42 hôm nay bởi Trần Minh Anh [STF-088]
            </p>
</div>
</div>

<div className="flex flex-wrap items-center gap-2">
<button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all">
<span className="material-symbols-outlined text-[17px]">print</span>
<span>In Phiếu Giao Nhận 3 Liên</span>
</button>
<button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-tertiary text-on-primary font-label-md text-label-md transition-all shadow-sm">
<span className="material-symbols-outlined text-[17px]">verified</span>
<span>Xác Nhận Đã Đến Nơi</span>
</button>
<button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-error-container hover:bg-error/20 text-on-error-container font-label-md text-label-md transition-all">
<span className="material-symbols-outlined text-[17px]">cancel</span>
<span>Hủy Lệnh (F9)</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">

<div className="lg:col-span-8 space-y-space-sm">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface">Danh Mục Vật Tư / Tròng / Gọng Xuất Đi (23 Items)</span>
<span className="font-label-mono text-label-mono text-outline">Mã vạch chuẩn GS1 / Code 128</span>
</div>
<div className="bg-surface-container-low rounded-xl p-space-sm space-y-space-xs">

<div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-label-mono text-label-mono font-bold">
                  01
                </div>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Gọng Kính Bolon BJ3120 - Titanium Bạc Khói</span>
<span className="px-2 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed font-label-mono text-[11px]">OPT-FRAME</span>
</div>
<span className="font-body-sm text-body-sm text-outline font-mono">Barcode: 893500192831 • Kèm hộp bao da Bolon chính hãng</span>
</div>
</div>
<div className="text-right">
<div className="font-label-mono text-label-mono font-bold text-on-surface">05 Cây</div>
<div className="font-body-sm text-body-sm text-primary font-mono">22.500.000 đ</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-label-mono text-label-mono font-bold">
                  02
                </div>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Tròng Kính Carl Zeiss ClearView 1.60 BlueGuard</span>
<span className="px-2 py-0.2 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-[11px]">ZEISS-LENS</span>
</div>
<span className="font-body-sm text-body-sm text-outline font-mono">Độ: -2.50 Cyl -0.50 (Lot #Z-99120) • Bao bì nguyên tem nhà máy</span>
</div>
</div>
<div className="text-right">
<div className="font-label-mono text-label-mono font-bold text-on-surface">10 Cặp</div>
<div className="font-body-sm text-body-sm text-primary font-mono">36.800.000 đ</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-label-mono text-label-mono font-bold">
                  03
                </div>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Tròng Kính Essilor Crizal Rock 1.67 Chống Trầy</span>
<span className="px-2 py-0.2 rounded bg-primary-fixed text-on-primary-fixed font-label-mono text-[11px]">ESSILOR-LENS</span>
</div>
<span className="font-body-sm text-body-sm text-outline font-mono">Độ: -4.00 Cyl -1.00 (Lot #ES-34419) • Kháng bám bụi tĩnh điện</span>
</div>
</div>
<div className="text-right">
<div className="font-label-mono text-label-mono font-bold text-on-surface">08 Cặp</div>
<div className="font-body-sm text-body-sm text-primary font-mono">24.950.000 đ</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 bg-surface-container-low p-space-md rounded-xl space-y-space-md flex flex-col justify-between">
<div className="space-y-3">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface">Niêm Phong &amp; Bàn Giao</span>
<span className="flex items-center gap-1 font-label-mono text-label-mono text-primary font-semibold">
<span className="material-symbols-outlined text-[16px]">lock</span>
<span>Security Verified</span>
</span>
</div>

<div className="bg-surface-container-lowest p-space-sm rounded-xl space-y-2">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-outline">MÃ SEAL BẢO MẬT</span>
<span className="font-label-mono text-label-mono font-bold text-on-surface">#SEAL-9981</span>
</div>
<div className="p-2 rounded bg-surface-container flex items-center justify-between font-label-mono text-label-mono text-on-surface-variant">
<span>Chốt niêm: Khóa nhựa QR laser</span>
<span className="text-primary font-semibold">Khớp 100%</span>
</div>
<div className="flex items-center gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-primary text-[16px]">qr_code_2</span>
<span>Quét mã xác thực trên app tài xế khi giao nhận</span>
</div>
</div>

<div className="space-y-2 pt-1">
<div className="flex items-start gap-2.5">
<div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-mono text-[11px] mt-0.5">
                  1
                </div>
<div>
<span className="font-label-lg text-label-lg text-on-surface block">Xuất kho Flagship Q.1</span>
<span className="font-body-sm text-body-sm text-outline">09:42 • KTV Trần Minh Anh bàn giao</span>
</div>
</div>
<div className="flex items-start gap-2.5">
<div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-mono text-[11px] mt-0.5">
                  2
                </div>
<div>
<span className="font-label-lg text-label-lg text-on-surface block">Tài xế nội bộ nhận hàng</span>
<span className="font-body-sm text-body-sm text-outline">10:05 • Nguyễn Văn Tuấn (Biển số: 59A-128.90)</span>
</div>
</div>
<div className="flex items-start gap-2.5 opacity-60">
<div className="w-6 h-6 rounded-full bg-outline-variant text-on-surface flex items-center justify-center font-label-mono text-[11px] mt-0.5">
                  3
                </div>
<div>
<span className="font-label-lg text-label-lg text-on-surface block">Ký nhận tại CN Thảo Điền</span>
<span className="font-body-sm text-body-sm text-outline">Dự kiến: 11:45 hôm nay</span>
</div>
</div>
</div>
</div>
<div className="pt-2 bg-surface-container -mx-space-md -mb-space-md p-space-sm rounded-b-xl flex items-center justify-between">
<span className="font-label-mono text-label-mono text-outline">Trạng thái định vị GPS:</span>
<span className="font-label-mono text-label-mono text-primary font-semibold flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              Đang di chuyển qua Cầu Sài Gòn
            </span>
</div>
</div>
</div>
</div>
</div>
    </div>
  );
}
