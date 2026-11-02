import React, { useState } from 'react';
import { message } from 'antd';

export default function WarrantyPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full">

<div className="w-full px-6 py-6 flex flex-col gap-6">

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-xl shadow-sm">
<div className="flex flex-col gap-1.5">
<div className="flex items-center gap-2 font-label-mono text-label-mono text-outline">
<span className="hover:text-primary transition-colors cursor-pointer">KHÁCH HÀNG CRM</span>
<span>/</span>
<span className="hover:text-primary transition-colors cursor-pointer">QUẢN LÝ DỊCH VỤ HẬU MÃI</span>
<span>/</span>
<span className="text-primary font-semibold">PHIẾU BẢO HÀNH &amp; ĐỔI TRẢ KÍNH</span>
</div>
<div className="flex flex-wrap items-center gap-3 mt-0.5">
<h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Hồ Sơ Bảo Hành &amp; Thẩm Định Đổi Trả</h1>
<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="material-symbols-outlined text-[15px] text-primary">verified_user</span>
<span>Chính Sách BH v2.4 (BR-35/BR-40)</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-mono text-label-mono">
<span className="material-symbols-outlined text-[15px] text-secondary">support_agent</span>
<span>Hotline Kỹ Thuật: 1900 6828 (Phím 2)</span>
</div>
</div>
</div>

<div className="flex items-center gap-2.5 flex-wrap">
<button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-lg text-label-lg shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">file_download</span>
<span>Xuất Báo Cáo .xlsx</span>
</button>
<button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-on-secondary hover:bg-primary transition-colors font-label-lg text-label-lg shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">published_with_changes</span>
<span>Tiếp Nhận Đổi Trả [F2]</span>
</button>
<button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary transition-all font-label-lg text-label-lg shadow-[0_4px_14px_rgba(8,98,136,0.25)]" type="button">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
<span>Tạo Phiếu Bảo Hành [F1]</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

<div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div>
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Tổng Yêu Cầu Trong Tháng</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg text-primary tracking-tight">128</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">phiếu</span>
</div>
</div>
<div className="w-11 h-11 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center shadow-xs">
<span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
</div>
</div>
<div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
<span className="flex items-center gap-1 text-primary font-semibold">
<span className="material-symbols-outlined text-[15px]">trending_up</span>+4.2% so với T3
          </span>
<span className="text-outline">Tỷ lệ xử lý: <strong className="text-on-surface">96.8%</strong></span>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div>
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Đang Xử Lý Tại Lab / Kho</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg text-secondary tracking-tight">14</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">chờ xử lý</span>
</div>
</div>
<div className="w-11 h-11 rounded-xl bg-surface-container-high text-secondary flex items-center justify-center shadow-xs">
<span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
</div>
</div>
<div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
<span>Đổi tròng: <strong className="text-primary">8</strong></span>
<span>Nắn gọng: <strong className="text-secondary">4</strong></span>
<span>Chờ linh kiện: <strong className="text-error">2</strong></span>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div>
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Đủ Điều Kiện Đổi Mới (Pass QC)</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg text-tertiary-container tracking-tight">06</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">phiếu 100%</span>
</div>
</div>
<div className="w-11 h-11 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center shadow-xs">
<span className="material-symbols-outlined text-[24px]">swap_horiz</span>
</div>
</div>
<div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
<span className="flex items-center gap-1 font-medium text-tertiary">
<span className="material-symbols-outlined text-[15px]">verified</span>Chính sách 7 ngày
          </span>
<span className="text-outline">Lỗi NSX BR-38</span>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div>
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Tỷ Lệ Hoàn Tiền / Bồi Hoàn</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg text-on-surface tracking-tight">0.8%</span>
<span className="font-label-md text-label-md text-outline font-medium">dưới hạn mức 1.5%</span>
</div>
</div>
<div className="w-11 h-11 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center shadow-xs">
<span className="material-symbols-outlined text-[24px]">currency_exchange</span>
</div>
</div>
<div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
<span className="text-on-surface font-semibold">01 giao dịch VNPay</span>
<span className="text-outline font-label-mono text-label-mono">Mã BR-39</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">

