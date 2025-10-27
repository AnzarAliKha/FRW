// metrics.js - BMI, BMR, TDEE, Navy Bodyfat, FFMI
import { heightToCm, weightToKg } from './converters.js';

export function computeCore(raw) {
  const heightCm = heightToCm(raw.height, raw.heightUnit);
  const weightKg = weightToKg(raw.weight, raw.weightUnit);
  const hM = heightCm / 100;
  const bmi = weightKg / (hM * hM);

  // Mifflin-St Jeor
  const bmr = raw.gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * raw.age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * raw.age - 161;

  const activityFactor = {
    sedentary:1.2, light:1.375, moderate:1.55, active:1.725, very_active:1.9
  }[raw.activity] || 1.55;

  const tdee = Math.round(bmr * activityFactor);

  // Navy body fat (needs neck + waist for men; neck+waist+hips for women)
  let bodyFat = null;
  if (raw.gender === 'male' && raw.neck && raw.waist && (raw.waist - raw.neck) > 0) {
    bodyFat = 86.010 * Math.log10(raw.waist - raw.neck) - 70.041 * Math.log10(heightCm) + 36.76;
  } else if (raw.gender === 'female' && raw.neck && raw.waist && raw.hips && (raw.waist + raw.hips - raw.neck) > 0) {
    bodyFat = 163.205 * Math.log10(raw.waist + raw.hips - raw.neck) - 97.684 * Math.log10(heightCm) - 78.387;
  }
  if (bodyFat) bodyFat = Math.max(0, Number(bodyFat.toFixed(1)));

  // FFMI (if bodyFat known)
  let ffmi = null;
  if (bodyFat !== null) {
    const leanMass = weightKg * (1 - bodyFat / 100);
    ffmi = leanMass / (hM * hM);
    ffmi = Number(ffmi.toFixed(2));
  }

  return {
    heightCm, weightKg, bmi: Number(bmi.toFixed(2)), bmr: Math.round(bmr),
    tdee, bodyFat, ffmi
  };
}
