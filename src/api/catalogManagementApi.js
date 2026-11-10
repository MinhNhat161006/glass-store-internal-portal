import { apiFetch } from './client.js';

const request = (path, options) => apiFetch(`/api/catalog/admin/${path}`, options);

export const catalogManagementApi = {
  // Categories
  getCategories: () => request('categories'),
  createCategory: (data) => request('categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id, data) => request(`categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id) => request(`categories/${id}`, { method: 'DELETE' }),

  // Brands
  getBrands: () => request('brands'),
  createBrand: (data) => request('brands', { method: 'POST', body: JSON.stringify(data) }),
  updateBrand: (id, data) => request(`brands/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBrand: (id) => request(`brands/${id}`, { method: 'DELETE' }),

  // Locations
  getLocations: () => request('locations'),
  createLocation: (data) => request('locations', { method: 'POST', body: JSON.stringify(data) }),
  updateLocation: (id, data) => request(`locations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  setLocationActive: (id, active) => request(`locations/${id}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ active })
  }),
  deleteLocation: (id) => request(`locations/${id}`, { method: 'DELETE' }),
  getPublicLocations: () => apiFetch('/api/locations'),

  // Products (FR-PRO-01..09, FR-ADM-05)
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.categoryId) query.append('categoryId', params.categoryId);
    if (params.brandId) query.append('brandId', params.brandId);
    if (params.productType) query.append('productType', params.productType);
    if (params.status && params.status !== 'ALL') query.append('status', params.status);
    if (params.keyword) query.append('keyword', params.keyword);
    const qs = query.toString();
    return request(`products${qs ? `?${qs}` : ''}`);
  },
  getProductById: (id) => request(`products/${id}`),
  createProduct: (data) => request('products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id, data) => request(`products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  setProductStatus: (id, status) => request(`products/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),
  deleteProduct: (id) => request(`products/${id}`, { method: 'DELETE' }),

  // Product Variants
  createVariant: (productId, data) => request(`products/${productId}/variants`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateVariant: (variantId, data) => request(`variants/${variantId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  setVariantStatus: (variantId, status) => request(`variants/${variantId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),
  updateVariantPrice: (variantId, data) => request(`variants/${variantId}/price`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  deleteVariant: (variantId) => request(`variants/${variantId}`, { method: 'DELETE' })
};
