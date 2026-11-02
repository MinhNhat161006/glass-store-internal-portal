import React, { useState } from 'react';
import { message } from 'antd';

export default function ReportsPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full max-w-[1600px] mx-auto p-3.5 sm:p-5 gap-3.5 text-on-surface">

<div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex flex-col space-y-1">
<div className="flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider text-outline">
<span>HỆ THỐNG &amp; QUẢN TRỊ</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span>BÁO CÁO &amp; PHÂN TÍCH</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary-container font-semibold">Báo Cáo Doanh Thu Đa Kênh &amp; Hiệu Quả Vận Hành</span>
</div>
<div className="flex items-center gap-space-sm">
<h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Doanh Thu Analytics &amp; Vận Hành Chuỗi</h1>
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Tháng 03/2026</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-outline font-label-mono text-label-mono">NFR-PERF-08 • Realtime</span>
</div>
</div>

<div className="flex flex-wrap items-center gap-space-sm">

<div className="flex items-center p-1 bg-surface-container rounded-full shadow-inner text-on-surface-variant font-label-md text-label-md">
<button className="px-3 py-1.5 rounded-full hover:text-on-surface transition-colors">Hôm Nay</button>
<button className="px-3 py-1.5 rounded-full hover:text-on-surface transition-colors">7 Ngày Qua</button>
<button className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary font-semibold shadow-sm">Tháng Này (T3/2026)</button>
<button className="px-3 py-1.5 rounded-full hover:text-on-surface transition-colors">Quý 1/2026</button>
<button className="px-3 py-1.5 rounded-full hover:text-on-surface transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">date_range</span>Khoảng Ngày
        </button>
</div>

<div className="relative min-w-[210px]">
<div className="flex items-center justify-between px-3.5 py-2 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container text-[18px]">store</span>
<span className="font-label-lg text-label-lg text-on-surface">Tất cả chi nhánh (4)</span>
</div>
<span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
</div>
</div>

<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-3.5 py-2 bg-surface-container rounded-xl text-primary-container font-label-lg text-label-lg hover:bg-secondary-fixed transition-colors">
<span className="material-symbols-outlined text-[18px]">table_view</span>
<span>Xuất Excel</span>
</button>
<button className="flex items-center gap-1.5 px-3.5 py-2 bg-surface-container rounded-xl text-primary-container font-label-lg text-label-lg hover:bg-secondary-fixed transition-colors">
<span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
<span>Báo Cáo BOD</span>
</button>
<button className="flex items-center gap-1.5 px-4 py-2 bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg hover:opacity-95 shadow-sm transition-all">
<span className="material-symbols-outlined text-[18px]">print</span>
<span>In [F10]</span>
</button>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-fixed/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
<div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">DOANH THU THUẦN (NET REVENUE)</span>
<span className="p-2 rounded-xl bg-secondary-fixed text-on-secondary-fixed">
<span className="material-symbols-outlined text-[20px]">payments</span>
</span>
</div>
<div className="mt-space-sm flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-on-surface tracking-tight">2.485.600.000</span>
<span className="font-title-md text-title-md text-outline">₫</span>
</div>
<div className="mt-2 flex items-center gap-2 font-label-md text-label-md">
<span className="flex items-center text-primary-container font-semibold">
<span className="material-symbols-outlined text-[16px]">trending_up</span>+14.8%
          </span>
<span className="text-outline">so với T2/2026</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">Đạt 94% KPI</span>
</div>
</div>
<div className="mt-space-md pt-3 bg-surface-container-low/50 rounded-lg p-2.5">
<div className="flex justify-between font-body-sm text-body-sm mb-1.5">
<span className="text-on-surface-variant flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>POS Quầy: 1.640.000.000 ₫
          </span>
<span className="font-semibold text-primary-container">66%</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm">
<span className="text-on-surface-variant flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>Online E-Com: 845.600.000 ₫
          </span>
