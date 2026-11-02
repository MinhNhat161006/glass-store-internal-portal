import React, { useState } from 'react';
import { message } from 'antd';

export default function StaffRbacPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full max-w-[1600px] mx-auto p-3.5 sm:p-5 gap-3.5">

<div className="w-full bg-surface-container-lowest px-space-xl py-space-lg shadow-sm">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">

<div className="space-y-space-xs">
<div className="flex items-center gap-2 text-on-surface-variant font-label-mono text-label-mono">
<span className="">HỆ THỐNG &amp; QUẢN TRỊ</span>
<span className="text-outline">/</span>
<span className="">CẤU HÌNH &amp; BẢO MẬT</span>
<span className="text-outline">/</span>
<span className="text-primary font-semibold">QUẢN TRỊ NHÂN VIÊN &amp; PHÂN QUYỀN RBAC</span>
</div>
<div className="flex flex-wrap items-center gap-3 pt-1">
<h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Quản Trị Nhân Viên, Phân Quyền &amp; Ma Trận Phân Vai (RBAC Matrix)
          </h1>
<div className="flex items-center gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-secondary-container font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px] text-primary-container" style={{ fontVariationSettings: '\'FILL\' 1' }}>verified_user</span>
              ISO/IEC 27001 &amp; NFR-SEC-03 Compliant
            </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              Audit Log Trực Tiếp (BR-45 Active)
            </span>
</div>
</div>
</div>

<div className="flex flex-wrap items-center gap-space-sm">
<button className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-lg text-label-lg flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-[18px]">download</span>
          Xuất Danh Sách (.xlsx)
        </button>
<button className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-lg text-label-lg flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-[18px]">policy</span>
          Nhật Ký Truy Cập [Audit]
        </button>
<button className="px-4 py-2.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim transition-colors font-label-lg text-label-lg flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-[18px]">add_moderator</span>
          + Tạo Vai Trò Mới
        </button>
<button className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary transition-all font-label-lg text-label-lg flex items-center gap-2 shadow-md">
<span className="material-symbols-outlined text-[18px]">person_add</span>
          + Thêm Nhân Viên [F1]
        </button>
</div>
</div>
</div>
<div className="p-space-xl space-y-space-xl">

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-lg">

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-start justify-between">
<div>
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Tổng Nhân Viên Hệ Thống</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg text-primary">68</span>
<span className="font-title-md text-title-md text-on-surface-variant">nhân sự</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-inner">
<span className="material-symbols-outlined text-[24px]">badge</span>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
<span className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
            Đang hoạt động: <strong className="text-on-surface">64</strong>
</span>
<span className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-error"></span>
            Tạm khóa: <strong className="text-error">4</strong>
</span>
</div>
<div className="mt-2 text-label-mono font-label-mono text-outline">Phủ 4 chi nhánh &amp; Hub E-Com</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-start justify-between">
<div>
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Vai Trò Hệ Thống (RBAC)</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg text-primary">7</span>
<span className="font-title-md text-title-md text-on-surface-variant">vai trò chuẩn</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center shadow-inner">
<span className="material-symbols-outlined text-[24px]">shield_person</span>
</div>
</div>
<div className="mt-4 pt-3 text-body-sm font-body-sm text-on-surface-variant line-clamp-1">
          Admin, Store Manager, Thu Ngân POS, KTV Khúc Xạ, KTV Lab...
        </div>
