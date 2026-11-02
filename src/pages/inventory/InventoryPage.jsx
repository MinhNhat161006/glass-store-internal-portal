import React, { useState } from 'react';
import { message } from 'antd';

export default function InventoryPage() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full">



<div className="w-full bg-surface-container-lowest px-space-xl py-space-lg shadow-sm">
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
<div className="space-y-1">
<div className="flex items-center gap-space-xs text-outline font-label-md text-label-md">
<span>KHO VẬN &amp; VẬT TƯ</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span>QUẢN LÝ TỒN KHO</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary font-label-lg text-label-lg">Tồn Kho Chi Nhánh &amp; Cảnh Báo Tồn</span>
</div>
<div className="flex items-center gap-space-md">
<h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Tồn Kho Flagship Q.1 &amp; Cảnh Báo Tồn Tức Thời</h1>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-mono text-label-mono text-primary shadow-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            SYNC: BR-07 / BR-12 (Tự động cập nhật 15s)
          </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
          Giám sát mức tồn thực tế (On-Hand), lượng tồn giữ chỗ Lab/POS (Reserved) và tự động tính tồn khả dụng theo quy chuẩn BR-08.
        </p>
</div>
<div className="flex flex-wrap items-center gap-space-sm">
<button className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-low text-primary hover:bg-surface-container hover:shadow-sm transition-all font-label-lg text-label-lg" >
<span className="material-symbols-outlined text-[18px]">history</span>
          Thẻ Kho Gần Đây
        </button>
<button className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container hover:shadow-sm transition-all font-label-lg text-label-lg" >
<span className="material-symbols-outlined text-[18px]">fact_check</span>
          Kiểm Kê Nhanh <span className="text-outline font-label-mono text-label-mono">[F4]</span>
</button>
<button className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim shadow-sm transition-all font-label-lg text-label-lg">
<span className="material-symbols-outlined text-[18px]">move_up</span>
          Chuyển Kho Nhanh
        </button>
<button className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container shadow-[0_4px_14px_rgba(8,98,136,0.25)] transition-all font-label-lg text-label-lg">
<span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
          Lập Yêu Cầu Nhập Kho Tổng
        </button>
</div>
</div>
</div>
<div className="w-full px-space-xl py-space-lg space-y-space-lg">

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">

<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="space-y-1">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Tổng SKU Tồn Chi Nhánh</span>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-primary tracking-tight">1,480</span>
<span className="font-label-lg text-label-lg text-on-surface-variant">SKU</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[26px]">inventory_2</span>
</div>
</div>
<div className="mt-4 pt-3 bg-surface-container-low/60 -mx-space-lg -mb-space-lg px-space-lg pb-3 flex items-center justify-between font-label-mono text-label-mono text-on-surface-variant">
<span>Gọng: <strong className="text-on-surface font-semibold">620</strong> | Tròng: <strong className="text-on-surface font-semibold">740</strong> | Phụ kiện: <strong className="text-on-surface font-semibold">120</strong></span>
<span className="text-primary font-semibold">3.42 tỷ ₫</span>
</div>
</div>

<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="space-y-1">
<div className="flex items-center gap-1.5">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Cảnh Báo Sắp Hết Hàng</span>
<span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
</div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-error tracking-tight">18</span>
<span className="font-label-lg text-label-lg text-error">SKU &lt; 5 chiếc</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[26px]">warning</span>
</div>
</div>
<div className="mt-4 pt-3 bg-error-container/40 -mx-space-lg -mb-space-lg px-space-lg pb-3 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
<span className="text-error font-label-md text-label-md">Cần bổ sung kho tổng ngay</span>
<button className="text-primary hover:underline font-label-md text-label-md flex items-center gap-0.5" >
            Lọc 18 mã <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>

<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="space-y-1">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Hết Hàng (Tồn Khả Dụng = 0)</span>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-outline tracking-tight">04</span>
<span className="font-label-lg text-label-lg text-on-surface-variant">SKU khóa bán</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-surface-container text-on-surface-variant flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[26px]">block</span>
</div>
</div>
<div className="mt-4 pt-3 bg-surface-container -mx-space-lg -mb-space-lg px-space-lg pb-3 flex items-center justify-between font-label-mono text-label-mono text-on-surface-variant">
<span className="flex items-center gap-1 text-error"><span className="material-symbols-outlined text-[14px]">lock</span> Khóa bán POS (BR-09)</span>
<span className="font-semibold text-on-surface">Ưu tiên nhập 01</span>
</div>
</div>

