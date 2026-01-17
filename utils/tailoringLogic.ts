
import { BlouseMeasurements } from '../types';

/**
 * Rounds a number to the nearest 0.25 (quarter inch) for professional tailoring accuracy.
 */
const roundToQuarter = (num: number): number => {
  return Math.round(num * 4) / 4;
};

export const calculateBlouseMeasurements = (bustSize: number): BlouseMeasurements => {
  if (!bustSize || bustSize <= 0) {
    return {
      bustSize: 0,
      armhole: 0,
      frontNeckDepth: 0,
      backNeckDepth: 0,
      neckWidth: 0,
      shoulderWidth: 0,
      totalShoulder: 0,
      sleeveLength: 0,
      dartSize: 0,
      seamMargin: 0,
      apexVertical: 0,
      apexHorizontal: 0,
    };
  }

  const B = bustSize;
  const nw = roundToQuarter((B / 18) + 0.5);
  const sw = roundToQuarter(B / 12);

  return {
    bustSize: B,
    armhole: roundToQuarter((B / 8) + 1),
    frontNeckDepth: roundToQuarter((B / 12) + 3),
    backNeckDepth: roundToQuarter((B / 12) + 6),
    neckWidth: nw,
    shoulderWidth: sw,
    totalShoulder: nw + sw,
    sleeveLength: roundToQuarter((B / 8) + 1),
    dartSize: roundToQuarter(B / 24),
    seamMargin: 1.5,
    apexVertical: roundToQuarter(B / 4),
    apexHorizontal: roundToQuarter((B / 12) + 0.5),
  };
};
