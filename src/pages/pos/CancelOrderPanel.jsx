import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { orderApi } from '../../api/orderApi';
import { money } from './ProductCatalog';

export default function CancelOrderPanel({ lastOrder, onChanged }) {
  const [open,setOpen]=useState(false),[code,setCode]=useState(''),[order,setOrder]=useState(null),[reason,setReason]=useState(''),[refund,setRefund]=useState(false),[busy,setBusy]=useState(false);
  async function lookup(event) {
    event?.preventDefault();setBusy(true);
    try { const result=await orderApi.getOrderByCode(code.trim());const current=await orderApi.getOrderById(result.id);setOrder(current);setReason(current.cancelReason||'');setRefund(false); }
    catch(error){setOrder(null);message.error(error.message);}finally{setBusy(false);}
  }
  function cancel() {
    if(!reason.trim()){message.warning('Nhập lý do hủy.');return;}
    Modal.confirm({title:'Xác nhận hủy toàn bộ đơn?',content:`${order.orderCode} · ${money(order.finalAmount)}. Hệ thống sẽ hoàn kho, điểm và lượt voucher. ${refund?'Bạn xác nhận đã hoàn tiền thực tế.':'Tiền sẽ được ghi nhận CHỜ HOÀN, không tự chuyển trả qua ngân hàng.'}`,okText:'Hủy đơn',cancelText:'Quay lại',okButtonProps:{danger:true},onOk:async()=>{
      setBusy(true);try{const saved=await orderApi.cancel(order.id,reason.trim(),refund);setOrder(saved);onChanged(saved);message.info(saved.status==='CANCELLED'?'Đã hủy đơn. Kiểm tra trạng thái hoàn tiền.':'Đang xử lý hoàn kho. Bấm Kiểm tra để cập nhật; có thể thử lại nếu dịch vụ kho lỗi.');}catch(error){message.error(error.message);}finally{setBusy(false);}
    }});
  }
  function confirmRefund() {
    Modal.confirm({title:'Bạn đã hoàn tiền cho khách?',content:'Chỉ xác nhận sau khi đã trả tiền mặt hoặc kiểm tra giao dịch hoàn tiền chuyển khoản/thẻ thành công.',okText:'Đã hoàn tiền thực tế',cancelText:'Chưa hoàn',onOk:async()=>{setBusy(true);try{const saved=await orderApi.confirmRefund(order.id);setOrder(saved);onChanged(saved);message.success('Đã ghi nhận hoàn tiền.');}catch(error){message.error(error.message);}finally{setBusy(false);}}});
  }
  return <><button className="pos-outline" type="button" onClick={()=>{setOpen(true);setCode(lastOrder?.orderCode||'');setOrder(null);setReason('');setRefund(false);}}>Hủy đơn đã thanh toán</button>
    <Modal title="Hủy đơn tại quầy / xác nhận hoàn tiền" open={open} onCancel={()=>setOpen(false)} footer={null}>
      <form className="pos-voucher" onSubmit={lookup}><input aria-label="Mã đơn cần hủy" required value={code} onChange={e=>setCode(e.target.value)} placeholder="Mã OPT-…"/><button className="pos-outline" disabled={busy}>Kiểm tra</button></form>
      {order&&<div className="pos-cancel-details"><strong>{order.orderCode}</strong><p>{order.customerName} · {money(order.finalAmount)}</p><p>{order.branchName}</p><p>Đơn: <b>{order.status}</b> · Kho: <b>{order.inventorySyncStatus||'—'}</b></p><p>Hoàn tiền: <b>{order.refundStatus==='CONFIRMED'?'Đã xác nhận hoàn':order.refundStatus==='PENDING'?'Chờ hoàn tiền':'Chưa yêu cầu'}</b></p>
        {order.channel==='POS'&&['PAID','CANCEL_PENDING'].includes(order.status)&&<><label>Lý do hủy<textarea aria-label="Lý do hủy" maxLength={255} value={reason} onChange={e=>setReason(e.target.value)} /></label><label className="pos-payment-confirm"><input type="checkbox" checked={refund} onChange={e=>setRefund(e.target.checked)} disabled={order.status==='CANCEL_PENDING'}/>Đã hoàn tiền thực tế cho khách</label><button type="button" className="pos-outline" disabled={busy} onClick={cancel}>{order.status==='CANCEL_PENDING'?'Thử lại hoàn tất hủy':'Hủy toàn bộ đơn'}</button></>}
        {order.status==='CANCELLED'&&order.refundStatus!=='CONFIRMED'&&<button type="button" className="pos-outline" disabled={busy} onClick={confirmRefund}>Xác nhận đã hoàn tiền</button>}
        {order.status==='CANCELLED'&&<p>Đơn đã hủy; không tạo lại đơn và không hoàn kho/điểm thêm khi gửi lặp.</p>}
      </div>}
    </Modal></>;
}