<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="space-y-1">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Tồn Giữ Chỗ (Reserved)</span>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-secondary tracking-tight">42</span>
<span className="font-label-lg text-label-lg text-secondary">Sản phẩm</span>
</div>
</div>
<div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[26px]">pending_actions</span>
</div>
</div>
<div className="mt-4 pt-3 bg-secondary-fixed/30 -mx-space-lg -mb-space-lg px-space-lg pb-3 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
<span>Lab Mài: <strong className="text-on-surface font-semibold">31</strong> | Cọc Online: <strong className="text-on-surface font-semibold">11</strong></span>
<span className="text-primary font-label-md text-label-md">Khả dụng = Thực - Giữ</span>
</div>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm space-y-space-md">

<div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-space-md">

<div className="relative flex-1">
<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary">
<span className="material-symbols-outlined text-[22px]">barcode_scanner</span>
</div>
<input className="w-full pl-11 pr-28 py-3 bg-surface-container-low rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#086288] transition-all outline-none" id="barcode-input" placeholder="Quét mã vạch Barcode (Honeywell Xenon) hoặc nhập SKU / Tên tròng kính... [Phím tắt F2]" type="text"/>
<div className="absolute inset-y-0 right-2 flex items-center gap-1">
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-mono text-label-mono">F2 Scan</span>
<button className="p-1 rounded text-outline hover:text-on-surface" id="clear-search-btn" title="Xóa tìm kiếm">
<span className="material-symbols-outlined text-[16px]">close</span>
</button>
</div>
</div>

<div className="w-full lg:w-72">
<div className="relative">
<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
<span className="material-symbols-outlined text-[18px]">shelves</span>
</div>
<select className="w-full pl-9 pr-8 py-3 bg-surface-container-low rounded-xl font-body-md text-body-md text-on-surface appearance-none outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#086288] transition-all">
<option value="">Tất cả vị trí / Kệ tủ chi nhánh</option>
<option value="A1">Tủ Trưng Bày A1 (Gọng Cao Cấp)</option>
<option value="B">Tủ Kính Trung Tâm B (Kính Râm)</option>
<option value="L01">Két Tròng Kính Lab L-01 (Chiết Suất 1.60 - 1.74)</option>
<option value="PK02">Hộc Phụ Kiện PK-02 (Hộp &amp; Nước rửa)</option>
<option value="KHO_TAM">Kệ Chờ Mài Lắp Xưởng K-09</option>
</select>
<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-outline">
<span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
</div>
</div>
</div>

<div className="flex items-center gap-space-xs">
<button className="p-3 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Làm mới dữ liệu">
<span className="material-symbols-outlined text-[20px]">refresh</span>
</button>
<button className="inline-flex items-center gap-2 px-space-md py-3 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-lg text-label-lg" title="Xuất dữ liệu Excel">
<span className="material-symbols-outlined text-[18px]">download</span>
            Xuất Excel (.xlsx)
          </button>
</div>
</div>

<div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-space-sm pt-2">

<div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface-container-low">
<button className="category-btn active px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm transition-all">
            Tất Cả Danh Mục
          </button>
<button className="category-btn px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all">
            Gọng Kính (620)
          </button>
<button className="category-btn px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all">
            Tròng Khúc Xạ 1.56 - 1.60
          </button>
<button className="category-btn px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all">
            Tròng Siêu Mỏng 1.67 - 1.74
          </button>
<button className="category-btn px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all">
            Kính Râm Thời Trang
          </button>
<button className="category-btn px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all">
            Phụ Kiện &amp; Vật Tư
          </button>
</div>

<div className="flex flex-wrap items-center gap-2">
<span className="font-label-md text-label-md text-outline">Trạng thái:</span>
<button className="status-tab active px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-md text-label-md transition-colors">
            Tất cả (1,480)
          </button>
<button className="status-tab px-2.5 py-1 rounded-full bg-surface-container text-error hover:bg-error-container hover:text-on-error-container font-label-md text-label-md transition-colors flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            Sắp hết hàng (18)
          </button>
<button className="status-tab px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-variant font-label-md text-label-md transition-colors">
            Hết hàng = 0 (4)
          </button>
<button className="status-tab px-2.5 py-1 rounded-full bg-surface-container text-secondary hover:bg-secondary-fixed font-label-md text-label-md transition-colors">
            Đang giữ chỗ (32)
          </button>
<button className="status-tab px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-variant font-label-md text-label-md transition-colors">
            Tồn an toàn (1,426)
          </button>
</div>
</div>
</div>

<div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden">

<div className="hidden px-space-lg py-3 bg-secondary-fixed/40 flex items-center justify-between" id="batch-action-bar">
<div className="flex items-center gap-2 font-label-md text-label-md text-on-secondary-fixed">
<span className="material-symbols-outlined text-[18px]">check_box</span>
<span>Đã chọn <strong id="selected-count">2</strong> sản phẩm để xử lý</span>
</div>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm">
            Tạo Lệnh Bổ Sung Kho
          </button>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm">
            In Tem Barcode Đồng Loạt
          </button>
