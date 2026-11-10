import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Alert, message, Spin, Popconfirm, Tag, Tooltip } from 'antd';
import { QRCode } from 'antd';
import { orderApi } from '../../api/orderApi';
import { money } from './ProductCatalog';

export default function PosSepayModal({
  open,
  order,
  onSuccess,
  onClose,
  onManualSettled
}) {
  const [initiation, setInitiation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [status, setStatus] = useState('PENDING_PAYMENT');
  const [copiedKey, setCopiedKey] = useState(null);
  const [settlingManual, setSettlingManual] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const pollIntervalRef = useRef(null);
  const isCompletedRef = useRef(false);

  // 1. Khởi tạo SePay checkout khi mở modal
  useEffect(() => {
    if (!open || !order?.id) {
      setInitiation(null);
      setStatus('PENDING_PAYMENT');
      isCompletedRef.current = false;
      return;
    }

    let active = true;
    setLoading(true);

    orderApi.initiatePayment(order.id, 'SEPAY')
      .then(res => {
        if (!active) return;
        setInitiation(res);
        setLoading(false);
      })
      .catch(err => {
        if (!active) return;
        console.error('Lỗi khởi tạo SePay:', err);
        message.error(`Không khởi tạo được cổng SePay: ${err.message || 'Lỗi kết nối'}`);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [open, order?.id]);

  // 2. Real-time Polling: Kiểm tra trạng thái thanh toán từ SePay Gateway
  useEffect(() => {
    if (!open || !order?.id || status === 'PAID') {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      return;
    }

    const checkPaymentStatus = async () => {
      if (isCompletedRef.current) return;
      setSyncing(true);
      try {
        const history = await orderApi.syncPayment(order.id);
        setLastSyncTime(new Date());

        const isSuccess = Array.isArray(history) && history.some(p => p.status === 'SUCCESS');
        if (isSuccess && !isCompletedRef.current) {
          isCompletedRef.current = true;
          setStatus('PAID');
          clearInterval(pollIntervalRef.current);
          message.success('Thanh toán SePay thành công! Đang hoàn tất đơn hàng...');
          
          // Lấy thông tin đơn hàng mới nhất
          const updatedOrder = await orderApi.getOrderById(order.id).catch(() => ({ ...order, status: 'PAID' }));
          
          setTimeout(() => {
            if (onSuccess) onSuccess(updatedOrder);
          }, 1200);
        }
      } catch (err) {
        console.warn('Lỗi kiểm tra trạng thái SePay:', err);
      } finally {
        setSyncing(false);
      }
    };

    // Kiểm tra ngay sau 1.5s
    const initialTimer = setTimeout(checkPaymentStatus, 1500);

    // Sau đó lặp lại mỗi 2.5s
    pollIntervalRef.current = setInterval(checkPaymentStatus, 2500);

    return () => {
      clearTimeout(initialTimer);
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [open, order?.id, status, onSuccess]);

  // Copy to clipboard helper
  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(String(text));
    setCopiedKey(key);
    message.success({ content: `Đã sao chép: ${text}`, duration: 1 });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Mở cổng SePay Sandbox trong cửa sổ popup
  const handleOpenSepayGateway = () => {
    if (!initiation?.paymentUrl) {
      message.warning('Chưa có đường dẫn cổng SePay.');
      return;
    }

    const form = document.createElement('form');
    form.method = initiation.httpMethod || 'POST';
    form.action = initiation.paymentUrl;
    form.target = 'sepay_checkout_popup';

    const popup = window.open('', 'sepay_checkout_popup', 'width=540,height=780,menubar=no,status=no,toolbar=no');

    if (initiation.formFields) {
      for (const [key, val] of Object.entries(initiation.formFields)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = val;
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    try {
      form.submit();
    } finally {
      form.remove();
    }

    if (popup) {
      popup.focus();
      message.info('Đã mở cổng thanh toán SePay. Khách có thể quét mã hoặc thao tác thanh toán.');
    } else {
      message.warning('Trình duyệt đã chặn cửa sổ bật lên. Vui lòng cho phép popup để mở cổng SePay.');
    }
  };

  // Xác nhận đã nhận tiền thủ công tại quầy (fallback)
  const handleManualSettle = async () => {
    if (!order?.id) return;
    setSettlingManual(true);
    try {
      const settled = await orderApi.settleCash(order.id);
      message.success('Đã xác nhận thanh toán chuyển khoản tại quầy thành công!');
      if (onManualSettled) onManualSettled(settled);
      else if (onSuccess) onSuccess(settled);
    } catch (err) {
      message.error(`Không thể xác nhận: ${err.message || 'Lỗi server'}`);
    } finally {
      setSettlingManual(false);
    }
  };

  // Hủy đơn hàng POS
  const handleCancelOrder = async () => {
    if (!order?.id) return;
    setCancelling(true);
    try {
      await orderApi.cancel(order.id, 'Thu ngân hủy giao dịch chuyển khoản VietQR', false);
      message.info(`Đã hủy đơn ${order.orderCode}`);
      if (onClose) onClose();
    } catch (err) {
      message.error(`Không thể hủy: ${err.message || 'Lỗi server'}`);
    } finally {
      setCancelling(false);
    }
  };

  if (!order) return null;

  // VietQR URL for customer banking app
  const vietQrUrl = `https://qr.sepay.vn/img?acc=1903&bank=MBBank&amount=${order.finalAmount}&des=${encodeURIComponent(order.orderCode)}`;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={720}
      centered
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: '#086288', fontSize: '24px' }}>
              qr_code_2
            </span>
            <span style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>
              Thanh toán Chuyển khoản VietQR · SePay Sandbox
            </span>
          </div>
          <Tag color="cyan" style={{ fontWeight: 600, fontSize: '12px' }}>
            Mã đơn: {order.orderCode}
          </Tag>
        </div>
      }
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Popconfirm
            title="Hủy đơn hàng?"
            description="Đơn hàng đang chờ thanh toán này sẽ bị hủy bỏ."
            okText="Hủy đơn"
            cancelText="Giữ lại"
            okButtonProps={{ danger: true, loading: cancelling }}
            onConfirm={handleCancelOrder}
          >
            <Button danger disabled={status === 'PAID' || settlingManual}>
              Hủy đơn hàng
            </Button>
          </Popconfirm>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Popconfirm
              title="Xác nhận tiền đã vào tài khoản?"
              description="Sử dụng khi khách đã chuyển khoản nhưng SePay chưa tự động ghi nhận (đối soát thủ công)."
              okText="Xác nhận đã nhận"
              cancelText="Đóng"
              onConfirm={handleManualSettle}
            >
              <Button loading={settlingManual} disabled={status === 'PAID'}>
                Xác nhận đã nhận tiền (Thủ công)
              </Button>
            </Popconfirm>

            <Button type="primary" onClick={handleOpenSepayGateway} loading={loading} disabled={status === 'PAID'}>
              Mở cổng SePay Sandbox ↗
            </Button>
          </div>
        </div>
      }
    >
      {status === 'PAID' ? (
        <div style={{ textAlign: 'center', padding: '36px 16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#d1fae5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '36px'
          }}>
            ✓
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#065f46', margin: '0 0 8px' }}>
            Thanh toán thành công!
          </h3>
          <p style={{ color: '#4b5563', fontSize: '14px', margin: '0 0 16px' }}>
            Cổng thanh toán SePay đã xác thực giao dịch cho đơn hàng <strong>{order.orderCode}</strong>.
          </p>
          <Tag color="success" style={{ fontSize: '13px', padding: '4px 12px' }}>
            Đã thanh toán: {money(order.finalAmount)}
          </Tag>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '24px', padding: '12px 0' }}>
          {/* Cột trái: QR Code và Nút mở Sandbox */}
          <div style={{
            flex: '0 0 260px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              background: '#ffffff',
              padding: '12px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              {loading ? (
                <div style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Spin tip="Đang tạo mã VietQR..." />
                </div>
              ) : (
                <QRCode
                  value={vietQrUrl}
                  size={200}
                  bordered={false}
                  errorLevel="M"
                />
              )}
            </div>

            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                Quét mã qua App Ngân hàng bất kỳ
              </div>
              <Button
                type="dashed"
                block
                size="small"
                onClick={handleOpenSepayGateway}
                style={{ fontSize: '12px', color: '#086288', borderColor: '#93c5fd' }}
              >
                Mở cổng thanh toán SePay ↗
              </Button>
            </div>
          </div>

          {/* Cột phải: Thông tin chi tiết đơn & tài khoản */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Header số tiền */}
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#1e40af', fontWeight: 600 }}>TỔNG TIỀN THANH TOÁN</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#1d4ed8' }}>
                    {money(order.finalAmount)}
                  </div>
                </div>
                <Tooltip title="Sao chép số tiền">
                  <Button
                    size="small"
                    onClick={() => handleCopy(order.finalAmount, 'amount')}
                  >
                    {copiedKey === 'amount' ? '✓ Đã chép' : 'Sao chép'}
                  </Button>
                </Tooltip>
              </div>

              {/* Bảng chi tiết chuyển khoản */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Nội dung chuyển khoản (Bắt buộc):</span>
                  <span style={{ fontWeight: 700, color: '#b91c1c', cursor: 'pointer' }} onClick={() => handleCopy(order.orderCode, 'code')}>
                    {order.orderCode} {copiedKey === 'code' ? '✓' : '📋'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Ngân hàng thụ hưởng:</span>
                  <span style={{ fontWeight: 600 }}>MBBank (Quân Đội)</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Số tài khoản:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a', cursor: 'pointer' }} onClick={() => handleCopy('19039999999', 'acc')}>
                    19039999999 {copiedKey === 'acc' ? '✓' : '📋'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Chủ tài khoản:</span>
                  <span style={{ fontWeight: 600 }}>CÔNG TY KÍNH MẮT OPTIVISION</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Khách hàng:</span>
                  <span style={{ fontWeight: 600 }}>{order.customerName || 'Khách vãng lai'} {order.customerPhone ? `(${order.customerPhone})` : ''}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>Chi nhánh POS:</span>
                  <span style={{ fontWeight: 600 }}>{order.branchName || order.branchCode || 'Chi nhánh'}</span>
                </div>
              </div>
            </div>

            {/* Trạng thái đối soát tự động */}
            <div style={{
              marginTop: '16px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: syncing ? '#10b981' : '#3b82f6',
                  boxShadow: syncing ? '0 0 6px #10b981' : 'none'
                }} />
                <span style={{ fontSize: '12px', color: '#334155', fontWeight: 500 }}>
                  {syncing ? 'Đang đối soát SePay PG API...' : 'Đang chờ khách thanh toán qua VietQR'}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                {lastSyncTime ? `Đã đồng bộ ${lastSyncTime.toLocaleTimeString('vi-VN')}` : 'Tự động kiểm tra mỗi 2.5s'}
              </span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

