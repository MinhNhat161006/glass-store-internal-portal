import { test } from 'node:test';
import assert from 'node:assert/strict';
import { repairPayload, pickupDefault } from './repairUtils.js';

const valid=()=>({customerName:' Khách ',customerPhone:'0901234567',productName:'Gọng',frameCondition:'Lỏng ốc',lensCondition:'Nguyên vẹn',reportedProblem:'Kính lỏng',physicalCondition:'Không xước khác',requestedServices:['FRAME_ADJUSTMENT'],expectedPickupAt:pickupDefault()});
test('reception preserves actual conditions and adds the current employee and local pickup timestamp',()=>{
  const result=repairPayload(valid(),'QA Staff');
  assert.equal(result.customerName,'Khách');assert.equal(result.receptionEmployee,'QA Staff');
  assert.equal(result.frameCondition,'Lỏng ốc');assert.match(result.expectedPickupAt,/:00$/);
});
test('missing actor, unsupported service or past pickup cannot create a receipt',()=>{
  assert.throws(()=>repairPayload(valid(),''),/nhân viên/);
  assert.throws(()=>repairPayload({...valid(),requestedServices:['FAKE_SERVICE']},'QA'),/dịch vụ/);
  assert.throws(()=>repairPayload({...valid(),expectedPickupAt:'2000-01-01T10:00'},'QA'),/Giờ hẹn/);
});
