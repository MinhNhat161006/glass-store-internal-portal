import React, { useState } from 'react';
import { message } from 'antd';

export default function LabPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full">

<section className="px-space-lg py-space-md bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">

<div className="flex flex-wrap items-center justify-between gap-space-md">
<div className="flex flex-col gap-0.5">
<div className="flex items-center gap-2 font-label-md text-label-md text-outline">
<span className="hover:text-primary cursor-pointer transition-colors">Xưởng Lab</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary font-semibold">Điều Phối Mài Lắp Kính</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-on-surface-variant font-label-mono">Trạm Kỹ Thuật Số 03 (Flagship Q.1)</span>
</div>
<div className="flex items-center gap-space-sm">
<h1 className="font-headline-md text-headline-md text-primary tracking-tight font-bold">
            Điều Phối Mài Lắp Kính (Lab Queue &amp; Dispensing)
          </h1>
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Máy Trạm Lab Tự Động v4.2
          </span>
</div>
</div>

<div className="flex items-center gap-space-sm">
<button className="flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary transition-all active:scale-[0.98]" id="btn-scan-barcode">
<span className="material-symbols-outlined text-[20px]">barcode_scanner</span>
<span>Quét mã vạch khay (F2)</span>
</button>
<button className="flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-high text-primary font-label-lg text-label-lg hover:bg-surface-variant transition-colors">
<span className="material-symbols-outlined text-[20px]">inventory_2</span>
<span>Xuất phôi tròng kho</span>
</button>
<button className="p-2.5 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Đồng bộ máy mài Nidek &amp; Essilor">
<span className="material-symbols-outlined text-[20px]">sync</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">

<div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider">Tổng lệnh hôm nay</span>
<div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
</div>
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-on-surface font-bold">24</span>
<span className="font-label-md text-label-md text-outline">lệnh gia công</span>
</div>
<div className="mt-1 font-body-sm text-body-sm text-outline flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span> 16 POS Flagship • 8 E-com OMS
        </div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider">Chờ gán máy &amp; phôi</span>
<div className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">pending_actions</span>
</div>
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-on-surface font-bold text-secondary">05</span>
<span className="font-label-md text-label-md text-outline">khay chờ nạp</span>
</div>
<div className="mt-1 font-body-sm text-body-sm text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">output</span>
<span>Cần xuất phôi tròng từ tủ kho</span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider">Đang mài tự động</span>
<div className="w-7 h-7 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
</div>
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-primary font-bold">04</span>
<span className="font-label-md text-label-md text-outline">máy đang cắt</span>
</div>
<div className="mt-1 font-body-sm text-body-sm text-outline flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
<span>Essilor Delta + Nidek ME-1200</span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between hover:bg-surface-container transition-all">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider">Chờ QC kiểm tra</span>
<div className="w-7 h-7 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">rule</span>
</div>
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-on-surface font-bold">09</span>
<span className="font-label-md text-label-md text-outline">đơn sẵn sàng</span>
</div>
<div className="mt-1 font-body-sm text-body-sm text-outline flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
<span>Lensmeter &amp; kiểm tra tâm quang học</span>
</div>
</div>

<div className="p-space-md rounded-xl bg-error-container text-on-error-container shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-error-container uppercase tracking-wider font-semibold">Hao hụt / Vỡ tròng</span>
<div className="w-7 h-7 rounded-lg bg-error text-on-error flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">report_problem</span>
</div>
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-error font-bold">01</span>
<span className="font-label-md text-label-md text-on-error-container">tròng nứt mép</span>
</div>
<div className="mt-1 font-body-sm text-body-sm text-on-error-container flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">assignment_late</span>
<span>Khay #07 - Cần xuất bù vật tư</span>
</div>
</div>
</div>
</section>

