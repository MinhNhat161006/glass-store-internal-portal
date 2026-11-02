import React, { useState } from 'react';
import { message } from 'antd';

export default function CrmPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full">

<div className="p-space-lg flex flex-col xl:flex-row xl:items-center justify-between gap-space-md bg-surface-container-lowest shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
<div className="flex flex-col gap-1.5">
<nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-md text-label-md text-outline">
<span className="hover:text-primary transition-colors cursor-pointer">KHÁCH HÀNG CRM</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="hover:text-primary transition-colors cursor-pointer">HỒ SƠ KHÁCH HÀNG 360°</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary font-semibold">Chi Tiết Hồ Sơ &amp; Lịch Sử Thị Lực</span>
</nav>
<div className="flex flex-wrap items-center gap-2">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px] text-primary">security</span>
          BR-45: Audit Log On
        </span>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px]">verified_user</span>
          Bảo Mật Dữ Liệu Y Khoa NFR-SEC-04 (HL7/HIPAA Compliant)
        </span>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-mono text-label-mono">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          Terminal Q1-POS3: Ready
        </span>
</div>
</div>

<div className="flex flex-wrap items-center gap-2">
<button className="px-3.5 py-2 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-1.5 shadow-[0_4px_14px_rgba(8,98,136,0.18)] hover:bg-primary-container transition-all">
<span className="material-symbols-outlined text-[18px]">person_add</span>
<span>Tạo Khách Mới</span>
<span className="px-1.5 py-0.2 rounded bg-on-primary/20 text-on-primary font-label-mono text-[10px]">F1</span>
</button>
<button className="px-3.5 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-lg text-label-lg flex items-center gap-1.5 transition-all">
<span className="material-symbols-outlined text-[18px] text-primary">event</span>
<span>Đặt Lịch Đo</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container-highest font-label-mono text-[10px]">F2</span>
</button>
<button className="px-3.5 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-lg text-label-lg flex items-center gap-1.5 transition-all">
<span className="material-symbols-outlined text-[18px] text-primary">point_of_sale</span>
<span>Tạo Đơn Bán</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container-highest font-label-mono text-[10px]">F3</span>
</button>
<button className="px-3.5 py-2 rounded-xl bg-surface-container-low text-primary hover:bg-secondary-fixed transition-all font-label-lg text-label-lg flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">mark_chat_read</span>
<span>Zalo ZNS / SMS</span>
</button>
<button className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-all" title="Xuất Hồ Sơ PDF/A5 Y Tế">
<span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
</button>
</div>
</div>

<div className="px-space-lg pt-space-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="space-y-0.5">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Tổng Khách Hàng Hệ Thống</span>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-primary tracking-tight">42,850</span>
<span className="font-label-md text-label-md text-primary font-semibold">+18.4% YoY</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">group</span>
</div>
</div>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low p-2 rounded-lg">
<span>Flagship Q.1: <strong className="text-on-surface font-semibold">18,240</strong></span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span>Active 30 ngày: <strong className="text-primary font-semibold">3,120</strong></span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="space-y-0.5">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Phân Hạng Hội Viên VIP</span>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">85% VIP</span>
<span className="font-label-md text-label-md text-secondary">4 Tier Level</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">workspace_premium</span>
</div>
</div>

