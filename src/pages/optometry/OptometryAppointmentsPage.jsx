import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Drawer, Empty, Form, Input, Modal, Select, Table, Tag, message } from 'antd';
import { appointmentApi } from '../../api/appointmentApi';
import { customerApi } from '../../api/customerApi';
import '../workspace.css';

const statuses = {
  WAITING: { label: 'Đang chờ', color: 'orange' },
  IN_EXAM: { label: 'Đang đo', color: 'blue' },
  COMPLETED: { label: 'Đã xong', color: 'green' },
  CANCELLED: { label: 'Đã hủy', color: 'default' },
};
const statusTag = appointment => <Tag color={statuses[appointment.status]?.color}>{statuses[appointment.status]?.label || appointment.statusLabel || appointment.status || 'Chưa cập nhật'}</Tag>;
const date = value => value && !Number.isNaN(new Date(value).getTime())
  ? new Date(value).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) : '—';

export default function OptometryAppointmentsPage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [room, setRoom] = useState('all');
  const [activeId, setActiveId] = useState(null);
  const [starting, setStarting] = useState(null);
  const [examRoom, setExamRoom] = useState('');
  const [updating, setUpdating] = useState(false);
  const [receptionOpen, setReceptionOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [customersError, setCustomersError] = useState('');
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  const activeAppointment = appointments.find(item => item.id === activeId);

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await appointmentApi.getAllAppointments();
      const list = Array.isArray(response) ? response : response?.data;
      if (!Array.isArray(list)) throw new Error('Dữ liệu lịch hẹn không hợp lệ.');
      setAppointments(list);
    } catch (err) {
      setError(err.message || 'Không tải được lịch hẹn.');
    } finally { setLoading(false); }
  };
  useEffect(() => { fetchAppointments(); }, []);

  useEffect(() => {
    if (!receptionOpen) return;
    let cancelled = false;
    setCustomersLoading(true);
    setCustomersError('');
    customerApi.getCustomerList().then(list => {
      if (!cancelled) setCustomers(Array.isArray(list) ? list : []);
    }).catch(() => {
      if (!cancelled) setCustomersError('Không tải được khách hàng. Vui lòng mở lại để thử.');
    }).finally(() => { if (!cancelled) setCustomersLoading(false); });
    return () => { cancelled = true; };
  }, [receptionOpen]);

  const rooms = useMemo(() => {
    const existing = [...new Set(appointments.map(item => item.roomName).filter(Boolean))];
    return existing.length ? existing : ['Phòng Đo Mắt 01', 'Phòng Đo Mắt 02'];
  }, [appointments]);
  const filtered = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi-VN');
    return appointments.filter(item =>
      (status === 'all' || item.status === status) &&
      (room === 'all' || (room === 'unassigned' ? !item.roomName : item.roomName === room)) &&
      (!keyword || [item.ticketCode, item.customerName, item.customerPhone].some(value => String(value || '').toLocaleLowerCase('vi-VN').includes(keyword)))
    );
  }, [appointments, query, status, room]);

  const openExam = appointment => navigate('/optometry', {
    state: { patient: { ...appointment, appointmentId: appointment.id } },
  });
  const chooseExam = appointment => {
    setStarting(appointment);
    setExamRoom(appointment.roomName || rooms[0]);
  };
  const startExam = async () => {
    if (!starting || !examRoom || updating) return;
    setUpdating(true);
    try {
      const response = await appointmentApi.updateAppointmentStatus(starting.id, {
        status: 'IN_EXAM', statusLabel: 'Đang đo', roomName: examRoom,
        examStep: 'Tiếp nhận đo mắt',
      });
      const updated = { ...starting, ...response?.data, status: 'IN_EXAM', roomName: examRoom };
      setAppointments(previous => previous.map(item => item.id === updated.id ? updated : item));
      setStarting(null);
      openExam(updated);
    } catch (err) {
      message.error(err.message || 'Không thể bắt đầu đo. Vui lòng thử lại.');
    } finally { setUpdating(false); }
  };
  const receiveCustomer = async values => {
    const customer = customers.find(item => item.id === values.customerId);
    if (!customer || creating) return;
    setCreating(true);
    try {
      await appointmentApi.createAppointment({
        customerId: customer.id, customerName: customer.fullName,
        customerPhone: customer.phoneNumber || '', ticketType: 'Tại quầy',
        ticketCode: `KSK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        status: 'WAITING', statusLabel: 'Đang chờ', priorityLevel: 2,
        roomName: values.roomName || null, notes: values.notes?.trim() || '',
        scheduledTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      });
      setReceptionOpen(false);
      form.resetFields();
      message.success('Đã thêm khách vào hàng đợi.');
      await fetchAppointments();
    } catch (err) {
      message.error(err.message || 'Không thể tiếp nhận khách hàng.');
    } finally { setCreating(false); }
  };

  const examAction = item => item.status === 'WAITING'
    ? <Button type="primary" loading={updating && starting?.id === item.id} disabled={updating} onClick={() => chooseExam(item)}>Bắt đầu đo</Button>
    : item.status === 'IN_EXAM'
      ? <Button onClick={() => openExam(item)}>Tiếp tục đo</Button>
      : <Button type="text" onClick={() => setActiveId(item.id)}>Chi tiết</Button>;
  const columns = [
    { title: 'Giờ hẹn', dataIndex: 'scheduledTime', width: 110, render: value => value || '—' },
    { title: 'Khách hàng', dataIndex: 'customerName', render: (name, item) => <div><span className="workspace-name">{name || 'Chưa có tên'}</span><div className="workspace-muted">{item.customerPhone || '—'}</div></div> },
    { title: 'Mã vé', dataIndex: 'ticketCode', width: 145, render: (value, item) => <button className="workspace-link" onClick={() => setActiveId(item.id)}>{value || `#${item.id}`}</button> },
    { title: 'Phòng đo', dataIndex: 'roomName', width: 160, render: value => value || <span className="workspace-muted">Chưa phân phòng</span> },
    { title: 'Trạng thái', key: 'status', width: 120, render: (_, item) => statusTag(item) },
    { title: '', key: 'action', width: 140, align: 'right', render: (_, item) => examAction(item) },
  ];

  return (
    <div className="simple-workspace">
      <header className="workspace-header">
        <div><h1>Lịch hẹn đo mắt</h1><p>{appointments.length} lượt hẹn · {appointments.filter(item => item.status === 'WAITING').length} đang chờ</p></div>
        <Button type="primary" onClick={() => setReceptionOpen(true)}>Tiếp nhận khách</Button>
      </header>
      <section className="workspace-panel">
        <div className="workspace-toolbar">
          <Input.Search allowClear className="workspace-search" aria-label="Tìm lịch hẹn" placeholder="Tên, số điện thoại hoặc mã vé" value={query} onChange={event => setQuery(event.target.value)} />
          <select className="workspace-filter" aria-label="Lọc trạng thái" value={status} onChange={event => setStatus(event.target.value)}>
            <option value="all">Tất cả trạng thái</option>{Object.entries(statuses).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}
          </select>
          <select className="workspace-filter" aria-label="Lọc phòng đo" value={room} onChange={event => setRoom(event.target.value)}>
            <option value="all">Tất cả phòng</option><option value="unassigned">Chưa phân phòng</option>{rooms.map(value => <option key={value} value={value}>{value}</option>)}
          </select>
          <Button onClick={fetchAppointments} loading={loading}>Làm mới</Button>
        </div>
        {error ? <Alert type="error" showIcon message={error} action={<Button onClick={fetchAppointments}>Thử lại</Button>} /> : <Table rowKey="id" columns={columns} dataSource={filtered} loading={loading} scroll={{ x: 880 }} pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có lịch hẹn phù hợp" /> }} />}
      </section>

      <Drawer title={activeAppointment ? `Lịch hẹn ${activeAppointment.ticketCode || `#${activeAppointment.id}`}` : 'Chi tiết lịch hẹn'} open={activeId !== null} onClose={() => setActiveId(null)} width={460}>
        {activeAppointment && <div className="simple-workspace workspace-detail">
          <div>{statusTag(activeAppointment)}</div>
          <section><h2>Khách hàng</h2><p className="workspace-name">{activeAppointment.customerName}</p><p>{activeAppointment.customerPhone || 'Chưa có số điện thoại'}</p></section>
          <section><h2>Lịch hẹn</h2><p>Giờ hẹn: {activeAppointment.scheduledTime || '—'}</p><p>Phòng đo: {activeAppointment.roomName || 'Chưa phân phòng'}</p>{activeAppointment.optometristName && <p>Người đo: {activeAppointment.optometristName}</p>}</section>
          {activeAppointment.notes && <section><h2>Ghi chú</h2><p>{activeAppointment.notes}</p></section>}
          <details className="workspace-extra"><summary>Thông tin khác</summary><p>Ngày tiếp nhận: {date(activeAppointment.createdAt)}</p>{activeAppointment.ticketType && <p>Nguồn: {activeAppointment.ticketType}</p>}{activeAppointment.priorityLevel != null && <p>Mức ưu tiên: {activeAppointment.priorityLevel}</p>}</details>
          {['WAITING', 'IN_EXAM'].includes(activeAppointment.status) && examAction(activeAppointment)}
        </div>}
      </Drawer>

      <Modal title="Bắt đầu đo mắt" open={!!starting} onCancel={() => !updating && setStarting(null)} onOk={startExam} confirmLoading={updating} cancelButtonProps={{ disabled: updating }} closable={!updating} maskClosable={!updating} okText="Bắt đầu đo" cancelText="Quay lại">
        <p style={{ marginBottom: 16 }} className="workspace-name">{starting?.customerName}</p>
        <label htmlFor="appointment-exam-room" className="workspace-muted">Phòng đo</label>
        <select id="appointment-exam-room" className="workspace-filter" style={{ width: '100%', marginTop: 6 }} value={examRoom} disabled={updating} onChange={event => setExamRoom(event.target.value)}>{rooms.map(value => <option key={value} value={value}>{value}</option>)}</select>
      </Modal>

      <Modal title="Tiếp nhận khách" open={receptionOpen} onCancel={() => { if (!creating) { setReceptionOpen(false); form.resetFields(); } }} footer={null} closable={!creating} maskClosable={!creating}>
        {customersError && <Alert type="error" message={customersError} style={{ marginBottom: 16 }} />}
        <Form form={form} layout="vertical" onFinish={receiveCustomer} disabled={creating}>
          <Form.Item name="customerId" label="Khách hàng" rules={[{ required: true, message: 'Vui lòng chọn khách hàng.' }]}>
            <Select aria-label="Chọn khách hàng" showSearch optionFilterProp="label" placeholder="Tìm tên hoặc số điện thoại" loading={customersLoading} disabled={customersLoading || !!customersError || creating} options={customers.map(item => ({ value: item.id, label: `${item.fullName}${item.phoneNumber ? ` · ${item.phoneNumber}` : ''}` }))} notFoundContent={customersLoading ? 'Đang tải…' : 'Không tìm thấy khách hàng'} />
          </Form.Item>
          <Form.Item name="roomName" label="Phòng đo"><Select allowClear placeholder="Chưa phân phòng" options={rooms.map(value => ({ value, label: value }))} /></Form.Item>
          <Form.Item name="notes" label="Ghi chú"><Input.TextArea rows={2} maxLength={500} placeholder="Nhập ghi chú nếu cần" /></Form.Item>
          <div className="workspace-actions" style={{ justifyContent: 'flex-end' }}><Button disabled={creating} onClick={() => { setReceptionOpen(false); form.resetFields(); }}>Hủy</Button><Button type="primary" htmlType="submit" loading={creating} disabled={customersLoading || !!customersError}>Thêm vào hàng đợi</Button></div>
        </Form>
      </Modal>
    </div>
  );
}