<div className="mt-2 flex items-center gap-1 font-label-mono text-label-mono text-primary-container">
<span className="material-symbols-outlined text-[15px]">lock_reset</span>
<span className="">Phân quyền dạng ma trận (NFR-SEC-03)</span>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-start justify-between">
<div>
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Phiên Đăng Nhập Trực Tuyến</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg text-primary">42</span>
<span className="font-title-md text-title-md text-on-surface-variant">phiên live</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-inner">
<span className="material-symbols-outlined text-[24px]">devices</span>
</div>
</div>
<div className="mt-4 pt-3 flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
<span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
<span className="">Phát hiện <strong>0 cảnh báo xung đột</strong> IP/MAC</span>
</div>
<div className="mt-2 text-label-mono font-label-mono text-outline">Kiểm soát chặt chẽ NFR-SEC-07</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-start justify-between">
<div>
<span className="font-label-md text-label-md uppercase tracking-wider text-outline block">Nhật Ký Thao Tác (24H)</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg text-primary">1,824</span>
<span className="font-title-md text-title-md text-on-surface-variant">logs</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary-container flex items-center justify-center shadow-inner">
<span className="material-symbols-outlined text-[24px]">history_toggle_off</span>
</div>
</div>
<div className="mt-4 pt-3 text-body-sm font-body-sm text-on-surface-variant line-clamp-1">
          Theo vết biến động giá, sửa toa kính, xuất kho, hủy hóa đơn.
        </div>
<div className="mt-2 text-label-mono font-label-mono text-primary font-semibold">
          Chuẩn xác 100% theo BR-43 / BR-45
        </div>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm space-y-space-md">

<div className="flex flex-wrap items-center justify-between gap-space-md">
<div className="inline-flex p-1 rounded-full bg-surface-container">
<button className="px-5 py-2 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">group</span>
            Danh Sách Nhân Viên &amp; Gán Vai Trò (68)
          </button>
<button className="px-5 py-2 rounded-full text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg flex items-center gap-2 transition-colors">
<span className="material-symbols-outlined text-[18px]">grid_view</span>
            Ma Trận Phân Quyền Theo Vai Trò (RBAC)
          </button>
<button className="px-5 py-2 rounded-full text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg flex items-center gap-2 transition-colors">
<span className="material-symbols-outlined text-[18px]">security</span>
            Nhật Ký Kiểm Toán (BR-45)
          </button>
<button className="px-5 py-2 rounded-full text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg flex items-center gap-2 transition-colors">
<span className="material-symbols-outlined text-[18px]">passkey</span>
            Chính Sách 2FA &amp; Bảo Mật
          </button>
</div>
<div className="flex items-center gap-2 font-label-mono text-label-mono text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-primary-container">info</span>
<span className="">Nhân viên chỉ được thực thi các hàm trong phạm vi CCHN &amp; Vai trò</span>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm pt-2">
<div className="md:col-span-4 relative">
<span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
<input className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-surface text-on-surface font-body-md text-body-md shadow-sm outline-none focus:ring-2 focus:ring-secondary" placeholder="Tìm theo tên, Mã STF, Email hoặc Số điện thoại..." type="text" value="Trần Minh Anh" />
</div>
<div className="md:col-span-3">
<select className="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface font-body-md text-body-md shadow-sm outline-none focus:ring-2 focus:ring-secondary">
<option value="">Chi nhánh: Tất cả chi nhánh</option>
<option defaultValue="" value="q1">Flagship Q.1 (TP. Hồ Chí Minh)</option>
<option value="hn">Tràng Tiền Plaza (Hà Nội)</option>
<option value="q2">Thảo Điền Store (Q.2)</option>
<option value="ecom">Hub E-Com Trung Tâm</option>
</select>
</div>
<div className="md:col-span-3">
<select className="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface font-body-md text-body-md shadow-sm outline-none focus:ring-2 focus:ring-secondary">
<option value="">Vai trò: Tất cả vai trò hệ thống</option>
<option defaultValue="" value="cashier">Thu Ngân POS &amp; KTV</option>
<option value="optom">Bác Sĩ / KTV Khúc Xạ</option>
<option value="lab">KTV Mài Lắp Xưởng Lab</option>
<option value="manager">Quản Lý Chi Nhánh</option>
<option value="inventory">Thủ Kho Vật Tư Kính</option>
</select>
</div>
<div className="md:col-span-2">
<select className="w-full px-4 py-2.5 rounded-xl bg-surface text-on-surface font-body-md text-body-md shadow-sm outline-none focus:ring-2 focus:ring-secondary">
<option value="">Tất cả trạng thái</option>
<option defaultValue="" value="active">Đang Hoạt Động (64)</option>
<option value="locked">Tạm Khóa (4)</option>
</select>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

