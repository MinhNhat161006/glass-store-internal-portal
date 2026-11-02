import React, { useState, useEffect } from 'react';
import { productApi } from '../../api/productApi';
import { message } from 'antd';

export default function StockTransferPage() {
  const [liveProducts, setLiveProducts] = useState([]);

  useEffect(() => {
    productApi.getAllProducts().then(res => {
      const data = res?.data || res;
      if (Array.isArray(data)) setLiveProducts(data);
    }).catch(e => console.warn('Stock transfer products sync note:', e));
  }, []);
  const [activeTab, setActiveTab] = useState('active_transfers');

  // Form states for new transfer
  const [sourceWarehouse, setSourceWarehouse] = useState('Flagship Q.1');
  const [destWarehouse, setDestWarehouse] = useState('CN Tràng Tiền (HN)');
  const [transferReason, setTransferReason] = useState('Bổ sung tồn thiếu cho đơn đặt trước');

  const [transferList, setTransferList] = useState([]); // Clean empty transfers
  const [oldTransfers] = useState([
    {
      id: '#TRF-2026-042',
      from: 'Flagship Q.1 (HCM)',
      to: 'Trung tâm Lab Tân Bình',
      items: '12 gọng titan Bolon & Ray-Ban',
      carrier: 'Xe tải nội bộ (Tài xế: Minh Quân)',
      status: 'in_transit',
      statusLabel: 'Đang giao (GPS: Cầu Sài Gòn)',
      statusClass: 'bg-primary-fixed text-on-primary-fixed',
      eta: '11:45 Hôm nay',
      timeCreated: '09:30'
    },
    {
      id: '#TRF-2026-041',
      from: 'Kho Tổng Bình Tân',
      to: 'Flagship Q.1 (HCM)',
      items: '50 cặp tròng Essilor Crizal Rock 1.67',
      carrier: 'AhaMove Hỏa Tốc (Mã: AHA-9921)',
      status: 'in_transit',
      statusLabel: 'Đang giao hàng',
      statusClass: 'bg-secondary-fixed text-on-secondary-fixed',
      eta: '11:15 Hôm nay',
      timeCreated: '10:00'
    },
    {
      id: '#TRF-2026-040',
      from: 'Flagship Q.1 (HCM)',
      to: 'CN Thảo Điền (Q.2)',
      items: '02 gọng Charmant LineArt XL1465',
      carrier: 'Nhân viên giao nhận nội bộ',
      status: 'pending_dispatch',
      statusLabel: 'Chờ xuất kho',
      statusClass: 'bg-surface-container-high text-primary',
      eta: 'Chiều nay 14:00',
      timeCreated: '10:15'
    },
    {
      id: '#TRF-2026-038',
      from: 'Trung tâm Lab Tân Bình',
      to: 'Flagship Q.1 (HCM)',
      items: '15 cặp kính mài lắp hoàn tất (Kèm hộp)',
      carrier: 'Xe máy nội bộ',
      status: 'delivered',
      statusLabel: 'Đã nhận đủ 100%',
      statusClass: 'bg-surface-container text-outline',
      eta: 'Xong lúc 09:10',
      timeCreated: '08:00'
    }
  ]);

  const handleAction = (msg) => {
    message.success(msg);
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="max-w-[1600px] mx-auto p-3.5 sm:p-5 flex flex-col gap-3.5">

        {/* 1. HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-outline">KHO VẬN &amp; VẬT TƯ</span>
              <span className="text-outline">/</span>
              <span className="font-label-md text-label-md text-primary font-semibold">ĐIỀU CHUYỂN KHO</span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              Quản Lý Điều Chuyển Kho &amp; Vận Chuyển
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Theo dõi điều vận gọng, phôi tròng kính giữa các chi nhánh và Trung tâm gia công Lab.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('create_transfer')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-on-primary hover:bg-[#0b4d6b] font-label-lg text-label-lg shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span>+ Lập Lệnh Điều Chuyển [F1]</span>
            </button>
          </div>
        </div>

        {/* 2. 3 METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Đang Luân Chuyển (In-Transit)</span>
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg text-primary font-bold">04</span>
              <span className="font-label-md text-label-md text-outline">chuyến xe</span>
            </div>
            <div className="mt-1 pt-1.5 border-t border-[#e7eeff] text-body-sm text-[11px] text-outline">
              2 xe tải nội bộ • 2 AhaMove hỏa tốc
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Chờ Xuất Kho Đóng Thùng</span>
              <div className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">outbox</span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg text-secondary font-bold">02</span>
              <span className="font-label-md text-label-md text-outline">phiếu</span>
            </div>
            <div className="mt-1 pt-1.5 border-t border-[#e7eeff] text-body-sm text-[11px] text-secondary">
              Tại Flagship Lê Thánh Tôn
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Đã Giao Nhận Hôm Nay</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">task_alt</span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg text-on-surface font-bold">08</span>
              <span className="font-label-md text-label-md text-outline">phiếu nhận</span>
            </div>
            <div className="mt-1 pt-1.5 border-t border-[#e7eeff] text-body-sm text-[11px] text-primary font-medium">
              100% khớp tem niêm phong
            </div>
          </div>
        </div>

        {/* 3. TAB CONTROLLER */}
        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-[#d8e3fb]/40 w-fit">
          <button
            onClick={() => setActiveTab('active_transfers')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'active_transfers'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">sync_alt</span>
            <span>Lệnh Đang Điều Vận ({transferList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('create_transfer')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'create_transfer'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">add_box</span>
            <span>Lập Phiếu Chuyển Mới</span>
          </button>
        </div>

        {/* 4. ACTIVE TRANSFERS TABLE */}
        {activeTab === 'active_transfers' ? (
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-[#d8e3fb]/40 space-y-2">
            <div className="overflow-x-auto rounded-xl border border-[#d8e3fb]/40">
              <table className="w-full text-left font-body-md text-body-md">
                <thead className="bg-surface-container-low text-outline font-label-md text-label-md uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Mã Lệnh</th>
                    <th className="py-2.5 px-3">Tuyến Vận Chuyển</th>
                    <th className="py-2.5 px-3">Hàng Hóa / Vật Tư</th>
                    <th className="py-2.5 px-3">Phương Thức Vận Chuyển</th>
                    <th className="py-2.5 px-3">Thời Gian / Dự Kiến</th>
                    <th className="py-2.5 px-3">Trạng Thái</th>
                    <th className="py-2.5 px-3 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d8e3fb]/30 text-on-surface">
                  {transferList.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-2.5 px-3 font-label-mono font-bold text-primary text-xs">
                        {item.id}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1 text-xs">
                          <strong className="text-on-surface">{item.from}</strong>
                          <span className="material-symbols-outlined text-[14px] text-outline">arrow_forward</span>
                          <strong className="text-primary">{item.to}</strong>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 max-w-xs">
                        <span className="text-xs text-on-surface font-medium truncate block">{item.items}</span>
                      </td>
                      <td className="py-2.5 px-3 text-xs text-outline">
                        {item.carrier}
                      </td>
                      <td className="py-2.5 px-3 text-xs">
                        <span className="block font-medium text-on-surface">{item.eta}</span>
                        <span className="text-[10px] text-outline">Lập lúc {item.timeCreated}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold inline-block ${item.statusClass}`}>
                          {item.statusLabel}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {item.status === 'in_transit' ? (
                          <button
                            onClick={() => handleAction(`Đã xác nhận nhận đủ hàng cho phiếu ${item.id}`)}
                            className="px-2.5 py-1 bg-primary text-on-primary rounded text-xs font-label-md hover:bg-[#0b4d6b] transition-all cursor-pointer shadow-xs"
                          >
                            Xác Nhận Nhận
                          </button>
                        ) : item.status === 'pending_dispatch' ? (
                          <button
                            onClick={() => handleAction(`Đã xuất kho và niêm phong cho phiếu ${item.id}`)}
                            className="px-2.5 py-1 bg-secondary text-on-secondary rounded text-xs font-label-md hover:bg-primary transition-all cursor-pointer"
                          >
                            Xuất Kho Đi
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(`In biên bản bàn giao phiếu ${item.id}`)}
                            className="p-1 rounded text-outline hover:text-primary transition-colors cursor-pointer"
                            title="In biên bản"
                          >
                            <span className="material-symbols-outlined text-[16px]">print</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-1 flex items-center justify-between text-body-sm font-body-sm text-outline">
              <span>Hiển thị 4 lệnh điều vận gần nhất</span>
              <span className="text-primary font-medium">Bảo vệ hàng hóa bằng seal niêm phong mã vạch QR</span>
            </div>
          </div>
        ) : (
          /* 5. CREATE NEW TRANSFER FORM */
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-[#d8e3fb]/40 space-y-3.5 max-w-2xl">
            <h3 className="font-title-md text-title-md text-on-surface font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">add_box</span>
              Tạo Lệnh Điều Chuyển Hàng Mới
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-body-sm">
              <div className="space-y-1">
                <label className="text-outline text-xs block font-medium">Kho Xuất Hàng (Source)</label>
                <select
                  value={sourceWarehouse}
                  onChange={(e) => setSourceWarehouse(e.target.value)}
                  className="w-full p-2 rounded-xl bg-surface-container-low text-on-surface border border-[#d8e3fb]/40 outline-none"
                >
                  <option>Flagship Q.1</option>
                  <option>Kho Tổng Bình Tân</option>
                  <option>Trung tâm Lab Tân Bình</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-outline text-xs block font-medium">Kho Nhận Hàng (Destination)</label>
                <select
                  value={destWarehouse}
                  onChange={(e) => setDestWarehouse(e.target.value)}
                  className="w-full p-2 rounded-xl bg-surface-container-low text-on-surface border border-[#d8e3fb]/40 outline-none"
                >
                  <option>CN Tràng Tiền (HN)</option>
                  <option>CN Thảo Điền (Q.2)</option>
                  <option>Trung tâm Lab Tân Bình</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-outline text-xs block font-medium">Lý Do Điều Chuyển</label>
              <input
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
                className="w-full p-2 rounded-xl bg-surface-container-low text-on-surface border border-[#d8e3fb]/40 outline-none text-body-sm"
                placeholder="Nhập lý do điều chuyển..."
              />
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl text-body-sm space-y-1 border border-[#d8e3fb]/30">
              <span className="text-xs text-outline font-semibold block uppercase">Vật tư dự kiến chuyển:</span>
              <div className="text-on-surface">• Gọng Ray-Ban Round Metal RB3447 (SL: 04 cái)</div>
              <div className="text-on-surface">• Cặp tròng Essilor Crizal Rock 1.67 (SL: 10 cặp)</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e7eeff]">
              <button
                onClick={() => setActiveTab('active_transfers')}
                className="px-3.5 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-xs font-medium cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  handleAction('Đã tạo thành công phiếu điều chuyển #TRF-2026-043!');
                  setActiveTab('active_transfers');
                }}
                className="px-4 py-1.5 rounded-xl bg-primary text-on-primary hover:bg-[#0b4d6b] text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                Tạo Phiếu Ngay
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
