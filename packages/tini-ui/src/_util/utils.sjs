function formatUnit(unit) {
  const value = parseInt(unit);
  if (unit.endsWith('rpx')) {
    return `calc(var(--tf-device-width) / 750 * ${value})`;
  }

  return `${value}px`;
}

export default {
  formatUnit,
};