<div className="mt-2 space-y-1.5">
<div className="w-full h-2 rounded-full bg-surface-container flex overflow-hidden">
<div className="h-full bg-primary" style={{ width: '45%' }} title="Silver: 45%"></div>
<div className="h-full bg-secondary" style={{ width: '28%' }} title="Gold: 28%"></div>
<div className="h-full bg-secondary-fixed-dim" style={{ width: '12%' }} title="Platinum: 12%"></div>
<div className="h-full bg-surface-dim" style={{ width: '15%' }} title="Standard: 15%"></div>
</div>
<div className="flex items-center justify-between font-label-mono text-[11px] text-outline">
<span>Silver 45%</span>
<span>Gold 28%</span>
<span>Plat 12%</span>
<span className="text-primary font-semibold">1.42M pts</span>
</div>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="space-y-0.5">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Cảnh Báo Tái Khám (6 Tháng)</span>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-error tracking-tight">142</span>
<span className="font-label-md text-label-md text-error font-medium">Khách đến hạn</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">notification_important</span>
</div>
</div>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-body-sm text-body-sm bg-surface-container-low p-2 rounded-lg">
<span className="text-on-surface-variant truncate">Cần kích hoạt ZNS khám khúc xạ định kỳ</span>
<button className="px-2 py-0.5 bg-primary text-on-primary rounded text-[11px] font-semibold hover:bg-primary-container shrink-0">Gửi hàng loạt</button>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="space-y-0.5">
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Chất Lượng Đo Khám (CSAT / NPS)</span>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-primary tracking-tight">98.4%</span>
<span className="font-label-md text-label-md text-primary font-bold">NPS +78</span>
</div>
</div>
<div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">sentiment_very_satisfied</span>
</div>
</div>
<div className="mt-space-sm pt-space-xs flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low p-2 rounded-lg">
<span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
<span className="truncate">Đạt chuẩn ISO Y Tế Đo Mắt &amp; Tiêu Chuẩn Mài Lắp QC</span>
</div>
</div>
</div>

<div className="p-space-lg grid grid-cols-12 gap-space-lg">

<div className="col-span-12 xl:col-span-4 flex flex-col gap-space-md">

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
<div className="relative">
<span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
<input className="w-full pl-10 pr-24 py-2.5 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-xl focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Tìm tên, SĐT, CCCD, mã thẻ khách..." type="text" value="Nguyễn Hoàng Duy"/>
<button className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-surface-container text-primary hover:bg-secondary-fixed text-[11px] font-label-mono rounded-lg flex items-center gap-1 transition-all" title="Quét mã QR thẻ thành viên qua camera">
<span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
            QR Scan
          </button>
</div>

<div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-label-md font-label-md">
<button className="px-2.5 py-1 rounded-full bg-primary text-on-primary shrink-0 transition-colors">Tất cả (42.8k)</button>
<button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high shrink-0 transition-colors">VIP Gold/Plat</button>
<button className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container hover:opacity-90 shrink-0 flex items-center gap-1 transition-colors">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            Tái khám (142)
          </button>
<button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high shrink-0 transition-colors">Mới đăng ký</button>
<button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high shrink-0 transition-colors">Bảo hành</button>
</div>
</div>

<div className="flex flex-col gap-space-sm max-h-[820px] overflow-y-auto pr-1">

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer relative bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest to-surface-container-low">
<div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary rounded-l-xl"></div>
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<div className="relative">
<img className="w-12 h-12 rounded-xl object-cover shadow-sm" data-alt="Headshot portrait of a 32-year-old Vietnamese male software engineer wearing sleek modern titanium optical eyeglasses, smiling professionally under bright clean studio lighting with clinical optical boutique ambiance" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN6A5Zry9WqS2KKpur9_SXR7FEsNxIv5u70kYDDHcPfSzRI8xZ3BNDMJqGm8H5O-ApKUVZclmL5YPyteetztlhOBmVmDpeCX85t2ltbbOcuntTv1zyjpPMlt3CutGb7_GLwegBHqUFA4EmVKsu-7LadvgLmnk1yp1uM93_PMI56natfovynZGSkxCp9DfQ6JYBBVYfyT2vEqeXSAwoijbAi3SWiRvlEhe0nFGIdTM"/>
<span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] flex items-center justify-center font-bold">✓</span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface font-semibold">Nguyễn Hoàng Duy</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-md text-[11px] font-semibold">VIP 3 Silver</span>
</div>
<div className="font-label-mono text-label-mono text-primary text-[12px]">#OPT-CUS-9842 • 32 tuổi • Nam</div>
</div>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container font-label-mono text-[11px] text-on-surface-variant">450 pts</span>
</div>
<div className="mt-3 grid grid-cols-2 gap-2 text-[12px] bg-surface-container-low p-2 rounded-lg font-body-sm">
<div className="flex flex-col">
<span className="text-outline text-[11px]">Độ cận đo gần nhất:</span>
<span className="font-label-mono text-primary font-semibold">OD: -3.25 | OS: -2.75</span>
</div>
<div className="flex flex-col">
<span className="text-outline text-[11px]">Đơn hàng gần nhất:</span>
<span className="font-body-sm text-on-surface font-medium truncate">Hôm nay 10:15 (Kính Râm)</span>
</div>
</div>
<div className="mt-2.5 flex items-center justify-between font-label-mono text-[11px] text-outline">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-primary">phone</span>
              0918 732 998
            </span>
