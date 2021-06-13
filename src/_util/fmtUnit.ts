/* eslint-disable */
const jsUnitRpx = '<ENV::jsUnitRpx>';

/* eslint-disable no-continue, prefer-spread */
export default function fmtUnit(oldUnit: string) {
  let getUnit = oldUnit;

  if (jsUnitRpx) {
    if (typeof getUnit === 'string' && getUnit === 'px') {
      getUnit = 'rpx';
    } else if (typeof getUnit === 'number') {
      getUnit = (parseInt(getUnit) * 2).toString();
    } else if (typeof getUnit === 'string') {
      const number = oldUnit.match(/(\d+|\d+\.\d+)(px)/)[1];
      getUnit = parseInt(number) * 2 + 'rpx';
    }
  }

  return getUnit;
}
