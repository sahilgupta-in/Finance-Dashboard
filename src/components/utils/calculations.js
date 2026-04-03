// utils/calculations.js
export function groupByCategory(data) {
  const result = {};

  data.forEach((t) => {
    if (!result[t.category]) result[t.category] = 0;
    result[t.category] += t.amount;
  });

  const total = Object.values(result).reduce((a, b) => a + b, 0);

  return Object.entries(result).map(([name, value]) => ({
    name,
    value,
    percent: Math.round((value / total) * 100),
  }));
}