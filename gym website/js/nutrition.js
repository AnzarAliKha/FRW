// nutrition.js - calories and macros generation
export function planMacros(metrics, raw) {
  // Start from TDEE
  let calories = metrics.tdee;
  if (raw.goal === 'lose') calories = Math.max(1200, calories - 400);
  if (raw.goal === 'gain') calories = calories + 300;

  // Adjust for diet preference
  if (raw.diet === 'low-carb') {
    calories = Math.max(1200, calories - 200); // reduce calories slightly for low-carb
  } else if (raw.diet === 'high-protein') {
    // high-protein already handled by protein target
  } else if (raw.diet === 'vegetarian' || raw.diet === 'vegan') {
    // vegetarian/vegan might need slight calorie adjustment, but keep similar for now
  }

  // protein target per kg
  let proteinPerKg = raw.goal === 'lose' ? 2.0 : (raw.goal === 'gain' ? 1.8 : 1.6);
  if (raw.diet === 'high-protein') proteinPerKg = Math.max(proteinPerKg, 2.2);
  const proteinGrams = Math.round(proteinPerKg * metrics.weightKg);

  // fats as 25% of calories (min), but adjust for low-carb
  let fatPercent = 0.25;
  if (raw.diet === 'low-carb') fatPercent = 0.35; // higher fat for low-carb
  let fatCalories = Math.round(calories * fatPercent);
  let fatGrams = Math.round(fatCalories / 9);

  // carbs fill remaining calories, but cap for low-carb
  let proteinCalories = proteinGrams * 4;
  let remaining = calories - proteinCalories - fatGrams * 9;
  let carbGrams = Math.round(Math.max(0, remaining) / 4);
  if (raw.diet === 'low-carb') carbGrams = Math.min(carbGrams, Math.round(calories * 0.3 / 4)); // max 30% carbs

  return {
    calories, proteinGrams, fatGrams, carbGrams,
    proteinPerKg
  };
}

export function mealPlan(macros, raw) {
  // Adjust meal count based on user preference
  const mealCount = raw.meals || 4; // default to 4 if not set
  // Scale foods by goal (gain -> larger portions)
  const size = raw.goal === 'gain' ? 1.15 : raw.goal === 'lose' ? 0.9 : 1.0;
  const cals = Math.round(macros.calories * size);

  // Base meals
  const baseMeals = [
    { name: 'Breakfast', items: ['Oat porridge or whole-grain toast', '2–3 eggs or tofu scramble', 'Fruit'] },
    { name: 'Lunch', items: ['Lean protein (chicken/fish/legumes)', 'Complex carb (rice/potato/quinoa)', 'Veggies + olive oil'] },
    { name: 'Dinner', items: ['Protein + veggies (lighter carb if losing)', 'Salad or roasted veg'] },
    { name: 'Snacks', items: ['Greek yogurt / protein shake / nuts / fruit'] }
  ];

  // Adjust for diet preference
  let meals = [...baseMeals];
  if (raw.diet === 'vegetarian' || raw.diet === 'vegan') {
    meals = meals.map(m => ({
      ...m,
      items: m.items.map(item => item.replace(/chicken\/fish/g, 'tofu/tempeh').replace(/eggs/g, 'tofu scramble'))
    }));
  }

  // Adjust meal count
  if (mealCount === 3) {
    meals = [
      { name: 'Breakfast', items: ['Oat porridge or whole-grain toast', '2–3 eggs or tofu scramble', 'Fruit'] },
      { name: 'Lunch', items: ['Lean protein (chicken/fish/legumes)', 'Complex carb (rice/potato/quinoa)', 'Veggies + olive oil'] },
      { name: 'Dinner', items: ['Protein + veggies (lighter carb if losing)', 'Salad or roasted veg', 'Snacks included'] }
    ];
  } else if (mealCount === 5) {
    meals = [
      ...baseMeals.slice(0, 3),
      { name: 'Afternoon Snack', items: ['Greek yogurt / protein shake / nuts'] },
      { name: 'Evening Snack', items: ['Fruit / cottage cheese'] }
    ];
  } else if (mealCount === 6) {
    meals = [
      ...baseMeals.slice(0, 3),
      { name: 'Afternoon Snack', items: ['Greek yogurt / protein shake / nuts'] },
      { name: 'Evening Snack', items: ['Fruit / cottage cheese'] },
      { name: 'Late Night', items: ['Casein shake or small protein source'] }
    ];
  }

  return {
    calories: cals,
    meals
  };
}