<span className="text-primary font-semibold flex items-center gap-0.5">
              Đang xem hồ sơ
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-xl object-cover shadow-sm" data-alt="Headshot of a stylish 28-year-old Vietnamese woman wearing designer transparent acetate cat-eye glasses, high-end optical store environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7p9c_umMS8JlFzUMDtlfI55LOFh-EgPAVx_fowj68SVdXXGW8oL_cR8h0XnIMj-8xk2bbPQrYRlpD7xeXd1xeKibNIh0ZeBpcnuMdE-TzQG_FSr9J0xFqKqfSj2kOYqdY-FfxLVMgjSheXidJJcc_Yv6WhRxXEv5AEns5AiDkeYja6QKP2qJIXBI406Wc4M_XP-qb8cdAEUXf0345vEYfPRYooS3xQJmB34xtMu8"/>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface font-semibold">Lê Thúy Kiều</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[11px] font-semibold">VIP Gold</span>
</div>
<div className="font-label-mono text-label-mono text-outline text-[12px]">#OPT-CUS-7714 • 28 tuổi • Nữ</div>
</div>
</div>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-mono text-[11px] font-semibold">Tái khám: 15 ngày</span>
</div>
<div className="mt-2.5 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
<span>SĐT: <strong className="font-label-mono text-on-surface">0903 881 229</strong></span>
<span>Tích lũy: <strong className="text-primary font-label-mono">1,200 pts</strong></span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-xl object-cover shadow-sm" data-alt="Portrait of a 41-year-old Asian businessman in suit wearing progressive multifocal rimless eyeglasses in a clean modern clinic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1A6W3DcNV1YNQnxh4m5zHa-hd_zfP2voqBo4eeuIfzQp6F5sJSr8ecncr8HBMDeH7q7oITPTqQYGFZo2pVcgPEsxvCS1nBz0PX_RFkOmAAhjAdMmgllgyyqHZgHqJeSPwu9fVbIIL_33Smz2TSXt0WOc3MAwKu2XrfW9RVXNx1dExeGdqswNSnYU-zdb-5tHWdZZ5bHL3jGPJ1-S0vMEyKGBEluo1XyNk3N5b_4Q"/>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface font-semibold">Trịnh Minh Quang</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-md text-[11px]">Thành Viên</span>
</div>
<div className="font-label-mono text-label-mono text-outline text-[12px]">#OPT-CUS-5120 • 41 tuổi • Nam</div>
</div>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-md text-[11px]">Đa tròng (ADD)</span>
</div>
<div className="mt-2.5 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
<span>SĐT: <strong className="font-label-mono text-on-surface">0988 123 456</strong></span>
<span>Đơn trước: <span className="text-outline">12 ngày trước</span></span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all cursor-pointer">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-xl object-cover shadow-sm" data-alt="Portrait of an elegant 35-year-old female optical boutique customer wearing ultra-lightweight titanium eyewear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxZLxAp7hHJVQ4ycIvGLm-4LR4V3mFbhpd_5UIBgAGKMCZtKQRboA_CyV2j1c496O1v8-KERE-FpD-itrk4t73SLl4xhOssktjAKRma_vW_nQeDRKhfRuG2HQj1iinAmTSqviG-njb4tKyxvA4Kg6Dv46XQHa9rDekAh4H2Th_wVN_-XaxxqfETn8_KPhV0BxznGAksDH6umbXETYoTs35-fEW4itci4Snry30aQ4"/>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface font-semibold">Phạm Thị Bích Ngọc</span>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-[11px] font-semibold">Platinum</span>
</div>
<div className="font-label-mono text-label-mono text-outline text-[12px]">#OPT-CUS-4409 • 35 tuổi • Nữ</div>
</div>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container font-label-mono text-[11px] text-on-surface font-semibold">3,850 pts</span>
</div>
<div className="mt-2.5 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
<span>SĐT: <strong className="font-label-mono text-on-surface">0912 667 890</strong></span>
<span className="text-secondary font-medium">Gọng Charmant Titan</span>
</div>
</div>
</div>
</div>

