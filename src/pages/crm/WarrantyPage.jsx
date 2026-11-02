import React, { useState } from 'react';
import { message } from 'antd';

export default function WarrantyPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedWarrantyId, setSelectedWarrantyId] = useState('#WAR-2026-089');

  const warrantyList = [
    {
      id: '#WAR-2026-089',
      status: 'Đang xử lý tại quầy',
      statusColor: 'bg-secondary-fixed text-on-secondary-fixed',
      time: '10:45 Hôm nay',
      cost: '0 VNĐ',
      customer: 'Nguyễn Hoàng Duy',
      product: 'Bolon BJ3120 • Lỏng ve mũi & ốc bản lề',
      cause: 'Lỗi hao mòn cơ học (BR-35)',
      tech: 'KTV Trần Văn Bách',
      active: true
    },
    {
      id: '#WAR-2026-088',
      status: 'Lab duyệt đổi mới 100%',
      statusColor: 'bg-primary-fixed text-on-primary-fixed',
      time: '09:12 Hôm nay',
      cost: 'Đổi tròng',
      customer: 'Lê Thúy Kiều',
      product: 'Crizal Rock 1.60 • Bong váng phủ OD',
      cause: 'Bảo hành chính hãng Essilor',
      tech: 'Đơn gốc #OPT-8721 • Mua 4 tháng',
      active: false
    },
    {
      id: '#WAR-2026-085',
      status: 'Chờ khách nhận gọng',
      statusColor: 'bg-surface-container-high text-on-surface',
      time: 'Hôm qua',
      cost: 'Đổi 7 ngày (BR-38)',
      customer: 'Trần Minh Quang',
      product: 'Titanium Minimalist • Đổi size 54 sang 52',
      cause: 'Đã mài lại tròng mới',
      tech: 'Tình trạng: Nguyên tem hộp, không xước',
      active: false
    },
    {
      id: '#WAR-2026-082',
      status: 'Từ chối BH miễn phí',
      statusColor: 'bg-error-container text-on-error-container',
      time: '14/04/2026',
      cost: 'Lỗi EX-WAR-03',
      customer: 'Đỗ Quỳnh Anh',
      product: 'Gọng Ray-Ban • Gãy càng do tai nạn xe',
      cause: 'Đề xuất trợ giá 50%',
      tech: 'Va đập ngoại lực mạnh',
      active: false
    },
    {
      id: '#WAR-2026-079',
      status: 'Hoàn tất bàn giao',
      statusColor: 'bg-surface-container text-outline',
      time: '12/04/2026',
      cost: 'Đã ký nhận',
      customer: 'Phan Đức Toàn',
      product: 'Đổi màu tròng râm cận (Trà sang Khói)',
      cause: 'Bảo hành thích nghi mắt',
      tech: 'Đơn gốc #OPT-8650',
      active: false
    }
  ];

  const handleAction = (msg) => {
    message.success(msg);
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="max-w-[1600px] mx-auto p-3.5 sm:p-5 flex flex-col gap-3.5">

        {/* 1. TOP HEADER & BREADCRUMB */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-label-mono text-body-sm text-outline">
              <span>KHÁCH HÀNG CRM</span>
              <span>/</span>
              <span className="text-primary font-semibold">PHIẾU BẢO HÀNH &amp; ĐỔI TRẢ KÍNH</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Hồ Sơ Bảo Hành &amp; Thẩm Định Đổi Trả</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                Chính Sách BH v2.4 (BR-35/BR-40)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-mono text-label-mono">
                <span className="material-symbols-outlined text-[14px] text-secondary">support_agent</span>
                Hotline: 1900 6828 (Phím 2)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleAction('Đã xuất báo cáo bảo hành Excel')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-lg text-label-lg shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Xuất .xlsx</span>
            </button>
            <button
              onClick={() => handleAction('Đã mở form tiếp nhận đổi trả nhanh [F2]')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary text-on-secondary hover:bg-primary transition-colors font-label-lg text-label-lg shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">published_with_changes</span>
              <span>Tiếp Nhận Đổi Trả [F2]</span>
            </button>
            <button
              onClick={() => handleAction('Đã mở form tạo phiếu bảo hành mới [F1]')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary transition-all font-label-lg text-label-lg shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Tạo Phiếu [F1]</span>
            </button>
          </div>
        </div>

        {/* 2. 4 COMPACT KPI METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Tổng Yêu Cầu Tháng</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-primary tracking-tight">128</span>
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">phiếu</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
              <span className="text-primary font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[13px]">trending_up</span>+4.2% so T3
              </span>
              <span className="text-outline">Tỷ lệ xử lý: <strong className="text-on-surface">96.8%</strong></span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Đang Xử Lý Lab/Kho</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-secondary tracking-tight">14</span>
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">chờ xử lý</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
              <span>Đổi tròng: <strong className="text-primary">8</strong></span>
              <span>Nắn gọng: <strong className="text-secondary">4</strong></span>
              <span>Linh kiện: <strong className="text-error">2</strong></span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Đủ ĐK Đổi Mới (Pass)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-tertiary-container tracking-tight">06</span>
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">phiếu 100%</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
              <span className="font-medium text-tertiary">Chính sách 7 ngày</span>
              <span className="text-outline">Lỗi NSX BR-38</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Tỷ Lệ Bồi Hoàn / Lỗi</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-on-surface tracking-tight">0.8%</span>
                  <span className="font-label-md text-label-md text-outline font-medium">&lt; hạn mức 1.5%</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">currency_exchange</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
              <span className="text-on-surface font-semibold">01 GD VNPay</span>
              <span className="text-outline font-label-mono text-label-mono">Mã BR-39</span>
            </div>
          </div>
        </div>

        {/* 3. BALANCED SEARCH & FILTER DECK */}
        <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-wrap items-center justify-between gap-2.5">
          {/* Search */}
          <div className="relative flex-1 min-w-[260px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">search</span>
            <input
              className="w-full pl-9 pr-24 py-1.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 transition-all"
              placeholder="Tìm #WAR-..., SĐT, SKU gọng, mã đơn #OPT-..."
              type="text"
              defaultValue="#WAR-2026-089"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container text-primary font-label-mono text-label-mono">
              <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
              <span>F2 Scan</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            {[
              { id: 'all', label: 'Tất cả (128)' },
              { id: 'pending', label: 'Chờ tiếp nhận (08)' },
              { id: 'lab', label: 'Đang xử lý Lab (14)', hasDot: true },
              { id: 'done', label: 'Hoàn tất (98)' },
              { id: 'reject', label: 'Từ chối (08)', isDanger: true }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-label-md text-label-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                } ${tab.isDanger && activeTab !== tab.id ? 'text-error' : ''}`}
              >
                {tab.hasDot && <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Select dropdowns */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <select className="appearance-none pl-3 pr-7 py-1.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer">
              <option>Tất cả loại bảo hành</option>
              <option>Váng phủ tròng (Crizal/Zeiss)</option>
              <option>Gọng gãy mối hàn / Ve mũi</option>
              <option>Đổi trả kích cỡ (7 ngày)</option>
              <option>Vệ sinh nắn chỉnh miễn phí</option>
            </select>
            <select className="appearance-none pl-3 pr-7 py-1.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer">
              <option>Flagship Q.1 (HCM)</option>
              <option>CN Tràng Tiền (HN)</option>
              <option>CN Thảo Điền (Q.2)</option>
            </select>
          </div>
        </div>

        {/* 4. TWO-COLUMN SPLIT: REQUEST LIST VS DETAIL PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">

          {/* Left Column (5/12): List of requests */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <span className="font-title-md text-title-md text-on-surface font-semibold">Danh Sách Yêu Cầu</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-mono text-label-mono">5 phiếu mới</span>
              </div>
              <span className="font-body-sm text-body-sm text-outline">Sắp xếp: Mới nhất</span>
            </div>

            <div className="flex flex-col gap-2">
              {warrantyList.map((item) => {
                const isSelected = selectedWarrantyId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedWarrantyId(item.id)}
                    className={`p-3 rounded-xl transition-all cursor-pointer relative border ${
                      isSelected
                        ? 'bg-surface-container-lowest border-primary/30 shadow-sm ring-1 ring-primary/20'
                        : 'bg-surface-container-lowest border-[#d8e3fb]/40 hover:border-primary/20 hover:shadow-xs'
                    }`}
                  >
                    {isSelected && <div className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-primary rounded-r"></div>}
                    <div className="flex items-start justify-between gap-2 pl-1.5">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-label-mono text-label-mono text-outline font-semibold">{item.id}</span>
                          <span className={`px-2 py-0.5 rounded-full font-label-md text-label-md ${item.statusColor}`}>
                            {item.status}
                          </span>
                        </div>
                        <h3 className="font-title-md text-title-md text-on-surface font-semibold mt-1">{item.customer}</h3>
                        <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[13px] text-outline">tune</span>
                          <span className="truncate">{item.product}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-label-mono text-label-mono text-outline block">{item.time}</span>
                        <span className="inline-block mt-0.5 font-label-mono text-label-md font-bold text-primary">{item.cost}</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-[#e7eeff] flex items-center justify-between text-body-sm font-body-sm pl-1.5">
                      <span className="text-on-surface-variant truncate">{item.cause}</span>
                      <span className="text-outline text-right truncate text-[11px]">{item.tech}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-2.5 bg-surface-container-lowest rounded-xl border border-[#d8e3fb]/40 text-body-sm font-body-sm text-outline">
              <span>Hiển thị 1 - 5 trong 128 phiếu</span>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 rounded bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                </button>
                <span className="px-2 font-label-mono text-on-surface">Trang 1 / 26</span>
                <button className="w-6 h-6 rounded bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (7/12): Active Warranty Detail */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-[#d8e3fb]/40 p-4 flex flex-col gap-3.5 relative overflow-hidden">

              {/* Detail Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 bg-surface-container-low -mx-4 -mt-4 p-3.5 gap-2.5 rounded-t-xl border-b border-[#e7eeff]">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg bg-primary-container text-on-primary font-label-mono text-label-mono font-bold tracking-wider">
                      PHIẾU #WAR-2026-089
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold">
                      Thay Linh Kiện Miễn Phí Tại Quầy
                    </span>
                    <span className="text-body-sm font-body-sm text-outline">10:45 Hôm nay</span>
                  </div>
                  <div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                    <span>HĐ gốc:</span>
                    <a className="font-label-mono text-primary font-semibold hover:underline flex items-center gap-0.5" href="#">
                      #OPT-8842-SG
                      <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                    </a>
                    <span className="text-outline">|</span>
                    <span>Ngày mua: 15/04/2025</span>
                    <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-primary font-semibold text-[11px]">
                      Còn 45 ngày BH
                    </span>
                  </div>
                </div>

                {/* Customer Pill */}
                <div className="flex items-center gap-2 bg-surface-container-lowest p-2 rounded-xl shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">
                    HD
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-title-md text-title-md text-on-surface font-semibold">Nguyễn Hoàng Duy</span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-secondary font-label-mono text-[10px] font-bold">VIP SILVER</span>
                    </div>
                    <div className="font-label-mono text-[11px] text-outline">0918 732 998 • Lịch sử: 4 đơn</div>
                  </div>
                </div>
              </div>

              {/* Product Assessment Card */}
              <div className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl bg-surface-container-low">
                <div className="w-24 h-18 rounded-lg bg-surface-container-lowest flex items-center justify-center p-1.5 shadow-xs shrink-0 overflow-hidden">
                  <img
                    className="w-full h-full object-contain"
                    alt="Gọng Bolon Titanium"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOQKMeHyvIU_DWxQ45kp2cCE8ROFVVkRgLasoNMqfORdrfhm-g0brFNx0mMKkY8uANmbncIl8y9sKbHVCIiqHT1xgTBRcbnjYOGQakgft6wTog1m6DC6J7PkIlDvxgZyK31EnXTlBrGcMjj0NmM5hdZlIFwVLYMZ2-moJNdcgJd7FQh2igZwPEtv2zR6dTOGlW6m-msD_bOHnGVDhdzYplg8UImuW8vFoOyDM-r5I"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-0.5 w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline">Sản Phẩm Đang Thẩm Định</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant font-semibold">SKU: BLN-BJ3120-RG52</span>
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface font-semibold">Gọng Kính Bolon Graceful BJ3120 Titanium</h3>
                  <div className="flex flex-wrap items-center gap-2 text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                    <span className="px-1.5 py-0.2 rounded bg-surface-container-lowest text-on-surface font-label-mono">Màu: Rose Gold C30</span>
                    <span className="px-1.5 py-0.2 rounded bg-surface-container-lowest text-on-surface font-label-mono">Size: 52-18-145</span>
                    <span className="px-1.5 py-0.2 rounded bg-surface-container-lowest text-on-surface font-label-mono">B-Titanium siêu nhẹ</span>
                  </div>
                </div>
              </div>

              {/* Technical Assessment Checklist */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-title-md text-on-surface flex items-center gap-1.5 font-semibold">
                    <span className="material-symbols-outlined text-primary text-[18px]">fact_check</span>
                    Biên Bản Thẩm Định Kỹ Thuật (BR-35 &amp; BR-37)
                  </span>
                  <span className="font-label-md text-label-md text-primary font-semibold bg-secondary-fixed px-2 py-0.5 rounded-full">
                    HỢP LỆ BẢO HÀNH MIỄN PHÍ
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">Lỗi phản ánh</span>
                      <span className="material-symbols-outlined text-[16px] text-primary">report_problem</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-snug">
                      Ốc bản lề càng kính trái bị lỏng khiến càng bị rơ; hai đệm ve mũi silicon bị ngả vàng sau 11 tháng sử dụng.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">Căn cứ chính sách</span>
                      <span className="material-symbols-outlined text-[16px] text-tertiary">gavel</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-snug">
                      Hao mòn cơ học tự nhiên. Áp dụng điều khoản BR-35: <strong className="text-on-surface">Miễn phí trọn đời phụ kiện ve ốc &amp; cân chỉnh.</strong>
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-surface-container-high/40 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">Ghi Chú KTV Lab Trực Tiếp</span>
                    <span className="font-label-mono text-label-mono text-outline">Lực xiết: 0.18 N.m</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface italic leading-snug">
                    “Khung titan còn nguyên vẹn, không có vết nứt gãy. Tiến hành tháo ốc ren cũ, tra keo chống trôi ren Loctite Optic, thay ốc titan Bolon M1.2 mới. Thay thế cặp ve mũi Air-Silicone. Cân chỉnh 4 điểm Bench Alignment.”
                  </p>
                </div>
              </div>

              {/* Items Handled Table */}
              <div className="flex flex-col gap-2">
                <span className="font-title-md text-title-md text-on-surface flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-secondary text-[18px]">receipt_long</span>
                  Hạng Mục Kỹ Thuật &amp; Quyền Lợi
                </span>
                <div className="overflow-x-auto rounded-xl bg-surface-container-low border border-[#d8e3fb]/40">
                  <table className="w-full text-left font-body-md text-body-md">
                    <thead className="bg-surface-container text-outline font-label-md text-label-md uppercase">
                      <tr>
                        <th className="p-2.5 pl-3">Hạng mục / Linh kiện</th>
                        <th className="p-2.5 text-center">SL</th>
                        <th className="p-2.5 text-right">Đơn giá</th>
                        <th className="p-2.5 text-right">Trợ giá</th>
                        <th className="p-2.5 pr-3 text-right">Khách trả</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d8e3fb]/30 text-on-surface">
                      <tr>
                        <td className="p-2.5 pl-3 font-medium flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-primary">hardware</span>
                          Ốc titan Bolon M1.2x3.4mm
                        </td>
                        <td className="p-2.5 text-center font-label-mono">01 con</td>
                        <td className="p-2.5 text-right font-label-mono text-outline line-through">35.000 đ</td>
                        <td className="p-2.5 text-right font-label-mono text-primary">-100% (BR-35)</td>
                        <td className="p-2.5 pr-3 text-right font-label-mono font-bold text-primary">0 đ</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 pl-3 font-medium flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-primary">air</span>
                          Đệm ve mũi Air-Cushion Silicon
                        </td>
                        <td className="p-2.5 text-center font-label-mono">01 cặp</td>
                        <td className="p-2.5 text-right font-label-mono text-outline line-through">45.000 đ</td>
                        <td className="p-2.5 text-right font-label-mono text-primary">-100% (VIP Silver)</td>
                        <td className="p-2.5 pr-3 text-right font-label-mono font-bold text-primary">0 đ</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 pl-3 font-medium flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-secondary">tune</span>
                          Cân chỉnh Pantoscopic + Vệ sinh sóng siêu âm
                        </td>
                        <td className="p-2.5 text-center font-label-mono">01 lần</td>
                        <td className="p-2.5 text-right font-label-mono text-outline line-through">50.000 đ</td>
                        <td className="p-2.5 text-right font-label-mono text-primary">-100% (Trọn đời)</td>
                        <td className="p-2.5 pr-3 text-right font-label-mono font-bold text-primary">0 đ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between p-2.5 rounded-xl bg-surface-container gap-2">
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                    <span>Áp dụng: <strong className="text-on-surface">Bảo hành 12 tháng phụ kiện chính hãng + Chăm sóc trọn đời</strong></span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-title-md text-title-md text-outline">TỔNG KHÁCH TRẢ:</span>
                    <span className="font-display-lg text-display-lg text-primary tracking-tight font-bold">0 VND</span>
                  </div>
                </div>
              </div>

              {/* Signatures & Approvals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-outline uppercase tracking-wider">KTV Thẩm Định (QC Pass)</span>
                    <span className="font-label-mono text-label-mono text-primary font-semibold">STF-021</span>
                  </div>
                  <div className="py-2 text-center">
                    <div className="font-headline-sm text-headline-sm text-primary italic font-serif opacity-80 select-none">
                      Trần Văn Bách
                    </div>
                    <span className="font-label-mono text-[11px] text-outline">Đã ký số xác thực • 10:52:14</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
                    <span>KTV: Trần Văn Bách</span>
                    <span className="text-primary font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">lock</span>Bảo mật SHA-256
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Khách Ký Nhận Lại</span>
                    <button onClick={() => handleAction('Đã gửi yêu cầu ký lại lên tablet')} className="text-secondary hover:text-primary font-label-mono text-label-md flex items-center gap-1 cursor-pointer" type="button">
                      <span className="material-symbols-outlined text-[14px]">edit_square</span>Ký lại Tablet
                    </button>
                  </div>
                  <div className="py-2 text-center">
                    <div className="font-headline-sm text-headline-sm text-on-surface italic font-serif opacity-80 select-none">
                      Nguyễn Hoàng Duy
                    </div>
                    <span className="font-label-mono text-[11px] text-outline">Đã nghiệm thu hài lòng</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
                    <span>Khách: Nguyễn Hoàng Duy</span>
                    <span className="text-tertiary font-medium">OTP SMS: 9982</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 bg-surface-container-low -mx-4 -mb-4 p-3.5 rounded-b-xl border-t border-[#e7eeff]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction('Đã gửi thông báo ZNS tới SĐT khách hàng')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">send_to_mobile</span>
                    <span>Gửi ZNS</span>
                  </button>
                  <button
                    onClick={() => handleAction('Mở biên bản từ chối bảo hành (EX-WAR)')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-error-container text-on-surface hover:text-on-error-container font-label-lg text-label-lg transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    <span>Từ Chối (Biên bản EX)</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction('Đã lập phiếu điều chuyển gọng về Lab mài lắp')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container text-secondary font-label-lg text-label-lg transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">forklift</span>
                    <span>Chuyển Về Lab</span>
                  </button>
                  <button
                    onClick={() => handleAction('Đã hoàn tất phiếu và in biên bản bàn giao [F9]')}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg transition-all shadow-xs cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span>Hoàn Tất &amp; In [F9]</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Policy Reference Cards */}
            <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">help_center</span>
                  <span className="font-title-md text-title-md text-on-surface font-semibold">Cẩm Nang Tra Cứu Quy Chuẩn Bảo Hành (BR-35 đến BR-40)</span>
                </div>
                <span className="font-label-mono text-label-mono text-outline">Quy định 2026</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-body-sm font-body-sm">
                <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-0.5">
                  <span className="font-label-lg text-label-lg text-primary font-semibold">BR-38: Đổi gọng 07 ngày</span>
                  <p className="text-on-surface-variant leading-snug">Áp dụng cho sản phẩm nguyên vẹn, không trầy xước, đổi sang model tương đương hoặc cao hơn bù chênh lệch.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-0.5">
                  <span className="font-label-lg text-label-lg text-secondary font-semibold">BR-36: Bong váng tròng</span>
                  <p className="text-on-surface-variant leading-snug">Bảo hành 1 đổi 1 trong 12 tháng nếu bong tróc váng AR tự nhiên, không do hóa chất hay nhiệt độ cao.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-0.5">
                  <span className="font-label-lg text-label-lg text-tertiary font-semibold">EX-WAR-03: Va đập ngoại lực</span>
                  <p className="text-on-surface-variant leading-snug">Từ chối bảo hành miễn phí nếu gãy khung do ngoại lực mạnh; hỗ trợ thay thế giảm 30-50% giá linh kiện.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