<section className="px-space-lg py-space-md">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">monitor_heart</span>
<h2 className="font-title-md text-title-md text-on-surface">Bảng Điều Khiển Máy Mài Thời Gian Thực (Machine Telemetry Grid)</h2>
</div>
<div className="flex items-center gap-space-sm font-label-md text-label-md text-outline">
<span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span> 2 Đang chạy</span>
<span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> 1 Sẵn sàng</span>
<span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-surface-dim"></span> 1 Bán tự động</span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
<div>
<div className="flex items-start justify-between">
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold font-label-mono text-label-mono">
                01
              </div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">Essilor Delta 200 #A</h3>
<span className="font-body-sm text-body-sm text-outline">IP: 192.168.1.101 • Trạm Mài 3D Chính</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> ONLINE • 68%
            </span>
</div>

<div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1.5">
<div className="flex items-center justify-between">
<span className="font-label-mono text-label-mono text-primary font-semibold">LỆNH: #LAB-2026-088</span>
<span className="font-label-md text-label-md px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">Khay Xanh #04</span>
</div>
<p className="font-title-md text-title-md text-on-surface truncate">Gọng Bolon BJ3120 • Crizal Rock 1.67</p>
<div className="flex items-center justify-between font-body-sm text-body-sm text-outline">
<span>KTV: Trần Văn Bách [KT-04]</span>
<span>Còn lại: ~03 phút 45s</span>
</div>

<div className="w-full bg-surface-variant rounded-full h-2 mt-1 overflow-hidden">
<div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
</div>
</div>
</div>
<div className="mt-space-md pt-2 flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">speed</span> 2,800 RPM</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">water_drop</span> Áp lực làm mát OK</span>
<button className="px-2 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-semibold transition-colors">Dừng khẩn</button>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
<div>
<div className="flex items-start justify-between">
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center font-bold font-label-mono text-label-mono">
                02
              </div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">Essilor Delta 200 #B</h3>
<span className="font-body-sm text-body-sm text-outline">IP: 192.168.1.102 • Trạm Mài Gọng Kim Loại</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span> ONLINE • 35%
            </span>
</div>

<div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1.5">
<div className="flex items-center justify-between">
<span className="font-label-mono text-label-mono text-secondary font-semibold">LỆNH: #LAB-2026-089</span>
<span className="font-label-md text-label-md px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">Khay Xanh #09</span>
</div>
<p className="font-title-md text-title-md text-on-surface truncate">Gọng Charmant Titanium • Transitions Gen S 1.60</p>
<div className="flex items-center justify-between font-body-sm text-body-sm text-outline">
<span>KTV: Lê Quang Huy [KT-02]</span>
<span>Còn lại: ~07 phút 10s</span>
</div>

<div className="w-full bg-surface-variant rounded-full h-2 mt-1 overflow-hidden">
<div className="bg-secondary h-2 rounded-full transition-all duration-500" style={{ width: '35%' }}></div>
</div>
</div>
</div>
<div className="mt-space-md pt-2 flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">speed</span> 2,450 RPM</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">water_drop</span> Tuần hoàn tốt</span>
<button className="px-2 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-semibold transition-colors">Dừng khẩn</button>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-1 bg-surface-tint"></div>
<div>
<div className="flex items-start justify-between">
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-xl bg-surface-container text-on-surface flex items-center justify-center font-bold font-label-mono text-label-mono">
                03
              </div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">Nidek ME-1200 Multifunction</h3>
<span className="font-body-sm text-body-sm text-outline">IP: 192.168.1.105 • Chuyên Vát Mini &amp; Kính Khoan</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md flex items-center gap-1 font-semibold">
<span className="w-2 h-2 rounded-full bg-primary"></span> SẴN SÀNG
            </span>
</div>

