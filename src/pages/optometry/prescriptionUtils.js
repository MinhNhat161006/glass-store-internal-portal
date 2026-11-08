export const measurementFields = ['odSph', 'odCyl', 'odAxis', 'odAdd', 'osSph', 'osCyl', 'osAxis', 'osAdd', 'pd'];
export const measurementLabel = field => field === 'pd' ? 'Tổng PD (mm)' : `${field.startsWith('od') ? 'OD' : 'OS'} ${field.slice(2).toUpperCase()}`;
export const emptyMeasurements = () => Object.fromEntries(measurementFields.map(field => [field, null]));
export const displayMeasurement = value => value == null || value === '' ? '—' : String(value);

export function validateMeasurements(data, rules) {
  return Object.entries(rules).flatMap(([field, rule]) => {
    const value = data[field];
    const label = measurementFields.includes(field) ? measurementLabel(field) : field;
    if (value == null || value === '') return rule.required ? [`${label}: thiếu dữ liệu`] : [];
    if (rule.min == null && rule.max == null && !rule.integer && rule.fraction == null) return [];
    const numeric = Number(value);
    if (!Number.isFinite(numeric)
      || (rule.min != null && numeric < Number(rule.min))
      || (rule.max != null && numeric > Number(rule.max))
      || (rule.integer && !Number.isInteger(numeric))
      || (rule.fraction != null && Math.abs(numeric * 10 ** rule.fraction - Math.round(numeric * 10 ** rule.fraction)) > 1e-7)) {
      return [`${label}: số đo không hợp lệ theo quy tắc máy chủ`];
    }
    return [];
  });
}

export function measurementChanges(before, after) {
  return [...measurementFields, 'notes', 'lensSku', 'lensName'].filter(field => {
    const a = before?.[field] ?? null;
    const b = after?.[field] ?? null;
    if (measurementFields.includes(field) && a != null && b != null) return Number(a) !== Number(b);
    return a !== b;
  }).map(field => ({ field, label: measurementFields.includes(field) ? measurementLabel(field) : ({ notes: 'Ghi chú', lensSku: 'Mã tròng', lensName: 'Tên tròng' }[field] || field), before: before?.[field], after: after?.[field] }));
}
