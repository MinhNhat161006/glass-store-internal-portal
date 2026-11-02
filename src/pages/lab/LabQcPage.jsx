import React, { useState } from 'react';
import { message } from 'antd';

export default function LabQcPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full max-w-[1600px] mx-auto p-3.5 sm:p-5 gap-3.5">

<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2 font-label-md text-label-md text-outline">
<span className="hover:text-primary transition-colors cursor-pointer">Xưởng Lab</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary font-semibold">Kiểm Tra QC &amp; Đóng Gói (Optical QA Workstation)</span>
<span className="text-outline-variant">•</span>
<span className="font-label-mono text-label-mono px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">Bàn Đo Kiểm Số #QC-03 • Lensmeter Nidek LM-1800PD Live</span>
</div>
<div className="flex items-center gap-space-sm">
<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md shadow-sm">
<span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
<span>Honeywell Xenon 1900G Sẵn Sàng (Port COM4)</span>
</div>
<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container transition-all font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px] text-primary">tune</span>
<span>Hiệu chuẩn Máy đo (F4)</span>
</button>
</div>
</div>

<div className="grid grid-cols-12 gap-space-md">

<div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between relative overflow-hidden">
<div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
<div>
<div className="flex items-center gap-2 mb-1">
<span className="font-label-mono text-label-mono uppercase tracking-wider text-primary font-bold">FR-LAB-07-10 • BR-32/34</span>
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
<span className="font-label-md text-label-md text-outline">Ca sáng 26/02/2026</span>
</div>
<h1 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Kiểm Tra Chất Lượng Kính &amp; Đóng Gói</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Hệ thống nghiệm thu quang học 3 cấp: Khúc xạ kế điện tử, độ khớp cơ học và đóng gói tem chuẩn Essilor / Zeiss.</p>
</div>
<div className="flex items-center gap-4 mt-space-md pt-space-sm border-t border-transparent bg-surface-container-low/60 -mx-space-md -mb-space-md px-space-md py-space-sm rounded-b-xl">
<span className="font-label-md text-label-md text-outline">Quy chuẩn thẩm tra:</span>
<span className="font-label-mono text-label-mono font-semibold text-primary">ISO 21987 / ANSI Z80.1-2020</span>
</div>
</div>

<div className="col-span-6 sm:col-span-3 lg:col-span-2 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide">Tổng Nghiệm Thu</span>
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">eyeglasses</span>
</div>
</div>
<div className="my-2">
<div className="font-headline-lg text-headline-lg font-bold text-on-surface leading-none">18 <span className="text-label-lg font-normal text-outline">cặp</span></div>
<div className="font-body-sm text-body-sm text-secondary font-medium mt-1 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">trending_up</span> Ca sáng hoàn thành 75%
          </div>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: '75%' }}></div>
</div>
</div>

<div className="col-span-6 sm:col-span-3 lg:col-span-2 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide">Đạt Chuẩn (Pass)</span>
<div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '\'FILL\' 1' }}>verified</span>
</div>
</div>
<div className="my-2">
<div className="font-headline-lg text-headline-lg font-bold text-primary leading-none">17 <span className="text-label-lg font-normal text-outline">cặp</span></div>
<div className="font-label-mono text-label-mono text-primary font-bold mt-1">
            Tỷ lệ đạt: 94.4%
          </div>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{ width: '94.4%' }}></div>
</div>
</div>

<div className="col-span-6 sm:col-span-3 lg:col-span-2 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-error uppercase tracking-wide">Không Đạt / Mài Lại</span>
<div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[18px]">replay</span>
</div>
</div>
<div className="my-2">
<div className="font-headline-lg text-headline-lg font-bold text-error leading-none">01 <span className="text-label-lg font-normal text-outline">cặp</span></div>
<div className="font-body-sm text-body-sm text-error font-medium mt-1 truncate" title="Lỗi lệch tâm quang học PD &gt; 0.5mm">
            Lệch tâm PD &gt; 0.5mm
          </div>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-error h-full rounded-full" style={{ width: '5.6%' }}></div>
</div>
</div>

