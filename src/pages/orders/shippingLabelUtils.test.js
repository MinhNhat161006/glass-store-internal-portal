import { test } from 'node:test';
import assert from 'node:assert/strict';
import { collectionAmount, assertSavedTransition } from './shippingLabelUtils.js';

test('shipping label distinguishes unpaid, paid, explicit COD and unknown collection amounts', () => {
  assert.equal(collectionAmount({ status: 'PENDING_PAYMENT', finalAmount: 500000 }), null);
  assert.equal(collectionAmount({ status: 'SHIPPING', finalAmount: 500000 }), null);
  assert.equal(collectionAmount({ status: 'PAID', finalAmount: 500000 }), 0);
  assert.equal(collectionAmount({ status: 'SHIPPING', codAmount: 250000 }), 250000);
  assert.equal(collectionAmount({ status: 'SHIPPING', codAmount: '' }), null);
  assert.equal(collectionAmount({ status: 'SHIPPING', codAmount: -1 }), null);
});

test('OMS only accepts confirmation for the requested order and canonical status', () => {
  assert.deepEqual(assertSavedTransition({ id: 1, status: 'PREPARING' }, 1, 'PROCESSING'), { id: 1, status: 'PREPARING' });
  assert.throws(() => assertSavedTransition({ id: 2, status: 'PREPARING' }, 1, 'PREPARING'));
  assert.throws(() => assertSavedTransition({ id: 1, status: 'PAID' }, 1, 'SHIPPING'));
  assert.throws(() => assertSavedTransition(null, 1, 'SHIPPING'));
});
