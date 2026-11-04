export function sixMonthsBefore(value) {
  const date = new Date(value);
  const day = date.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() - 6);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(day, lastDay));
  return date;
}

export function progressionWarnings(current, history) {
  const end = new Date(current.createdAt);
  const start = sixMonthsBefore(end);
  return ['od', 'os'].flatMap(eye => {
    const value = current[`${eye}Sph`];
    if (value == null || !Number.isFinite(Number(value))) return [];
    const previous = history.filter(p => p.id !== current.id && p[`${eye}Sph`] != null
      && Number.isFinite(Number(p[`${eye}Sph`])) && new Date(p.createdAt) >= start
      && new Date(p.createdAt) < end);
    const increase = Math.max(0, ...previous.map(p => Math.max(0, -Number(value))
      - Math.max(0, -Number(p[`${eye}Sph`]))));
    return increase > 0.75 ? [`${eye.toUpperCase()} tăng cận ${increase.toFixed(2)} D trong 6 tháng`] : [];
  });
}