<div className="col-span-6 sm:col-span-3 lg:col-span-2 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide">Chờ Bàn Giao POS</span>
<div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined text-[18px]">package_2</span>
</div>
</div>
<div className="my-2">
<div className="font-headline-lg text-headline-lg font-bold text-on-secondary-container leading-none">12 <span className="text-label-lg font-normal text-outline">hộp</span></div>
<div className="font-body-sm text-body-sm text-outline font-medium mt-1">
            Đã niêm phong tem QC
          </div>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{ width: '66%' }}></div>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-12 gap-space-lg items-start">

<div className="col-span-12 xl:col-span-5 flex flex-col gap-space-md">

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">barcode_scanner</span>
<span className="font-title-md text-title-md text-on-surface">Quét Khay Kỹ Thuật (Tray ID)</span>
</div>
<span className="font-label-mono text-label-mono text-outline px-2 py-0.5 rounded bg-surface-container">HotKey: F2</span>
</div>
<div className="relative flex items-center">
<div className="absolute left-3.5 flex items-center pointer-events-none text-primary">
<span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
</div>
<input className="w-full h-12 pl-11 pr-24 rounded-xl bg-surface-container-low text-on-surface font-label-mono text-label-mono placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 shadow-inner" placeholder="Quét mã vạch khay mài hoặc nhập mã đơn (#LAB-...)" type="text" value="TRAY-2026-088"/>
<button className="absolute right-1.5 px-3 py-1.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md flex items-center gap-1 shadow-sm hover:bg-primary-container transition-all">
<span>Tìm</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
<div className="flex items-center justify-between mt-2 font-label-md text-label-md text-outline">
<span>Khay quang học hoạt động: 4 lệnh</span>
<span className="text-primary font-medium cursor-pointer hover:underline">Bộ lọc: Tất cả đơn hôm nay</span>
</div>
</div>

<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between px-1">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">Hàng Đợi Chờ Đo Kiểm QC (4)</span>
<span className="font-label-mono text-label-mono text-primary text-xs">Cập nhật lúc: 10:42:15</span>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-md relative overflow-hidden transition-all ring-2 ring-primary/60 cursor-pointer">
<div className="absolute top-0 left-0 bottom-0 w-2 bg-primary"></div>
<div className="pl-2">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-2">
<span className="font-label-mono text-label-mono font-bold text-primary">#LAB-2026-088</span>
<span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    Đang Kiểm Tra
                  </span>
<span className="px-2 py-0.5 rounded bg-surface-container font-label-mono text-label-mono text-outline text-xs">Tray #08</span>
</div>
<div className="font-title-md text-title-md text-on-surface mt-1 font-semibold">Nguyễn Hoàng Duy</div>
</div>
<div className="text-right">
<span className="font-label-mono text-label-mono text-outline text-xs block">Khúc xạ xong: 10:15</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md mt-1 inline-block">Flagship Q1</span>
</div>
</div>

<div className="mt-3 p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1.5">
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-[16px] text-secondary">eyeglasses</span>
<span className="font-semibold text-primary">Gọng kính:</span>
<span className="text-on-surface truncate">Bolon Titanium BL7110 Matte Black</span>
</div>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-[16px] text-secondary">lens</span>
<span className="font-semibold text-primary">Tròng kính:</span>
<span className="text-on-surface truncate">Essilor Crizal Rock 1.67 Blue UV Capture</span>
</div>
</div>
<div className="flex items-center justify-between mt-3 pt-2 font-label-md text-label-md text-on-surface-variant">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-outline">engineering</span> KTV mài: Trần Văn Bách
              </span>
<span className="text-primary font-semibold flex items-center gap-0.5">
                Đang đo máy Lensmeter <span className="material-symbols-outlined text-[16px]">chevron_right</span>
</span>
</div>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-2">
<span className="font-label-mono text-label-mono font-bold text-on-surface-variant">#LAB-2026-089</span>
<span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">
                  Chờ kiểm tra
                </span>
