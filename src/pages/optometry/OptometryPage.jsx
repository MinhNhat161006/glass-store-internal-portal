import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { prescriptionApi } from '../../api/prescriptionApi.js';
import { appointmentApi } from '../../api/appointmentApi';
import { customerApi } from '../../api/customerApi';
import { Alert, Button, Empty, Input, InputNumber, message, Modal, Spin, Table } from 'antd';
import { useAuth } from '../../context/AuthContext';
import OptometryInsights from './OptometryInsights';
import PrescriptionVersions from './PrescriptionVersions';
import { measurementFields, measurementLabel, emptyMeasurements, displayMeasurement as display } from './prescriptionUtils.js';
import '../workspace.css';

const patientFrom = item => ({ customerId: item?.customerId || null, customerName: item?.customerName || '', customerPhone: item?.customerPhone || '', appointmentId: item?.appointmentId || item?.id || null, ticketCode: item?.ticketCode || '' });
export default function OptometryPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const incomingPatient = location.state?.patient;
  const [patient, setPatient] = useState(() => patientFrom(incomingPatient));
  const [measurements, setMeasurements] = useState(emptyMeasurements);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [selectedLens, setSelectedLens] = useState(null);
  const [savedPrescription, setSavedPrescription] = useState(null);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [reason, setReason] = useState('');
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const submitLock = useRef(false);
  const [error, setError] = useState('');
  const [conflict, setConflict] = useState(false);
  const [completionPending, setCompletionPending] = useState(null);
  const [completing, setCompleting] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const [versionsId, setVersionsId] = useState(null);
  const [patientModal, setPatientModal] = useState(false);
  const [patientSearch, setPatientSearch] = useState('');
  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [patientsError, setPatientsError] = useState('');

  useEffect(() => {
    let active = true;
    customerApi.getCustomerList().then(rows => { if (active) setPatients(Array.isArray(rows) ? rows : rows?.data || []); })
      .catch(err => { if (active) setPatientsError(err.message || 'Không tải được khách hàng.'); })
      .finally(() => { if (active) setPatientsLoading(false); });
    return () => { active = false; };
  }, []);
  useEffect(() => { if (incomingPatient) setPatient(patientFrom(incomingPatient)); }, [incomingPatient]);
  const resetDraft = () => {
    setMeasurements(emptyMeasurements()); setClinicalNotes(''); setSelectedLens(null); setReason('');
    setEditingPrescription(null); setSavedPrescription(null); setDirty(false); setConflict(false); setError('');
    setCompletionPending(null); setShowPrintModal(false);
  };
  useEffect(() => { resetDraft(); setHistory([]); setHistoryOpen(false); setInsightsOpen(false); }, [patient.customerId]);
  useEffect(() => {
    if (!historyOpen || !patient.customerId) return;
    let active = true;
    setHistoryLoading(true); setHistoryError('');
    prescriptionApi.getByCustomerId(patient.customerId).then(rows => { if (active) setHistory(rows); })
      .catch(err => { if (active) setHistoryError(err.message); })
      .finally(() => { if (active) setHistoryLoading(false); });
    return () => { active = false; };
  }, [historyOpen, patient.customerId, historyRefresh]);

  const loadPrescription = async id => {
    setSaving(true); setError('');
    try {
      const row = await prescriptionApi.getById(id);
      setMeasurements(Object.fromEntries(measurementFields.map(field => [field, row[field] ?? null])));
      setClinicalNotes(row.notes || '');
      setSelectedLens(row.lensSku ? { sku: row.lensSku, name: row.lensName || row.lensSku } : null);
      setEditingPrescription(row); setSavedPrescription(row); setReason(''); setDirty(false); setConflict(false);
    } catch (err) { setError(err.message); } finally { setSaving(false); }
  };
  const choosePrescription = id => {
    if (dirty) Modal.confirm({ title: 'Tải toa đã lưu?', content: 'Các thay đổi chưa lưu trên biểu mẫu sẽ được bỏ.', okText: 'Tải toa', cancelText: 'Quay lại', onOk: () => loadPrescription(id) });
    else loadPrescription(id);
  };
  const finishAppointment = async prescription => {
    if (!patient.appointmentId) return true;
    setCompleting(true);
    try {
      const response = await appointmentApi.getAppointmentById(patient.appointmentId);
      const appointment = response?.data;
      if (!appointment?.id || appointment.version == null) throw new Error('Chưa tải được phiên bản lịch hẹn.');
      if (appointment.status === 'COMPLETED' && appointment.prescriptionId !== prescription.id) {
        throw new Error('Lịch hẹn đã hoàn tất với toa khác. Vui lòng đối chiếu hồ sơ trước khi tiếp tục.');
      }
      if (appointment.status !== 'COMPLETED') {
        const completed = await appointmentApi.updateAppointmentStatus(patient.appointmentId, {
          status: 'COMPLETED', expectedVersion: appointment.version, prescriptionId: prescription.id,
          examStep: 'Hoàn tất và xác nhận toa kính',
        });
        if (completed?.data?.status !== 'COMPLETED') throw new Error('Chưa nhận được xác nhận hoàn tất lịch hẹn.');
      }
      setCompletionPending(null);
      message.success('Đã hoàn tất lịch hẹn.');
      return true;
    } catch (err) {
      setCompletionPending({ prescription, error: err.message });
      return false;
    } finally { setCompleting(false); }
  };
  const save = async () => {
    if (submitLock.current || saving || completing || !patient.customerId) return;
    submitLock.current = true; setSaving(true); setError(''); setConflict(false);
    try {
      const payload = { customerId: patient.customerId, ...measurements, notes: clinicalNotes, lensSku: selectedLens?.sku || null, lensName: selectedLens?.name || null };
      const saved = editingPrescription
        ? await prescriptionApi.updatePrescription(editingPrescription.id, { ...payload, expectedVersion: editingPrescription.version, reason })
        : await prescriptionApi.createPrescription(payload);
      setSavedPrescription(saved); setEditingPrescription(saved); setDirty(false); setReason(''); setHistoryRefresh(value => value + 1);
      message.success(`Đã lưu toa #${saved.id}, phiên bản ${saved.version}.`);
      const completed = editingPrescription ? true : await finishAppointment(saved);
      if (completed) setShowPrintModal(true);
    } catch (err) {
      setError(err.message || 'Không lưu được toa kính.');
      setConflict(err.status === 409);
    } finally { submitLock.current = false; setSaving(false); }
  };
  const editMeasurement = (field, value) => { setMeasurements(previous => ({ ...previous, [field]: value })); setDirty(true); };
  const filteredPatients = patients.filter(row => !patientSearch.trim() || [row.fullName, row.phoneNumber].some(value => String(value || '').toLocaleLowerCase('vi-VN').includes(patientSearch.trim().toLocaleLowerCase('vi-VN'))));
  const examiner = savedPrescription?.optometristName || user?.staffName || user?.fullName || '—';
  const measuredAt = savedPrescription?.createdAt;
  const busy = saving || completing;

  return <div className="simple-workspace">
    <header className="workspace-header"><div><h1>Đo mắt và hồ sơ toa kính</h1><p>{editingPrescription ? `Toa #${editingPrescription.id} · v${editingPrescription.version}` : 'Toa mới'} · {examiner}</p></div><Button disabled={busy} onClick={() => navigate('/optometry-appointments')}>Hàng đợi</Button></header>
    <section className="workspace-panel exam-patient"><div><div className="workspace-name">{patient.customerName || 'Chưa chọn khách hàng'}</div><div className="workspace-muted">{patient.customerPhone || 'Chọn khách hàng trước khi lưu'}{patient.ticketCode ? ` · ${patient.ticketCode}` : ''}</div></div><Button disabled={busy || !!completionPending} onClick={() => {
      if (dirty) Modal.confirm({ title: 'Đổi khách hàng?', content: 'Các thay đổi chưa lưu sẽ được bỏ khi chọn khách hàng khác.', onOk: () => setPatientModal(true) });
      else setPatientModal(true);
    }}>{patient.customerId ? 'Đổi khách hàng' : 'Chọn khách hàng'}</Button></section>
    {error && <Alert style={{ marginBottom: 16 }} type="error" showIcon message={error} description={conflict ? 'Toa đã có phiên bản mới. Tải lại toa, đối chiếu thay đổi rồi nhập lại lý do cập nhật.' : undefined} action={conflict && editingPrescription ? <Button onClick={() => choosePrescription(editingPrescription.id)}>Tải bản mới nhất</Button> : undefined} />}
    {completionPending && <Alert style={{ marginBottom: 16 }} type="warning" showIcon message={`Toa #${completionPending.prescription.id} đã lưu; lịch hẹn chưa hoàn tất.`} description={completionPending.error} action={<Button loading={completing} disabled={saving} onClick={() => finishAppointment(completionPending.prescription)}>Thử hoàn tất lịch hẹn</Button>} />}
    <section className="workspace-panel exam-panel"><h2>Thông số đo</h2><div className="exam-table-wrap"><table className="exam-table"><thead><tr><th>Mắt</th>{['SPH', 'CYL', 'AXIS (°)', 'ADD'].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{['od', 'os'].map(eye => <tr key={eye}><td>{eye === 'od' ? 'Mắt phải (OD)' : 'Mắt trái (OS)'}</td>{['Sph', 'Cyl', 'Axis', 'Add'].map(suffix => {
      const field = `${eye}${suffix}`;
      return <td key={field}><InputNumber disabled={busy} aria-label={measurementLabel(field)} value={measurements[field]} onChange={value => editMeasurement(field, value)} step={suffix === 'Axis' ? 1 : 0.25} /></td>;
    })}</tr>)}</tbody></table></div>
      <div className="exam-pd"><label htmlFor="total-pd">Tổng PD (mm): </label><InputNumber id="total-pd" aria-label="Tổng PD (mm)" disabled={busy} value={measurements.pd} onChange={value => editMeasurement('pd', value)} step={0.1} /></div>
      <div className="exam-notes"><label htmlFor="clinical-notes">Ghi chú chuyên môn</label><Input.TextArea id="clinical-notes" disabled={busy} value={clinicalNotes} onChange={event => { setClinicalNotes(event.target.value); setDirty(true); }} rows={3} maxLength={500} /></div>
      {editingPrescription && <div className="exam-notes"><label htmlFor="revision-reason">Lý do cập nhật (bắt buộc)</label><Input.TextArea id="revision-reason" value={reason} onChange={event => setReason(event.target.value)} disabled={busy} maxLength={500} rows={2} /><p className="workspace-muted">Mỗi lần lưu tạo phiên bản mới. Đơn hàng và lệnh Lab đã chốt giữ nguyên số đo của phiên bản đã dùng.</p></div>}
    </section>
    <div className="exam-footer"><span className="workspace-muted">{dirty ? 'Có thay đổi chưa lưu' : savedPrescription ? `Đã lưu toa #${savedPrescription.id} · v${savedPrescription.version}` : 'Chưa lưu kết quả'}</span><div className="workspace-actions">
      {editingPrescription && <Button disabled={busy || !!completionPending} onClick={() => dirty ? Modal.confirm({ title: 'Tạo toa mới?', content: 'Các thay đổi chưa lưu sẽ được bỏ.', onOk: resetDraft }) : resetDraft()}>Toa mới</Button>}
      <Button disabled={!patient.customerId || busy} onClick={() => setShowPrintModal(true)}>Xem bản in</Button><Button type="primary" loading={saving} disabled={!patient.customerId || completing || !!completionPending || (editingPrescription && (!dirty || !reason.trim()))} onClick={save}>{editingPrescription ? 'Lưu phiên bản mới' : 'Lưu & xác nhận'}</Button>
    </div></div>
    {patient.customerId && measurements.odSph != null && measurements.osSph != null && <details className="workspace-panel exam-history workspace-extra" open={insightsOpen} onToggle={event => setInsightsOpen(event.currentTarget.open)}><summary>Gợi ý tròng & so sánh độ cận</summary>{insightsOpen && <OptometryInsights customerId={patient.customerId} odSph={measurements.odSph} osSph={measurements.osSph} odCyl={measurements.odCyl} osCyl={measurements.osCyl} savedId={savedPrescription?.id} selectedLens={selectedLens} onSelectLens={lens => { if (!busy) { setSelectedLens(lens); setDirty(true); } }} />}</details>}
    {selectedLens && <p className="workspace-muted">Tròng chỉ định: <strong>{selectedLens.name}</strong> · {selectedLens.sku}</p>}
    <details className="workspace-panel exam-history workspace-extra" open={historyOpen} onToggle={event => setHistoryOpen(event.currentTarget.open)}><summary>Lịch sử đo và phiên bản</summary>{!patient.customerId ? <p>Chọn khách hàng để xem lịch sử.</p> : historyLoading ? <Spin /> : historyError ? <Alert type="error" message={historyError} action={<Button onClick={() => setHistoryRefresh(value => value + 1)}>Thử lại</Button>} /> : <Table rowKey="id" size="small" dataSource={history} pagination={{ pageSize: 5 }} scroll={{ x: 800 }} columns={[
      { title: 'Toa', key: 'id', render: (_, row) => `#${row.id} · v${row.version}` },
      { title: 'Ngày đo', dataIndex: 'createdAt', render: value => value ? new Date(value).toLocaleString('vi-VN') : '—' },
      { title: 'Người đo', dataIndex: 'optometristName', render: display },
      { title: 'OD · SPH / CYL / AXIS / ADD', key: 'od', render: (_, row) => ['odSph', 'odCyl', 'odAxis', 'odAdd'].map(field => display(row[field])).join(' / ') },
      { title: 'OS · SPH / CYL / AXIS / ADD', key: 'os', render: (_, row) => ['osSph', 'osCyl', 'osAxis', 'osAdd'].map(field => display(row[field])).join(' / ') },
      { title: 'PD', dataIndex: 'pd', render: display },
      { title: 'Thao tác', key: 'actions', render: (_, row) => <div className="workspace-actions"><Button size="small" onClick={() => setVersionsId(row.id)}>Phiên bản</Button><Button size="small" disabled={busy || !!completionPending} onClick={() => choosePrescription(row.id)}>Cập nhật</Button></div> },
    ]} locale={{ emptyText: 'Chưa có toa kính' }} />}</details>
    {versionsId != null && <PrescriptionVersions prescriptionId={versionsId} onClose={() => setVersionsId(null)} />}
    <Modal title="Chọn khách hàng" open={patientModal} onCancel={() => setPatientModal(false)} footer={null}><Input.Search allowClear aria-label="Tìm khách hàng" placeholder="Tên hoặc số điện thoại" value={patientSearch} onChange={event => setPatientSearch(event.target.value)} /><div style={{ maxHeight: 360, overflowY: 'auto', marginTop: 16 }}>{patientsLoading ? <Spin /> : patientsError ? <Alert type="error" message={patientsError} /> : !filteredPatients.length ? <Empty description="Không tìm thấy khách hàng" /> : filteredPatients.map(row => <button key={row.id} className="exam-patient-option" onClick={() => { setPatient({ customerId: row.id, customerName: row.fullName, customerPhone: row.phoneNumber || '', appointmentId: null, ticketCode: '' }); setPatientModal(false); }}><strong>{row.fullName}</strong><span>{row.phoneNumber || '—'}</span></button>)}</div></Modal>
    <Modal title="Bản in toa kính" open={showPrintModal} onCancel={() => setShowPrintModal(false)} width={760} footer={<><Button onClick={() => setShowPrintModal(false)}>Đóng</Button><Button type="primary" onClick={() => window.print()}>In toa kính</Button></>}><div className="exam-print" id="printable-prescription"><h2>TOA KÍNH</h2><p>{!savedPrescription || dirty ? 'Bản nháp · Chưa xác nhận' : `Mã toa #${savedPrescription.id} · v${savedPrescription.version}`}</p><p>Khách hàng: <strong>{patient.customerName}</strong> · {patient.customerPhone}</p><p>Ngày đo: {measuredAt ? new Date(measuredAt).toLocaleString('vi-VN') : 'Chưa lưu'}</p><table><thead><tr>{['Mắt', 'SPH', 'CYL', 'AXIS', 'ADD'].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{['od', 'os'].map(eye => <tr key={eye}><td>{eye.toUpperCase()}</td>{['Sph', 'Cyl', 'Axis', 'Add'].map(suffix => <td key={suffix}>{display(measurements[`${eye}${suffix}`])}</td>)}</tr>)}</tbody></table><p>Tổng PD: {display(measurements.pd)} mm</p>{clinicalNotes && <p>Ghi chú: {clinicalNotes}</p>}{selectedLens && <p>Tròng kính chỉ định: {selectedLens.name} · {selectedLens.sku}</p>}<p>Người đo: {examiner}</p></div></Modal>
  </div>;
}