<div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-label-mono text-label-mono text-outline">TRẠNG THÁI: TRỐNG MÁY</span>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md">Gợi ý nạp lệnh</span>
</div>
<p className="font-title-md text-title-md text-on-surface">Khay Đỏ #02 • Lệnh Hỏa Tốc #LAB-2026-091</p>
<p className="font-body-sm text-body-sm text-outline">Tròng Zeiss 1.74 chiết suất cao mỏng • Vát rãnh siêu nhỏ</p>
<div className="w-full bg-surface-variant rounded-full h-2 mt-1"></div>
</div>
</div>
<div className="mt-space-md pt-2 flex items-center justify-between">
<span className="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-primary">check_circle</span> Chuck kẹp chuẩn bị xong
          </span>
<button className="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container transition-all">
            Nạp Lệnh #091 Ngay
          </button>
</div>
</div>
</div>
</section>

<section className="px-space-lg pt-space-sm">
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">

<div className="lg:col-span-5 relative">
<span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
<input className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="Tìm mã lệnh #LAB, đơn #OPT, khách hàng, gọng hoặc KTV..." type="text"/>
</div>

<div className="lg:col-span-4 flex items-center gap-2">
<span className="material-symbols-outlined text-outline text-[20px]">precision_manufacturing</span>
<select className="w-full py-2.5 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary focus:outline-none transition-all">
<option value="all">Tất cả thiết bị mài mòn &amp; rãnh</option>
<option value="delta-1">Máy Essilor Delta 200 #01 (Chính)</option>
<option value="delta-2">Máy Essilor Delta 200 #02 (Kim loại)</option>
<option value="nidek-me">Máy Nidek Multifunction ME-1200</option>
<option value="groover">Máy phay rãnh bán tự động cước</option>
</select>
</div>

<div className="lg:col-span-3 flex items-center justify-end gap-space-sm">
<button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[18px]">tune</span>
<span>Bộ lọc nâng cao</span>
</button>
<button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[18px]">file_download</span>
<span>Xuất bảng kê</span>
</button>
</div>
</div>

<div className="flex flex-wrap items-center gap-2 pt-2">
<button className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-all">
          Tất cả (24)
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors">
          Chờ nạp vật tư (05)
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors">
          Đang mài lắp (04)
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors">
          Hoàn tất mài • Chờ QC (09)
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-error-container text-on-error-container hover:opacity-90 font-label-md text-label-md transition-colors flex items-center gap-1 font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span> Sự cố / Lỗi tròng (02)
        </button>
<button className="px-3.5 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container font-label-md text-label-md transition-colors flex items-center gap-1 font-semibold ml-auto">
<span className="material-symbols-outlined text-[14px]">bolt</span> Ưu tiên Hỏa Tốc 2H (03)
        </button>
</div>
</div>
</section>

<section className="px-space-lg py-space-md">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

<div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="p-space-md flex items-center justify-between bg-surface-container-low">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">format_list_bulleted</span>
<span className="font-title-md text-title-md text-on-surface">Hàng Đợi Lệnh Cắt Kính Đang Chờ Xử Lý</span>
</div>
<span className="font-label-mono text-label-mono text-outline">Tự động làm mới: 15s</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container font-label-md text-label-md text-on-surface-variant">
<th className="py-3 px-space-md">Khay / Mã Lệnh</th>
<th className="py-3 px-space-md">Đơn Hàng &amp; Khách</th>
<th className="py-3 px-space-md">Gọng &amp; Tròng Kính</th>
<th className="py-3 px-space-md">Toa OD/OS Tóm Tắt</th>
<th className="py-3 px-space-md">Máy &amp; KTV</th>
<th className="py-3 px-space-md">Trạng Thái</th>
<th className="py-3 px-space-md text-right">Thao Tác</th>
</tr>
</thead>
<tbody className="divide-y-0 text-body-md text-on-surface">

<tr className="bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer" >
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 w-max rounded-md bg-primary-fixed text-on-primary-fixed font-label-mono text-label-md font-bold">
                      Khay #04
                    </span>