<div className="lg:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
<div className="p-space-md bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container text-[20px]">contacts</span>
<span className="font-title-md text-title-md text-on-surface">Danh Sách Nhân Sự Thực Tế Theo Phân Quyền</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">68 Hồ Sơ</span>
</div>
<div className="font-label-mono text-label-mono text-outline">Đồng bộ ca POS: #03</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container font-label-md text-label-md uppercase text-outline">
<th className="py-3 px-4">Nhân Viên &amp; Định Danh</th>
<th className="py-3 px-3">Chi Nhánh / Vị Trí</th>
<th className="py-3 px-3">Vai Trò &amp; Cấp Phép</th>
<th className="py-3 px-3">Phiên Gần Nhất</th>
<th className="py-3 px-3">Trạng Thái</th>
<th className="py-3 px-4 text-right">Thao Tác</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md divide-y divide-surface-container-low">

<tr className="bg-surface-container-high/60 transition-colors cursor-pointer">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="relative">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary font-title-md text-title-md flex items-center justify-center shadow-sm">
                        MA
                      </div>
<span className="w-3 h-3 rounded-full bg-primary-container absolute -bottom-0.5 -right-0.5"></span>
</div>
<div>
<div className="font-title-md text-title-md text-primary flex items-center gap-1.5">
                        Trần Minh Anh
                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary-container font-label-mono text-[11px]">STF-088</span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">minhanh.tran@optivision.vn</div>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-lg text-label-lg text-on-surface block">Flagship Q.1</span>
<span className="text-body-sm text-outline">Thu Ngân / KTV Trực</span>
</td>
<td className="py-3.5 px-3">
<div className="flex flex-wrap gap-1">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Thu Ngân POS</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">KTV Cơ Bản</span>
</div>
</td>
<td className="py-3.5 px-3 font-label-mono text-label-mono text-on-surface-variant">
<div className="">10 phút trước</div>
<div className="text-[11px] text-outline">192.168.1.45</div>
</td>
<td className="py-3.5 px-3">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Hoạt động
                  </span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" title="Đang chỉnh sửa phân quyền">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
</button>
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-error transition-colors" title="Tạm khóa">
<span className="material-symbols-outlined text-[18px]">lock</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container/50 transition-colors cursor-pointer">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-title-md text-title-md flex items-center justify-center shadow-sm">
                      AT
                    </div>
<div>
<div className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
                        BS. Vũ Anh Tuấn
                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary-container font-label-mono text-[11px]">STF-021</span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">CCHN: #VN-882-HN</div>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-lg text-label-lg text-on-surface block">Flagship Q.1</span>
<span className="text-body-sm text-outline">Bác Sĩ CKI Khúc Xạ</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md inline-block">
                    Ký Toa Thuốc OD/OS (BR-25)
                  </span>
</td>
<td className="py-3.5 px-3 font-label-mono text-label-mono text-on-surface-variant">
<div className="">Live (Khám mắt)</div>
<div className="text-[11px] text-outline">192.168.1.18</div>
</td>
<td className="py-3.5 px-3">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Đang Khám
                  </span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Phân quyền">
<span className="material-symbols-outlined text-[18px]">shield</span>
</button>
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Reset Mật Khẩu">
<span className="material-symbols-outlined text-[18px]">key</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container/50 transition-colors cursor-pointer">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary font-title-md text-title-md flex items-center justify-center shadow-sm">
                      TB
                    </div>
<div>
<div className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
                        Trần Văn Bách
                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary-container font-label-mono text-[11px]">STF-045</span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">bach.tran@optivision.vn</div>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-lg text-label-lg text-on-surface block">Lab Flagship Q.1</span>
<span className="text-body-sm text-outline">KTV Trưởng Lab</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md inline-block">
                    Máy Mài &amp; Duyệt QC (BR-32)
                  </span>