<div className="relative flex-1 min-w-[320px]">
<span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-outline">search</span>
<input className="w-full pl-10 pr-28 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 transition-all" placeholder="Quét Barcode mã phiếu / SĐT khách / SKU gọng / Mã đơn #OPT-..." type="text" value="#WAR-2026-089"/>
<div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-surface-container text-primary font-label-mono text-label-mono">
<span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
<span>F2 Scan</span>
</div>
</div>

<div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0">
<button className="px-3.5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold whitespace-nowrap shadow-sm" type="button">
          Tất cả (128)
        </button>
<button className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md whitespace-nowrap transition-colors" type="button">
          Chờ tiếp nhận (08)
        </button>
<button className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md whitespace-nowrap transition-colors flex items-center gap-1.5" type="button">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Đang xử lý Lab (14)</span>
</button>
<button className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md whitespace-nowrap transition-colors" type="button">
          Hoàn tất bàn giao (98)
        </button>
<button className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-error font-label-md text-label-md whitespace-nowrap transition-colors" type="button">
          Từ chối bảo hành (08)
        </button>
</div>

<div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
<div className="relative min-w-[200px]">
<select className="w-full appearance-none pl-3.5 pr-8 py-2 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer">
<option>Tất cả loại bảo hành</option>
<option>Váng phủ tròng (Crizal/Zeiss)</option>
<option defaultValue="">Gọng gãy mối hàn / Ve mũi</option>
<option>Đổi trả kích cỡ (7 ngày)</option>
<option>Vệ sinh nắn chỉnh miễn phí</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[18px] text-outline">expand_more</span>
</div>
<div className="relative min-w-[190px]">
<select className="w-full appearance-none pl-3.5 pr-8 py-2 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer">
<option defaultValue="">Flagship Q.1 (HCM)</option>
<option>CN Tràng Tiền (HN)</option>
<option>CN Thảo Điền (Q.2)</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[18px] text-outline">storefront</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

<div className="lg:col-span-5 flex flex-col gap-3">
<div className="flex items-center justify-between px-1">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Danh Sách Yêu Cầu</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-mono text-label-mono">5 phiếu mới cập nhật</span>
</div>
<span className="font-body-sm text-body-sm text-outline">Sắp xếp: Mới nhất</span>
</div>

<div className="flex flex-col gap-2.5">

<div className="p-4 rounded-xl bg-surface-container-lowest shadow-md transition-all cursor-pointer relative bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest to-surface-container-high/40">
<div className="absolute left-0 top-3 bottom-3 w-1.5 bg-primary-container rounded-r-md"></div>
<div className="flex items-start justify-between gap-2 pl-2">
<div>
<div className="flex items-center gap-2">
<span className="font-label-mono text-label-mono text-primary font-bold">#WAR-2026-089</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Đang xử lý tại quầy</span>
</div>
<h2 className="font-title-md text-title-md text-on-surface mt-1">Nguyễn Hoàng Duy</h2>
<div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span className="material-symbols-outlined text-[14px] text-outline">qr_code_2</span>
<span>Bolon BJ3120 • Lỏng ve mũi &amp; ốc bản lề</span>
</div>
</div>
<div className="text-right">
<span className="font-label-mono text-label-mono text-outline block">10:45 Hôm nay</span>
<span className="inline-block mt-1 font-label-mono text-label-md font-semibold text-primary">0 VND</span>
</div>
</div>
<div className="mt-3 pt-2.5 pl-2 bg-surface-container-low rounded-lg p-2 flex items-center justify-between text-body-sm font-body-sm">
<span className="text-on-surface-variant">Lỗi hao mòn cơ học (BR-35)</span>
<span className="text-secondary font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">build</span>KTV Trần Văn Bách
              </span>
</div>
</div>