<span className="font-semibold text-secondary">34%</span>
</div>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="absolute -right-6 -bottom-6 w-24 h-24 bg-secondary-fixed/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
<div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">GIÁ TRỊ ĐƠN TRUNG BÌNH (AOV)</span>
<span className="p-2 rounded-xl bg-surface-container text-primary-container">
<span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
</span>
</div>
<div className="mt-space-sm flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-on-surface tracking-tight">3.850.000</span>
<span className="font-title-md text-title-md text-outline">₫</span>
</div>
<div className="mt-2 flex items-center gap-2 font-label-md text-label-md">
<span className="flex items-center text-primary-container font-semibold">
<span className="material-symbols-outlined text-[16px]">trending_up</span>+6.2%
          </span>
<span className="text-outline">tháng trước</span>
</div>
</div>
<div className="mt-space-md pt-3 bg-surface-container-low/50 rounded-lg p-2.5">
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Tăng trưởng nhờ đẩy mạnh gói combo tròng kỹ thuật số <strong>Essilor Crizal Sapphire HR</strong> &amp; <strong>Zeiss ClearView 1.67</strong>.
        </p>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="absolute -right-6 -bottom-6 w-24 h-24 bg-tertiary-fixed/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
<div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">ĐƠN HÀNG HOÀN TẤT</span>
<span className="p-2 rounded-xl bg-secondary-fixed text-on-secondary-fixed">
<span className="material-symbols-outlined text-[20px]">task_alt</span>
</span>
</div>
<div className="mt-space-sm flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-on-surface tracking-tight">645</span>
<span className="font-title-md text-title-md text-outline">đơn</span>
</div>
<div className="mt-2 flex items-center gap-2 font-label-md text-label-md">
<span className="flex items-center text-primary-container font-semibold">
<span className="material-symbols-outlined text-[16px]">verified</span>100% Khám Khúc Xạ
          </span>
<span className="text-outline">đã lưu hồ sơ</span>
</div>
</div>
<div className="mt-space-md pt-3 bg-surface-container-low/50 rounded-lg p-2.5">
<div className="flex justify-between font-body-sm text-body-sm mb-1.5">
<span className="text-on-surface-variant">Offline Tại Chi Nhánh:</span>
<span className="font-semibold text-on-surface">415 đơn (64.3%)</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm">
<span className="text-on-surface-variant">Online Web / App OMS:</span>
<span className="font-semibold text-on-surface">230 đơn (35.7%)</span>
</div>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="absolute -right-6 -bottom-6 w-24 h-24 bg-error-container/30 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
<div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">TỶ LỆ HỦY &amp; HOÀN TIỀN</span>
<span className="p-2 rounded-xl bg-surface-container text-outline">
<span className="material-symbols-outlined text-[20px]">assignment_return</span>
</span>
</div>
<div className="mt-space-sm flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-on-surface tracking-tight">1.2</span>
<span className="font-title-md text-title-md text-outline">%</span>
</div>
<div className="mt-2 flex items-center gap-2 font-label-md text-label-md">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-primary-container font-semibold">8 đơn hủy / lỗi Lab</span>
<span className="text-outline">Mục tiêu &lt; 2.0%</span>
</div>
</div>
<div className="mt-space-md pt-3 bg-surface-container-low/50 rounded-lg p-2.5 flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container text-[18px]">shield</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Kiểm soát sai số mài lắp đạt chuẩn 99.8%</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

<div className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
<div>
<div className="flex items-center gap-2">
<h2 className="font-title-md text-title-md text-on-surface">Xu Hướng Doanh Thu &amp; Sản Lượng Đơn Theo Ngày</h2>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Tháng 3/2026</span>
</div>
<p className="font-body-sm text-body-sm text-outline mt-0.5">So sánh hiệu quả phân bổ nguồn thu giữa Offline POS và Online OMS</p>
</div>
<div className="flex items-center gap-space-md font-label-md text-label-md">
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-primary-container"></span>
<span className="text-on-surface-variant">POS Offline</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
<span className="text-on-surface-variant">Online OMS</span>
</div>
</div>
</div>