</td>
<td className="py-3.5 px-3 font-label-mono text-label-mono text-on-surface-variant">
<div className="">1 giờ trước</div>
<div className="text-[11px] text-outline">192.168.1.102</div>
</td>
<td className="py-3.5 px-3">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Hoạt động
                  </span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Phân quyền">
<span className="material-symbols-outlined text-[18px]">shield</span>
</button>
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Reset Mật Khẩu">
<span className="material-symbols-outlined text-[18px]">key</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container/50 transition-colors cursor-pointer">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center shadow-sm">
                      HN
                    </div>
<div>
<div className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
                        Lê Hoàng Nam
                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary-container font-label-mono text-[11px]">STF-014</span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">nam.le@optivision.vn</div>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-lg text-label-lg text-on-surface block">Tràng Tiền HN</span>
<span className="text-body-sm text-outline">Store Manager</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary-container font-label-md text-label-md inline-block">
                    Duyệt Giảm Giá (BR-43) &amp; Kho
                  </span>
</td>
<td className="py-3.5 px-3 font-label-mono text-label-mono text-on-surface-variant">
<div className="">32 phút trước</div>
<div className="text-[11px] text-outline">10.20.4.12</div>
</td>
<td className="py-3.5 px-3">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Hoạt động
                  </span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Phân quyền">
<span className="material-symbols-outlined text-[18px]">shield</span>
</button>
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Reset Mật Khẩu">
<span className="material-symbols-outlined text-[18px]">key</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container/50 transition-colors cursor-pointer">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary text-on-secondary font-title-md text-title-md flex items-center justify-center shadow-sm">
                      TV
                    </div>
<div>
<div className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
                        Nguyễn Thảo Vy
                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary-container font-label-mono text-[11px]">STF-092</span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">vy.nguyen@optivision.vn</div>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-lg text-label-lg text-on-surface block">Thảo Điền Q.2</span>
<span className="text-body-sm text-outline">Thủ Kho Chi Nhánh</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md inline-block">
                    Nhập/Xuất &amp; Chuyển Kho (BR-11)
                  </span>
</td>
<td className="py-3.5 px-3 font-label-mono text-label-mono text-on-surface-variant">
<div className="">4 giờ trước</div>
<div className="text-[11px] text-outline">192.168.3.15</div>
</td>
<td className="py-3.5 px-3">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Hoạt động
                  </span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Phân quyền">
<span className="material-symbols-outlined text-[18px]">shield</span>
</button>
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Reset Mật Khẩu">
<span className="material-symbols-outlined text-[18px]">key</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container/50 transition-colors cursor-pointer">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-highest text-primary-container font-title-md text-title-md flex items-center justify-center shadow-sm">
                      GH
                    </div>
<div>
<div className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
                        Đỗ Gia Huy
                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary-container font-label-mono text-[11px]">STF-063</span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">huy.do@optivision.vn</div>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-lg text-label-lg text-on-surface block">Hub E-Com Online</span>
<span className="text-body-sm text-outline">CSKH Omnichannel</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md inline-block">
                    OMS Đa Kênh &amp; Bảo Hành
                  </span>
</td>
<td className="py-3.5 px-3 font-label-mono text-label-mono text-on-surface-variant">
<div className="">5 phút trước</div>
<div className="text-[11px] text-outline">10.10.12.80</div>
</td>
<td className="py-3.5 px-3">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Hoạt động
                  </span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Phân quyền">
<span className="material-symbols-outlined text-[18px]">shield</span>
</button>
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Reset Mật Khẩu">
<span className="material-symbols-outlined text-[18px]">key</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container/50 transition-colors cursor-pointer bg-error-container/20">
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-error-container text-on-error-container font-title-md text-title-md flex items-center justify-center shadow-sm">
                      HĐ
                    </div>
<div>
<div className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
                        Hoàng Văn Đức
                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary-container font-label-mono text-[11px]">STF-031</span>
</div>
<div className="font-body-sm text-body-sm text-outline">Hết hợp đồng lao động</div>
</div>
</div>
</td>
<td className="py-3.5 px-3">
<span className="font-label-lg text-label-lg text-on-surface block">Flagship Q.1</span>
<span className="text-body-sm text-outline">Bán hàng thời vụ</span>
</td>
<td className="py-3.5 px-3">
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-outline font-label-md text-label-md inline-block">
                    Toàn bộ quyền bị thu hồi
                  </span>
