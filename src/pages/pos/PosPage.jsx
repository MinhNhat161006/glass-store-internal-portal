import React, { useState, useEffect, useRef } from 'react';
import { message, Modal } from 'antd';
import { orderApi } from '../../api/orderApi';
import { productApi } from '../../api/productApi';
import { labApi } from '../../api/labApi';
import { prescriptionApi } from '../../api/prescriptionApi';

export default function PosPage() {
  // Category filter
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Search / Barcode input
  const [barcodeInput, setBarcodeInput] = useState('');
  const barcodeRef = useRef(null);

  // Cart state (Clean)
  const [cart, setCart] = useState([]);

  // Customer state
  const [customer, setCustomer] = useState({
    name: 'Kh�ch v�ng lai',
    tier: 'V�ng lai',
    phone: '',
    points: 0,
    pointValue: 0
  });

  const [usePoints, setUsePoints] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  // Payment tab
  const [payTab, setPayTab] = useState('vietqr');
  const [cashGiven, setCashGiven] = useState(0);

  // Rx Modal state
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [linkedRx, setLinkedRx] = useState(null);
  useEffect(() => {
    const fetchLiveRx = async () => {
      try {
        const list = await prescriptionApi.getAllPrescriptions();
        if (Array.isArray(list) && list.length > 0) {
          const first = list[0];
          setLinkedRx({
            code: '#RX-2026-' + first.id,
            doctor: first.optometristName || 'BS. Vu Anh Tu?n',
            customer: first.customerName || 'Nguy?n Ho�ng Duy',
            od: 'Sph ' + first.odSph + ' Cyl ' + first.odCyl + ' Ax ' + first.odAxis + '�',
            os: 'Sph ' + first.osSph + ' Cyl ' + first.osCyl + ' Ax ' + first.osAxis + '�',
            pd: first.pd + 'mm'
          });
        }
      } catch (err) {
        console.warn('Sync live rx in POS note:', err.message);
      }
    };
    fetchLiveRx();
  }, []);

  // Product catalog list (Clean initialized from backend)
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
                  shortSku: (v.sku || '').split('-').pop() || 'SKU',
                  name: (p.name + ' - ' + (v.name || v.color || '')).trim(),
                  brand: p.brandName || 'OptiVision',
                  category: p.productType === 'FRAME' ? 'TITAN' : p.productType === 'LENS' ? 'LENS_CRIZAL' : 'ACCESSORY',
                  price: Number(v.price || 1500000),
                  stock: (v.stockQuantity != null ? v.stockQuantity : 10) + ' c�i',
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
        console.warn('L?i l?y catalog POS:', err.message);
      }
    };
    fetchLiveCatalog();
  }, []);

  // Prescriptions available for linking (Real sync)
  const [availablePrescriptions, setAvailablePrescriptions] = useState([]);
  useEffect(() => {
    prescriptionApi.getAllPrescriptions().then(list => {
      if (Array.isArray(list)) {
        const mapped = list.map(rx => ({
          code: '#RX-2026-0' + rx.id,
          customer: rx.customerName || 'Kh�ch H�ng',
          phone: '0918 732 998',
          timeAgo: 'Toa kh�m v?a t?o',
          od: `Sph ${rx.odSph} | Cyl ${rx.odCyl} | Ax ${rx.odAxis}�`,
          os: `Sph ${rx.osSph} | Cyl ${rx.osCyl} | Ax ${rx.osAxis}�`,
          pd: `${rx.pd || 63}mm`,
          doctor: rx.optometristName || 'BS. L� Th? �nh Tuy?t'
        }));
        setAvailablePrescriptions(mapped);
      }
    }).catch(e => console.warn('POS available rx sync:', e));
  }, []);

  // Calculation of totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountTotal = voucherDiscount + (usePoints ? customer.pointValue : 0);
  const taxableAmount = Math.max(0, subtotal - discountTotal);
  const vatAmount = Math.round(taxableAmount * 0.08);
  const grandTotal = taxableAmount + vatAmount;

  // Add product to cart
  const handleAddToCart = (product) => {
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
          sub: product.brand,
          price: product.price,
          quantity: 1,
          rxInfo: null
        }
      ]);
    }
    message.success(`�� th�m ${product.name} v�o don b�n!`);
  };

  // Adjust quantity
  const handleQtyChange = (sku, delta) => {
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
    setCart((prev) => prev.filter((item) => item.sku !== sku));
    message.info('�� x�a s?n ph?m kh?i gi? h�ng.');
  };

  // Clear entire cart
  const handleClearCart = () => {
    Modal.confirm({
      title: 'X�a gi? h�ng?',
      content: 'B?n c� ch?c ch?n mu?n l�m tr?ng to�n b? don b�n hi?n t?i (F8)?',
      okText: 'X�a',
      cancelText: 'H?y',
      okButtonProps: { danger: true },
      onOk: () => {
        setCart([]);
        message.info('Gi? h�ng d� du?c l�m tr?ng.');
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
        p.shortSku.toLowerCase() === query ||
        p.name.toLowerCase().includes(query)
    );

    if (found) {
      handleAddToCart(found);
    } else {
      handleAddToCart({
        sku: barcodeInput.trim().toUpperCase(),
        shortSku: barcodeInput.trim().toUpperCase(),
        name: `S?n ph?m m� ${barcodeInput.trim().toUpperCase()}`,
        brand: 'Gia c�ng d?c bi?t',
        category: 'CUSTOM',
        price: 1500000,
        stock: '1'
      });
    }
    setBarcodeInput('');
  };

  // Insert Rx Combo
  const handleInsertRxCombo = () => {
    handleAddToCart({
      sku: 'LZ-CRIZAL-HR167',
      shortSku: 'LZ-CRIZAL',
      name: 'Tr�ng Crizal Sapphire HR 1.67',
      brand: 'Essilor France',
      category: 'LENS_CRIZAL',
      price: 2950000,
      stock: '48 c?p'
    });
    message.success(`�� n?p tr�ng Crizal theo toa ${linkedRx.code} c?a kh�ch ${linkedRx.customer}!`);
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
    message.success(`�� li�n k?t ${rx.code} cho kh�ch ${rx.customer}!`);
  };

  // Dispatch Lab Order
  const handleDispatchLabOrder = () => {
    if (cart.length === 0) {
      message.warning('Vui l�ng ch?n s?n ph?m tru?c khi chuy?n xu?ng m�i!');
      return;
    }
    Modal.confirm({
      title: '�?y L?nh Gia C�ng M�i L?p K�nh (F9)',
      content: (
        <div className="space-y-1 text-xs text-slate-600 pt-1">
          <p>
            L?nh m�i tr�ng s? du?c truy?n tr?c ti?p d?n m�y <strong>Essilor Delta 200</strong> t?i Xu?ng Lab.
          </p>
          <p>
            M� don li�n k?t: <strong className="text-[#086288]">{linkedRx.code}</strong>
          </p>
          <p>Kh�ch h�ng: {customer.name} ({customer.phone})</p>
        </div>
      ),
      okText: 'X�c Nh?n �?y L?nh',
      onOk: () => {
        message.success('�� g?i th�ng s? toa k�nh sang m�y m�i Essilor Delta 200 t?i Xu?ng Lab.');
      }
    });
  };

  // Execute Payment
  const handleExecutePayment = async () => {
    try {
      await orderApi.createOrder({
        orderCode: 'OPT-' + Math.floor(1000 + Math.random() * 9000) + '-POS',
        customerId: 10,
        customerName: customer.name,
        customerPhone: customer.phone,
        channel: 'POS',
        totalAmount: subtotal,
        discountAmount: discountAmount,
        finalAmount: grandTotal,
        paymentMethod: payTab === 'vietqr' ? 'VIETQR' : payTab === 'cash' ? 'CASH' : 'VNPAY',
        staffName: 'STF-088 (Nguy?n Thu Ng�n)',
        branchName: 'Flagship Q.1 (TP.HCM)',
        status: 'PAID',
        items: cart.map(item => ({
          skuId: item.sku,
          productName: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          subtotal: item.price * item.quantity
        }))
      });
    } catch (err) {
      console.warn('Sync POS order to DB note:', err.message);
    }
    if (cart.length === 0) {
      message.warning('Gi? h�ng dang tr?ng!');
      return;
    }
    Modal.success({
      title: 'Thanh To�n Th�nh C�ng (F10)',
      content: (
        <div className="space-y-2 text-xs text-slate-600 pt-2">
          <p className="text-sm font-bold text-[#004967]">
            T?ng thanh to�n: {grandTotal.toLocaleString('vi-VN')} d
          </p>
          <p>Phuong th?c: {payTab === 'vietqr' ? 'VietQR Napas247' : payTab === 'cash' ? 'Ti?n m?t' : 'Th? mPOS'}</p>
          <p>Kh�ch h�ng: {customer.name} (T�ch luy +65 OptiPoints)</p>
          <p className="p-2 bg-slate-100 rounded text-slate-500 font-mono text-[11px]">
            �ang in h�a don nhi?t K80 v� k�ch ho?t b?o h�nh di?n t?...
          </p>
        </div>
      ),
      onOk: () => {
        setCart([]);
      }
    });
  };

  // Hotkey listener for POS speed: F2, F4, F8, F9, F10
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F2') {
        e.preventDefault();
        barcodeRef.current?.focus();
      } else if (e.key === 'F4') {
        e.preventDefault();
        message.info('�� luu t?m don h�ng v�o b? nh? ca l�m vi?c (F4).');
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
  }, [cart, grandTotal, payTab]);

  // Filter products by category
  const filteredProducts =
    selectedCategory === 'ALL'
      ? catalogProducts
      : catalogProducts.filter((p) => p.category === selectedCategory);

  return (
    <main className="w-full bg-[#f9f9ff] min-h-screen text-[#111c2d]">
      {/* ================= 65% / 35% Full-Width Split Layout ================= */}
      <div className="flex flex-col xl:flex-row w-full gap-4 p-4 min-h-[calc(100vh-4rem)]">
        {/* ---------------- LEFT PANEL (65%): Catalog & Scanning ---------------- */}
        <div className="w-full xl:w-[65%] flex flex-col gap-3">
          {/* Bar 1: Barcode Input & Rx Link Button */}
          <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <form onSubmit={handleBarcodeSubmit} className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#004967] text-[20px]">
                  barcode_scanner
                </span>
                <input
                  ref={barcodeRef}
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="Qu�t Barcode ho?c nh?p SKU / T�n k�nh (F2)..."
                  className="w-full h-10 pl-10 pr-20 rounded-lg bg-[#f0f3ff] text-[#111c2d] text-sm placeholder:text-[#70787f] focus:bg-white focus:ring-2 focus:ring-[#004967] focus:outline-none transition-all"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-[#dee8ff] text-[#40484e] font-mono text-[11px] font-bold">
                    F2
                  </span>
                </div>
              </div>
            </form>

            <button
              type="button"
              onClick={() => setIsRxModalOpen(true)}
              className="flex items-center justify-center gap-2 px-3 h-10 rounded-lg bg-[#e7eeff] hover:bg-[#cae6ff] text-[#004967] text-xs font-bold transition-colors cursor-pointer shadow-xs shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">eyeglasses</span>
              <span>Li�n k?t Toa Kh�m (OD/OS)</span>
              <span className="px-2 py-0.5 rounded-full bg-[#004967] text-white text-[11px] font-bold ml-1">
                {availablePrescriptions.length} Ch? x? l�
              </span>
            </button>
          </div>

          {/* Bar 2: Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3.5 py-2 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-[#004967] text-white shadow-xs'
                  : 'bg-white text-[#40484e] hover:bg-[#e7eeff]'
              }`}
            >
              T?t c? ({catalogProducts.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('TITAN')}
              className={`px-3.5 py-2 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'TITAN'
                  ? 'bg-[#004967] text-white shadow-xs'
                  : 'bg-white text-[#40484e] hover:bg-[#e7eeff]'
              }`}
            >
              G?ng Titan Si�u Nh?
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('LENS_CRIZAL')}
              className={`px-3.5 py-2 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'LENS_CRIZAL'
                  ? 'bg-[#004967] text-white shadow-xs'
                  : 'bg-white text-[#40484e] hover:bg-[#e7eeff]'
              }`}
            >
              Tr�ng Crizal &amp; Zeiss
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('TRANSITIONS')}
              className={`px-3.5 py-2 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'TRANSITIONS'
                  ? 'bg-[#004967] text-white shadow-xs'
                  : 'bg-white text-[#40484e] hover:bg-[#e7eeff]'
              }`}
            >
              Tr�ng �?i M�u Transitions
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('ACCESSORY')}
              className={`px-3.5 py-2 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'ACCESSORY'
                  ? 'bg-[#004967] text-white shadow-xs'
                  : 'bg-white text-[#40484e] hover:bg-[#e7eeff]'
              }`}
            >
              Ph? Ki?n &amp; Dung D?ch Nano
            </button>
          </div>

                    {/* Bar 3: Prescription Quick Banner */}
          {linkedRx && (
            <div className="bg-white rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#e7eeff] text-[#004967] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">clinical_notes</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#111c2d] font-bold">
                      Toa k�nh kh�c x? v?a do: {linkedRx.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e7eeff] text-[#40484e] text-[10px] font-semibold">
                      {linkedRx.doctor}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#40484e] mt-0.5 leading-tight">
                    Kh�ch: <strong className="text-[#111c2d]">{linkedRx.customer}</strong> | OD: {linkedRx.od} | OS:{' '}
                    {linkedRx.os} | PD: {linkedRx.pd}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleInsertRxCombo}
                className="px-3 py-1.5 rounded-lg bg-[#004967] hover:bg-[#086288] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_task</span>
                <span>N?p Combo Toa N�y</span>
              </button>
            </div>
          )}
          {/* Grid of Products */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto max-h-[calc(100vh-21rem)] pr-1">
            {filteredProducts.map((p) => (
              <div
                key={p.sku}
                onClick={() => handleAddToCart(p)}
                className="group bg-white rounded-xl p-2.5 shadow-xs hover:shadow-md border border-slate-100 hover:border-[#8fcdfd] transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-[#f0f3ff] mb-2">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-white/95 font-mono text-[10px] text-[#004967] font-bold shadow-xs">
                      {p.shortSku}
                    </span>
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-white/95 text-[10px] text-[#111c2d] font-semibold shadow-xs">
                      T?n: {p.stock}
                    </span>
                  </div>

                  <div className="text-[10px] text-[#70787f] uppercase tracking-wider font-bold">
                    {p.brand}
                  </div>
                  <h4 className="text-xs text-[#111c2d] font-bold line-clamp-1 mt-0.5">{p.name}</h4>
                </div>

                <div className="mt-2 pt-2 flex items-center justify-between border-t border-slate-50">
                  <span className="text-xs text-[#004967] font-bold">
                    {p.price.toLocaleString('vi-VN')}d
                  </span>
                  <button
                    type="button"
                    className="w-7 h-7 rounded-lg bg-[#e7eeff] group-hover:bg-[#004967] group-hover:text-white text-[#004967] flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Machine & Hardware Status */}
          <div className="mt-auto bg-white rounded-xl p-2.5 shadow-xs border border-slate-100 flex items-center justify-between text-xs text-[#40484e]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#004967]" />
                <span>M�y qu�t:</span> <strong className="text-[#111c2d]">Honeywell Xenon (Ready)</strong>
              </span>
              <span>�</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#004967]" />
                <span>M�y m�i:</span> <strong className="text-[#111c2d]">Essilor Delta 200 (Online)</strong>
              </span>
            </div>
            <div className="font-mono font-bold text-[11px] text-[#19648f]">
              Phi�n ca: #POS-Q1-20260330
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT PANEL (35%): Customer, Cart, Payment ---------------- */}
        <div className="w-full xl:w-[35%] flex flex-col gap-3">
          {/* Box 1: Customer Info */}
          <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004967] text-[18px]">person_pin</span>
                <span className="text-xs text-[#111c2d] font-bold">Kh�ch h�ng th�nh vi�n</span>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() =>
                    setCustomer({
                      name: 'Kh�ch V�ng Lai',
                      tier: 'Thu?ng',
                      phone: '0900 000 000',
                      points: 0,
                      pointValue: 0
                    })
                  }
                  className="px-2 py-0.5 rounded-lg bg-[#e7eeff] hover:bg-[#dee8ff] text-[#40484e] font-semibold transition-colors"
                >
                  V�ng lai
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCustomer({
                      name: 'Nguy?n Ho�ng Duy',
                      tier: 'VIP 3 Silver',
                      phone: '0918 732 998',
                      points: 450,
                      pointValue: 45000
                    })
                  }
                  className="px-2 py-0.5 rounded-lg bg-[#004967] text-white font-bold hover:bg-[#086288] transition-colors"
                >
                  + M?i
                </button>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#f0f3ff] flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#111c2d] font-bold">{customer.name}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#e7eeff] text-[#004967] text-[10px] font-bold">
                    {customer.tier}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#70787f]">{customer.phone}</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#dee8ff]/50">
                <div className="flex items-center gap-1 text-xs text-[#40484e]">
                  <span className="material-symbols-outlined text-[15px] text-[#004967]">stars</span>
                  <span>
                    {customer.points} OptiPoints (= {customer.pointValue.toLocaleString('vi-VN')}d)
                  </span>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={usePoints}
                    onChange={(e) => setUsePoints(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-[#004967] focus:ring-[#004967]"
                  />
                  <span className="text-xs text-[#004967] font-bold">Kh?u tr?</span>
                </label>
              </div>
            </div>
          </div>

          {/* Box 2: Cart Items & Calculations */}
          <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-100 flex flex-col flex-1">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004967] text-[18px]">shopping_bag</span>
                <span className="text-xs text-[#111c2d] font-bold">
                  Chi ti?t don h�ng ({cart.reduce((sum, i) => sum + i.quantity, 0)})
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearCart}
                className="text-[#ba1a1a] hover:opacity-80 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">delete_sweep</span>
                <span>X�a</span>
              </button>
            </div>

                        {/* Scrollable cart list */}
            <div className="flex-1 overflow-y-auto max-h-52 xl:max-h-56 space-y-2 py-2 pr-1">
              {cart.length === 0 ? (
                <div className="py-8 text-center text-[#70787f] flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-slate-300 mb-1">shopping_cart</span>
                  <span className="text-xs font-semibold text-slate-500">Gi? h�ng dang tr?ng</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Ch?n s?n ph?m b�n tr�i ho?c qu�t m� SKU</span>
                </div>
              ) : (
                cart.map((item) => (
                <div
                  key={item.id}
                  className="p-2 rounded-lg bg-[#f0f3ff] flex flex-col gap-1 transition-colors hover:bg-[#e7eeff]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs text-[#111c2d] font-bold block leading-tight">
                        {item.name}
                      </span>
                      <span className="font-mono text-[#70787f] block text-[10px]">
                        SKU: {item.sku} | {item.sub}
                      </span>
                      {item.rxInfo && (
                        <div className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#e7eeff] text-[#004967] text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[12px]">visibility</span>
                          <span>{item.rxInfo}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.sku)}
                      className="text-[#70787f] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 bg-white rounded p-0.5 shadow-xs">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(item.sku, -1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-xs text-[#40484e] hover:bg-slate-100 font-bold"
                      >
                        -
                      </button>
                      <span className="font-mono text-[#111c2d] px-1 font-bold text-xs">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange(item.sku, 1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-xs text-[#40484e] hover:bg-slate-100 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-[#004967] font-bold">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}d
                      </span>
                    </div>
                  </div>
                </div>
              )))}
            </div>

            {/* Voucher Row */}
            <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[#70787f] text-[16px]">
                  sell
                </span>
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  placeholder="M� voucher..."
                  className="w-full h-8 pl-7 pr-2 rounded-lg bg-[#f0f3ff] font-mono text-xs text-[#111c2d] uppercase focus:outline-none focus:bg-[#e7eeff]"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (voucherCode === 'BOLON200K') {
                    setVoucherDiscount(200000);
                    message.success('�� �p d?ng Voucher gi?m 200.000d!');
                  } else {
                    message.warning('M� voucher kh�ng h?p l?.');
                  }
                }}
                className="h-8 px-2.5 rounded-lg bg-[#e7eeff] hover:bg-[#cae6ff] text-[#111c2d] text-xs font-bold transition-colors cursor-pointer"
              >
                �p d?ng
              </button>
            </div>

            {/* Pricing details */}
            <div className="pt-2 space-y-1 text-xs text-[#40484e]">
              <div className="flex items-center justify-between">
                <span>T?m t�nh ({cart.reduce((sum, i) => sum + i.quantity, 0)} m�n):</span>
                <span className="font-mono text-[#111c2d] font-semibold">
                  {subtotal.toLocaleString('vi-VN')}d
                </span>
              </div>
              {voucherDiscount > 0 && (
                <div className="flex items-center justify-between text-[#004967]">
                  <span>Voucher ({voucherCode}):</span>
                  <span className="font-mono font-bold">-{voucherDiscount.toLocaleString('vi-VN')}d</span>
                </div>
              )}
              {usePoints && (
                <div className="flex items-center justify-between text-[#004967]">
                  <span>OptiPoints ({customer.points} pts):</span>
                  <span className="font-mono font-bold">
                    -{customer.pointValue.toLocaleString('vi-VN')}d
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span>Thu? VAT (8%):</span>
                <span className="font-mono text-[#111c2d]">{vatAmount.toLocaleString('vi-VN')}d</span>
              </div>

              {/* Grand Total Box */}
              <div className="mt-1 p-2 rounded-lg bg-[#f0f3ff] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#70787f] font-bold block">
                    C?n thanh to�n
                  </span>
                  <span className="text-[11px] text-[#40484e]">�� g?m VAT &amp; VIP</span>
                </div>
                <div className="text-right">
                  <span className="text-xl text-[#004967] tracking-tight font-extrabold">
                    {grandTotal.toLocaleString('vi-VN')}d
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Box 3: Payment Method Tabs */}
          <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-100 flex flex-col gap-2">
            <div className="text-xs text-[#111c2d] font-bold flex items-center justify-between">
              <span>Phuong th?c thanh to�n</span>
              <span className="font-mono text-[11px] text-[#004967] font-normal">T? d?ng</span>
            </div>

            {/* Tab switchers */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#f0f3ff] rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setPayTab('vietqr')}
                className={`py-1.5 rounded-md flex items-center justify-center gap-1 font-bold transition-all cursor-pointer ${
                  payTab === 'vietqr'
                    ? 'bg-white text-[#004967] shadow-xs'
                    : 'text-[#40484e] hover:text-[#111c2d]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                <span>VietQR</span>
              </button>

              <button
                type="button"
                onClick={() => setPayTab('cash')}
                className={`py-1.5 rounded-md flex items-center justify-center gap-1 font-bold transition-all cursor-pointer ${
                  payTab === 'cash'
                    ? 'bg-white text-[#004967] shadow-xs'
                    : 'text-[#40484e] hover:text-[#111c2d]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">payments</span>
                <span>Ti?n m?t</span>
              </button>

              <button
                type="button"
                onClick={() => setPayTab('card')}
                className={`py-1.5 rounded-md flex items-center justify-center gap-1 font-bold transition-all cursor-pointer ${
                  payTab === 'card'
                    ? 'bg-white text-[#004967] shadow-xs'
                    : 'text-[#40484e] hover:text-[#111c2d]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">credit_card</span>
                <span>Th? POS</span>
              </button>
            </div>

            {/* Tab 1: VietQR Panel */}
            {payTab === 'vietqr' && (
              <div className="p-2 rounded-lg bg-[#f0f3ff] flex items-center gap-3">
                <div className="w-20 h-20 rounded-lg bg-white p-1 shadow-xs flex flex-col items-center justify-between shrink-0">
                  <svg className="w-full h-full text-[#111c2d]" fill="currentColor" viewBox="0 0 100 100">
                    <path d="M5,5 h30 v30 h-30 z M10,10 v20 h20 v-20 z M15,15 h10 v10 h-10 z" />
                    <path d="M65,5 h30 v30 h-30 z M70,10 v20 h20 v-20 z M75,15 h10 v10 h-10 z" />
                    <path d="M5,65 h30 v30 h-30 z M10,70 v20 h20 v-20 z M15,75 h10 v10 h-10 z" />
                    <rect height="25" width="8" x="42" y="5" />
                    <rect height="15" width="5" x="55" y="15" />
                    <rect height="20" width="20" x="40" y="40" />
                    <rect height="8" width="30" x="65" y="45" />
                    <rect height="27" width="10" x="45" y="68" />
                    <rect height="12" width="12" x="65" y="65" />
                    <rect height="15" width="13" x="82" y="80" />
                  </svg>
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#004967]">
                      <span className="w-2 h-2 rounded-full bg-[#004967] animate-ping" />
                      <span className="text-xs font-bold">Ch? qu�t VietQR</span>
                    </div>
                    <p className="text-[11px] text-[#40484e] mt-0.5 leading-tight">
                      QR n?p s?n <strong className="text-[#111c2d]">{grandTotal.toLocaleString('vi-VN')}d</strong> v� t? kh?p h�a don.
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-[#dee8ff] text-[#40484e] font-mono text-[10px] font-bold">
                      Napas247
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#dee8ff] text-[#40484e] font-mono text-[10px] font-bold">
                      VCB
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Cash Panel */}
            {payTab === 'cash' && (
              <div className="p-2 rounded-lg bg-[#f0f3ff] flex flex-col gap-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#40484e]">Ti?n kh�ch dua:</span>
                  <input
                    type="number"
                    value={cashGiven}
                    onChange={(e) => setCashGiven(Number(e.target.value))}
                    className="w-32 h-7 px-2 rounded-md bg-white text-right font-mono text-[#004967] font-bold focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#dee8ff]/50">
                  <span className="text-[#40484e]">Th?i l?i:</span>
                  <span className="text-sm font-bold text-[#111c2d]">
                    {Math.max(0, cashGiven - grandTotal).toLocaleString('vi-VN')}d
                  </span>
                </div>
              </div>
            )}

            {/* Tab 3: Card Panel */}
            {payTab === 'card' && (
              <div className="p-2.5 rounded-lg bg-[#f0f3ff] flex items-center justify-between text-xs">
                <span className="text-[#40484e]">Thi?t b? mPOS #02:</span>
                <span className="px-2 py-0.5 rounded bg-[#e7eeff] text-[#004967] font-bold">
                  S?n s�ng qu?t / ch?m
                </span>
              </div>
            )}
          </div>

          {/* Box 4: Action Hotkeys Bar */}
          <div className="grid grid-cols-4 gap-1.5 pt-0.5 text-xs">
            {/* F4 Hold */}
            <button
              type="button"
              onClick={() => message.info('�� luu t?m don h�ng v�o b? nh? (F4).')}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#e7eeff] hover:bg-[#dee8ff] text-[#40484e] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">pause_circle</span>
              <span className="text-[11px] font-bold mt-0.5">T?m luu</span>
              <span className="font-mono text-[#70787f] text-[10px]">[F4]</span>
            </button>

            {/* F8 Cancel */}
            <button
              type="button"
              onClick={handleClearCart}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#f0f3ff] hover:bg-[#ffdad6] text-[#ba1a1a] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
              <span className="text-[11px] font-bold mt-0.5">H?y don</span>
              <span className="font-mono text-[10px]">[F8]</span>
            </button>

            {/* F9 Lab Order */}
            <button
              type="button"
              onClick={handleDispatchLabOrder}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#e7eeff] hover:bg-[#cae6ff] text-[#004967] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
              <span className="text-[11px] font-bold mt-0.5">L?nh Lab</span>
              <span className="font-mono text-[10px]">[F9]</span>
            </button>

            {/* F10 Payment */}
            <button
              type="button"
              onClick={handleExecutePayment}
              className="col-span-1 flex flex-col items-center justify-center p-2 rounded-lg bg-[#004967] hover:bg-[#086288] text-white shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span className="text-[12px] font-bold mt-0.5">Thanh To�n</span>
              <span className="font-mono text-[10px] text-[#a5dbff]">[F10]</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL: Ch?n Toa Kh�m Kh�c X? ================= */}
      {isRxModalOpen && (
        <div className="fixed inset-0 bg-[#263143]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl flex flex-col gap-4 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004967] text-[24px]">
                  assignment_turned_in
                </span>
                <h3 className="text-base text-[#111c2d] font-bold">
                  Ch?n Toa Kh�m Kh�c X? Ch? L�n �on
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
              {availablePrescriptions.map((rx) => (
                <div
                  key={rx.code}
                  onClick={() => handleSelectPrescription(rx)}
                  className="p-4 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] border border-[#dee8ff]/50 transition-colors cursor-pointer flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#004967] font-bold">
                      {rx.code} � {rx.customer} ({rx.phone})
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#cae6ff] text-[#001e30] text-[10px] font-bold">
                      {rx.timeAgo}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-2.5 rounded-lg border border-slate-100 text-[#111c2d]">
                    <div>OD (M?t ph?i): {rx.od}</div>
                    <div>OS (M?t tr�i): {rx.os}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsRxModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#f0f3ff] text-[#40484e] text-xs font-bold hover:bg-[#dee8ff] transition-colors cursor-pointer"
              >
                ��ng
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}






