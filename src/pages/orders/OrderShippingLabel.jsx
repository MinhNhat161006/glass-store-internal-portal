import React, { useRef } from 'react';
import { Button, Modal, QRCode } from 'antd';
import { useReactToPrint } from 'react-to-print';
import './shipping-label.css';
import labelStyles from './shipping-label.css?inline';

export default function OrderShippingLabel({ order, open, onClose }) {
  const labelRef = useRef(null);
  const print = useReactToPrint({
    content: () => labelRef.current,
    documentTitle: `Nhan-A5-${order?.orderCode || 'don-hang'}`,
    copyStyles: false,
    pageStyle: `${labelStyles}\n@page { size: A5 portrait; margin: 10mm; } @media print { html, body { margin: 0; padding: 0; background: white; } .order-shipping-label, .order-shipping-label * { visibility: visible !important; } .order-shipping-label { width: 128mm; border: 1px solid #111; padding: 8mm; box-sizing: border-box; } }`,
  });
  if (!order) return null;
  const url = new URL('/orders', window.location.origin);
  url.searchParams.set('order', order.orderCode || String(order.id));
  return <Modal title="Nhãn hộp kính · A5" open={open} onCancel={onClose} width={620}
    footer={<><Button onClick={onClose}>Đóng</Button><Button type="primary" onClick={print}>In nhãn A5</Button></>}>
    <div ref={labelRef} className="order-shipping-label">
      <header><div><strong>OPTIVISION</strong><p>{order.orderCode || `#${order.id}`}</p></div><QRCode value={url.toString()} type="svg" size={112} bordered={false} /></header>
      <section><span>NGƯỜI NHẬN</span><h2>{order.customerName || 'Khách vãng lai'}</h2><p>{order.customerPhone || 'Chưa có số điện thoại'}</p><p>{order.shippingAddress || `Nhận tại ${order.branchName || 'cửa hàng'}`}</p></section>
      <section><span>SẢN PHẨM</span>{(order.items || []).map((item, index) => <p key={item.id || index}>{item.quantity ?? 1} × {item.productName}</p>)}</section>
      <footer><strong>HÀNG DỄ VỠ — XIN NHẸ TAY</strong><p>Quét QR để mở đơn trên cổng nội bộ.</p></footer>
    </div>
  </Modal>;
}