</td>
<td className="py-3.5 px-3 font-label-mono text-label-mono text-outline">
<div className="">14 ngày trước</div>
<div className="text-[11px]">Session Revoked</div>
</td>
<td className="py-3.5 px-3">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-label-md">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                    Đã Khóa
                  </span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" title="Mở khóa tài khoản">
<span className="material-symbols-outlined text-[18px]">lock_open</span>
</button>
<button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title="Xem lịch sử">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-body-sm font-body-sm text-on-surface-variant">
<div className="">Hiển thị <strong>1 - 7</strong> trên tổng số <strong>68</strong> nhân sự hệ thống</div>
<div className="flex items-center gap-1">
<button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-semibold flex items-center justify-center shadow-sm">1</button>
<button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container flex items-center justify-center shadow-sm">2</button>
<button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container flex items-center justify-center shadow-sm">3</button>
<button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
</div>

<div className="lg:col-span-5 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">

<div className="p-space-lg bg-surface-container-high/40">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3.5">
<div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary font-headline-md text-headline-md flex items-center justify-center shadow-md">
                MA
              </div>
<div>
<div className="flex items-center gap-2">
<h3 className="font-headline-sm text-headline-sm text-primary">Trần Minh Anh</h3>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Chính thức</span>
</div>
<div className="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-2 mt-0.5">
<span className="">Mã STF: <strong>STF-088</strong></span>
<span className="text-outline">|</span>
<span className="">Flagship Q.1 (TP.HCM)</span>
</div>
<div className="text-body-sm font-body-sm text-outline mt-0.5">Kích hoạt: 15/01/2023 • Quản trị viên chi nhánh</div>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md flex items-center gap-1 shadow-sm">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
              POS #03 Live
            </span>
</div>

<div className="mt-4 p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface">
<span className="material-symbols-outlined text-primary-container text-[20px]" style={{ fontVariationSettings: '\'FILL\' 1' }}>security</span>
<span className="">Xác thực 2 lớp (2FA) đang <strong>BẬT</strong> qua Google Authenticator</span>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-mono text-[11px] font-semibold">NFR-SEC-05</span>
</div>
</div>

<div className="p-space-lg space-y-space-md max-h-[640px] overflow-y-auto">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-primary flex items-center gap-1.5">
<span className="material-symbols-outlined text-[20px]">tune</span>
              Ma Trận Quyền Năng Phân Hệ (SRS Standard)
            </span>
<span className="font-label-mono text-label-mono text-outline">Quyền đặc thù: 14/22</span>
</div>

<div className="p-space-md rounded-xl bg-surface space-y-2.5">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2 font-title-md text-title-md text-on-surface">
<span className="material-symbols-outlined text-primary-container text-[18px]">point_of_sale</span>
                1. Phân Hệ POS Thu Ngân &amp; Bán Lẻ
              </div>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Được Phép POS</span>
</div>
<div className="space-y-2 pt-1 font-body-sm text-body-sm">
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer">
<span className="text-on-surface">Tạo đơn hàng bán lẻ &amp; Quét mã vạch gọng kính</span>
<input defaultChecked={true} className="w-4 h-4 rounded text-primary-container focus:ring-secondary" type="checkbox" />
</label>
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer">
<span className="text-on-surface">Áp dụng mã Voucher khuyến mãi CRM &amp; Tích điểm</span>
<input defaultChecked={true} className="w-4 h-4 rounded text-primary-container focus:ring-secondary" type="checkbox" />
</label>
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest opacity-75">
<span className="text-outline flex items-center gap-1">
                  Chiết khấu tay ngoài chính sách (Chặn - Yêu cầu Quản lý duyệt BR-43)
                  <span className="material-symbols-outlined text-[14px]">lock</span>
