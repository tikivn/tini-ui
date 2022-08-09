export function isSelected(value, item, idKey) {
  try {
    if (Array.isArray(value)) {
      return value.includes(item) || value.some((v) => v[idKey] === item[idKey]);
    }

    const isObjectEqual =
      typeof item === 'object' && (value[idKey] === item[idKey] || value === item[idKey]);
    const isValueEqual = value === item;
    return value && (isValueEqual || isObjectEqual);
  } catch (error) {
    console.log('error :>> ', error);
  }
}
