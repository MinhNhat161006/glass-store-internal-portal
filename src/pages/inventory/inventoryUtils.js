export const LOW_STOCK_THRESHOLD = 5;

export function isLowStock(quantity) {
  return Number(quantity) < LOW_STOCK_THRESHOLD;
}
