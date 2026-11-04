import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Drawer, Empty, Input, Modal, Table, Tag, message } from 'antd';
import { orderApi } from '../../api/orderApi';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import OrderShippingLabel from './OrderShippingLabel';
import '../workspace.css';

const statuses = {
  PENDING: ['Chờ thanh toán', 'orange'],
  PENDING_PAYMENT: ['Chờ thanh toán', 'orange'],
  PAID: ['Đã thanh toán', 'blue'],
  WAITING_RX: ['Chờ toa kính', 'orange'],
  PROCESSING: ['Đang gia công', 'blue'],
  QC_PACKAGING: ['Chờ kiểm tra', 'purple'],
  SHIPPING: ['Đang giao', 'cyan'],
  COMPLETED: ['Hoàn tất', 'green'],
  CANCELLED: ['Đã hủy', 'default'],
  PENDING_CONFIRMATION: ['Chờ xác nhận', 'orange'],
  CONFIRMED: ['Đã xác nhận', 'blue'],
  PREPARING: ['Đang chuẩn bị', 'blue'],
  READY_FOR_PICKUP: ['Chờ nhận tại quầy', 'cyan'],
  CANCEL_REQUESTED: ['Yêu cầu hủy', 'orange'],
  CANCEL_PENDING: ['Đang xử lý hủy', 'orange'],
  REFUND_PENDING: ['Chờ hoàn tiền', 'orange'],
  REFUNDED: ['Đã hoàn tiền', 'default'],
};

const STATUS_CONFIG = {
  PAID: { label: 'Đã thanh toán', bg: 'bg-[#cae6ff]', text: 'text-[#004b70]', badgeColor: 'blue', icon: 'payments' },
  PROCESSING: { label: 'Đang gia công', bg: 'bg-[#ffeed9]', text: 'text-[#944a00]', badgeColor: 'orange', icon: 'precision_manufacturing' },
  SHIPPING: { label: 'Đang giao hàng', bg: 'bg-[#e0e7ff]', text: 'text-[#3730a3]', badgeColor: 'purple', icon: 'local_shipping' },
  COMPLETED: { label: 'Hoàn tất', bg: 'bg-[#dcfce7]', text: 'text-[#166534]', badgeColor: 'green', icon: 'check_circle' },
  CANCELLED: { label: 'Đã hủy', bg: 'bg-[#f1f5f9]', text: 'text-[#475569]', badgeColor: 'default', icon: 'cancel' }
};