<span className="px-2 py-0.5 rounded bg-surface-container-low font-label-mono text-label-mono text-outline text-xs">Tray #14</span>
</div>
<div className="font-title-md text-title-md text-on-surface mt-1">Lê Thúy Kiều</div>
</div>
<span className="font-label-mono text-label-mono text-outline text-xs">Mài xong: 10:28</span>
</div>
<div className="mt-2.5 p-2 rounded-lg bg-surface-container-low/60 flex flex-col gap-1 font-body-sm text-body-sm">
<div className="truncate text-on-surface-variant"><strong className="text-on-surface">Gọng:</strong> Ray-Ban Clubmaster Classic RB5154</div>
<div className="truncate text-on-surface-variant"><strong className="text-on-surface">Tròng:</strong> Essilor Eyezen Boost 1.60 Max</div>
</div>
<div className="flex items-center justify-between mt-2.5 pt-2 text-outline font-label-md text-label-md">
<span>KTV mài: Lê Quang Hải</span>
<span className="group-hover:text-primary transition-colors flex items-center">Bắt đầu đo <span className="material-symbols-outlined text-[14px]">arrow_forward</span></span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-2">
<span className="font-label-mono text-label-mono font-bold text-on-surface-variant">#LAB-2026-090</span>
<span className="px-2.5 py-0.5 rounded-full bg-error-container text-error font-label-md text-label-md font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">bolt</span> Hỏa Tốc Khách Đợi
                </span>
<span className="px-2 py-0.5 rounded bg-surface-container-low font-label-mono text-label-mono text-outline text-xs">Tray #03</span>
</div>
<div className="font-title-md text-title-md text-on-surface mt-1">Trịnh Minh Quang</div>
</div>
<span className="font-label-mono text-label-mono text-error font-semibold text-xs">Ưu tiên số 1</span>
</div>
<div className="mt-2.5 p-2 rounded-lg bg-surface-container-low/60 flex flex-col gap-1 font-body-sm text-body-sm">
<div className="truncate text-on-surface-variant"><strong className="text-on-surface">Gọng:</strong> Molsion Titanium Thin MS3022</div>
<div className="truncate text-on-surface-variant"><strong className="text-on-surface">Tròng:</strong> Chemi U6 Siêu Mỏng 1.74 Aspheric</div>
</div>
<div className="flex items-center justify-between mt-2.5 pt-2 text-outline font-label-md text-label-md">
<span>KTV mài: Trần Văn Bách</span>
<span className="group-hover:text-primary transition-colors flex items-center">Bắt đầu đo <span className="material-symbols-outlined text-[14px]">arrow_forward</span></span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer opacity-85 hover:opacity-100">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-2">
<span className="font-label-mono text-label-mono font-bold text-outline">#LAB-2026-084</span>
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span> ĐÃ ĐẠT QC
                </span>
</div>
<div className="font-title-md text-title-md text-on-surface mt-1">Phạm Thị Bích Ngọc</div>
</div>
<span className="font-label-mono text-label-mono text-outline text-xs">QC: 10:05</span>
</div>
<div className="mt-2.5 p-2 rounded-lg bg-surface-container-low/40 flex flex-col gap-1 font-body-sm text-body-sm">
<div className="truncate text-outline"><strong className="text-on-surface-variant">Gọng:</strong> Charmant LineArt Titanium XL1465</div>
<div className="truncate text-outline"><strong className="text-on-surface-variant">Tròng:</strong> Zeiss Progressive Precision Superb 1.60</div>
</div>
<div className="flex items-center justify-between mt-2.5 pt-2 font-label-md text-label-md">
<span className="text-primary font-medium">Chờ dán tem niêm phong</span>
<button className="px-2.5 py-1 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-on-primary transition-all flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">print</span> In Tem Khăn (A7)
            </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
<div className="flex items-center justify-between mb-2">
<span className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            Dữ liệu Lensmeter Kết Nối (Nidek LM-1800)
          </span>
<span className="font-label-mono text-label-mono text-outline text-xs">BAUD 9600 • USB-RS232</span>
</div>
<div className="font-label-mono text-label-mono text-xs bg-surface-container-lowest text-on-surface-variant p-2.5 rounded-lg border-0 shadow-inner space-y-1">
<div className="text-outline">&gt; [10:41:02] NIDEK_LM AUTO-ALIGN DETECTED: OD GREEN OPTICAL AXIS LOCK</div>
<div className="text-primary font-bold">&gt; [10:41:08] SYNC PACKET: SPH -3.25 | CYL -0.73 | AX 180.5 | PD 32.0 | UV 400nm (100%)</div>
<div className="text-outline">&gt; [10:41:20] NIDEK_LM AUTO-ALIGN DETECTED: OS GREEN OPTICAL AXIS LOCK</div>
<div className="text-secondary font-bold">&gt; [10:41:26] SYNC PACKET: SPH -2.75 | CYL -0.50 | AX 085.0 | PD 31.5 | UV 400nm (100%)</div>
</div>
</div>
</div>

