import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium, baseUrl, fixture, rx, enterMeasurements } from './eyecare-fixtures.mjs';

test('browser: appointment start and partial completion retry never creates another prescription', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let appointment = { id: 12, ticketCode: 'EP-12', customerId: 5, customerName: 'Khách kiểm thử', customerPhone: '0901234567', status: 'WAITING', version: 0, scheduledTime: '2026-11-09T09:00:00+07:00' };
  let saves = 0;
  let completions = 0;
  try {
    await fixture(page, async (path, request) => {
      if (path === '/api/appointments') return { data: [appointment] };
      if (path === '/api/appointments/12') return { data: appointment };
      if (path === '/api/appointments/12/status') {
        const body = request.postDataJSON();
        assert.equal(body.expectedVersion, appointment.version);
        if (body.status === 'COMPLETED') {
          completions++;
          assert.equal(body.prescriptionId, 7);
          if (completions === 1) return { status: 503, message: 'Không thể cập nhật lịch hẹn' };
        }
        appointment = { ...appointment, ...body, optometristId: 9, version: appointment.version + 1 };
        return { data: appointment };
      }
      if (path === '/api/prescriptions' && request.method() === 'POST') { saves++; return { data: { ...rx, ...request.postDataJSON() } }; }
      return { data: [] };
    });
    await page.goto(`${baseUrl}/optometry-appointments`);
    await page.getByRole('button', { name: 'Bắt đầu đo', exact: true }).click();
    await page.getByLabel('Phòng đo', { exact: true }).fill('Phòng A');
    await page.getByRole('dialog').getByRole('button', { name: 'Bắt đầu đo', exact: true }).click();
    await page.getByRole('heading', { name: 'Đo mắt và hồ sơ toa kính' }).waitFor();
    await enterMeasurements(page);
    await page.getByRole('button', { name: 'Lưu & xác nhận', exact: true }).click();
    await page.getByText('Toa #7 đã lưu; lịch hẹn chưa hoàn tất.', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Thử hoàn tất lịch hẹn', exact: true }).click();
    await page.getByText('Đã hoàn tất lịch hẹn.', { exact: true }).waitFor();
    assert.equal(saves, 1);
    assert.equal(completions, 2);
    assert.equal(appointment.status, 'COMPLETED');
  } finally { await browser.close(); }
});

test('browser: completion with another prescription cannot show successful completion', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let appointment = { id: 12, ticketCode: 'EP-12', customerId: 5, customerName: 'Khách kiểm thử', status: 'WAITING', version: 0 };
  let saves = 0;
  try {
    await fixture(page, async (path, request) => {
      if (path === '/api/appointments') return { data: [appointment] };
      if (path === '/api/appointments/12') return { data: { ...appointment, status: 'COMPLETED', prescriptionId: 99 } };
      if (path === '/api/appointments/12/status') {
        assert.equal(request.postDataJSON().status, 'IN_EXAM');
        appointment = { ...appointment, ...request.postDataJSON(), version: 1 };
        return { data: appointment };
      }
      if (path === '/api/prescriptions' && request.method() === 'POST') { saves++; return { data: rx }; }
      return { data: [] };
    });
    await page.goto(`${baseUrl}/optometry-appointments`);
    await page.getByRole('button', { name: 'Bắt đầu đo', exact: true }).click();
    await page.getByLabel('Phòng đo', { exact: true }).fill('Phòng A');
    await page.getByRole('dialog').getByRole('button', { name: 'Bắt đầu đo', exact: true }).click();
    await page.getByRole('heading', { name: 'Đo mắt và hồ sơ toa kính' }).waitFor();
    await enterMeasurements(page);
    await page.getByRole('button', { name: 'Lưu & xác nhận', exact: true }).click();
    await page.getByText('Lịch hẹn đã hoàn tất với toa khác. Vui lòng đối chiếu hồ sơ trước khi tiếp tục.', { exact: true }).waitFor();
    assert.equal(saves, 1);
    assert.equal(await page.getByText('Đã hoàn tất lịch hẹn.', { exact: true }).count(), 0);
  } finally { await browser.close(); }
});
