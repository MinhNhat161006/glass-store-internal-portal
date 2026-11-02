import React, { useState, useMemo, useEffect } from 'react';
import { message, Modal } from 'antd';
import { orderApi } from '../../api/orderApi';

// Mock initial OMS order dataset matching clinical & omnichannel specs
const INITIAL_ORDERS = [
  {
    id: '#OPT-8842-SG',
    channel: 'pos_q1',
    channelLabel: 'Flagship Q.1',
    channelType: 'pos',
    channelIcon: 'storefront',
    channelBadgeBg: 'bg-[#cae6ff]',
    channelBadgeText: 'text-[#004b70]',
    time: '14:28:15',
    date: '16/10/2024',
    staff: 'STF-088 (Trần M. Anh)',
    customer: {
      name: 'Nguyễn Hoàng Nam',
      phone: '0903.882.190',
      tier: 'VIP Gold',
      tierBg: 'bg-[#c5e7ff]',
      tierText: 'text-[#001e2d]',
      history: '4 đơn đã mua',
      address: 'Quận 1, TP. Hồ Chí Minh'
    },
    product: {
      frameName: 'Gọng Bolon Vintage Classic BJ3120-B10',
      frameSku: 'BOL-BJ3120-BLK',
      frameShelf: 'A-04-12',
      framePrice: 2980000,
      lensName: 'Cặp tròng Essilor Crizal Rock 1.67 Blue UV Capture',
      lensSku: 'ESL-CR-167-UV',
      lensShelf: 'Ngăn tròng: L-167-2',
      lensPrice: 2500000,
      lensShort: 'Crizal Rock 1.67 Blue UV',
      rxShort: '[OD -3.25 / OS -2.75]',
      doctorApproved: 'BS: Lâm Hoàng Phúc đã ký duyệt'
    },
    rx: {
      doctorName: 'BS. Lâm Hoàng Phúc đã ký',
      od: { sph: '-3.25', cyl: '-0.50', axis: '175°', add: '—', pd: '63.0 mm' },
      os: { sph: '-2.75', cyl: '-0.75', axis: '05°', add: '—', pd: '63.0 mm' },
      sh: '21.5 mm',
      cvd: '12.0 mm'
    },
    payment: {
      totalItems: 5480000,
      discount: -250000,
      discountLabel: 'Chiết khấu VIP Gold (10% tròng)',
      labFeeLabel: 'Miễn phí (Ưu đãi)',
      finalTotal: 5230000,
      method: 'VNPay-QR',
      methodBadgeBg: 'bg-[#cae6ff]',
      methodBadgeText: 'text-[#005881]',
      status: 'Đã thanh toán',
      transactionRef: 'VietQR Techcombank (Giao dịch #TCB8921820) - Đã hạch toán'
    },
    techStatus: {
      label: 'Đang mài Essilor',
      badgeBg: 'bg-[#c5e7ff]',
      badgeText: 'text-[#001e2d]',
      icon: 'refresh',
      spin: true,
      eta: 'Dự kiến xong: 15:45',
      machine: 'Essilor Delta 200',
      technician: 'KTV H. Tuấn',
      techTime: '15:10'
    },
    statusCode: 'lab_processing', // all, pending_payment, paid, waiting_rx, lab_processing, qc_packaging, delivering_2h, completed, cancelled
    auditStage: 4, // 1: Order, 2: Payment, 3: Rx verify, 4: Lab edging, 5: QC Packaging, 6: Completed/Delivery
    auditLog: 'Giai đoạn 4/6'
  },
  {
    id: '#OPT-8841-ONL',
    channel: 'online',
    channelLabel: 'Online App',
    channelType: 'online',
    channelIcon: 'smartphone',
    channelBadgeBg: 'bg-[#c6e7ff]',
    channelBadgeText: 'text-[#001e2d]',
    time: '14:15:02',
    date: '16/10/2024',
    staff: 'OMS Bot Auto',
    customer: {
      name: 'Lê Thúy Kiều',
      phone: '0988.124.551',
      tier: 'Thành viên',
      tierBg: 'bg-[#e7eeff]',
      tierText: 'text-[#40484e]',
      history: '2 đơn đã mua',
      address: 'Q.3, TP. Hồ Chí Minh'
    },
    product: {
      frameName: 'Gọng kính Ray-Ban Round Metal RB3447',
      frameSku: 'RB-3447-001',
      frameShelf: 'B-02-05',
      framePrice: 2470000,
      lensName: 'Cặp tròng Essilor Eyezen Start 1.60',
      lensSku: 'ESL-EYEZEN-160',
      lensShelf: 'Ngăn tròng: L-160-4',
      lensPrice: 1650000,
      lensShort: 'Essilor Eyezen Start 1.60',
      rxShort: '[OD -2.00 / OS -1.75]',
      doctorApproved: 'Toa từ hồ sơ khám gần nhất'
    },
    rx: {
      doctorName: 'BS. Vũ Anh Tuấn duyệt tự động',
      od: { sph: '-2.00', cyl: '-0.25', axis: '180°', add: '—', pd: '62.0 mm' },
      os: { sph: '-1.75', cyl: '-0.50', axis: '10°', add: '—', pd: '62.0 mm' },
      sh: '20.0 mm',
      cvd: '12.0 mm'
    },
    payment: {
      totalItems: 4120000,
      discount: 0,
      discountLabel: 'Không áp dụng',
      labFeeLabel: 'Miễn phí tiêu chuẩn',
      finalTotal: 4120000,
      method: 'Apple Pay',
      methodBadgeBg: 'bg-[#cae6ff]',
      methodBadgeText: 'text-[#005881]',
      status: 'Đã thanh toán',
      transactionRef: 'Apple Pay Visa Platinum (#AP-991201)'
    },
    techStatus: {
      label: 'Đang giao 2H (Aha)',
      badgeBg: 'bg-[#dee8ff]',
      badgeText: 'text-[#111c2d]',
      icon: 'local_shipping',
      spin: false,
      eta: 'Mã vận đơn: AHA-882310',
      machine: 'Shipper AhaMove',
      technician: 'Điều phối viên giao vận',
      techTime: '14:40'
    },
    statusCode: 'delivering_2h',
    auditStage: 6,
    auditLog: 'Giai đoạn 6/6'
  },
  {
    id: '#OPT-8839-WEB',
    channel: 'online',
    channelLabel: 'Web E-com',
    channelType: 'online',
    channelIcon: 'language',
    channelBadgeBg: 'bg-[#dee8ff]',
    channelBadgeText: 'text-[#111c2d]',
    time: '13:50:40',
    date: '16/10/2024',
    staff: 'Khách tự tải ảnh toa',
    customer: {
      name: 'Trịnh Minh Quang',
      phone: '0912.449.002',
      tier: 'Mới',
      tierBg: 'bg-[#dee8ff]',
      tierText: 'text-[#40484e]',
      history: '1 đơn',
      address: 'Cầu Giấy, Hà Nội (Giao bưu cục)'
    },
    product: {
      frameName: 'Gọng Titan Molsion MO5089',
      frameSku: 'MOL-5089-TITAN',
      frameShelf: 'C-01-09',
      framePrice: 2850000,
      lensName: 'Tròng Chiết Suất Siêu Mỏng 1.74 [Cận -7.50 / Loạn -2.50]',
      lensSku: 'ESL-174-RX',
      lensShelf: 'Chờ phôi đặt riêng',
      lensPrice: 4000000,
      lensShort: 'Tròng Siêu Mỏng 1.74',
      rxShort: '[Cận -7.50 / Loạn -2.50]',
      doctorApproved: 'Lệch tâm PD > 68mm, cần Bác sĩ gọi xác nhận',
      isWarning: true
    },
    rx: {
      doctorName: 'Chờ Bác sĩ xác nhận PD',
      od: { sph: '-7.50', cyl: '-2.50', axis: '165°', add: '—', pd: '69.0 mm' },
      os: { sph: '-7.00', cyl: '-2.25', axis: '15°', add: '—', pd: '69.0 mm' },
      sh: '23.0 mm',
      cvd: '11.5 mm'
    },
    payment: {
      totalItems: 6850000,
      discount: 0,
      discountLabel: 'Không áp dụng',
      labFeeLabel: 'Gia công độ cao (+0đ)',
      finalTotal: 6850000,
      method: 'Đã thanh toán thẻ',
      methodBadgeBg: 'bg-[#cae6ff]',
      methodBadgeText: 'text-[#005881]',
      status: 'Đã thanh toán thẻ',
      transactionRef: 'Thẻ Quốc tế JCB Online (#JCB-5541)'
    },
    techStatus: {
      label: 'Chờ duyệt toa OD/OS',
      badgeBg: 'bg-[#ffdad6]',
      badgeText: 'text-[#93000a]',
      icon: 'medical_services',
      spin: false,
      eta: 'Chờ xác nhận lại PD',
      machine: 'Bác sĩ Khúc xạ',
      technician: 'Chờ phân công',
      techTime: '13:55'
    },
    statusCode: 'waiting_rx',
    auditStage: 3,
    auditLog: 'Giai đoạn 3/6'
  },
  {
    id: '#OPT-8835-HN',
    channel: 'pos_tt',
    channelLabel: 'POS Tràng Tiền',
    channelType: 'pos',
    channelIcon: 'storefront',
    channelBadgeBg: 'bg-[#c5e7ff]',
    channelBadgeText: 'text-[#001e2d]',
    time: '13:10:18',
    date: '16/10/2024',
    staff: 'STF-012 (Lê V. Hà)',
    customer: {
      name: 'Phạm Thị Bích Ngọc',
      phone: '0977.898.332',
      tier: 'Platinum',
      tierBg: 'bg-[#8ecef6]',
      tierText: 'text-[#001e2d]',
      history: '6 đơn đã mua',
      address: 'Hoàn Kiếm, Hà Nội'
    },
    product: {
      frameName: 'Gọng Charmant Titanium Z ZT2233',
      frameSku: 'CHM-ZT2233-SIL',
      frameShelf: 'VIP-01-02',
      framePrice: 5200000,
      lensName: 'Tròng Đa Tròng Essilor Varilux Comfort Max',
      lensSku: 'ESL-VARILUX-CFM',
      lensShelf: 'Ngăn tròng: L-PAL-01',
      lensPrice: 7300000,
      lensShort: 'Đa Tròng Varilux Comfort Max',
      rxShort: '[Viễn +1.50 / Add +2.00]',
      doctorApproved: 'Đo bằng máy Visioffice 3D'
    },
    rx: {
      doctorName: 'BS. Hoàng Văn Toàn ký số',
      od: { sph: '+1.50', cyl: '-0.50', axis: '90°', add: '+2.00', pd: '61.5 mm' },
      os: { sph: '+1.25', cyl: '-0.25', axis: '85°', add: '+2.00', pd: '61.5 mm' },
      sh: '19.5 mm',
      cvd: '12.5 mm'
    },
    payment: {
      totalItems: 12500000,
      discount: 0,
      discountLabel: 'Voucher Khách VIP',
      labFeeLabel: 'Gia công đa tròng Free',
      finalTotal: 12500000,
      method: 'Quẹt thẻ POS',
      methodBadgeBg: 'bg-[#cae6ff]',
      methodBadgeText: 'text-[#005881]',
      status: 'Đã thanh toán',
      transactionRef: 'MPOS SmartPOS Vietcombank (#POS-8823)'
    },
    techStatus: {
      label: 'Chờ đóng gói QC',
      badgeBg: 'bg-[#dee8ff]',
      badgeText: 'text-[#111c2d]',
      icon: 'inventory_2',
      spin: false,
      eta: 'Đã mài xong - Đạt chuẩn',
      machine: 'Bàn QC Tràng Tiền',
      technician: 'KTV Phạm Hùng',
      techTime: '14:05'
    },
    statusCode: 'qc_packaging',
    auditStage: 5,
    auditLog: 'Giai đoạn 5/6'
  },
  {
    id: '#OPT-8830-ONL',
    channel: 'online',
    channelLabel: 'Online App',
    channelType: 'online',
    channelIcon: 'smartphone',
    channelBadgeBg: 'bg-[#c6e7ff]',
    channelBadgeText: 'text-[#001e2d]',
    time: '12:35:10',
    date: '16/10/2024',
    staff: 'CSKH Telesales',
    customer: {
      name: 'Đỗ Tuấn Kiệt',
      phone: '0938.552.191',
      tier: 'Mới',
      tierBg: 'bg-[#e7eeff]',
      tierText: 'text-[#40484e]',
      history: '1 đơn',
      address: 'Bình Thạnh, TP. HCM'
    },
    product: {
      frameName: 'Kính Mát Oakley Holbrook Matte Black Prizm Sapphire',
      frameSku: 'OAK-OO9102-55',
      frameShelf: 'SUN-OAK-04',
      framePrice: 3950000,
      lensName: 'Tròng Prizm Sapphire Polarized chống chói',
      lensSku: 'OAK-LENS-SAP',
      lensShelf: 'Kính Mát Nguyên Hộp',
      lensPrice: 0,
      lensShort: 'Kính Mát Không Độ (Plano)',
      rxShort: 'Không độ (Plano)',
      doctorApproved: 'Có sẵn nguyên hộp tại kho Flagship'
    },
    rx: {
      doctorName: 'Đơn kính mát thời trang',
      od: { sph: '0.00', cyl: '0.00', axis: '0°', add: '—', pd: '64.0 mm' },
      os: { sph: '0.00', cyl: '0.00', axis: '0°', add: '—', pd: '64.0 mm' },
      sh: '—',
      cvd: '—'
    },
    payment: {
      totalItems: 3950000,
      discount: 0,
      discountLabel: 'Không',
      labFeeLabel: 'Không áp dụng',
      finalTotal: 3950000,
      method: 'COD (Thu tiền tận nơi)',
      methodBadgeBg: 'bg-[#d8e3fb]',
      methodBadgeText: 'text-[#40484e]',
      status: 'Chờ thanh toán khi nhận',
      transactionRef: 'COD Shipper giao thu tiền mặt tận nơi'
    },
    techStatus: {
      label: 'Đã xác nhận',
      badgeBg: 'bg-[#e7eeff]',
      badgeText: 'text-[#40484e]',
      icon: 'schedule',
      spin: false,
      eta: 'Chờ lấy hàng AhaMove',
      machine: 'Kho Flagship Q.1',
      technician: 'Thủ kho NV. Long',
      techTime: '13:00'
    },
    statusCode: 'pending_payment',
    auditStage: 2,
    auditLog: 'Giai đoạn 2/6'
  }
];

