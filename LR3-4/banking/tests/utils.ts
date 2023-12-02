export const isNear = (val1: number, val2: number, epsilon: number): boolean => {
  return Math.abs(val1 - val2) <= epsilon;
};
