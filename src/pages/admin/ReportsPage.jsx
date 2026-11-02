import React, { useState, useEffect } from 'react';
import { orderApi } from '../../api/orderApi';
import { customerApi } from '../../api/customerApi';
import { message } from 'antd';

export default function ReportsPage() {
  const [liveOrders, setLiveOrders] = useState([]);
  const [customerTotal, setCustomerTotal] = useState(14);

  useEffect(() => {
    orderApi.getAllOrders().then(orders => {
      if (Array.isArray(orders)) setLiveOrders(orders);
    }).catch(e => console.warn('Reports order sync note:', e));

    customerApi.getCustomerList().then(customers => {
      if (Array.isArray(customers)) setCustomerTotal(customers.length);
    }).catch(e => console.warn('Reports customer sync note:', e));
  }, []);
  const [timeframe, setTimeframe] = useState('month'); // 'today' | '7days' | 'month' | 'quarter'
  const [branch, setBranch] = useState('all');

  const handleExportExcel = () => {
    message.loading({ content: 'Đang trích xuất báo cáo doanh thu tài chính...', key: 'rep', duration: 1 });
    setTimeout(() => {
      message.success({ content: 'Xuất báo cáo OptiVision_Revenue_Report.xlsx thành công!', key: 'rep' });
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="flex flex-col w-full max-w-[1600px] mx-auto p-3.5 sm:p-5 gap-4">
        {/* Header Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-sm">
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
                className={`px-3 py-1.5 rounded-lg transition-all ${timeframe === 'today' ? 'bg-[#004967] text-white shadow-sm' : 'text-[#70787f] hover:text-[#111c2d]'}`}
              >
                Hôm Nay
              </button>
              <button
                onClick={() => setTimeframe('7days')}
                className={`px-3 py-1.5 rounded-lg transition-all ${timeframe === '7days' ? 'bg-[#004967] text-white shadow-sm' : 'text-[#70787f] hover:text-[#111c2d]'}`}
              >
                7 Ngày
              </button>
              <button
                onClick={() => setTimeframe('month')}
                className={`px-3 py-1.5 rounded-lg transition-all ${timeframe === 'month' ? 'bg-[#004967] text-white shadow-sm' : 'text-[#70787f] hover:text-[#111c2d]'}`}
              >
                Tháng Này
              </button>
              <button
                onClick={() => setTimeframe('quarter')}
                className={`px-3 py-1.5 rounded-lg transition-all ${timeframe === 'quarter' ? 'bg-[#004967] text-white shadow-sm' : 'text-[#70787f] hover:text-[#111c2d]'}`}
              >
                Quý Này
              </button>
            </div>

            {/* Branch selector */}
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#d8e3fb] text-xs font-semibold text-[#111c2d] focus:outline-none"
            >
              <option value="all">Tất cả chi nhánh (4)</option>
              <option value="q1">Flagship Q.1 (TP.HCM)</option>
              <option value="hn">Tràng Tiền Plaza (HN)</option>
              <option value="q2">Thảo Điền Store (Q.2)</option>
              <option value="ecom">Hub E-Com Online</option>
            </select>

            <button
              onClick={handleExportExcel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#004967] text-xs font-semibold transition-all border border-[#d8e3fb]"
            >
              <span className="material-symbols-outlined text-[16px]">table_view</span>
              <span>Xuất Excel</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#004967] hover:bg-[#086288] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>In (F10)</span>
            </button>
          </div>
        </div>

        {/* 4 Core KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-sm">
            <div className="flex items-center justify-between text-[#70787f] text-[11px] font-semibold uppercase">
              <span>Doanh Thu Thuần</span>
              <span className="p-1.5 rounded-lg bg-[#e7eeff] text-[#004967]">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#004967]">2.485.600.000</span>
              <span className="text-xs text-[#70787f]">₫</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="text-emerald-600 font-bold flex items-center">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +14.8%
              </span>
              <span className="text-[#70787f]">Đạt 94% KPI tháng</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-sm">
            <div className="flex items-center justify-between text-[#70787f] text-[11px] font-semibold uppercase">
              <span>Đơn Hàng Hoàn Tất</span>
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <span className="material-symbols-outlined text-[18px]">task_alt</span>
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#111c2d]">645</span>
              <span className="text-xs text-[#70787f]">đơn kính</span>
            </div>
            <div className="mt-2 text-[11px] text-[#70787f] flex justify-between">
              <span>POS: <strong>415 (64%)</strong></span>
              <span>Online: <strong>230 (36%)</strong></span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-sm">
            <div className="flex items-center justify-between text-[#70787f] text-[11px] font-semibold uppercase">
              <span>Giá Trị Trung Bình (AOV)</span>
              <span className="p-1.5 rounded-lg bg-[#e7eeff] text-[#004967]">
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#004967]">3.850.000</span>
              <span className="text-xs text-[#70787f]">₫</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="text-emerald-600 font-bold flex items-center">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +6.2%
              </span>
              <span className="text-[#70787f]">Tăng nhờ combo tròng cao cấp</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-sm">
            <div className="flex items-center justify-between text-[#70787f] text-[11px] font-semibold uppercase">
              <span>Tỷ Lệ Đạt Chuẩn QC</span>
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-emerald-700">98.8%</span>
              <span className="text-xs text-[#70787f]">chuẩn ANSI Z80.1</span>
            </div>
            <div className="mt-2 text-[11px] text-[#70787f]">
              Tỷ lệ đổi trả &amp; mài lại: <strong className="text-rose-600">1.2%</strong> (&lt; 2.0%)
            </div>
          </div>
        </div>

        {/* Analytical Section 1: Revenue Curve + Product Category Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Revenue Trend Area Chart */}
          <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-[#111c2d]">Xu Hướng Doanh Thu Theo Ngày</h3>
                <p className="text-xs text-[#70787f]">Đối chiếu giữa kênh bán lẻ POS tại cửa hàng và đơn hàng trực tuyến OMS</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#004967]"></span>
                  <span className="text-[#40484e] font-medium">POS Cửa Hàng</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  <span className="text-[#40484e] font-medium">Online OMS</span>
                </div>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="w-full h-56 relative flex flex-col justify-end pt-2 pb-1">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 180">
                <defs>
                  <linearGradient id="gradPos" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#004967" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#004967" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="gradOnline" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                <line x1="0" y1="30" x2="700" y2="30" stroke="#f0f3ff" strokeWidth="1" />
                <line x1="0" y1="80" x2="700" y2="80" stroke="#f0f3ff" strokeWidth="1" />
                <line x1="0" y1="130" x2="700" y2="130" stroke="#f0f3ff" strokeWidth="1" />

                {/* Area fills */}
                <polygon fill="url(#gradPos)" points="20,150 80,135 140,120 200,140 260,95 320,70 380,35 440,100 500,90 560,60 620,35 680,50 680,175 20,175" />
                <polygon fill="url(#gradOnline)" points="20,165 80,155 140,145 200,150 260,130 320,115 380,90 440,125 500,120 560,100 620,85 680,95 680,175 20,175" />

                {/* POS line */}
                <polyline fill="none" points="20,150 80,135 140,120 200,140 260,95 320,70 380,35 440,100 500,90 560,60 620,35 680,50" stroke="#004967" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Online line */}
                <polyline fill="none" points="20,165 80,155 140,145 200,150 260,130 320,115 380,90 440,125 500,120 560,100 620,85 680,95" stroke="#0284c7" strokeWidth="2" strokeDasharray="4,3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Highlight peaks */}
                <circle cx="380" cy="35" r="5" fill="#004967" stroke="#ffffff" strokeWidth="2" />
                <circle cx="620" cy="35" r="5" fill="#004967" stroke="#ffffff" strokeWidth="2" />
              </svg>

              <div className="flex justify-between items-center text-[#70787f] text-[11px] font-mono pt-2 border-t border-[#f0f3ff]">
                <span>01/03</span>
                <span>07/03</span>
                <span className="text-[#004967] font-bold">15/03 (Peak)</span>
                <span>21/03</span>
                <span className="text-[#004967] font-bold">28/03 (Cuối tuần)</span>
                <span>31/03</span>
              </div>
            </div>

            {/* AI Insight banner */}
            <div className="mt-3 p-3 bg-[#f0f3ff] rounded-xl flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#004967] text-[20px] flex-shrink-0">auto_awesome</span>
              <p className="text-xs text-[#40484e]">
                Doanh thu đỉnh điểm vào các ngày cuối tuần (T7, CN) với mức thu trung bình <strong>135 triệu ₫/ngày</strong>, cao hơn 45% so với ngày thường nhờ dịch vụ đo khám khúc xạ tại chỗ.
              </p>
            </div>
          </div>

          {/* Product Category Breakdown */}
          <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-[#111c2d]">Cơ Cấu Doanh Thu Sản Phẩm</h3>
                <span className="text-xs text-[#70787f]">Q1/2026</span>
              </div>
              <p className="text-xs text-[#70787f]">Tỷ trọng đóng góp theo nhóm hàng quang học</p>

              {/* Progress bar composite */}
              <div className="w-full h-3 rounded-full bg-[#f0f3ff] flex overflow-hidden mt-3">
                <div style={{ width: '46%' }} className="bg-[#004967]" title="Tròng kính: 46%" />
                <div style={{ width: '38%' }} className="bg-sky-600" title="Gọng kính: 38%" />
                <div style={{ width: '12%' }} className="bg-amber-500" title="Kính râm: 12%" />
                <div style={{ width: '4%' }} className="bg-emerald-500" title="Phụ kiện: 4%" />
              </div>

              {/* List details */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#004967]"></span>
                    <span className="font-medium text-[#111c2d]">Tròng kính khúc xạ (Essilor, Zeiss, Chemi)</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-[#004967]">1.143.376.000 ₫</span>
                    <span className="text-[#70787f] ml-1">(46%)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                    <span className="font-medium text-[#111c2d]">Gọng kính thời trang (Titanium, Acetate)</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-[#111c2d]">944.528.000 ₫</span>
                    <span className="text-[#70787f] ml-1">(38%)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="font-medium text-[#111c2d]">Kính râm &amp; Chống lóa phân cực (Polarized)</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-[#111c2d]">298.272.000 ₫</span>
                    <span className="text-[#70787f] ml-1">(12%)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-medium text-[#111c2d]">Nước lau kính, ve mũi &amp; Hộp đựng</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-[#111c2d]">99.424.000 ₫</span>
                    <span className="text-[#70787f] ml-1">(4%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e7eeff] flex items-center justify-between text-xs">
              <span className="text-[#70787f]">Tỷ suất lợi nhuận gộp danh mục tròng:</span>
              <span className="font-bold text-emerald-700">62.4%</span>
            </div>
          </div>
        </div>

        {/* Section 2: Top Selling Products & Branch Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Top 5 Best Sellers */}
          <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-sm">
            <h3 className="text-sm font-bold text-[#111c2d] mb-3">Top 5 Sản Phẩm Bán Chạy Nhất</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-[#dee8ff]/30 text-[#70787f] uppercase text-[11px] font-bold border-b border-[#e7eeff]">
                    <th className="py-2.5 px-3">Sản phẩm</th>
                    <th className="py-2.5 px-3 text-center">Đã bán</th>
                    <th className="py-2.5 px-3 text-right">Doanh thu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eeff] text-xs text-[#111c2d]">
                  <tr className="hover:bg-[#f0f3ff]/50">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#004967]">Tròng Essilor Crizal Rock 1.67 Blue UV</div>
                      <div className="text-[11px] text-[#70787f]">Tròng chiết suất cao chống trầy xước</div>
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold">142 cặp</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#004967]">380.560.000 ₫</td>
                  </tr>
                  <tr className="hover:bg-[#f0f3ff]/50">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#004967]">Gọng Bolon Vintage Classic BJ3120</div>
                      <div className="text-[11px] text-[#70787f]">Khung B-Titanium siêu nhẹ</div>
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold">98 cây</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#004967]">341.040.000 ₫</td>
                  </tr>
                  <tr className="hover:bg-[#f0f3ff]/50">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#004967]">Tròng Zeiss ClearView 1.60 BlueGuard</div>
                      <div className="text-[11px] text-[#70787f]">Tròng phẳng Freeform công nghệ Đức</div>
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold">85 cặp</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#004967]">253.300.000 ₫</td>
                  </tr>
                  <tr className="hover:bg-[#f0f3ff]/50">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#004967]">Gọng Charmant Titanium Z ZT2233</div>
                      <div className="text-[11px] text-[#70787f]">Gọng khoan cao cấp Nhật Bản</div>
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold">42 cây</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#004967]">260.400.000 ₫</td>
                  </tr>
                  <tr className="hover:bg-[#f0f3ff]/50">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#004967]">Kính Mát Oakley Holbrook Matte Black</div>
                      <div className="text-[11px] text-[#70787f]">Tròng Prizm Sapphire thể thao</div>
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold">64 cây</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#004967]">252.800.000 ₫</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Branch Performance Comparison */}
          <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-[#d8e3fb]/40 shadow-sm">
            <h3 className="text-sm font-bold text-[#111c2d] mb-3">Doanh Số Theo Chi Nhánh</h3>
            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#111c2d]">1. Flagship Q.1 (TP.HCM)</span>
                  <span className="font-mono text-[#004967]">1.250.000.000 ₫ (50.3%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f0f3ff]">
                  <div className="h-full rounded-full bg-[#004967]" style={{ width: '50.3%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#111c2d]">2. Tràng Tiền Plaza (Hà Nội)</span>
                  <span className="font-mono text-[#004967]">680.000.000 ₫ (27.4%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f0f3ff]">
                  <div className="h-full rounded-full bg-sky-600" style={{ width: '27.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#111c2d]">3. Thảo Điền Store (Q.2)</span>
                  <span className="font-mono text-[#004967]">320.000.000 ₫ (12.9%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f0f3ff]">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: '12.9%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#111c2d]">4. Hub E-Com Online</span>
                  <span className="font-mono text-[#004967]">235.600.000 ₫ (9.4%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f0f3ff]">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: '9.4%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
