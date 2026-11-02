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
                  price: (v.price ? Number(v.price).toLocaleString('vi-VN') + ' ₫' : '2.500.000 ₫'),
                  rawPrice: v.price ? Number(v.price) : 2500000,
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

  const totalInventoryValue = inventoryItems.reduce((acc, item) => {
    return acc + (item.rawPrice || 0) * (item.onHand || 0);
  }, 0);

  const formattedValue = totalInventoryValue >= 1e9
    ? (totalInventoryValue / 1e9).toFixed(2) + ' tỷ ₫'
    : totalInventoryValue >= 1e6
    ? (totalInventoryValue / 1e6).toFixed(1) + ' tr ₫'
    : totalInventoryValue.toLocaleString('vi-VN') + ' ₫';

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
              <span className="material-symbols-outlined text-[16px] text-primary">swap_horiz</span>
              <span>Chuyển Kho</span>
            </button>
            <button
              onClick={() => handleAction('Lập phiếu đề xuất nhập hàng từ kho tổng')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-on-primary hover:bg-[#003851] transition-colors font-label-md text-label-md font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span>+ Nhập Kho Tổng</span>
            </button>
          </div>
        </div>

        {/* 2. INVENTORY HEALTH TILES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Tile 1 */}
          <div className="bg-surface-container-lowest p-3 rounded-xl border border-[#d8e3fb]/40 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Tổng SKU Tồn Chi Nhánh</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-display-lg text-display-lg text-primary tracking-tight font-bold">{inventoryItems.length}</span>
              <span className="font-label-md text-label-md text-outline font-semibold">SKU</span>
            </div>
            <div className="mt-1 pt-1 border-t border-[#d8e3fb]/30 flex items-center justify-between text-body-sm font-body-sm text-outline">
              <span>{inventoryItems.filter(i => i.category === 'Gọng kính').length} gọng • {inventoryItems.filter(i => i.category === 'Tròng kính').length} tròng</span>
              <span className="text-primary font-bold">{formattedValue}</span>
            </div>
          </div>

          {/* Tile 2 */}
          <div className="bg-surface-container-lowest p-3 rounded-xl border border-[#d8e3fb]/40 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Sắp Hết Hàng (&lt; 5 chiếc)</span>
              <div className="w-7 h-7 rounded-lg bg-error-container/30 flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-[18px]">warning</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-display-lg text-display-lg text-error tracking-tight font-bold">{inventoryItems.filter(i => i.status === 'low_stock').length}</span>
              <span className="font-label-md text-label-md text-error font-semibold">SKU</span>
            </div>
            <div className="mt-1 pt-1 border-t border-[#d8e3fb]/30 flex items-center justify-between text-body-sm font-body-sm text-error">
              <span>Cần bổ sung kho tổng</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>

          {/* Tile 3 */}
          <div className="bg-surface-container-lowest p-3 rounded-xl border border-[#d8e3fb]/40 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Hết Hàng (Tồn = 0)</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-outline">
                <span className="material-symbols-outlined text-[18px]">block</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-display-lg text-display-lg text-outline tracking-tight font-bold">{inventoryItems.filter(i => i.status === 'out_of_stock').length}</span>
              <span className="font-label-md text-label-md text-outline font-semibold">SKU</span>
            </div>
            <div className="mt-1 pt-1 border-t border-[#d8e3fb]/30 flex items-center justify-between text-body-sm font-body-sm text-outline">
              <span>Khóa bán tự động trên POS &amp; Web</span>
            </div>
          </div>

          {/* Tile 4 */}
          <div className="bg-surface-container-lowest p-3 rounded-xl border border-[#d8e3fb]/40 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">Tồn Giữ Chỗ (Reserved)</span>
              <div className="w-7 h-7 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">lock_clock</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-display-lg text-display-lg text-secondary tracking-tight font-bold">{inventoryItems.reduce((acc, i) => acc + (i.reserved || 0), 0)}</span>
              <span className="font-label-md text-label-md text-secondary font-semibold">SP</span>
            </div>
            <div className="mt-1 pt-1 border-t border-[#d8e3fb]/30 flex items-center justify-between text-body-sm font-body-sm text-secondary">
              <span>Đang chờ Lab / Đơn POS</span>
              <span className="material-symbols-outlined text-[14px]">sync_alt</span>
            </div>
          </div>
        </div>

        {/* 3. SEARCH & CATEGORY FILTER */}
        <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Quét Barcode hoặc tìm mã SKU, tên sản phẩm, vị trí kệ..."
              className="w-full pl-9 pr-3 py-1.5 bg-surface-container-lowest border border-[#d8e3fb]/40 rounded-xl text-body-sm font-body-sm focus:outline-hidden focus:border-primary transition-colors text-on-surface shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: `Tất cả (${inventoryItems.length})` },
              { id: 'frames', label: `Gọng kính (${inventoryItems.filter(i => i.category === 'Gọng kính').length})` },
              { id: 'lenses', label: `Tròng kính (${inventoryItems.filter(i => i.category === 'Tròng kính').length})` },
              { id: 'accessories', label: `Phụ kiện (${inventoryItems.filter(i => i.category === 'Phụ kiện').length})` },
              { id: 'low_stock', label: 'Cảnh báo tồn (&lt; 5)', isAlert: true }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1 rounded-xl text-body-sm font-body-sm whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === tab.id
                    ? tab.isAlert
                      ? 'bg-error-container text-error font-semibold'
                      : 'bg-primary text-on-primary font-semibold'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: tab.label }}></span>
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
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-outline">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[40px] text-outline/50">inventory_2</span>
                        <span className="font-body-md text-on-surface-variant font-medium">Chưa có sản phẩm nào trong kho chi nhánh.</span>
                        <span className="text-xs text-outline">Dữ liệu sản phẩm sẽ hiển thị khi kết nối và đồng bộ từ catalog hệ thống.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="pt-1 flex items-center justify-between text-body-sm font-body-sm text-outline">
            <span>Hiển thị {filteredItems.length} SKU tại chi nhánh</span>
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
