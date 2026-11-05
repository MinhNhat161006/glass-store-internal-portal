import React, { useRef } from 'react';
import { Button, Modal, QRCode } from 'antd';
import { useReactToPrint } from 'react-to-print';
import './shipping-label.css';
import labelStyles from './shipping-label.css?inline';

// Vector SVG Barcode generator for reliable, high-resolution printing
function BarcodeSvg({ value = 'TRACKING123456', height = 40 }) {
  const bars = [];
  let currentX = 8;

  // Start guard bars
  bars.push(<rect key="sg-1" x={currentX} y={0} width={2} height={height} fill="#000" />);
  bars.push(<rect key="sg-2" x={currentX + 4} y={0} width={2} height={height} fill="#000" />);
  currentX += 8;

  const str = String(value || 'OPTIVISION');
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    const pattern = [
      (code % 2) + 1,
      ((code >> 1) % 2) + 1,
      ((code >> 2) % 2) + 1,
      ((code >> 3) % 2) + 1,
    ];
    for (let p = 0; p < pattern.length; p++) {
      const w = pattern[p];
      if (p % 2 === 0) {
        bars.push(<rect key={`bar-${i}-${p}`} x={currentX} y={0} width={w} height={height} fill="#000" />);
      }
      currentX += w + 1;
    }
    currentX += 1;
  }

  // Stop guard bars
  bars.push(<rect key="eg-1" x={currentX} y={0} width={2} height={height} fill="#000" />);
  bars.push(<rect key="eg-2" x={currentX + 4} y={0} width={3} height={height} fill="#000" />);
  const totalWidth = currentX + 12;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={Math.min(totalWidth, 320)} height={height} viewBox={`0 0 ${totalWidth} ${height}`} style={{ maxWidth: '100%' }}>
        {bars}
      </svg>
      <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 800, letterSpacing: '2px', marginTop: '2px' }}>
        {value}
      </span>
    </div>
  );
}

