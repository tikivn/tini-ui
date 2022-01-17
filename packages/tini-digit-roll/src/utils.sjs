
// 456,6,',' => '000,456'
export const formatDigit = (num, length, divider) => {
  let sum = '0' // in case some random input
  if (typeof num === 'string') {
    sum = num
  } else if (typeof num === 'number') {
    sum = num.toString()
  }
  // '1234' => '001234'
  const _len = sum.length
  const _fullLen = length && typeof length === 'number' ? length : _len
  if (_len >= _fullLen) {
    sum = sum.substring(_len - _fullLen, _len)
  } else {
    for (let i = 0; i < _fullLen - _len; i++) {
      sum = '0' + sum
    }
  }
  sum = sum.split('').reverse()
  for (let i = sum.length - 1; i > 0; i--) {
    if (i % 3 === 0) {
      sum.splice(i, 0, divider)
    }
  }
  return sum
}

const _getArr = (a, b) => Array(b - a + 1).fill(0).map((i, index) => a + index)

export const getArr = (x, y) => {
  const a = parseInt(x, 10)
  const b = parseInt(y, 10)
  if (a === b) {
    return [a]
  }
  if (a < b) {
    return _getArr(a, b)
  }
  if (a >= b) {
    return [..._getArr(a, 9), ..._getArr(0, b)]
  }
}

export default {
  formatDigit,
  getArr,
}