<span className="font-label-mono text-label-mono text-primary font-bold">#LAB-2026-088</span>
<span className="font-body-sm text-body-sm text-outline">10:15 - Flagship</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Trần Minh Quân</span>
<span className="font-body-sm text-body-sm text-outline">#OPT-8921 • POS Q.1</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">0903.882.***</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-label-lg text-label-lg font-semibold text-primary truncate max-w-[180px]">Bolon BJ3120 Acetate</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-[180px]">Essilor Crizal Rock 1.67</span>
<span className="font-body-sm text-body-sm text-secondary">Phôi: Sẵn sàng khay</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top font-label-mono text-label-mono">
<div className="flex flex-col text-on-surface-variant">
<div><span className="text-primary font-bold">R:</span> -3.25 / -0.75 x 180°</div>
<div><span className="text-secondary font-bold">L:</span> -2.75 / -0.50 x 175°</div>
<span className="font-body-sm text-body-sm text-outline">PD: 64.0 (32/32)</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Essilor Delta #01</span>
<span className="font-body-sm text-body-sm text-outline">KTV: T.V. Bách</span>
<span className="font-body-sm text-body-sm text-primary">Tiến độ 68%</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-semibold inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Đang mài
                  </span>
<div className="font-body-sm text-body-sm text-outline mt-1">Còn ~03 phút</div>
</td>
<td className="py-3.5 px-space-md align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary transition-colors text-primary" title="Xem chi tiết kỹ thuật">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface-variant transition-colors" title="In phiếu thông số mài">
<span className="material-symbols-outlined text-[18px]">print</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors cursor-pointer" >
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 w-max rounded-md bg-error-container text-on-error-container font-label-mono text-label-md font-bold flex items-center gap-0.5">
<span className="material-symbols-outlined text-[12px]">bolt</span> Khay Đỏ #02
                    </span>
<span className="font-label-mono text-label-mono text-error font-bold">#LAB-2026-091</span>
<span className="font-body-sm text-body-sm text-outline">10:40 - VIP Flagship</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Nguyễn Thu Thảo</span>
<span className="font-body-sm text-body-sm text-outline">#OPT-8930 • Hỏa Tốc 2H</span>
<span className="font-label-md text-label-md text-error">Hạn trả kính: 12:30</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-label-lg text-label-lg font-semibold text-primary truncate max-w-[180px]">Lindberg Rim Titan</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-[180px]">Zeiss ClearView 1.74 Blue</span>
<span className="font-body-sm text-body-sm text-secondary">Đã thay linh kiện đệm mũi</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top font-label-mono text-label-mono">
<div className="flex flex-col text-on-surface-variant">
<div><span className="text-primary font-bold">R:</span> -6.50 / -1.25 x 010°</div>
<div><span className="text-secondary font-bold">L:</span> -6.00 / -1.00 x 170°</div>
<span className="font-body-sm text-body-sm text-outline">PD: 61.5 (30.5/31)</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Nidek ME-1200</span>
<span className="font-body-sm text-body-sm text-outline">KTV: Lê Quang Huy</span>
<span className="font-body-sm text-body-sm text-secondary">Vát cạnh siêu mỏng</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold inline-flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Chờ nạp máy
                  </span>
<div className="font-body-sm text-body-sm text-error mt-1 font-semibold">Ưu tiên số 1</div>
</td>
<td className="py-3.5 px-space-md align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="px-2.5 py-1 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all">
                      Nạp máy
                    </button>
</div>
</td>
</tr>

<tr className="bg-error-container/20 hover:bg-error-container/30 transition-colors cursor-pointer" >
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 w-max rounded-md bg-error text-on-error font-label-mono text-label-md font-bold">
                      Khay #07
                    </span>
