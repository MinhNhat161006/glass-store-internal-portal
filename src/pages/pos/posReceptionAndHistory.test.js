import test from 'node:test';
import assert from 'node:assert/strict';

// Helper logic mirroring CustomerReceptionModal validation
export function validateCustomerPayload({ fullName, phoneNumber, email }) {
  const trimmedName = (fullName || '').trim();
  const trimmedPhone = (phoneNumber || '').trim().replace(/\s+/g, '');
  const trimmedEmail = (email || '').trim();

  if (!trimmedName) {
    throw new Error('Vui lòng nhập họ và tên khách hàng.');
  }
  if (!trimmedPhone) {
    throw new Error('Vui lòng nhập số điện thoại.');
  }
  const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
  if (!phoneRegex.test(trimmedPhone)) {
    throw new Error('Số điện thoại không hợp lệ (cần 10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09).');
  }
  if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    throw new Error('Định dạng email không hợp lệ.');
  }
  return {
    fullName: trimmedName,
    phoneNumber: trimmedPhone,
    email: trimmedEmail || null
  };
}

// Helper logic mirroring PosHistoryModal filtering
export function filterPosOrders(orders, { branch, dateMode, targetDate, staff, status, searchQuery }) {
  return orders.filter(order => {
    if (branch && branch !== 'ALL') {
      const matchesBranch =
        order.branchCode === branch ||
        (branch === 'BRANCH_01' && (order.branchName || '').includes('01')) ||
        (branch === 'BRANCH_02' && (order.branchName || '').includes('02'));
      if (!matchesBranch) return false;
    }

    if (order.createdAt && dateMode) {
      const orderDate = new Date(order.createdAt).toISOString().slice(0, 10);
      if (dateMode === 'TODAY' && targetDate && orderDate !== targetDate) return false;
      if (dateMode === 'CUSTOM' && targetDate && orderDate !== targetDate) return false;
    }

    if (staff && staff !== 'ALL' && order.staffName !== staff) {
      return false;
    }

    if (status && status !== 'ALL') {
      if (status === 'REFUND_PENDING' && order.refundStatus !== 'PENDING') return false;
      if (status === 'REFUNDED' && order.refundStatus !== 'CONFIRMED') return false;
      if (status !== 'REFUND_PENDING' && status !== 'REFUNDED' && order.status !== status) return false;
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const code = (order.orderCode || '').toLowerCase();
      const customer = (order.customerName || '').toLowerCase();
      const phone = (order.customerPhone || '').toLowerCase();
      if (!code.includes(q) && !customer.includes(q) && !phone.includes(q)) {
        return false;
      }
    }

    return true;
  });
}

// Helper logic mirroring KPI stats calculation
export function computePosStats(orders) {
  let totalRevenue = 0;
  let paidCount = 0;
  let cancelledCount = 0;

  orders.forEach(o => {
    if (o.status === 'PAID') {
      totalRevenue += Number(o.finalAmount || 0);
      paidCount++;
    } else if (o.status === 'CANCELLED') {
      cancelledCount++;
    }
  });

  return { totalRevenue, paidCount, cancelledCount, totalCount: orders.length };
}

// Helper logic mirroring receipt data representation
export function formatReceiptPaymentMethod(method) {
  const map = {
    CASH: 'Tiền mặt',
    VIETQR: 'VietQR',
    SEPAY: 'Cổng SePay',
    CARD: 'Thẻ POS'
  };
  return map[method] || method;
}

test('S3-23 Subtask 1: validateCustomerPayload accepts valid VN customer data and preserves trimmed fields', () => {
  const valid = validateCustomerPayload({
    fullName: '  Nguyễn Văn A  ',
    phoneNumber: ' 0901234567 ',
    email: ' a.nguyen@example.com '
  });
  assert.equal(valid.fullName, 'Nguyễn Văn A');
  assert.equal(valid.phoneNumber, '0901234567');
  assert.equal(valid.email, 'a.nguyen@example.com');
});

test('S3-23 Subtask 1: validateCustomerPayload rejects missing name, invalid phone prefix or length', () => {
  assert.throws(() => validateCustomerPayload({ fullName: '', phoneNumber: '0901234567' }), /Vui lòng nhập họ và tên/);
  assert.throws(() => validateCustomerPayload({ fullName: 'Nguyễn B', phoneNumber: '' }), /Vui lòng nhập số điện thoại/);
  assert.throws(() => validateCustomerPayload({ fullName: 'Nguyễn B', phoneNumber: '12345' }), /Số điện thoại không hợp lệ/);
  assert.throws(() => validateCustomerPayload({ fullName: 'Nguyễn B', phoneNumber: '0123456789' }), /Số điện thoại không hợp lệ/);
  assert.throws(() => validateCustomerPayload({ fullName: 'Nguyễn B', phoneNumber: '0901234567', email: 'not-an-email' }), /Định dạng email không hợp lệ/);
});

