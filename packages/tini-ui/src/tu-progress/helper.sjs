const properties = {
  'in-progress': {
    barActiveBackground: 'var(--color-progress-base-background-active)',
    iconType: 'close_circle',
    iconColor: 'var(--color-alias-brand)',
  },
  success: {
    barActiveBackground: 'var(--color-progress-base-background-success)',
    iconType: 'success_glyph',
    iconColor: 'var(--color-progress-icon-success)',
  },
  error: {
    barActiveBackground: 'var(--color-progress-base-background-fail)',
    iconType: 'warning_glyph',
    iconColor: 'var(--color-progress-icon-fail)',
  },
};

export const getProperties = (status, propertyName, defaultValue) => {
  if (properties[status] && properties[status][propertyName])
    return properties[status][propertyName];

  return defaultValue || '';
};
