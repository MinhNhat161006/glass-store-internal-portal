import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { message } from 'antd';
import { inventoryApi } from '../../api/inventoryApi';

const DESTINATIONS = [
  { code: 'BRANCH_01', label: 'Chi nhánh 01' },
  { code: 'BRANCH_02', label: 'Chi nhánh 02' }
];

const STATUS_LABELS = {
  PENDING: 'Chờ xuất kho',
  IN_TRANSIT: 'Đang vận chuyển',
  RECEIVED: 'Đã nhận'
};

const emptyLine = () => ({ sku: '', quantity: '1' });
const quantityAtLab = (item) => Number(item.quantities?.LAB ?? 0);

export default function StockTransferPage() {
  const [inventory, setInventory] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [workingTransferId, setWorkingTransferId] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('transfers');
  const [destinationLocationCode, setDestinationLocationCode] = useState('BRANCH_01');
  const [reason, setReason] = useState('');
  const [lines, setLines] = useState([emptyLine()]);

  const loadData = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const [inventoryResponse, transferResponse] = await Promise.all([
        inventoryApi.getInventory(),
        inventoryApi.getTransfers()
      ]);
      if (!Array.isArray(inventoryResponse?.data) || !Array.isArray(transferResponse?.data)) {
        throw new Error('Dữ liệu tồn kho hoặc phiếu điều chuyển không hợp lệ.');
      }
      setInventory(inventoryResponse.data);
      setTransfers(transferResponse.data);
      setError('');
    } catch (loadError) {
      setError(loadError.message || 'Không thể tải dữ liệu điều chuyển kho.');
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(true);
  }, [loadData]);

  const inventoryBySku = useMemo(
    () => new Map(inventory.map((item) => [item.sku, item])),
    [inventory]
  );

  const updateLine = (index, field, value) => {
    setLines((current) => current.map((line, lineIndex) =>
      lineIndex === index ? { ...line, [field]: value } : line));
  };

  const submitTransfer = async (event) => {
    event.preventDefault();
    const requestedItems = lines.map((line) => ({
      sku: line.sku.trim(),
      quantity: Number(line.quantity)
    }));
    if (requestedItems.some((item) => !item.sku || !Number.isInteger(item.quantity) || item.quantity <= 0)) {
      message.error('Vui lòng chọn SKU và nhập số lượng nguyên lớn hơn 0.');
      return;
    }
    if (new Set(requestedItems.map((item) => item.sku)).size !== requestedItems.length) {
      message.error('Mỗi SKU chỉ được thêm một lần vào một phiếu.');
      return;
    }
    const exceedsLabStock = requestedItems.some((item) => {
      const product = inventoryBySku.get(item.sku);
      return !product || item.quantity > quantityAtLab(product);
    });
    if (exceedsLabStock) {
      message.error('Số lượng điều chuyển không được vượt tồn hiện tại tại Tổng kho Lab.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await inventoryApi.createTransfer({
        destinationLocationCode,
        reason: reason.trim(),
        items: requestedItems
      });
      if (!response?.data?.transferCode) {
        throw new Error('Máy chủ chưa trả về thông tin phiếu điều chuyển.');
      }
      message.success(`Đã tạo phiếu ${response.data.transferCode}. Tồn chỉ thay đổi khi xác nhận xuất kho.`);
      setLines([emptyLine()]);
      setReason('');
      setActiveTab('transfers');
      await loadData();
    } catch (submitError) {
      message.error(submitError.message || 'Không thể tạo phiếu điều chuyển.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateTransfer = async (transfer) => {
    setWorkingTransferId(transfer.id);
    try {
      if (transfer.status === 'PENDING') {
        await inventoryApi.dispatchTransfer(transfer.id);
        message.success(`Đã xuất kho cho phiếu ${transfer.transferCode}.`);
      } else {
        await inventoryApi.receiveTransfer(transfer.id);
        message.success(`Đã xác nhận nhận hàng cho phiếu ${transfer.transferCode}.`);
      }
      await loadData();
    } catch (actionError) {
      message.error(actionError.message || 'Không thể cập nhật phiếu điều chuyển.');
      await loadData();
    } finally {
      setWorkingTransferId(null);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f9f9ff]">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 p-4 sm:p-6">
        <header className="flex flex-col justify-between gap-4 rounded-xl border border-[#d8e3fb]/50 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#086288]">Kho vận / Điều chuyển</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">Phiếu điều chuyển kho</h1>
            <p className="mt-1 text-sm text-slate-600">Nguồn luôn là Tổng kho Lab; đích là một trong hai chi nhánh.</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className="rounded-lg bg-[#086288] px-4 py-2 text-sm font-semibold text-white hover:bg-[#064e6d]"
          >
            Tạo phiếu mới
          </button>
        </header>

        {error && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            Không thể đồng bộ phiếu điều chuyển: {error}
          </div>
        )}

        <div className="flex w-fit gap-2 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('transfers')}
            aria-pressed={activeTab === 'transfers'}
            className={`rounded-md px-3 py-2 text-sm font-semibold ${activeTab === 'transfers' ? 'bg-white text-[#086288] shadow-sm' : 'text-slate-600'}`}
          >
            Danh sách phiếu ({transfers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            aria-pressed={activeTab === 'create'}
            className={`rounded-md px-3 py-2 text-sm font-semibold ${activeTab === 'create' ? 'bg-white text-[#086288] shadow-sm' : 'text-slate-600'}`}
          >
            Tạo phiếu
          </button>
        </div>

        {activeTab === 'transfers' ? (
          <section className="rounded-xl border border-[#d8e3fb]/50 bg-white p-4 shadow-sm">
            {loading && transfers.length === 0 ? (
              <div role="status" className="py-12 text-center text-sm text-slate-600">Đang tải phiếu điều chuyển…</div>
            ) : error && transfers.length === 0 ? (
              <div role="alert" className="py-12 text-center text-sm text-red-800">Không thể tải phiếu điều chuyển: {error}</div>
            ) : !error && transfers.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-600">Chưa có phiếu điều chuyển nào.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th scope="col" className="px-3 py-3">Mã phiếu</th>
                      <th scope="col" className="px-3 py-3">Tuyến kho</th>
                      <th scope="col" className="px-3 py-3">Sản phẩm</th>
                      <th scope="col" className="px-3 py-3">Ngày tạo</th>
                      <th scope="col" className="px-3 py-3">Trạng thái</th>
                      <th scope="col" className="px-3 py-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transfers.map((transfer) => (
                      <tr key={transfer.id}>
                        <th scope="row" className="whitespace-nowrap px-3 py-3 font-mono text-xs text-[#086288]">{transfer.transferCode}</th>
                        <td className="whitespace-nowrap px-3 py-3">
                          {transfer.sourceLocationName} → {transfer.destinationLocationName}
                        </td>
                        <td className="px-3 py-3">
                          {transfer.items?.map((item) => `${item.sku} × ${item.quantity}`).join(', ')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                          {transfer.createdAt ? new Date(transfer.createdAt).toLocaleString('vi-VN') : '—'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            transfer.status === 'RECEIVED'
                              ? 'bg-emerald-50 text-emerald-800'
                              : transfer.status === 'IN_TRANSIT'
                                ? 'bg-blue-50 text-blue-800'
                                : 'bg-amber-50 text-amber-800'
                          }`}>
                            {STATUS_LABELS[transfer.status] || transfer.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-right">
                          {transfer.status !== 'RECEIVED' && (
                            <button
                              type="button"
                              onClick={() => updateTransfer(transfer)}
                              disabled={workingTransferId === transfer.id}
                              className="rounded-md bg-[#086288] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#064e6d] disabled:opacity-60"
                            >
                              {workingTransferId === transfer.id
                                ? 'Đang cập nhật…'
                                : transfer.status === 'PENDING' ? 'Xác nhận xuất kho' : 'Xác nhận nhận hàng'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ) : (
          <form onSubmit={submitTransfer} className="max-w-3xl space-y-5 rounded-xl border border-[#d8e3fb]/50 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Tạo phiếu điều chuyển mới</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="mb-1 block text-xs font-semibold text-slate-600">Kho xuất</span>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800">Tổng kho Lab</div>
              </div>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Kho nhận</span>
                <select
                  value={destinationLocationCode}
                  onChange={(event) => setDestinationLocationCode(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                >
                  {DESTINATIONS.map((location) => (
                    <option key={location.code} value={location.code}>{location.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">Lý do (không bắt buộc)</span>
              <input
                type="text"
                maxLength={500}
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                placeholder="Nhập lý do điều chuyển"
              />
            </label>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">Sản phẩm điều chuyển</h3>
                <button
                  type="button"
                  onClick={() => setLines((current) => [...current, emptyLine()])}
                  className="text-sm font-semibold text-[#086288] hover:underline"
                >
                  Thêm SKU
                </button>
              </div>
              {lines.map((line, index) => {
                const selectedProduct = inventoryBySku.get(line.sku);
                const available = selectedProduct ? quantityAtLab(selectedProduct) : 0;
                return (
                  <div key={index} className="grid gap-3 rounded-lg border border-slate-200 p-3 sm:grid-cols-[minmax(0,1fr)_140px_auto]">
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold text-slate-600">SKU</span>
                      <select
                        required
                        value={line.sku}
                        onChange={(event) => updateLine(index, 'sku', event.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      >
                        <option value="">Chọn sản phẩm…</option>
                        {inventory.map((item) => (
                          <option key={item.sku} value={item.sku}>
                            {item.sku} — {item.productName} (Lab: {quantityAtLab(item)})
                          </option>
                        ))}
                      </select>
                      {line.sku && <span className="mt-1 block text-xs text-slate-500">Có thể xuất tại Lab: {available}</span>}
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold text-slate-600">Số lượng</span>
                      <input
                        required
                        type="number"
                        min="1"
                        max={available}
                        step="1"
                        value={line.quantity}
                        onChange={(event) => updateLine(index, 'quantity', event.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                    </label>
                    <button
                      type="button"
                      disabled={lines.length === 1}
                      onClick={() => setLines((current) => current.filter((_, lineIndex) => lineIndex !== index))}
                      className="self-end rounded-md px-3 py-2 text-sm text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Xóa SKU khỏi phiếu"
                    >
                      Xóa
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
              Phiếu mới ở trạng thái chờ xuất kho và chưa làm thay đổi tồn. Khi xuất kho, máy chủ sẽ kiểm tra lại số lượng khả dụng trước khi ghi nhận.
            </p>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setActiveTab('transfers')}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={submitting || loading || inventory.length === 0}
                className="rounded-lg bg-[#086288] px-4 py-2 text-sm font-semibold text-white hover:bg-[#064e6d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Đang tạo…' : 'Tạo phiếu'}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
