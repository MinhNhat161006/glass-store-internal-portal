import React, { useState } from 'react';
import { Modal } from 'antd';
import { money } from './ProductCatalog';
export default function HeldCartsPanel({ drafts, onHold, onRestore, onDelete, disabled }) {
  const [open, setOpen] = useState(false);
  return <><div className="pos-held-tools"><button type="button" className="pos-outline" onClick={onHold} disabled={disabled}>Lưu tạm · F4</button><button type="button" className="pos-outline" onClick={() => setOpen(true)}>Đơn tạm ({drafts.length})</button></div>
    <Modal title="Đơn tạm của bạn tại chi nhánh đang chọn" open={open} onCancel={() => setOpen(false)} footer={null}>
      {!drafts.length && <p>Chưa có đơn tạm. Bấm F4 để lưu giỏ hiện tại.</p>}
      <div className="pos-drafts">{drafts.map(draft => <article key={draft.id}><strong>{draft.customer.name || 'Khách vãng lai'}</strong><p>{new Date(draft.savedAt).toLocaleString('vi-VN')} · {draft.items.reduce((n,i)=>n+i.quantity,0)} món</p><p>{money(draft.items.reduce((n,i)=>n+i.price*i.quantity,0))} · Tạm tính lúc lưu</p><p>{draft.items.map(item=>`${item.sku} × ${item.quantity}`).join(', ')}</p><div><button className="pos-outline" disabled={disabled} onClick={() => { if (onRestore(draft)) setOpen(false); }}>Khôi phục</button><button className="pos-clear" onClick={() => Modal.confirm({title:'Xóa đơn tạm này?',onOk:()=>onDelete(draft.id),okText:'Xóa',cancelText:'Giữ lại'})}>Xóa đơn tạm</button></div></article>)}</div>
    </Modal></>;
}
