import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Drawer, Empty, Input, Modal, Table, Tag, message } from 'antd';
import { orderApi } from '../../api/orderApi';
import '../workspace.css';

const statuses = {
  PENDING: ['Chờ thanh toán', 'orange'], PENDING_PAYMENT: ['Chờ thanh toán', 'orange'],
  PAID: ['Đã thanh toán', 'blue'], WAITING_RX: ['Chờ toa kính', 'orange'],
  PROCESSING: ['Đang xử lý', 'blue'], QC_PACKAGING: ['Chờ kiểm tra', 'purple'],
  SHIPPING: ['Đang giao', 'cyan'], COMPLETED: ['Hoàn tất', 'green'], CANCELLED: ['Đã hủy', 'default'],
  PENDING_CONFIRMATION: ['Chờ xác nhận', 'orange'], CONFIRMED: ['Đã xác nhận', 'blue'],
  PREPARING: ['Đang chuẩn bị', 'blue'], READY_FOR_PICKUP: ['Chờ nhận tại quầy', 'cyan'],
  CANCEL_REQUESTED: ['Yêu cầu hủy', 'orange'], CANCEL_PENDING: ['Đang xử lý hủy', 'orange'],
  REFUND_PENDING: ['Chờ hoàn tiền', 'orange'], REFUNDED: ['Đã hoàn tiền', 'default'],
};
const money = value => value == null ? '—' : Number(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
const date = value => value && !Number.isNaN(new Date(value).getTime()) ? new Date(value).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) : '—';
const code = order => order.orderCode || `#${order.id}`;
const statusTag = value => <Tag color={statuses[value]?.[1]}>{statuses[value]?.[0] || value || 'Chưa cập nhật'}</Tag>;