<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer">
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2">
<span className="font-label-mono text-label-mono text-outline font-semibold">#WAR-2026-088</span>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-md text-label-md">Lab duyệt đổi mới 100%</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface mt-1">Lê Thúy Kiều</h3>
<div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span className="material-symbols-outlined text-[14px] text-outline">lens</span>
<span>Crizal Rock 1.60 • Bong váng phủ OD</span>
</div>
</div>
<div className="text-right">
<span className="font-label-mono text-label-mono text-outline block">09:12 Hôm nay</span>
<span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-surface-container font-label-mono text-label-md text-on-surface">Đổi tròng</span>
</div>
</div>
<div className="mt-3 pt-2 flex items-center justify-between text-body-sm font-body-sm text-outline">
<span>Đơn gốc #OPT-8721 • Mua 4 tháng</span>
<span className="text-primary font-medium">Bảo hành chính hãng Essilor</span>
</div>
</div>

<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer">
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2">
<span className="font-label-mono text-label-mono text-outline font-semibold">#WAR-2026-085</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md">Chờ khách nhận gọng</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface mt-1">Trần Minh Quang</h3>
<div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span className="material-symbols-outlined text-[14px] text-outline">swap_calls</span>
<span>Titanium Minimalist • Đổi size 54 sang 52</span>
</div>
</div>
<div className="text-right">
<span className="font-label-mono text-label-mono text-outline block">Hôm qua</span>
<span className="inline-block mt-1 font-label-mono text-label-md text-primary font-semibold">Đổi 7 ngày (BR-38)</span>
</div>
</div>
<div className="mt-3 pt-2 flex items-center justify-between text-body-sm font-body-sm text-outline">
<span>Tình trạng: Nguyên tem hộp, không xước</span>
<span className="text-on-surface font-medium">Đã mài lại tròng mới</span>
</div>
</div>

<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer">
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2">
<span className="font-label-mono text-label-mono text-outline font-semibold">#WAR-2026-082</span>
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-md text-label-md">Từ chối BH miễn phí</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface mt-1">Đỗ Quỳnh Anh</h3>
<div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span className="material-symbols-outlined text-[14px] text-error">broken_image</span>
<span>Gọng Ray-Ban • Gãy càng do tai nạn xe</span>
</div>
</div>
<div className="text-right">
<span className="font-label-mono text-label-mono text-outline block">14/04/2026</span>
<span className="inline-block mt-1 text-error font-label-mono text-label-md font-semibold">Lỗi EX-WAR-03</span>
</div>
</div>
<div className="mt-3 pt-2 flex items-center justify-between text-body-sm font-body-sm">
<span className="text-on-surface-variant">Va đập ngoại lực mạnh</span>
<span className="text-secondary font-medium">Đề xuất trợ giá 50%</span>
</div>
</div>

<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer opacity-90">
<div className="flex items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2">
<span className="font-label-mono text-label-mono text-outline font-semibold">#WAR-2026-079</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-outline font-label-md text-label-md">Hoàn tất bàn giao</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface mt-1">Phan Đức Toàn</h3>
<div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span className="material-symbols-outlined text-[14px] text-outline">check_circle</span>
<span>Đổi màu tròng râm cận (Trà sang Khói)</span>
</div>
</div>
<div className="text-right">
<span className="font-label-mono text-label-mono text-outline block">12/04/2026</span>
<span className="inline-block mt-1 font-label-mono text-label-md text-outline">Đã ký nhận</span>
</div>
</div>
<div className="mt-3 pt-2 flex items-center justify-between text-body-sm font-body-sm text-outline">
<span>Đơn gốc #OPT-8650</span>
<span className="text-on-surface font-medium">Bảo hành thích nghi mắt</span>
</div>
</div>
</div>

<div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl shadow-xs text-body-sm font-body-sm text-outline">
<span>Hiển thị 1 - 5 trong số 128 phiếu</span>
<div className="flex items-center gap-1">
<button className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[16px]">chevron_left</span>
</button>
<span className="px-2 font-label-mono text-on-surface">Trang 1 / 26</span>
<button className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</div>
</div>
</div>

<div className="lg:col-span-7 flex flex-col gap-5">

<div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 flex flex-col gap-6 relative overflow-hidden">