<div className="col-span-12 xl:col-span-8 flex flex-col gap-space-lg">

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md relative overflow-hidden">
<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<img className="w-20 h-20 rounded-2xl object-cover shadow-md shrink-0" data-alt="Close up realistic portrait photo of customer Nguyen Hoang Duy, Vietnamese male in his thirties wearing designer dark blue titanium frames, clean bright optical boutique background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMKUT9ckCNBBi5zNG8zpOQnGpPufY9Pj-gxlxzqWGdC-b3y1iGzRPq1hOQfPbdK3JhEREtrxveX5XrZpUS0xOdUTK756IGZFQl7Ry_aRLCjF1w86DJkOK1JcuJV5vB8S4EtWLZe2gpDOgWZzt2fvwfloEJb_hkiY4g9Re3myuudINn-lIhhZfiP5DPTH_9TNnORE_T2DVsT4a0hddnGIG1XYPH8PX0m3WJPwCujjE"/>
<div className="space-y-1">
<div className="flex flex-wrap items-center gap-2.5">
<span className="font-headline-md text-headline-md text-on-surface">Nguyễn Hoàng Duy</span>
<span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold">VIP 3 Silver Member</span>
<span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-mono text-[12px]">Mã: #OPT-CUS-9842</span>
</div>
<div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-outline">call</span>
                  0918 732 998
                </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-outline">mail</span>
                  duy.nguyen@example.com
                </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-outline">calendar_month</span>
                  Thành viên từ: 14/03/2022 (4 năm gắn bó)
                </span>
</div>
<div className="flex items-center gap-1 font-body-sm text-body-sm text-outline">
<span className="material-symbols-outlined text-[16px]">location_on</span>
                120 Hai Bà Trưng, P. Đa Kao, Q.1, TP. Hồ Chí Minh
              </div>
</div>
</div>

<div className="flex lg:flex-col items-end gap-2 shrink-0">
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 bg-surface-container text-primary hover:bg-secondary-fixed rounded-xl font-label-md text-label-md flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[16px]">edit</span>
                Sửa Thông Tin
              </button>
<button className="p-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface-variant rounded-xl transition-colors" title="Thêm ghi chú khách hàng">
<span className="material-symbols-outlined text-[18px]">bookmark_add</span>
</button>
</div>
<span className="font-label-mono text-[11px] text-outline">Cập nhật bởi: BS. Vũ Anh Tuấn (10:15)</span>
</div>
</div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-space-sm border-none bg-surface-container-low p-space-md rounded-xl">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-outline">Tổng Chi Tiêu (LTV)</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">18,650,000 đ</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">5 đơn hoàn tất</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-outline">Điểm Thưởng Tích Lũy</span>
<div className="flex items-baseline gap-1">
<span className="font-headline-sm text-headline-sm text-secondary font-bold">450</span>
<span className="font-label-mono text-label-mono text-outline">OptiPoints</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">~ 45,000đ khấu trừ POS</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-outline">Lịch Sử Đo Khám</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">4 Lần Đo</span>
<span className="font-body-sm text-body-sm text-primary font-semibold">Tái khám: Định kỳ 6T</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-outline">Chỉ Số Bảo Hành</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">0 Lỗi / 0 Khiếu nại</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Độ hài lòng: 100%</span>
</div>
</div>
</div>

<div className="flex flex-col gap-space-md">

<div className="flex items-center gap-1 bg-surface-container-low p-1.5 rounded-xl">
<button className="flex-1 py-2 px-4 rounded-lg bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-sm font-semibold flex items-center justify-center gap-2 transition-all">
<span className="material-symbols-outlined text-[18px]">biotech</span>
            Hồ Sơ Thị Lực &amp; Biểu Đồ OD/OS (FR-CUS-05)
          </button>