<div className="col-span-12 xl:col-span-7 flex flex-col gap-space-md">

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden">
<div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-low">
<div>
<div className="flex items-center gap-2">
<span className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-label-mono text-label-mono font-bold tracking-wide">
                ĐƠN ĐANG ĐO: #LAB-2026-088
              </span>
<span className="font-label-mono text-label-mono text-outline">Toa BS: #RX-2026-889</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Đơn VIP Titanium</span>
</div>
<div className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
              Khách hàng: Nguyễn Hoàng Duy (34 Tuổi • Nam)
            </div>
</div>
<div className="flex items-center gap-3">
<div className="text-right">
<span className="font-body-sm text-body-sm text-outline block">Bác sĩ chỉ định khúc xạ</span>
<span className="font-title-md text-title-md text-primary font-semibold">BS. CKI Vũ Anh Tuấn</span>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[22px]">clinical_notes</span>
</div>
</div>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm pt-space-sm">
<div className="p-2 rounded-lg bg-surface-container-low">
<span className="font-label-md text-label-md text-outline block">Kỹ Thuật Viên Mài Lắp</span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold">Trần Văn Bách</span>
</div>
<div className="p-2 rounded-lg bg-surface-container-low">
<span className="font-label-md text-label-md text-outline block">Máy Mài Lắp Tự Động</span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold">Essilor Mr Blue 2.0</span>
</div>
<div className="p-2 rounded-lg bg-surface-container-low">
<span className="font-label-md text-label-md text-outline block">Gọng Chỉ Định</span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold truncate block" title="Bolon BL7110 Matte Black 52-18">Bolon BL7110 Black</span>
</div>
<div className="p-2 rounded-lg bg-surface-container-low">
<span className="font-label-md text-label-md text-outline block">Chiết Suất &amp; Phôi Tròng</span>
<span className="font-label-lg text-label-lg text-on-surface font-semibold truncate block" title="Crizal Rock 1.67 Blue UV">1.67 Crizal Rock AR</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[22px]">biotech</span>
<span className="font-title-md text-title-md text-on-surface font-bold">1. Đối Chiếu Quang Học: Toa Chỉ Định vs Thực Tế Máy Đo</span>
</div>
<div className="flex items-center gap-2">
<span className="font-label-mono text-label-mono text-xs px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-semibold">
              Tiêu chuẩn dung sai: ANSI Z80.1
            </span>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm">
<thead>
<tr className="bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider">
<th className="py-2.5 px-3 rounded-l-lg">Mắt</th>
<th className="py-2.5 px-2">Chỉ Số</th>
<th className="py-2.5 px-3 text-center">Toa Bác Sĩ Kê (Rx)</th>
<th className="py-2.5 px-3 text-center text-primary font-bold">Lensmeter Đo Thực Tế</th>
<th className="py-2.5 px-3 text-center text-outline">Sai Số (Δ)</th>
<th className="py-2.5 px-3 text-center text-outline">Dung Sai Tối Đa</th>
<th className="py-2.5 px-3 text-center rounded-r-lg">Đánh Giá QC</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container-low font-label-mono text-label-mono">

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-3 align-top font-bold text-primary bg-primary-fixed/20 rounded-l-lg text-center" rowspan="5">
<div className="sticky top-0">
<span className="text-base">OD</span>
<span className="block font-normal text-xs text-outline mt-0.5">Mắt Phải</span>
</div>
</td>
<td className="py-2 px-2 font-semibold text-on-surface">Độ Cầu (SPH)</td>
<td className="py-2 px-3 text-center font-bold text-on-surface">-3.25 D</td>
<td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">-3.25 D</td>
<td className="py-2 px-3 text-center text-on-surface font-medium">0.00 D</td>
<td className="py-2 px-3 text-center text-outline">±0.12 D</td>
<td className="py-2 px-3 text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">check</span> CHUẨN
                  </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-2 px-2 font-semibold text-on-surface">Độ Loạn (CYL)</td>
<td className="py-2 px-3 text-center font-bold text-on-surface">-0.75 D</td>
<td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">-0.73 D</td>
<td className="py-2 px-3 text-center text-on-surface font-medium">+0.02 D</td>
<td className="py-2 px-3 text-center text-outline">±0.12 D</td>
<td className="py-2 px-3 text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">check</span> CHUẨN
                  </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-2 px-2 font-semibold text-on-surface">Trục Loạn (AXIS)</td>
