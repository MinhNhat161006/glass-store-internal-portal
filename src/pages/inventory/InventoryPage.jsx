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
                  category: p.categoryName || (p.productType === 'FRAME' ? 'G?ng kính' : p.productType === 'LENS' ? 'Tròng kính' : 'Ph? ki?n'),
                  shelf: 'K? ' + String.fromCharCode(65 + (pIdx % 4)) + '-0' + (vIdx + 1) + '-0' + (pIdx + 1),
                  price: (v.price ? Number(v.price).toLocaleString('vi-VN') + ' d' : '2.500.000 d'),
                  onHand: stock,
                  reserved: reserved,
                  available: available,
                  status: available > 5 ? 'in_stock' : available > 0 ? 'low_stock' : 'out_of_stock',
                  statusLabel: available > 5 ? 'S?n hàng' : available > 0 ? 'S?p h?t' : 'H?t hàng',
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
        console.warn('L?y t?n kho catalog l?i:', err.message);
      }
    };
    fetchInventory();
  }, []);

  const handleAction = (msg) => {
    message.success(msg);
  };

  const filteredItems = inventoryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'frames') return item.category === 'G?ng kính';
    if (activeCategory === 'lenses') return item.category === 'Tròng kính';
    if (activeCategory === 'accessories') return item.category === 'Ph? ki?n';
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
              <span className="font-label-md text-label-md text-outline">KHO V?N &amp; V?T TU</span>
              <span className="text-outline">/</span>
              <span className="font-label-md text-label-md text-primary font-semibold">T?N KHO CHI NHÁNH</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                T? Ð?ng Ð?ng B? Kho
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              T?n Kho Chi Nhánh &amp; C?nh Báo T?n (Flagship Q.1)
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Giám sát m?c t?n th?c t? (On-Hand), lu?ng hàng gi? ch? Lab/POS (Reserved) và t?n kh? d?ng t?c th?i.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleAction('M? giao di?n ki?m kê nhanh theo k? [F4]')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">fact_check</span>
              <span>Ki?m Kê [F4]</span>
            </button>
            <button
              onClick={() => handleAction('M? phi?u t?o yêu c?u di?u chuy?n kho')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">move_up</span>
              <span>Chuy?n Kho</span>
            </button>
            <button
              onClick={() => handleAction('L?p phi?u d? xu?t nh?p hàng t? kho t?ng')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-on-primary hover:bg-[#0b4d6b] font-label-lg text-label-lg shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              <span>+ Nh?p Kho T?ng</span>
            </button>
          </div>
        </div>

        {/* 2. 4 INVENTORY METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">T?ng SKU T?n Chi Nhánh</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-primary tracking-tight font-bold">{inventoryItems.length}</span>
                  <span className="font-label-md text-label-md text-outline">SKU</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] flex items-center justify-between text-body-sm text-[11px] text-on-surface-variant font-label-mono">
              <span>{inventoryItems.filter(i => i.category === 'G?ng kính').length} g?ng • {inventoryItems.filter(i => i.category === 'Tròng kính').length} tròng</span>
              <span className="text-primary font-bold">3.42 t? ?</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">S?p H?t Hàng (&lt; 5 chi?c)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-error tracking-tight font-bold">{inventoryItems.filter(i => i.status === 'low_stock').length}</span>
                  <span className="font-label-md text-label-md text-error">SKU</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">warning</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] flex items-center justify-between text-body-sm text-[11px]">
              <span className="text-error font-medium">C?n b? sung kho t?ng</span>
              <button onClick={() => setActiveCategory('low_stock')} className="text-primary hover:underline font-semibold cursor-pointer">
                L?c xem ?
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">H?t Hàng (T?n = 0)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-outline tracking-tight font-bold">{inventoryItems.filter(i => i.status === 'out_of_stock').length}</span>
                  <span className="font-label-md text-label-md text-outline">SKU</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-surface-container text-outline flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">block</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] text-body-sm text-[11px] text-error flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Khóa bán t? d?ng trên POS &amp; Web</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block">T?n Gi? Ch? (Reserved)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-lg text-display-lg text-secondary tracking-tight font-bold">{inventoryItems.reduce((acc, i) => acc + (i.reserved || 0), 0)}</span>
                  <span className="font-label-md text-label-md text-secondary">sp</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">pending_actions</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#e7eeff] text-body-sm text-[11px] text-outline">
              Lab mài: 31 • C?c online: 11
            </div>
          </div>
        </div>

        {/* 3. SEARCH & CATEGORY FILTER */}
        <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-wrap items-center justify-between gap-2.5">
          <div className="relative flex-1 min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
            <input
              className="w-full pl-9 pr-20 py-1.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline"
              placeholder="Quét Barcode ho?c tìm mã SKU, tên s?n ph?m, v? trí k?..."
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container text-primary font-label-mono text-[10px]">
              F2 Scan
            </div>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap text-label-md font-label-md">
            {[
              { id: 'all', label: 'T?t c? (1,480)' },
              { id: 'frames', label: 'G?ng kính (620)' },
              { id: 'lenses', label: 'Tròng kính (740)' },
              { id: 'accessories', label: 'Ph? ki?n (120)' },
              { id: 'low_stock', label: 'C?nh báo t?n (&lt; 5)', isAlert: true }
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
                  <th className="py-2.5 px-3">Tên S?n Ph?m</th>
                  <th className="py-2.5 px-3">V? Trí K?</th>
                  <th className="py-2.5 px-3 text-right">Ðon Giá</th>
                  <th className="py-2.5 px-3 text-center">T?n Th?c</th>
                  <th className="py-2.5 px-3 text-center text-outline">Gi? Ch?</th>
                  <th className="py-2.5 px-3 text-center text-primary font-bold">Kh? D?ng</th>
                  <th className="py-2.5 px-3 text-center">Tr?ng Thái</th>
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
                          onClick={() => handleAction(`M? di?u chuy?n cho SKU: ${item.sku}`)}
                          className="px-2 py-1 bg-surface-container hover:bg-surface-container-high rounded text-xs text-primary font-medium transition-colors cursor-pointer"
                        >
                          Chuy?n
                        </button>
                        <button
                          onClick={() => handleAction(`Xem l?ch s? th? kho c?a SKU: ${item.sku}`)}
                          className="p-1 rounded text-outline hover:text-on-surface transition-colors cursor-pointer"
                          title="L?ch s? th? kho"
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
            <span>Hi?n th? {filteredItems.length} / 1,480 SKU t?i chi nhánh</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 rounded bg-surface-container text-xs cursor-pointer hover:bg-surface-container-high">Tru?c</button>
              <button className="px-2.5 py-1 rounded bg-primary text-on-primary text-xs font-bold">1</button>
              <button className="px-2 py-1 rounded bg-surface-container text-xs cursor-pointer hover:bg-surface-container-high">Sau</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