<span className="font-label-mono text-label-mono text-error font-bold">#LAB-2026-085</span>
<span className="font-body-sm text-body-sm text-outline">09:40 - E-Com OMS</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Võ Hoàng Duy</span>
<span className="font-body-sm text-body-sm text-outline">#OMS-19402 • Giao Tận Nhà</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">0918.441.***</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-label-lg text-label-lg font-semibold text-primary truncate max-w-[180px]">Ray-Ban Aviator Metal</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-[180px]">Hoya Stellify 1.60 Tint</span>
<span className="font-body-sm text-body-sm text-error font-semibold">Nứt viền mắt trái (OS)</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top font-label-mono text-label-mono">
<div className="flex flex-col text-on-surface-variant">
<div><span className="text-primary font-bold">R:</span> -1.75 / -0.25 x 090°</div>
<div><span className="text-error font-bold">L:</span> -2.00 / -0.50 x 085° (Hỏng)</div>
<span className="font-body-sm text-body-sm text-outline">PD: 63.0</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-error">Delta 200 #02</span>
<span className="font-body-sm text-body-sm text-outline">KTV: Lê Quang Huy</span>
<span className="font-body-sm text-body-sm text-outline">Áp lực kẹp Chuck quá tải</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<span className="px-2.5 py-1 rounded-full bg-error text-on-error font-label-md text-label-md font-semibold inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">close</span> Lỗi vỡ tròng
                  </span>
<div className="font-body-sm text-body-sm text-error mt-1 font-semibold">Cần xuất bù tròng</div>
</td>
<td className="py-3.5 px-space-md align-top text-right">
<button className="px-2.5 py-1 rounded-lg bg-error text-on-error font-label-md text-label-md hover:bg-on-error-container transition-all">
                    Báo hao hụt
                  </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors cursor-pointer" >
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 w-max rounded-md bg-surface-container-high text-on-surface font-label-mono text-label-md font-bold">
                      Khay #11
                    </span>
<span className="font-label-mono text-label-mono text-primary font-bold">#LAB-2026-083</span>
<span className="font-body-sm text-body-sm text-outline">09:10 - Flagship</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Đỗ Quỳnh Anh</span>
<span className="font-body-sm text-body-sm text-outline">#OPT-8914 • POS Q.1</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">0977.123.***</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-label-lg text-label-lg font-semibold text-primary truncate max-w-[180px]">Gucci GG0061S</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-[180px]">Chemi U6 1.67 Aspheric</span>
<span className="font-body-sm text-body-sm text-outline">Đã vát cạnh kim cương</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top font-label-mono text-label-mono">
<div className="flex flex-col text-on-surface-variant">
<div><span className="text-primary font-bold">R:</span> -4.50 / -0.50 x 005°</div>
<div><span className="text-secondary font-bold">L:</span> -4.75 / -0.75 x 175°</div>
<span className="font-body-sm text-body-sm text-outline">PD: 62.0 (31/31)</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Essilor Delta #01</span>
<span className="font-body-sm text-body-sm text-outline">KTV: T.V. Bách</span>
<span className="font-body-sm text-body-sm text-primary">Mài xong lúc 10:10</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-semibold inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check</span> Chờ đo kiểm QC
                  </span>
<div className="font-body-sm text-body-sm text-outline mt-1">Lensmeter #01</div>
</td>
<td className="py-3.5 px-space-md align-top text-right">
<button className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all">
                    Đo QC (F9)
                  </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors cursor-pointer" >
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col gap-1">
<span className="px-2 py-0.5 w-max rounded-md bg-surface-container-high text-on-surface font-label-mono text-label-md font-bold">
                      Khay #15
                    </span>
