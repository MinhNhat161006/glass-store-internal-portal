import React from 'react';
import { ProductImage, money } from './ProductCatalog';

export default function CheckoutPanel({ cart, customer, onCustomer, onGuest, onQuantity, onRemove, onClear,
  products, subtotal, discount, tax, total, voucher, setVoucher, onVoucher,
  usePoints, setUsePoints, method, setMethod, cash, setCash, confirmed, setConfirmed,
  paymentRef, cashRef, paying, onPay, lastOrder, onPrint }) {
  return <aside className="pos-checkout" aria-label="Giỏ hàng và thanh toán" aria-busy={paying}>
    <header className="pos-checkout-heading"><h2>Đơn hàng hiện tại</h2><span>{cart.reduce((sum, item) => sum + item.quantity, 0)} món</span></header>
    <fieldset disabled={paying}>
      <div className="pos-customer"><span className="material-symbols-outlined" aria-hidden="true">person</span><div><strong>{customer.name}</strong>{customer.phone && <p>{customer.phone}</p>}</div>
        <button type="button" onClick={onCustomer}>Đổi khách</button>{customer.id && <button type="button" onClick={onGuest}>Vãng lai</button>}</div>
      <div className="pos-cart-items">{!cart.length ? <div className="pos-cart-empty"><span className="material-symbols-outlined" aria-hidden="true">shopping_bag</span><strong>Chưa có sản phẩm</strong><p>Chọn kính hoặc quét mã để bắt đầu đơn hàng.</p></div> : cart.map(item =>
        <div className="pos-cart-item" key={item.sku} data-cart-sku={item.sku}>
          <ProductImage product={{ ...products.find(p => p.sku === item.sku), ...item }} />
          <div className="pos-cart-description"><strong>{item.name.split(' - ')[0]}</strong><span className="pos-sku">{item.sku}</span>
            <div className="pos-cart-item-bottom"><div className="pos-stepper"><button type="button" aria-label={`Giảm ${item.name}`} onClick={() => onQuantity(item.sku, -1)}>−</button><span>{item.quantity}</span><button type="button" aria-label={`Tăng ${item.name}`} onClick={() => onQuantity(item.sku, 1)}>+</button></div><strong>{money(item.price * item.quantity)}</strong></div>
          </div>
          <button type="button" className="pos-remove" aria-label={`Xóa ${item.name}`} onClick={() => onRemove(item.sku)}><span className="material-symbols-outlined" aria-hidden="true">close</span></button>
        </div>)}</div>
      <details className="pos-discount"><summary>Áp dụng voucher / mã giảm giá</summary><div className="pos-voucher"><input aria-label="Mã voucher" value={voucher} onChange={e => setVoucher(e.target.value.toUpperCase())} placeholder="Nhập mã voucher" /><button type="button" className="pos-outline" onClick={onVoucher}>Áp dụng</button></div>
        {customer.points > 0 && <label><input type="checkbox" checked={usePoints} onChange={e => setUsePoints(e.target.checked)} /> Dùng {customer.points} OptiPoints</label>}</details>
      <dl className="pos-totals"><div><dt>Tạm tính</dt><dd>{money(subtotal)}</dd></div>{discount > 0 && <div><dt>Giảm giá</dt><dd>−{money(discount)}</dd></div>}<div><dt>VAT (8%)</dt><dd>{money(tax)}</dd></div><div className="pos-total"><dt>Tổng thanh toán</dt><dd>{money(total)}</dd></div></dl>
      <section className="pos-payment" ref={paymentRef} tabIndex={-1} aria-label="Thanh toán">
        <div className="pos-payment-methods">{[['cash', 'payments', 'Tiền mặt'], ['vietqr', 'qr_code_2', 'Chuyển khoản'], ['card', 'credit_card', 'Thẻ']].map(([value, icon, label]) => <button type="button" key={value} aria-pressed={method === value} onClick={() => setMethod(value)}><span className="material-symbols-outlined" aria-hidden="true">{icon}</span>{label}</button>)}</div>
        {method === 'cash' ? <><label className="pos-cash-label" htmlFor="pos-cash">Tiền khách đưa</label><div className="pos-cash-field"><input id="pos-cash" type="number" min="0" step="1000" ref={cashRef} aria-label="Tiền khách đưa" value={cash || ''} placeholder="0" onChange={event => setCash(Number(event.target.value))} /><span>đ</span></div><div className={`pos-change${cash >= total && total > 0 ? ' is-ready' : ''}`}><span>{cash > 0 && cash < total ? 'Còn thiếu' : 'Tiền thối lại'}</span><strong>{money(cash > 0 && cash < total ? total - cash : Math.max(0, cash - total))}</strong></div></> : <label className="pos-payment-confirm"><input type="checkbox" checked={confirmed} onChange={event => setConfirmed(event.target.checked)} />Đã nhận tiền chuyển khoản / giao dịch thẻ thành công</label>}
      </section>
    </fieldset>
    <button type="button" className="pos-pay" onClick={onPay} disabled={paying || !cart.length} aria-busy={paying}>{paying ? 'Đang lưu đơn hàng…' : 'Thanh toán · F10'}</button>
    <div className="pos-checkout-tools">
      <button type="button" className="pos-print pos-outline" onClick={onPrint} disabled={!lastOrder || paying}><span className="material-symbols-outlined" aria-hidden="true">print</span>In hóa đơn</button>
      <button type="button" className="pos-clear" onClick={onClear} disabled={paying || !cart.length}>Xóa giỏ hàng <kbd>F8</kbd></button>
    </div>
    {lastOrder && <p className="pos-last-order" role="status" title={lastOrder.orderCode}>Đã lưu {lastOrder.orderCode}</p>}
  </aside>;
}