</span>
<input className="w-4 h-4 rounded text-outline cursor-not-allowed" disabled="" type="checkbox" />
</label>
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer">
<span className="text-on-surface">In lại hóa đơn bán lẻ &amp; Phiếu nhận gọng</span>
<input defaultChecked={true} className="w-4 h-4 rounded text-primary-container focus:ring-secondary" type="checkbox" />
</label>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface space-y-2.5">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2 font-title-md text-title-md text-on-surface">
<span className="material-symbols-outlined text-primary-container text-[18px]">visibility</span>
                2. Phân Hệ Phòng Khúc Xạ (OD/OS)
              </div>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-md text-label-md">Cơ Bản</span>
</div>
<div className="space-y-2 pt-1 font-body-sm text-body-sm">
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer">
<span className="text-on-surface">Tiếp nhận hàng đợi đo mắt &amp; Phân buồng khám</span>
<input defaultChecked={true} className="w-4 h-4 rounded text-primary-container focus:ring-secondary" type="checkbox" />
</label>
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer">
<span className="text-on-surface">Nhập số liệu đo máy tự động (Auto-refractor)</span>
<input defaultChecked={true} className="w-4 h-4 rounded text-primary-container focus:ring-secondary" type="checkbox" />
</label>
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest opacity-75">
<span className="text-outline flex items-center gap-1">
                  Ký duyệt đơn kính độc lập (Chặn - Chỉ Bác sĩ CCHN theo BR-25)
                  <span className="material-symbols-outlined text-[14px]">lock</span>
</span>
<input className="w-4 h-4 rounded text-outline cursor-not-allowed" disabled="" type="checkbox" />
</label>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface space-y-2.5">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2 font-title-md text-title-md text-on-surface">
<span className="material-symbols-outlined text-primary-container text-[18px]">precision_manufacturing</span>
                3. Phân Hệ Xưởng Lab &amp; Mài Kính
              </div>
<span className="px-2 py-0.5 rounded bg-surface-container-high text-outline font-label-md text-label-md">Chỉ Xem</span>
</div>
<div className="space-y-2 pt-1 font-body-sm text-body-sm">
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer">
<span className="text-on-surface">Xem tiến độ gia công mài lắp kính của khách hàng</span>
<input defaultChecked={true} className="w-4 h-4 rounded text-primary-container focus:ring-secondary" type="checkbox" />
</label>
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest opacity-75">
<span className="text-outline flex items-center gap-1">
                  Chuyển lệnh máy mài Essilor/Nidek (Chặn - Cần KTV Lab)
                  <span className="material-symbols-outlined text-[14px]">lock</span>
</span>
<input className="w-4 h-4 rounded text-outline cursor-not-allowed" disabled="" type="checkbox" />
</label>
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest opacity-75">
<span className="text-outline flex items-center gap-1">
                  Ký duyệt QC &amp; Bàn giao đóng gói (Chặn theo BR-32)
                  <span className="material-symbols-outlined text-[14px]">lock</span>
</span>
<input className="w-4 h-4 rounded text-outline cursor-not-allowed" disabled="" type="checkbox" />
</label>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface space-y-2.5">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2 font-title-md text-title-md text-on-surface">
<span className="material-symbols-outlined text-primary-container text-[18px]">inventory_2</span>
                4. Phân Hệ Quản Lý Kho Vận &amp; Điều Chuyển
              </div>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">Quyền Bán Lẻ</span>
</div>
<div className="space-y-2 pt-1 font-body-sm text-body-sm">
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer">
<span className="text-on-surface">Tra cứu tồn kho tròng/gọng thời gian thực tại chi nhánh</span>
<input defaultChecked={true} className="w-4 h-4 rounded text-primary-container focus:ring-secondary" type="checkbox" />
</label>
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer">
<span className="text-on-surface">Lập phiếu yêu cầu điều chuyển tròng kính từ kho Hub</span>
<input defaultChecked={true} className="w-4 h-4 rounded text-primary-container focus:ring-secondary" type="checkbox" />
</label>
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest opacity-75">
<span className="text-outline flex items-center gap-1">
                  Điều chỉnh kiểm kê tồn kho thực tế (Chặn - Chỉ Quản lý BR-12)
                  <span className="material-symbols-outlined text-[14px]">lock</span>
