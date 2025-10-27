// main.js - glue
import { readForm, saveLast, loadLast } from './state.js';
import { validate } from './validators.js';
import { computeCore } from './metrics.js';
import { planMacros, mealPlan } from './nutrition.js';
import { programFor } from './workouts.js';
import { showErrors, renderAll } from './ui.js';

const form = document.getElementById('fitnessForm');
const resetBtn = document.getElementById('resetBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const raw = readForm();
  const errors = validate(raw);
  if (errors.length) { showErrors(errors); return; }
  showErrors([]);

  // compute
  const metrics = computeCore(raw);
  const macros = planMacros(metrics, raw);
  const meal = mealPlan(macros, raw);
  const program = programFor(raw, metrics);

  // render
  renderAll(raw, metrics, macros, meal, program);

  // save last
  saveLast({ raw, metrics, macros });
});

resetBtn.addEventListener('click', () => {
  form.reset();
  document.getElementById('formErrors').textContent = '';
  document.getElementById('results').hidden = true;
});

// populate last if present
const last = loadLast();
if (last) {
  // Simple: we leave this as optional - loading to input fields could be added
  // console.log('Loaded previous session', last);
}
