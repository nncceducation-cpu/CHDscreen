// CPS / supplied CHDscreen chart, reviewed 2026-10-31.
export function classify(hand, foot, attempt = 1) {
  if (![hand, foot].every(v => typeof v === 'number' && Number.isInteger(v) && v >= 1 && v <= 100) || !Number.isInteger(attempt) || attempt < 1 || attempt > 3) throw new Error('Enter whole-number saturations from 1 to 100 and a valid attempt.');
  if (Math.min(hand, foot) < 90) return 'fail';
  if (Math.max(hand, foot) >= 95 && Math.abs(hand - foot) <= 3) return 'pass';
  return attempt === 3 ? 'fail' : 'repeat';
}
