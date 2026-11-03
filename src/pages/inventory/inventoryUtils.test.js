import assert from 'node:assert/strict';
import test from 'node:test';
import { isLowStock } from './inventoryUtils.js';

test('low stock warning is only shown below five units', () => {
  assert.equal(isLowStock(4), true);
  assert.equal(isLowStock(5), false);
  assert.equal(isLowStock(6), false);
});
