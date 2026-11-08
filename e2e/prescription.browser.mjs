import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium, baseUrl, fixture, rx, enterMeasurements } from './eyecare-fixtures.mjs';

test('browser: create real-shaped record, reject stale update, reload and inspect before/after revisions', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let current = null;
  let patches = 0;
  const revisions = [];
  try {
    await fixture(page, async (path, request) => {
      if (path.startsWith('/api/prescriptions/customer/')) return { data: current ? [current] : [] };
      if (path === '/api/prescriptions' && request.method() === 'POST') {
        current = { ...rx, ...request.postDataJSON() };
        revisions.push({ ...current, prescriptionId: current.id, actorId: 9, actorName: 'Chuyên viên kiểm thử', reason: 'Initial prescription', recordedAt: current.createdAt });
        return { data: current };
      }
      if (path === '/api/prescriptions/7/revisions') return { data: revisions };
      if (path === '/api/prescriptions/7' && request.method() === 'GET') return { data: current };
      if (path === '/api/prescriptions/7' && request.method() === 'PATCH') {
        patches++;
        const body = request.postDataJSON();
        if (patches === 1) {
          current = { ...current, version: 1, pd: 65 };
          revisions.push({ ...current, prescriptionId: 7, actorId: 10, actorName: 'Người sửa đồng thời', reason: 'Đối chiếu PD', recordedAt: '2026-11-09T10:00:00' });
          return { status: 409, message: 'Toa đã có phiên bản mới' };
        }
        assert.equal(body.expectedVersion, 1);
        assert.equal(body.reason, 'Đo kiểm lại SPH');
        current = { ...current, ...body, version: 2 };
        revisions.push({ ...current, prescriptionId: 7, actorId: 9, actorName: 'Chuyên viên kiểm thử', reason: body.reason, recordedAt: '2026-11-09T11:00:00' });
        return { data: current };
      }
      return { data: [] };
    });
    await page.goto(`${baseUrl}/optometry`);
    await page.getByRole('button', { name: 'Chọn khách hàng', exact: true }).click();
    await page.getByRole('button', { name: /Khách kiểm thử/ }).click();
    await page.getByRole('button', { name: 'Lưu & xác nhận', exact: true }).click();
    await page.getByText('OD SPH: thiếu dữ liệu', { exact: false }).waitFor();
    assert.equal(current, null);
    await enterMeasurements(page);
    await page.getByRole('button', { name: 'Lưu & xác nhận', exact: true }).click();
    await page.getByRole('dialog').getByText('Mã toa #7 · v0', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Đóng', exact: true }).click();
    await page.getByRole('spinbutton', { name: 'OD SPH', exact: true }).fill('-0.5');
    await page.getByLabel('Lý do cập nhật (bắt buộc)').fill('Đo kiểm lại SPH');
    await page.getByRole('button', { name: 'Lưu phiên bản mới', exact: true }).click();
    await page.getByRole('button', { name: 'Tải bản mới nhất', exact: true }).waitFor();
    assert.equal(patches, 1);
    await page.getByRole('button', { name: 'Tải bản mới nhất', exact: true }).click();
    await page.getByRole('button', { name: 'Tải toa', exact: true }).click();
    await page.getByText('Toa #7 · v1', { exact: false }).first().waitFor();
    await page.getByRole('spinbutton', { name: 'OD SPH', exact: true }).fill('-0.5');
    await page.getByLabel('Lý do cập nhật (bắt buộc)').fill('Đo kiểm lại SPH');
    await page.getByRole('button', { name: 'Lưu phiên bản mới', exact: true }).click();
    await page.getByRole('dialog').getByText('Mã toa #7 · v2', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Đóng', exact: true }).click();
    await page.getByText('Lịch sử đo và phiên bản', { exact: true }).click();
    await page.getByRole('button', { name: 'Phiên bản', exact: true }).click();
    await page.getByRole('dialog').getByText('Người sửa đồng thời (#10)', { exact: true }).waitFor();
    await page.getByRole('dialog').getByRole('button', { name: 'Expand row' }).first().click();
    await page.getByText('Thay đổi từ v1 → v2', { exact: true }).waitFor();
    assert.equal(current.odSph, -0.5);
    assert.equal(revisions[0].odSph, 0);
    assert.equal(revisions[0].pd, 64);
  } finally { await browser.close(); }
});

test('browser: staff without clinical permission cannot access prescription editor', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await fixture(page, async () => ({ data: [] }), ['ROLE_SALES_STAFF']);
    await page.goto(`${baseUrl}/optometry`);
    await page.getByText('403 - Quyền Truy Cập Bị Từ Chối (RBAC Denied)', { exact: true }).waitFor();
    assert.equal(await page.getByRole('spinbutton').count(), 0);
  } finally { await browser.close(); }
});