<button className="flex-1 py-2 px-4 rounded-lg text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-2 transition-all">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
            Lịch Sử Mua Hàng &amp; Đơn Kính (5)
          </button>
<button className="flex-1 py-2 px-4 rounded-lg text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-2 transition-all">
<span className="material-symbols-outlined text-[18px]">verified</span>
            Bảo Hành &amp; Đổi Trả (2)
          </button>
<button className="flex-1 py-2 px-4 rounded-lg text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-2 transition-all">
<span className="material-symbols-outlined text-[18px]">support_agent</span>
            Nhật Ký Chăm Sóc CRM &amp; Hẹn
          </button>
</div>

<div className="flex flex-col gap-space-lg">

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div>
<span className="font-title-md text-title-md text-on-surface font-semibold block">Tiến Triển Độ Cận &amp; Loạn Thị Qua Các Năm (Diopter Progression Curve)</span>
<span className="font-body-sm text-body-sm text-outline">Dữ liệu khúc xạ mắt phải OD &amp; mắt trái OS (2023 - 2026) tuân thủ chuẩn ISO 13666</span>
</div>
<div className="flex items-center gap-4 font-label-md text-label-md">
<span className="flex items-center gap-1.5 text-primary">
<span className="w-3 h-3 rounded-full bg-primary"></span>
                  Mắt Phải (OD)
                </span>
<span className="flex items-center gap-1.5 text-secondary">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
                  Mắt Trái (OS)
                </span>
</div>
</div>

<div className="w-full bg-surface-container-low p-space-md rounded-xl">
<svg className="w-full h-44 overflow-visible" viewbox="0 0 760 180">

<line className="text-surface-variant" stroke="currentColor" stroke-dasharray="4" x1="50" x2="730" y1="20" y2="20"></line>
<text className="fill-current text-outline font-label-mono text-[10px]" text-anchor="end" x="35" y="24">-2.00D</text>
<line className="text-surface-variant" stroke="currentColor" stroke-dasharray="4" x1="50" x2="730" y1="65" y2="65"></line>
<text className="fill-current text-outline font-label-mono text-[10px]" text-anchor="end" x="35" y="69">-2.50D</text>
<line className="text-surface-variant" stroke="currentColor" stroke-dasharray="4" x1="50" x2="730" y1="110" y2="110"></line>
<text className="fill-current text-outline font-label-mono text-[10px]" text-anchor="end" x="35" y="114">-3.00D</text>
<line className="text-surface-variant" stroke="currentColor" stroke-dasharray="4" x1="50" x2="730" y1="155" y2="155"></line>
<text className="fill-current text-outline font-label-mono text-[10px]" text-anchor="end" x="35" y="159">-3.50D</text>

<text className="fill-current text-outline font-label-mono text-[11px]" text-anchor="middle" x="120" y="175">14/03/2023</text>
<text className="fill-current text-outline font-label-mono text-[11px]" text-anchor="middle" x="310" y="175">20/10/2024</text>
<text className="fill-current text-outline font-label-mono text-[11px]" text-anchor="middle" x="500" y="175">15/04/2025</text>
<text className="fill-current text-primary font-label-mono font-semibold text-[11px]" text-anchor="middle" x="680" y="175">Hôm Nay (04/2026)</text>

<defs>
<lineargradient id="odGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#004967" stopOpacity="0.2"></stop>
<stop offset="100%" stopColor="#004967" stopOpacity="0"></stop>
</lineargradient>
</defs>



<path d="M 120 42.5 L 310 65 L 500 65 L 680 87.5" fill="none" stroke="#19648f" stroke-dasharray="5 3" strokeWidth="3"></path>


<path d="M 120 65 L 310 87.5 L 500 110 L 680 132.5" fill="none" stroke="#004967" strokeWidth="3.5"></path>