<span className="font-label-mono text-label-mono text-primary font-bold">#LAB-2026-092</span>
<span className="font-body-sm text-body-sm text-outline">10:55 - E-Com OMS</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Phan Đức Toàn</span>
<span className="font-body-sm text-body-sm text-outline">#OMS-19410 • Ship Tỉnh</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">0934.567.***</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-label-lg text-label-lg font-semibold text-primary truncate max-w-[180px]">Oakley Metal Plate</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-[180px]">Essilor Eyezen Boost 1.60</span>
<span className="font-body-sm text-body-sm text-error">Chưa xuất phôi kho</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top font-label-mono text-label-mono">
<div className="flex flex-col text-on-surface-variant">
<div><span className="text-primary font-bold">R:</span> -1.50 / -0.50 x 045°</div>
<div><span className="text-secondary font-bold">L:</span> -1.25 / -0.25 x 135°</div>
<span className="font-body-sm text-body-sm text-outline">ADD: +0.60 • PD 65</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-outline">Chưa gán máy</span>
<span className="font-body-sm text-body-sm text-outline">KTV: Trực trạm</span>
</div>
</td>
<td className="py-3.5 px-space-md align-top">
<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md inline-flex items-center gap-1 font-semibold">
<span className="material-symbols-outlined text-[14px]">inventory</span> Chờ phôi kho
                  </span>
<div className="font-body-sm text-body-sm text-outline mt-1">Tủ T03-H4</div>
</td>
<td className="py-3.5 px-space-md align-top text-right">
<button className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-label-md text-label-md transition-all">
                    Lấy phôi
                  </button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-space-md bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm font-body-sm text-body-sm text-outline">
<div className="flex items-center gap-2">
<span>Hiển thị 5 / 24 lệnh đang điều phối</span>
<span>•</span>
<span className="text-primary font-semibold">Công suất Lab đạt 86% kế hoạch ngày</span>
</div>
<div className="flex items-center gap-1">
<button className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors disabled:opacity-50" disabled="">Trước</button>
<button className="px-2.5 py-1 rounded-lg bg-primary text-on-primary font-semibold">1</button>
<button className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors">2</button>
<button className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors">Sau</button>
</div>
</div>
</div>

<div className="lg:col-span-4 bg-surface-container-lowest rounded-xl shadow-sm flex flex-col p-space-lg sticky top-20" id="job-detail-panel">

<div className="flex items-start justify-between pb-space-sm">
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 rounded-md bg-primary text-on-primary font-label-mono text-label-md font-bold">
                Khay Xanh #04
              </span>
<span className="font-headline-sm text-headline-sm font-bold text-primary">#LAB-2026-088</span>
</div>
<span className="font-body-sm text-body-sm text-outline mt-0.5">Lệnh gia công trực tiếp tại Chi Nhánh Q.1</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold">
            Đang Mài
          </span>
</div>

<div className="mt-space-md p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider">Thông Tin Khung Gọng &amp; Phôi</span>
<span className="font-label-mono text-label-mono text-primary font-bold">Trace ID: #TR-8819</span>
</div>
<div className="flex gap-space-md items-center">
<div className="w-16 h-16 rounded-xl bg-surface-container-lowest flex items-center justify-center p-1 shadow-sm">
<img className="w-full h-full object-contain rounded-lg" data-alt="Close up photography of premium black titanium optical frame Bolon on optical inspection pad with subtle reflection" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKx5_58y8ZlgVxZ3VnBH8tsLLZGGkYCT6KqknR0fsN4t6n4DdJ_Mv_5AUIcV7cpxPVTcdn4qn5WD5_BoaSqM-3bTP5qiwXJwq8FpJdP2i8hfdWZ6AGtTHy3UNyU6fIyhn2iDiLjrSJNOmrR1LHrtL0jaOXddMRttOsdTxU2xIqYUbd4UGk3WE_iFluvQ3TiyklktnQXYvY3qyMPsAVBe_XdYXTW-0TzAVVVV92EBM"/>
</div>
<div className="flex flex-col">
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Gọng Bolon BJ3120 Black Matt</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Size: 52 - 18 - 145 • Gọng Nhựa Acetate Nguyên Khung</p>
<p className="font-body-sm text-body-sm text-primary font-semibold">Tròng: Essilor Crizal Rock 1.67 UV400</p>
</div>
</div>
</div>

