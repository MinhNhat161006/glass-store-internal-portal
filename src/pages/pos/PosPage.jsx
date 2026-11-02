import React, { useState, useEffect, useRef } from 'react';
import { message, Modal } from 'antd';

export default function PosPage() {
  // Category filter
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Search / Barcode input
  const [barcodeInput, setBarcodeInput] = useState('');
  const barcodeRef = useRef(null);

  // Cart state
  const [cart, setCart] = useState([
    {
      id: 'BL-BJ3120-C10',
      sku: 'BL-BJ3120-C10',
      name: 'Gọng Bolon Graceful BJ3120 Rose Gold',
      sub: 'Gọng chính hãng',
      price: 3280000,
      quantity: 1,
      rxInfo: null
    },
    {
      id: 'LZ-CRIZAL-HR167',
      sku: 'LZ-CRIZAL-HR167',
      name: 'Tròng Crizal Sapphire HR 1.67',
      sub: '1 cặp (2 tròng)',
      price: 2950000,
      quantity: 2,
      rxInfo: 'Toa #RX-2026-889 [OD: -3.25 / OS: -2.75]'
    },
    {
      id: 'ACC-NANO-FOG',
      sku: 'ACC-NANO-FOG',
      name: 'Khăn lau Nano chống bám hơi sương 24H',
      sub: 'Phụ kiện chính hãng',
      price: 100000,
      quantity: 1,
      rxInfo: null
    }
  ]);

  // Customer state
  const [customer, setCustomer] = useState({
    name: 'Nguyễn Hoàng Duy',
    tier: 'VIP 3 Silver',
    phone: '0918 732 998',
    points: 450,
    pointValue: 45000
  });

  const [usePoints, setUsePoints] = useState(true);
  const [voucherCode, setVoucherCode] = useState('BOLON200K');
  const [voucherDiscount, setVoucherDiscount] = useState(200000);

  // Payment tab: 'vietqr' | 'cash' | 'card'
  const [payTab, setPayTab] = useState('vietqr');
  const [cashGiven, setCashGiven] = useState(7000000);

  // Rx Modal state
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [linkedRx, setLinkedRx] = useState({
    code: '#RX-2026-889',
    doctor: 'BS. Vũ Anh Tuấn',
    customer: 'Nguyễn Hoàng Duy',
    od: 'Sph -3.25 Cyl -0.75 Ax 180°',
    os: 'Sph -2.75 Cyl -0.50 Ax 175°',
    pd: '64mm'
  });

  // Product catalog list
  const catalogProducts = [
    {
      sku: 'BL-BJ3120-C10',
      shortSku: 'BL-BJ3120',
      name: 'Bolon Graceful BJ3120 Rose Gold',
      brand: 'Bolon Eyewear',
      category: 'TITAN',
      price: 3280000,
      stock: '12',
      image:
        'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=500&q=80'
    },
    {
      sku: 'LZ-CRIZAL-HR167',
      shortSku: 'LZ-CRIZAL',
      name: 'Tròng Crizal Sapphire HR 1.67',
      brand: 'Essilor France',
      category: 'LENS_CRIZAL',
      price: 2950000,
      stock: '48 cặp',
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80'
    },
    {
      sku: 'LZ-ZEISS-PFX-160',
      shortSku: 'LZ-ZEISS-160',
      name: 'Zeiss PhotoFusion X 1.60 Grey',
      brand: 'Carl Zeiss Germany',
      category: 'TRANSITIONS',
      price: 4380000,
      stock: '18 cặp',
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80'
    },
    {
      sku: 'RB-TITAN-802',
      shortSku: 'RB-TITAN',
      name: 'Ray-Ban Titanium RB8727D',
      brand: 'Ray-Ban Italy',
      category: 'TITAN',
      price: 4550000,
      stock: '8 cái',
      image:
        'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=500&q=80'
    },
    {
      sku: 'CH-LINEART-211',
      shortSku: 'CH-LINEART',
      name: 'Charmant LineArt Excellence',
      brand: 'Charmant Japan',
      category: 'TITAN',
      price: 8900000,
      stock: '3 cái',
      image:
        'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=500&q=80'
    },
    {
      sku: 'ACC-NANO-FOG',
      shortSku: 'NANO-FOG',
      name: 'Khăn lau Nano chống bám sương',
      brand: 'OptiCare Solution',
      category: 'ACCESSORY',
      price: 100000,
      stock: '156 cái',
      image:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80'
    },
    {
      sku: 'LZ-EYEZEN-159',
      shortSku: 'EYEZEN-159',
      name: 'Eyezen Start 1.59 Airwear',
      brand: 'Essilor France',
      category: 'LENS_CRIZAL',
      price: 2150000,
      stock: '22 cặp',
      image:
        'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=500&q=80'
    },
    {
      sku: 'ACC-CLEAN-60ML',
      shortSku: 'CLEAN-60',
      name: 'Xịt Vệ Sinh Kính Nano 60ml',
      brand: 'OptiCare Solution',
      category: 'ACCESSORY',
      price: 65000,
      stock: '85 chai',
      image:
        'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=500&q=80'
    }
  ];

  // Prescriptions available for linking
  const availablePrescriptions = [
    {
      code: '#RX-2026-889',
      customer: 'Nguyễn Hoàng Duy',
      phone: '0918 732 998',
      timeAgo: 'Đo cách đây 15 phút',
      od: 'Sph -3.25 | Cyl -0.75 | Ax 180°',
      os: 'Sph -2.75 | Cyl -0.50 | Ax 175°',
      pd: '64mm',
      doctor: 'BS. Vũ Anh Tuấn'
    },
    {
      code: '#RX-2026-888',
      customer: 'Lê Thu Trang',
      phone: '0903 112 455',
      timeAgo: 'Đo cách đây 40 phút',
      od: 'Sph -1.50 | Cyl 0.00 | Ax --',
      os: 'Sph -1.75 | Cyl -0.25 | Ax 90°',
      pd: '62mm',
      doctor: 'BS. Lê Thị Ánh Tuyết'
    }
  ];

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
    message.success(`Đã thêm ${product.name} vào đơn bán!`);
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
    message.info('Đã xóa sản phẩm khỏi giỏ hàng.');
  };

  // Clear entire cart
  const handleClearCart = () => {
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
        p.shortSku.toLowerCase() === query ||
        p.name.toLowerCase().includes(query)
    );

    if (found) {
      handleAddToCart(found);
    } else {
      handleAddToCart({
        sku: barcodeInput.trim().toUpperCase(),
        shortSku: barcodeInput.trim().toUpperCase(),
        name: `Sản phẩm mã ${barcodeInput.trim().toUpperCase()}`,
        brand: 'Gia công đặc biệt',
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
      name: 'Tròng Crizal Sapphire HR 1.67',
      brand: 'Essilor France',
      category: 'LENS_CRIZAL',
      price: 2950000,
      stock: '48 cặp'
    });
    message.success(`Đã nạp tròng Crizal theo toa ${linkedRx.code} của khách ${linkedRx.customer}!`);
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

  // Execute Payment
  const handleExecutePayment = () => {
    if (cart.length === 0) {
      message.warning('Giỏ hàng đang trống!');
      return;
    }
    Modal.success({
      title: 'Thanh Toán Thành Công (F10)',
      content: (
        <div className="space-y-2 text-xs text-slate-600 pt-2">
          <p className="text-sm font-bold text-[#004967]">
            Tổng thanh toán: {grandTotal.toLocaleString('vi-VN')} đ
          </p>
          <p>Phương thức: {payTab === 'vietqr' ? 'VietQR Napas247' : payTab === 'cash' ? 'Tiền mặt' : 'Thẻ mPOS'}</p>
          <p>Khách hàng: {customer.name} (Tích lũy +65 OptiPoints)</p>
          <p className="p-2 bg-slate-100 rounded text-slate-500 font-mono text-[11px]">
            Đang in hóa đơn nhiệt K80 và kích hoạt bảo hành điện tử...
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
                  placeholder="Quét Barcode hoặc nhập SKU / Tên kính (F2)..."
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
              <span>Liên kết Toa Khám (OD/OS)</span>
              <span className="px-2 py-0.5 rounded-full bg-[#004967] text-white text-[11px] font-bold ml-1">
                3 Chờ xử lý
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
              Tất cả (184)
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
              Gọng Titan Siêu Nhẹ
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
              Tròng Crizal &amp; Zeiss
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
              Tròng Đổi Màu Transitions
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
              Phụ Kiện &amp; Dung Dịch Nano
            </button>
          </div>

          {/* Bar 3: Prescription Quick Banner */}
          <div className="bg-white rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#e7eeff] text-[#004967] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">clinical_notes</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#111c2d] font-bold">
                    Toa kính khúc xạ vừa đo: {linkedRx.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#e7eeff] text-[#40484e] text-[10px] font-semibold">
                    {linkedRx.doctor}
                  </span>
                </div>
                <p className="text-[11px] text-[#40484e] mt-0.5 leading-tight">
                  Khách: <strong className="text-[#111c2d]">{linkedRx.customer}</strong> | OD: {linkedRx.od} | OS:{' '}
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
              <span>Nạp Combo Toa Này</span>
            </button>
          </div>

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
                      Tồn: {p.stock}
                    </span>
                  </div>

                  <div className="text-[10px] text-[#70787f] uppercase tracking-wider font-bold">
                    {p.brand}
                  </div>
                  <h4 className="text-xs text-[#111c2d] font-bold line-clamp-1 mt-0.5">{p.name}</h4>
                </div>

                <div className="mt-2 pt-2 flex items-center justify-between border-t border-slate-50">
                  <span className="text-xs text-[#004967] font-bold">
                    {p.price.toLocaleString('vi-VN')}đ
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
                <span>Máy quét:</span> <strong className="text-[#111c2d]">Honeywell Xenon (Ready)</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#004967]" />
                <span>Máy mài:</span> <strong className="text-[#111c2d]">Essilor Delta 200 (Online)</strong>
              </span>
            </div>
            <div className="font-mono font-bold text-[11px] text-[#19648f]">
              Phiên ca: #POS-Q1-20260330
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
                <span className="text-xs text-[#111c2d] font-bold">Khách hàng thành viên</span>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() =>
                    setCustomer({
                      name: 'Khách Vãng Lai',
                      tier: 'Thường',
                      phone: '0900 000 000',
                      points: 0,
                      pointValue: 0
                    })
                  }
                  className="px-2 py-0.5 rounded-lg bg-[#e7eeff] hover:bg-[#dee8ff] text-[#40484e] font-semibold transition-colors"
                >
                  Vãng lai
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCustomer({
                      name: 'Nguyễn Hoàng Duy',
                      tier: 'VIP 3 Silver',
                      phone: '0918 732 998',
                      points: 450,
                      pointValue: 45000
                    })
                  }
                  className="px-2 py-0.5 rounded-lg bg-[#004967] text-white font-bold hover:bg-[#086288] transition-colors"
                >
                  + Mới
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
                    {customer.points} OptiPoints (= {customer.pointValue.toLocaleString('vi-VN')}đ)
                  </span>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={usePoints}
                    onChange={(e) => setUsePoints(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-[#004967] focus:ring-[#004967]"
                  />
                  <span className="text-xs text-[#004967] font-bold">Khấu trừ</span>
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
                  Chi tiết đơn hàng ({cart.reduce((sum, i) => sum + i.quantity, 0)})
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearCart}
                className="text-[#ba1a1a] hover:opacity-80 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">delete_sweep</span>
                <span>Xóa</span>
              </button>
            </div>

            {/* Scrollable cart list */}
            <div className="flex-1 overflow-y-auto max-h-52 xl:max-h-56 space-y-2 py-2 pr-1">
              {cart.map((item) => (
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
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
                  placeholder="Mã voucher..."
                  className="w-full h-8 pl-7 pr-2 rounded-lg bg-[#f0f3ff] font-mono text-xs text-[#111c2d] uppercase focus:outline-none focus:bg-[#e7eeff]"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (voucherCode === 'BOLON200K') {
                    setVoucherDiscount(200000);
                    message.success('Đã áp dụng Voucher giảm 200.000đ!');
                  } else {
                    message.warning('Mã voucher không hợp lệ.');
                  }
                }}
                className="h-8 px-2.5 rounded-lg bg-[#e7eeff] hover:bg-[#cae6ff] text-[#111c2d] text-xs font-bold transition-colors cursor-pointer"
              >
                Áp dụng
              </button>
            </div>

            {/* Pricing details */}
            <div className="pt-2 space-y-1 text-xs text-[#40484e]">
              <div className="flex items-center justify-between">
                <span>Tạm tính ({cart.reduce((sum, i) => sum + i.quantity, 0)} món):</span>
                <span className="font-mono text-[#111c2d] font-semibold">
                  {subtotal.toLocaleString('vi-VN')}đ
                </span>
              </div>
              {voucherDiscount > 0 && (
                <div className="flex items-center justify-between text-[#004967]">
                  <span>Voucher ({voucherCode}):</span>
                  <span className="font-mono font-bold">-{voucherDiscount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              {usePoints && (
                <div className="flex items-center justify-between text-[#004967]">
                  <span>OptiPoints ({customer.points} pts):</span>
                  <span className="font-mono font-bold">
                    -{customer.pointValue.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span>Thuế VAT (8%):</span>
                <span className="font-mono text-[#111c2d]">{vatAmount.toLocaleString('vi-VN')}đ</span>
              </div>

              {/* Grand Total Box */}
              <div className="mt-1 p-2 rounded-lg bg-[#f0f3ff] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#70787f] font-bold block">
                    Cần thanh toán
                  </span>
                  <span className="text-[11px] text-[#40484e]">Đã gồm VAT &amp; VIP</span>
                </div>
                <div className="text-right">
                  <span className="text-xl text-[#004967] tracking-tight font-extrabold">
                    {grandTotal.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Box 3: Payment Method Tabs */}
          <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-100 flex flex-col gap-2">
            <div className="text-xs text-[#111c2d] font-bold flex items-center justify-between">
              <span>Phương thức thanh toán</span>
              <span className="font-mono text-[11px] text-[#004967] font-normal">Tự động</span>
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
                <span>Tiền mặt</span>
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
                <span>Thẻ POS</span>
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
                      <span className="text-xs font-bold">Chờ quét VietQR</span>
                    </div>
                    <p className="text-[11px] text-[#40484e] mt-0.5 leading-tight">
                      QR nạp sẵn <strong className="text-[#111c2d]">{grandTotal.toLocaleString('vi-VN')}đ</strong> và tự khớp hóa đơn.
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
                  <span className="text-[#40484e]">Tiền khách đưa:</span>
                  <input
                    type="number"
                    value={cashGiven}
                    onChange={(e) => setCashGiven(Number(e.target.value))}
                    className="w-32 h-7 px-2 rounded-md bg-white text-right font-mono text-[#004967] font-bold focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#dee8ff]/50">
                  <span className="text-[#40484e]">Thối lại:</span>
                  <span className="text-sm font-bold text-[#111c2d]">
                    {Math.max(0, cashGiven - grandTotal).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>
            )}

            {/* Tab 3: Card Panel */}
            {payTab === 'card' && (
              <div className="p-2.5 rounded-lg bg-[#f0f3ff] flex items-center justify-between text-xs">
                <span className="text-[#40484e]">Thiết bị mPOS #02:</span>
                <span className="px-2 py-0.5 rounded bg-[#e7eeff] text-[#004967] font-bold">
                  Sẵn sàng quẹt / chạm
                </span>
              </div>
            )}
          </div>

          {/* Box 4: Action Hotkeys Bar */}
          <div className="grid grid-cols-4 gap-1.5 pt-0.5 text-xs">
            {/* F4 Hold */}
            <button
              type="button"
              onClick={() => message.info('Đã lưu tạm đơn hàng vào bộ nhớ (F4).')}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#e7eeff] hover:bg-[#dee8ff] text-[#40484e] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">pause_circle</span>
              <span className="text-[11px] font-bold mt-0.5">Tạm lưu</span>
              <span className="font-mono text-[#70787f] text-[10px]">[F4]</span>
            </button>

            {/* F8 Cancel */}
            <button
              type="button"
              onClick={handleClearCart}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#f0f3ff] hover:bg-[#ffdad6] text-[#ba1a1a] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
              <span className="text-[11px] font-bold mt-0.5">Hủy đơn</span>
              <span className="font-mono text-[10px]">[F8]</span>
            </button>

            {/* F9 Lab Order */}
            <button
              type="button"
              onClick={handleDispatchLabOrder}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#e7eeff] hover:bg-[#cae6ff] text-[#004967] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
              <span className="text-[11px] font-bold mt-0.5">Lệnh Lab</span>
              <span className="font-mono text-[10px]">[F9]</span>
            </button>

            {/* F10 Payment */}
            <button
              type="button"
              onClick={handleExecutePayment}
              className="col-span-1 flex flex-col items-center justify-center p-2 rounded-lg bg-[#004967] hover:bg-[#086288] text-white shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span className="text-[12px] font-bold mt-0.5">Thanh Toán</span>
              <span className="font-mono text-[10px] text-[#a5dbff]">[F10]</span>
            </button>
          </div>
        </div>
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
              {availablePrescriptions.map((rx) => (
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
              ))}
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
    </main>
  );
}
