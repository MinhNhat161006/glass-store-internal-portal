import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyMeasurements, measurementChanges, validateMeasurements } from './prescriptionUtils.js';

const rules = { odSph: { required: true, min: -30, max: 30, fraction: 2 }, odAxis: { required: true, min: 0, max: 180, integer: true }, pd: { required: true, min: 40, max: 90, fraction: 1 } };
test('empty exam has no invented measurement and explicit zero remains valid', () => {
  assert.ok(Object.values(emptyMeasurements()).every(value => value === null));
  assert.deepEqual(validateMeasurements({ odSph: 0, odAxis: 0, pd: 64 }, rules), []);
  assert.equal(validateMeasurements({ odSph: null, odAxis: 0, pd: 64 }, rules).length, 1);
  assert.equal(validateMeasurements({ odSph: '', odAxis: 0, pd: 64 }, rules).length, 1);
});
test('validation follows supplied server limits, integer axes and decimal precision', () => {
  assert.equal(validateMeasurements({ odSph: -31, odAxis: 180.5, pd: 64.22 }, rules).length, 3);
  assert.equal(validateMeasurements({ odSph: 1, odAxis: 0, pd: 64 }, { ...rules, odSph: { required: true, min: -0.5, max: 0.5 } }).length, 1);
});
test('revision comparison distinguishes missing measurements from zero and ignores decimal formatting', () => {
  const changes = measurementChanges({ odSph: '0.00', pd: null, notes: 'old' }, { odSph: 0, pd: 0, notes: 'new' });
  assert.deepEqual(changes.map(change => change.field), ['pd', 'notes']);
  assert.equal(changes[0].before, null);
  assert.equal(changes[0].after, 0);
});
