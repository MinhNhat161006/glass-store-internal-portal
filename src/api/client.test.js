import test from 'node:test';
import assert from 'node:assert/strict';
import { apiFetch } from './client.js';

test('API errors preserve POS retry codes and prescription conflict details', async context => {
  const originalStorage = globalThis.localStorage;
  globalThis.localStorage = { getItem: () => null };
  context.mock.method(globalThis, 'fetch', async () => ({
    ok: false, status: 409, json: async () => ({
      message: 'Conflict', errorCode: 'IDEMPOTENCY_CONFLICT', data: { version: 2 },
    }),
  }));
  try {
    await assert.rejects(apiFetch('/api/orders'), error => {
      assert.equal(error.status, 409);
      assert.equal(error.code, 'IDEMPOTENCY_CONFLICT');
      assert.equal(error.errorCode, 'IDEMPOTENCY_CONFLICT');
      assert.deepEqual(error.details, { version: 2 });
      return true;
    });
  } finally { globalThis.localStorage = originalStorage; }
});