<td className="py-2 px-3 text-center font-bold text-on-surface">180°</td>
<td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">180.5°</td>
<td className="py-2 px-3 text-center text-on-surface font-medium">+0.5°</td>
<td className="py-2 px-3 text-center text-outline">±2.0°</td>
<td className="py-2 px-3 text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">check</span> CHUẨN
                  </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-2 px-2 font-semibold text-on-surface">Tâm Cao Đồng Tử (SH)</td>
<td className="py-2 px-3 text-center font-bold text-on-surface">21.5 mm</td>
<td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">21.4 mm</td>
<td className="py-2 px-3 text-center text-on-surface font-medium">-0.1 mm</td>
<td className="py-2 px-3 text-center text-outline">±0.5 mm</td>
<td className="py-2 px-3 text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">check</span> CHUẨN
                  </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors bg-surface-container-low/20">
<td className="py-2 px-2 font-semibold text-on-surface">Khoảng Cách Đồng Tử (PD)</td>
<td className="py-2 px-3 text-center font-bold text-on-surface">32.0 mm</td>
<td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">32.0 mm</td>
<td className="py-2 px-3 text-center text-on-surface font-medium">0.0 mm</td>
<td className="py-2 px-3 text-center text-outline">±0.5 mm</td>
<td className="py-2 px-3 text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">check</span> CHUẨN
                  </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-3 align-top font-bold text-secondary bg-secondary-fixed/20 rounded-l-lg text-center" rowspan="5">
<div className="sticky top-0">
<span className="text-base">OS</span>
<span className="block font-normal text-xs text-outline mt-0.5">Mắt Trái</span>
</div>
</td>
<td className="py-2 px-2 font-semibold text-on-surface">Độ Cầu (SPH)</td>
<td className="py-2 px-3 text-center font-bold text-on-surface">-2.75 D</td>
<td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">-2.75 D</td>
<td className="py-2 px-3 text-center text-on-surface font-medium">0.00 D</td>
<td className="py-2 px-3 text-center text-outline">±0.12 D</td>
<td className="py-2 px-3 text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">check</span> CHUẨN
                  </span>
</td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-2 px-2 font-semibold text-on-surface">Độ Loạn (CYL)</td>
<td className="py-2 px-3 text-center font-bold text-on-surface">-0.50 D</td>
<td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">-0.50 D</td>
<td className="py-2 px-3 text-center text-on-surface font-medium">0.00 D</td>
<td className="py-2 px-3 text-center text-outline">±0.12 D</td>
<td className="py-2 px-3 text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">check</span> CHUẨN
                  </span>
</td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-2 px-2 font-semibold text-on-surface">Trục Loạn (AXIS)</td>
<td className="py-2 px-3 text-center font-bold text-on-surface">085°</td>
<td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">085.0°</td>
<td className="py-2 px-3 text-center text-on-surface font-medium">0.0°</td>
<td className="py-2 px-3 text-center text-outline">±2.0°</td>
<td className="py-2 px-3 text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">check</span> CHUẨN
                  </span>
</td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-2 px-2 font-semibold text-on-surface">Tâm Cao Đồng Tử (SH)</td>
<td className="py-2 px-3 text-center font-bold text-on-surface">21.5 mm</td>
<td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">21.5 mm</td>
<td className="py-2 px-3 text-center text-on-surface font-medium">0.0 mm</td>
<td className="py-2 px-3 text-center text-outline">±0.5 mm</td>
<td className="py-2 px-3 text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">check</span> CHUẨN
                  </span>
</td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors bg-surface-container-low/20">
<td className="py-2 px-2 font-semibold text-on-surface">Khoảng Cách Đồng Tử (PD)</td>
<td className="py-2 px-3 text-center font-bold text-on-surface">31.5 mm</td>
<td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">31.5 mm</td>
<td className="py-2 px-3 text-center text-on-surface font-medium">0.0 mm</td>
<td className="py-2 px-3 text-center text-outline">±0.5 mm</td>
<td className="py-2 px-3 text-center">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">check</span> CHUẨN
                  </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[22px]">checklist</span>
