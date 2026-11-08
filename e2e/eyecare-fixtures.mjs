export const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
export const baseUrl = process.env.PORTAL_BASE_URL || 'http://127.0.0.1:15174';
export const rx = { id: 7, customerId: 5, customerName: 'Khách kiểm thử', optometristId: 9, optometristName: 'Chuyên viên kiểm thử', odSph: 0, odCyl: 0, odAxis: 0, odAdd: 0, osSph: -1, osCyl: 0, osAxis: 0, osAdd: 0, pd: 64, notes: '', version: 0, createdAt: '2026-11-09T09:00:00' };
export const rules = Object.fromEntries(['customerId', 'odSph', 'odCyl', 'odAxis', 'odAdd', 'osSph', 'osCyl', 'osAxis', 'osAdd', 'pd'].map(field => [field, { required: true }]));
export const customer = { id: 5, fullName: 'Khách kiểm thử', phoneNumber: '0901234567' };
export async function fixture(page, handler, roles = ['ROLE_OPTOMETRIST']) {
  await page.addInitScript(() => localStorage.setItem('optivision_jwt_token', 'header.payload.signature'));
  await page.route('**/api/**', async route => {
    const path = new URL(route.request().url()).pathname;
    if (!path.startsWith('/api/')) return route.continue();
    let result;
    if (path === '/api/auth/me') result = { data: { id: 9, fullName: 'Chuyên viên kiểm thử', roles } };
    else if (path === '/api/users/customers') result = { data: [customer] };
    else if (path === '/api/prescriptions/validation-rules') result = { data: rules };
    else result = await handler(path, route.request());
    await route.fulfill({ status: result?.status || 200, contentType: 'application/json', body: JSON.stringify(result || { data: [] }) });
  });
}
export async function enterMeasurements(page, values = rx) {
  for (const field of ['odSph', 'odCyl', 'odAxis', 'odAdd', 'osSph', 'osCyl', 'osAxis', 'osAdd']) {
    await page.getByRole('spinbutton', { name: `${field.startsWith('od') ? 'OD' : 'OS'} ${field.slice(2).toUpperCase()}`, exact: true }).fill(String(values[field]));
  }
  await page.getByRole('spinbutton', { name: 'Tổng PD (mm)', exact: true }).fill(String(values.pd));
}