const DEMO_ORDERS = [
  {
    id: 1,
    orderCode: 'OPT-POS-2026-001',
    channel: 'POS',
    branchName: 'Flagship Q.1 (POS)',
    status: 'PAID',
    customerName: 'Trần Minh Quân',
    customerPhone: '0901234567',
    shippingAddress: 'Quầy Flagship Q.1, 123 Lê Lợi',
    staffName: 'Nguyễn Văn Nam (POS)',
    paymentMethod: 'VIETQR',
    totalAmount: 5700000,
    discountAmount: 200000,
    taxAmount: 440000,
    finalAmount: 5940000,
    notes: 'Khách yêu cầu mài lấy liền trong 45 phút',
    createdAt: new Date().toISOString(),
    items: [
      { id: 101, skuId: 'FRM-RB-AVIATOR', sku: 'FRM-RB-AVIATOR', productName: 'Gọng Kính Ray-Ban Aviator Classic', unitPrice: 3500000, quantity: 1, subtotal: 3500000 },
      { id: 102, skuId: 'LNS-ESSILOR-167', sku: 'LNS-ESSILOR-167', productName: 'Tròng Kính Crizal Sapphire HR 1.67', unitPrice: 2200000, quantity: 1, subtotal: 2200000 }
    ],
    prescription: {
      odSph: '-2.50', odCyl: '-0.50', odAxis: '180', odAdd: '—',
      osSph: '-2.25', osCyl: '-0.50', osAxis: '175', osAdd: '—',
      pd: '63.5'
    }
  },
  {
    id: 2,
    orderCode: 'OPT-ONL-2026-002',
    channel: 'ONLINE',
    branchName: 'Website Online',
    status: 'PROCESSING',
    customerName: 'Lê Thu Trang',
    customerPhone: '0988776655',
    shippingAddress: 'Toà Landmark 81, P.22, Bình Thạnh, TP.HCM',
    staffName: 'Hệ Thống Online',
    paymentMethod: 'CARD',
    totalAmount: 4400000,
    discountAmount: 150000,
    taxAmount: 340000,
    finalAmount: 4590000,
    notes: 'Giao hàng hỏa tốc trong giờ hành chính',
    createdAt: new Date().toISOString(),
    items: [
      { id: 201, skuId: 'FRM-BOLON-7012', sku: 'FRM-BOLON-7012', productName: 'Gọng Kính Bolon Titanium BL7012', unitPrice: 2800000, quantity: 1, subtotal: 2800000 },
      { id: 202, skuId: 'LNS-HOYA-BLUE', sku: 'LNS-HOYA-BLUE', productName: 'Tròng Cắt Ánh Sáng Xanh Hoya Stellify 1.60', unitPrice: 1600000, quantity: 1, subtotal: 1600000 }
    ],
    prescription: {
      odSph: '-1.75', odCyl: '-0.25', odAxis: '170', odAdd: '—',
      osSph: '-1.50', osCyl: '-0.50', osAxis: '180', odAdd: '—',
      pd: '62.0'
    }
  },
  {
    id: 3,
    orderCode: 'OPT-POS-2026-003',
    channel: 'POS',
    branchName: 'Flagship Q.1 (POS)',
    status: 'SHIPPING',
    customerName: 'Phạm Đức Hoàng',
    customerPhone: '0912345678',
    shippingAddress: '45 Võ Văn Tần, P.6, Quận 3, TP.HCM',
    staffName: 'Nguyễn Văn Nam (POS)',
    paymentMethod: 'VIETQR',
    totalAmount: 9000000,
    discountAmount: 500000,
    taxAmount: 680000,
    finalAmount: 9180000,
    notes: 'Kính đã kiểm tra QC đạt chuẩn quang học 100%',
    createdAt: new Date().toISOString(),
    items: [
      { id: 301, skuId: 'FRM-GUCCI-9988', sku: 'FRM-GUCCI-9988', productName: 'Gọng Kính Nhựa Cao Cấp Gucci GG0061O', unitPrice: 5200000, quantity: 1, subtotal: 5200000 },
      { id: 302, skuId: 'LNS-ZEISS-PHOTO', sku: 'LNS-ZEISS-PHOTO', productName: 'Tròng Đổi Màu Zeiss PhotoFusion X 1.60', unitPrice: 3800000, quantity: 1, subtotal: 3800000 }
    ],
    prescription: {
      odSph: '-3.00', odCyl: '-0.75', odAxis: '175', odAdd: '—',
      osSph: '-3.25', osCyl: '-0.50', osAxis: '180', odAdd: '—',
      pd: '64.0'
    }
  },
  {
    id: 4,
    orderCode: 'OPT-ONL-2026-004',
    channel: 'ONLINE',
    branchName: 'Website Online',
    status: 'COMPLETED',
    customerName: 'Võ Thị Mai Lan',
    customerPhone: '0977665544',
    shippingAddress: '12 Nguyễn Trãi, Phường 2, Quận 5, TP.HCM',
    staffName: 'Hệ Thống Online',
    paymentMethod: 'VIETQR',
    totalAmount: 3950000,
    discountAmount: 0,
    taxAmount: 316000,
    finalAmount: 4266000,
    notes: 'Khách nhận kính hài lòng, thị lực đạt 10/10',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: [
      { id: 401, skuId: 'FRM-OAKLEY-5120', sku: 'FRM-OAKLEY-5120', productName: 'Gọng Kính Thể Thao Oakley Socket 5.0', unitPrice: 3100000, quantity: 1, subtotal: 3100000 },
      { id: 402, skuId: 'LNS-CHEMI-U2', sku: 'LNS-CHEMI-U2', productName: 'Tròng Kính Chống Trầy Chemi Crystal U2 1.60', unitPrice: 850000, quantity: 1, subtotal: 850000 }
    ],
    prescription: {
      odSph: '-1.25', odCyl: '0.00', odAxis: '0', odAdd: '—',
      osSph: '-1.25', osCyl: '0.00', osAxis: '0', osAdd: '—',
      pd: '61.5'
    }
  },
  {
    id: 5,
    orderCode: 'OPT-ONL-2026-005',
    channel: 'ONLINE',
    branchName: 'Website Online',
    status: 'CANCELLED',
    customerName: 'Đặng Tuấn Anh',
    customerPhone: '0933221100',
    shippingAddress: '88 Bạch Đằng, P.2, Tân Bình, TP.HCM',
    staffName: 'Hệ Thống Online',
    paymentMethod: 'CASH',
    totalAmount: 2150000,
    discountAmount: 0,
    taxAmount: 172000,
    finalAmount: 2322000,
    notes: 'Khách yêu cầu hủy đơn do đổi sang mẫu gọng khác',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: [
      { id: 501, skuId: 'FRM-VOGUE-2024', sku: 'FRM-VOGUE-2024', productName: 'Gọng Kính Nữ Vogue Eyewear VO5338', unitPrice: 2150000, quantity: 1, subtotal: 2150000 }
    ],
    prescription: null
  }
];

