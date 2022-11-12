export function isSelected(value, item, idKey) {
  try {
    if (Array.isArray(value)) {
      return value.includes(item) || value.some((v) => v[idKey] === item[idKey]);
    }

    return value && (value === item || (typeof item === 'object' && value[idKey] === item[idKey]));
  } catch (error) {
    console.log('error :>> ', error);
  }
}
