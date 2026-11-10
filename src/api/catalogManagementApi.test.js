import test from 'node:test';
import assert from 'node:assert/strict';
import { catalogManagementApi } from './catalogManagementApi.js';

test('catalogManagementApi.getProducts formats query parameters correctly', async context => {
  const originalStorage = globalThis.localStorage;
  globalThis.localStorage = { getItem: () => 'fake-token' };

  let calledUrl = '';
  context.mock.method(globalThis, 'fetch', async (url) => {
    calledUrl = url;
    return {
      ok: true,
      status: 200,
      json: async () => ({
        code: 200,
        message: 'Success',
        data: [{ id: 1, name: 'Kính Test' }]
      })
    };
  });

  try {
    const res = await catalogManagementApi.getProducts({
      categoryId: 10,
      brandId: 20,
      productType: 'FRAME',
      status: 'ACTIVE',
      keyword: 'Bolon'
    });

    assert.equal(res.code, 200);
    assert.equal(res.data[0].name, 'Kính Test');
    assert.ok(calledUrl.includes('/api/catalog/admin/products?'));
    assert.ok(calledUrl.includes('categoryId=10'));
    assert.ok(calledUrl.includes('brandId=20'));
    assert.ok(calledUrl.includes('productType=FRAME'));
    assert.ok(calledUrl.includes('status=ACTIVE'));
    assert.ok(calledUrl.includes('keyword=Bolon'));
  } finally {
    globalThis.localStorage = originalStorage;
  }
});

test('catalogManagementApi sends create product and variant requests with valid JSON bodies', async context => {
  const originalStorage = globalThis.localStorage;
  globalThis.localStorage = { getItem: () => 'fake-token' };

  const calls = [];
  context.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options });
    return {
      ok: true,
      status: 200,
      json: async () => ({
        code: 200,
        message: 'Success',
        data: { id: 99 }
      })
    };
  });

  try {
    await catalogManagementApi.createProduct({
      name: 'Kính Mới',
      productType: 'FRAME',
      categoryId: 1,
      brandId: 2,
      status: 'ACTIVE'
    });

    await catalogManagementApi.createVariant(99, {
      sku: 'SKU-NEW-01',
      barcode: '8930001',
      name: 'Biến thể 1',
      price: 1500000,
      costPrice: 800000,
      status: 'ACTIVE'
    });

    await catalogManagementApi.updateVariantPrice(55, {
      price: 1600000,
      costPrice: 850000
    });

    await catalogManagementApi.setProductStatus(99, 'HIDDEN');
    await catalogManagementApi.setVariantStatus(55, 'DISCONTINUED');

    assert.equal(calls.length, 5);
    assert.ok(calls[0].url.includes('/api/catalog/admin/products'));
    assert.equal(calls[0].options.method, 'POST');

    assert.ok(calls[1].url.includes('/api/catalog/admin/products/99/variants'));
    assert.equal(calls[1].options.method, 'POST');

    assert.ok(calls[2].url.includes('/api/catalog/admin/variants/55/price'));
    assert.equal(calls[2].options.method, 'PATCH');

    assert.ok(calls[3].url.includes('/api/catalog/admin/products/99/status'));
    assert.equal(calls[3].options.method, 'PATCH');

    assert.ok(calls[4].url.includes('/api/catalog/admin/variants/55/status'));
    assert.equal(calls[4].options.method, 'PATCH');
  } finally {
    globalThis.localStorage = originalStorage;
  }
});

test('catalogManagementApi propagates server validation and conflict errors', async context => {
  const originalStorage = globalThis.localStorage;
  globalThis.localStorage = { getItem: () => 'fake-token' };

  context.mock.method(globalThis, 'fetch', async () => ({
    ok: false,
    status: 409,
    json: async () => ({
      message: 'Mã SKU đã tồn tại',
      code: 409
    })
  }));

  try {
    await assert.rejects(
      catalogManagementApi.createVariant(1, { sku: 'DUPLICATE' }),
      (err) => {
        assert.equal(err.status, 409);
        assert.equal(err.message, 'Mã SKU đã tồn tại');
        return true;
      }
    );
  } finally {
    globalThis.localStorage = originalStorage;
  }
});

