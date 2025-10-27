// templates.js - small helpers to turn objects into HTML strings
export function profileTemplate(raw, metrics, macros) {
  return `
    <div class="card">
      <h2 class="section-title">Profile</h2>
      <div class="metric"><span>Age / Gender</span><strong>${raw.age} / ${raw.gender || '—'}</strong></div>
      <div class="metric"><span>Height</span><strong>${(metrics.heightCm||'—')} cm</strong></div>
      <div class="metric"><span>Weight</span><strong>${(metrics.weightKg||'—')} kg</strong></div>
      <div class="metric"><span>BMI</span><strong>${metrics.bmi}</strong></div>
      <div class="metric"><span>BMR</span><strong>${metrics.bmr} kcal</strong></div>
      <div class="metric"><span>TDEE</span><strong>${metrics.tdee} kcal</strong></div>
      <div class="metric"><span>Body Fat</span><strong>${metrics.bodyFat !== null ? metrics.bodyFat + '%' : 'N/A'}</strong></div>
      <div class="metric"><span>FFMI</span><strong>${metrics.ffmi !== null ? metrics.ffmi : 'N/A'}</strong></div>
    </div>
  `;
}

export function nutritionTemplate(macros, mealPlan) {
  return `
    <div class="card">
      <h2 class="section-title">Nutrition</h2>
      <div class="metric"><span>Target Calories</span><strong>${macros.calories} kcal</strong></div>
      <div class="metric"><span>Protein</span><strong>${macros.proteinGrams} g</strong></div>
      <div class="metric"><span>Fat</span><strong>${macros.fatGrams} g</strong></div>
      <div class="metric"><span>Carbs</span><strong>${macros.carbGrams} g</strong></div>
      <h3>Sample Meals</h3>
      ${mealPlan.meals.map(m => `<strong>${m.name}</strong><ul>${m.items.map(i=>`<li>${i}</li>`).join('')}</ul>`).join('')}
    </div>
  `;
}

export function workoutTemplate(program) {
  return `
    <div class="card">
      <h2 class="section-title">Training Program</h2>
      <h3>${program.title}</h3>
      <p><em>${program.guidance}</em></p>
      <p><strong>Days per week:</strong> ${program.daysPerWeek}</p>
      ${program.sessions.map(s => `<h4>${s.name}</h4><ul>${s.exercises.map(e=>`<li>${e}</li>`).join('')}</ul>`).join('')}
    </div>
  `;
}

export function recommendationsTemplate() {
  return `
    <div class="card">
      <h2 class="section-title">Recommendations</h2>
      <ul>
        <li>Progressive overload: small weekly increases in load or reps.</li>
        <li>Sleep 7–9 hours for recovery.</li>
        <li>Hydration 2–3 L/day (more if hot or heavy sweating).</li>
        <li>Consider creatine (5 g/day) & vitamin D if required — consult a clinician first.</li>
      </ul>
    </div>
  `;
}
