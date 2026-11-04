import { test } from 'node:test';
import assert from 'node:assert/strict';
import { progressionWarnings, sixMonthsBefore } from './optometryUtils.js';

const history = [{ id: 1, createdAt: '2026-05-04T10:00:00', odSph: -2, osSph: -1 }];
const current = { id: 2, createdAt: '2026-11-04T10:00:00', odSph: -2.75, osSph: -1 };
test('warns strictly above 0.75 D and includes the six-month boundary', () => {
  assert.equal(progressionWarnings(current, history).length, 0);
  assert.equal(progressionWarnings({ ...current, odSph: -3 }, history).length, 1);
  assert.equal(progressionWarnings({ ...current, odSph: -3, osSph: -2 }, history).length, 2);
});
test('excludes older exams and does not treat hyperopia as increasing myopia', () => {
  assert.equal(progressionWarnings({ ...current, createdAt: '2026-11-05T10:00:00', odSph: -3 }, history).length, 0);
  assert.equal(progressionWarnings({ ...current, odSph: 3 }, history).length, 0);
});
test('clamps the calendar window to the last day of the target month', () => {
  assert.equal(sixMonthsBefore('2026-08-31T10:00:00').getDate(), 28);
});