<circle className="cursor-pointer" cx="120" cy="65" fill="#004967" r="5"></circle>
<text className="fill-current text-primary font-label-mono text-[10px]" text-anchor="middle" x="120" y="55">-2.50</text>
<circle className="cursor-pointer" cx="310" cy="87.5" fill="#004967" r="5"></circle>
<text className="fill-current text-primary font-label-mono text-[10px]" text-anchor="middle" x="310" y="78">-2.75</text>
<circle className="cursor-pointer" cx="500" cy="110" fill="#004967" r="5"></circle>
<text className="fill-current text-primary font-label-mono text-[10px]" text-anchor="middle" x="500" y="100">-3.00</text>
<circle className="cursor-pointer ring-4 ring-primary-fixed" cx="680" cy="132.5" fill="#004967" r="6"></circle>
<text className="fill-current text-primary font-label-mono font-bold text-[11px]" text-anchor="middle" x="680" y="122">-3.25D</text>

<circle cx="120" cy="42.5" fill="#19648f" r="4.5"></circle>
<circle cx="310" cy="65" fill="#19648f" r="4.5"></circle>
<circle cx="500" cy="65" fill="#19648f" r="4.5"></circle>
<circle cx="680" cy="87.5" fill="#19648f" r="5.5"></circle>
<text className="fill-current text-secondary font-label-mono font-bold text-[11px]" text-anchor="middle" x="680" y="76">-2.75D</text>
</svg>
</div>

<div className="p-3 bg-surface-container rounded-xl flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[24px]">clinical_notes</span>
<div className="font-body-md text-body-md text-on-surface">
<strong className="text-primary font-semibold">Đánh giá chuyên môn Bác sĩ Khúc Xạ:</strong>
                Tốc độ tiến triển khúc xạ ổn định. Mắt phải tăng nhẹ -0.25D sau 12 tháng do tính chất công việc phần mềm nhìn cự ly gần kéo dài. Trục loạn thị không biến thiên (OD 180°, OS 175°). Tiếp tục duy trì kiểm tra đáy mắt định kỳ 6 tháng.
              </div>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="space-y-0.5">
<span className="font-title-md text-title-md text-on-surface font-semibold block">Lịch Sử Khám Khúc Xạ &amp; Toa Kính Cắt Sẵn</span>
<span className="font-body-sm text-body-sm text-outline">Bảo toàn vĩnh viễn theo Điều khoản Bảo Mật Y Khoa NFR-SEC-04</span>
</div>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 bg-primary text-on-primary rounded-xl text-label-md font-label-md flex items-center gap-1.5 shadow-sm hover:bg-primary-container transition-all">
<span className="material-symbols-outlined text-[16px]">visibility</span>
                  Xem Toa #RX-2026-889
                </button>
<button className="px-3 py-1.5 bg-surface-container text-on-surface rounded-xl text-label-md font-label-md flex items-center gap-1 hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-[16px]">print</span>
                  In Sổ Khám (A5)
                </button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left font-body-md text-body-md">
<thead>
<tr className="bg-surface-container-low text-outline font-label-md text-label-md uppercase tracking-wider">
<th className="py-3 px-4 rounded-l-lg">Lần Khám &amp; Toa Kính</th>
<th className="py-3 px-3">Bác sĩ / KTV</th>
<th className="py-3 px-3">Mắt Phải (OD)</th>
<th className="py-3 px-3">Mắt Trái (OS)</th>
<th className="py-3 px-2">PD / VA</th>
<th className="py-3 px-3">Tròng Kính Kê Đơn</th>
<th className="py-3 px-4 rounded-r-lg text-right">Thao Tác</th>
</tr>
</thead>
<tbody className="divide-y-0">

<tr className="bg-surface-container/60 hover:bg-surface-container transition-colors">
<td className="py-3.5 px-4 rounded-l-lg">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
<div>
<strong className="font-label-mono text-primary font-bold block text-[13px]">#RX-2026-889</strong>
<span className="font-body-sm text-body-sm text-outline">Hôm nay 10:15</span>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-title-md text-[13px] text-on-surface block font-semibold">BS. CKI Vũ Anh Tuấn</span>
<span className="font-body-sm text-[11px] text-outline">Phòng Khúc Xạ Q.1</span>
</td>
<td className="py-3.5 px-3 font-label-mono text-[13px]">
<span className="inline-block px-2 py-0.5 rounded bg-surface-container-highest text-primary font-bold">
                        SPH -3.25 | CYL -0.75 | AX 180°
                      </span>
