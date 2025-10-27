// ui.js - render into DOM
import { profileTemplate, nutritionTemplate, workoutTemplate, recommendationsTemplate } from './templates.js';

const resultsEl = document.getElementById('results');
export function showErrors(list) {
  const el = document.getElementById('formErrors');
  if (!list || list.length === 0) { el.textContent = ''; return; }
  el.innerHTML = '<ul>' + list.map(s => `<li>${s}</li>`).join('') + '</ul>';
}

export function renderAll(raw, metrics, macros, mealPlan, program) {
  // Build two-column layout
  resultsEl.hidden = false;
  resultsEl.innerHTML = `
    <div class="results-grid">
      <div>
        ${profileTemplate(raw, metrics, macros)}
        ${workoutTemplate(program)}
        ${recommendationsTemplate()}
      </div>
      <aside>
        ${nutritionTemplate(macros, mealPlan)}
      </aside>
    </div>
  `;
  resultsEl.scrollIntoView({ behavior: 'smooth' });
}
