import React, { useState } from 'react';
import { message } from 'antd';

export default function OptometryPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full">


<div className="fixed bottom-6 right-8 z-50 transition-all duration-300 transform opacity-0 translate-y-4 pointer-events-none flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-xl shadow-2xl" id="liveToast">
<span className="material-symbols-outlined text-secondary-container text-[20px]">medical_services</span>
<span className="font-label-lg text-label-lg" id="toastMsg">Hệ thống đồng bộ dữ liệu thời gian thực</span>
</div>
<div className="px-space-xl py-space-lg space-y-space-lg max-w-[1720px] mx-auto w-full">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">

<div className="flex flex-wrap items-center gap-space-lg">
<div className="flex items-center gap-space-md">
<div className="relative">
<div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center text-primary font-headline-sm text-headline-sm">
              HD
            </div>
<span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-primary-container ring-2 ring-surface-container-lowest"></span>
</div>
<div>
<div className="flex items-center gap-3">
<h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Nguyễn Hoàng Duy</h1>
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">#OPT-CUS-9842</span>
<span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-md text-label-md">VIP 3 Silver</span>
</div>
<div className="flex flex-wrap items-center gap-space-md text-on-surface-variant font-body-sm text-body-sm mt-1">
<span>32 tuổi (1994)</span>
<span>•</span>
<span>Nam</span>
<span>•</span>
<span className="font-label-mono text-label-mono text-on-surface">0918 732 998</span>
<span>•</span>
<span className="text-outline">Tiền sử: Cận loạn thị 8 năm, mỏi mắt kỹ thuật số</span>
</div>
</div>
</div>
<div className="hidden 2xl:block h-10 w-px bg-surface-variant"></div>