<div className="flex flex-col md:flex-row md:items-center justify-between pb-5 bg-surface-container-low -mx-6 -mt-6 p-6 gap-4">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2 flex-wrap">
<span className="px-3 py-1 rounded-lg bg-primary-container text-on-primary font-label-mono text-label-mono font-bold tracking-wider">
                  PHIẾU #WAR-2026-089
                </span>
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold">
                  Thay Linh Kiện Miễn Phí Tại Quầy
                </span>
<span className="text-body-sm font-body-sm text-outline">Tiếp nhận: 10:45 Hôm nay</span>
</div>
<div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant mt-1">
<span>Liên kết HĐ gốc:</span>
<a className="font-label-mono text-primary font-semibold hover:underline flex items-center gap-0.5" href="#">
                  #OPT-8842-SG
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
</a>
<span className="text-outline">|</span>
<span>Ngày mua: 15/04/2025</span>
<span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-semibold text-body-sm">
                  Còn 45 ngày bảo hành
                </span>
</div>
</div>

<div className="flex items-center gap-3 bg-surface-container-lowest p-2.5 rounded-xl shadow-xs">
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-title-md font-bold">
                HD
              </div>
<div>
<div className="flex items-center gap-1.5">
<span className="font-title-md text-title-md text-on-surface">Nguyễn Hoàng Duy</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-secondary font-label-mono text-label-md font-bold">VIP SILVER</span>
</div>
<div className="font-label-mono text-label-mono text-outline">0918 732 998 • Lịch sử: 4 đơn kính</div>
</div>
</div>
</div>

<div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-surface-container-low">
<div className="w-32 h-24 rounded-lg bg-surface-container-lowest flex items-center justify-center p-2 shadow-xs shrink-0 overflow-hidden">
<img className="w-full h-full object-contain" data-alt="Close up photography of premium Bolon rose gold titanium optical frame resting on a clean clinical white optical tray with soft shadows and soft blue ambient lighting, high sharpness and realistic textures." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOQKMeHyvIU_DWxQ45kp2cCE8ROFVVkRgLasoNMqfORdrfhm-g0brFNx0mMKkY8uANmbncIl8y9sKbHVCIiqHT1xgTBRcbnjYOGQakgft6wTog1m6DC6J7PkIlDvxgZyK31EnXTlBrGcMjj0NmM5hdZlIFwVLYMZ2-moJNdcgJd7FQh2igZwPEtv2zR6dTOGlW6m-msD_bOHnGVDhdzYplg8UImuW8vFoOyDM-r5I"/>
</div>
<div className="flex-1 flex flex-col gap-1 w-full">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">Sản Phẩm Đang Thẩm Định</span>
<span className="font-label-mono text-label-mono text-on-surface-variant font-semibold">SKU: BLN-BJ3120-RG52</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface">Gọng Kính Bolon Graceful BJ3120 Titanium</h3>
<div className="flex flex-wrap items-center gap-3 text-body-sm font-body-sm text-on-surface-variant mt-1">
<span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-mono">Màu: Rose Gold C30</span>
<span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-mono">Size: 52-18-145</span>
<span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-mono">Chất liệu: B-Titanium siêu nhẹ</span>
</div>
</div>
</div>

<div className="flex flex-col gap-3">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">fact_check</span>
                Biên Bản Thẩm Định Kỹ Thuật (Checklist BR-35 &amp; BR-37)
              </span>
<span className="font-label-md text-label-md text-primary font-semibold bg-secondary-fixed px-2.5 py-1 rounded-full">
                Kết Quả: HỢP LỆ BẢO HÀNH MIỄN PHÍ
              </span>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
<div className="flex items-center justify-between">
<span className="font-label-lg text-label-lg text-on-surface">Lỗi phản ánh từ khách hàng</span>
<span className="material-symbols-outlined text-[18px] text-primary">report_problem</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
                  Ốc bản lề càng kính trái bị lỏng khiến càng bị rơ khi đeo; hai đệm ve mũi silicon bị ngả vàng và chai cứng sau 11 tháng sử dụng.
                </p>