export default function OrdersOmsPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [channel, setChannel] = useState('all');
  const [activeId, setActiveId] = useState(null);
  const [updating, setUpdating] = useState(false);
  const activeOrder = orders.find(order => order.id === activeId);
  const loadOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await orderApi.getAllOrders();
      const data = response?.data ?? response;
      if (!Array.isArray(data)) throw new Error('Dữ liệu đơn hàng không hợp lệ.');
      setOrders(data);
    } catch (err) { setError(err.message || 'Không tải được đơn hàng.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadOrders(); }, []);
  const filtered = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi-VN');
    return orders.filter(order =>
      (status === 'all' || order.status === status) && (channel === 'all' || order.channel === channel) &&
      (!keyword || [code(order), order.customerName, order.customerPhone].some(value => String(value || '').toLocaleLowerCase('vi-VN').includes(keyword)))
    );
  }, [orders, query, status, channel]);
  const exportOrders = async () => {
    try {
      const XLSX = await import('xlsx');
      const sheet = XLSX.utils.json_to_sheet(filtered.map(order => ({
        'Mã đơn': code(order), 'Khách hàng': order.customerName, 'Điện thoại': order.customerPhone,
        'Kênh': order.channel, 'Ngày tạo': date(order.createdAt), 'Tổng tiền': order.finalAmount,
        'Trạng thái': statuses[order.status]?.[0] || order.status,
      })));
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheet, 'Đơn hàng');
      XLSX.writeFile(workbook, `Don-hang-${new Date().toLocaleDateString('sv-SE')}.xlsx`);
    } catch { message.error('Không thể xuất danh sách đơn hàng.'); }
  };
  const nextAction = ['READY_FOR_PICKUP', 'SHIPPING'].includes(activeOrder?.status)
    ? { status: 'COMPLETED', label: 'Xác nhận bàn giao' } : null;
  const advanceOrder = () => {
    if (!nextAction || !activeOrder) return;
    const orderId = activeOrder.id;
    const action = nextAction;
    Modal.confirm({
      title: `${action.label}?`, content: `Đơn ${code(activeOrder)} · ${activeOrder.customerName}`,
      okText: 'Xác nhận', cancelText: 'Quay lại',
      async onOk() {
        setUpdating(true);
        try {
          const response = await orderApi.updateOrderStatus(orderId, { status: action.status });
          const saved = response?.data ?? response;
          setOrders(previous => previous.map(order => order.id === orderId ? { ...order, ...saved } : order));
          message.success('Đã cập nhật đơn hàng.');
        } catch (err) { message.error(err.message || 'Không thể cập nhật đơn hàng.'); throw err; }
        finally { setUpdating(false); }
      },
    });
  };
  const columns = [
    { title: 'Mã đơn', key: 'code', width: 210, render: (_, order) => <div><button className="workspace-link" onClick={() => setActiveId(order.id)}>{code(order)}</button><div className="workspace-muted">{date(order.createdAt)}</div></div> },
    { title: 'Khách hàng', dataIndex: 'customerName', render: (name, order) => <div><span className="workspace-name">{name || 'Khách vãng lai'}</span><div className="workspace-muted">{order.customerPhone || '—'}</div></div> },
    { title: 'Kênh bán', dataIndex: 'channel', width: 130, render: value => value === 'POS' ? 'Tại quầy' : value === 'ONLINE' ? 'Online' : value || '—' },
    { title: 'Tổng tiền', dataIndex: 'finalAmount', align: 'right', width: 170, render: value => <span className="workspace-name">{money(value)}</span> },
    { title: 'Trạng thái', dataIndex: 'status', width: 160, render: statusTag },
  ];
  return (
    <div className="simple-workspace">
      <header className="workspace-header"><div><h1>Đơn hàng</h1><p>{orders.length} đơn hàng</p></div><Button onClick={exportOrders} disabled={!filtered.length || loading || !!error}>Xuất Excel</Button></header>
      <section className="workspace-panel">
        <div className="workspace-toolbar">
          <Input.Search allowClear aria-label="Tìm đơn hàng" placeholder="Mã đơn, tên hoặc số điện thoại" value={query} onChange={event => setQuery(event.target.value)} className="workspace-search" />
          <select aria-label="Lọc trạng thái" value={status} onChange={event => setStatus(event.target.value)} className="workspace-filter"><option value="all">Tất cả trạng thái</option>{Object.entries(statuses).map(([value, [label]]) => <option key={value} value={value}>{label}</option>)}</select>
          <select aria-label="Lọc kênh bán" value={channel} onChange={event => setChannel(event.target.value)} className="workspace-filter"><option value="all">Tất cả kênh</option>{[...new Set(orders.map(order => order.channel).filter(Boolean))].map(value => <option key={value} value={value}>{value === 'POS' ? 'Tại quầy' : value === 'ONLINE' ? 'Online' : value}</option>)}</select>
        </div>
        {error ? <Alert type="error" showIcon message={error} action={<Button onClick={loadOrders}>Thử lại</Button>} /> : <Table rowKey="id" columns={columns} dataSource={filtered} loading={loading} scroll={{ x: 820 }} pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có đơn hàng phù hợp" /> }} />}
      </section>
      <Drawer title={activeOrder ? `Đơn ${code(activeOrder)}` : 'Chi tiết đơn'} open={activeId !== null} onClose={() => setActiveId(null)} width={520}>
        {activeOrder && <div className="simple-workspace workspace-detail">
          <div>{statusTag(activeOrder.status)}</div>
          <section><h2>Khách hàng</h2><p className="workspace-name">{activeOrder.customerName || 'Khách vãng lai'}</p><p>{activeOrder.customerPhone || 'Chưa có số điện thoại'}</p>{activeOrder.shippingAddress && <p className="workspace-muted">{activeOrder.shippingAddress}</p>}</section>
          <section><h2>Sản phẩm</h2><div className="workspace-items">{(activeOrder.items || []).map((item, index) => <div className="workspace-item" key={item.id || index}><div><span className="workspace-name">{item.productName}</span><div className="workspace-muted">{item.quantity ?? 1} × {money(item.unitPrice)}</div>{item.prescriptionId && <div className="workspace-muted">Toa kính #{item.prescriptionId}</div>}</div><span>{money(item.subtotal ?? Number(item.unitPrice) * (item.quantity ?? 1))}</span></div>)}</div></section>
          <section className="workspace-totals">
            <div><span>Tiền hàng</span><span>{money(activeOrder.totalAmount)}</span></div>
            {Number(activeOrder.discountAmount) > 0 && <div><span>Giảm giá</span><span>−{money(activeOrder.discountAmount)}</span></div>}
            {Number(activeOrder.taxAmount) > 0 && <div><span>Thuế</span><span>{money(activeOrder.taxAmount)}</span></div>}
            <div className="workspace-total"><strong>Tổng tiền</strong><strong>{money(activeOrder.finalAmount)}</strong></div>
            <div className="workspace-muted"><span>Phương thức</span><span>{({ CASH: 'Tiền mặt', CARD: 'Thẻ', VIETQR: 'VietQR' })[activeOrder.paymentMethod] || activeOrder.paymentMethod || '—'}</span></div>
          </section>
          <details className="workspace-extra"><summary>Thông tin khác</summary><p>Ngày tạo: {date(activeOrder.createdAt)}</p><p>Chi nhánh: {activeOrder.branchName || '—'}</p><p>Nhân viên: {activeOrder.staffName || '—'}</p>{activeOrder.notes && <p>Ghi chú: {activeOrder.notes}</p>}</details>
          {nextAction && <Button type="primary" block loading={updating} onClick={advanceOrder}>{nextAction.label}</Button>}
        </div>}
      </Drawer>
    </div>
  );
}
