import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { prescriptionApi } from '../../api/prescriptionApi';
import { appointmentApi } from '../../api/appointmentApi';
import { customerApi } from '../../api/customerApi';
import { Alert, Button, Empty, Input, InputNumber, message, Modal, Spin, Table } from 'antd';
import { useAuth } from '../../context/AuthContext';
import OptometryInsights from './OptometryInsights';
import '../workspace.css';

export default function OptometryPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Bệnh nhân từ navigation state (nếu được chuyển từ OptometryAppointmentsPage)
  const incomingPatient = location.state?.patient || null;

  // State thông tin bệnh nhân
  const [patient, setPatient] = useState({
    customerId: incomingPatient?.customerId || null,
    customerName: incomingPatient?.customerName || '',
    customerPhone: incomingPatient?.customerPhone || '',
    appointmentId: incomingPatient?.appointmentId || incomingPatient?.id || null,
    ticketCode: incomingPatient?.ticketCode || '',
    notes: incomingPatient?.notes || ''
  });

  // Thông số Mắt Phải (OD)
  const [odSph, setOdSph] = useState(null);
  const [odCyl, setOdCyl] = useState(null);
  const [odAxis, setOdAxis] = useState(null);
  const [odAdd, setOdAdd] = useState(0.00);
  const [odPd, setOdPd] = useState(null);
  const [odVa, setOdVa] = useState('');

  // Thông số Mắt Trái (OS)
  const [osSph, setOsSph] = useState(null);
  const [osCyl, setOsCyl] = useState(null);
  const [osAxis, setOsAxis] = useState(null);
  const [osAdd, setOsAdd] = useState(0.00);
  const [osPd, setOsPd] = useState(null);
  const [osVa, setOsVa] = useState('');

  // Tổng khoảng cách đồng tử (Total PD)
  const [pd, setPd] = useState(0);

  // Chẩn đoán & ghi chú lâm sàng
  const [clinicalNotes, setClinicalNotes] = useState('');

  // Trạng thái lưu & in ấn
  const [saving, setSaving] = useState(false);
  const [savedPrescription, setSavedPrescription] = useState(null);
  const [selectedLens, setSelectedLens] = useState(null);
  const [insightsOpen, setInsightsOpen] = useState(false);
  useEffect(() => { setSelectedLens(null); }, [patient.customerId, odSph, osSph]);
  useEffect(() => { setSavedPrescription(null); setInsightsOpen(false); }, [patient.customerId]);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Modal chọn bệnh nhân từ CSDL
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [dbPatients, setDbPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [patientsError, setPatientsError] = useState('');

  // Đồng bộ danh sách bệnh nhân từ backend
  useEffect(() => {
    customerApi.getCustomerList().then(res => {
      const list = Array.isArray(res) ? res : (res?.data || []);
      if (list.length > 0) setDbPatients(list);
    }).catch(() => setPatientsError('Không tải được danh sách khách hàng. Vui lòng tải lại trang.'))
      .finally(() => setPatientsLoading(false));
  }, []);

  // Tự động tính Total PD khi thay đổi PD đơn
  useEffect(() => {
    setPd(Number((Number(odPd) + Number(osPd)).toFixed(1)));
  }, [odPd, osPd]);

  // Nếu có dữ liệu từ trang hàng đợi chuyển sang
  useEffect(() => {
    if (incomingPatient) {
      setPatient({
        customerId: incomingPatient.customerId || null,
        customerName: incomingPatient.customerName || 'Khách Hàng',
        customerPhone: incomingPatient.customerPhone || '',
        appointmentId: incomingPatient.appointmentId || incomingPatient.id || null,
        ticketCode: incomingPatient.ticketCode || '',
        notes: incomingPatient.notes || ''
      });
      message.info(`Đang đo mắt cho bệnh nhân: ${incomingPatient.customerName}`);
    }
  }, [incomingPatient]);

  // Bác sĩ bấm "Ký duyệt đơn kính"
  const handleSignAndPush = async () => {
    if (!patient.customerId) { message.warning('Vui lòng chọn khách hàng.'); return; }
    const required = [odSph, odCyl, odAxis, odAdd, odPd, osSph, osCyl, osAxis, osAdd, osPd];
    if (required.some(value => value == null || value === '' || !Number.isFinite(Number(value)))) {
      message.warning('Vui lòng nhập đủ SPH, CYL, AXIS và PD cho hai mắt.');
      return;
    }
    if ([odAxis, osAxis].some(value => value < 0 || value > 180 || !Number.isInteger(Number(value))) || [odPd, osPd].some(value => value <= 0 || value > 50)) {
      message.warning('Kiểm tra AXIS (0–180°) và PD mỗi mắt (trên 0 đến 50 mm).');
      return;
    }
    if ([odSph, osSph].some(v => v < -30 || v > 30)
      || [odCyl, osCyl].some(v => v < -10 || v > 10)
      || [odAdd, osAdd].some(v => v < 0 || v > 4)
      || Number(pd) < 40 || Number(pd) > 90) {
      message.warning('SPH: -30..30; CYL: -10..10; ADD: 0..4; PD: 40..90 mm.');
      return;
    }
    try {
      setSaving(true);
      const payload = {
        customerId: patient.customerId,
        customerName: patient.customerName || 'Khách Hàng Mới',
        odSph: Number(odSph),
        odCyl: Number(odCyl),
        odAxis: Number(odAxis),
        odAdd: Number(odAdd),
        osSph: Number(osSph),
        osCyl: Number(osCyl),
        osAxis: Number(osAxis),
        osAdd: Number(osAdd),
        pd: Number(pd),
        lensSku: selectedLens?.sku || null,
        lensName: selectedLens?.name || null,
        notes: clinicalNotes
      };

      // 1. Gọi API POST /api/prescriptions lưu vào bảng prescriptions
      const saved = await prescriptionApi.createPrescription(payload);
      setSavedPrescription(saved || payload);
      setDirty(false);

      // 2. Nếu có liên kết với lịch hẹn, cập nhật lịch hẹn sang "Đã xong" (COMPLETED)
      if (patient.appointmentId) {
        try {
          await appointmentApi.updateAppointmentStatus(patient.appointmentId, {
            status: 'COMPLETED',
            statusLabel: 'Đã xong',
            examStep: 'Bước 12 / 12 - Hoàn tất & Ký duyệt đơn kính'
          });
        } catch (e) {
          console.warn('Cập nhật trạng thái lịch hẹn:', e);
        }
      }

      message.success('Đã lưu và xác nhận toa kính.');
      // Tự động mở modal Mẫu in Toa Kính Mắt Y Khoa
      setShowPrintModal(true);
    } catch (err) {
      console.error('Ký duyệt đơn kính thất bại:', err);
      message.error('Lỗi khi ký duyệt đơn kính: ' + (err.message || 'Không thể kết nối CSDL'));
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setSavedPrescription(null);
    setShowPrintModal(false);
    setDirty(false);
    setOdSph(null); setOdCyl(null); setOdAxis(null); setOdAdd(0); setOdPd(null); setOdVa('');
    setOsSph(null); setOsCyl(null); setOsAxis(null); setOsAdd(0); setOsPd(null); setOsVa('');
    setClinicalNotes('');
    setHistory([]);
    setHistoryOpen(false);
  }, [patient.customerId]);

  useEffect(() => {
    if (!historyOpen || !patient.customerId) return;
    let cancelled = false;
    setHistoryLoading(true);
    setHistoryError('');
    prescriptionApi.getByCustomerId(patient.customerId).then(list => {
      if (!cancelled) setHistory(list);
    }).catch(() => {
      if (!cancelled) setHistoryError('Không tải được lịch sử đo. Vui lòng mở lại để thử.');
    }).finally(() => { if (!cancelled) setHistoryLoading(false); });
    return () => { cancelled = true; };
  }, [historyOpen, patient.customerId, savedPrescription]);

  const edit = setter => value => { setter(value); setDirty(true); };
  const display = value => value == null || value === '' ? '—' : value;
  const measuredAt = savedPrescription?.createdAt ? new Date(savedPrescription.createdAt) : new Date();
  const examiner = user?.staffName || user?.fullName || 'Chưa có thông tin';
  const eyeRows = [
    { name: 'Mắt phải (OD)', sph: odSph, cyl: odCyl, axis: odAxis, add: odAdd, pd: odPd, va: odVa, setters: [setOdSph, setOdCyl, setOdAxis, setOdAdd, setOdPd, setOdVa] },
    { name: 'Mắt trái (OS)', sph: osSph, cyl: osCyl, axis: osAxis, add: osAdd, pd: osPd, va: osVa, setters: [setOsSph, setOsCyl, setOsAxis, setOsAdd, setOsPd, setOsVa] },
  ];
  const filteredPatients = dbPatients.filter(p => !patientSearchQuery.trim() || [p.fullName, p.phoneNumber].some(value => String(value || '').toLocaleLowerCase('vi-VN').includes(patientSearchQuery.trim().toLocaleLowerCase('vi-VN'))));

  return (
    <div className="simple-workspace">
      <header className="workspace-header">
        <div><h1>Đo mắt</h1><p>{measuredAt.toLocaleDateString('vi-VN')} · {examiner}</p></div>
        <Button onClick={() => navigate('/optometry-appointments')}>Hàng đợi</Button>
      </header>

      <section className="workspace-panel exam-patient">
        <div><div className="workspace-name">{patient.customerName || 'Chưa chọn khách hàng'}</div><div className="workspace-muted">{patient.customerPhone || 'Chọn khách hàng trước khi lưu kết quả'}{patient.ticketCode ? ` · ${patient.ticketCode}` : ''}</div></div>
        <Button disabled={saving} onClick={() => setIsPatientModalOpen(true)}>{patient.customerId ? 'Đổi khách hàng' : 'Chọn khách hàng'}</Button>
      </section>

      <section className="workspace-panel exam-panel">
        <h2>Thông số đo</h2>
        <div className="exam-table-wrap"><table className="exam-table">
          <thead><tr><th>Mắt</th>{['SPH', 'CYL', 'AXIS (°)', 'ADD', 'PD (mm)', 'Thị lực'].map(label => <th key={label}>{label}</th>)}</tr></thead>
          <tbody>{eyeRows.map(eye => <tr key={eye.name}>
            <td>{eye.name}</td>
            {['sph', 'cyl', 'axis', 'add', 'pd'].map((field, index) => <td key={field}><InputNumber disabled={saving} aria-label={`${eye.name} ${field.toUpperCase()}`} value={eye[field]} onChange={edit(eye.setters[index])} step={field === 'axis' ? 1 : field === 'pd' ? 0.5 : 0.25} precision={field === 'axis' ? 0 : field === 'pd' ? 1 : 2} min={field === 'axis' || field === 'add' ? 0 : field === 'pd' ? 1 : undefined} max={field === 'axis' ? 180 : field === 'pd' ? 50 : undefined} /></td>)}
            <td><Input disabled={saving} aria-label={`${eye.name} thị lực`} placeholder="10/10" value={eye.va} onChange={event => edit(eye.setters[5])(event.target.value)} /></td>
          </tr>)}</tbody>
        </table></div>
        <p className="exam-pd">Tổng PD: <strong>{odPd != null && osPd != null ? `${pd} mm` : '—'}</strong></p>
        <div className="exam-notes"><label htmlFor="clinical-notes">Ghi chú chuyên môn</label><Input.TextArea id="clinical-notes" disabled={saving} value={clinicalNotes} onChange={event => edit(setClinicalNotes)(event.target.value)} rows={3} maxLength={500} placeholder="Nhập ghi chú nếu cần" /></div>
      </section>

      <div className="exam-footer">
        <span className="workspace-muted">{dirty ? 'Có thay đổi chưa lưu' : savedPrescription ? `Đã lưu toa #${savedPrescription.id || 'mới'}` : 'Chưa lưu kết quả'}</span>
        <div className="workspace-actions"><Button disabled={!patient.customerId || saving} onClick={() => setShowPrintModal(true)}>Xem bản in</Button><Button type="primary" loading={saving} disabled={!patient.customerId || (!!savedPrescription && !dirty)} onClick={async () => { await handleSignAndPush(); }}>Lưu & xác nhận</Button></div>
      </div>

      {patient.customerId && odSph != null && osSph != null && <details className="workspace-panel exam-history workspace-extra" open={insightsOpen} onToggle={event => setInsightsOpen(event.currentTarget.open)}>
        <summary>Gợi ý tròng & so sánh độ cận</summary>
        {insightsOpen && <OptometryInsights customerId={patient.customerId} odSph={odSph} osSph={osSph}
          odCyl={odCyl} osCyl={osCyl} savedId={savedPrescription?.id}
          selectedLens={selectedLens} onSelectLens={lens => { if (!saving) { setSelectedLens(lens); setDirty(true); } }} />}
      </details>}
      {selectedLens && <p className="workspace-muted" style={{ marginTop: 12 }}>Tròng chỉ định: <strong>{selectedLens.name}</strong> · {selectedLens.sku}</p>}
      <details className="workspace-panel exam-history workspace-extra" open={historyOpen} onToggle={event => setHistoryOpen(event.currentTarget.open)}>
        <summary>Lịch sử đo</summary>
        {!patient.customerId ? <p>Chọn khách hàng để xem lịch sử.</p> : historyLoading ? <Spin size="small" /> : historyError ? <Alert type="error" message={historyError} /> : !history.length ? <p>Chưa có kết quả đo trước đây.</p> : <Table rowKey="id" size="small" pagination={{ pageSize: 5, hideOnSinglePage: true }} dataSource={history} scroll={{ x: 560 }} columns={[
          { title: 'Ngày đo', dataIndex: 'createdAt', render: value => value ? new Date(value).toLocaleDateString('vi-VN') : '—' },
          { title: 'Người đo', dataIndex: 'optometristName', render: display },
          { title: 'OD · SPH / CYL / AXIS', key: 'od', render: (_, item) => `${display(item.odSph)} / ${display(item.odCyl)} / ${display(item.odAxis)}` },
          { title: 'OS · SPH / CYL / AXIS', key: 'os', render: (_, item) => `${display(item.osSph)} / ${display(item.osCyl)} / ${display(item.osAxis)}` },
          { title: 'PD', dataIndex: 'pd' },
        ]} />}
      </details>

      <Modal title="Chọn khách hàng" open={isPatientModalOpen} onCancel={() => setIsPatientModalOpen(false)} footer={null}>
        <Input.Search allowClear aria-label="Tìm khách hàng" placeholder="Tên hoặc số điện thoại" value={patientSearchQuery} onChange={event => setPatientSearchQuery(event.target.value)} />
        <div style={{ maxHeight: 360, overflowY: 'auto', marginTop: 16 }}>
          {patientsLoading ? <Spin size="small" /> : patientsError ? <Alert type="error" message={patientsError} /> : !filteredPatients.length ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không tìm thấy khách hàng" /> : filteredPatients.map(p => <button key={p.id} className="exam-patient-option" onClick={() => {
            setPatient({ customerId: p.id, customerName: p.fullName, customerPhone: p.phoneNumber || '', appointmentId: null, ticketCode: '', notes: '' });
            setIsPatientModalOpen(false);
          }}><strong>{p.fullName}</strong><span className="workspace-muted">{p.phoneNumber || 'Chưa có số điện thoại'}</span></button>)}
        </div>
      </Modal>

      <Modal title="Bản in toa kính" open={showPrintModal} onCancel={() => setShowPrintModal(false)} width={760} footer={<><Button onClick={() => setShowPrintModal(false)}>Đóng</Button><Button type="primary" onClick={handlePrint}>In toa kính</Button></>}>
        <div className="exam-print" id="printable-prescription">
          <h2>TOA KÍNH</h2>
          <p>{!savedPrescription || dirty ? 'Bản nháp · Chưa xác nhận' : `Mã toa: #${savedPrescription.id || '—'}`}</p>
          <p>Khách hàng: <strong>{patient.customerName}</strong> · {patient.customerPhone}</p>
          <p>Ngày đo: {measuredAt.toLocaleDateString('vi-VN')}</p>
          <table><thead><tr>{['Mắt', 'SPH', 'CYL', 'AXIS', 'ADD', 'PD (mm)', 'Thị lực'].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{eyeRows.map(eye => <tr key={eye.name}><td>{eye.name}</td>{['sph', 'cyl', 'axis', 'add', 'pd', 'va'].map(field => <td key={field}>{display(eye[field])}</td>)}</tr>)}</tbody></table>
          <p>Tổng PD: {odPd != null && osPd != null ? `${pd} mm` : '—'}</p>
          {clinicalNotes && <p>Ghi chú: {clinicalNotes}</p>}
          {selectedLens && <p>Tròng kính chỉ định: {selectedLens.name} — {selectedLens.sku}</p>}
          <p>Người thực hiện: {examiner}</p>
        </div>
      </Modal>
    </div>
  );
}