</div>
</div>
<div className="overflow-x-auto w-full">
<table className="w-full text-left font-body-md text-body-md">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
<th className="py-3 px-4 w-10 text-center">
<input className="rounded text-primary focus:ring-0 cursor-pointer" id="check-all" type="checkbox"/>
</th>
<th className="py-3 px-4 min-w-[220px]">Mã SKU &amp; Barcode</th>
<th className="py-3 px-4 min-w-[260px]">Sản Phẩm &amp; Phân Loại</th>
<th className="py-3 px-4 min-w-[200px]">Thông Số / Khúc Xạ</th>
<th className="py-3 px-4 min-w-[140px]">Vị Trí Kệ Tủ</th>
<th className="py-3 px-4 text-center min-w-[100px]">Tồn Thực Tế</th>
<th className="py-3 px-4 text-center min-w-[100px]">Giữ Chỗ</th>
<th className="py-3 px-4 text-center min-w-[110px] bg-primary/5 text-primary">Tồn Khả Dụng</th>
<th className="py-3 px-4 min-w-[150px]">Định Mức &amp; Trạng Thái</th>
<th className="py-3 px-4 text-right min-w-[170px]">Thao Tác</th>
</tr>
</thead>
<tbody className="divide-y-0 text-on-surface" id="inventory-table-body">

<tr className="hover:bg-surface-container-low/70 transition-colors group">
<td className="py-3 px-4 text-center">
<input className="row-checkbox rounded text-primary cursor-pointer" type="checkbox"/>
</td>
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-contain" data-alt="Bolon Graceful rose gold titanium optical frame clean studio shot on neutral white reflective background sharp clinical details" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4gXqHWh-VLqa9957_MLG6hiiytSWUPM-vrD44qHg3LsYhjESDrPK6dBK1N_n6BY35MbzvHqw-soTOLJzeuyOEtH2sAkO1VPDbsjPMOznw9vX8RiQAgNGe8Q6CfDoGeEQ8OBzWZ6wzPS3Ly7lZf0LYH41N0yTUzrQOekzZB_9-ictpFv9rEwrx5_0bjjVD73xvLO8PlujSizifXfbne7xmhQgWCHeyjxB5bCT1wgM"/>
</div>
<div>
<span className="font-label-mono text-label-mono text-primary font-bold block">BL-BJ3120-C10</span>
<span className="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">qr_code_2</span> 893502910442
                    </span>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="font-title-md text-title-md text-on-surface block leading-tight font-semibold">Gọng Kính Bolon Graceful</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">Titanium Nữ / Sắc Rose Gold / BH 12 tháng</span>
</td>
<td className="py-3 px-4">
<div className="font-label-mono text-label-mono text-on-surface-variant">
<span className="inline-block px-1.5 py-0.5 bg-surface-container rounded mr-1 text-[11px]">Size 52-18-145</span>
<span className="text-outline">Trọng lượng 11.2g</span>
</div>
</td>
<td className="py-3 px-4">
<div className="inline-flex items-center gap-1 font-label-mono text-label-mono px-2 py-1 rounded bg-surface-container text-on-surface">
<span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                  Kệ Gọng A-04-12
                </div>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-semibold text-on-surface">
                04
              </td>
<td className="py-3 px-4 text-center font-label-mono text-label-lg text-secondary">
<span className="inline-block px-2 py-0.5 rounded-full bg-secondary-fixed/50 font-semibold" title="Đang chờ lắp tại Lab Q1: 02 chiếc">02</span>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-bold text-error bg-error-container/20">
                02
              </td>
<td className="py-3 px-4">
<div className="space-y-1">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-label-md">
<span className="material-symbols-outlined text-[13px]">warning</span>
                    Báo động: Sắp hết
                  </span>
<div className="font-body-sm text-body-sm text-outline">Định mức Min: 06</div>
</div>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all"  title="Xem Thẻ Kho &amp; Lịch Sử Biến Động">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
</button>
<button className="p-2 rounded-lg bg-surface-container hover:bg-secondary hover:text-on-secondary text-secondary transition-all" title="Tạo Lệnh Điều Chuyển Nhanh">
<span className="material-symbols-outlined text-[18px]">sync_alt</span>
</button>
<button className="p-2 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface-variant transition-all" title="Điều Chỉnh Kiểm Kê [Cần Duyệt]">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 transition-colors group">
<td className="py-3 px-4 text-center">
<input className="row-checkbox rounded text-primary cursor-pointer" type="checkbox"/>
</td>
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-contain" data-alt="Pair of Essilor Crizal ophthalmic prescription lenses with blue-green anti-reflective coating resting on premium medical tray" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRJuAGyH41sacaVEdIQkgc01YNTiuzwRANij11vNr98FN1vwCO_SN-yBQIGIw5RijpQ_740KJfqybdjBwH1p-oguzmC084gzdtytogsJfdynL1Rgn3ed_N667I9QE0Benzuux14IivIX_HCMRws_rIW1yDQHwIoEQXi8YsBXqmTmt8fypXsBT1WQVzKmZFIgy-aZrj3LzIIg-TlB7b0Gly6ySD-kbS5A0OLeazuNc"/>
</div>
<div>
<span className="font-label-mono text-label-mono text-primary font-bold block">LZ-CRIZAL-HR167</span>
<span className="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">qr_code_2</span> 893608119041
                    </span>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="font-title-md text-title-md text-on-surface block leading-tight font-semibold">Cặp Tròng Essilor Crizal Rock 1.67</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">Tròng Siêu Mỏng / Chống Xước Gấp 3 Lần / Phôi Cắt Sẵn</span>