export default function OrderShippingLabel({ order, open, onClose }) {
  const labelRef = useRef(null);

  const print = useReactToPrint({
    content: () => labelRef.current,
    documentTitle: `Nhan-Giao-Hang-A5-${order?.orderCode || 'don-hang'}`,
    copyStyles: false,
    pageStyle: `
      ${labelStyles}
      @page { size: A5 portrait; margin: 6mm; }
      @media print {
        html, body { margin: 0; padding: 0; background: white; }
        .order-shipping-label, .order-shipping-label * { visibility: visible !important; }
        .order-shipping-label { width: 136mm !important; max-width: 136mm !important; margin: 0 auto !important; border: 2px solid #000 !important; padding: 6mm !important; }
      }
    `,
  });

  if (!order) return null;

  const url = new URL('/orders', window.location.origin);
  url.searchParams.set('order', order.orderCode || String(order.id));

  const trackingCode = order.trackingCode || (order.orderCode ? `VN-${order.orderCode.replace('#', '')}` : `VN-OPT-${order.id}`);
  const carrierName = (order.carrierName || 'GHTK').toUpperCase();
  const carrierClass = carrierName.includes('AHA') ? 'ahamove' : (carrierName.includes('GHTK') ? 'ghtk' : '');

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 800 }}>Phiếu Giao Hàng A5 &amp; Tem Dán Hộp Kính</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      width={660}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Khổ in tiêu chuẩn A5 (Dán mặt trên hộp kính mắt)
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button onClick={onClose}>Đóng</Button>
            <Button type="primary" className="bg-[#004967]" onClick={print}>
              In Phiếu Giao Hàng A5
            </Button>
          </div>
        </div>
      }
    >
      <div className="order-shipping-label-wrapper">
        <div ref={labelRef} className="order-shipping-label">
          {/* 1. Header Thương hiệu & QR */}
          <header>
            <div>
              <h1 className="brand-name">OPTIVISION EYEWEAR</h1>
              <p className="brand-sub">Hệ thống kính mắt chính hãng · Hotline: 1900 6868</p>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
                Đơn hàng: <strong style={{ color: '#004967', fontFamily: 'monospace' }}>{order.orderCode || `#${order.id}`}</strong>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <QRCode value={url.toString()} type="svg" size={96} bordered={false} />
              <div style={{ fontSize: '8px', color: '#64748b', marginTop: '2px', fontWeight: 600 }}>Quét tra cứu đơn</div>
            </div>
          </header>

          {/* 2. Banner Thông tin Vận chuyển & Mã vạch Barcode */}
          <div className="tracking-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className={`carrier-badge ${carrierClass}`}>
                ĐƠN VỊ VẬN CHUYỂN: {order.carrierName || 'GHTK (Giao Hàng Tiết Kiệm)'}
              </span>
              <span style={{ fontSize: '10px', color: '#475569', fontWeight: 700 }}>DỊCH VỤ: HỎA TỐC</span>
            </div>
            <BarcodeSvg value={trackingCode} height={42} />
          </div>

          {/* 3. Thông tin Người Nhận & Người Gửi */}
          <div className="section-grid">
            <div className="info-box">
              <span className="info-title">Người gửi / From:</span>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                {order.branchName || 'Trung Tâm Kho & Xưởng Kính TP.HCM'}
              </div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                Hotline hỗ trợ điều phối: 1900 6868
              </div>
            </div>

            <div className="info-box" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
              <span className="info-title" style={{ color: '#1d4ed8' }}>Người nhận / Ship To:</span>
              <h3 className="customer-name">{order.customerName || 'Khách vãng lai'}</h3>
              <p className="customer-phone">SĐT: <strong>{order.customerPhone || 'Chưa có SĐT'}</strong></p>
              <p className="customer-addr">Địa chỉ: {order.shippingAddress || 'Nhận tại quầy Flagship'}</p>
            </div>
          </div>

          {/* 4. Danh sách Sản phẩm Kính */}
          <div style={{ margin: '8px 0' }}>
            <span className="info-title">Nội dung bọc gói hàng:</span>
            <table className="items-table">
              <thead>
                <tr>
                  <th style={{ width: '30px' }}>#</th>
                  <th>Tên sản phẩm</th>
                  <th style={{ width: '45px', textAlign: 'center' }}>SL</th>
                  <th>Phân loại / Kỹ thuật</th>
                </tr>
              </thead>
              <tbody>
                {(order.items || []).map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td style={{ textAlign: 'center', color: '#64748b', fontFamily: 'monospace' }}>{idx + 1}</td>
                    <td style={{ fontWeight: 700 }}>{item.productName}</td>
                    <td style={{ textAlign: 'center', fontWeight: 800, color: '#004967' }}>{item.quantity ?? 1}</td>
                    <td style={{ fontSize: '10px', color: '#64748b' }}>
                      {item.skuId || item.sku || 'Kính mắt chính hãng'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 5. TIỀN THU NGƯỜI NHẬN (COD) */}
          <div className="cod-box">
            <div>
              <span className="cod-label">TIỀN THU NGƯỜI NHẬN (COD):</span>
              <div style={{ fontSize: '9px', color: '#047857' }}>Đơn hàng đã được thanh toán online / trả trước</div>
            </div>
            <span className="cod-amount">0 ₫</span>
          </div>

          {/* 6. TEM CẢNH BÁO ĐẶC BIỆT: HÀNG DỄ VỠ - TRÁNH ĐÈ NÉN */}
          <div className="fragile-stamp">
            <div className="fragile-title">
              <span>[ HÀNG DỄ VỠ — TRÁNH ĐÈ NÉN ]</span>
            </div>
            <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.5px', marginTop: '2px' }}>
              FRAGILE — HANDLE WITH CARE
            </div>
            <p className="fragile-desc">
              Kiện hàng chứa mắt kính quang học tinh vi và gọng kính định hình.
              <br />
              Xin nhẹ tay, tránh quăng quật, không đè nén vật nặng lên kiện hàng.
            </p>
          </div>

          {/* 7. Chữ ký các bên */}
          <div className="signatures">
            <div>
              <div className="sig-title">KTV Đóng Gói (Lab)</div>
              <div className="sig-note">(Ký &amp; xác nhận)</div>
            </div>
            <div>
              <div className="sig-title">Tài Xế / Shipper</div>
              <div className="sig-note">(Ký nhận kiện hàng)</div>
            </div>
            <div>
              <div className="sig-title">Người Nhận Hàng</div>
              <div className="sig-note">(Đồng kiểm khi nhận)</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
