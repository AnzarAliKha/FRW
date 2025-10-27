// converters.js - unit conversion helpers
export function heightToCm(height, unit) {
  if (!height) return null;
  if (unit === 'm') return height * 100;
  if (unit === 'in') return height * 2.54;
  return height; // cm
}
export function weightToKg(weight, unit) {
  if (!weight) return null;
  if (unit === 'lb') return weight * 0.45359237;
  return weight; // kg
}
export function cmToDisplay(heightCm, unit) {
  if (unit === 'in') return (heightCm / 2.54).toFixed(1) + ' in';
  if (unit === 'm') return (heightCm / 100).toFixed(2) + ' m';
  return Math.round(heightCm) + ' cm';
}