<div className="w-full h-64 relative flex flex-col justify-end pt-4 pb-2">

<div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
<div className="w-full h-px bg-outline"></div>
<div className="w-full h-px bg-outline"></div>
<div className="w-full h-px bg-outline"></div>
<div className="w-full h-px bg-outline"></div>
<div className="w-full h-px bg-outline"></div>
</div>
<svg className="w-full h-full overflow-visible" preserveaspectratio="none" viewbox="0 0 700 200">
<defs>
<lineargradient id="gradPos" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#086288" stopOpacity="0.3"></stop>
<stop offset="100%" stopColor="#086288" stopOpacity="0.0"></stop>
</lineargradient>
<lineargradient id="gradOnline" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#19648f" stopOpacity="0.25"></stop>
<stop offset="100%" stopColor="#19648f" stopOpacity="0.0"></stop>
</lineargradient>
</defs>

<polygon fill="url(#gradPos)" points="20,170 80,150 140,140 200,160 260,110 320,80 380,45 440,115 500,105 560,70 620,40 680,60 680,195 20,195"></polygon>
<polygon fill="url(#gradOnline)" points="20,185 80,175 140,165 200,170 260,145 320,130 380,100 440,140 500,135 560,115 620,95 680,110 680,195 20,195"></polygon>

<polyline fill="none" points="20,170 80,150 140,140 200,160 260,110 320,80 380,45 440,115 500,105 560,70 620,40 680,60" stroke="#086288" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>

<polyline fill="none" points="20,185 80,175 140,165 200,170 260,145 320,130 380,100 440,140 500,135 560,115 620,95 680,110" stroke="#19648f" stroke-dasharray="4,4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></polyline>

<circle cx="380" cy="45" fill="#086288" r="6" stroke="#ffffff" strokeWidth="2"></circle>
<circle cx="620" cy="40" fill="#086288" r="5" stroke="#ffffff" strokeWidth="2"></circle>
</svg>

<div className="flex justify-between items-center text-outline font-label-mono text-label-mono pt-2">
<span>01/03</span>
<span>04/03</span>
<span>07/03</span>
<span>10/03</span>
<span>13/03</span>
<span className="text-primary-container font-semibold">15/03 (Peak)</span>
<span>18/03</span>
<span>21/03</span>
<span>24/03</span>
<span className="text-primary-container font-semibold">28/03 (T7)</span>
<span>31/03</span>
</div>
</div>

<div className="mt-space-md p-3.5 bg-surface-container-low rounded-xl flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary-container text-[20px] shrink-0 mt-0.5">auto_awesome</span>
<div className="flex-1">
<div className="flex items-center gap-2">
<span className="font-label-lg text-label-lg text-on-surface font-semibold">Ghi Chú Phân Tích Thông Minh OptiAI</span>
<span className="px-2 py-0.2 bg-secondary-fixed text-on-secondary-fixed rounded text-[11px] font-semibold">Deep Analytics</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Đỉnh doanh thu ngày <strong>15/03 đạt 145.2 triệu ₫</strong> nhờ chiến dịch nâng cấp tròng lọc ánh sáng xanh BlueGuard. Cuối tuần (T7, CN) ghi nhận doanh số bình quân đạt <strong>120 - 140 triệu ₫/ngày</strong>, cao hơn 48% so với các ngày giữa tuần.
          </p>
</div>
</div>
</div>

<div className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<h2 className="font-title-md text-title-md text-on-surface">Phân Bổ Doanh Thu Danh Mục</h2>
<span className="font-label-md text-label-md text-outline">Q1 / 2026</span>
</div>
<p className="font-body-sm text-body-sm text-outline">Cơ cấu doanh thu theo nhóm sản phẩm quang học và dịch vụ đo thị lực</p>

<div className="mt-space-lg">
<div className="w-full h-4 rounded-full bg-surface-container flex overflow-hidden">
<div className="h-full bg-primary-container" style={{ width: '46%' }} title="Tròng kính: 46%"></div>
<div className="h-full bg-secondary" style={{ width: '38%' }} title="Gọng kính: 38%"></div>
<div className="h-full bg-secondary-container" style={{ width: '12%' }} title="Kính râm: 12%"></div>
<div className="h-full bg-surface-container-highest" style={{ width: '4%' }} title="Phụ kiện: 4%"></div>
</div>
</div>