<span className="font-title-md text-title-md text-on-surface font-bold">2. Bộ 5 Tiêu Chuẩn Ngoại Quan &amp; Cơ Học (Physical Inspection)</span>
</div>
<span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-semibold">
            Đã tích kiểm: 5/5 Hạng mục
          </span>
</div>
<div className="space-y-2">

<label className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-low transition-colors cursor-pointer">
<input defaultChecked={true} className="mt-0.5 w-5 h-5 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox"/>
<div className="flex-1">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface font-semibold">1. Độ khít gọng &amp; rãnh vát chữ V (Bevel Alignment)</span>
<span className="font-label-mono text-label-mono text-xs text-primary font-bold">ĐẠT CHUẨN</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Không hở kẽ sáng giữa gọng và tròng, tròng không bị bập bênh hoặc biến dạng lực căng gọng kim loại.</p>
</div>
</label>

<label className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-low transition-colors cursor-pointer">
<input defaultChecked={true} className="mt-0.5 w-5 h-5 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox"/>
<div className="flex-1">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface font-semibold">2. Bề mặt lớp váng phủ (Anti-Reflective Coating Integrity)</span>
<span className="font-label-mono text-label-mono text-xs text-primary font-bold">ĐẠT CHUẨN</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Soi dưới đèn chiếu kiểm tròng: Không xước mạt phay, không bong tróc lớp phủ Crizal AR, góc phản xạ ánh tím/xanh ngọc đồng nhất.</p>
</div>
</label>

<label className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-low transition-colors cursor-pointer">
<input defaultChecked={true} className="mt-0.5 w-5 h-5 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox"/>
<div className="flex-1">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface font-semibold">3. Độ cân bằng 2 càng kính &amp; đệm mũi (4-Point Bench Alignment)</span>
<span className="font-label-mono text-label-mono text-xs text-primary font-bold">ĐẠT CHUẨN</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Cân chỉnh 4 điểm tiếp xúc phẳng hoàn hảo trên bàn kính kiểm tra. Đệm mũi silicon cân đối góc 25-30 độ.</p>
</div>
</label>

<label className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-low transition-colors cursor-pointer">
<input defaultChecked={true} className="mt-0.5 w-5 h-5 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox"/>
<div className="flex-1">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface font-semibold">4. Vệ sinh &amp; Khử khuẩn công nghệ siêu âm (Ultrasonic Cleansing)</span>
<span className="font-label-mono text-label-mono text-xs text-primary font-bold">ĐẠT CHUẨN</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Đã làm sạch hoàn toàn bụi mạt phay trong bể rung siêu âm tần số 42kHz, sấy khô bằng khí nén sạch &amp; lau nano quang học.</p>
</div>
</label>

<label className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-low transition-colors cursor-pointer">
<input defaultChecked={true} className="mt-0.5 w-5 h-5 rounded text-primary focus:ring-primary accent-primary cursor-pointer" type="checkbox"/>
<div className="flex-1">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface font-semibold">5. Phụ kiện đi kèm chuẩn hãng &amp; Chứng nhận phôi tròng (Kit Authenticity)</span>
<span className="font-label-mono text-label-mono text-xs text-primary font-bold">ĐẠT CHUẨN</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Đầy đủ hộp da Bolon nguyên bản, khăn lụa hãng, phong bì bao tròng nguyên vẹn kèm thẻ bảo hành có tem cào xác thực Essilor Crizal Rock.</p>
</div>
</label>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[22px]">label</span>
<span className="font-title-md text-title-md text-on-surface font-bold">3. Xem Trước Nhãn Dán Hộp Kính (Optical Pass Label Preview - Khổ A7)</span>
</div>
<span className="font-label-mono text-label-mono text-outline text-xs">Mẫu nhãn chuẩn: LBL-OPTIVISION-V2</span>
</div>

<div className="max-w-xl mx-auto p-4 rounded-xl bg-surface-container-lowest shadow-md text-on-surface relative overflow-hidden">

<div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
<span className="font-display-lg text-[120px] font-bold">OPTIVISION</span>
</div>
<div className="flex items-start justify-between pb-2 border-b border-surface-container">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[16px]">visibility</span>
</div>
<div>
<span className="font-title-md text-title-md font-bold text-primary block leading-tight">OPTIVISION FLAGSHIP Q.1</span>
<span className="font-label-mono text-label-mono text-outline text-[11px] block">CHỨNG NHẬN NGHIỆM THU QUANG HỌC LAB</span>
</div>
</div>
<div className="text-right">
<span className="font-label-mono text-label-mono font-bold text-xs bg-surface-container px-2 py-0.5 rounded">#LAB-2026-088</span>
<span className="font-label-mono text-label-mono text-outline text-[10px] block mt-0.5">Toa Rx: #RX-2026-889</span>
</div>
</div>