</div>
<div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
<div className="flex items-center justify-between">
<span className="font-label-lg text-label-lg text-on-surface">Phân loại &amp; Căn cứ chính sách</span>
<span className="material-symbols-outlined text-[18px] text-tertiary">gavel</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
                  Lỗi hao mòn cơ học tự nhiên theo thời gian + lỏng ren cơ bản. Áp dụng điều khoản BR-35: <strong className="text-on-surface">Miễn phí trọn đời phụ kiện ve ốc &amp; cân chỉnh.</strong>
</p>
</div>
</div>

<div className="p-4 rounded-xl bg-surface-container-high/40 flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline">Ghi Chú Kỹ Thuật Viên Lab Trực Tiếp</span>
<span className="font-label-mono text-label-mono text-outline">Máy kiểm tra lực xiết: 0.18 N.m</span>
</div>
<p className="font-body-md text-body-md text-on-surface italic">
                “Khung titan còn nguyên vẹn, không có vết nứt gãy do ngoại lực đè nén (loại trừ lỗi EX-WAR-03). Tiến hành tháo ốc ren cũ, tra keo chống trôi ren Loctite Optic, thay ốc titan Bolon M1.2 mới. Thay thế cặp ve mũi Air-Silicone êm ái chống ố. Cân chỉnh 4 điểm Bench Alignment.”
              </p>
</div>
</div>

<div className="flex flex-col gap-3">
<span className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">receipt_long</span>
              Hạng Mục Xử Lý &amp; Quyền Lợi Bảo Hành
            </span>
<div className="overflow-x-auto rounded-xl bg-surface-container-low">
<table className="w-full text-left font-body-md text-body-md">
<thead className="bg-surface-container text-outline font-label-md text-label-md uppercase">
<tr>
<th className="p-3 pl-4">Hạng mục kỹ thuật / Linh kiện</th>
<th className="p-3 text-center">SL</th>
<th className="p-3 text-right">Đơn giá niêm yết</th>
<th className="p-3 text-right">Trợ giá bảo hành</th>
<th className="p-3 pr-4 text-right">Khách thanh toán</th>
</tr>
</thead>
<tbody className="text-on-surface">
<tr className="hover:bg-surface-container-lowest/60 transition-colors">
<td className="p-3 pl-4 font-medium flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-primary">hardware</span>
                      Ốc titan Bolon Micro-Screw M1.2x3.4mm
                    </td>
<td className="p-3 text-center font-label-mono">01 con</td>
<td className="p-3 text-right font-label-mono text-outline line-through">35.000 đ</td>
<td className="p-3 text-right font-label-mono text-primary">-100% (BR-35)</td>
<td className="p-3 pr-4 text-right font-label-mono font-bold text-primary">0 đ</td>
</tr>
<tr className="hover:bg-surface-container-lowest/60 transition-colors">
<td className="p-3 pl-4 font-medium flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-primary">air</span>
                      Đệm ve mũi Air-Cushion Silicon cao cấp (Cặp)
                    </td>
<td className="p-3 text-center font-label-mono">01 cặp</td>
<td className="p-3 text-right font-label-mono text-outline line-through">45.000 đ</td>
<td className="p-3 text-right font-label-mono text-primary">-100% (VIP Silver)</td>
<td className="p-3 pr-4 text-right font-label-mono font-bold text-primary">0 đ</td>
</tr>
<tr className="hover:bg-surface-container-lowest/60 transition-colors">
<td className="p-3 pl-4 font-medium flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
                      Cân chỉnh góc nghiêng Pantoscopic + Vệ sinh sóng siêu âm 42kHz
                    </td>
<td className="p-3 text-center font-label-mono">01 lần</td>
<td className="p-3 text-right font-label-mono text-outline line-through">50.000 đ</td>
<td className="p-3 text-right font-label-mono text-primary">-100% (Trọn đời)</td>
<td className="p-3 pr-4 text-right font-label-mono font-bold text-primary">0 đ</td>
</tr>
</tbody>
</table>
</div>

