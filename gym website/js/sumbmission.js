import { validateForm } from './validators.js';
import { updateUI } from './ui.js';
import { calculateMetrics } from './metrics.js';
import { generateNutritionPlan } from './nutrition.js';
import { generateWorkoutPlan } from './workouts.js';

const form = document.getElementById('fitnessForm');
const resultsSection = document.getElementById('results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get all form values
  const formData = {
    age: Number(document.getElementById('age').value),
    gender: document.querySelector('input[name="gender"]:checked')?.value,
    height: Number(document.getElementById('height').value),
    heightUnit: document.getElementById('heightUnit').value,
    weight: Number(document.getElementById('weight').value),
    weightUnit: document.getElementById('weightUnit').value,
    experience: document.getElementById('experience').value,
    goal: document.getElementById('goal').value,
    activity: document.getElementById('activity').value,
    location: document.getElementById('location').value,
    diet: document.getElementById('diet').value,
    meals: Number(document.getElementById('meals').value),
    neck: Number(document.getElementById('neck').value) || null,
    waist: Number(document.getElementById('waist').value) || null,
    hips: Number(document.getElementById('hips').value) || null
  };

  // Validate form
  const errors = validateForm(formData);
  const errorDiv = document.getElementById('formErrors');
  
  if (errors.length > 0) {
    errorDiv.innerHTML = errors.join('<br>');
    return;
  }
  errorDiv.innerHTML = '';

  // Calculate metrics
  const metrics = calculateMetrics(formData);
  
  // Generate plans
  const nutritionPlan = generateNutritionPlan(metrics, formData);
  const workoutPlan = generateWorkoutPlan(formData);

  // Update UI with results
  updateUI({ metrics, nutritionPlan, workoutPlan });
  
  // Show results section
  resultsSection.hidden = false;
});

// Reset form
document.getElementById('resetBtn').addEventListener('click', () => {
  form.reset();
  resultsSection.hidden = true;
  document.getElementById('formErrors').innerHTML = '';
});