</td>
<td className="py-3 px-4">
<div className="font-label-mono text-label-mono text-on-surface-variant space-y-0.5">
<div><span className="px-1.5 py-0.5 bg-primary-fixed text-on-primary-fixed-variant rounded font-semibold text-[11px]">Index 1.67</span> SPH: -4.50 -&gt; -6.00</div>
<div className="text-outline text-[11px]">CYL: 0.00 -&gt; -2.00 | UV400</div>
</div>
</td>
<td className="py-3 px-4">
<div className="inline-flex items-center gap-1 font-label-mono text-label-mono px-2 py-1 rounded bg-surface-container text-on-surface">
<span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                  Ngăn Tròng L-167-2
                </div>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-semibold text-on-surface">
                19
              </td>
<td className="py-3 px-4 text-center font-label-mono text-label-lg text-secondary">
<span className="inline-block px-2 py-0.5 rounded-full bg-secondary-fixed/50 font-semibold">05</span>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-bold text-primary bg-primary/5">
                14
              </td>
<td className="py-3 px-4">
<div className="space-y-1">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md">
<span className="material-symbols-outlined text-[13px] text-primary">check_circle</span>
                    Tồn An Toàn
                  </span>
<div className="font-body-sm text-body-sm text-outline">Định mức Min: 08</div>
</div>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all"  title="Xem Thẻ Kho &amp; Lịch Sử Biến Động">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
</button>
<button className="p-2 rounded-lg bg-surface-container hover:bg-secondary hover:text-on-secondary text-secondary transition-all" title="Tạo Lệnh Điều Chuyển Nhanh">
<span className="material-symbols-outlined text-[18px]">sync_alt</span>
</button>
<button className="p-2 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface-variant transition-all" title="Điều Chỉnh Kiểm Kê [Cần Duyệt]">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 transition-colors bg-surface-container-low/30">
<td className="py-3 px-4 text-center">
<input className="row-checkbox rounded text-primary cursor-pointer" type="checkbox"/>
</td>
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-contain" data-alt="Zeiss ClearView optical prescription lens single vision package in luxury medical clinical presentation blue guard filter" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFE2dX0ZpwCQxT_6_HC9G_Bq7nTFl18NTfd5ec7qkJnphgQqiINyaIVjY_CcMo4OS-yJ0Hx9AKmoS4-K4635BziFgg-TzMSX8ZW-cA4BD4zAXipcmWacN0VFfMGC44ujgrtpkb363H31mv7p96B44KKVmJqJr29_8ma8kLTp7gESfFgbCLZzY1bOf2eQ26nzppPaBJCX8Ktl4INLTVJsB5X2yKlsKZ_b16VeEnMEw"/>
</div>
<div>
<span className="font-label-mono text-label-mono text-error font-bold block">LZ-ZEISS-160</span>
<span className="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">qr_code_2</span> 893522108711
                    </span>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="font-title-md text-title-md text-on-surface block leading-tight font-semibold">Zeiss ClearView BlueGuard 1.60</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">Tròng Kỹ Thuật Số Đơn Tròng Tự Do / Lọc Ánh Sáng Xanh Thông Minh</span>
</td>
<td className="py-3 px-4">
<div className="font-label-mono text-label-mono text-on-surface-variant space-y-0.5">
<div><span className="px-1.5 py-0.5 bg-surface-container rounded text-[11px]">Index 1.60 FreeForm</span></div>
<div className="text-outline text-[11px]">SPH: -2.00 / CYL: -1.25</div>
</div>
</td>
<td className="py-3 px-4">
<div className="inline-flex items-center gap-1 font-label-mono text-label-mono px-2 py-1 rounded bg-surface-container text-on-surface">
<span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                  Két Tròng L-01-B
                </div>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-semibold text-outline">
                01
              </td>
<td className="py-3 px-4 text-center font-label-mono text-label-lg text-secondary">
<span className="inline-block px-2 py-0.5 rounded-full bg-secondary-fixed/50 font-semibold" title="Đã gán cho đơn hàng #OMS-9902">01</span>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-bold text-outline bg-surface-container">
                00
              </td>
