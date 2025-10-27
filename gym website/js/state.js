// state.js - collects form values and exposes serialization
export function readForm() {
  const get = id => document.getElementById(id)?.value || '';
  const gender = (() => {
    const r = document.querySelector('input[name="gender"]:checked');
    return r ? r.value : '';
  })();

  return {
    age: Number(get('age')),
    gender,
    height: Number(get('height')),
    heightUnit: get('heightUnit'),
    weight: Number(get('weight')),
    weightUnit: get('weightUnit'),
    experience: get('experience'),
    goal: get('goal'),
    activity: get('activity'),
    location: get('location'),
    diet: get('diet'),
    meals: Number(get('meals')),
    neck: Number(get('neck')) || null,
    waist: Number(get('waist')) || null,
    hips: Number(get('hips')) || null
  };
}

export function saveLast(inputs) {
  try { localStorage.setItem('neonfit_last', JSON.stringify(inputs)); } catch(e){}
}
export function loadLast() {
  try { return JSON.parse(localStorage.getItem('neonfit_last') || 'null'); } catch(e){ return null; }
}
