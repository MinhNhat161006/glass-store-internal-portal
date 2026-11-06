import test from 'node:test';
import assert from 'node:assert/strict';
import { authApi } from './authApi.js';

const values = new Map();
globalThis.localStorage = {
  getItem: key => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, String(value)),
  removeItem: key => values.delete(key),
};
const response = (status, data) => ({ ok: status < 400, status, json: async () => data });
test.beforeEach(() => values.clear());

for (const status of [401, 403, 503]) {
  test(`login rejects HTTP ${status} and clears any previous preview session`, async () => {
    values.set('optivision_jwt_token', 'mock-offline-jwt-token-2026');
    values.set('optivision_auth_user', '{"role":"admin"}');
    globalThis.fetch = async () => response(status, { message: 'Login rejected' });
    await assert.rejects(authApi.login({ username: 'admin', password: 'wrong-password' }));
    assert.equal(values.size, 0);
  });
}
test('network failure never creates a session', async () => {
  globalThis.fetch = async () => { throw new TypeError('Failed to fetch'); };
  await assert.rejects(authApi.login({ username: 'admin', password: 'anything' }));
  assert.equal(values.size, 0);
});
test('successful backend login stores its token and preserves the exact password', async () => {
  globalThis.fetch = async (url, request) => {
    assert.equal(JSON.parse(request.body).password, ' password ');
    assert.equal(request.headers.Authorization, undefined);
    return response(200, { data: { id: 1, token: 'header.payload.signature', roles: ['ROLE_ADMIN'] } });
  };
  const user = await authApi.login({ username: 'admin', password: ' password ' });
  assert.equal(user.id, 1);
  assert.equal(values.get('optivision_jwt_token'), user.token);
});
test('success-shaped response without a real token cannot authenticate', async () => {
  globalThis.fetch = async () => response(200, { data: { token: 'mock-offline-jwt-token-2026' } });
  await assert.rejects(authApi.login({ username: 'admin', password: 'anything' }));
  assert.equal(values.size, 0);
});
test('cached preview profile cannot restore a session', async () => {
  values.set('optivision_auth_user', '{"staffId":"ADM-001","role":"admin"}');
  values.set('optivision_jwt_token', 'mock-offline-jwt-token-2026');
  globalThis.fetch = async () => { assert.fail('Preview token must be discarded'); };
  assert.equal(await authApi.getMe(), null);
  assert.equal(values.size, 0);
});
test('cached JWT is checked by the server before restoring identity', async () => {
  values.set('optivision_jwt_token', 'header.payload.signature');
  globalThis.fetch = async (url, request) => {
    assert.equal(url, '/api/auth/me');
    assert.equal(request.headers.Authorization, 'Bearer header.payload.signature');
    return response(200, { data: { id: 1, roles: ['ROLE_ADMIN'] } });
  };
  assert.equal((await authApi.getMe()).id, 1);
});
