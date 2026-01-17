
import { BlouseMeasurements } from '../types';

/**
 * Rounds a number to the nearest 0.25 (quarter inch) for professional tailoring accuracy.
 * This ensures values like 2.72 are rounded to 2.75 instead of dropping down to 2.5.
 */
const roundToQuarter = (num: number): number => {
  return Math.round(num * 4) / 4;
};

/**
 * Calculates blouse measurements based on requested B (Bust size) formulas:
 * - Armhole = round((B / 8) + 1)
 * - FrontNeck = round((B / 12) + 3)
 * - BackNeck = round((B / 12) + 6)
 * - NeckWidth = round((B / 18) + 0.5)
 * - Shoulder = round(B / 12)
 * - Apex_V = round(B / 4)
 * - Apex_H = round((B / 12) + 0.5)  <-- Updated for folded fabric (Half Span)
 * - Sleeve Length = round((B / 8) + 1)
 * - Dart Width = round(B / 24)
 */
export const calculateBlouseMeasurements = (bustSize: number): BlouseMeasurements => {
  if (!bustSize || bustSize <= 0) {
    return {
      bustSize: 0,
      armhole: 0,
      frontNeckDepth: 0,
      backNeckDepth: 0,
      neckWidth: 0,
      shoulderWidth: 0,
      sleeveLength: 0,
      dartSize: 0,
      seamMargin: 0,
      apexVertical: 0,
      apexHorizontal: 0,
    };
  }

  const B = bustSize;

  return {
    bustSize: B,
    armhole: roundToQuarter((B / 8) + 1),
    frontNeckDepth: roundToQuarter((B / 12) + 3),
    backNeckDepth: roundToQuarter((B / 12) + 6),
    neckWidth: roundToQuarter((B / 18) + 0.5),
    shoulderWidth: roundToQuarter(B / 12),
    sleeveLength: roundToQuarter((B / 8) + 1),
    dartSize: roundToQuarter(B / 24),
    seamMargin: 1.5,
    apexVertical: roundToQuarter(B / 4),
    apexHorizontal: roundToQuarter((B / 12) + 0.5),
  };
};