</span>
<input className="w-4 h-4 rounded text-outline cursor-not-allowed" disabled="" type="checkbox" />
</label>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface space-y-2.5">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2 font-title-md text-title-md text-on-surface">
<span className="material-symbols-outlined text-primary-container text-[18px]">admin_panel_settings</span>
                5. Phân Hệ Quản Trị Hệ Thống &amp; Cấu Hình
              </div>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-md text-label-md">Tuyệt Đối Chặn</span>
</div>
<div className="space-y-2 pt-1 font-body-sm text-body-sm opacity-75">
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest">
<span className="text-outline flex items-center gap-1">
                  Cấu hình bảng giá tròng kính &amp; quy tắc tích lũy điểm
                  <span className="material-symbols-outlined text-[14px]">lock</span>
</span>
<input className="w-4 h-4 rounded text-outline cursor-not-allowed" disabled="" type="checkbox" />
</label>
<label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest">
<span className="text-outline flex items-center gap-1">
                  Gán vai trò RBAC &amp; Tạo tài khoản nhân sự mới
                  <span className="material-symbols-outlined text-[14px]">lock</span>
</span>
<input className="w-4 h-4 rounded text-outline cursor-not-allowed" disabled="" type="checkbox" />
</label>
</div>
</div>
</div>

<div className="p-space-md bg-surface-container-low mt-auto flex flex-col gap-2">
<div className="flex items-center gap-2">
<button className="flex-1 py-2.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg shadow-sm transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">save</span>
              Lưu Thay Đổi Quyền [STF-088]
            </button>
<button className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-lg text-label-lg transition-colors flex items-center justify-center gap-1" title="Khôi phục mặc định">
<span className="material-symbols-outlined text-[18px]">restart_alt</span>
              Mặc Định
            </button>
</div>
<button className="w-full py-2 rounded-xl bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-colors font-label-md text-label-md flex items-center justify-center gap-1.5">
<span className="material-symbols-outlined text-[16px]">logout</span>
            Đăng Xuất Khỏi Mọi Thiết Bị (Revoke All Active Sessions)
          </button>
</div>
</div>
</div>

<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm space-y-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="flex items-center gap-2.5">
<div className="w-9 h-9 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">fingerprint</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-primary">Nhật Ký Kiểm Toán &amp; Thao Tác Hệ Thống Thời Gian Thực (Audit Log - BR-45)</h3>
<span className="text-body-sm font-body-sm text-outline">Bảo mật bất biến theo tiêu chuẩn NFR-SEC-03 và NFR-SEC-05</span>
</div>
</div>
<div className="flex items-center gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
            Sync Audit Engine: Đang ghi nhận
          </span>
<button className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors">
            Xem toàn bộ 1,824 logs
          </button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container font-label-md text-label-md uppercase text-outline">
<th className="py-2.5 px-4">Thời Gian &amp; Mã Log</th>
<th className="py-2.5 px-3">Tài Khoản &amp; Vai Trò</th>
<th className="py-2.5 px-3">Hành Động Tác Nghiệp (Action)</th>
<th className="py-2.5 px-3">Đối Tượng Tác Động</th>
<th className="py-2.5 px-3">Địa Chỉ IP &amp; Thiết Bị</th>
<th className="py-2.5 px-4 text-right">Mức Độ An Ninh</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md divide-y divide-surface-container-low">

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-label-mono text-label-mono">
<span className="text-on-surface">15:24:18 (Hôm nay)</span>
<span className="block text-[11px] text-outline">LOG-99201-SEC</span>
</td>
<td className="py-3 px-3">
<span className="font-title-md text-body-md text-on-surface block">Lê Hoàng Nam [STF-014]</span>
<span className="text-body-sm text-outline">Quản Lý - Tràng Tiền HN</span>
</td>
<td className="py-3 px-3">
<span className="text-on-surface font-semibold">Duyệt chiết khấu vượt khung (BR-43)</span>
<span className="block text-body-sm text-outline">Áp mức VIP 25% cho đơn hàng gọng Lindberg Precious</span>
</td>
<td className="py-3 px-3 font-label-mono text-label-mono text-primary-container">
                ORD-2024-8841
              </td>