</td>
<td className="py-3.5 px-3 font-label-mono text-[13px]">
<span className="inline-block px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-bold">
                        SPH -2.75 | CYL -0.50 | AX 175°
                      </span>
</td>
<td className="py-3.5 px-2 font-label-mono text-[12px]">
<span className="block">PD: <strong>64mm</strong></span>
<span className="text-primary font-semibold">BCVA: 10/10</span>
</td>
<td className="py-3.5 px-3">
<div className="flex flex-col">
<span className="font-medium text-on-surface text-[13px]">Essilor Crizal Sapphire HR 1.67</span>
<span className="font-label-md text-[11px] text-primary">Đã đẩy POS Thu Ngân</span>
</div>
</td>
<td className="py-3.5 px-4 rounded-r-lg text-right">
<button className="px-2.5 py-1 bg-primary text-on-primary rounded-lg text-label-md font-label-md hover:bg-primary-container transition-all">
                        Tái đặt POS
                      </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-4 rounded-l-lg">
<div>
<span className="font-label-mono text-on-surface font-semibold block text-[13px]">#RX-2025-412</span>
<span className="font-body-sm text-body-sm text-outline">15/04/2025</span>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-body-md text-[13px] text-on-surface block">BS. Trần Minh Khôi</span>
<span className="font-body-sm text-[11px] text-outline">Phòng Khúc Xạ Q.1</span>
</td>
<td className="py-3.5 px-3 font-label-mono text-[12px] text-on-surface-variant">
                      SPH -3.00 | CYL -0.50 | AX 180°
                    </td>
<td className="py-3.5 px-3 font-label-mono text-[12px] text-on-surface-variant">
                      SPH -2.50 | CYL -0.50 | AX 175°
                    </td>
<td className="py-3.5 px-2 font-label-mono text-[12px]">
<span className="block">PD: 64mm</span>
<span className="text-outline">VA: 10/10</span>
</td>
<td className="py-3.5 px-3 text-[13px]">
                      Gọng Bolon Acetate + Tròng Chemi 1.60
                    </td>
<td className="py-3.5 px-4 rounded-r-lg text-right">
<button className="p-1.5 text-outline hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]">receipt</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-4 rounded-l-lg">
<div>
<span className="font-label-mono text-on-surface font-semibold block text-[13px]">#RX-2024-190</span>
<span className="font-body-sm text-body-sm text-outline">20/10/2024</span>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-body-md text-[13px] text-on-surface block">KTV. Lâm Hoàng Phúc</span>
<span className="font-body-sm text-[11px] text-outline">Khám định kỳ</span>
</td>
<td className="py-3.5 px-3 font-label-mono text-[12px] text-on-surface-variant">
                      SPH -2.75 | CYL -0.50 | AX 180°
                    </td>
<td className="py-3.5 px-3 font-label-mono text-[12px] text-on-surface-variant">
                      SPH -2.50 | CYL -0.25 | AX 175°
                    </td>
<td className="py-3.5 px-2 font-label-mono text-[12px]">
<span className="block">PD: 64mm</span>
<span className="text-outline">VA: 10/10</span>
</td>
<td className="py-3.5 px-3 text-[13px]">
                      Chỉ chỉnh độ tròng đổi màu Transitions Gen 8
                    </td>
<td className="py-3.5 px-4 rounded-r-lg text-right">
<button className="p-1.5 text-outline hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]">receipt</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-4 rounded-l-lg">
<div>
<span className="font-label-mono text-on-surface font-semibold block text-[13px]">#RX-2023-088</span>
<span className="font-body-sm text-body-sm text-outline">14/03/2023 (Khởi tạo)</span>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-body-md text-[13px] text-on-surface block">KTV. Nguyễn Văn Nam</span>
<span className="font-body-sm text-[11px] text-outline">Lần đầu tại hệ thống</span>
</td>
<td className="py-3.5 px-3 font-label-mono text-[12px] text-on-surface-variant">
                      SPH -2.50 | CYL -0.25 | AX 175°
                    </td>