<div className="mt-space-lg space-y-space-md">

<div>
<div className="flex justify-between items-center mb-1">
<span className="font-label-lg text-label-lg text-on-surface flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-primary-container"></span>
                Tròng Kính Quang Học (Essilor, Zeiss, Chemi)
              </span>
<div className="text-right">
<span className="font-label-lg text-label-lg text-on-surface font-semibold">1.143.376.000 ₫</span>
<span className="text-outline font-label-md text-label-md ml-1">(46%)</span>
</div>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary-container rounded-full" style={{ width: '46%' }}></div>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-1">
<span className="font-label-lg text-label-lg text-on-surface flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
                Gọng Kính Chính Hãng (Bolon, Ray-Ban, Charmant)
              </span>
<div className="text-right">
<span className="font-label-lg text-label-lg text-on-surface font-semibold">944.528.000 ₫</span>
<span className="text-outline font-label-md text-label-md ml-1">(38%)</span>
</div>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-secondary rounded-full" style={{ width: '38%' }}></div>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-1">
<span className="font-label-lg text-label-lg text-on-surface flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                Kính Râm Thời Trang &amp; Kính Mát Polarized
              </span>
<div className="text-right">
<span className="font-label-lg text-label-lg text-on-surface font-semibold">298.272.000 ₫</span>
<span className="text-outline font-label-md text-label-md ml-1">(12%)</span>
</div>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-secondary-container rounded-full" style={{ width: '12%' }}></div>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-1">
<span className="font-label-lg text-label-lg text-on-surface flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-surface-container-highest"></span>
                Phụ Kiện Chăm Sóc &amp; Gói Dịch Vụ Khám Mắt
              </span>
<div className="text-right">
<span className="font-label-lg text-label-lg text-on-surface font-semibold">99.424.000 ₫</span>
<span className="text-outline font-label-md text-label-md ml-1">(4%)</span>
</div>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-outline rounded-full" style={{ width: '4%' }}></div>
</div>
</div>
</div>
</div>

<div className="mt-space-md p-3.5 bg-surface-container-low rounded-xl flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[18px]">verified_user</span>
</div>
<div>
<div className="font-label-md text-label-md font-semibold text-on-surface">Độ Phủ Bảo Hành Tròng Kính</div>
<div className="font-body-sm text-body-sm text-outline">100% Khách Hàng Được Cấp Thẻ BH Điện Tử</div>
</div>
</div>
<span className="font-label-mono text-label-mono text-primary-container font-semibold">99.4% CSAT</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
<div>
<h2 className="font-title-md text-title-md text-on-surface">Bảng Hiệu Suất Doanh Thu Chi Nhánh &amp; Nhân Viên Xuất Sắc</h2>
<p className="font-body-sm text-body-sm text-outline mt-0.5">Theo dõi tỷ lệ hoàn thành KPI (BR-41 đến BR-45), doanh số Rx Orders và lợi nhuận gộp</p>
</div>
<div className="flex items-center gap-space-sm">
<span className="font-label-md text-label-md text-outline">Cập nhật: 10 phút trước</span>
<button className="p-1.5 rounded-lg bg-surface-container text-primary-container hover:bg-secondary-fixed transition-colors" title="Làm mới">
<span className="material-symbols-outlined text-[18px]">refresh</span>
</button>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left font-body-md text-body-md">
<thead>
<tr className="bg-surface-container-low text-outline font-label-md text-label-md uppercase tracking-wider">
<th className="py-3 px-4 rounded-l-lg">Chi Nhánh / Kênh Bán</th>
<th className="py-3 px-4 text-center">Đơn Hoàn Tất</th>
<th className="py-3 px-4 text-right">Doanh Thu Tổng (VNĐ)</th>
<th className="py-3 px-4 text-center">% Hoàn Thành KPI</th>
<th className="py-3 px-4 text-right">Đơn Kính Toa (Rx)</th>
<th className="py-3 px-4 text-center">Biên Lợi Nhuận Gộp</th>
<th className="py-3 px-4">Nhân Sự Dẫn Đầu</th>
<th className="py-3 px-4 text-center rounded-r-lg">Đánh Giá</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container-low text-on-surface">