<td className="py-3 px-4">
<div className="space-y-1">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-label-md">
<span className="material-symbols-outlined text-[13px] text-error">lock</span>
                    Khóa Bán POS (BR-09)
                  </span>
<div className="font-body-sm text-body-sm text-error font-semibold">Đã gửi yêu cầu cấp bù</div>
</div>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all"  title="Xem Thẻ Kho &amp; Lịch Sử Biến Động">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
</button>
<button className="px-3 py-1 rounded-lg bg-primary text-on-primary hover:bg-primary-container text-[12px] font-semibold transition-all">
                    Nhập Bù Gấp
                  </button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 transition-colors group">
<td className="py-3 px-4 text-center">
<input className="row-checkbox rounded text-primary cursor-pointer" type="checkbox"/>
</td>
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-contain" data-alt="Classic Ray Ban aviator sunglasses with gold frame and G15 green polarized lenses on luxury optical showcase" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNgh8db3yCBgKrX5DZ1umZA1Ps1XNgd9X66LcSbDd2ctbXYND-o8e4JTe9g_9aZ-D9GyDdQqvlniTbvTb_WJQcUVC5rbEgUayTGi0q3DB5fEXNZn4Kcj8e6HnIR2-X548bNdITFpxGYvfbHADdJl498-5uwZm3V4QViSU2_PgQ-KevSdfvy-1GkzMzPTTU4wYDO0HqYxw82RNJi6LOWYuBrHeGU0chgnhGFxdUXNY"/>
</div>
<div>
<span className="font-label-mono text-label-mono text-primary font-bold block">RB-TITAN-802</span>
<span className="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">qr_code_2</span> 893110298341
                    </span>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="font-title-md text-title-md text-on-surface block leading-tight font-semibold">Ray-Ban Aviator Titanium Polarized</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">Kính Râm Cao Cấp / Tròng G-15 Chống Chói Phân Cực</span>
</td>
<td className="py-3 px-4">
<div className="font-label-mono text-label-mono text-on-surface-variant">
<span className="px-1.5 py-0.5 bg-surface-container rounded text-[11px]">Size 58-14-140</span>
<span className="text-outline text-[11px] block mt-0.5">Phân cực Cat.3 UV400</span>
</div>
</td>
<td className="py-3 px-4">
<div className="inline-flex items-center gap-1 font-label-mono text-label-mono px-2 py-1 rounded bg-surface-container text-on-surface">
<span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                  Tủ Kính Trung Tâm B
                </div>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-semibold text-on-surface">
                08
              </td>
<td className="py-3 px-4 text-center font-label-mono text-label-lg text-secondary">
<span className="inline-block px-2 py-0.5 rounded-full bg-secondary-fixed/50 font-semibold">01</span>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-bold text-primary bg-primary/5">
                07
              </td>
<td className="py-3 px-4">
<div className="space-y-1">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md">
<span className="material-symbols-outlined text-[13px] text-primary">check_circle</span>
                    Tồn An Toàn
                  </span>
<div className="font-body-sm text-body-sm text-outline">Định mức Min: 03</div>
</div>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all"  title="Xem Thẻ Kho &amp; Lịch Sử Biến Động">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
</button>
<button className="p-2 rounded-lg bg-surface-container hover:bg-secondary hover:text-on-secondary text-secondary transition-all" title="Tạo Lệnh Điều Chuyển Nhanh">
<span className="material-symbols-outlined text-[18px]">sync_alt</span>
</button>
<button className="p-2 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface-variant transition-all" title="Điều Chỉnh Kiểm Kê [Cần Duyệt]">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 transition-colors group">
<td className="py-3 px-4 text-center">
<input className="row-checkbox rounded text-primary cursor-pointer" type="checkbox"/>
</td>
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-contain" data-alt="Chemi Lens Korea optical prescription high index 1.74 ultra thin anti-blue light coating packaging box" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUbfW02p2zyPB-soh8ZExaFkVUq9DXtVFsRncwKw2IdgrTXKgNx0AqiaYKLqS9Y6VsZkGHHqd37jKwkZy6q1e6x3ikHP0bRPjVf8DNOzjoxLw_Gj3lcGOidzKm52zmT9K7a4FFaBCg9TdmvkxdgRAGsB8_t-3BlypIs7-yc6rcdnpDrIn3I-4Dnn5daEcxZB8YqeYFU-WRKkUtKshJi1Bi0Mj02KWJwqUEkh4KJbs"/>
</div>
<div>
<span className="font-label-mono text-label-mono text-primary font-bold block">CHEMI-U6-174</span>
<span className="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">qr_code_2</span> 893774819230
                    </span>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="font-title-md text-title-md text-on-surface block leading-tight font-semibold">Tròng Kính Chemi U6 Siêu Mỏng 1.74</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">Xuất xứ Hàn Quốc / Lớp váng phủ siêu trơn chống bám bụi và hơi nước</span>
