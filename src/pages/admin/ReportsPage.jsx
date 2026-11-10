import React, { useState, useEffect } from 'react';
import { orderApi } from '../../api/orderApi';
import { customerApi } from '../../api/customerApi';
import { message } from 'antd';

export default function ReportsPage() {
  const [liveOrders, setLiveOrders] = useState([]);
  const [customerTotal, setCustomerTotal] = useState(0);
  const [timeframe, setTimeframe] = useState('month');
  const [branch, setBranch] = useState('all');

  useEffect(() => {
    orderApi.getAllOrders().then(orders => {
      if (Array.isArray(orders)) setLiveOrders(orders);
    }).catch(e => console.warn('Reports order sync note:', e));

    customerApi.getCustomerList().then(customers => {
      if (Array.isArray(customers)) setCustomerTotal(customers.length);
    }).catch(e => console.warn('Reports customer sync note:', e));
  }, []);

  // Filter orders by timeframe and branch
  const now = new Date();
  const filteredOrders = liveOrders.filter(order => {
    // 1. Timeframe filter
    if (order.createdAt) {
      const orderDate = new Date(order.createdAt);
      if (!isNaN(orderDate.getTime())) {
        if (timeframe === 'today') {
          const isToday = orderDate.toDateString() === now.toDateString();
          if (!isToday) return false;
        } else if (timeframe === '7days') {
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (orderDate < sevenDaysAgo) return false;
        } else if (timeframe === 'month') {
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          if (orderDate < thirtyDaysAgo) return false;
        } else if (timeframe === 'quarter') {
          const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          if (orderDate < ninetyDaysAgo) return false;
        }
      }
    }

    // 2. Branch filter
    if (branch !== 'all') {
      const bName = (order.branchName || (order.channel === 'POS' ? 'Flagship Q.1 (TP.HCM)' : 'Hub E-Com Online')).toLowerCase();
      if (branch === 'q1' && !bName.includes('q.1') && !bName.includes('flagship') && !bName.includes('q1')) return false;
      if (branch === 'hn' && !bName.includes('tràng tiền') && !bName.includes('hn') && !bName.includes('hà nội')) return false;
      if (branch === 'q2' && !bName.includes('thảo điền') && !bName.includes('q.2') && !bName.includes('q2')) return false;
      if (branch === 'ecom' && !bName.includes('e-com') && !bName.includes('online')) return false;
    }

    return true;
  });

  const validRevenueStatuses = ['PAID', 'PROCESSING', 'COMPLETED', 'DELIVERED', 'SHIPPING', 'PREPARING', 'READY_FOR_PICKUP'];
  const paidOrders = filteredOrders.filter(o => validRevenueStatuses.includes(String(o.status || '').toUpperCase()));
  const totalRevenue = paidOrders.reduce((acc, o) => acc + Number(o.finalAmount || 0), 0);
  const totalOrderCount = filteredOrders.length;
  const posCount = filteredOrders.filter(o => o.channel === 'POS').length;
  const onlineCount = filteredOrders.filter(o => o.channel === 'ONLINE').length;
  const avgOrderValue = paidOrders.length > 0 ? Math.round(totalRevenue / paidOrders.length) : 0;
  const completedCount = filteredOrders.filter(o => String(o.status || '').toUpperCase() === 'COMPLETED').length;
  const qcPassRate = totalOrderCount > 0 ? ((completedCount / totalOrderCount) * 100).toFixed(1) : '0.0';

  // Aggregate product sales from real order items in filtered period
  const productSalesMap = {};
  filteredOrders.forEach(order => {
    if (Array.isArray(order.items)) {
      order.items.forEach(item => {
        const name = item.productName || item.skuId || 'Sản phẩm';
        if (!productSalesMap[name]) {
          productSalesMap[name] = { name, quantity: 0, revenue: 0 };
        }
        productSalesMap[name].quantity += Number(item.quantity || 1);
        productSalesMap[name].revenue += Number(item.totalPrice || item.unitPrice || 0);
      });
    }
  });

  const topProducts = Object.values(productSalesMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Aggregate sales by branch in filtered period
  const branchSalesMap = {};
  filteredOrders.forEach(order => {
    const bName = order.branchName || (order.channel === 'POS' ? 'Flagship Q.1 (TP.HCM)' : 'Hub E-Com Online');
    if (!branchSalesMap[bName]) {
      branchSalesMap[bName] = { name: bName, count: 0, revenue: 0 };
    }
    branchSalesMap[bName].count += 1;
    branchSalesMap[bName].revenue += Number(order.finalAmount || 0);
  });

  const branchList = Object.values(branchSalesMap).sort((a, b) => b.revenue - a.revenue);

  const handleExportExcel = () => {
    if (filteredOrders.length === 0) {
      message.warning('Không có dữ liệu đơn hàng trong kỳ lọc hiện tại để xuất file.');
      return;
    }

    message.loading({ content: 'Đang trích xuất báo cáo doanh thu tài chính từ CSDL...', key: 'rep', duration: 1 });
    
    try {
      const headers = ['Mã Đơn Hàng', 'Ngày Tạo', 'Kênh Bán', 'Chi Nhánh', 'Khách Hàng', 'Số Điện Thoại', 'Trạng Thái', 'Thanh Toán', 'Tổng Tiền (VNĐ)'];
      const rows = filteredOrders.map(order => [
        order.orderCode || `#${order.id}`,
        order.createdAt ? new Date(order.createdAt).toLocaleString('vi-VN') : '—',
        order.channel === 'POS' ? 'Tại Quầy (POS)' : 'Trực Tuyến (Online)',
        order.branchName || (order.channel === 'POS' ? 'Flagship Q.1 (TP.HCM)' : 'Hub E-Com Online'),
        order.customerName || 'Khách vãng lai',
        order.customerPhone || '—',
        order.status || 'Chưa cập nhật',
        order.paymentMethod || 'Chưa cập nhật',
        Number(order.finalAmount || 0).toLocaleString('vi-VN')
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
      ].join('\r\n');

      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      const dateStr = new Date().toISOString().slice(0, 10);
      link.setAttribute('download', `OptiVision_Bao_Cao_Doanh_Thu_${dateStr}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      message.success({ content: `Đã xuất báo cáo ${filteredOrders.length} đơn hàng ra file Excel (CSV) thành công!`, key: 'rep' });
    } catch (err) {
      message.error({ content: 'Lỗi khi trích xuất báo cáo: ' + err.message, key: 'rep' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full max-w-[1600px] mx-auto p-3.5 sm:p-5 gap-4">
        {/* Header Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-xs">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#70787f]">
              <span>Quản Trị</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Báo Cáo &amp; Phân Tích</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#004967] font-semibold">Doanh Thu &amp; Vận Hành</span>
            </div>
            <h1 className="text-lg font-bold text-[#111c2d] mt-1">Báo Cáo Doanh Thu Đa Kênh &amp; Hiệu Quả Chuỗi</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Timeframe pills */}
            <div className="flex items-center bg-[#f0f3ff] p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setTimeframe('today')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${timeframe === 'today' ? 'bg-[#004967] text-white shadow-xs' : 'text-[#70787f] hover:text-[#111c2d]'}`}
              >
                Hôm Nay
              </button>
              <button
                onClick={() => setTimeframe('7days')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${timeframe === '7days' ? 'bg-[#004967] text-white shadow-xs' : 'text-[#70787f] hover:text-[#111c2d]'}`}
              >
                7 Ngày
              </button>
              <button
                onClick={() => setTimeframe('month')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${timeframe === 'month' ? 'bg-[#004967] text-white shadow-xs' : 'text-[#70787f] hover:text-[#111c2d]'}`}
              >
                Tháng Này
              </button>
              <button
                onClick={() => setTimeframe('quarter')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${timeframe === 'quarter' ? 'bg-[#004967] text-white shadow-xs' : 'text-[#70787f] hover:text-[#111c2d]'}`}
              >
                Quý Này
              </button>
            </div>

            {/* Branch selector */}
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#d8e3fb] text-xs font-semibold text-[#111c2d] focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả chi nhánh</option>
              <option value="q1">Flagship Q.1 (TP.HCM)</option>
              <option value="hn">Tràng Tiền Plaza (HN)</option>
              <option value="q2">Thảo Điền Store (Q.2)</option>
              <option value="ecom">Hub E-Com Online</option>
            </select>

            <button
              onClick={handleExportExcel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#004967] text-xs font-semibold transition-all border border-[#d8e3fb] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">table_view</span>
              <span>Xuất Excel</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#004967] hover:bg-[#086288] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>In (F10)</span>
            </button>
          </div>
        </div>

        {/* 4 Core KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-xs">
            <div className="flex items-center justify-between text-[#70787f] text-[11px] font-semibold uppercase">
              <span>Doanh Thu Thuần</span>
              <span className="p-1.5 rounded-lg bg-[#e7eeff] text-[#004967]">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#004967]">{totalRevenue.toLocaleString('vi-VN')}</span>
              <span className="text-xs text-[#70787f]">₫</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="text-outline">Từ {totalOrderCount} đơn hàng thực tế</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-xs">
            <div className="flex items-center justify-between text-[#70787f] text-[11px] font-semibold uppercase">
              <span>Đơn Hàng Trong Hệ Thống</span>
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <span className="material-symbols-outlined text-[18px]">task_alt</span>
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#111c2d]">{totalOrderCount}</span>
              <span className="text-xs text-[#70787f]">đơn kính</span>
            </div>
            <div className="mt-2 text-[11px] text-[#70787f] flex justify-between">
              <span>POS: <strong>{posCount}</strong></span>
              <span>Online: <strong>{onlineCount}</strong></span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-xs">
            <div className="flex items-center justify-between text-[#70787f] text-[11px] font-semibold uppercase">
              <span>Giá Trị Trung Bình (AOV)</span>
              <span className="p-1.5 rounded-lg bg-[#e7eeff] text-[#004967]">
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#004967]">{avgOrderValue.toLocaleString('vi-VN')}</span>
              <span className="text-xs text-[#70787f]">₫</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="text-outline">Tính trên các đơn đã phát sinh</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-xs">
            <div className="flex items-center justify-between text-[#70787f] text-[11px] font-semibold uppercase">
              <span>Tổng Khách Hàng CRM</span>
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <span className="material-symbols-outlined text-[18px]">group</span>
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-emerald-700">{customerTotal}</span>
              <span className="text-xs text-[#70787f]">hồ sơ</span>
            </div>
            <div className="mt-2 text-[11px] text-[#70787f]">
              Tỷ lệ hoàn tất đơn: <strong className="text-emerald-700">{qcPassRate}%</strong>
            </div>
          </div>
        </div>

        {/* Analytical Section 1: Revenue Overview + Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Revenue Chart Box */}
          <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-xs flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-[#111c2d]">Tổng Quan Doanh Thu</h3>
                <p className="text-xs text-[#70787f]">Đối chiếu giữa kênh bán lẻ POS tại cửa hàng và đơn hàng trực tuyến</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#004967]"></span>
                  <span className="text-[#40484e] font-medium">POS Cửa Hàng ({posCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  <span className="text-[#40484e] font-medium">Online ({onlineCount})</span>
                </div>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="h-56 flex flex-col items-center justify-center text-outline bg-slate-50/50 rounded-xl border border-dashed border-[#d8e3fb]">
                <span className="material-symbols-outlined text-[40px] text-outline/40 mb-1">query_stats</span>
                <span className="text-xs font-semibold text-[#40484e]">Chưa có dữ liệu giao dịch trong kỳ</span>
                <span className="text-[11px] text-outline mt-0.5">Các số liệu biểu đồ sẽ tự động xuất hiện khi có đơn bán hàng</span>
              </div>
            ) : (
              <div className="p-4 bg-[#f0f3ff]/60 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-outline">Tổng giá trị đơn POS:</span>
                  <span className="font-bold font-mono text-[#004967]">
                    {filteredOrders.filter(o => o.channel === 'POS' && validRevenueStatuses.includes(String(o.status || '').toUpperCase())).reduce((acc, o) => acc + Number(o.finalAmount || 0), 0).toLocaleString('vi-VN')} ₫
                  </span>
                </div>
                <div className="w-full bg-[#d8e3fb]/50 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#004967] h-full rounded-full transition-all"
                    style={{
                      width: totalRevenue > 0
                        ? `${(filteredOrders.filter(o => o.channel === 'POS' && validRevenueStatuses.includes(String(o.status || '').toUpperCase())).reduce((acc, o) => acc + Number(o.finalAmount || 0), 0) / totalRevenue * 100).toFixed(1)}%`
                        : '0%'
                    }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-outline">Tổng giá trị đơn Online:</span>
                  <span className="font-bold font-mono text-sky-600">
                    {filteredOrders.filter(o => o.channel === 'ONLINE' && validRevenueStatuses.includes(String(o.status || '').toUpperCase())).reduce((acc, o) => acc + Number(o.finalAmount || 0), 0).toLocaleString('vi-VN')} ₫
                  </span>
                </div>
                <div className="w-full bg-[#d8e3fb]/50 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full transition-all"
                    style={{
                      width: totalRevenue > 0
                        ? `${(filteredOrders.filter(o => o.channel === 'ONLINE' && validRevenueStatuses.includes(String(o.status || '').toUpperCase())).reduce((acc, o) => acc + Number(o.finalAmount || 0), 0) / totalRevenue * 100).toFixed(1)}%`
                        : '0%'
                    }}
                  />
                </div>
              </div>
            )}

            <div className="mt-3 p-3 bg-[#f0f3ff] rounded-xl flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#004967] text-[20px] shrink-0">insights</span>
              <p className="text-xs text-[#40484e]">
                Hệ thống báo cáo tự động đồng bộ thời gian thực với cơ sở dữ liệu đơn hàng POS và đơn trực tuyến OMS.
              </p>
            </div>
          </div>

          {/* Branch Performance Comparison */}
          <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-xs">
            <h3 className="text-sm font-bold text-[#111c2d] mb-1">Doanh Số Theo Chi Nhánh</h3>
            <p className="text-xs text-outline mb-3">Số liệu thực tế từ các điểm bán</p>

            {branchList.length === 0 ? (
              <div className="py-12 text-center text-outline bg-slate-50/50 rounded-xl border border-dashed border-[#d8e3fb]">
                <span className="material-symbols-outlined text-3xl text-slate-300 block mb-1">store</span>
                <span className="text-xs font-medium">Chưa có doanh số phát sinh theo chi nhánh</span>
              </div>
            ) : (
              <div className="space-y-3.5">
                {branchList.map((b, idx) => {
                  const pct = totalRevenue > 0 ? ((b.revenue / totalRevenue) * 100).toFixed(1) : '0';
                  return (
                    <div key={b.name}>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-[#111c2d]">{idx + 1}. {b.name}</span>
                        <span className="font-mono text-[#004967]">{b.revenue.toLocaleString('vi-VN')} ₫ ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#f0f3ff]">
                        <div
                          className="h-full rounded-full bg-[#004967]"
                          style={{ width: `${Math.min(100, Number(pct))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Top Selling Products */}
        <div className="bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-[#111c2d]">Top Sản Phẩm Bán Ra Trong Kỳ</h3>
              <p className="text-xs text-[#70787f]">Xếp hạng theo doanh số các sản phẩm được ghi nhận trong đơn hàng</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#e7eeff] text-[#004967] text-xs font-semibold">
              {topProducts.length} sản phẩm
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f0f3ff] text-[#70787f] uppercase font-bold text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Tên Sản Phẩm</th>
                  <th className="py-2.5 px-3 text-center">Số Lượng Đã Bán</th>
                  <th className="py-2.5 px-3 text-right">Doanh Số Ghi Nhận</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8e3fb]/30">
                {topProducts.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-[#70787f]">
                      <span className="material-symbols-outlined text-3xl text-slate-300 block mb-1">inventory_2</span>
                      Chưa có sản phẩm nào được bán trong cơ sở dữ liệu đơn hàng
                    </td>
                  </tr>
                ) : (
                  topProducts.map((p, idx) => (
                    <tr key={idx} className="hover:bg-[#f0f3ff]/50">
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-[#004967]">{p.name}</div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold">{p.quantity}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-[#004967]">
                        {p.revenue.toLocaleString('vi-VN')} ₫
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