<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-3.5 px-4 font-semibold text-on-surface">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<span>Flagship Q.1 (Đồng Khởi)</span>
</div>
<span className="font-body-sm text-body-sm text-outline block ml-4">Mã CN: BR-HCM-01</span>
</td>
<td className="py-3.5 px-4 text-center font-label-mono text-label-mono">248 đơn</td>
<td className="py-3.5 px-4 text-right font-semibold font-label-mono text-label-mono">1.045.200.000 ₫</td>
<td className="py-3.5 px-4 text-center">
<div className="flex items-center justify-center gap-2">
<div className="w-16 h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{ width: '104%' }}></div>
</div>
<span className="font-label-mono text-label-mono font-semibold text-primary-container">104.5%</span>
</div>
</td>
<td className="py-3.5 px-4 text-right font-label-mono text-label-mono">785.400.000 ₫ (75%)</td>
<td className="py-3.5 px-4 text-center font-semibold text-primary-container">58.4%</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-semibold text-xs">MA</div>
<div>
<span className="font-label-lg text-label-lg font-medium block leading-none">Trần Minh Anh</span>
<span className="font-body-sm text-body-sm text-outline">218 triệu ₫</span>
</div>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold">Xuất Sắc</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-3.5 px-4 font-semibold text-on-surface">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span>CN Tràng Tiền - Hà Nội</span>
</div>
<span className="font-body-sm text-body-sm text-outline block ml-4">Mã CN: BR-HAN-02</span>
</td>
<td className="py-3.5 px-4 text-center font-label-mono text-label-mono">112 đơn</td>
<td className="py-3.5 px-4 text-right font-semibold font-label-mono text-label-mono">485.400.000 ₫</td>
<td className="py-3.5 px-4 text-center">
<div className="flex items-center justify-center gap-2">
<div className="w-16 h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{ width: '92%' }}></div>
</div>
<span className="font-label-mono text-label-mono font-semibold text-on-surface">92.0%</span>
</div>
</td>
<td className="py-3.5 px-4 text-right font-label-mono text-label-mono">342.000.000 ₫ (70%)</td>
<td className="py-3.5 px-4 text-center font-semibold text-primary-container">56.8%</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-surface-container text-primary-container flex items-center justify-center font-semibold text-xs">LH</div>
<div>
<span className="font-label-lg text-label-lg font-medium block leading-none">Lê Hoàng Nam</span>
<span className="font-body-sm text-body-sm text-outline">145 triệu ₫</span>
</div>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md font-semibold">Đạt Chuẩn</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-3.5 px-4 font-semibold text-on-surface">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
<span>CN Thảo Điền - Q.2</span>
</div>
<span className="font-body-sm text-body-sm text-outline block ml-4">Mã CN: BR-HCM-03</span>
</td>
<td className="py-3.5 px-4 text-center font-label-mono text-label-mono">55 đơn</td>
<td className="py-3.5 px-4 text-right font-semibold font-label-mono text-label-mono">214.000.000 ₫</td>
<td className="py-3.5 px-4 text-center">
<div className="flex items-center justify-center gap-2">
<div className="w-16 h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{ width: '78%' }}></div>
</div>
<span className="font-label-mono text-label-mono font-semibold text-outline">78.2%</span>
</div>
</td>
<td className="py-3.5 px-4 text-right font-label-mono text-label-mono">160.500.000 ₫ (75%)</td>
<td className="py-3.5 px-4 text-center font-semibold text-primary-container">61.2%</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-surface-container text-primary-container flex items-center justify-center font-semibold text-xs">NT</div>
<div>
<span className="font-label-lg text-label-lg font-medium block leading-none">Nguyễn Thảo Vy</span>
<span className="font-body-sm text-body-sm text-outline">98 triệu ₫</span>
</div>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold">Cần Tăng Tốc</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-3.5 px-4 font-semibold text-on-surface">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
<span>Online E-Com Hub (Web/App OMS)</span>
</div>
<span className="font-body-sm text-body-sm text-outline block ml-4">Kênh Số: HUB-ECOM-01</span>
</td>
<td className="py-3.5 px-4 text-center font-label-mono text-label-mono">230 đơn</td>
<td className="py-3.5 px-4 text-right font-semibold font-label-mono text-label-mono">845.600.000 ₫</td>
<td className="py-3.5 px-4 text-center">
<div className="flex items-center justify-center gap-2">
<div className="w-16 h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{ width: '102%' }}></div>
</div>
<span className="font-label-mono text-label-mono font-semibold text-primary-container">102.0%</span>
</div>
</td>
<td className="py-3.5 px-4 text-right font-label-mono text-label-mono">312.000.000 ₫ (37%)</td>
<td className="py-3.5 px-4 text-center font-semibold text-primary-container">52.1%</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-semibold text-xs">DG</div>
<div>
<span className="font-label-lg text-label-lg font-medium block leading-none">Đội CSKH Digital</span>
<span className="font-body-sm text-body-sm text-outline">845.6 triệu ₫</span>
</div>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold">Xuất Sắc</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
<div>
<div className="flex items-center gap-2">
<h2 className="font-title-md text-title-md text-on-surface">Top Đơn Vị Sản Phẩm Bán Chạy Nhất (SKU Analytics)</h2>
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Best Sellers</span>
</div>
<p className="font-body-sm text-body-sm text-outline mt-0.5">Xếp hạng theo doanh số đóng góp và giám sát hạn mức tồn kho an toàn</p>
</div>
<button className="font-label-lg text-label-lg text-primary-container hover:underline flex items-center gap-1">
<span>Xem tất cả 1.420 SKUs</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">

