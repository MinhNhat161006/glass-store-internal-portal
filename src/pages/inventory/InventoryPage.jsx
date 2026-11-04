import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { inventoryApi } from '../../api/inventoryApi';
import { isLowStock } from './inventoryUtils';

const LOCATIONS = [
  { code: 'BRANCH_01', label: 'Chi nhánh 01' },
  { code: 'BRANCH_02', label: 'Chi nhánh 02' },
  { code: 'LAB', label: 'Tổng kho Lab' }
];

const CATEGORY_LABELS = {
  FRAME: 'Gọng kính',
  LENS: 'Tròng kính',
  SUNGLASSES: 'Kính mát',
  ACCESSORY: 'Phụ kiện'
};

const quantityAt = (item, locationCode) => Number(item.quantities?.[locationCode] ?? 0);

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('ALL');

  const loadInventory = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const response = await inventoryApi.getInventory();
      if (!Array.isArray(response?.data)) {
        throw new Error('Dữ liệu tồn kho từ máy chủ không hợp lệ.');
      }
      setInventory(response.data);
      setError('');
    } catch (loadError) {
      setError(loadError.message || 'Không thể tải dữ liệu tồn kho.');
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInventory(true);
    const refreshTimer = window.setInterval(() => loadInventory(), 30000);
    return () => window.clearInterval(refreshTimer);
  }, [loadInventory]);

  const filteredInventory = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    return inventory.filter((item) => {
      const matchesQuery = !searchTerm
        || item.sku?.toLowerCase().includes(searchTerm)
        || item.productName?.toLowerCase().includes(searchTerm);
      const matchesCategory = category === 'ALL' || category === 'LOW_STOCK' || item.productType === category;
      const matchesLowStock = category !== 'LOW_STOCK'
        || LOCATIONS.some(({ code }) => isLowStock(quantityAt(item, code)));
      return matchesQuery && matchesCategory && matchesLowStock;
    });
  }, [inventory, query, category]);

  const lowStockLocations = LOCATIONS.reduce((total, { code }) =>
    total + inventory.filter((item) => isLowStock(quantityAt(item, code))).length, 0);

  return (
    <main className="min-h-screen w-full bg-[#f9f9ff]">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 p-4 sm:p-6">
        <header className="flex flex-col justify-between gap-4 rounded-xl border border-[#d8e3fb]/50 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#086288]">Kho vận / Tồn kho</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">Tồn kho đa chi nhánh</h1>
            <p className="mt-1 text-sm text-slate-600">Số lượng theo SKU tại từng địa điểm. Cảnh báo áp dụng riêng từng kho khi tồn dưới 5.</p>
          </div>
          <button
            type="button"
            onClick={() => loadInventory(true)}
            disabled={loading}
            className="rounded-lg bg-[#086288] px-4 py-2 text-sm font-semibold text-white hover:bg-[#064e6d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Đang tải…' : 'Làm mới'}
          </button>
        </header>

        <section className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[#d8e3fb]/50 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">SKU đang theo dõi</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{inventory.length}</p>
          </div>
          <div className="rounded-xl border border-red-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Lượt cảnh báo tồn thấp</p>
            <p className="mt-1 text-2xl font-bold text-red-700">{lowStockLocations}</p>
          </div>
        </section>

        {error && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            Không thể đồng bộ tồn kho: {error}
          </div>
        )}

        <section className="rounded-xl border border-[#d8e3fb]/50 bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <label className="sr-only" htmlFor="inventory-search">Tìm SKU hoặc sản phẩm</label>
            <input
              id="inventory-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm SKU hoặc tên sản phẩm…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#086288] md:max-w-md"
            />
            <div className="flex flex-wrap gap-2" aria-label="Lọc sản phẩm">
              {[
                ['ALL', 'Tất cả'],
                ['FRAME', 'Gọng kính'],
                ['LENS', 'Tròng kính'],
                ['LOW_STOCK', 'Có cảnh báo']
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCategory(value)}
                  aria-pressed={category === value}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    category === value
                      ? value === 'LOW_STOCK' ? 'bg-red-100 text-red-800' : 'bg-[#086288] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {loading && inventory.length === 0 ? (
            <div role="status" className="py-12 text-center text-sm text-slate-600">Đang tải tồn kho…</div>
          ) : error && inventory.length === 0 ? (
            <div role="alert" className="py-12 text-center text-sm text-red-800">Không thể tải dữ liệu tồn kho: {error}</div>
          ) : !error && filteredInventory.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-600">
              {inventory.length === 0 ? 'Chưa có dữ liệu tồn kho.' : 'Không tìm thấy sản phẩm phù hợp.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th scope="col" className="px-3 py-3">SKU</th>
                    <th scope="col" className="px-3 py-3">Sản phẩm</th>
                    <th scope="col" className="px-3 py-3">Loại</th>
                    {LOCATIONS.map((location) => (
                      <th scope="col" key={location.code} className="px-3 py-3 text-center">{location.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInventory.map((item) => (
                    <tr key={item.sku} className="hover:bg-slate-50">
                      <th scope="row" className="whitespace-nowrap px-3 py-3 font-mono text-xs font-semibold text-[#086288]">
                        {item.sku}
                      </th>
                      <td className="px-3 py-3 font-medium text-slate-900">{item.productName}</td>
                      <td className="px-3 py-3 text-slate-600">{CATEGORY_LABELS[item.productType] || item.productType}</td>
                      {LOCATIONS.map((location) => {
                        const quantity = quantityAt(item, location.code);
                        const lowStock = isLowStock(quantity);
                        return (
                          <td key={location.code} className="px-3 py-3 text-center">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${
                                lowStock ? 'bg-red-100 text-red-800' : 'bg-emerald-50 text-emerald-800'
                              }`}
                              aria-label={`${quantity} chiếc${lowStock ? ', cảnh báo tồn thấp' : ''}`}
                            >
                              {quantity}
                              {lowStock && <span className="text-[10px]">Thấp</span>}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
