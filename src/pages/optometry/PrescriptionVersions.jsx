import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Spin, Table } from 'antd';
import { prescriptionApi } from '../../api/prescriptionApi.js';
import { measurementChanges, measurementFields, measurementLabel, displayMeasurement } from './prescriptionUtils.js';

export default function PrescriptionVersions({ prescriptionId, onClose }) {
  const [state, setState] = useState({ loading: true, rows: [], error: '' });
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setState({ loading: true, rows: [], error: '' });
    prescriptionApi.getRevisions(prescriptionId).then(rows => {
      if (active) setState({ loading: false, rows, error: '' });
    }).catch(error => { if (active) setState({ loading: false, rows: [], error: error.message }); });
    return () => { active = false; };
  }, [prescriptionId, retry]);
  const rows = [...state.rows].sort((a, b) => b.version - a.version);
  return <Modal title={`Lịch sử phiên bản · Toa #${prescriptionId}`} open onCancel={onClose} width={950} footer={<Button onClick={onClose}>Đóng</Button>}>
    {state.loading ? <Spin /> : state.error ? <Alert type="error" message={state.error} action={<Button onClick={() => setRetry(value => value + 1)}>Thử lại</Button>} /> : <Table rowKey="version" dataSource={rows} pagination={false} scroll={{ x: 640 }} columns={[
      { title: 'Phiên bản', dataIndex: 'version', render: value => `v${value}` },
      { title: 'Thời điểm', dataIndex: 'recordedAt', render: value => value ? new Date(value).toLocaleString('vi-VN') : '—' },
      { title: 'Người thực hiện', key: 'actor', render: (_, row) => `${row.actorName || '—'} (#${row.actorId ?? '—'})` },
      { title: 'Lý do', dataIndex: 'reason' },
    ]} expandable={{ expandedRowRender: row => {
      const before = rows.find(item => item.version === row.version - 1);
      const changes = before ? measurementChanges(before, row) : [];
      return <div>
        <Table size="small" rowKey="field" pagination={false} dataSource={measurementFields.map(field => ({ field, value: row[field] }))} columns={[
          { title: 'Số đo đã lưu', dataIndex: 'field', render: measurementLabel }, { title: `v${row.version}`, dataIndex: 'value', render: displayMeasurement },
        ]} />
        <p>Ghi chú: {row.notes || '—'} · Tròng: {row.lensName || row.lensSku || '—'}</p>
        {before && <><p>Thay đổi từ v{before.version} → v{row.version}</p><Table size="small" rowKey="field" pagination={false} dataSource={changes} locale={{ emptyText: 'Không thay đổi số đo, ghi chú hoặc tròng kính' }} columns={[
          { title: 'Trường', dataIndex: 'label' }, { title: 'Trước', dataIndex: 'before', render: displayMeasurement }, { title: 'Sau', dataIndex: 'after', render: displayMeasurement },
        ]} /></>}
      </div>;
    } }} />}
  </Modal>;
}
