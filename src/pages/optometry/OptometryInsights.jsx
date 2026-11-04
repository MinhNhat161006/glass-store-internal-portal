import React, { useEffect, useState } from 'react';
import { Alert, Button, Empty, Spin, Table, Tabs } from 'antd';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { prescriptionApi } from '../../api/prescriptionApi';
import { apiFetch } from '../../api/client';
import { progressionWarnings } from './optometryUtils';

const diop = value => value == null ? '—' : Number(value).toFixed(2);

export default function OptometryInsights({ customerId, odSph, osSph, odCyl, osCyl, savedId, selectedLens, onSelectLens }) {
  const [historyState, setHistoryState] = useState({ customerId: null, rows: [], loading: true, error: '' });
  const [retry, setRetry] = useState(0);
  const [recommendation, setRecommendation] = useState(null);
  const [lensError, setLensError] = useState('');
  useEffect(() => {
    let active = true;
    setHistoryState({ customerId, rows: [], loading: true, error: '' });
    prescriptionApi.getByCustomerId(customerId).then(rows => {
      if (active) setHistoryState({ customerId, rows, loading: false, error: '' });
    }).catch(() => {
      if (active) setHistoryState({ customerId, rows: [], loading: false, error: 'Không tải được lịch sử toa khám.' });
    });
    return () => { active = false; };
  }, [customerId, savedId, retry]);

  useEffect(() => {
    let active = true;
    setRecommendation(null);
    setLensError('');
    const timer = setTimeout(() => {
      apiFetch(`/api/products/lens-recommendations?odSph=${encodeURIComponent(odSph)}&osSph=${encodeURIComponent(osSph)}`)
        .then(res => { if (active) setRecommendation(res.data); })
        .catch(() => { if (active) setLensError('Không tải được gợi ý tròng kính.'); });
    }, 250);
    return () => { active = false; clearTimeout(timer); };
  }, [odSph, osSph, retry]);

  const history = historyState.customerId === customerId ? historyState.rows : [];
  const current = { id: 'current', createdAt: new Date().toISOString(), odSph, osSph, odCyl, osCyl };
  const warnings = progressionWarnings(current, history);
  const chart = [...history].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map(p => ({ ...p, date: new Date(p.createdAt).toLocaleDateString('vi-VN') }));
  const columns = [
    { title: 'Ngày khám', key: 'date', render: (_, row) => row.id === 'current' ? 'Hiện tại (đang nhập)' : new Date(row.createdAt).toLocaleString('vi-VN') },
    ...['odSph', 'odCyl', 'osSph', 'osCyl'].map(key => ({ title: `${key.startsWith('od') ? 'OD' : 'OS'} ${key.endsWith('Sph') ? 'SPH' : 'CYL'} (D)`, dataIndex: key, render: diop })),
    { title: 'Cảnh báo', key: 'warning', render: (_, row) => <span className="text-red-600 font-semibold">{progressionWarnings(row, history).join('; ') || '—'}</span> },
  ];
  return <section className="bg-white rounded-xl p-4 border border-slate-200 space-y-3">
    {warnings.length > 0 && <Alert type="error" showIcon message={warnings.join('; ')} />}
    <Tabs items={[
      { key: 'recommendation', label: 'Gợi ý tròng kính', children: <div className="space-y-3">
        {lensError ? <Alert type="error" message={lensError} action={<Button onClick={() => setRetry(v => v + 1)}>Thử lại</Button>} /> : !recommendation ? <Spin /> : <>
          <Alert type={recommendation.highPower ? 'warning' : 'info'} message={recommendation.message} showIcon />
          {recommendation.variants.length === 0 ? <Empty description="Chưa có mã tròng phù hợp trong danh mục" /> : recommendation.variants.map(lens =>
            <div key={lens.id} className="flex items-center justify-between gap-3 border rounded-lg p-3">
              <span>{lens.name} <strong>({lens.sku})</strong></span>
              <Button type="primary" disabled={selectedLens?.sku === lens.sku} onClick={() => onSelectLens(lens)}>{selectedLens?.sku === lens.sku ? 'Đã chọn' : 'Thêm vào chỉ định'}</Button>
            </div>)}
        </>}
        {selectedLens && <div className="p-3 bg-blue-50 rounded-lg">Chỉ định: <strong>{selectedLens.name} — {selectedLens.sku}</strong> <Button onClick={() => onSelectLens(null)}>Bỏ chọn</Button></div>}
      </div> },
      { key: 'history', label: 'Lịch sử toa khám', children: historyState.error ? <Alert type="error" message={historyState.error} action={<Button onClick={() => setRetry(v => v + 1)}>Thử lại</Button>} /> : <>
        <p className="mb-3">So sánh độ cận/loạn theo từng mắt. Cảnh báo khi độ cận tăng &gt; 0.75 D so với một toa trong 6 tháng trước đó.</p>
        <Table loading={historyState.loading} rowKey="id" columns={columns} dataSource={[current, ...history]} scroll={{ x: 800 }} pagination={{ pageSize: 6 }} />
        {chart.length > 0 ? <div className="h-64 mt-4"><ResponsiveContainer width="100%" height="100%"><LineChart data={chart}>
          <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis label={{ value: 'SPH (D)', angle: -90, position: 'insideLeft' }} /><Tooltip /><Legend />
          <Line dataKey="odSph" name="Mắt phải (OD)" stroke="#0369a1" connectNulls={false} /><Line dataKey="osSph" name="Mắt trái (OS)" stroke="#9333ea" connectNulls={false} />
        </LineChart></ResponsiveContainer></div> : !historyState.loading && <Empty description="Khách hàng chưa có toa khám cũ" />}
      </> },
    ]} />
  </section>;
}