<div className="grid grid-cols-12 gap-3 py-3 items-center">
<div className="col-span-8">
<div className="font-title-md text-title-md font-bold text-on-surface">NGUYỄN HOÀNG DUY</div>
<div className="font-body-sm text-body-sm text-on-surface-variant truncate">Bolon BL7110 Black • Essilor Crizal Rock 1.67</div>

<div className="grid grid-cols-2 gap-2 mt-2 font-label-mono text-label-mono text-xs">
<div className="p-1.5 rounded bg-surface-container-low">
<span className="font-bold text-primary">OD:</span> -3.25 / -0.75 x 180° (PD 32)
                </div>
<div className="p-1.5 rounded bg-surface-container-low">
<span className="font-bold text-secondary">OS:</span> -2.75 / -0.50 x 085° (PD 31.5)
                </div>
</div>
</div>

<div className="col-span-4 flex flex-col items-center justify-center relative">

<svg className="w-16 h-16 text-primary mb-1" fill="currentColor" viewbox="0 0 100 100">
<path d="M0 0h35v35H0V0zm5 5v25h25V5H5z"></path>
<path d="M10 10h15v15H10V10zm55-10h35v35H65V0zm5 5v25h25V5H70z"></path>
<path d="M75 10h15v15H75V10zM0 65h35v35H0V65zm5 5v25h25V70H5z"></path>
<path d="M10 75h15v15H10V75zm45-65h10v10H55V10zm-10 15h10v10H45V25zm10 10h10v10H55V35zm-15 10h10v10H40V45zm25 0h10v10H65V45zm20 10h10v10H85V55zm-45 10h10v10H40V65zm15 10h10v10H55V75zm20 0h10v10H75V75zm-15 15h10v10H60V90zm25 0h10v10H85V90z"></path>
</svg>

<div className="w-20 h-20 rounded-full border-2 border-primary/80 flex flex-col items-center justify-center p-1 text-center rotate-[-12deg] shadow-sm bg-surface-container-lowest/90 absolute -right-2 -bottom-2">
<div className="font-label-mono text-label-mono text-[8px] uppercase tracking-tighter text-primary font-bold">OPTIVISION LAB QC</div>
<div className="font-headline-sm text-headline-sm text-primary font-extrabold leading-none my-0.5">PASS</div>
<div className="font-label-mono text-label-mono text-[7px] text-primary">#QC-019 • 26/02/2026</div>
</div>
</div>
</div>
<div className="pt-2 border-t border-surface-container flex items-center justify-between font-label-mono text-label-mono text-[11px] text-outline">
<span>KTV Trưởng Nghiệm Thu: Đỗ Tấn Lộc</span>
<span>Bảo hành váng phủ: 12 Tháng chính hãng</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">
              019
            </div>
