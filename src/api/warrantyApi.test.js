import { test } from 'node:test';
import assert from 'node:assert/strict';
import { warrantyApi } from './warrantyApi.js';
Object.defineProperty(globalThis,'localStorage',{value:{getItem:()=> 'qa-token'},configurable:true});
test('lookup sends the chosen phone or barcode rather than a fabricated local result',async context=>{
  const urls=[];
  context.mock.method(globalThis,'fetch',async url=>{urls.push(url);return {ok:true,json:async()=>[{orderId:1}]};});
  assert.equal((await warrantyApi.search('phone',' 0901234567 '))[0].orderId,1);
  await warrantyApi.search('barcode','ABC/123');
  assert.equal(urls[0],'/api/warranties/search?phone=0901234567');
  assert.equal(urls[1],'/api/warranties/search?barcode=ABC%2F123');
});
test('repair reception returns the persisted ticket and propagates failed writes',async context=>{
  context.mock.method(globalThis,'fetch',async()=>({ok:true,json:async()=>({id:4,serviceCode:'REP-QA'})}));
  assert.equal((await warrantyApi.createRepair({customerName:'QA'})).serviceCode,'REP-QA');
  context.mock.method(globalThis,'fetch',async()=>({ok:false,json:async()=>({message:'Không lưu được phiếu'})}));
  await assert.rejects(warrantyApi.createRepair({customerName:'QA'}),/Không lưu được phiếu/);
});