<div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-surface-container gap-4">
<div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-primary text-[18px]">verified</span>
<span>Chính sách áp dụng: <strong className="text-on-surface">Bảo hành 12 tháng phụ kiện chính hãng + Chăm sóc trọn đời</strong></span>
</div>
<div className="flex items-baseline gap-3">
<span className="font-title-md text-title-md text-outline">TỔNG PHÍ KHÁCH TRẢ:</span>
<span className="font-display-lg text-display-lg text-primary tracking-tight font-bold">0 VND</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">

<div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between h-40">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider">Kỹ Thuật Viên Thẩm Định (QC Pass)</span>
<span className="font-label-mono text-label-mono text-primary font-semibold">STF-021</span>
</div>
<div className="flex flex-col items-center justify-center py-1">
<div className="font-headline-sm text-headline-sm text-primary italic font-serif opacity-80 select-none">
                  Trần Văn Bách
                </div>
<span className="font-label-mono text-label-mono text-outline text-body-sm">Đã ký số xác thực • 10:52:14</span>
</div>
<div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
<span>KTV Chuyên Trách: Trần Văn Bách</span>
<span className="text-primary font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">lock</span>Bảo mật SHA-256
                </span>
</div>
</div>

<div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between h-40">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider">Khách Hàng Ký Xác Nhận Nhận Lại</span>
<button className="text-secondary hover:text-primary font-label-mono text-label-md flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-[15px]">edit_square</span>Ký lại trên Tablet
                </button>
</div>
<div className="flex flex-col items-center justify-center py-1">
<div className="font-headline-sm text-headline-sm text-on-surface italic font-serif opacity-80 select-none">
                  Nguyễn Hoàng Duy
                </div>
<span className="font-label-mono text-label-mono text-outline text-body-sm">Đã đồng ý biên bản nghiệm thu</span>
</div>
<div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
<span>Khách hàng: Nguyễn Hoàng Duy</span>
<span className="text-tertiary font-medium">OTP SMS Xác nhận: 9982</span>
</div>
</div>
</div>

<div className="flex flex-wrap items-center justify-between gap-3 pt-4 bg-surface-container-low -mx-6 -mb-6 p-6">
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">send_to_mobile</span>
<span>Gửi ZNS Khách Hàng</span>
</button>
<button className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-error-container text-on-surface hover:text-on-error-container font-label-lg text-label-lg transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">cancel</span>
<span>Từ Chối (Biên bản EX)</span>
</button>
</div>
<div className="flex items-center gap-2.5">
<button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container text-secondary font-label-lg text-label-lg transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">forklift</span>
<span>Chuyển Về Lab Mài</span>
</button>
<button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg transition-all shadow-[0_4px_14px_rgba(8,98,136,0.25)]" type="button">
<span className="material-symbols-outlined text-[18px]">print</span>
<span>Hoàn Tất &amp; In Bàn Giao [F9]</span>
</button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col gap-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">help_center</span>
<span className="font-title-md text-title-md text-on-surface">Cẩm Nang Tra Cứu Quy Chuẩn Bảo Hành (BR-35 đến BR-40)</span>
</div>
<span className="font-label-mono text-label-mono text-outline">Quy định 2026</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-body-sm font-body-sm">
<div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1">
<span className="font-label-lg text-label-lg text-primary">BR-38: Đổi gọng 07 ngày</span>
<p className="text-on-surface-variant">Áp dụng cho sản phẩm nguyên vẹn, không trầy xước, đổi sang model tương đương hoặc cao hơn bù chênh lệch.</p>
</div>
<div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1">
<span className="font-label-lg text-label-lg text-secondary">BR-36: Bong váng tròng</span>
<p className="text-on-surface-variant">Bảo hành 1 đổi 1 trong 12 tháng nếu bong tróc váng AR tự nhiên, không do hóa chất/nhiệt độ cao.</p>
</div>
<div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1">
<span className="font-label-lg text-label-lg text-tertiary">EX-WAR-03: Va đập ngoại lực</span>
<p className="text-on-surface-variant">Từ chối bảo hành miễn phí nếu gãy khung do tai nạn/người dùng đè gãy; hỗ trợ thay thế giảm 30-50% giá linh kiện.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
    </div>
  );
}