<div className="mt-space-md">
<div className="flex items-center justify-between mb-2">
<h4 className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-primary text-[18px]">visibility</span>
              Thông Số Khúc Xạ Kỹ Thuật (OD / OS)
            </h4>
<span className="px-2 py-0.5 rounded-full bg-surface-container font-label-mono text-label-md text-outline">Đã khóa TOA</span>
</div>

<div className="overflow-hidden rounded-xl bg-surface-container-low">
<table className="w-full text-center font-label-mono text-label-md">
<thead className="bg-surface-container text-on-surface-variant">
<tr>
<th className="py-2 px-2 text-left font-semibold">Mắt</th>
<th className="py-2 px-1">SPH (Cầu)</th>
<th className="py-2 px-1">CYL (Trụ)</th>
<th className="py-2 px-1">TRỤC</th>
<th className="py-2 px-1">PD (Tâm)</th>
<th className="py-2 px-1">SH (Cao)</th>
</tr>
</thead>
<tbody className="divide-y-0 text-on-surface font-bold">

<tr className="bg-surface-container-lowest">
<td className="py-2.5 px-2 text-left text-primary font-bold">OD (Phải)</td>
<td className="py-2.5 px-1 text-on-surface">-3.25</td>
<td className="py-2.5 px-1 text-on-surface">-0.75</td>
<td className="py-2.5 px-1 text-on-surface">180°</td>
<td className="py-2.5 px-1 text-secondary font-semibold">32.0</td>
<td className="py-2.5 px-1 text-on-surface-variant font-normal">21.5</td>
</tr>

<tr className="bg-surface-container-low">
<td className="py-2.5 px-2 text-left text-secondary font-bold">OS (Trái)</td>
<td className="py-2.5 px-1 text-on-surface">-2.75</td>
<td className="py-2.5 px-1 text-on-surface">-0.50</td>
<td className="py-2.5 px-1 text-on-surface">175°</td>
<td className="py-2.5 px-1 text-secondary font-semibold">32.0</td>
<td className="py-2.5 px-1 text-on-surface-variant font-normal">21.5</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="mt-space-md p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider font-semibold">Thiết Lập Mài Lắp Máy Essilor Delta 200</span>
<span className="material-symbols-outlined text-primary text-[18px]">tune</span>
</div>
<div className="grid grid-cols-2 gap-space-sm font-body-sm text-body-sm">
<div className="p-2 rounded-lg bg-surface-container-lowest flex flex-col">
<span className="text-outline">Kiểu vát gờ cạnh:</span>
<span className="font-title-md text-title-md text-primary font-bold">Mini Bevel 110°</span>
</div>
<div className="p-2 rounded-lg bg-surface-container-lowest flex flex-col">
<span className="text-outline">Vị trí gờ (Curve):</span>
<span className="font-title-md text-title-md text-on-surface font-bold">Front 35% / Auto</span>
</div>
<div className="p-2 rounded-lg bg-surface-container-lowest flex flex-col">
<span className="text-outline">Đánh bóng viền:</span>
<span className="font-title-md text-title-md text-on-surface font-bold">Rimless Polish (Có)</span>
</div>
<div className="p-2 rounded-lg bg-surface-container-lowest flex flex-col">
<span className="text-outline">Khử điện tích / trầy:</span>
<span className="font-title-md text-title-md text-secondary font-bold">Kích hoạt Anti-Static</span>
</div>
</div>
</div>

<div className="mt-space-md p-space-sm rounded-xl bg-surface-variant/40 flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-[18px] mt-0.5">info</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
<strong>Ghi chú đơn hàng:</strong> Khách độ cận cao, ưu tiên giấu mép dày phía sau gọng Bolon. Kiểm tra kỹ tâm đồng tử PD 32/32 bằng thước điện tử trước khi gắn gọng.
          </p>