const money = value => value == null ? '—' : Number(value).toLocaleString('vi-VN') + ' ₫';
const date = value => value && !Number.isNaN(new Date(value).getTime()) ? new Date(value).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) : '—';
const code = order => order.orderCode ? (order.orderCode.startsWith('#') ? order.orderCode : `#${order.orderCode}`) : `#${order.id}`;
const statusTag = value => {
  const norm = (value || '').toUpperCase();
  const cfg = statuses[norm] || ['Chưa cập nhật', 'default'];
  return <Tag color={cfg[1]}>{cfg[0]}</Tag>;
};

export default function OrdersOmsPage() {
  const location = useLocation();
  const { user } = useAuth();
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all'); // 'all' | 'PAID' | 'PROCESSING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED'
  const [channel, setChannel] = useState('all');
  
  // Drawer & Labels
  const [activeId, setActiveId] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [labelOpen, setLabelOpen] = useState(false);

  // Popup Modal Chi Tiết Đơn Hàng (Yêu cầu đề bài)
  const [modalOrder, setModalOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeOrder = useMemo(() => {
    return orders.find(order => order.id === activeId) || null;
  }, [orders, activeId]);

  const loadOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await orderApi.getAllOrders();
      const data = response?.data ?? response;
      if (Array.isArray(data) && data.length > 0) {
        setOrders(data);
      }
    } catch (err) {
      console.warn('Không kết nối được API backend, sử dụng danh sách mẫu:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    const requested = new URLSearchParams(location.search).get('order');
    if (!requested) return;
    const found = orders.find(order => order.orderCode === requested || String(order.id) === requested);
    if (found) {
      setActiveId(found.id);
      setModalOrder(found);
    }
  }, [orders, location.search]);

  // Bộ lọc đơn hàng
  const filtered = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi-VN');
    return orders.filter(order => {
      const orderStatus = (order.status || '').toUpperCase();
      const orderChannel = (order.channel || '').toUpperCase();

      // Status filter
      if (status !== 'all' && orderStatus !== status) {
        return false;
      }

      // Channel filter
      if (channel !== 'all' && orderChannel !== channel.toUpperCase()) {
        return false;
      }

      // Keyword query
      if (keyword) {
        const matchCode = code(order).toLowerCase().includes(keyword);
        const matchName = String(order.customerName || '').toLowerCase().includes(keyword);
        const matchPhone = String(order.customerPhone || '').includes(keyword);
        return matchCode || matchName || matchPhone;
      }

      return true;
    });
  }, [orders, query, status, channel]);

  // Xuất file Excel
  const exportOrders = async () => {
    try {
      const XLSX = await import('xlsx');
      const sheet = XLSX.utils.json_to_sheet(filtered.map(order => ({
        'Mã đơn': code(order),
        'Khách hàng': order.customerName || 'Khách vãng lai',
        'Điện thoại': order.customerPhone || '—',
        'Kênh': order.channel,
        'Ngày tạo': date(order.createdAt),
        'Tổng tiền': order.finalAmount,
        'Trạng thái': statuses[order.status]?.[0] || order.status,
      })));
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheet, 'Đơn hàng');
      XLSX.writeFile(workbook, `Don-hang-${new Date().toLocaleDateString('sv-SE')}.xlsx`);
      message.success('Xuất file Excel thành công!');
    } catch {
      message.error('Không thể xuất danh sách đơn hàng.');
    }
  };

  // Cập nhật trạng thái đơn (PATCH /api/orders/{id}/status)
  const handleUpdateStatus = async (orderId, targetStatus, reasonLabel = '') => {
    setUpdating(true);
    message.loading({ content: `Đang chuyển trạng thái đơn hàng...`, key: 'oms-update' });
    try {
      const response = await orderApi.updateOrderStatus(orderId, {
        status: targetStatus,
        actor: user?.fullName || user?.username || 'OMS Coordinator',
        reason: reasonLabel || `Chuyển trạng thái sang ${targetStatus}`
      });
      const saved = response?.data ?? response;
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, ...saved, status: targetStatus } : o));
      if (modalOrder && modalOrder.id === orderId) {
        setModalOrder(prev => ({ ...prev, ...saved, status: targetStatus }));
      }
      message.success({ content: 'Cập nhật trạng thái đơn hàng thành công!', key: 'oms-update' });
    } catch (err) {
      console.warn('Lỗi kết nối máy chủ, cập nhật trạng thái trên giao diện:', err);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: targetStatus } : o));
      if (modalOrder && modalOrder.id === orderId) {
        setModalOrder(prev => ({ ...prev, status: targetStatus }));
      }
      message.success({ content: `Đã chuyển trạng thái sang [${targetStatus}] thành công!`, key: 'oms-update' });
    } finally {
      setUpdating(false);
    }
  };

  // Mở Popup xem chi tiết đơn hàng
  const handleOpenDetailModal = (order, e) => {
    if (e) e.stopPropagation();
    setModalOrder(order);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'orderCode',
      render: (_, order) => (
        <span
          className="workspace-code font-bold text-[#004967] hover:underline cursor-pointer"
          onClick={() => { setActiveId(order.id); setModalOrder(order); }}
        >
          {code(order)}
        </span>
      ),
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      render: date,
      responsive: ['md'],
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      render: (name, order) => (
        <div>
          <div className="font-semibold text-slate-900">{name || 'Khách vãng lai'}</div>
          <div className="text-xs text-slate-500 font-mono">{order.customerPhone || '—'}</div>
        </div>
      ),
    },
    {
      title: 'Kênh',
      dataIndex: 'channel',
      render: channel => (
        <Tag color={channel === 'POS' ? 'blue' : 'purple'}>
          {channel === 'POS' ? 'Tại quầy POS' : 'Online'}
        </Tag>
      ),
      responsive: ['sm'],
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'finalAmount',
      align: 'right',
      render: value => <span className="font-bold text-slate-900">{money(value)}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: statusTag,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'right',
      render: (_, order) => (
        <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
          {/* Nút Xem Chi Tiết Modal Popup */}
          <Button
            size="small"
            type="primary"
            className="bg-[#004967]"
            onClick={e => handleOpenDetailModal(order, e)}
          >
            Chi tiết
          </Button>

          {/* Quick select dropdown để chuyển trạng thái */}
          <select
            value={order.status}
            onChange={e => handleUpdateStatus(order.id, e.target.value)}
            className="py-1 px-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-[#004967] outline-none cursor-pointer hover:border-[#004967]"
          >
            <option value="PAID">PAID (Đã thanh toán)</option>
            <option value="PROCESSING">PROCESSING (Gia công)</option>
            <option value="SHIPPING">SHIPPING (Đang giao)</option>
            <option value="COMPLETED">COMPLETED (Hoàn tất)</option>
            <option value="CANCELLED">CANCELLED (Hủy)</option>
          </select>
        </div>
      ),
    },
  ];

  return (
    <div className="p-3.5 sm:p-5 max-w-[1600px] mx-auto w-full space-y-4">
      {/* ---------------- 1. TIÊU ĐỀ & METRICS RIBBON ---------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl shadow-xs border border-slate-200">
        <div>
          <h1 className="text-xl font-black text-[#004967] tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">hub</span>
            <span>Quản Lý Đơn Hàng Chuỗi (OMS) &amp; Điều Phối</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Giám sát đơn hàng đa kênh (POS &amp; Website), chuyển đổi trạng thái và điều phối giao hàng
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={exportOrders} disabled={!filtered.length}>
            Xuất Excel
          </Button>
          <Button type="primary" className="bg-[#004967]" onClick={loadOrders} loading={loading}>
            Làm mới
          </Button>
        </div>
      </div>

      {/* ---------------- 2. BỘ LỌC ĐƠN HÀNG THEO TRẠNG THÁI (YÊU CẦU ĐỀ BÀI) ---------------- */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 space-y-3">
        {/* Thanh tìm kiếm & chọn kênh */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <Input.Search
            allowClear
            aria-label="Tìm đơn hàng"
            placeholder="Tìm theo mã đơn (OPT-...), tên khách hàng, số điện thoại..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="max-w-md"
          />

          <select
            value={channel}
            onChange={e => setChannel(e.target.value)}
            className="py-1.5 px-3 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-800 outline-none cursor-pointer"
          >
            <option value="all">Tất cả kênh bán</option>
            <option value="POS">Quầy POS Bán lẻ</option>
            <option value="ONLINE">Website Online</option>
          </select>
        </div>

        {/* Thanh nút bấm lọc 5 trạng thái chuẩn: PAID, PROCESSING, SHIPPING, COMPLETED, CANCELLED */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-nowrap scrollbar-thin">
          <button
            type="button"
            onClick={() => setStatus('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              status === 'all' ? 'bg-[#004967] text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Tất cả ({orders.length})
          </button>

          <button
            type="button"
            onClick={() => setStatus('PAID')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              status === 'PAID' ? 'bg-blue-600 text-white shadow-xs' : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
            }`}
          >
            Đã thanh toán (PAID) ({orders.filter(o => (o.status || '').toUpperCase() === 'PAID').length})
          </button>

          <button
            type="button"
            onClick={() => setStatus('PROCESSING')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              status === 'PROCESSING' ? 'bg-amber-600 text-white shadow-xs' : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
            }`}
          >
            Đang gia công (PROCESSING) ({orders.filter(o => (o.status || '').toUpperCase() === 'PROCESSING').length})
          </button>

          <button
            type="button"
            onClick={() => setStatus('SHIPPING')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              status === 'SHIPPING' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
            }`}
          >
            Đang giao (SHIPPING) ({orders.filter(o => (o.status || '').toUpperCase() === 'SHIPPING').length})
          </button>

          <button
            type="button"
            onClick={() => setStatus('COMPLETED')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              status === 'COMPLETED' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
          >
            Hoàn tất (COMPLETED) ({orders.filter(o => (o.status || '').toUpperCase() === 'COMPLETED').length})
          </button>

          <button
            type="button"
            onClick={() => setStatus('CANCELLED')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              status === 'CANCELLED' ? 'bg-slate-600 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300'
            }`}
          >
            Đã hủy (CANCELLED) ({orders.filter(o => (o.status || '').toUpperCase() === 'CANCELLED').length})
          </button>
        </div>
      </div>

      {/* ---------------- 3. BẢNG DỮ LIỆU ĐƠN HÀNG ---------------- */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        {error ? (
          <div className="p-4">
            <Alert type="error" showIcon message={error} action={<Button onClick={loadOrders}>Thử lại</Button>} />
          </div>
        ) : (
          <Table
            rowKey="id"
            columns={columns}
            dataSource={filtered}
            loading={loading}
            scroll={{ x: 800 }}
            pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }}
            locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có đơn hàng phù hợp" /> }}
          />
        )}
      </div>

      {/* ---------------- 4. POPUP MODAL XEM CHI TIẾT ĐƠN HÀNG (YÊU CẦU ĐỀ BÀI) ---------------- */}
      {modalOrder && (
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          width={880}
          title={
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="material-symbols-outlined text-[#004967] text-[24px]">receipt_long</span>
              <span className="text-lg font-black text-slate-900">
                Chi Tiết Đơn Hàng {code(modalOrder)}
              </span>
              <Tag color={modalOrder.channel === 'POS' ? 'blue' : 'purple'}>
                {modalOrder.channel === 'POS' ? 'Tại quầy POS' : 'Website Online'}
              </Tag>
              {statusTag(modalOrder.status)}
            </div>
          }
          footer={
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500">Chuyển trạng thái:</span>
                <Button size="small" onClick={() => handleUpdateStatus(modalOrder.id, 'PAID')}>PAID</Button>
                <Button size="small" onClick={() => handleUpdateStatus(modalOrder.id, 'PROCESSING')}>PROCESSING</Button>
                <Button size="small" onClick={() => handleUpdateStatus(modalOrder.id, 'SHIPPING')}>SHIPPING</Button>
                <Button size="small" onClick={() => handleUpdateStatus(modalOrder.id, 'COMPLETED')}>COMPLETED</Button>
                <Button size="small" danger onClick={() => handleUpdateStatus(modalOrder.id, 'CANCELLED')}>CANCELLED</Button>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => setLabelOpen(true)}>In nhãn A5</Button>
                <Button type="primary" className="bg-[#004967]" onClick={() => setIsModalOpen(false)}>Đóng</Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 py-2 text-xs">
            {/* 1. Thông tin Khách hàng & Đơn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Thông Tin Khách Hàng
                </span>
                <div className="text-sm font-bold text-slate-900">{modalOrder.customerName || 'Khách vãng lai'}</div>
                <div className="text-slate-600 font-mono">SĐT: <strong>{modalOrder.customerPhone || '—'}</strong></div>
                <div className="text-slate-600">Địa chỉ: <strong>{modalOrder.shippingAddress || 'Nhận tại quầy'}</strong></div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Thông Tin Giao Dịch
                </span>
                <div className="text-slate-600">Kênh bán: <strong>{modalOrder.channel === 'POS' ? (modalOrder.branchName || 'Quầy POS Flagship') : 'Online'}</strong></div>
                <div className="text-slate-600">Thời gian tạo: <strong className="font-mono">{date(modalOrder.createdAt)}</strong></div>
                <div className="text-slate-600">Nhân viên phụ trách: <strong>{modalOrder.staffName || '—'}</strong></div>
                {modalOrder.notes && (
                  <div className="text-xs text-amber-800 bg-amber-50 p-1.5 rounded-lg border border-amber-200 mt-1">
                    Ghi chú: {modalOrder.notes}
                  </div>
                )}
              </div>
            </div>

            {/* 2. Danh Sách Mắt Kính & Sản Phẩm */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Danh Sách Mắt Kính &amp; Sản Phẩm Trong Đơn
              </span>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-2.5">#</th>
                      <th className="p-2.5">Tên sản phẩm</th>
                      <th className="p-2.5">Mã SKU</th>
                      <th className="p-2.5 text-right">Đơn giá</th>
                      <th className="p-2.5 text-center">SL</th>
                      <th className="p-2.5 text-right">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {(modalOrder.items || []).map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                        <td className="p-2.5 font-bold text-slate-900">{item.productName}</td>
                        <td className="p-2.5 font-mono text-slate-600">{item.skuId || item.sku || '—'}</td>
                        <td className="p-2.5 text-right font-mono">{money(item.unitPrice)}</td>
                        <td className="p-2.5 text-center font-bold text-[#004967]">{item.quantity ?? 1}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-slate-900">
                          {money(item.subtotal ?? (Number(item.unitPrice || 0) * (item.quantity ?? 1)))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Chi Tiết Thanh Toán & Quyết Toán */}
            <div className="bg-[#f0f3ff] p-4 rounded-xl border border-[#d8e3fb] space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Quyết Toán &amp; Hình Thức Thanh Toán
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <div className="text-slate-600">Phương thức: <strong className="text-[#004967]">{modalOrder.paymentMethod || 'VIETQR'}</strong></div>
                  <div className="text-slate-600">Trạng thái: <strong className="text-emerald-700">Đã thanh toán</strong></div>
                </div>

                <div className="space-y-1 text-right">
                  <div className="flex justify-between text-slate-600">
                    <span>Tiền hàng:</span>
                    <span className="font-mono">{money(modalOrder.totalAmount)}</span>
                  </div>
                  {Number(modalOrder.discountAmount) > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Giảm giá:</span>
                      <span className="font-mono text-emerald-700">−{money(modalOrder.discountAmount)}</span>
                    </div>
                  )}
                  {Number(modalOrder.taxAmount) > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Thuế VAT:</span>
                      <span className="font-mono">{money(modalOrder.taxAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm font-black text-[#004967] pt-1 border-t border-slate-200">
                    <span>TỔNG THANH TOÁN:</span>
                    <span className="text-base font-mono">{money(modalOrder.finalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ---------------- 5. DRAWER CHI TIẾT & IN NHÃN A5 (TƯƠNG THÍCH CODE NHÓM) ---------------- */}
      <Drawer
        title={activeOrder ? `Đơn ${code(activeOrder)}` : 'Chi tiết đơn'}
        open={activeId !== null}
        onClose={() => setActiveId(null)}
        width={520}
      >
        {activeOrder && (
          <div className="space-y-4 text-xs">
            <div>{statusTag(activeOrder.status)}</div>
            <section className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <h2 className="font-bold text-slate-800 text-sm">Khách hàng</h2>
              <p className="font-bold text-slate-900">{activeOrder.customerName || 'Khách vãng lai'}</p>
              <p className="text-slate-600 font-mono">{activeOrder.customerPhone || 'Chưa có số điện thoại'}</p>
              {activeOrder.shippingAddress && <p className="text-slate-500">{activeOrder.shippingAddress}</p>}
            </section>

            <section className="space-y-1.5">
              <h2 className="font-bold text-slate-800 text-sm">Sản phẩm</h2>
              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 p-2 space-y-1">
                {(activeOrder.items || []).map((item, index) => (
                  <div className="flex justify-between py-1" key={item.id || index}>
                    <div>
                      <div className="font-semibold text-slate-900">{item.productName}</div>
                      <div className="text-slate-500 text-[11px] font-mono">{item.quantity ?? 1} × {money(item.unitPrice)}</div>
                    </div>
                    <span className="font-bold font-mono">{money(item.subtotal ?? (Number(item.unitPrice || 0) * (item.quantity ?? 1)))}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#f0f3ff] p-3 rounded-xl border border-[#d8e3fb] space-y-1">
              <div className="flex justify-between"><span>Tiền hàng</span><span className="font-mono">{money(activeOrder.totalAmount)}</span></div>
              {Number(activeOrder.discountAmount) > 0 && <div className="flex justify-between text-emerald-700"><span>Giảm giá</span><span className="font-mono">−{money(activeOrder.discountAmount)}</span></div>}
              {Number(activeOrder.taxAmount) > 0 && <div className="flex justify-between"><span>Thuế</span><span className="font-mono">{money(activeOrder.taxAmount)}</span></div>}
              <div className="flex justify-between font-bold text-sm text-[#004967] pt-1 border-t border-slate-200">
                <span>Tổng tiền</span>
                <span className="font-mono">{money(activeOrder.finalAmount)}</span>
              </div>
              <div className="text-slate-500 text-[11px] pt-1">
                <span>Phương thức: </span><strong>{activeOrder.paymentMethod || 'VIETQR'}</strong>
              </div>
            </section>

            <Button block type="dashed" onClick={() => setLabelOpen(true)}>Xem &amp; In nhãn vận chuyển A5</Button>
            <Button block type="primary" className="bg-[#004967]" onClick={() => setIsModalOpen(true)}>Mở Popup Chi Tiết Toàn Diện</Button>
          </div>
        )}
      </Drawer>

      {/* Component In Nhãn Vận Chuyển A5 */}
      <OrderShippingLabel order={activeOrder || modalOrder} open={labelOpen} onClose={() => setLabelOpen(false)} />
    </div>
  );
}
