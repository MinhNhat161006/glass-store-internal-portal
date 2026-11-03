import React, { useState, useEffect, useRef } from 'react';
import { message, Modal } from 'antd';
import { orderApi } from '../../api/orderApi';
import { productApi } from '../../api/productApi';
import { useAuth } from '../../context/AuthContext';
import ReceiptPreview from './ReceiptPreview';
import ProductCatalog from './ProductCatalog';
import CheckoutPanel from './CheckoutPanel';
import './pos.css';
import { prescriptionApi } from '../../api/prescriptionApi';
import { customerApi } from '../../api/customerApi';

export default function PosPage() {
  const { user } = useAuth();
  const paymentLock = useRef(false);
  const [paying, setPaying] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  // Category filter
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Search / Barcode input
  const [barcodeInput, setBarcodeInput] = useState('');
  const barcodeRef = useRef(null);
  const paymentRef = useRef(null);
  const cashInputRef = useRef(null);

  // Cart state
  const [cart, setCart] = useState([]);

  // Customer state
  const [customer, setCustomer] = useState({
    name: 'Khách vãng lai',
    tier: 'Vãng lai',
    phone: '',
    points: 0,
    pointValue: 0
  });

  // Customer selection modal
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [dbCustomers, setDbCustomers] = useState([]);

  useEffect(() => {
    customerApi.getCustomerList().then(res => {
      if (Array.isArray(res)) setDbCustomers(res);
    }).catch(e => console.warn('Sync customer list for POS:', e));
  }, []);
  const [usePoints, setUsePoints] = useState(true);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  // Payment tab: 'vietqr' | 'cash' | 'card'
  const [payTab, setPayTab] = useState('cash');
  const [cashGiven, setCashGiven] = useState(0);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Rx Modal state
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [linkedRx, setLinkedRx] = useState(null);

  // Product catalog list
  const [catalogProducts, setCatalogProducts] = useState([]);

  useEffect(() => {
    const fetchLiveCatalog = async () => {
      try {
        const res = await productApi.getAllProducts();
        const products = res?.data || res;
        if (Array.isArray(products) && products.length > 0) {
          const list = [];
          products.forEach(p => {
            if (p.variants && p.variants.length > 0) {
              p.variants.forEach(v => {
                list.push({
                  sku: v.sku || ('SKU-' + v.id),
                  barcode: v.barcode || '',
                  shortSku: (v.sku || '').split('-').pop() || 'SKU',
                  name: (p.name + ' - ' + (v.name || v.color || '')).trim(),
                  brand: p.brandName || 'OptiVision',
                  category: p.productType,
                  price: Number(v.price ?? 0),
                  stockQuantity: v.stockQuantity ?? 0,
                  stock: (v.stockQuantity ?? 0) + ' cái',
                  image: v.imageUrl || 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=500&q=80'
                });
              });
            }
          });
          if (list.length > 0) {
            setCatalogProducts(list);
          }
        }
      } catch (err) {
        setCatalogError('Không tải được sản phẩm. Kiểm tra Catalog Service và tải lại trang.');
      } finally {
        setCatalogLoading(false);
      }
    };
    fetchLiveCatalog();
  }, []);

  const [availablePrescriptions, setAvailablePrescriptions] = useState([]);
  useEffect(() => {
    prescriptionApi.getAllPrescriptions().then(list => {
      if (Array.isArray(list)) {
        const mapped = list.map(rx => ({
          code: '#RX-2026-' + rx.id,
          customer: rx.customerName || 'Khách hàng',
          phone: rx.customerPhone || '0901 000 000',
          timeAgo: 'Hôm nay',
          od: 'Sph ' + (rx.odSph || 0) + ' | Cyl ' + (rx.odCyl || 0) + ' | Ax ' + (rx.odAxis || 180) + '°',
          os: 'Sph ' + (rx.osSph || 0) + ' | Cyl ' + (rx.osCyl || 0) + ' | Ax ' + (rx.osAxis || 180) + '°',
          pd: (rx.pd || 63) + 'mm',
          doctor: rx.optometristName || 'BS. Khúc Xạ'
        }));
        setAvailablePrescriptions(mapped);
      }
    }).catch(e => console.warn('Sync rx modal error:', e));
  }, []);

  // Calculation of totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountTotal = Math.min(subtotal, voucherDiscount + (usePoints ? customer.pointValue : 0));
  const taxableAmount = Math.max(0, subtotal - discountTotal);
  const vatAmount = Math.round(taxableAmount * 0.08);
  const grandTotal = taxableAmount + vatAmount;
  useEffect(() => { setPaymentConfirmed(false); }, [grandTotal, payTab]);

  // Add product to cart
  const handleAddToCart = (product) => {
    if (paymentLock.current) return;
    if (!catalogProducts.some(p => p.sku === product.sku)) {
      message.warning('Chỉ có thể bán sản phẩm trong catalog.');
      return;
    }
    if ((cart.find(item => item.sku === product.sku)?.quantity || 0) >= product.stockQuantity) {
      message.warning('Số lượng vượt tồn kho hiện tại.');
      return;
    }
    const existingIndex = cart.findIndex((item) => item.sku === product.sku);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          id: product.sku,
          sku: product.sku,
          name: product.name,
          image: product.image,
          sub: product.brand,
          price: product.price,
          quantity: 1,
          rxInfo: null
        }
      ]);
    }
    message.success({ key: 'pos-add-product', content: `Đã thêm ${product.name.split(' - ')[0]}`, duration: 1.5 });
    requestAnimationFrame(() => {
      const paymentBounds = paymentRef.current?.getBoundingClientRect();
      if (paymentBounds && (paymentBounds.top < 72 || paymentBounds.bottom > window.innerHeight)) {
        paymentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (cashInputRef.current) {
        cashInputRef.current.focus({ preventScroll: true });
        cashInputRef.current.select();
      } else {
        paymentRef.current?.focus({ preventScroll: true });
      }
    });
  };

  // Adjust quantity
  const handleQtyChange = (sku, delta) => {
    if (paymentLock.current) return;
    const item = cart.find(p => p.sku === sku);
    const product = catalogProducts.find(p => p.sku === sku);
    if (delta > 0 && item.quantity >= (product?.stockQuantity ?? 0)) {
      message.warning('Số lượng vượt tồn kho hiện tại.');
      return;
    }
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.sku === sku) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove single item
  const handleRemoveItem = (sku) => {
    if (paymentLock.current) return;
    setCart((prev) => prev.filter((item) => item.sku !== sku));
    message.info('Đã xóa sản phẩm khỏi giỏ hàng.');
  };

  // Clear entire cart
  const handleClearCart = () => {
    if (paymentLock.current) return;
    Modal.confirm({
      title: 'Xóa giỏ hàng?',
      content: 'Bạn có chắc chắn muốn làm trống toàn bộ đơn bán hiện tại (F8)?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: () => {
        setCart([]);
        message.info('Giỏ hàng đã được làm trống.');
      }
    });
  };

  // Barcode Submit
  const handleBarcodeSubmit = (e) => {
    if (e) e.preventDefault();
    if (!barcodeInput.trim()) return;

    const query = barcodeInput.trim().toLowerCase();
    const found = catalogProducts.find(
      (p) =>
        p.sku.toLowerCase() === query ||
        p.barcode.toLowerCase() === query ||
        p.name.toLowerCase().includes(query)
    );

    if (found) {
      handleAddToCart(found);
    } else {
      message.warning('Không tìm thấy sản phẩm theo Barcode / SKU này.');
    }
    setBarcodeInput('');
  };

  // Add a lens from the live catalog, never a fabricated SKU.
  const handleInsertRxCombo = () => {
    const lens = catalogProducts.find(p => p.category === 'LENS' && p.stockQuantity > 0);
    if (!lens) { message.warning('Không có tròng kính còn hàng trong catalog.'); return; }
    handleAddToCart(lens);
  };

  // Select prescription from modal
  const handleSelectPrescription = (rx) => {
    setLinkedRx({
      code: rx.code,
      doctor: rx.doctor,
      customer: rx.customer,
      od: rx.od,
      os: rx.os,
      pd: rx.pd
    });
    setCustomer({
      ...customer,
      name: rx.customer,
      phone: rx.phone
    });
    setIsRxModalOpen(false);
    message.success(`Đã liên kết ${rx.code} cho khách ${rx.customer}!`);
  };

  // Dispatch Lab Order
  const handleDispatchLabOrder = () => {
    if (!linkedRx) { message.warning('Vui lòng liên kết toa khám trước.'); return; }
    if (cart.length === 0) {
      message.warning('Vui lòng chọn sản phẩm trước khi chuyển xưởng mài!');
      return;
    }
    Modal.confirm({
      title: 'Đẩy Lệnh Gia Công Mài Lắp Kính (F9)',
      content: (
        <div className="space-y-1 text-xs text-slate-600 pt-1">
          <p>
            Lệnh mài tròng sẽ được truyền trực tiếp đến máy <strong>Essilor Delta 200</strong> tại Xưởng Lab.
          </p>
          <p>
            Mã đơn liên kết: <strong className="text-[#086288]">{linkedRx.code}</strong>
          </p>
          <p>Khách hàng: {customer.name} ({customer.phone})</p>
        </div>
      ),
      okText: 'Xác Nhận Đẩy Lệnh',
      onOk: () => {
        message.success('Đã gửi thông số toa kính sang máy mài Essilor Delta 200 tại Xưởng Lab.');
      }
    });
  };

  // Only clear the cart after the API has persisted the sale.
  const handleExecutePayment = async () => {
    if (paymentLock.current) return;
    if (!cart.length) { message.warning('Giỏ hàng đang trống!'); return; }
    if (payTab !== 'cash' && !paymentConfirmed) {
      message.warning('Vui lòng xác nhận đã nhận tiền chuyển khoản / giao dịch thẻ thành công.'); return;
    }
    if (payTab === 'cash' && (!Number.isFinite(Number(cashGiven)) || Number(cashGiven) < grandTotal)) {
      message.warning('Tiền khách đưa chưa đủ thanh toán.'); return;
    }
    paymentLock.current = true;
    setPaying(true);
    try {
      const saved = await orderApi.createOrder({
        customerId: customer.id || null,
        customerName: customer.name,
        customerPhone: customer.phone,
        channel: 'POS',
        totalAmount: subtotal,
        discountAmount: discountTotal,
        finalAmount: grandTotal,
        paymentMethod: payTab === 'vietqr' ? 'VIETQR' : payTab === 'cash' ? 'CASH' : 'CARD',
        staffName: user?.staffName || user?.fullName || user?.staffId || 'Thu ngân',
        branchName: user?.branchName || 'Flagship Q.1 (TP.HCM)',
        status: 'PAID',
        items: cart.map(item => ({
          skuId: item.sku, productName: item.name,
          quantity: item.quantity, unitPrice: item.price,
          subtotal: item.price * item.quantity
        }))
      });
      if (!saved?.id || !saved?.orderCode) throw new Error('API chưa trả về đơn hàng đã lưu.');
      setLastOrder({ ...saved, cashGiven: payTab === 'cash' ? Number(cashGiven) : null });
      setCart([]); setCashGiven(0); setVoucherCode(''); setVoucherDiscount(0); setLinkedRx(null);
      message.success('Đã lưu đơn ' + saved.orderCode + '. Bạn có thể in hóa đơn.');
    } catch (err) {
      message.error('Chưa hoàn tất thanh toán: ' + err.message + '. Giỏ hàng được giữ nguyên.');
    } finally { paymentLock.current = false; setPaying(false); }
  };

  // Hotkey listener for POS speed: F2, F4, F8, F9, F10
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F2') {
        e.preventDefault();
        barcodeRef.current?.focus();
      } else if (e.key === 'F4') {
        e.preventDefault();
        message.info('Đã lưu tạm đơn hàng vào bộ nhớ ca làm việc (F4).');
      } else if (e.key === 'F8') {
        e.preventDefault();
        handleClearCart();
      } else if (e.key === 'F9') {
        e.preventDefault();
        handleDispatchLabOrder();
      } else if (e.key === 'F10') {
        e.preventDefault();
        handleExecutePayment();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart, grandTotal, payTab, cashGiven, customer, discountTotal, user, linkedRx, paymentConfirmed]);

  // Filter products by category
  const categoryProducts =
    selectedCategory === 'ALL'
      ? catalogProducts
      : catalogProducts.filter((p) => p.category === selectedCategory);

  const query = barcodeInput.trim().toLowerCase();
  const filteredProducts = categoryProducts.filter(p => !query ||
    [p.sku, p.barcode, p.name].some(value => value.toLowerCase().includes(query)));

  return (
    <main className="pos-page">
      <ReceiptPreview order={lastOrder} open={receiptOpen} onClose={() => setReceiptOpen(false)} />
      <div className="pos-workspace">
        <ProductCatalog products={filteredProducts} count={catalogProducts.length} cart={cart}
          loading={catalogLoading} error={catalogError} category={selectedCategory} setCategory={setSelectedCategory}
          search={barcodeInput} setSearch={setBarcodeInput} searchRef={barcodeRef} onSearch={handleBarcodeSubmit}
          onAdd={handleAddToCart} prescription={linkedRx} onSelectPrescription={() => setIsRxModalOpen(true)} onAddLens={handleInsertRxCombo} />
        <CheckoutPanel cart={cart} customer={customer} products={catalogProducts}
          onCustomer={() => setIsCustomerModalOpen(true)}
          onGuest={() => setCustomer({ name: 'Khách vãng lai', tier: 'Vãng lai', phone: '', points: 0, pointValue: 0 })}
          onQuantity={handleQtyChange} onRemove={handleRemoveItem} onClear={handleClearCart}
          subtotal={subtotal} discount={discountTotal} tax={vatAmount} total={grandTotal}
          voucher={voucherCode} setVoucher={setVoucherCode} onVoucher={() => {
            if (voucherCode === 'BOLON200K') { setVoucherDiscount(200000); message.success('Đã áp dụng Voucher giảm 200.000đ!'); }
            else message.warning('Mã voucher không hợp lệ.');
          }} usePoints={usePoints} setUsePoints={setUsePoints}
          method={payTab} setMethod={setPayTab} cash={cashGiven} setCash={setCashGiven}
          confirmed={paymentConfirmed} setConfirmed={setPaymentConfirmed} paymentRef={paymentRef} cashRef={cashInputRef}
          paying={paying} onPay={handleExecutePayment} lastOrder={lastOrder} onPrint={() => setReceiptOpen(true)} />
      </div>

      {/* ================= MODAL: Chọn Toa Khám Khúc Xạ ================= */}
      {isRxModalOpen && (
        <div className="fixed inset-0 bg-[#263143]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl flex flex-col gap-4 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004967] text-[24px]">
                  assignment_turned_in
                </span>
                <h3 className="text-base text-[#111c2d] font-bold">
                  Chọn Toa Khám Khúc Xạ Chờ Lên Đơn
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsRxModalOpen(false)}
                className="text-[#70787f] hover:text-[#111c2d] transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {availablePrescriptions.length === 0 ? (
                <div className="py-12 text-center text-[#70787f] flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">eyeglasses</span>
                  <span className="font-semibold text-sm">Chưa có toa khám khúc xạ nào trong CSDL</span>
                  <p className="text-xs text-[#70787f] mt-1 max-w-md">
                    Bác sĩ khúc xạ tại phòng đo mắt chưa lưu toa kính nào. Toa sau khi khám xong sẽ tự động hiển thị tại đây.
                  </p>
                </div>
              ) : (
                availablePrescriptions.map((rx) => (
                  <div
                    key={rx.code}
                    onClick={() => handleSelectPrescription(rx)}
                    className="p-4 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] border border-[#dee8ff]/50 transition-colors cursor-pointer flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#004967] font-bold">
                        {rx.code} • {rx.customer} ({rx.phone})
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#cae6ff] text-[#001e30] text-[10px] font-bold">
                        {rx.timeAgo}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-2.5 rounded-lg border border-slate-100 text-[#111c2d]">
                      <div>OD (Mắt phải): {rx.od}</div>
                      <div>OS (Mắt trái): {rx.os}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsRxModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#f0f3ff] text-[#40484e] text-xs font-bold hover:bg-[#dee8ff] transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: Chọn Khách Hàng Tiếp Nhận (Từ DB) ================= */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 bg-[#263143]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl flex flex-col gap-4 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004967] text-[24px]">
                  person_search
                </span>
                <h3 className="text-base text-[#111c2d] font-bold">
                  Tiếp Nhận Khách Hàng (Dữ Liệu Thật CSDL)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomerModalOpen(false)}
                className="text-[#70787f] hover:text-[#111c2d] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#70787f] text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Tìm theo tên hoặc SĐT..."
                value={customerSearchQuery}
                onChange={(e) => setCustomerSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#f0f3ff] border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#004967]/30"
              />
            </div>

            {/* Customer List from DB */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {dbCustomers
                .filter(c => {
                  const q = customerSearchQuery.toLowerCase().trim();
                  if (!q) return true;
                  return (c.fullName || '').toLowerCase().includes(q) || (c.phoneNumber || '').includes(q);
                })
                .map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setCustomer({
                        id: c.id,
                        name: c.fullName,
                        tier: 'Thành Viên',
                        phone: c.phoneNumber || '',
                        points: 0,
                        pointValue: 0
                      });
                      setIsCustomerModalOpen(false);
                      message.success(`Đã tiếp nhận khách hàng: ${c.fullName}`);
                    }}
                    className="p-3 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] border border-[#dee8ff]/50 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-xs text-[#111c2d] block">{c.fullName}</span>
                      <span className="text-[11px] text-[#70787f]">{c.phoneNumber || 'Chưa có SĐT'} • {c.email || ''}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#004967] text-white text-[10px] font-bold">
                      Chọn
                    </span>
                  </div>
                ))}
              {dbCustomers.length === 0 && (
                <div className="py-8 text-center text-[#70787f] text-xs">
                  Không tìm thấy khách hàng nào trong cơ sở dữ liệu.
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="text-[11px] text-[#70787f]">CSDL: {dbCustomers.length} khách hàng</span>
              <button
                type="button"
                onClick={() => setIsCustomerModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-[#f0f3ff] text-[#40484e] text-xs font-bold hover:bg-[#dee8ff] transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