</td>
<td className="py-3 px-4">
<div className="font-label-mono text-label-mono text-on-surface-variant space-y-0.5">
<div><span className="px-1.5 py-0.5 bg-primary-fixed text-on-primary-fixed-variant rounded font-semibold text-[11px]">Index 1.74 Aspheric</span></div>
<div className="text-outline text-[11px]">SPH: -6.50 -&gt; -10.00 | CYL: 0 -&gt; -2.00</div>
</div>
</td>
<td className="py-3 px-4">
<div className="inline-flex items-center gap-1 font-label-mono text-label-mono px-2 py-1 rounded bg-surface-container text-on-surface">
<span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                  Két Tròng Kính Lab L-01
                </div>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-semibold text-on-surface">
                05
              </td>
<td className="py-3 px-4 text-center font-label-mono text-label-lg text-secondary">
<span className="inline-block px-2 py-0.5 rounded-full bg-secondary-fixed/50 font-semibold" title="Đang lắp đơn đặt riêng: 03 cặp">03</span>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-bold text-error bg-error-container/20">
                02
              </td>
<td className="py-3 px-4">
<div className="space-y-1">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-label-md">
<span className="material-symbols-outlined text-[13px]">warning</span>
                    Báo động: Sắp hết
                  </span>
<div className="font-body-sm text-body-sm text-outline">Định mức Min: 05</div>
</div>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all"  title="Xem Thẻ Kho &amp; Lịch Sử Biến Động">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
</button>
<button className="p-2 rounded-lg bg-surface-container hover:bg-secondary hover:text-on-secondary text-secondary transition-all" title="Tạo Lệnh Điều Chuyển Nhanh">
<span className="material-symbols-outlined text-[18px]">sync_alt</span>
</button>
<button className="p-2 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface-variant transition-all" title="Điều Chỉnh Kiểm Kê [Cần Duyệt]">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/70 transition-colors group">
<td className="py-3 px-4 text-center">
<input className="row-checkbox rounded text-primary cursor-pointer" type="checkbox"/>
</td>
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-surface-container-low p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-contain" data-alt="Charmant LineArt luxury Japanese excellence titanium eyewear frame with delicate musical string temples in velvet display tray" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-XaCTukgr7DdqE-ThZv-rpfA8m7C2shLm1Ye13hEK2SJc_O4GG-hTrWYlEAaYT3tBq3fQs-mpVRaHWL6JvhBlMvRPyskix8Tby_rZzX-f959A2kUj-b_n6VmkqwHhKBUa9QMaPIfciddrBBf5MwoHxSStOvgzTWcOX3zXhxktYOwu1qnF0rZbq_QyYiYDW3sd_bKU02R9n3Gd-oNEMxTP0KQekswmYeOFRanMyY0"/>
</div>
<div>
<span className="font-label-mono text-label-mono text-primary font-bold block">CH-LINEART-211</span>
<span className="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">qr_code_2</span> 893902341998
                    </span>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="font-title-md text-title-md text-on-surface block leading-tight font-semibold">Gọng Kính Charmant LineArt XL211</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">Excellence Titan Nhật Bản / Càng Đàn Hồi Không Đè Sống Mũi</span>
</td>
<td className="py-3 px-4">
<div className="font-label-mono text-label-mono text-on-surface-variant">
<span className="px-1.5 py-0.5 bg-surface-container rounded text-[11px]">Size 51-16-135</span>
<span className="text-outline text-[11px] block mt-0.5">Vàng 18K Plated / 7.8g</span>
</div>
</td>
<td className="py-3 px-4">
<div className="inline-flex items-center gap-1 font-label-mono text-label-mono px-2 py-1 rounded bg-surface-container text-on-surface">
<span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                  Tủ Trưng Bày A1
                </div>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-semibold text-on-surface">
                03
              </td>
<td className="py-3 px-4 text-center font-label-mono text-label-lg text-secondary">
<span className="inline-block px-2 py-0.5 rounded-full bg-secondary-fixed/50 font-semibold">00</span>
</td>
<td className="py-3 px-4 text-center font-label-mono text-title-md font-bold text-error bg-error-container/20">
                03
              </td>
<td className="py-3 px-4">
<div className="space-y-1">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-label-md">
<span className="material-symbols-outlined text-[13px]">warning</span>
                    Báo động: Sắp hết
                  </span>
