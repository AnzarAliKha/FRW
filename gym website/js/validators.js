// validators.js - returns array of error strings
export function validate(inputs) {
  const errs = [];
  if (!inputs.gender) errs.push('Select gender.');
  if (!inputs.age || inputs.age < 10 || inputs.age > 120) errs.push('Enter a valid age (10–120).');
  if (!inputs.height || inputs.height <= 0) errs.push('Enter a valid height.');
  if (!inputs.weight || inputs.weight <= 0) errs.push('Enter a valid weight.');
  // optional measurement warnings handled elsewhere
  return errs;
}