<td className="py-3 px-3 font-label-mono text-label-mono text-on-surface-variant">
<span className="">10.20.4.12</span>
<span className="block text-[11px] text-outline">POS Terminal Manager</span>
</td>
<td className="py-3 px-4 text-right">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md">
                  Quyền Quản Lý (Authorized)
                </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-label-mono text-label-mono">
<span className="text-on-surface">15:18:02 (Hôm nay)</span>
<span className="block text-[11px] text-outline">LOG-99198-SEC</span>
</td>
<td className="py-3 px-3">
<span className="font-title-md text-body-md text-on-surface block">BS. Vũ Anh Tuấn [STF-021]</span>
<span className="text-body-sm text-outline">Bác Sĩ - Flagship Q.1</span>
</td>
<td className="py-3 px-3">
<span className="text-on-surface font-semibold">Ký số điện tử Toa khúc xạ OD/OS (BR-25)</span>
<span className="block text-body-sm text-outline">Xác thực chứng thư CCHN #VN-882-HN</span>
</td>
<td className="py-3 px-3 font-label-mono text-label-mono text-primary-container">
                RX-2024-9102
              </td>
<td className="py-3 px-3 font-label-mono text-label-mono text-on-surface-variant">
<span className="">192.168.1.18</span>
<span className="block text-[11px] text-outline">Refraction Room #01</span>
</td>
<td className="py-3 px-4 text-right">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">
                  Tiêu Chuẩn Y Khoa
                </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-label-mono text-label-mono">
<span className="text-on-surface">15:05:44 (Hôm nay)</span>
<span className="block text-[11px] text-outline">LOG-99182-SEC</span>
</td>
<td className="py-3 px-3">
<span className="font-title-md text-body-md text-on-surface block">Trần Minh Anh [STF-088]</span>
<span className="text-body-sm text-outline">Thu Ngân - Flagship Q.1</span>
</td>
<td className="py-3 px-3">
<span className="text-on-surface font-semibold">Tạo giao dịch thanh toán POS thành công</span>
<span className="block text-body-sm text-outline">Thanh toán VNPay-QR 4,850,000 VND</span>
</td>
<td className="py-3 px-3 font-label-mono text-label-mono text-primary-container">
                ORD-2024-8839
              </td>
<td className="py-3 px-3 font-label-mono text-label-mono text-on-surface-variant">
<span className="">192.168.1.45</span>
<span className="block text-[11px] text-outline">POS Terminal #03</span>
</td>
<td className="py-3 px-4 text-right">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">
                  Giao Dịch Thường
                </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-4 font-label-mono text-label-mono">
<span className="text-on-surface">14:40:11 (Hôm nay)</span>
<span className="block text-[11px] text-outline">LOG-99150-SEC</span>
</td>
<td className="py-3 px-3">
<span className="font-title-md text-body-md text-on-surface block">Hoàng Văn Đức [STF-031]</span>
<span className="text-body-sm text-error">Tài Khoản Đã Khóa</span>
</td>
<td className="py-3 px-3">
<span className="text-error font-semibold">Thử truy cập bị chặn (Blocked Access Attempt)</span>
<span className="block text-body-sm text-outline">Tài khoản hết hạn cố tình xác thực qua cổng Mobile Web</span>
</td>
<td className="py-3 px-3 font-label-mono text-label-mono text-error">
                AUTH-DENIED
              </td>
<td className="py-3 px-3 font-label-mono text-label-mono text-on-surface-variant">
<span className="">14.161.22.90</span>
<span className="block text-[11px] text-outline">External WAN IP</span>
</td>
<td className="py-3 px-4 text-right">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-md text-label-md">
                  Cảnh Báo Chặn (Alert)
                </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>

    </div>
  );
}
