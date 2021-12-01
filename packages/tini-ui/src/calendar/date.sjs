/* eslint-disable */
export function compareDate(a, b) {
  // eslint-disabled next-line
  const fDate = getDate(a);
  const sDate = getDate(b);
  fDate.setHours(0, 0, 0, 0);
  sDate.setHours(0, 0, 0, 0);
  if (fDate.getTime() === sDate.getTime()) return 0;
  if (fDate.getTime() > sDate.getTime()) return 1;
  if (fDate.getTime() < sDate.getTime()) return -1;
}
