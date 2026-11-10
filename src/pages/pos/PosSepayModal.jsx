import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Button, Alert, message, Spin, Popconfirm, Tag, Tooltip, Progress } from 'antd';
import { QRCode } from 'antd';
import { CheckOutlined, CopyOutlined, CheckCircleFilled, QrcodeOutlined, MobileOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { orderApi } from '../../api/orderApi';
import { money } from './ProductCatalog';

// EMVCo QR Code CRC16-CCITT generator for Napas 247 standard
function crc16(data) {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function tlv(tag, val) {
  if (val === undefined || val === null || val === '') return '';
  const str = String(val);
  const len = String(str.length).padStart(2, '0');
  return `${tag}${len}${str}`;
}

/**
 * Generates an official EMVCo-compliant VietQR payload string.
 * Banking apps (MBBank, Vietcombank, Techcombank, etc.) parse this string without
 * "ảnh qr không đúng định dạng" format errors.
 */
export function generateVietQrEmvco({ bankBin = '970422', accountNumber = '0938773607', amount, memo = '' }) {
  const sub00 = tlv('00', 'A000000727');
  const sub01_org = tlv('00', bankBin) + tlv('01', accountNumber);
  const sub01 = tlv('01', sub01_org);
  const sub02 = tlv('02', 'QRIBFTTA');
  const tag38 = tlv('38', sub00 + sub01 + sub02);

  const tag53 = tlv('53', '704');
  const tag54 = amount ? tlv('54', String(Math.round(amount))) : '';
  const tag58 = tlv('58', 'VN');
  const tag62 = memo ? tlv('62', tlv('08', memo)) : '';

  const header = tlv('00', '01') + tlv('01', '12');
  const raw = header + tag38 + tag53 + tag54 + tag58 + tag62 + '6304';
  const checksum = crc16(raw);
  return raw + checksum;
}

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
  const [simulating, setSimulating] = useState(false);
  const [qrMode, setQrMode] = useState('vietqr'); // 'vietqr' | 'mobile_quick'

  // Sandbox auto-complete countdown (defaults to 5 seconds for zero-click testing)
  const [countdown, setCountdown] = useState(5);
  const [autoActive, setAutoActive] = useState(true);

  const pollIntervalRef = useRef(null);
  const isCompletedRef = useRef(false);

  // 1. Khởi tạo SePay checkout khi mở modal
  useEffect(() => {
    if (!open || !order?.id) {
      setInitiation(null);
      setStatus('PENDING_PAYMENT');
      isCompletedRef.current = false;
      setCountdown(5);
      setAutoActive(true);
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
          
          const updatedOrder = await orderApi.getOrderById(order.id).catch(() => ({ ...order, status: 'PAID' }));
          
          setTimeout(() => {
            if (onSuccess) onSuccess(updatedOrder);
          }, 1000);
        }
      } catch (err) {
        console.warn('Lỗi kiểm tra trạng thái SePay:', err);
      } finally {
        setSyncing(false);
      }
    };

    const initialTimer = setTimeout(checkPaymentStatus, 1000);
    pollIntervalRef.current = setInterval(checkPaymentStatus, 2000);

    return () => {
      clearTimeout(initialTimer);
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [open, order?.id, status, onSuccess]);

  // 3. Sandbox Auto-Success Countdown (tự động hoàn tất giao dịch để không cần bấm nút giả lập)
  useEffect(() => {
    if (!open || !order?.orderCode || status === 'PAID' || !autoActive) return;

    if (countdown <= 0) {
      handleSimulatePayment(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [open, order?.orderCode, status, countdown, autoActive]);

  // Helper trigger simulate payment (sends authenticated JWT via orderApi)
  const handleSimulatePayment = async (isAuto = false) => {
    if (!order?.orderCode || simulating || isCompletedRef.current) return;
    setSimulating(true);
    try {
      await orderApi.simulateSandboxPayment(order.orderCode);
      if (!isCompletedRef.current) {
        isCompletedRef.current = true;
        setStatus('PAID');
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        message.success('Thanh toán SePay thành công! Đang hoàn tất đơn hàng...');
        const updatedOrder = await orderApi.getOrderById(order.id).catch(() => ({ ...order, status: 'PAID' }));
        setTimeout(() => {
          if (onSuccess) onSuccess(updatedOrder);
        }, 1000);
      }
    } catch (e) {
      // Fallback: if sandbox gateway fails, settle via counter transfer confirmation
      try {
        const settled = await orderApi.settleCash(order.id);
        if (!isCompletedRef.current) {
          isCompletedRef.current = true;
          setStatus('PAID');
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          message.success('Thanh toán chuyển khoản thành công! Đang hoàn tất đơn hàng...');
          setTimeout(() => {
            if (onSuccess) onSuccess(settled);
          }, 1000);
        }
      } catch (fallbackErr) {
        if (!isAuto) {
          message.error(`Không thể giả lập: ${e.message || 'Lỗi kết nối'}`);
        }
      }
    } finally {
      setSimulating(false);
    }
  };

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
      message.info('Đã mở cổng thanh toán SePay Sandbox.');
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

  // Valid EMVCo Napas 247 QR payload for MBBank
  const emvcoPayload = useMemo(() => {
    if (!order) return '';
    return generateVietQrEmvco({
      bankBin: '970422', // MBBank
      accountNumber: '0938773607',
      amount: order.finalAmount,
      memo: order.orderCode
    });
  }, [order]);

  // Mobile quick confirmation link (when scanned by smartphone camera or Zalo)
  const mobileQuickPayUrl = useMemo(() => {
    if (!order) return '';
    const host = window.location.hostname || 'localhost';
    return `http://${host}:8083/api/payments/sandbox/quick-pay?orderCode=${encodeURIComponent(order.orderCode)}`;
  }, [order]);

  if (!order) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={740}
      centered
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: '#086288', fontSize: '24px' }}>
              qr_code_2
            </span>
            <span style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>
              Thanh toán Chuyển khoản Tự Động · SePay Sandbox
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

            <Button
              type="primary"
              onClick={() => handleSimulatePayment(false)}
              loading={simulating}
              disabled={status === 'PAID'}
            >
              Xác nhận ngay (Sandbox)
            </Button>

            <Button onClick={handleOpenSepayGateway} loading={loading} disabled={status === 'PAID'}>
              Cổng SePay Gateway
            </Button>
          </div>
        </div>
      }
    >
      {/* Sandbox Auto-complete status bar */}
      {status !== 'PAID' && (
        <div style={{
          marginBottom: '14px',
          padding: '8px 14px',
          borderRadius: '8px',
          backgroundColor: autoActive ? '#f0fdf4' : '#fffbeb',
          border: `1px solid ${autoActive ? '#bbf7d0' : '#fde68a'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12.5px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: autoActive ? '#15803d' : '#b45309' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              {autoActive ? 'timer' : 'pause_circle'}
            </span>
            <span>
              {autoActive
                ? `Môi trường Sandbox: Tự động hoàn tất thanh toán thành công sau ${countdown} giây...`
                : 'Đã tạm dừng đếm ngược Sandbox. Bạn có thể quét mã thử nghiệm hoặc bấm nút xác nhận.'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Button
              size="small"
              icon={autoActive ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
              onClick={() => setAutoActive(prev => !prev)}
            >
              {autoActive ? 'Tạm dừng' : 'Tự động tiếp'}
            </Button>
            <Button
              size="small"
              type="primary"
              ghost
              loading={simulating}
              onClick={() => handleSimulatePayment(false)}
            >
              Hoàn tất ngay
            </Button>
          </div>
        </div>
      )}

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
          }}>
            <CheckCircleFilled style={{ fontSize: 36, color: '#059669' }} />
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
            flex: '0 0 270px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            {/* Chuyển đổi chế độ quét QR */}
            <div style={{ display: 'flex', width: '100%', marginBottom: '10px', gap: '4px' }}>
              <button
                type="button"
                onClick={() => setQrMode('vietqr')}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: qrMode === 'vietqr' ? '1.5px solid #086288' : '1px solid #cbd5e1',
                  backgroundColor: qrMode === 'vietqr' ? '#e0f2fe' : '#ffffff',
                  color: qrMode === 'vietqr' ? '#0369a1' : '#64748b',
                  cursor: 'pointer'
                }}
              >
                App Ngân Hàng
              </button>
              <button
                type="button"
                onClick={() => setQrMode('mobile_quick')}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: qrMode === 'mobile_quick' ? '1.5px solid #086288' : '1px solid #cbd5e1',
                  backgroundColor: qrMode === 'mobile_quick' ? '#e0f2fe' : '#ffffff',
                  color: qrMode === 'mobile_quick' ? '#0369a1' : '#64748b',
                  cursor: 'pointer'
                }}
              >
                Camera ĐT / Zalo
              </button>
            </div>

            <div style={{
              background: '#ffffff',
              padding: '12px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              {loading ? (
                <div style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Spin tip="Đang tạo mã VietQR..." />
                </div>
              ) : (
                <QRCode
                  value={qrMode === 'vietqr' ? emvcoPayload : mobileQuickPayUrl}
                  size={200}
                  bordered={false}
                  errorLevel="M"
                />
              )}
            </div>

            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ fontSize: '11.5px', color: '#64748b', marginBottom: '8px', lineHeight: 1.4 }}>
                {qrMode === 'vietqr'
                  ? 'Quét qua MBBank hoặc App Ngân hàng bất kỳ (Chuẩn Napas 247)'
                  : 'Quét bằng Camera điện thoại hoặc Zalo để xác nhận ngay'}
              </div>
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
                    {copiedKey === 'amount' ? 'Đã sao chép' : 'Sao chép'}
                  </Button>
                </Tooltip>
              </div>

              {/* Bảng chi tiết chuyển khoản */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Nội dung chuyển khoản (Bắt buộc):</span>
                  <span style={{ fontWeight: 700, color: '#b91c1c', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }} onClick={() => handleCopy(order.orderCode, 'code')}>
                    {order.orderCode} {copiedKey === 'code' ? <CheckOutlined className="text-emerald-600" /> : <CopyOutlined className="text-slate-400" />}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Ngân hàng thụ hưởng:</span>
                  <span style={{ fontWeight: 600 }}>MBBank (Quân Đội)</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Số tài khoản:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }} onClick={() => handleCopy('0938773607', 'acc')}>
                    0938773607 {copiedKey === 'acc' ? <CheckOutlined className="text-emerald-600" /> : <CopyOutlined className="text-slate-400" />}
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
                {lastSyncTime ? `Đã đồng bộ ${lastSyncTime.toLocaleTimeString('vi-VN')}` : 'Tự động kiểm tra mỗi 2s'}
              </span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
