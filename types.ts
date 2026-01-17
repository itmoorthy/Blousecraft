
export interface BlouseMeasurements {
  bustSize: number;
  armhole: number;
  frontNeckDepth: number;
  backNeckDepth: number;
  neckWidth: number;
  shoulderWidth: number;
  totalShoulder: number; // NW + SW
  sleeveLength: number;
  dartSize: number;
  seamMargin: number;
  apexVertical: number;
  apexHorizontal: number;
}

export enum FitType {
  PERFECT_FIT = 'Perfect Fit'
}