<div className="font-body-sm text-body-sm text-outline">Định mức Min: 04</div>
</div>
</td>
<td className="py-3 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all"  title="Xem Thẻ Kho &amp; Lịch Sử Biến Động">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
</button>
<button className="p-2 rounded-lg bg-surface-container hover:bg-secondary hover:text-on-secondary text-secondary transition-all" title="Tạo Lệnh Điều Chuyển Nhanh">
<span className="material-symbols-outlined text-[18px]">sync_alt</span>
</button>
<button className="p-2 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface-variant transition-all" title="Điều Chỉnh Kiểm Kê [Cần Duyệt]">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-space-lg py-space-md bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-on-surface-variant">
<div className="flex items-center gap-space-md">
<span>Hiển thị <strong>1 - 6</strong> trong số <strong>1,480</strong> SKU sản phẩm tại Flagship Q.1</span>
<div className="h-4 w-px bg-outline-variant"></div>
<div className="flex items-center gap-2">
<span>Hiển thị mỗi trang:</span>
<select className="px-2 py-1 rounded bg-surface-container-lowest text-on-surface outline-none">
<option>10 dòng</option>
<option>25 dòng</option>
<option>50 dòng</option>
<option>100 dòng</option>
</select>
</div>
</div>
<div className="flex items-center gap-1">
<button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-outline hover:text-on-surface flex items-center justify-center disabled:opacity-50" disabled="">
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-semibold flex items-center justify-center shadow-sm">1</button>
<button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container flex items-center justify-center">2</button>
<button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container flex items-center justify-center">3</button>
<span className="px-1 text-outline">...</span>
<button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container flex items-center justify-center">148</button>
<button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
</div>
</div>

<div className="fixed inset-0 z-50 overflow-hidden hidden transition-all duration-300" id="drawer-audit">

<div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm transition-opacity" ></div>
<div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
<div className="w-screen max-w-2xl bg-surface-container-lowest shadow-2xl flex flex-col justify-between">

<div className="px-space-xl py-space-lg bg-surface-container-low flex items-start justify-between">
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="font-label-mono text-label-mono px-2 py-0.5 rounded bg-primary-container text-on-primary font-semibold" id="drawer-sku">BL-BJ3120-C10</span>
<span className="font-label-md text-label-md text-outline">Audit Trail BR-10</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface" id="drawer-title">Gọng Kính Bolon Graceful BJ3120 Rose Gold</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Lịch sử biến động thẻ kho tức thời, đối soát nhân viên thực hiện và số dư khả dụng.</p>
</div>
<button className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container transition-colors" >
<span className="material-symbols-outlined text-[24px]">close</span>
</button>
</div>

<div className="px-space-xl py-space-md grid grid-cols-3 gap-space-sm bg-surface-container-lowest border-b-0">
<div className="p-space-sm rounded-xl bg-surface-container-low text-center">
<span className="font-body-sm text-body-sm text-outline block">Tồn Thực Tế</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold" id="drawer-onhand">04</span>
</div>
<div className="p-space-sm rounded-xl bg-secondary-fixed/40 text-center">
<span className="font-body-sm text-body-sm text-on-secondary-fixed-variant block">Đang Giữ Chỗ</span>
<span className="font-headline-sm text-headline-sm text-secondary font-semibold" id="drawer-reserved">02</span>
</div>
<div className="p-space-sm rounded-xl bg-error-container/30 text-center">
<span className="font-body-sm text-body-sm text-error block">Khả Dụng Bán</span>
<span className="font-headline-sm text-headline-sm text-error font-bold" id="drawer-available">02</span>
</div>
</div>

<div className="flex-1 overflow-y-auto px-space-xl py-space-lg space-y-space-md">
<div className="flex items-center justify-between">
<span className="font-label-lg text-label-lg text-on-surface">Lịch Sử Biến Động Gần Nhất (30 ngày)</span>
<span className="font-label-mono text-label-mono text-outline">Chuẩn ISO-INV/BR-10</span>
</div>

<div className="space-y-space-md relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-surface-variant">

<div className="relative flex items-start gap-space-md pl-1">
<div className="w-6 h-6 rounded-full bg-error text-on-error flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
<span className="material-symbols-outlined text-[14px]">remove</span>
</div>
<div className="flex-1 p-space-md rounded-xl bg-surface-container-low space-y-1 shadow-sm">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface font-semibold">Xuất Bán Hàng Tại POS</span>
<span className="font-label-mono text-label-mono text-error font-bold">-01 chiếc</span>
</div>
<div className="flex items-center gap-2 font-label-mono text-body-sm text-on-surface-variant">
<span>Mã HĐ: <strong className="text-primary">#OPT-8842</strong></span>
<span className="text-outline">|</span>
<span>KH: Lê Hoàng Yến</span>
</div>
<div className="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Thu ngân: Trần Minh Anh (STF-088)</span>
<span>Hôm nay, 10:42 AM</span>
</div>
</div>
</div>

