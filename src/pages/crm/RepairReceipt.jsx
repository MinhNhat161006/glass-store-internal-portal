import React, { useRef } from 'react';
import { Button, Modal, QRCode } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { dateTime, repairServices } from './repairUtils';
import './repair-receipt.css';
import receiptStyles from './repair-receipt.css?inline';

export default function RepairReceipt({ repair, open, onClose }) {
  const ref = useRef(null);
  const print = useReactToPrint({ content: () => ref.current, copyStyles: false,
    documentTitle: repair?.serviceCode || 'Bien-nhan-sua-kinh',
    pageStyle: `${receiptStyles}\n@page { size:A5 portrait; margin:10mm } @media print { html,body { margin:0;padding:0 } .repair-receipt {width:128mm;box-sizing:border-box} }`,
  });
  if (!repair) return null;
  return <Modal title="Biên nhận sửa chữa · A5" open={open} onCancel={onClose} width={620}
    footer={<><Button onClick={onClose}>Đóng</Button><Button type="primary" onClick={print}>In biên nhận</Button></>}>
    <article ref={ref} className="repair-receipt">
      <header><div><strong>OPTIVISION</strong><h2>BIÊN NHẬN SỬA KÍNH</h2><p>{repair.serviceCode}</p></div><QRCode type="svg" size={90} bordered={false} value={repair.serviceCode} /></header>
      <p>Khách hàng: <strong>{repair.customerName}</strong></p><p>Điện thoại: {repair.customerPhone}</p>
      <p>Sản phẩm: {repair.productName}</p><p>Mã vạch: {repair.productBarcode || '—'}</p>
      <p>Tiếp nhận: {dateTime(repair.receivedAt)}</p><p className="repair-pickup">Hẹn trả: {dateTime(repair.expectedPickupAt)}</p>
      <section><p>Dịch vụ: {(repair.requestedServices || []).map(value => repairServices[value] || value).join(', ')}</p><p>Khách báo: {repair.reportedProblem}</p><p>Gọng: {repair.frameCondition}</p><p>Tròng: {repair.lensCondition}</p><p>Tình trạng khác: {repair.physicalCondition}</p>{repair.customerNotes && <p>Lưu ý của khách: {repair.customerNotes}</p>}</section>
      <p>Nhân viên tiếp nhận: {repair.receptionEmployee}</p><footer><p>Vui lòng giữ biên nhận khi đến nhận kính.</p><div><span>Khách hàng</span><span>Nhân viên tiếp nhận</span></div></footer>
    </article>
  </Modal>;
}
