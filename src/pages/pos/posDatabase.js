// ============================================================
// OptiVision POS Terminal - Master Product Database
// Mapping SKU and Barcodes (EAN-13 / Code128 / UPC)
// Đồng bộ 100% với 02-seed-data.sql (db_catalog)
// ============================================================

export const PRODUCT_CATALOG = [
  // GỌNG KÍNH (FRAMES)
  {
    id: 1,
    barcode: '893850123401',
    sku: 'FRM-BOLON-BJ3120-BLK',
    name: 'Gọng Bolon Titanium Mắt Vuông - Đen Titan Nhám',
    category: 'Gọng Kính',
    price: 3250000,
    costPrice: 1800000,
    stock: 38,
    color: '#086288',
    brand: 'Bolon Eyewear (Pháp)',
    material: 'B-Titanium Siêu Nhẹ',
    shape: 'Mắt vuông'
  },
  {
    id: 2,
    barcode: '893850123402',
    sku: 'FRM-BOLON-BJ3120-GLD',
    name: 'Gọng Bolon Titanium - Vàng Hồng Rose Gold',
    category: 'Gọng Kính',
    price: 3450000,
    costPrice: 1900000,
    stock: 24,
    color: '#f43f5e',
    brand: 'Bolon Eyewear (Pháp)',
    material: 'B-Titanium Siêu Nhẹ',
    shape: 'Mắt vuông'
  },
  {
    id: 3,
    barcode: '893850123403',
    sku: 'FRM-BOLON-BJ3120-SIL',
    name: 'Gọng Bolon Titanium - Bạc Sang Trọng Silver',
    category: 'Gọng Kính',
    price: 3250000,
    costPrice: 1800000,
    stock: 18,
    color: '#94a3b8',
    brand: 'Bolon Eyewear (Pháp)',
    material: 'B-Titanium Siêu Nhẹ',
    shape: 'Mắt vuông'
  },
  {
    id: 4,
    barcode: '893850123404',
    sku: 'FRM-GM-SOUTHSIDE-BLK',
    name: 'Gọng Gentle Monster TR90 Mắt Tròn - Đen Bóng',
    category: 'Gọng Kính',
    price: 1850000,
    costPrice: 950000,
    stock: 45,
    color: '#1e293b',
    brand: 'Gentle Monster (Hàn Quốc)',
    material: 'Nhựa TR90 Uốn Dẻo',
    shape: 'Mắt tròn'
  },
  {
    id: 5,
    barcode: '893850123405',
    sku: 'FRM-GM-SOUTHSIDE-TOR',
    name: 'Gọng Gentle Monster TR90 - Đồi Mồi Nâu Vintage',
    category: 'Gọng Kính',
    price: 1850000,
    costPrice: 950000,
    stock: 28,
    color: '#78350f',
    brand: 'Gentle Monster (Hàn Quốc)',
    material: 'Nhựa TR90 Uốn Dẻo',
    shape: 'Mắt tròn'
  },
  {
    id: 6,
    barcode: '893850123406',
    sku: 'FRM-RB-AVIATOR-GLD',
    name: 'Gọng Kính Ray-Ban Aviator Mạ Vàng Kim 18K',
    category: 'Gọng Kính',
    price: 4100000,
    costPrice: 2400000,
    stock: 20,
    color: '#d97706',
    brand: 'Ray-Ban (Mỹ / Ý)',
    material: 'Hợp Kim Mạ Vàng',
    shape: 'Aviator'
  },
  {
    id: 7,
    barcode: '893850123407',
    sku: 'FRM-RB-AVIATOR-SIL',
    name: 'Gọng Kính Ray-Ban Aviator Bạc Chrome',
    category: 'Gọng Kính',
    price: 3950000,
    costPrice: 2300000,
    stock: 15,
    color: '#64748b',
    brand: 'Ray-Ban (Mỹ / Ý)',
    material: 'Hợp Kim Bạc Chrome',
    shape: 'Aviator'
  },
  {
    id: 8,
    barcode: '893850123408',
    sku: 'FRM-CHARMANT-ZT2233',
    name: 'Gọng Charmant Titanium Z Khoan Không Viền Siêu Nhẹ',
    category: 'Gọng Kính',
    price: 6850000,
    costPrice: 4200000,
    stock: 12,
    color: '#334155',
    brand: 'Charmant (Nhật Bản)',
    material: 'Z-Titanium Đàn Hồi',
    shape: 'Không viền'
  },
  {
    id: 9,
    barcode: '893850123409',
    sku: 'FRM-BOLON-BJ7150-ROSE',
    name: 'Gọng Kim Loại Đa Giác Bolon Retro Chic - Vàng Hồng',
    category: 'Gọng Kính',
    price: 3650000,
    costPrice: 2100000,
    stock: 22,
    color: '#fb7185',
    brand: 'Bolon Eyewear (Pháp)',
    material: 'Titanium Mạ Vàng Hồng',
    shape: 'Đa giác'
  },
  {
    id: 10,
    barcode: '893850123410',
    sku: 'FRM-GM-MILAN-CRY',
    name: 'Gọng Acetate Gentle Monster Milan - Trong Suốt Crystal',
    category: 'Gọng Kính',
    price: 2450000,
    costPrice: 1350000,
    stock: 30,
    color: '#e2e8f0',
    brand: 'Gentle Monster (Hàn Quốc)',
    material: 'Nhựa Acetate Đúc',
    shape: 'Mắt oval'
  },

  // TRÒNG KÍNH (LENSES)
  {
    id: 11,
    barcode: '893850123411',
    sku: 'LNS-CHEMI-U2-160',
    name: 'Cặp Tròng Chemi U2 BlueCut 1.60 Lọc Ánh Sáng Xanh',
    category: 'Tròng Kính',
    price: 650000,
    costPrice: 320000,
    stock: 120,
    color: '#2563eb',
    brand: 'Chemi Lens (Hàn Quốc)',
    lensIndex: '1.60',
    coating: 'Crystal U2 Phủ Nano'
  },
  {
    id: 12,
    barcode: '893850123412',
    sku: 'LNS-ESS-TRANS-156',
    name: 'Cặp Tròng Đổi Màu Essilor Transitions Gen 8 1.56',
    category: 'Tròng Kính',
    price: 3380000,
    costPrice: 1950000,
    stock: 40,
    color: '#7c3aed',
    brand: 'Essilor (Pháp)',
    lensIndex: '1.56',
    coating: 'Transitions Gen 8 Đổi Màu Khói'
  },
  {
    id: 13,
    barcode: '893850123413',
    sku: 'LNS-ESS-CRIZAL-167',
    name: 'Cặp Tròng Essilor Crizal Rock 1.67 Blue UV Siêu Kháng Trầy',
    category: 'Tròng Kính',
    price: 1980000,
    costPrice: 1100000,
    stock: 65,
    color: '#0284c7',
    brand: 'Essilor (Pháp)',
    lensIndex: '1.67',
    coating: 'Crizal Rock High-Resistance'
  },
  {
    id: 14,
    barcode: '893850123414',
    sku: 'LNS-ZEISS-167',
    name: 'Cặp Tròng Zeiss ClearView 1.67 BlueGuard Công Nghệ Đức',
    category: 'Tròng Kính',
    price: 4250000,
    costPrice: 2600000,
    stock: 25,
    color: '#0369a1',
    brand: 'Carl Zeiss (Đức)',
    lensIndex: '1.67',
    coating: 'Freeform BlueGuard'
  },
  {
    id: 15,
    barcode: '893850123415',
    sku: 'LNS-ESS-VARILUX-160',
    name: 'Cặp Tròng Đa Tròng Kỹ Thuật Số Essilor Varilux Comfort Max 1.60',
    category: 'Tròng Kính',
    price: 5650000,
    costPrice: 3400000,
    stock: 15,
    color: '#4338ca',
    brand: 'Essilor (Pháp)',
    lensIndex: '1.60',
    coating: 'Varilux Progressive Digital'
  },
  {
    id: 16,
    barcode: '893850123416',
    sku: 'LNS-CHEMI-U6-174',
    name: 'Cặp Tròng Siêu Mỏng Chemi Crystal U6 1.74 Cho Cận Nặng',
    category: 'Tròng Kính',
    price: 2500000,
    costPrice: 1400000,
    stock: 35,
    color: '#1d4ed8',
    brand: 'Chemi Lens (Hàn Quốc)',
    lensIndex: '1.74',
    coating: 'Crystal U6 Chống UV400'
  },

  // KÍNH RÂM (SUNGLASSES)
  {
    id: 17,
    barcode: '893850123417',
    sku: 'SUN-RB-WAYF-BLK',
    name: 'Kính Râm Ray-Ban Classic Wayfarer Polarized Phân Cực',
    category: 'Kính Râm',
    price: 4950000,
    costPrice: 2900000,
    stock: 18,
    color: '#065f46',
    brand: 'Ray-Ban (Mỹ / Ý)',
    material: 'Acetate Chống Trầy',
    shape: 'Mắt vuông'
  },
  {
    id: 18,
    barcode: '893850123418',
    sku: 'SUN-OAK-HOLBROOK-BLU',
    name: 'Kính Mát Thể Thao Oakley Holbrook Prizm Sapphire Matte Black',
    category: 'Kính Râm',
    price: 3950000,
    costPrice: 2300000,
    stock: 20,
    color: '#0284c7',
    brand: 'Oakley (Mỹ)',
    material: 'O-Matter Siêu Bền',
    shape: 'Mắt vuông thể thao'
  },

  // PHỤ KIỆN (ACCESSORIES)
  {
    id: 19,
    barcode: '893850123419',
    sku: 'ACC-BOX-LEATHER',
    name: 'Hộp Đựng Kính Bọc Da Khâu Tay Chống Sốc Khóa Từ',
    category: 'Phụ Kiện',
    price: 180000,
    costPrice: 75000,
    stock: 150,
    color: '#92400e',
    brand: 'OptiVision Official',
    material: 'Da PU Khâu Tay'
  },
  {
    id: 20,
    barcode: '893850123420',
    sku: 'ACC-NANO-SPRAY',
    name: 'Chai Xịt Nano Kháng Khuẩn & Chống Bám Bụi Tròng Kính (60ml)',
    category: 'Phụ Kiện',
    price: 95000,
    costPrice: 35000,
    stock: 300,
    color: '#059669',
    brand: 'OptiCare',
    material: 'Dung Dịch Nano Bạc'
  },
  {
    id: 21,
    barcode: '893850123421',
    sku: 'ACC-MICRO-CLOTH',
    name: 'Khăn Lau Kính Microfiber Siêu Mịn Chuyên Dụng Nhãn Khoa',
    category: 'Phụ Kiện',
    price: 35000,
    costPrice: 12000,
    stock: 500,
    color: '#475569',
    brand: 'OptiCare',
    material: 'Sợi Microfiber Dày'
  }
];

/**
 * Find product by barcode or SKU (case-insensitive)
 */
export function findProductByBarcodeOrSku(query) {
  if (!query || !query.trim()) return null;
  const clean = query.trim().toUpperCase();

  return PRODUCT_CATALOG.find(
    (p) => p.barcode.toUpperCase() === clean || p.sku.toUpperCase() === clean
  );
}