<div>
<span className="font-label-lg text-label-lg text-on-surface font-semibold block leading-tight">KTV Trưởng Phê Duyệt: Đỗ Tấn Lộc (Mã thẻ: #QC-019)</span>
<span className="font-body-sm text-body-sm text-outline block">Xác nhận tuân thủ quy trình kiểm định chất lượng quang học theo chuẩn FR-LAB-07</span>
</div>
</div>
<span className="font-label-mono text-label-mono text-xs px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">
            Trạng thái máy đo: ĐÃ KHÓA SỐ LIỆU
          </span>
</div>
<div className="mb-space-md">
<label className="font-label-md text-label-md text-on-surface-variant font-medium block mb-1">Ghi chú nghiệm thu &amp; dặn dò bàn giao:</label>
<input className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 shadow-inner" type="text" value="Tròng mài ôm khít gọng Titan, tâm quang học chuẩn xác tuyệt đối, vát rãnh sắc sảo. Kính đã vệ sinh vô trùng."/>
</div>

<div className="flex flex-col sm:flex-row items-center gap-space-sm">

<button className="w-full sm:flex-1 h-14 rounded-xl bg-primary text-on-primary font-title-md text-title-md font-bold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(8,98,136,0.25)] hover:bg-primary-container transition-all active:scale-[0.99] cursor-pointer" id="btn-pass-qc">
<span className="material-symbols-outlined text-[24px]">verified</span>
<span>XÁC NHẬN ĐẠT QC &amp; IN TEM BARCODE (F10)</span>
</button>

<button className="w-full sm:w-auto px-5 h-14 rounded-xl bg-error-container text-error hover:bg-error hover:text-on-error font-title-md text-title-md font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer" id="btn-reject-qc">
<span className="material-symbols-outlined text-[22px]">replay</span>
<span>TRẢ LẠI MÀI (F8)</span>
</button>

<button className="w-full sm:w-auto px-5 h-14 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-title-md text-title-md font-medium flex items-center justify-center gap-2 transition-all cursor-pointer" id="btn-print-pack">
<span className="material-symbols-outlined text-[20px] text-primary">print</span>
<span>In Tem Vỏ Hộp (A7)</span>
</button>
</div>
</div>
</div>
</div>

<div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center hidden p-4" id="rejection-modal">
<div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-lg shadow-2xl relative">
<div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container">
<div className="flex items-center gap-2 text-error">
<span className="material-symbols-outlined text-[24px]">assignment_late</span>
<span className="font-headline-sm text-headline-sm font-bold">Phiếu Yêu Cầu Mài Lại / Hủy Phôi</span>
</div>
<button className="p-1 rounded-lg text-outline hover:text-on-surface transition-colors" id="btn-close-modal">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<div className="space-y-space-md">
<div>
<span className="font-label-md text-label-md text-outline block">Mã đơn xử lý:</span>
<span className="font-title-md text-title-md font-bold text-on-surface">#LAB-2026-088 (Nguyễn Hoàng Duy)</span>
</div>
<div>
<label className="font-label-md text-label-md text-on-surface font-semibold block mb-2">Chọn nhóm nguyên nhân không đạt:</label>
<div className="space-y-2 font-body-sm text-body-sm">
<label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
<input defaultChecked={true} className="accent-error" name="fail_reason" type="radio"/>
<span>Lệch tâm quang học PD / Sai tâm cao SH vượt ngưỡng 0.5mm</span>
</label>
<label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
<input className="accent-error" name="fail_reason" type="radio"/>
<span>Trầy xước bề mặt tròng / Nứt váng chống chói AR Crizal</span>
</label>
<label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
<input className="accent-error" name="fail_reason" type="radio"/>
<span>Mài sai góc vát rãnh V / Tròng lỏng bập bênh trong gọng</span>
</label>
<label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
<input className="accent-error" name="fail_reason" type="radio"/>
<span>Sai trục loạn AXIS vượt dung sai (&gt; 2.0 độ)</span>
</label>
</div>
</div>
<div>
<label className="font-label-md text-label-md text-on-surface font-semibold block mb-1">Ghi chú cụ thể cho KTV mài:</label>
<textarea className="w-full p-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-error/40" placeholder="Ghi chú vị trí lỗi để kỹ thuật viên khắc phục hoặc xuất phôi mới..." rows="2"></textarea>
</div>
<div className="flex items-center justify-end gap-space-sm pt-2">
<button className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-all" id="btn-cancel-reject">
            Hủy Bỏ
          </button>
<button className="px-5 py-2 rounded-xl bg-error text-on-error font-label-lg text-label-lg font-semibold hover:opacity-95 transition-all shadow-md" id="btn-confirm-return">
            Xác Nhận Trả Lại Xưởng Mài (F8)
          </button>
</div>
</div>
</div>
</div>

<div className="fixed bottom-6 right-6 bg-surface-container-lowest text-on-surface shadow-2xl rounded-xl p-4 flex items-center gap-3 border border-surface-container transition-all transform translate-y-24 opacity-0 pointer-events-none z-50" id="action-toast">
<div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center" id="toast-icon-bg">
<span className="material-symbols-outlined text-[22px]" id="toast-icon">print</span>
</div>
<div>
<div className="font-title-md text-title-md font-bold text-on-surface" id="toast-title">Đã in thành công!</div>
<div className="font-body-sm text-body-sm text-outline" id="toast-desc">Tem niêm phong hộp kính A7 đã được gửi tới máy in Zebra ZD230.</div>
</div>
</div>
</div>


    </div>
  );
}