<td className="py-3.5 px-3 font-label-mono text-[12px] text-on-surface-variant">
                      SPH -2.25 | CYL 0.00
                    </td>
<td className="py-3.5 px-2 font-label-mono text-[12px]">
<span className="block">PD: 63.5mm</span>
<span className="text-outline">VA: 10/10</span>
</td>
<td className="py-3.5 px-3 text-[13px]">
                      Bộ kính gọng kim loại Ray-Ban
                    </td>
<td className="py-3.5 px-4 rounded-r-lg text-right">
<button className="p-1.5 text-outline hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]">receipt</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-sm">
<div className="space-y-space-sm">
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">monitor_weight</span>
</span>
<div>
<span className="font-title-md text-title-md text-on-surface font-semibold block">Thói Quen Thị Giác &amp; Môi Trường Làm Việc</span>
<span className="font-body-sm text-body-sm text-outline">Dữ liệu phỏng vấn ergonomics khúc xạ</span>
</div>
</div>
<div className="space-y-2.5 pt-1">
<div className="p-3 bg-surface-container-low rounded-xl flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">laptop_mac</span>
<div>
<strong className="font-label-lg text-on-surface block text-[13px]">Nghề nghiệp: Kỹ sư phần mềm cao cấp</strong>
<span className="font-body-sm text-body-sm text-on-surface-variant">Thời gian tiếp xúc màn hình OLED/LED: 8 - 10 giờ/ngày trong môi trường máy lạnh trung tâm.</span>
</div>
</div>
<div className="p-3 bg-surface-container-low rounded-xl flex items-start gap-3">
<span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">warning</span>
<div>
<strong className="font-label-lg text-on-surface block text-[13px]">Triệu chứng cơ năng báo cáo:</strong>
<span className="font-body-sm text-body-sm text-on-surface-variant">Khô mỏi mắt vào lúc 16h-18h, chói lóa khi lái xe ban đêm (Glaring artifact). Nhạy cảm ánh sáng xanh bước sóng 415-455nm.</span>
</div>
</div>
</div>
</div>
<div className="pt-2 flex items-center justify-between font-label-mono text-[11px] text-outline">
<span>Cập nhật ngày 04/2026</span>
<span className="text-primary font-semibold cursor-pointer hover:underline">Đo lại khô mắt Schirmer Test →</span>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-sm relative overflow-hidden">
<div className="space-y-space-sm">
<div className="flex items-center gap-2">
<span className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">recommend</span>
</span>
<div>
<span className="font-title-md text-title-md text-on-surface font-semibold block">Khuyến Cáo Kỹ Thuật Tròng &amp; Gọng (Dispensing Rx)</span>
<span className="font-body-sm text-body-sm text-outline">Tối ưu thị lực theo chuẩn quang học lâm sàng</span>
</div>
</div>
<div className="space-y-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span><strong>Chiết suất đề xuất:</strong> 1.60 hoặc 1.67 Aspheric (Mỏng hơn 30%, triệt tiêu biến dạng rìa)</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span><strong>Lớp phủ bề mặt:</strong> Crizal Blue UV Capture hoặc EyeZen Relax giảm điều tiết cự ly gần</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span><strong>Dáng gọng:</strong> Khuyên dùng gọng có đệm mũi điều chỉnh được (Nose-pad) để duy trì chuẩn Vertex Distance 12mm</span>
</div>
</div>
</div>

<div className="pt-3 flex items-center gap-2">
<button className="flex-1 py-2 px-3 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-label-md text-label-md font-semibold text-center transition-all flex items-center justify-center gap-1.5">
<span className="material-symbols-outlined text-[16px]">shopping_cart_checkout</span>
                  Đẩy Toa Khám Sang POS (F3)
                </button>
<button className="py-2 px-3 bg-surface-container text-on-surface hover:bg-surface-container-high rounded-xl font-label-md text-label-md transition-all flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">sms</span>
                  Gửi ZNS Khách
                </button>
</div>
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
