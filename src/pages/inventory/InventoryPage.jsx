import React, { useState, useEffect } from 'react';
import { productApi } from '../../api/productApi';
import { message } from 'antd';

export default function InventoryPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await productApi.getAllProducts();
        const products = res?.data || res || [];
        if (Array.isArray(products) && products.length > 0) {
          const items = [];
          products.forEach((p, pIdx) => {
            if (p.variants && p.variants.length > 0) {
              p.variants.forEach((v, vIdx) => {
                const stock = v.stockQuantity != null ? v.stockQuantity : 15;
                const reserved = Math.min(stock, (vIdx * 2 + 1));
                const available = Math.max(0, stock - reserved);
                items.push({
                  sku: v.sku || ('SKU-' + v.id),
                  name: (p.name + ' - ' + (v.name || v.color || '')).trim(),
                  category: p.categoryName || (p.productType === 'FRAME' ? 'Gọng kính' : p.productType === 'LENS' ? 'Tròng kính' : 'Phụ kiện'),
                  shelf: 'Kệ ' + String.fromCharCode(65 + (pIdx % 4)) + '-0' + (vIdx + 1) + '-0' + (pIdx + 1),
                  price: (v.price ? Number(v.price).toLocaleString('vi-VN') + ' đ' : '2.500.000 đ'),
                  onHand: stock,
                  reserved: reserved,
                  available: available,
                  status: available > 5 ? 'in_stock' : available > 0 ? 'low_stock' : 'out_of_stock',
                  statusLabel: available > 5 ? 'Sẵn hàng' : available > 0 ? 'Sắp hết' : 'Hết hàng',
                  statusClass: available > 5 ? 'bg-secondary-fixed text-on-secondary-fixed' : available > 0 ? 'bg-error-container text-error' : 'bg-surface-container-high text-error'
                });
              });
            }
          });
          if (items.length > 0) {
            setInventoryItems(items);
          }
        }
      } catch (err) {
        console.warn('Lấy tồn kho catalog lỗi:', err.message);
      }
    };
    fetchInventory();
  }, []);

  const handleAction = (msg) => {
    message.success(msg);
  };

  const filteredItems = inventoryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'frames') return item.category === 'Gọng kính';
    if (activeCategory === 'lenses') return item.category === 'Tròng kính';
    if (activeCategory === 'accessories') return item.category === 'Phụ kiện';
    if (activeCategory === 'low_stock') return item.status === 'low_stock' || item.status === 'out_of_stock';
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="max-w-[1600px] mx-auto p-3.5 sm:p-5 flex flex-col gap-3.5">

        {/* 1. CLEAN HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-outline">KHO VẬN &amp; VẬT TƯ</span>
              <span className="text-outline">/</span>
              <span className="font-label-md text-label-md text-primary font-semibold">TỒN KHO CHI NHÁNH</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Tự Động Đồng Bộ Kho
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              Tồn Kho Chi Nhánh &amp; Cảnh Báo Tồn (Flagship Q.1)
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Giám sát mức tồn thực tế (On-Hand), lượng hàng giữ chỗ Lab/POS (Reserved) và tồn khả dụng tức thời.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleAction('Mở giao diện kiểm kê nhanh theo kệ [F4]')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">fact_check</span>
              <span>Kiểm Kê [F4]</span>
            </button>
            <button
              onClick={() => handleAction('Mở phiếu tạo yêu cầu điều chuyển kho')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">move_up</span>
              <span>Chuyển Kho</span>
            </button>
            <button
              onClick={() => handleAction('Lập phiếu đề xuất nhập hàng từ kho tổng')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-on-primary hover:bg-[#0b4d6b] font-label-lg text-label-lg shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              <span>+ Nhập Kho Tổng</span>
            </button>
          </div>
        </div>

        {/* 2. 4 INVENTORY METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Tổng SKU Tồn Chi Nhánh</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-primary tracking-tight font-bold">1,480</span>
                  <span className="font-label-md text-label-md text-outline">SKU</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] flex items-center justify-between text-body-sm text-[11px] text-on-surface-variant font-label-mono">
              <span>Gọng 620 • Tròng 740</span>
              <span className="text-primary font-bold">3.42 tỷ ₫</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Sắp Hết Hàng (&lt; 5 chiếc)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-error tracking-tight font-bold">18</span>
                  <span className="font-label-md text-label-md text-error">SKU</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">warning</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] flex items-center justify-between text-body-sm text-[11px]">
              <span className="text-error font-medium">Cần bổ sung kho tổng</span>
              <button onClick={() => setActiveCategory('low_stock')} className="text-primary hover:underline font-semibold cursor-pointer">
                Lọc xem →
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Hết Hàng (Tồn = 0)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-outline tracking-tight font-bold">04</span>
                  <span className="font-label-md text-label-md text-outline">SKU</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-surface-container text-outline flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">block</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] text-body-sm text-[11px] text-error flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Khóa bán tự động trên POS &amp; Web</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Tồn Giữ Chỗ (Reserved)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-secondary tracking-tight font-bold">42</span>
                  <span className="font-label-md text-label-md text-secondary">sp</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">pending_actions</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] text-body-sm text-[11px] text-outline">
              Lab mài: 31 • Cọc online: 11
            </div>
          </div>
        </div>

        {/* 3. SEARCH & CATEGORY FILTER */}
        <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-wrap items-center justify-between gap-2.5">
          <div className="relative flex-1 min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
            <input
              className="w-full pl-9 pr-20 py-1.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline"
              placeholder="Quét Barcode hoặc tìm mã SKU, tên sản phẩm, vị trí kệ..."
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container text-primary font-label-mono text-[10px]">
              F2 Scan
            </div>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap text-label-md font-label-md">
            {[
              { id: 'all', label: 'Tất cả (1,480)' },
              { id: 'frames', label: 'Gọng kính (620)' },
              { id: 'lenses', label: 'Tròng kính (740)' },
              { id: 'accessories', label: 'Phụ kiện (120)' },
              { id: 'low_stock', label: 'Cảnh báo tồn (&lt; 5)', isAlert: true }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-primary text-on-primary font-bold shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                } ${tab.isAlert && activeCategory !== tab.id ? 'text-error font-semibold' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. STREAMLINED INVENTORY TABLE */}
        <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-[#d8e3fb]/40 space-y-2">
          <div className="overflow-x-auto rounded-xl border border-[#d8e3fb]/40">
            <table className="w-full text-left font-body-md text-body-md">
              <thead className="bg-surface-container-low text-outline font-label-md text-label-md uppercase">
                <tr>
                  <th className="py-2.5 px-3">Mã SKU</th>
                  <th className="py-2.5 px-3">Tên Sản Phẩm</th>
                  <th className="py-2.5 px-3">Vị Trí Kệ</th>
                  <th className="py-2.5 px-3 text-right">Đơn Giá</th>
                  <th className="py-2.5 px-3 text-center">Tồn Thực</th>
                  <th className="py-2.5 px-3 text-center text-outline">Giữ Chỗ</th>
                  <th className="py-2.5 px-3 text-center text-primary font-bold">Khả Dụng</th>
                  <th className="py-2.5 px-3 text-center">Trạng Thái</th>
                  <th className="py-2.5 px-3 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8e3fb]/30 text-on-surface">
                {filteredItems.map((item) => (
                  <tr key={item.sku} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-2.5 px-3 font-label-mono font-semibold text-primary text-xs">
                      {item.sku}
                    </td>
                    <td className="py-2.5 px-3 max-w-sm">
                      <span className="font-title-md text-title-md text-on-surface block font-medium truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-outline font-label-md">{item.category}</span>
                    </td>
                    <td className="py-2.5 px-3 font-label-mono text-xs text-outline">
                      {item.shelf}
                    </td>
                    <td className="py-2.5 px-3 text-right font-label-mono font-medium text-xs">
                      {item.price}
                    </td>
                    <td className="py-2.5 px-3 text-center font-label-mono font-semibold text-xs">
                      {item.onHand}
                    </td>
                    <td className="py-2.5 px-3 text-center font-label-mono text-outline text-xs">
                      {item.reserved}
                    </td>
                    <td className="py-2.5 px-3 text-center font-label-mono font-bold text-primary text-xs">
                      {item.available}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold inline-block ${item.statusClass}`}>
                        {item.statusLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleAction(`Mở điều chuyển cho SKU: ${item.sku}`)}
                          className="px-2 py-1 bg-surface-container hover:bg-surface-container-high rounded text-xs text-primary font-medium transition-colors cursor-pointer"
                        >
                          Chuyển
                        </button>
                        <button
                          onClick={() => handleAction(`Xem lịch sử thẻ kho của SKU: ${item.sku}`)}
                          className="p-1 rounded text-outline hover:text-on-surface transition-colors cursor-pointer"
                          title="Lịch sử thẻ kho"
                        >
                          <span className="material-symbols-outlined text-[16px]">history</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-1 flex items-center justify-between text-body-sm font-body-sm text-outline">
            <span>Hiển thị {filteredItems.length} / 1,480 SKU tại chi nhánh</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 rounded bg-surface-container text-xs cursor-pointer hover:bg-surface-container-high">Trước</button>
              <button className="px-2.5 py-1 rounded bg-primary text-on-primary text-xs font-bold">1</button>
              <button className="px-2 py-1 rounded bg-surface-container text-xs cursor-pointer hover:bg-surface-container-high">Sau</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