</div>

<div className="mt-space-lg flex flex-col gap-space-sm">
<div className="grid grid-cols-2 gap-space-sm">
<button className="py-2.5 px-space-md rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
<span>Cập nhật tiến độ</span>
</button>
<button className="py-2.5 px-space-md rounded-xl bg-error-container text-on-error-container font-label-lg text-label-lg hover:bg-error hover:text-on-error transition-all flex items-center justify-center gap-1.5" id="btn-report-breakage">
<span className="material-symbols-outlined text-[18px]">broken_image</span>
<span>Báo vỡ tròng</span>
</button>
</div>
<button className="w-full py-3 px-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[20px]">verified</span>
<span>Chuyển Sang Khâu QC &amp; Đóng Gói (F9)</span>
</button>
</div>
</div>
</div>
</section>

<div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-space-md hidden" id="modal-breakage">
<div className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
<div className="p-space-lg bg-error-container text-on-error-container flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-error text-[24px]">report_problem</span>
<h3 className="font-headline-sm text-headline-sm text-error font-bold">Biên Bản Hao Hụt &amp; Vỡ Tròng Kỹ Thuật</h3>
</div>
<button className="p-1 rounded-lg hover:bg-error/20 text-on-error-container" id="close-modal-breakage">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<div className="p-space-lg flex flex-col gap-space-md">
<div className="flex flex-col gap-1">
<span className="font-body-sm text-body-sm text-outline">Đơn hàng liên quan:</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">#LAB-2026-088 • Khách: Trần Minh Quân</span>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-label-lg text-label-lg text-on-surface font-semibold">Mắt tròng bị sự cố:</label>
<div className="grid grid-cols-2 gap-space-sm">
<button className="py-2 rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-primary hover:text-on-primary focus:bg-primary focus:text-on-primary transition-colors" type="button">
              Mắt Phải (OD)
            </button>
<button className="py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md" type="button">
              Mắt Trái (OS)
            </button>
</div>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-label-lg text-label-lg text-on-surface font-semibold">Nguyên nhân hư hại:</label>
<select className="w-full py-2.5 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary focus:outline-none">
<option>Nứt mép viền do áp lực kẹp chuck máy mài</option>
<option>Trượt tâm quang học quá dung sai cho phép (&gt;0.5mm)</option>
<option>Trầy xước bề mặt lớp phủ váng dầu trong quá trình đánh bóng</option>
<option>Lỗi phôi từ nhà cung cấp khi gia công nhiệt</option>
<option>Khác (Kèm diễn giải)</option>
</select>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-label-lg text-label-lg text-on-surface font-semibold">Đề xuất xử lý vật tư kho:</label>
<div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between font-body-sm text-body-sm">
<span>Xuất phôi bù ngay từ Tủ Kho Flagship Q.1</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">Tồn kho: 06 cái</span>
</div>
</div>
<div className="pt-space-sm flex items-center justify-end gap-space-sm">
<button className="px-space-md py-2.5 rounded-xl bg-surface-container text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container-high transition-colors" id="cancel-breakage">
            Hủy thao tác
          </button>
<button className="px-space-md py-2.5 rounded-xl bg-error text-on-error font-label-lg text-label-lg shadow-sm hover:opacity-90 transition-opacity" id="confirm-breakage">
            Xác nhận lập biên bản &amp; Xuất phôi mới
          </button>
</div>
</div>
</div>
</div>

<div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-space-md py-3 rounded-xl shadow-lg flex items-center gap-3 hidden animate-in slide-in-from-bottom-5" id="barcode-toast">
<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-[18px]">barcode_scanner</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md leading-tight">Đã quét Khay #04: #LAB-2026-088</span>
<span className="font-body-sm text-body-sm text-surface-dim">Dữ liệu thông số máy mài đã đồng bộ lên màn hình</span>
</div>
</div>
</div>

    </div>
  );
}