<div className="p-space-md rounded-xl bg-surface-container-low/60 flex flex-col justify-between hover:bg-surface-container-low transition-all">
<div>
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-mono text-label-mono font-bold">#1 TOP REVENUE</span>
<span className="font-label-md text-label-md text-primary-container font-semibold">Essilor France</span>
</div>
<div className="mt-space-sm">
<h3 className="font-title-md text-title-md text-on-surface leading-snug">Cặp Tròng Essilor Crizal Sapphire HR 1.67</h3>
<span className="font-body-sm text-body-sm text-outline block mt-0.5">SKU: ESS-CRZ-HR167</span>
</div>
<div className="mt-space-md pt-space-sm flex items-baseline justify-between">
<div>
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">418.900.000 ₫</span>
<span className="font-body-sm text-body-sm text-outline block">142 cặp bán ra</span>
</div>
</div>
</div>
<div className="mt-space-md pt-3 bg-surface-container-lowest rounded-lg p-2.5 flex items-center justify-between font-label-md text-label-md">
<div className="flex items-center gap-1.5 text-on-surface">
<span className="material-symbols-outlined text-[16px] text-primary-container">inventory_2</span>
<span>Tồn kho: <strong>48 cặp</strong></span>
</div>
<span className="text-primary-container font-semibold">Đủ cung ứng</span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low/60 flex flex-col justify-between hover:bg-surface-container-low transition-all">
<div>
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-mono text-label-mono font-bold">#2 TOP FRAME</span>
<span className="font-label-md text-label-md text-on-secondary-fixed font-semibold">Bolon Eyewear</span>
</div>
<div className="mt-space-sm">
<h3 className="font-title-md text-title-md text-on-surface leading-snug">Gọng Bolon Graceful BJ3120 Titanium</h3>
<span className="font-body-sm text-body-sm text-outline block mt-0.5">SKU: BOL-BJ3120-TIT</span>
</div>
<div className="mt-space-md pt-space-sm flex items-baseline justify-between">
<div>
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">282.080.000 ₫</span>
<span className="font-body-sm text-body-sm text-outline block">86 cây bán ra</span>
</div>
</div>
</div>
<div className="mt-space-md pt-3 bg-surface-container-lowest rounded-lg p-2.5 flex items-center justify-between font-label-md text-label-md">
<div className="flex items-center gap-1.5 text-on-surface">
<span className="material-symbols-outlined text-[16px] text-outline">inventory_2</span>
<span>Tồn kho: <strong>14 cây</strong></span>
</div>
<span className="px-2 py-0.5 bg-surface-container text-error rounded font-semibold flex items-center gap-1 text-[11px]">
<span className="material-symbols-outlined text-[12px]">warning</span> Cần nhập thêm
          </span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low/60 flex flex-col justify-between hover:bg-surface-container-low transition-all">
