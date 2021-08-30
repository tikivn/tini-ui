function formatUnit(unit) {
  const value = parseInt(unit);
  if (unit.endsWith('rpx')) {
    return `calc(var(--tf-device-width) / 750 * ${value})`;
  }

  return `${value}px`;
}

function formatAddress(address = {}) {
  return [
    address.street || '',
    address.ward || '',
    address.district || '',
    address.city || '',
  ].join(', ');
}

export default {
  formatUnit,
  formatAddress,
};