<div className="bg-surface-container-low px-4 py-2.5 rounded-xl flex items-center gap-space-lg">
<div>
<span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Mã Toa Khám</span>
<span className="font-label-mono text-label-mono text-primary font-bold">#RX-2026-889</span>
</div>
<div className="h-6 w-px bg-surface-dim"></div>
<div>
<span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Thời Gian</span>
<span className="font-body-sm text-body-sm text-on-surface">Hôm nay 10:15 (Ca sáng)</span>
</div>
<div className="h-6 w-px bg-surface-dim"></div>
<div>
<span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Bác Sĩ Khúc Xạ</span>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
<span className="font-label-lg text-label-lg text-on-surface">BS. Vũ Anh Tuấn</span>
<span className="text-outline text-body-sm font-label-mono">(CCHN: #VN-882)</span>
</div>
</div>
</div>
</div>

<div className="flex flex-wrap items-center gap-2.5">
<button className="px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors">
<span className="material-symbols-outlined text-[18px]">history</span>
<span>Lịch Sử Đo Cũ (3 lần)</span>
</button>
<button className="px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors">
<span className="material-symbols-outlined text-[18px]">restart_alt</span>
<span>Nhập Lại</span>
</button>
<button className="px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors">
<span className="material-symbols-outlined text-[18px]">print</span>
<span>In A5 Y Khoa</span>
</button>
<button className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm flex items-center gap-2 transition-all" id="btnPushPOS" >
<span className="material-symbols-outlined text-[18px]">send_and_archive</span>
<span>ĐẨY TOA SANG POS (F9)</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[22px]">compare_arrows</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Đối Chiếu Tiến Triển Khúc Xạ</h2>
<span className="font-label-md text-label-md text-outline">(So sánh Toa 03/2025 vs Kết quả khám hôm nay)</span>
</div>
<div className="flex items-center gap-4">
<span className="inline-flex items-center gap-1.5 text-body-sm font-label-md text-error">
<span className="w-2 h-2 rounded-full bg-error"></span> Độ cận tăng nhẹ: OD -0.25D
          </span>
<span className="inline-flex items-center gap-1.5 text-body-sm font-label-md text-primary">
<span className="w-2 h-2 rounded-full bg-primary"></span> Thị lực chỉnh kính duy trì 10/10
          </span>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">

<div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between">
<div className="flex items-center justify-between mb-3">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">Thị Lực Trần (Không Kính)</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-label-md">Khám lúc 10:18</span>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="bg-surface-container-lowest rounded-lg p-3">
<span className="font-label-md text-label-md text-primary block">MẮT PHẢI (OD)</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-headline-lg text-headline-lg text-on-surface">2/10</span>
<span className="font-body-sm text-body-sm text-error font-medium">(LogMAR 0.70)</span>
</div>
<span className="text-outline font-body-sm text-body-sm block mt-1">Nhìn mờ xa &gt; 3m</span>
</div>
<div className="bg-surface-container-lowest rounded-lg p-3">
<span className="font-label-md text-label-md text-secondary block">MẮT TRÁI (OS)</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-headline-lg text-headline-lg text-on-surface">3/10</span>
<span className="font-body-sm text-body-sm text-error font-medium">(LogMAR 0.52)</span>
</div>
<span className="text-outline font-body-sm text-body-sm block mt-1">Nhìn mờ chữ bảng</span>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between">
<div className="flex items-center justify-between mb-3">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">Toa Kính Cũ (Tháng 03/2025)</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md">11 tháng trước</span>
</div>
<div className="space-y-2">
<div className="flex items-center justify-between bg-surface-container-lowest rounded-lg px-3 py-2">
<span className="font-label-md text-label-md text-primary w-12">OD (R)</span>
<div className="flex gap-4 font-label-mono text-label-mono text-on-surface">
<span>SPH: <strong>-3.00</strong></span>
<span>CYL: <strong>-0.50</strong></span>
<span>AX: <strong>180°</strong></span>
</div>
<span className="font-label-md text-label-md text-outline">VA: 10/10</span>
</div>
<div className="flex items-center justify-between bg-surface-container-lowest rounded-lg px-3 py-2">
<span className="font-label-md text-label-md text-secondary w-12">OS (L)</span>
<div className="flex gap-4 font-label-mono text-label-mono text-on-surface">
<span>SPH: <strong>-2.50</strong></span>
<span>CYL: <strong>-0.50</strong></span>
<span>AX: <strong>175°</strong></span>
</div>
<span className="font-label-md text-label-md text-outline">VA: 10/10</span>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between">
<div className="flex items-center justify-between mb-2">
<span className="font-label-md text-label-md uppercase tracking-wider text-primary">Phân Tích Khúc Xạ Hai Mắt</span>
<span className="material-symbols-outlined text-primary text-[20px]">troubleshoot</span>
</div>
<div className="bg-surface-container-lowest rounded-lg p-3 space-y-2">
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Chênh lệch SPH hai mắt:</span>
<span className="font-label-mono font-bold text-on-surface">Δ 0.50 D (Bình thường)</span>
</div>
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Trục loạn thị đối xứng:</span>
<span className="font-label-mono font-bold text-on-surface">Thuận (WTR - 180°/175°)</span>
</div>
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Chỉ định điều chỉnh:</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Đơn tròng kỹ thuật số</span>
</div>
</div>
<span className="text-outline font-body-sm text-body-sm mt-2 block">Không có hiện tượng lệch ảnh nghiêm trọng (Aniseikonia).</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">

<div className="xl:col-span-8 space-y-space-lg">
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex flex-wrap items-center justify-between gap-space-md mb-space-lg">
<div className="flex items-center gap-3">
<span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold">RX</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Thông Số Kính Tối Ưu Hiện Tại</h2>
<p className="font-body-sm text-body-sm text-outline">Đơn vị độ: Diop (Step 0.25D) • Trục: Góc học 0° - 180°</p>
</div>
</div>
<div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl">
<span className="font-label-md text-label-md text-on-surface-variant">Khoảng cách làm việc:</span>
<span className="font-label-mono font-bold text-primary">6m (Xa) - 40cm (Gần)</span>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">

<div className="bg-surface-container-low rounded-xl p-space-lg space-y-space-md relative overflow-hidden">
<div className="flex items-center justify-between pb-2">
<div className="flex items-center gap-2">
<span className="px-3 py-1 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm">OD</span>
<div>
<span className="font-title-md text-title-md text-on-surface block leading-tight">Mắt Phải (Right Eye)</span>
<span className="font-label-md text-label-md text-outline">Oculus Dexter</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md">Ưu thế nhìn xa</span>
</div>

<div className="space-y-space-md">

<div>
<div className="flex justify-between items-center mb-1">
<label className="font-label-md text-label-md text-on-surface-variant">Độ Cầu (SPH / Sphere)</label>
<span className="font-label-md text-label-md text-outline">Dải: -15.00 đến +10.00</span>
</div>
<div className="flex items-center gap-2 bg-surface-container-lowest rounded-xl p-1 shadow-sm">
<button className="w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"  type="button">-</button>
<input className="w-full text-center font-headline-sm text-headline-sm text-on-surface font-label-mono bg-transparent outline-none" id="od_sph" type="text" value="-3.25"/>
<button className="w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"  type="button">+</button>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-1">
<label className="font-label-md text-label-md text-on-surface-variant">Độ Trụ (CYL / Cylinder)</label>
<span className="font-label-md text-label-md text-outline">Quy ước dấu âm (-)</span>
</div>
<div className="flex items-center gap-2 bg-surface-container-lowest rounded-xl p-1 shadow-sm">
<button className="w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"  type="button">-</button>
<input className="w-full text-center font-headline-sm text-headline-sm text-on-surface font-label-mono bg-transparent outline-none" id="od_cyl" type="text" value="-0.75"/>
<button className="w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"  type="button">+</button>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-1">
<label className="font-label-md text-label-md text-on-surface-variant">Trục Loạn (AXIS)</label>
<span className="font-label-mono text-label-mono text-primary font-bold">180°</span>
</div>
<div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center gap-3">
<input className="w-full accent-primary cursor-pointer" max="180" min="0" step="1" type="range" value="180"/>
<span className="font-headline-sm text-headline-sm font-label-mono text-on-surface w-14 text-right">180°</span>
</div>
</div>

<div className="grid grid-cols-2 gap-3 pt-2">
<div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm">
<label className="font-label-md text-label-md text-outline block mb-1">Độ Cộng (ADD)</label>
<input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-full" type="text" value="+0.00"/>
<span className="font-body-sm text-body-sm text-outline">Đơn tròng</span>
</div>
<div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm">
<label className="font-label-md text-label-md text-outline block mb-1">PD Đơn (OD)</label>
<div className="flex items-baseline gap-1">
<input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-16" type="text" value="32.0"/>
<span className="text-body-sm text-outline">mm</span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm">
<label className="font-label-md text-label-md text-outline block mb-1">Tâm Chiều Cao (SH)</label>
<div className="flex items-baseline gap-1">
<input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-16" type="text" value="21.5"/>
<span className="text-body-sm text-outline">mm</span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm">
<label className="font-label-md text-label-md text-outline block mb-1">Thị Lực Tối Ưu (BCVA)</label>
<div className="flex items-baseline gap-1">
<span className="font-label-mono text-title-md text-primary font-bold">10/10</span>
<span className="text-body-sm text-outline">(Snellen)</span>
</div>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-space-lg space-y-space-md relative overflow-hidden">
<div className="flex items-center justify-between pb-2">
<div className="flex items-center gap-2">
<span className="px-3 py-1 rounded-xl bg-secondary text-on-secondary font-headline-sm text-headline-sm">OS</span>
<div>
<span className="font-title-md text-title-md text-on-surface block leading-tight">Mắt Trái (Left Eye)</span>
<span className="font-label-md text-label-md text-outline">Oculus Sinister</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Mắt điều tiết bù</span>
</div>

<div className="space-y-space-md">

<div>
<div className="flex justify-between items-center mb-1">
<label className="font-label-md text-label-md text-on-surface-variant">Độ Cầu (SPH / Sphere)</label>
<span className="font-label-md text-label-md text-outline">Dải: -15.00 đến +10.00</span>
</div>
<div className="flex items-center gap-2 bg-surface-container-lowest rounded-xl p-1 shadow-sm">
<button className="w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"  type="button">-</button>
<input className="w-full text-center font-headline-sm text-headline-sm text-on-surface font-label-mono bg-transparent outline-none" id="os_sph" type="text" value="-2.75"/>
<button className="w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"  type="button">+</button>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-1">
<label className="font-label-md text-label-md text-on-surface-variant">Độ Trụ (CYL / Cylinder)</label>
<span className="font-label-md text-label-md text-outline">Quy ước dấu âm (-)</span>
</div>
<div className="flex items-center gap-2 bg-surface-container-lowest rounded-xl p-1 shadow-sm">
<button className="w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"  type="button">-</button>
<input className="w-full text-center font-headline-sm text-headline-sm text-on-surface font-label-mono bg-transparent outline-none" id="os_cyl" type="text" value="-0.50"/>
<button className="w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"  type="button">+</button>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-1">
<label className="font-label-md text-label-md text-on-surface-variant">Trục Loạn (AXIS)</label>
<span className="font-label-mono text-label-mono text-secondary font-bold">175°</span>
</div>
<div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center gap-3">
<input className="w-full accent-secondary cursor-pointer" max="180" min="0" step="1" type="range" value="175"/>
<span className="font-headline-sm text-headline-sm font-label-mono text-on-surface w-14 text-right">175°</span>
</div>
</div>

<div className="grid grid-cols-2 gap-3 pt-2">
<div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm">
<label className="font-label-md text-label-md text-outline block mb-1">Độ Cộng (ADD)</label>
<input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-full" type="text" value="+0.00"/>
<span className="font-body-sm text-body-sm text-outline">Đơn tròng</span>
</div>
<div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm">
<label className="font-label-md text-label-md text-outline block mb-1">PD Đơn (OS)</label>
<div className="flex items-baseline gap-1">
<input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-16" type="text" value="32.0"/>
<span className="text-body-sm text-outline">mm</span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm">
<label className="font-label-md text-label-md text-outline block mb-1">Tâm Chiều Cao (SH)</label>
<div className="flex items-baseline gap-1">
<input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-16" type="text" value="21.5"/>
<span className="text-body-sm text-outline">mm</span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm">
<label className="font-label-md text-label-md text-outline block mb-1">Thị Lực Tối Ưu (BCVA)</label>
<div className="flex items-baseline gap-1">
<span className="font-label-mono text-title-md text-secondary font-bold">10/10</span>
<span className="text-body-sm text-outline">(Snellen)</span>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="mt-space-md p-space-md rounded-xl bg-surface-container flex flex-wrap items-center justify-between gap-space-md">
<div className="flex items-center gap-space-lg">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">straighten</span>
</div>
<div>
<span className="font-label-md text-label-md text-outline block">Khoảng Cách Hai Đồng Tử (Total PD)</span>
<div className="flex items-baseline gap-1">
<span className="font-headline-sm text-headline-sm text-primary font-label-mono">64.0</span>
<span className="text-body-sm text-on-surface-variant">mm</span>
</div>
</div>
</div>
<div className="h-8 w-px bg-surface-variant"></div>
<div>
<span className="font-label-md text-label-md text-outline block">Đỉnh Giác Mạc (CVD)</span>
<div className="flex items-baseline gap-1">
<span className="font-title-md text-title-md text-on-surface font-label-mono">12.0</span>
<span className="text-body-sm text-outline">mm</span>
</div>
</div>
<div className="h-8 w-px bg-surface-variant"></div>
<div>
<span className="font-label-md text-label-md text-outline block">Góc Nghiêng Pantoscopic</span>
<div className="flex items-baseline gap-1">
<span className="font-title-md text-title-md text-on-surface font-label-mono">8.0</span>
<span className="text-body-sm text-outline">độ (°)</span>
</div>
</div>
<div className="h-8 w-px bg-surface-variant"></div>
<div>
<span className="font-label-md text-label-md text-outline block">Độ Bọc Gọng (Wrap Angle)</span>
<div className="flex items-baseline gap-1">
<span className="font-title-md text-title-md text-on-surface font-label-mono">5.0</span>
<span className="text-body-sm text-outline">độ (°)</span>
</div>
</div>
</div>
<div className="flex items-center gap-2 text-primary font-label-md text-label-md bg-surface-container-lowest px-3 py-1.5 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-[16px]">sensors</span>
<span>Đo tự động qua Máy Đo Tâm Kỹ Thuật Số (Digital Centering Device v4)</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[22px]">clinical_notes</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Chỉ Định Lâm Sàng &amp; Đề Xuất Tròng Kính</h2>
</div>
<span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Chuẩn Toa Y Khoa Quốc Tế</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">

<div className="space-y-space-md">
<div className="bg-surface-container-low rounded-xl p-space-md">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block mb-1">Chẩn Đoán Khúc Xạ</span>
<p className="font-title-md text-title-md text-on-surface font-semibold mb-2">Cận - Loạn Thị Hai Mắt (Myopic Astigmatism OD/OS)</p>
<p className="font-body-md text-body-md text-on-surface-variant">
                  Chênh lệch khúc xạ hai mắt nhẹ (Anisometropia nhẹ 0.50D). Khuyến nghị phôi tròng thiết kế phi cầu (Aspheric Lens) nhằm triệt tiêu tối đa quang sai biên rìa và giảm độ dày vành kính.
                </p>
</div>
<div className="bg-surface-container-low rounded-xl p-space-md">
<div className="flex items-center justify-between mb-2">
<span className="font-label-md text-label-md text-primary uppercase tracking-wider block">Gợi Ý Tròng Kính Đề Xuất</span>
<span className="material-symbols-outlined text-primary text-[18px]">verified</span>
</div>
<div className="flex items-center gap-3 bg-surface-container-lowest p-3 rounded-lg">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold">
                    1.67
                  </div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">Essilor Crizal Sapphire HR 1.67</h3>
<p className="font-body-sm text-body-sm text-outline">Chống trầy xước gấp 3, lọc UV400, chống chói 360°, phủ tráng nano kỵ nước.</p>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-2">
<span className="font-label-md text-label-md text-error uppercase tracking-wider block font-bold">Ghi Chú Kỹ Thuật Cho Xưởng Mài (Lab Dispenser)</span>
<span className="material-symbols-outlined text-error text-[18px]">engineering</span>
</div>
<div className="bg-surface-container-lowest rounded-lg p-3 space-y-2">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_box</span>
<span className="font-body-md text-body-md text-on-surface">Khách hàng sống mũi thấp: Bắt buộc chọn gọng có ve đệm silicon rời để điều chỉnh độ cao.</span>
</div>
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_box</span>
<span className="font-body-md text-body-md text-on-surface">Mài tâm quang học chuẩn: <strong>OD SH = 21.5mm | OS SH = 21.5mm</strong> (Sai số cho phép ± 0.5mm).</span>
</div>
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_box</span>
<span className="font-body-md text-body-md text-on-surface">Kiểu vát cạnh: Vát rãnh chữ V ẩn (Mini Bevel 110°) tối ưu mép gọng kim loại titan mỏng.</span>
</div>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between">
<span className="text-body-sm font-label-md text-outline">Độ ưu tiên xưởng: <strong className="text-on-surface">Tiêu chuẩn (Giao trong 45 phút)</strong></span>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md">Đã kiểm tra sơ bộ gọng</span>
</div>
</div>
</div>
</div>
</div>

<div className="xl:col-span-4 space-y-space-lg">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">Xác Thực Chuyên Môn</span>
<span className="flex items-center gap-1 text-primary font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px]">lock</span>
              Ký số SHA-256
            </span>
</div>
<div className="bg-surface-container-low rounded-xl p-space-md space-y-3">
<div className="flex items-center gap-3">
<img className="w-14 h-14 rounded-full object-cover shadow-sm" data-alt="Close up professional portrait of a Vietnamese male optometrist wearing clean white medical scrubs and optical glasses in a modern high-end eye clinic environment, clinical clarity soft lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4arHRQz0jAHrGF5AEIOrvev07ZsaN9nl5gswaoU8KROBSQwIDLaZstjAsgTmofKCle-ezX8vliBcoLCxKy7qy6Hp_l9x4qdTDchrd-jygzC1nzBrKlnHHRNqNFu4izbXRz2X7Oju7oYgbqigvK9VFgBe88fkQTsN39cMQ5J-MaP-ys0g816wJrcveIblzuYIMxgZ_C0yCxKwYCLwnZ8CzGHX23EzKKH1I1W5VJsM"/>
<div>
<span className="font-title-md text-title-md text-on-surface block">BS. Vũ Anh Tuấn</span>
<span className="font-body-sm text-body-sm text-outline block">Bác sĩ Chuyên khoa Khúc xạ Mắt</span>
<span className="font-label-mono text-label-mono text-primary">CCHN: #VN-882-HN</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg p-3 flex items-center justify-between">
<div>
<span className="font-label-md text-label-md text-outline block">Chữ Ký Số Điện Tử:</span>
<span className="font-label-mono text-label-mono text-primary font-semibold">VuAnhTuan.MD@optivision.vn</span>
<span className="text-outline text-body-sm block">Đã đóng dấu lúc: 10:28:44 Hôm nay</span>
</div>
<div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[24px]">verified</span>
</div>
</div>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md text-on-surface-variant block">Lời dặn bệnh nhân:</label>
<textarea className="w-full bg-surface-container-low rounded-xl p-3 text-body-sm text-on-surface outline-none resize-none" placeholder="Tái khám khúc xạ định kỳ sau 6 tháng. Giảm thời gian dùng điện thoại liên tục..." rows="2">Tái khám sau 6 tháng. Áp dụng quy tắc 20-20-20 khi làm việc với máy tính để giảm căng cơ mi.</textarea>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">feed</span>
<h3 className="font-title-md text-title-md text-on-surface">Bản In Toa Kính A5</h3>
</div>
<span className="font-label-md text-label-md text-outline">Tỷ lệ xem 40%</span>
</div>

<div className="bg-surface-container-low rounded-xl p-4 shadow-inner space-y-3">

<div className="bg-surface-container-lowest rounded-lg p-4 shadow-sm space-y-3">

<div className="flex justify-between items-start pb-2">
<div>
<span className="font-label-md text-label-md text-primary font-bold block">OPTIVISION EYE CLINIC</span>
<span className="font-body-sm text-body-sm text-outline block">Flagship Q.1, TP. Hồ Chí Minh</span>
</div>
<div className="text-right">
<span className="font-label-mono text-label-mono font-bold text-on-surface block">PHIẾU TOA KÍNH</span>
<span className="font-label-mono text-body-sm text-outline block">#RX-2026-889</span>
</div>
</div>

<div className="bg-surface-container-low p-2 rounded text-body-sm space-y-1">
<div className="flex justify-between">
<span className="text-outline">Họ tên:</span>
<span className="font-semibold text-on-surface">Nguyễn Hoàng Duy</span>
</div>
<div className="flex justify-between">
<span className="text-outline">Tuổi / Giới tính:</span>
<span>32t / Nam</span>
</div>
</div>

<table className="w-full text-left font-label-mono text-body-sm">
<thead>
<tr className="text-outline text-[11px] bg-surface-container-high">
<th className="p-1">Mắt</th>
<th className="p-1">SPH</th>
<th className="p-1">CYL</th>
<th className="p-1">AX</th>
<th className="p-1">PD</th>
</tr>
</thead>
<tbody className="text-on-surface">
<tr className="bg-surface-container-low">
<td className="p-1 font-bold text-primary">OD</td>
<td className="p-1">-3.25</td>
<td className="p-1">-0.75</td>
<td className="p-1">180°</td>
<td className="p-1">32.0</td>
</tr>
<tr>
<td className="p-1 font-bold text-secondary">OS</td>
<td className="p-1">-2.75</td>
<td className="p-1">-0.50</td>
<td className="p-1">175°</td>
<td className="p-1">32.0</td>
</tr>
</tbody>
</table>

<div className="flex justify-between items-end pt-2">
<div className="space-y-0.5">
<span className="font-body-sm text-outline block">Total PD: 64mm</span>
<span className="font-body-sm text-outline block">Tròng: Crizal 1.67</span>
</div>
<div className="text-center">
<span className="font-body-sm text-outline block">Bác sĩ khúc xạ</span>
<span className="font-label-mono text-body-sm font-bold text-primary block mt-1">BS. VŨ ANH TUẤN</span>
</div>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-3">
<div className="hidden p-3 rounded-xl bg-surface-container flex items-center gap-2 text-primary font-label-md text-label-md" id="posSyncStatus">
<span className="material-symbols-outlined text-[18px]">cloud_done</span>
<span>Đã kết nối luồng POS Terminal #03 (Trần Minh Anh)</span>
</div>
<button className="w-full py-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm shadow-md flex items-center justify-center gap-3 active:scale-[0.99] transition-all" >
<span className="material-symbols-outlined text-[24px]">point_of_sale</span>
<span>XÁC NHẬN TOA &amp; ĐẨY SANG POS</span>
</button>
<div className="flex items-center justify-between px-2 text-body-sm text-outline">
<span>Phím tắt thao tác: <kbd className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-mono">F9</kbd></span>
<span>Tự động in bill A5 sau khi đẩy</span>
</div>
</div>
</div>
</div>
</div>
</div>
    </div>
  );
}