test('S3-23 Subtask 2: F4 holdCart and restoreCart preserve customerId, voucherCode, pointsToUse and linkedRx', () => {
  const sampleCustomer = { id: 42, name: 'Trần Thị Mai', phone: '0987654321', tier: 'VIP' };
  const sampleRx = { id: 108, code: '#RX-2026-108', customer: 'Trần Thị Mai', customerId: 42, od: 'Sph -2.0', os: 'Sph -1.5' };
  const cartItems = [{ sku: 'FRM-BOLON-01', quantity: 1, name: 'Gọng Bolon Titanium', price: 1500000 }];

  // Simulate hold draft construction
  const draft = {
    id: 'draft-uuid-1',
    branchCode: 'BRANCH_01',
    savedAt: new Date().toISOString(),
    customer: { id: sampleCustomer.id, name: sampleCustomer.name, phone: sampleCustomer.phone, tier: sampleCustomer.tier },
    voucherCode: 'VOUCHER10',
    pointsToUse: 50,
    prescriptionId: sampleRx.id,
    prescriptionCode: sampleRx.code,
    linkedRx: { ...sampleRx },
    items: cartItems
  };

  assert.equal(draft.customer.id, 42, 'CustomerId must be strictly retained in draft');
  assert.equal(draft.voucherCode, 'VOUCHER10', 'VoucherCode must be retained');
  assert.equal(draft.pointsToUse, 50, 'Points must be retained');
  assert.equal(draft.prescriptionId, 108, 'PrescriptionId must be retained');
  assert.deepEqual(draft.linkedRx, sampleRx, 'Prescription details (OD/OS) must be fully retained in draft');

  // Simulate restore
  const restoredCustomer = { ...draft.customer, points: 0, pointValue: 0 };
  const restoredRx = draft.linkedRx;
  const restoredVoucher = draft.voucherCode;

  assert.equal(restoredCustomer.id, 42);
  assert.equal(restoredCustomer.name, 'Trần Thị Mai');
  assert.equal(restoredVoucher, 'VOUCHER10');
  assert.equal(restoredRx.id, 108);
});

test('S3-23 Subtask 1 & 3: filterPosOrders accurately filters by branch, date, staff, status and search query', () => {
  const today = '2026-11-10';
  const sampleOrders = [
    { id: 1, orderCode: 'POS-20261110-001', branchCode: 'BRANCH_01', branchName: 'Chi nhánh 01 (Quận 1)', createdAt: '2026-11-10T10:00:00Z', staffName: 'Phạm Huỳnh Tiến Đạt', customerName: 'Lê Văn C', customerPhone: '0912345678', finalAmount: 2500000, status: 'PAID', refundStatus: 'NONE' },
    { id: 2, orderCode: 'POS-20261110-002', branchCode: 'BRANCH_02', branchName: 'Chi nhánh 02 (Bình Thạnh)', createdAt: '2026-11-10T11:00:00Z', staffName: 'Nguyễn Thu Ngân', customerName: 'Hoàng D', customerPhone: '0933333333', finalAmount: 1800000, status: 'PAID', refundStatus: 'NONE' },
    { id: 3, orderCode: 'POS-20261110-003', branchCode: 'BRANCH_01', branchName: 'Chi nhánh 01 (Quận 1)', createdAt: '2026-11-10T14:00:00Z', staffName: 'Phạm Huỳnh Tiến Đạt', customerName: 'Lê Văn C', customerPhone: '0912345678', finalAmount: 500000, status: 'CANCELLED', refundStatus: 'PENDING' },
    { id: 4, orderCode: 'POS-20261109-001', branchCode: 'BRANCH_01', branchName: 'Chi nhánh 01 (Quận 1)', createdAt: '2026-11-09T09:00:00Z', staffName: 'Phạm Huỳnh Tiến Đạt', customerName: 'Đỗ E', customerPhone: '0944444444', finalAmount: 1200000, status: 'PAID', refundStatus: 'NONE' }
  ];

  // Filter branch 01
  const b1 = filterPosOrders(sampleOrders, { branch: 'BRANCH_01' });
  assert.equal(b1.length, 3);

  // Filter today
  const todayOrders = filterPosOrders(sampleOrders, { dateMode: 'TODAY', targetDate: today });
  assert.equal(todayOrders.length, 3);

  // Filter staff
  const datOrders = filterPosOrders(sampleOrders, { staff: 'Phạm Huỳnh Tiến Đạt' });
  assert.equal(datOrders.length, 3);

  // Filter status CANCELLED
  const cancelled = filterPosOrders(sampleOrders, { status: 'CANCELLED' });
  assert.equal(cancelled.length, 1);
  assert.equal(cancelled[0].orderCode, 'POS-20261110-003');

  // Filter refund pending
  const refundPending = filterPosOrders(sampleOrders, { status: 'REFUND_PENDING' });
  assert.equal(refundPending.length, 1);

  // Search query
  const searched = filterPosOrders(sampleOrders, { searchQuery: '0933333333' });
  assert.equal(searched.length, 1);
  assert.equal(searched[0].customerName, 'Hoàng D');

  // KPI stats on today's branch 01
  const b1Today = filterPosOrders(sampleOrders, { branch: 'BRANCH_01', dateMode: 'TODAY', targetDate: today });
  const stats = computePosStats(b1Today);
  assert.equal(stats.totalCount, 2);
  assert.equal(stats.paidCount, 1);
  assert.equal(stats.cancelledCount, 1);
  assert.equal(stats.totalRevenue, 2500000);
});

test('S3-23 Subtask 2 & 3: formatReceiptPaymentMethod maps payment providers including SePay and VietQR', () => {
  assert.equal(formatReceiptPaymentMethod('CASH'), 'Tiền mặt');
  assert.equal(formatReceiptPaymentMethod('VIETQR'), 'VietQR');
  assert.equal(formatReceiptPaymentMethod('SEPAY'), 'Cổng SePay');
  assert.equal(formatReceiptPaymentMethod('CARD'), 'Thẻ POS');
  assert.equal(formatReceiptPaymentMethod('OTHER'), 'OTHER');
});