<div className="relative flex items-start gap-space-md pl-1">
<div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
<span className="material-symbols-outlined text-[14px]">lock_clock</span>
</div>
<div className="flex-1 p-space-md rounded-xl bg-surface-container-low space-y-1 shadow-sm">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface font-semibold">Giữ Chỗ Mài Lắp Xưởng Lab</span>
<span className="font-label-mono text-label-mono text-secondary font-bold">Giữ 01 cái</span>
</div>
<div className="flex items-center gap-2 font-label-mono text-body-sm text-on-surface-variant">
<span>Lệnh Lab: <strong className="text-primary">#LAB-2024-041</strong></span>
<span className="text-outline">|</span>
<span>Tròng mài kèm: Zeiss 1.60</span>
</div>
<div className="flex items-center justify-between text-[11px] text-outline pt-1">
<span>KTV Lab: Phạm Quốc Cường (LAB-012)</span>
<span>Hôm nay, 09:15 AM</span>
</div>
</div>
</div>

<div className="relative flex items-start gap-space-md pl-1">
<div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
<span className="material-symbols-outlined text-[14px]">add</span>
</div>
<div className="flex-1 p-space-md rounded-xl bg-surface-container-low space-y-1 shadow-sm">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface font-semibold">Nhập Hàng Điều Chuyển Kho Tổng</span>
<span className="font-label-mono text-label-mono text-primary font-bold">+10 chiếc</span>
</div>
<div className="flex items-center gap-2 font-label-mono text-body-sm text-on-surface-variant">
<span>Phiếu Chuyển: <strong className="text-primary">#TR-WH-9921</strong></span>
<span className="text-outline">|</span>
<span>Từ Kho Tổng Tân Bình</span>
</div>
<div className="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Kế toán Kho: Nguyễn Thu Trang (INV-004)</span>
<span>14/10/2024, 15:30 PM</span>
</div>
</div>
</div>

<div className="relative flex items-start gap-space-md pl-1">
<div className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
<span className="material-symbols-outlined text-[14px]">tune</span>
</div>
<div className="flex-1 p-space-md rounded-xl bg-surface-container-low space-y-1 shadow-sm">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface font-semibold">Kiểm Kê Định Kỳ Tháng 9</span>
<span className="font-label-mono text-label-mono text-outline font-bold">Khớp 100%</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Đã kiểm đếm thực tế bởi ban kiểm kê chi nhánh, không có lệch số liệu.</p>
<div className="flex items-center justify-between text-[11px] text-outline pt-1">
<span>Cửa hàng trưởng: Vũ Thanh Nga</span>
<span>30/09/2024, 21:00 PM</span>
</div>
</div>
</div>
</div>
</div>

<div className="p-space-lg bg-surface-container-low flex items-center justify-between gap-space-md">
<button className="px-space-md py-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-variant font-label-lg text-label-lg transition-colors" >
            Đóng
          </button>
<div className="flex items-center gap-2">
<button className="px-space-md py-2.5 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container font-label-lg text-label-lg shadow-sm transition-colors">
              In Thẻ Kho (K4)
            </button>
<button className="px-space-lg py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg shadow-sm transition-colors">
              Tạo Yêu Cầu Cấp Thêm
            </button>
</div>
</div>
</div>
</div>
</div>

<div className="fixed inset-0 z-50 flex items-center justify-center hidden" id="modal-quick-audit">
<div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm" ></div>
<div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-space-xl space-y-space-md z-10">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">fact_check</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">Kiểm Kê Nhanh Điểm Bán [F4]</h3>
<span className="font-body-sm text-body-sm text-outline">Chế độ kiểm đếm chớp nhoáng theo vị trí kệ</span>
</div>
</div>
<button className="p-1 rounded text-outline hover:text-on-surface" >
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<div className="space-y-space-sm">
<label className="font-label-md text-label-md text-on-surface-variant">Chọn Kệ / Vị Trí Cần Đếm</label>
<select className="w-full px-space-md py-2.5 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface outline-none">
<option>Tủ Trưng Bày A1 (Gọng Cao Cấp)</option>
<option>Két Tròng Kính Lab L-01</option>
<option>Kệ Chờ Mài Lắp Xưởng K-09</option>
</select>
</div>
<div className="p-space-md rounded-xl bg-surface-container-low space-y-2">
<div className="flex items-center justify-between text-body-sm">
<span className="text-outline">Tiến độ quét mã:</span>
<span className="font-semibold text-primary">0 / 48 SKU</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="w-0 h-full bg-primary transition-all"></div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Sử dụng đầu đọc Honeywell quét liên tục từng sản phẩm trên kệ để hệ thống tự động ghi nhận số lượng thực đếm.</p>
</div>
<div className="flex items-center justify-end gap-space-sm pt-2">
<button className="px-space-md py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-variant font-label-md text-label-md" >
          Hủy Bỏ
        </button>
<button className="px-space-lg py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container shadow-sm" >
          Bắt Đầu Quét Kiểm Kê
        </button>
</div>
</div>
</div>


</div>
    </div>
  );
}
