import test from 'node:test';
import assert from 'node:assert/strict';
import { prescriptionApi } from './prescriptionApi.js';

globalThis.localStorage = { getItem: () => 'clinician-token' };
const rules = { customerId: { required: true, min: 1 }, odSph: { required: true, min: -30, max: 30 }, pd: { required: true, min: 40, max: 90 } };
const response = (status, data) => ({ ok: status < 400, status, json: async () => ({ data }) });
test('controlled update PATCH preserves zero and sends expectedVersion and a real reason', async context => {
  const requests = [];
  context.mock.method(globalThis, 'fetch', async (url, options) => {
    requests.push({ url, options });
    return response(200, url.endsWith('validation-rules') ? rules : { id: 8, version: 3 });
  });
  const saved = await prescriptionApi.updatePrescription(8, { customerId: 5, odSph: 0, pd: 64, expectedVersion: 2, reason: '  Correct measured axis  ' });
  assert.equal(saved.version, 3);
  assert.equal(requests[1].url, '/api/prescriptions/8');
  assert.equal(requests[1].options.method, 'PATCH');
  assert.equal(requests[1].options.headers.Authorization, 'Bearer clinician-token');
  assert.deepEqual(JSON.parse(requests[1].options.body), { customerId: 5, odSph: 0, pd: 64, expectedVersion: 2, reason: 'Correct measured axis' });
});
test('missing measurement, reason and version cannot submit a save request', async context => {
  let mutations = 0;
  context.mock.method(globalThis, 'fetch', async (url, options) => { if (options.method) mutations++; return response(200, rules); });
  await assert.rejects(prescriptionApi.createPrescription({ customerId: 5, odSph: null, pd: 64 }), /thiếu dữ liệu/);
  await assert.rejects(prescriptionApi.updatePrescription(8, { expectedVersion: 2, reason: ' ' }), /lý do/);
  await assert.rejects(prescriptionApi.updatePrescription(8, { reason: 'fix' }), /phiên bản/);
  assert.equal(mutations, 0);
});
test('stale version is surfaced as HTTP 409 for explicit reload and never reported saved', async context => {
  context.mock.method(globalThis, 'fetch', async url => url.endsWith('validation-rules') ? response(200, rules) : { ok: false, status: 409, json: async () => ({ message: 'Toa đã được cập nhật', errorCode: 'PRESCRIPTION_VERSION_CONFLICT' }) });
  await assert.rejects(prescriptionApi.updatePrescription(8, { customerId: 5, odSph: 0, pd: 64, expectedVersion: 2, reason: 'Fix' }), error => error.status === 409 && error.code === 'PRESCRIPTION_VERSION_CONFLICT');
});
test('incomplete success and invalid history response do not fabricate persisted records', async context => {
  context.mock.method(globalThis, 'fetch', async url => response(200, url.endsWith('validation-rules') ? rules : null));
  await assert.rejects(prescriptionApi.createPrescription({ customerId: 5, odSph: 0, pd: 64 }), /Chưa nhận được toa kính/);
  await assert.rejects(prescriptionApi.getRevisions(8), /không hợp lệ/);
});
