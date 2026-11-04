import { test } from 'node:test';
import assert from 'node:assert/strict';
import { orderApi } from './orderApi.js';

Object.defineProperty(globalThis,'localStorage',{value:{getItem:()=> 'qa-token'},configurable:true});
test('POS checkout unwraps the saved order and retains the retry key and prescription linkage', async context => {
  const payload={items:[{skuId:'LNS-1',quantity:1,prescriptionId:7}]};
  let request;
  context.mock.method(globalThis,'fetch',async (url,options)=>{
    request={url,options}; return {ok:true,json:async()=>({code:200,data:{id:42,orderCode:'OPT-QA',inventorySyncStatus:'PENDING'}})};
  });
  const saved=await orderApi.createOrder(payload,'same-key-on-retry');
  assert.equal(saved.id,42); assert.equal(saved.orderCode,'OPT-QA');
  assert.equal(request.options.headers['Idempotency-Key'],'same-key-on-retry');
  assert.equal(JSON.parse(request.options.body).items[0].prescriptionId,7);
});
test('list, status and cancellation consumers receive order data rather than the response envelope', async context => {
  const data=[{id:1,orderCode:'OPT-1'}];
  context.mock.method(globalThis,'fetch',async()=>({ok:true,json:async()=>({data})}));
  assert.deepEqual(await orderApi.getAllOrders(),data);
  assert.deepEqual(await orderApi.updateOrderStatus(1,{status:'CONFIRMED'}),data);
  assert.deepEqual(await orderApi.cancel(1,'QA',false),data);
});
test('failed checkout rejects instead of returning a success-shaped order', async context => {
  context.mock.method(globalThis,'fetch',async()=>({ok:false,json:async()=>({message:'Không đủ tồn kho'})}));
  await assert.rejects(orderApi.createOrder({items:[]},'retry-key'),/Không đủ tồn kho/);
});
