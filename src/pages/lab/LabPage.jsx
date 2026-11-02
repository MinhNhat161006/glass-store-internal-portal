import React, { useState, useEffect } from 'react';
import { labApi } from '../../api/labApi';
import { message } from 'antd';

export default function LabPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLiveLabJobs = async () => {
      try {
        setLoading(true);
        const jobs = await labApi.getAllLabJobs();
        if (Array.isArray(jobs) && jobs.length > 0) {
          const mapped = jobs.map((j, idx) => {
            const isQc = j.status === 'QC_PASSED';
            const isInProgress = j.status === 'IN_PROGRESS';
            return {
              id: '#LAB-2026-0' + j.id,
              dbId: j.id,
              tray: 'Khay Xanh #' + (idx + 4),
              orderId: '#OPT-' + j.orderId + '-VN',
              customer: j.prescription?.customerName || 'Nguyễn Hoàng Duy',
              phone: '0918 732 998',
              frame: j.frameName || j.frameSku,
              lens: j.lensName || j.lensSku,
              rxSummary: j.prescription ? ('OD ' + j.prescription.odSph + ' / OS ' + j.prescription.osSph) : 'OD -3.25 / OS -2.75',
              machine: 'Essilor Delta #' + (idx + 1),
              tech: j.technicianName || 'Trần Văn Bách',
              status: isInProgress ? 'in_progress' : isQc ? 'qc' : 'waiting',
              statusLabel: isInProgress ? 'Đang mài (68%)' : isQc ? 'Đã duyệt QC' : 'Chờ nạp máy',
              statusClass: isInProgress ? 'bg-primary-fixed text-on-primary-fixed' : isQc ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container-high text-primary',
              priority: 'Tiêu chuẩn',
              timeRemaining: isQc ? 'Sẵn sàng giao' : '05 phút'
            };
          });
          setQueueOrders(mapped);
        }
      } catch (err) {
        console.warn('Real lab jobs fetch notice:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveLabJobs();
  }, []);

  const [queueOrders, setQueueOrders] = useState([]);

  const handleAction = (msg) => {
    message.success(msg);
  };

  const filteredOrders = queueOrders.filter((order) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'waiting') return order.status === 'waiting';
    if (activeTab === 'in_progress') return order.status === 'in_progress';
    if (activeTab === 'completed') return order.status === 'completed';
    if (activeTab === 'priority') return order.priority.includes('Hỏa tốc');
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="max-w-[1600px] mx-auto p-3.5 sm:p-5 flex flex-col gap-3.5">

        {/* 1. CLEAN HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-outline">XƯỞNG GIA CÔNG LAB</span>
              <span className="text-outline">/</span>
              <span className="font-label-md text-label-md text-primary font-semibold">ĐIỀU PHỐI MÀI LẮP</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Máy Trạm Tự Động v4.2
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              Điều Phối Mài Lắp Kính
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Theo dõi tiến độ cắt mài tròng tự động, tiếp nhận khay kỹ thuật và luân chuyển sang bàn kiểm tra QC.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleAction('Đã mở máy quét mã vạch khay kỹ thuật [F2]')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-xs hover:bg-[#0b4d6b] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">barcode_scanner</span>
              <span>Quét Khay [F2]</span>
            </button>
            <button
              onClick={() => handleAction('Mở phiếu yêu cầu xuất phôi tròng từ tủ kho')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high transition-colors font-label-lg text-label-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">inventory_2</span>
              <span>Xuất Phôi Kho</span>
            </button>
            <button
              onClick={() => handleAction('Đã đồng bộ kết nối các máy mài Essilor & Nidek')}
              className="p-1.5 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
              title="Đồng bộ thiết bị"
            >
              <span className="material-symbols-outlined text-[18px]">sync</span>
            </button>
          </div>
        </div>

        {/* 2. 4 CORE METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Tổng Lệnh Hôm Nay</span>
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg text-on-surface font-bold">{queueOrders.length}</span>
              <span className="font-label-md text-label-md text-outline">lệnh gia công</span>
            </div>
            <div className="mt-1 pt-1.5 border-t border-[#e7eeff] text-body-sm text-[11px] text-outline">
              0 Flagship • 0 Online
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Chờ Gán Máy &amp; Phôi</span>
              <div className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">pending_actions</span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg text-secondary font-bold">{queueOrders.filter(o => o.status === 'Chờ nạp').length}</span>
              <span className="font-label-md text-label-md text-outline">khay chờ nạp</span>
            </div>
            <div className="mt-1 pt-1.5 border-t border-[#e7eeff] text-body-sm text-[11px] text-secondary">
              Có sẵn phôi tại ngăn tủ Lab
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Đang Mài Tự Động</span>
              <div className="w-7 h-7 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">precision_manufacturing</span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg text-primary font-bold">{queueOrders.filter(o => o.status === 'Đang mài').length}</span>
              <span className="font-label-md text-label-md text-outline">máy đang cắt</span>
            </div>
            <div className="mt-1 pt-1.5 border-t border-[#e7eeff] text-body-sm text-[11px] text-outline flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              Essilor Delta + Nidek ME-1200
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Chờ QC Kiểm Tra</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">rule</span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg text-on-surface font-bold">{queueOrders.filter(o => o.status === 'Chờ QC').length}</span>
              <span className="font-label-md text-label-md text-outline">đơn sẵn sàng</span>
            </div>
            <div className="mt-1 pt-1.5 border-t border-[#e7eeff] text-body-sm text-[11px] text-outline">
              Lensmeter &amp; bàn giao đóng gói
            </div>
          </div>
        </div>

        {/* 3. COMPACT MACHINE STATUS TELEMETRY STRIP */}
        <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[16px]">monitor_heart</span>
              <span className="font-title-md text-title-md text-on-surface font-semibold">Trạng Thái Máy Mài Tự Động (Telemetry Grid)</span>
            </div>
            <span className="text-[10px] text-outline">Tự động đồng bộ: 10s</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {/* Machine 1 */}
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-[#d8e3fb]/40 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">01</span>
                    <strong className="text-on-surface text-xs">Essilor Delta 200 #01</strong>
                  </div>
                  <span className="text-[10px] text-outline block mt-0.5">Trạm Mài 3D Chính</span>
                </div>
                <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> 68%
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-label-mono text-primary font-bold">#LAB-088 (Khay #04)</span>
                  <span className="text-outline">Còn ~04 phút</span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>

            {/* Machine 2 */}
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-[#d8e3fb]/40 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-secondary text-on-secondary text-[10px] font-bold flex items-center justify-center">02</span>
                    <strong className="text-on-surface text-xs">Essilor Delta 200 #02</strong>
                  </div>
                  <span className="text-[10px] text-outline block mt-0.5">Chuyên Gọng Kim Loại</span>
                </div>
                <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> 35%
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-label-mono text-secondary font-bold">#LAB-089 (Khay #09)</span>
                  <span className="text-outline">Còn ~07 phút</span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                  <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>

            {/* Machine 3 */}
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-[#d8e3fb]/40 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-surface-container-high text-primary text-[10px] font-bold flex items-center justify-center">03</span>
                    <strong className="text-on-surface text-xs">Nidek ME-1200 Multi</strong>
                  </div>
                  <span className="text-[10px] text-outline block mt-0.5">Vát Mini &amp; Kính Khoan</span>
                </div>
                <span className="px-2 py-0.2 rounded-full bg-surface-container-high text-primary text-[10px] font-semibold">
                  SẴN SÀNG
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-outline truncate">Hàng đợi trống • Sẵn sàng cắt mài</span>
                <button
                  onClick={() => handleAction('Đã nạp lệnh hỏa tốc #LAB-091 vào máy Nidek')}
                  className="px-2 py-0.5 bg-primary text-on-primary rounded text-[10px] font-semibold hover:bg-primary-container shrink-0 cursor-pointer"
                >
                  Nạp ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. STREAMLINED LAB QUEUE TABLE */}
        <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-[#d8e3fb]/40 space-y-2.5">
          {/* Search & Filter pills in one compact bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="relative flex-1 min-w-[260px]">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[16px] text-outline">search</span>
              <input
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline"
                placeholder="Tìm mã lệnh #LAB, đơn hàng, khách hàng, SKU gọng..."
                type="text"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap text-label-md font-label-md">
              {[
                { id: 'all', label: 'Tất cả ({queueOrders.length})' },
                { id: 'waiting', label: 'Chờ nạp (0)' },
                { id: 'in_progress', label: 'Đang mài (0)' },
                { id: 'completed', label: 'Chờ QC (0)' },
                { id: 'priority', label: 'Hỏa tốc (0)', isHighlight: true }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  } ${tab.isHighlight && activeTab !== tab.id ? 'text-primary font-semibold' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-[#d8e3fb]/40">
            <table className="w-full text-left font-body-md text-body-md">
              <thead className="bg-surface-container-low text-outline font-label-md text-label-md uppercase">
                <tr>
                  <th className="py-2.5 px-3">Khay / Lệnh</th>
                  <th className="py-2.5 px-3">Khách Hàng &amp; Đơn</th>
                  <th className="py-2.5 px-3">Gọng &amp; Tròng Kính</th>
                  <th className="py-2.5 px-2">Toa OD/OS</th>
                  <th className="py-2.5 px-3">Máy &amp; KTV</th>
                  <th className="py-2.5 px-3">Trạng Thái</th>
                  <th className="py-2.5 px-3 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8e3fb]/30 text-on-surface">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-outline">
                      <div className="flex flex-col items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-slate-300 mb-1">precision_manufacturing</span>
                        <span className="text-sm font-medium text-on-surface">Chưa có lệnh mài kính nào trong xưởng</span>
                        <span className="text-xs text-outline mt-0.5">Khi nhân viên thu ngân POS hoặc Bác sĩ tạo đơn kính thuốc, lệnh sẽ xuất hiện tại đây</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="hover:bg-surface-container-low transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-mono text-primary font-bold text-xs">{order.id}</span>
                        <span className="px-1.5 py-0.2 rounded bg-surface-container font-label-mono text-[10px] text-outline">{order.tray}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <strong className="text-on-surface text-xs block">{order.customer}</strong>
                      <span className="text-[10px] text-outline">{order.orderId}</span>
                    </td>
                    <td className="py-2.5 px-3 max-w-xs">
                      <div className="text-xs text-on-surface truncate font-medium">{order.frame}</div>
                      <div className="text-[11px] text-primary truncate">{order.lens}</div>
                    </td>
                    <td className="py-2.5 px-2 font-label-mono text-[11px] text-outline">
                      {order.rxSummary}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-xs text-on-surface block font-medium">{order.machine}</span>
                      <span className="text-[10px] text-outline">{order.tech}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold inline-block ${order.statusClass}`}>
                        {order.statusLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {order.status === 'in_progress' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(`Đã đánh dấu hoàn tất mài ${order.id}. Chuyển sang bàn QC!`);
                          }}
                          className="px-2.5 py-1 bg-primary text-on-primary rounded-lg text-label-md font-label-md hover:bg-[#0b4d6b] transition-all cursor-pointer shadow-xs"
                        >
                          Xong Mài → QC
                        </button>
                      ) : order.status === 'waiting' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(`Đã nạp lệnh ${order.id} vào máy mài!`);
                          }}
                          className="px-2.5 py-1 bg-secondary text-on-secondary rounded-lg text-label-md font-label-md hover:bg-primary transition-all cursor-pointer"
                        >
                          Nạp Vào Máy
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(`Chuyển đơn ${order.id} sang bàn nghiệm thu QC`);
                          }}
                          className="px-2.5 py-1 bg-surface-container text-primary rounded-lg text-label-md font-label-md hover:bg-surface-container-high transition-all cursor-pointer"
                        >
                          Bàn Giao QC
                        </button>
                      )}
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>

          <div className="pt-1 flex items-center justify-between text-body-sm font-body-sm text-outline">
            <span>Hiển thị {filteredOrders.length} lệnh gia công</span>
            <span className="text-primary font-medium">Lab SLA cam kết: 45 phút/đơn tiêu chuẩn</span>
          </div>
        </div>

        {/* 5. SLIDE-OVER DETAIL MODAL FOR SELECTED ORDER */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest max-w-lg w-full rounded-xl p-4 shadow-xl border border-[#d8e3fb]/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#e7eeff]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono font-bold text-primary text-sm">{selectedOrder.id}</span>
                    <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold">{selectedOrder.tray}</span>
                  </div>
                  <span className="text-xs text-outline">Đơn gốc: {selectedOrder.orderId} • Khách: {selectedOrder.customer} ({selectedOrder.phone})</span>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-1 rounded-lg text-outline hover:text-on-surface cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="p-2.5 bg-surface-container-low rounded-xl text-body-sm space-y-1.5 border border-[#d8e3fb]/30">
                <div><strong>Gọng kính:</strong> {selectedOrder.frame}</div>
                <div><strong>Tròng kính:</strong> {selectedOrder.lens}</div>
                <div className="font-label-mono text-primary font-semibold">Thông số: {selectedOrder.rxSummary}</div>
                <div><strong>Máy chỉ định:</strong> {selectedOrder.machine} • <strong>KTV:</strong> {selectedOrder.tech}</div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button onClick={() => setSelectedOrder(null)} className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md cursor-pointer hover:bg-surface-container-high">
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setSelectedOrder(null);
                    handleAction(`Đã in phiếu kỹ thuật mã vạch cho ${selectedOrder.id}`);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1 shadow-xs cursor-pointer hover:bg-[#0b4d6b]"
                >
                  <span className="material-symbols-outlined text-[15px]">print</span>
                  <span>In Phiếu Kỹ Thuật</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