<div>
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary-container font-label-mono text-label-mono font-bold">#3 BLUEGUARD</span>
<span className="font-label-md text-label-md text-primary-container font-semibold">Zeiss Vision</span>
</div>
<div className="mt-space-sm">
<h3 className="font-title-md text-title-md text-on-surface leading-snug">Cặp Tròng Zeiss ClearView BlueGuard 1.60</h3>
<span className="font-body-sm text-body-sm text-outline block mt-0.5">SKU: ZEI-CLV-BG160</span>
</div>
<div className="mt-space-md pt-space-sm flex items-baseline justify-between">
<div>
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">280.320.000 ₫</span>
<span className="font-body-sm text-body-sm text-outline block">64 cặp bán ra</span>
</div>
</div>
</div>
<div className="mt-space-md pt-3 bg-surface-container-lowest rounded-lg p-2.5 flex items-center justify-between font-label-md text-label-md">
<div className="flex items-center gap-1.5 text-on-surface">
<span className="material-symbols-outlined text-[16px] text-primary-container">inventory_2</span>
<span>Tồn kho: <strong>32 cặp</strong></span>
</div>
<span className="text-primary-container font-semibold">Tồn tối ưu</span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low/60 flex flex-col justify-between hover:bg-surface-container-low transition-all">
<div>
<div className="flex items-center justify-between">
<span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-mono text-label-mono font-bold">#4 SUNGLASSES</span>
<span className="font-label-md text-label-md text-outline font-semibold">Ray-Ban Italy</span>
</div>
<div className="mt-space-sm">
<h3 className="font-title-md text-title-md text-on-surface leading-snug">Ray-Ban Aviator Titanium Polarized Classic</h3>
<span className="font-body-sm text-body-sm text-outline block mt-0.5">SKU: RB-3025-TIT-POL</span>
</div>
<div className="mt-space-md pt-space-sm flex items-baseline justify-between">
<div>
<span className="font-headline-sm text-headline-sm text-primary-container font-bold">172.900.000 ₫</span>
<span className="font-body-sm text-body-sm text-outline block">38 cây bán ra</span>
</div>
</div>
</div>
<div className="mt-space-md pt-3 bg-surface-container-lowest rounded-lg p-2.5 flex items-center justify-between font-label-md text-label-md">
<div className="flex items-center gap-1.5 text-on-surface">
<span className="material-symbols-outlined text-[16px] text-outline">inventory_2</span>
<span>Tồn kho: <strong>19 cây</strong></span>
</div>
<span className="text-primary-container font-semibold">Đủ cung ứng</span>
</div>
</div>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-outline font-body-sm text-body-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container text-[18px]">verified</span>
<span>Hệ thống phân tích dữ liệu tự động đồng bộ từ OMS POS v2.5 và Xưởng Lab Kỹ Thuật.</span>
</div>
<div className="flex items-center gap-space-md font-label-mono text-label-mono">
<span>Độ trễ xử lý: 42ms (NFR-PERF-08)</span>
<span>•</span>
<span>Phiên bản Báo Cáo: REP-03.2026.V4</span>
</div>
</div>
</div>

    </div>
  );
}