export default function OrdersOmsPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState('#OPT-8842-SG');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState(['#OPT-8842-SG']);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const liveOrders = await orderApi.getAllOrders();
        if (Array.isArray(liveOrders) && liveOrders.length > 0) {
          const mapped = liveOrders.map((bo, idx) => {
            const firstItem = (bo.items && bo.items[0]) || {};
            const secondItem = (bo.items && bo.items[1]) || {};
            const code = bo.orderCode.startsWith('#') ? bo.orderCode : `#${bo.orderCode}`;
            return {
              dbId: bo.id,
              id: code,
              channel: bo.channel === 'POS' ? 'pos_q1' : 'online',
              channelLabel: bo.channel === 'POS' ? (bo.branchName || 'Flagship Q.1') : 'Online App',
              channelType: bo.channel === 'POS' ? 'pos' : 'online',
              channelIcon: bo.channel === 'POS' ? 'storefront' : 'smartphone',
              channelBadgeBg: bo.channel === 'POS' ? 'bg-[#cae6ff]' : 'bg-[#c6e7ff]',
              channelBadgeText: bo.channel === 'POS' ? 'text-[#004b70]' : 'text-[#001e2d]',
              time: '14:28:15',
              date: 'Hôm nay',
              staff: bo.staffName || 'STF-088',
              customer: {
                name: bo.customerName,
                phone: bo.customerPhone,
                tier: 'VIP Member',
                tierBg: 'bg-[#c5e7ff]',
                tierText: 'text-[#001e2d]',
                history: `${idx * 2 + 1} đơn đã mua`,
                address: bo.shippingAddress || 'TP. Hồ Chí Minh'
              },
              product: {
                frameName: firstItem.productName || 'Gọng Bolon Titanium',
                frameSku: firstItem.skuId || 'FRM-BOLON-BJ3120',
                frameShelf: 'A-04-12',
                framePrice: Number(firstItem.unitPrice || 3250000),
                lensName: secondItem.productName || 'Cặp tròng Essilor Crizal Rock 1.67',
                lensSku: secondItem.skuId || 'LNS-ESS-CRIZAL-167',
                lensShelf: 'Ngăn tròng: L-167-2',
                lensPrice: Number(secondItem.unitPrice || 1980000),
                lensShort: secondItem.productName || 'Essilor Crizal',
                rxShort: '[OD -3.25 / OS -2.75]',
                doctorApproved: 'BS. Vũ Anh Tuấn đã ký duyệt'
              },
              rx: {
                doctorName: 'BS. Vũ Anh Tuấn',
                od: { sph: '-3.25', cyl: '-0.50', axis: '180°', add: '—', pd: '63.0 mm' },
                os: { sph: '-2.75', cyl: '-0.75', axis: '175°', add: '—', pd: '63.0 mm' },
                sh: '21.5 mm',
                cvd: '12.0 mm'
              },
              payment: {
                totalItems: Number(bo.totalAmount || 5230000),
                discount: Number(bo.discountAmount || 0),
                discountLabel: 'Ưu đãi thành viên',
                labFeeLabel: 'Miễn phí gia công',
                finalTotal: Number(bo.finalAmount || 5230000),
                method: bo.paymentMethod || 'VietQR',
                methodBadgeBg: 'bg-[#cae6ff]',
                methodBadgeText: 'text-[#005881]',
                status: bo.status === 'PAID' || bo.status === 'PROCESSING' || bo.status === 'COMPLETED' ? 'Đã thanh toán' : 'Chờ thanh toán',
                transactionRef: `Giao dịch ${bo.paymentMethod || 'VietQR'} - Đã hạch toán`
              },
              techStatus: {
                label: bo.status === 'COMPLETED' ? 'Hoàn tất bàn giao' : bo.status === 'SHIPPING' ? 'Đang giao hàng' : 'Đang mài xưởng Lab',
                badgeBg: 'bg-[#c5e7ff]',
                badgeText: 'text-[#001e2d]',
                icon: 'refresh',
                spin: bo.status === 'PROCESSING',
                eta: 'Dự kiến: Hôm nay',
                machine: 'Essilor Kappa 200',
                technician: 'KTV Trần Văn Bách',
                techTime: '15:10'
              },
              statusCode: bo.status === 'COMPLETED' ? 'completed' : bo.status === 'SHIPPING' ? 'delivering_2h' : 'lab_processing',
              auditStage: bo.status === 'COMPLETED' ? 6 : 4,
              auditLog: 'Giai đoạn 4/6'
            };
          });
          setOrders(mapped);
          if (mapped.length > 0) {
            setSelectedOrderId(mapped[0].id);
          }
        }
      } catch (err) {
        console.warn('Lấy đơn hàng backend lỗi:', err.message);
      }
    };
    fetchOrders();
  }, []);

  // Selected order details object
  const activeOrder = useMemo(() => {
    return orders.find(o => o.id === selectedOrderId) || orders[0];
  }, [orders, selectedOrderId]);

  // Filtering logic
  const filteredOrders = useMemo(() => {
    return orders.filter(item => {
      // Channel
      if (channelFilter !== 'all' && item.channel !== channelFilter) return false;
      // Status pill
      if (statusFilter !== 'all') {
        if (statusFilter === 'pending_payment' && item.statusCode !== 'pending_payment') return false;
        if (statusFilter === 'paid' && item.statusCode !== 'paid' && item.payment.status !== 'Đã thanh toán') return false;
        if (statusFilter === 'waiting_rx' && item.statusCode !== 'waiting_rx') return false;
        if (statusFilter === 'lab_processing' && item.statusCode !== 'lab_processing') return false;
        if (statusFilter === 'qc_packaging' && item.statusCode !== 'qc_packaging') return false;
        if (statusFilter === 'delivering_2h' && item.statusCode !== 'delivering_2h') return false;
        if (statusFilter === 'completed' && item.statusCode !== 'completed') return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchId = item.id.toLowerCase().includes(q);
        const matchName = item.customer.name.toLowerCase().includes(q);
        const matchPhone = item.customer.phone.includes(q);
        const matchTracking = item.techStatus.eta.toLowerCase().includes(q);
        return matchId || matchName || matchPhone || matchTracking;
      }
      return true;
    });
  }, [orders, channelFilter, statusFilter, searchQuery]);

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredOrders.map(o => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRowClick = (order) => {
    setSelectedOrderId(order.id);
    setIsDrawerOpen(true);
  };

  // Actions
  const handleExportExcel = () => {
    message.loading({ content: 'Đang trích xuất 128 đơn hàng ra định dạng Excel (XLSX)...', key: 'export', duration: 1 });
    setTimeout(() => {
      message.success({ content: 'Xuất file OptiVision_Orders_20241016.xlsx thành công!', key: 'export' });
    }, 1000);
  };

  const handlePrintBatchA5 = () => {
    message.info(`Chuẩn bị in hàng loạt phiếu kỹ thuật A5 cho ${selectedIds.length} đơn đã chọn.`);
  };

  const handleAdvanceLabStage = () => {
    if (!activeOrder) return;
    
    // Update active order to QC Packaging (Stage 5)
    setOrders(prev => prev.map(o => {
      if (o.id === activeOrder.id) {
        return {
          ...o,
          auditStage: 5,
          statusCode: 'qc_packaging',
          auditLog: 'Giai đoạn 5/6',
          techStatus: {
            ...o.techStatus,
            label: 'Chờ đóng gói QC',
            badgeBg: 'bg-[#dee8ff]',
            badgeText: 'text-[#111c2d]',
            icon: 'verified',
            spin: false,
            eta: 'Mài xong - Đang kiểm tra 12 thông số quang học'
          }
        };
      }
      return o;
    }));

    message.success(`Đã xác nhận hoàn tất mài lắp cho đơn ${activeOrder.id}. Chuyển sang bàn Kiểm Tra QC & Đóng Gói!`);
  };

  const handleApproveRx = (order, e) => {
    e.stopPropagation();
    Modal.confirm({
      title: `Phê duyệt toa kính khúc xạ: ${order.id}`,
      content: (
        <div>
          <p className="text-sm text-gray-600">Khách hàng: <b>{order.customer.name}</b> ({order.customer.phone})</p>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-800 my-2">
            ⚠️ <b>Cảnh báo lâm sàng:</b> Tròng 1.74 có độ cận cao (-7.50D) và khoảng cách đồng tử PD = 69.0mm. Đã gọi xác nhận và điều chỉnh tâm kính hợp lệ.
          </div>
          <p className="text-sm">Xác nhận ký duyệt toa y khoa và chuyển lệnh sang Xưởng Mài Lắp Essilor?</p>
        </div>
      ),
      okText: 'Ký Duyệt & Chuyển Lab',
      cancelText: 'Hủy bỏ',
      okButtonProps: { style: { backgroundColor: '#004967' } },
      onOk() {
        setOrders(prev => prev.map(o => {
          if (o.id === order.id) {
            return {
              ...o,
              statusCode: 'lab_processing',
              auditStage: 4,
              techStatus: {
                label: 'Đang mài Essilor',
                badgeBg: 'bg-[#c5e7ff]',
                badgeText: 'text-[#001e2d]',
                icon: 'refresh',
                spin: true,
                eta: 'BS. Lâm Hoàng Phúc đã ký duyệt toa'
              }
            };
          }
          return o;
        }));
        message.success(`Toa kính ${order.id} đã được bác sĩ ký duyệt và gửi lệnh gia công tự động!`);
      }
    });
  };

  return (
    <div className="p-3.5 sm:p-5 max-w-[1600px] mx-auto w-full space-y-3.5">
      {/* ---------------- 1. KPI BANNER / METRIC RIBBON (4 Operational Metrics) ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1: Tổng đơn hôm nay */}
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-[#d8e3fb]/40">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-[#004967]/5 via-[#8fcdfd]/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#70787f]">Tổng đơn hôm nay</span>
            <span className="p-2 rounded-xl bg-[#e7eeff] text-[#004967] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[36px] font-bold text-[#111c2d] tracking-tight leading-none">128</span>
            <span className="text-[12px] text-[#004967] font-semibold flex items-center">
              <span className="material-symbols-outlined text-[16px]">trending_up</span> +14.8%
            </span>
          </div>
          <div className="mt-3 pt-2.5 bg-[#f0f3ff] px-3 py-1.5 rounded-lg flex items-center justify-between text-[13px] font-semibold text-[#40484e]">
            <span>POS Q.1: <strong className="text-[#111c2d] font-bold">84</strong></span>
            <span className="text-[#c0c7cf]">|</span>
            <span>Online App: <strong className="text-[#111c2d] font-bold">44</strong></span>
          </div>
        </div>

        {/* KPI 2: Chờ duyệt toa OD/OS (Cần KTV can thiệp) */}
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-[#d8e3fb]/40">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-[#ba1a1a]/5 via-[#ffdad6]/20 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#ba1a1a]">Chờ xác nhận kỹ thuật</span>
            <span className="p-2 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">eyeglasses</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[36px] font-bold text-[#ba1a1a] tracking-tight leading-none">14</span>
            <span className="text-[12px] font-semibold px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a]">Cần KTV duyệt</span>
          </div>
          <div className="mt-3 pt-2.5 bg-[#f0f3ff] px-3 py-1.5 rounded-lg flex items-center justify-between text-[13px] font-semibold text-[#40484e]">
            <span>Độ cận cao (&gt;6.0D): <strong className="text-[#ba1a1a] font-bold">6</strong></span>
            <span className="text-[#c0c7cf]">|</span>
            <span>Loạn thị phức: <strong className="text-[#111c2d] font-bold">8</strong></span>
          </div>
        </div>

        {/* KPI 3: Đang mài lắp tại Lab */}
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-[#d8e3fb]/40">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-[#086288]/10 via-[#19648f]/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#004967]">Đang mài lắp tại Lab</span>
            <span className="p-2 rounded-xl bg-[#dee8ff] text-[#004967] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[36px] font-bold text-[#004967] tracking-tight leading-none">18</span>
            <span className="text-[12px] text-[#19648f] font-semibold">Tự động Essilor Delta 200</span>
          </div>
          <div className="mt-3 pt-2.5 bg-[#f0f3ff] px-3 py-1.5 rounded-lg flex items-center justify-between text-[13px] font-semibold text-[#40484e]">
            <span>Lab Trực tiếp: <strong className="text-[#111c2d] font-bold">12</strong></span>
            <span className="text-[#c0c7cf]">|</span>
            <span>Chờ gia công RX: <strong className="text-[#111c2d] font-bold">6</strong></span>
          </div>
        </div>

        {/* KPI 4: Đang vận chuyển & hỏa tốc */}
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group border border-[#d8e3fb]/40">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-[#cae6ff]/30 via-[#c5e7ff]/20 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#19648f]">Đang giao vận chuyển</span>
            <span className="p-2 rounded-xl bg-[#cae6ff] text-[#004b70] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[36px] font-bold text-[#111c2d] tracking-tight leading-none">26</span>
            <span className="text-[12px] text-[#146285] font-semibold flex items-center">
              AhaMove &amp; Ahamove Lab
            </span>
          </div>
          <div className="mt-3 pt-2.5 bg-[#f0f3ff] px-3 py-1.5 rounded-lg flex items-center justify-between text-[13px] font-semibold text-[#40484e]">
            <span className="text-[#004967] font-bold">Hỏa tốc 2H: 12</span>
            <span className="text-[#c0c7cf]">|</span>
            <span>Tiêu chuẩn: 14</span>
          </div>
        </div>
      </div>

      {/* ---------------- 2. MULTI-DIMENSIONAL OMNICHANNEL FILTER DECK ---------------- */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 border border-[#d8e3fb]/40">
        {/* Row 1: Universal search + Dropdowns + Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Universal Search Input */}
          <div className="flex-1 min-w-[300px] max-w-xl relative">
            <span className="material-symbols-outlined text-[#70787f] absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mã #OPT-XXXX, SĐT khách, Tên khách, Mã vận đơn SPX/Aha..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#f0f3ff] rounded-xl text-[#111c2d] text-sm placeholder:text-[#70787f] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#004967] transition-all"
            />
            {searchQuery ? (
              <span
                onClick={() => setSearchQuery('')}
                className="material-symbols-outlined text-[#70787f] absolute right-3.5 top-1/2 -translate-y-1/2 text-[18px] cursor-pointer hover:text-[#111c2d]"
              >
                close
              </span>
            ) : (
              <span className="material-symbols-outlined text-[#70787f] absolute right-3.5 top-1/2 -translate-y-1/2 text-[18px] cursor-pointer hover:text-[#111c2d]">
                qr_code_scanner
              </span>
            )}
          </div>

          {/* Filter Dropdowns & Quick Dates */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Sales Channel Dropdown */}
            <div className="relative">
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="appearance-none bg-[#f0f3ff] pl-3.5 pr-8 py-2 rounded-xl text-xs font-semibold text-[#111c2d] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#004967] border-0"
              >
                <option value="all">Tất cả kênh bán</option>
                <option value="online">Kênh Online Web/App</option>
                <option value="pos_q1">Kênh POS Flagship Q.1</option>
                <option value="pos_tt">Kênh POS Tràng Tiền Plaza</option>
              </select>
              <span className="material-symbols-outlined text-[#70787f] absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none">expand_more</span>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center bg-[#f0f3ff] p-1 rounded-xl">
              <button
                onClick={() => setTimeFilter('today')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeFilter === 'today'
                    ? 'bg-white text-[#004967] shadow-sm'
                    : 'text-[#70787f] hover:text-[#111c2d]'
                }`}
              >
                Hôm nay
              </button>
              <button
                onClick={() => setTimeFilter('7days')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeFilter === '7days'
                    ? 'bg-white text-[#004967] shadow-sm'
                    : 'text-[#70787f] hover:text-[#111c2d]'
                }`}
              >
                7 ngày qua
              </button>
              <button
                onClick={() => setTimeFilter('custom')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  timeFilter === 'custom'
                    ? 'bg-white text-[#004967] shadow-sm'
                    : 'text-[#70787f] hover:text-[#111c2d]'
                }`}
              >
                <span>Tùy chọn</span>
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              </button>
            </div>

            {/* Batch Action Buttons */}
            <div className="h-6 w-px bg-[#c0c7cf] mx-1" />
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e7eeff] hover:bg-[#dee8ff] text-[#111c2d] text-xs font-semibold transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px] text-[#004967]">download</span>
              <span>Xuất Excel</span>
            </button>
            <button
              onClick={handlePrintBatchA5}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e7eeff] hover:bg-[#dee8ff] text-[#111c2d] text-xs font-semibold transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>In hàng loạt (A5)</span>
            </button>
          </div>
        </div>

        {/* Row 2: Status Pipeline Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-nowrap scrollbar-thin">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              statusFilter === 'all'
                ? 'bg-[#004967] text-white shadow-sm'
                : 'bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#40484e]'
            }`}
          >
            Tất cả (128)
          </button>
          <button
            onClick={() => setStatusFilter('pending_payment')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              statusFilter === 'pending_payment'
                ? 'bg-[#004967] text-white shadow-sm'
                : 'bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#40484e]'
            }`}
          >
            Chờ thanh toán (8)
          </button>
          <button
            onClick={() => setStatusFilter('paid')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              statusFilter === 'paid'
                ? 'bg-[#004967] text-white shadow-sm'
                : 'bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#40484e]'
            }`}
          >
            Đã thanh toán (32)
          </button>
          <button
            onClick={() => setStatusFilter('waiting_rx')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              statusFilter === 'waiting_rx'
                ? 'bg-[#ba1a1a] text-white shadow-sm'
                : 'bg-[#ffdad6] text-[#93000a] hover:bg-[#ffdad6]/80'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping" />
            Chờ duyệt toa kính (14)
          </button>
          <button
            onClick={() => setStatusFilter('lab_processing')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              statusFilter === 'lab_processing'
                ? 'bg-[#004967] text-white shadow-sm'
                : 'bg-[#cae6ff] text-[#001e30] hover:bg-[#cae6ff]/80'
            }`}
          >
            Đang gia công Lab (18)
          </button>
          <button
            onClick={() => setStatusFilter('qc_packaging')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              statusFilter === 'qc_packaging'
                ? 'bg-[#004967] text-white shadow-sm'
                : 'bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#40484e]'
            }`}
          >
            Chờ đóng gói QC (11)
          </button>
          <button
            onClick={() => setStatusFilter('delivering_2h')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              statusFilter === 'delivering_2h'
                ? 'bg-[#004967] text-white shadow-sm'
                : 'bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#40484e]'
            }`}
          >
            Đang giao hỏa tốc 2H (12)
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              statusFilter === 'completed'
                ? 'bg-[#004967] text-white shadow-sm'
                : 'bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#40484e]'
            }`}
          >
            Hoàn thành (41)
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              statusFilter === 'cancelled'
                ? 'bg-[#70787f] text-white shadow-sm'
                : 'bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#70787f]'
            }`}
          >
            Đã hủy/Hoàn tiền (4)
          </button>
        </div>
      </div>

      {/* ---------------- 3. MAIN CENTRAL OMS DATA TABLE & LIVE DETAIL DRAWER ---------------- */}
      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-4 items-start">
        {/* Central OMS Orders Data Table (8 cols on 2XL, 12 on smaller) */}
        <div className={`${isDrawerOpen ? '2xl:col-span-8' : '2xl:col-span-12'} bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border border-[#d8e3fb]/40 transition-all duration-200`}>
          {/* Table Header Bar / Selection counter */}
          <div className="px-4 py-3 bg-[#f0f3ff] flex items-center justify-between border-b border-[#e7eeff]">
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-bold text-[#111c2d]">Danh sách đơn hàng OMS</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#d8e3fb] text-[12px] font-bold text-[#004967]">
                Hiển thị {filteredOrders.length} của 128 đơn
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#70787f]">
                Đã chọn: <strong className="text-[#004967] font-semibold">{selectedIds.length} đơn</strong>
              </span>
              <button
                onClick={() => message.success('Đã đồng bộ dữ liệu đơn hàng mới nhất!')}
                className="text-[#004967] hover:text-[#086288] p-1 rounded-lg hover:bg-[#e7eeff] transition-colors"
                title="Làm mới dữ liệu"
              >
                <span className="material-symbols-outlined text-[18px]">sync</span>
              </button>
            </div>
          </div>

          {/* Table Responsive Scroller */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1080px]">
              <thead>
                <tr className="bg-[#dee8ff]/40 text-[#70787f] uppercase text-[11px] font-bold tracking-wider border-b border-[#e7eeff]">
                  <th className="py-3 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length > 0 && selectedIds.length === filteredOrders.length}
                      onChange={handleSelectAll}
                      className="rounded text-[#004967] focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-3 whitespace-nowrap min-w-[130px]">Mã đơn &amp; Kênh</th>
                  <th className="py-3 px-3 whitespace-nowrap min-w-[145px]">Thời gian / Nhân viên</th>
                  <th className="py-3 px-3 whitespace-nowrap min-w-[160px]">Khách hàng</th>
                  <th className="py-3 px-4 min-w-[280px]">Sản phẩm &amp; Toa kính y khoa</th>
                  <th className="py-3 px-3 whitespace-nowrap min-w-[165px]">Thanh toán</th>
                  <th className="py-3 px-3 whitespace-nowrap min-w-[190px]">Tiến độ kỹ thuật</th>
                  <th className="py-3 px-3 whitespace-nowrap min-w-[90px] text-right">Tác vụ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7eeff] text-sm text-[#111c2d]">
                {filteredOrders.map(order => {
                  const isSelected = order.id === selectedOrderId;
                  const isChecked = selectedIds.includes(order.id);
                  const isAlert = order.statusCode === 'waiting_rx';

                  return (
                    <tr
                      key={order.id}
                      onClick={() => handleRowClick(order)}
                      className={`transition-colors cursor-pointer group ${
                        isSelected
                          ? 'bg-[#dee8ff]/30 hover:bg-[#dee8ff]/50'
                          : isAlert
                          ? 'bg-[#ffdad6]/10 hover:bg-[#ffdad6]/20'
                          : 'hover:bg-[#f0f3ff]'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-3 text-center" onClick={(e) => handleToggleSelectRow(order.id, e)}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-[#004967] focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Mã đơn & Kênh */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[13px] font-mono text-[#004967] font-bold">{order.id}</span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#004967]" title="Đang xem chi tiết" />}
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${order.channelBadgeBg} ${order.channelBadgeText} text-[11px] font-semibold whitespace-nowrap`}>
                            <span className="material-symbols-outlined text-[13px]">{order.channelIcon}</span>
                            <span>{order.channelLabel}</span>
                          </span>
                        </div>
                      </td>

                      {/* Thời gian / Nhân viên */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="text-[13px] font-mono text-[#111c2d]">{order.time}</div>
                        <div className="text-xs text-[#70787f]">{order.date}</div>
                        <div className="text-xs text-[#70787f] flex items-center gap-0.5 mt-0.5 whitespace-nowrap">
                          <span className="material-symbols-outlined text-[14px]">
                            {order.staff.includes('Bot') ? 'robot' : order.staff.includes('Khách') ? 'person' : order.staff.includes('Telesales') ? 'call' : 'badge'}
                          </span>
                          <span>{order.staff}</span>
                        </div>
                      </td>

                      {/* Khách hàng */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="text-sm font-semibold text-[#111c2d] flex items-center gap-1.5 whitespace-nowrap">
                          {order.customer.name}
                          <span className={`px-1.5 py-0.5 rounded ${order.customer.tierBg} ${order.customer.tierText} text-[10px] font-semibold`}>
                            {order.customer.tier}
                          </span>
                        </div>
                        <div className="text-[12px] font-mono text-[#70787f] whitespace-nowrap">{order.customer.phone}</div>
                        <div className="text-xs text-[#70787f] flex items-center gap-0.5 whitespace-nowrap">
                          {order.customer.history.includes('đơn') && (
                            <span className="material-symbols-outlined text-[13px]">history</span>
                          )}
                          <span>{order.customer.history || order.customer.address}</span>
                        </div>
                      </td>

                      {/* Sản phẩm & Toa kính y khoa */}
                      <td className="py-3 px-4">
                        <div className="text-sm font-semibold text-[#111c2d] truncate max-w-xs">
                          {order.product.frameName}
                        </div>
                        <div className="text-xs text-[#40484e] flex items-center gap-1.5 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded bg-[#e7eeff] text-[#004967] text-[11px] font-medium">
                            {order.product.lensShort}
                          </span>
                          <span className="text-[12px] font-mono text-[#004967] font-semibold">
                            {order.product.rxShort}
                          </span>
                        </div>
                        <div className={`text-xs mt-0.5 flex items-center gap-1 ${order.product.isWarning ? 'text-[#ba1a1a] font-semibold' : 'text-[#70787f]'}`}>
                          <span className={`material-symbols-outlined text-[13px] ${order.product.isWarning ? 'text-[#ba1a1a]' : 'text-[#004966]'}`}>
                            {order.product.isWarning ? 'warning' : 'assignment_turned_in'}
                          </span>
                          <span>{order.product.doctorApproved}</span>
                        </div>
                      </td>

                      {/* Thanh toán */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="text-[13px] font-mono font-bold text-[#004967] whitespace-nowrap">
                          {order.payment.finalTotal.toLocaleString('vi-VN')}&nbsp;₫
                        </div>
                        <div className="mt-1">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${order.payment.methodBadgeBg} ${order.payment.methodBadgeText} text-[11px] font-semibold whitespace-nowrap`}>
                            <span className="material-symbols-outlined text-[13px]">
                              {order.payment.method.includes('QR') ? 'check_circle' : order.payment.method.includes('Apple') ? 'check_circle' : order.payment.method.includes('POS') ? 'credit_card' : 'schedule'}
                            </span>
                            <span>{order.payment.method}</span>
                          </span>
                        </div>
                      </td>

                      {/* Tiến độ kỹ thuật */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${order.techStatus.badgeBg} ${order.techStatus.badgeText} text-[11px] font-semibold whitespace-nowrap`}>
                          <span className={`material-symbols-outlined text-[13px] ${order.techStatus.spin ? 'animate-spin' : ''}`}>
                            {order.techStatus.icon}
                          </span>
                          <span>{order.techStatus.label}</span>
                        </span>
                        <div className={`text-xs mt-1 ${order.statusCode === 'waiting_rx' ? 'text-[#ba1a1a] font-semibold' : 'text-[#70787f]'}`}>
                          {order.techStatus.eta}
                        </div>
                      </td>

                      {/* Tác vụ */}
                      <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          {order.statusCode === 'waiting_rx' ? (
                            <button
                              onClick={(e) => handleApproveRx(order, e)}
                              className="px-2.5 py-1 rounded-lg bg-[#004967] text-white text-xs font-semibold shadow-sm hover:bg-[#086288] transition-all"
                            >
                              Duyệt toa
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedOrderId(order.id);
                                setIsDrawerOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-[#004967] hover:bg-[#e7eeff] transition-colors"
                              title="Xem chi tiết đơn"
                            >
                              <span className="material-symbols-outlined text-[18px]">visibility</span>
                            </button>
                          )}
                          <button
                            onClick={() => message.info(`Đang in phiếu kỹ thuật cho đơn ${order.id}...`)}
                            className="p-1.5 rounded-lg text-[#40484e] hover:bg-[#e7eeff] transition-colors"
                            title="In phiếu mài ráp kỹ thuật A5"
                          >
                            <span className="material-symbols-outlined text-[18px]">print</span>
                          </button>
                          <button
                            onClick={() => message.info(`Thao tác khác cho đơn ${order.id}`)}
                            className="p-1.5 rounded-lg text-[#40484e] hover:bg-[#e7eeff] transition-colors"
                            title="Thao tác khác"
                          >
                            <span className="material-symbols-outlined text-[18px]">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="px-4 py-3 bg-[#f0f3ff] flex items-center justify-between border-t border-[#e7eeff]">
            <div className="text-xs text-[#70787f]">
              Tổng cộng: <strong className="text-[#111c2d] font-semibold">128 đơn</strong> trong khoảng lọc
            </div>
            <div className="flex items-center gap-1.5">
              <button className="px-2.5 py-1 rounded-lg bg-white text-[#70787f] hover:text-[#111c2d] text-xs font-semibold shadow-sm disabled:opacity-50">
                <span className="material-symbols-outlined text-[16px] align-middle">chevron_left</span>
              </button>
              <button className="px-3 py-1 rounded-lg bg-[#004967] text-white text-xs font-semibold">1</button>
              <button className="px-3 py-1 rounded-lg bg-white text-[#111c2d] hover:bg-[#e7eeff] text-xs font-semibold">2</button>
              <button className="px-3 py-1 rounded-lg bg-white text-[#111c2d] hover:bg-[#e7eeff] text-xs font-semibold">3</button>
              <span className="px-1 text-[#70787f]">...</span>
              <button className="px-3 py-1 rounded-lg bg-white text-[#111c2d] hover:bg-[#e7eeff] text-xs font-semibold">13</button>
              <button className="px-2.5 py-1 rounded-lg bg-white text-[#70787f] hover:text-[#111c2d] text-xs font-semibold shadow-sm">
                <span className="material-symbols-outlined text-[16px] align-middle">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- 4. SLIDE-OVER / PINNED DETAIL DRAWER (4 cols on 2XL) ---------------- */}
        {isDrawerOpen && activeOrder && (
          <div className="2xl:col-span-4 bg-white rounded-xl shadow-md p-4 space-y-4 border border-[#d8e3fb]/60 transition-all">
            {/* Drawer Header with Status & Close/Pin */}
            <div className="flex items-start justify-between pb-3 bg-[#f0f3ff]/70 -m-4 p-4 rounded-t-xl border-b border-[#e7eeff]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[20px] font-bold text-[#111c2d] tracking-tight">{activeOrder.id}</span>
                  <span className={`px-2 py-0.5 rounded-full ${activeOrder.channelBadgeBg} ${activeOrder.channelBadgeText} text-xs font-semibold`}>
                    {activeOrder.channelLabel}
                  </span>
                </div>
                <div className="text-xs text-[#70787f] mt-0.5 flex items-center gap-1.5">
                  <span>Tạo lúc: {activeOrder.time}, {activeOrder.date}</span>
                  <span>•</span>
                  <span className="text-[#004967] font-semibold">{activeOrder.channelType === 'pos' ? 'Bán lẻ tại quầy' : 'Đơn trực tuyến'}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => message.info('Đã ghim chi tiết đơn hàng')}
                  className="p-1.5 rounded-lg text-[#70787f] hover:text-[#111c2d] hover:bg-[#e7eeff] transition-colors"
                  title="Thu nhỏ/Mở rộng"
                >
                  <span className="material-symbols-outlined text-[20px]">dock_to_right</span>
                </button>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-[#70787f] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
                  title="Đóng drawer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* 6-Stage Audit Timeline (Tiến độ xử lý lâm sàng & hoàn tất) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#70787f]">Quy trình xử lý đơn hàng (Audit Trail)</span>
                <span className="text-xs font-mono text-[#004967] font-bold">{activeOrder.auditLog}</span>
              </div>
              {/* Stepper Progress Bars */}
              <div className="bg-[#f0f3ff] p-3 rounded-xl space-y-2.5 border border-[#e7eeff]">
                <div className="grid grid-cols-6 gap-1 relative items-center">
                  <div
                    className={`h-1.5 rounded-full ${activeOrder.auditStage >= 1 ? 'bg-[#004967]' : 'bg-[#d8e3fb]'}`}
                    title="1. Đặt đơn (Hoàn tất)"
                  />
                  <div
                    className={`h-1.5 rounded-full ${activeOrder.auditStage >= 2 ? 'bg-[#004967]' : 'bg-[#d8e3fb]'}`}
                    title="2. Thanh toán (Đã xác nhận)"
                  />
                  <div
                    className={`h-1.5 rounded-full ${activeOrder.auditStage >= 3 ? 'bg-[#004967]' : 'bg-[#d8e3fb]'}`}
                    title="3. Duyệt toa OD/OS (Đã ký)"
                  />
                  <div
                    className={`h-1.5 rounded-full ${activeOrder.auditStage === 4 ? 'bg-[#19648f] animate-pulse' : activeOrder.auditStage > 4 ? 'bg-[#004967]' : 'bg-[#d8e3fb]'}`}
                    title="4. Mài lắp Lab (Đang thực hiện)"
                  />
                  <div
                    className={`h-1.5 rounded-full ${activeOrder.auditStage === 5 ? 'bg-[#19648f] animate-pulse' : activeOrder.auditStage > 5 ? 'bg-[#004967]' : 'bg-[#d8e3fb]'}`}
                    title="5. QC & Đóng gói"
                  />
                  <div
                    className={`h-1.5 rounded-full ${activeOrder.auditStage >= 6 ? 'bg-[#004967]' : 'bg-[#d8e3fb]'}`}
                    title="6. Bàn giao khách"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-[#111c2d]">
                  <div className="flex items-center gap-1.5 text-[#004967] font-semibold">
                    <span className="material-symbols-outlined text-[16px] animate-spin">precision_manufacturing</span>
                    <span>{activeOrder.techStatus.label} ({activeOrder.techStatus.machine})</span>
                  </div>
                  <span className="text-[#70787f]">{activeOrder.techStatus.techTime} {activeOrder.techStatus.technician}</span>
                </div>
              </div>
            </div>

            {/* Patient & Prescription Matrix Card (Medical Rigor Component) */}
            <div className="bg-[#f0f3ff] p-3 rounded-xl space-y-2.5 border border-[#e7eeff]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#004967] text-[18px]">clinical_notes</span>
                  <span className="text-sm font-bold text-[#111c2d]">Toa Kính Khúc Xạ Gắn Kèm</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#cae6ff] text-[#004b70] text-[11px] font-semibold">
                  {activeOrder.rx.doctorName}
                </span>
              </div>

              {/* OD/OS Medical Matrix Table */}
              <div className="bg-white rounded-lg p-2 overflow-x-auto shadow-sm border border-[#e7eeff]">
                <table className="w-full text-center text-xs font-mono">
                  <thead>
                    <tr className="text-[#70787f] font-semibold border-b border-[#e7eeff] pb-1">
                      <th className="py-1 text-left px-2">Mắt</th>
                      <th className="py-1">SPH (Cầu)</th>
                      <th className="py-1">CYL (Trụ)</th>
                      <th className="py-1">AXIS (Trục)</th>
                      <th className="py-1">ADD (Cộng)</th>
                      <th className="py-1">PD (Đồng tử)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7eeff]">
                    <tr className="text-[#111c2d]">
                      <td className="py-1.5 text-left px-2 font-bold text-[#004967] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#004967]" /> OD (Phải)
                      </td>
                      <td className="py-1.5 font-bold">{activeOrder.rx.od.sph}</td>
                      <td className="py-1.5 text-[#70787f]">{activeOrder.rx.od.cyl}</td>
                      <td className="py-1.5">{activeOrder.rx.od.axis}</td>
                      <td className="py-1.5 text-[#70787f]">{activeOrder.rx.od.add}</td>
                      <td className="py-1.5 font-bold" rowSpan={2}>{activeOrder.rx.od.pd}</td>
                    </tr>
                    <tr className="text-[#111c2d]">
                      <td className="py-1.5 text-left px-2 font-bold text-[#19648f] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#19648f]" /> OS (Trái)
                      </td>
                      <td className="py-1.5 font-bold">{activeOrder.rx.os.sph}</td>
                      <td className="py-1.5 text-[#70787f]">{activeOrder.rx.os.cyl}</td>
                      <td className="py-1.5">{activeOrder.rx.os.axis}</td>
                      <td className="py-1.5 text-[#70787f]">{activeOrder.rx.os.add}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-xs text-[#40484e] flex items-center justify-between px-1">
                <span>Chiều cao tâm kính (SH): <strong className="text-[#111c2d] font-mono">{activeOrder.rx.sh}</strong></span>
                <span>Khoảng cách đỉnh giác mạc (CVD): <strong className="text-[#111c2d] font-mono">{activeOrder.rx.cvd}</strong></span>
              </div>
            </div>

            {/* Inventory Materials & Items List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#70787f]">
                  Vật tư &amp; Sản phẩm xuất kho {activeOrder.channelLabel}
                </span>
                <span className="text-xs text-[#004967] font-semibold">Trừ kho tức thì</span>
              </div>
              <div className="bg-[#f0f3ff] rounded-xl p-3 space-y-2 border border-[#e7eeff]">
                {/* Item 1: Frame */}
                <div className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm border border-[#e7eeff]">
                  <div className="w-11 h-11 rounded-lg bg-[#e7eeff] flex items-center justify-center text-[#004967] shrink-0">
                    <span className="material-symbols-outlined text-[24px]">eyeglasses</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#111c2d] truncate">{activeOrder.product.frameName}</div>
                    <div className="text-[11px] font-mono text-[#70787f] flex items-center gap-2">
                      <span>SKU: {activeOrder.product.frameSku}</span>
                      <span>|</span>
                      <span>SL: 01 cái</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-[#111c2d]">
                      {activeOrder.product.framePrice.toLocaleString('vi-VN')} đ
                    </div>
                    <div className="text-[11px] text-[#70787f]">Kho kệ: {activeOrder.product.frameShelf}</div>
                  </div>
                </div>

                {/* Item 2: Lenses Pair */}
                <div className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm border border-[#e7eeff]">
                  <div className="w-11 h-11 rounded-lg bg-[#dee8ff] flex items-center justify-center text-[#19648f] shrink-0">
                    <span className="material-symbols-outlined text-[24px]">lens</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#111c2d] truncate">{activeOrder.product.lensName}</div>
                    <div className="text-[11px] font-mono text-[#70787f] flex items-center gap-2">
                      <span>SKU: {activeOrder.product.lensSku}</span>
                      <span>|</span>
                      <span>OD/OS phôi sẵn</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-[#111c2d]">
                      {activeOrder.product.lensPrice.toLocaleString('vi-VN')} đ
                    </div>
                    <div className="text-[11px] text-[#70787f]">{activeOrder.product.lensShelf}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Breakdown Summary */}
            <div className="bg-[#f0f3ff] rounded-xl p-3 space-y-1.5 text-xs border border-[#e7eeff]">
              <div className="flex justify-between text-[#40484e]">
                <span>Tổng tiền hàng (2 món)</span>
                <span className="font-mono">{activeOrder.payment.totalItems.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-[#40484e]">
                <span>{activeOrder.payment.discountLabel}</span>
                <span className="font-mono text-[#004967]">{activeOrder.payment.discount.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-[#40484e]">
                <span>Phí gia công mài lắp kỹ thuật cao</span>
                <span className="font-mono text-[#004966]">{activeOrder.payment.labFeeLabel}</span>
              </div>
              <div className="pt-2 bg-white p-2 rounded-lg flex justify-between items-center text-sm font-bold text-[#111c2d] shadow-sm border border-[#e7eeff]">
                <span>Thực thu quyết toán</span>
                <span className="font-mono text-[#004967] text-[18px]">
                  {activeOrder.payment.finalTotal.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#70787f] pt-0.5 px-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#004967]">qr_code_2</span>
                  <span>{activeOrder.payment.transactionRef}</span>
                </span>
                <span className="text-[#004967] font-semibold">{activeOrder.payment.status}</span>
              </div>
            </div>

            {/* Quick Action Deck for Staff / Technicians */}
            <div className="space-y-2 pt-1">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => message.info(`Đang tạo hóa đơn điện tử VAT cho ${activeOrder.id}...`)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#e7eeff] hover:bg-[#dee8ff] text-[#111c2d] text-xs font-semibold transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  <span>In HĐ VAT Điện tử</span>
                </button>
                <button
                  onClick={() => message.info(`Đang in phiếu gia công kỹ thuật A5 cho ${activeOrder.id}...`)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#086288] text-white text-xs font-semibold shadow-sm hover:bg-[#004967] transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">print</span>
                  <span>In Phiếu Kỹ Thuật A5</span>
                </button>
              </div>

              {activeOrder.auditStage === 4 ? (
                <button
                  onClick={handleAdvanceLabStage}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#004967] text-white text-xs font-bold shadow-md hover:bg-[#086288] transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Xác Nhận Lab Đã Xong - Chuyển QC &amp; Đóng Gói</span>
                </button>
              ) : activeOrder.auditStage === 5 ? (
                <button
                  onClick={() => {
                    setOrders(prev => prev.map(o => o.id === activeOrder.id ? { ...o, auditStage: 6, statusCode: 'completed', auditLog: 'Giai đoạn 6/6' } : o));
                    message.success(`Đơn ${activeOrder.id} đã hoàn tất kiểm tra QC và bàn giao vận chuyển!`);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#19648f] text-white text-xs font-bold shadow-md hover:bg-[#004967] transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                  <span>QC Đạt Chuẩn - Bàn Giao Khách / Shipper</span>
                </button>
              ) : (
                <div className="w-full py-2.5 rounded-xl bg-[#f0f3ff] text-center text-xs text-[#004967] font-semibold border border-[#d8e3fb]">
                  Đơn hàng đang ở trạng thái: {activeOrder.techStatus.label}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

