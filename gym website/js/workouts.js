// workouts.js - returns program object based on age, experience, location, goal
export function programFor(raw, metrics) {
  const age = raw.age;
  const exp = raw.experience;
  // difficulty modifier: younger => more intensity; older => conservative
  let baseIntensity = 1.0;
  if (age < 30) baseIntensity = 1.15;
  else if (age >= 50) baseIntensity = 0.85;
  else baseIntensity = 1.0;

  // experience modifier
  const expFactor = exp === 'beginner' ? 0.8 : exp === 'intermediate' ? 1.0 : 1.15;

  const intensity = +(baseIntensity * expFactor).toFixed(2);

  // decide split
  const isBeginner = exp === 'beginner';
  const daysPerWeek = isBeginner ? 3 : 4;

  // Program skeleton
  const program = {
    title: isBeginner ? 'Beginner Full-Body (8 weeks)' : 'Progressive Upper/Lower (8 weeks)',
    daysPerWeek,
    intensity,
    sessions: []
  };

  if (isBeginner) {
    program.sessions = [
      { name: 'Day A - Strength', exercises: [
        'Squat 3×8–10','Bench Press 3×8–10','Bent-over Row 3×8–10','Plank 3×30s'
      ]},
      { name: 'Day B - Volume', exercises: [
        'Goblet Squat 3×12','Push-ups 3×10–15','Inverted Row 3×8–12','Glute Bridge 3×12'
      ]},
      { name: 'Day C - Conditioning & Mobility', exercises: [
        'Bike/Run 20 min','Mobility routine 10–15 min','Core circuit 3 rounds'
      ]}
    ];
  } else {
    program.sessions = [
      { name: 'Upper A', exercises: ['Bench 4×6–8','Row 4×8–10','Overhead Press 3×6–8','Face Pulls 3×12'] },
      { name: 'Lower A', exercises: ['Back Squat 4×5–8','Deadlift/Trap 3×5–6','Leg Curl 3×10','Calf Raises 4×12'] },
      { name: 'Upper B', exercises: ['Incline DB 3×8–10','Chin-ups 3×Max','Lateral Raises 3×12','Biceps/Triceps 3×10'] },
      { name: 'Lower B', exercises: ['Front Squat/Leg Press 3×8–10','RDL 3×8–10','Walking Lunges 3×12','Core 10–15 min'] }
    ];
  }

  // scale reps/sets slightly with intensity (we'll return textual guidance)
  program.guidance = `Intensity factor: ${intensity}. For heavier intensity (>1.1) prefer heavier loads and slightly lower reps; for lower intensity (<0.95) reduce load and increase rest/volume conservatively.`;

  // adapt for goal
  if (raw.goal === 'lose') program.guidance += ' Add 2–3 weekly short cardio sessions (10–20 min) or conditionals on non-training days.';
  if (raw.goal === 'gain') program.guidance += ' Ensure progressive overload and maintain a small calorie surplus.';

  return program;
}
