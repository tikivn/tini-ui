const properties = {
  neutral: {
    background: 'var(--color-toast-background-default)',
    iconType: null,
    iconColor: 'var(--color-toast-icon-default)',
    textColor: 'var(--color-toast-text-default)',
  },

  informative: {
    background: 'var(--color-toast-background-default)',
    iconType: 'info_glyph',
    iconColor: 'var(--color-toast-icon-default)',
    textColor: 'var(--color-toast-text-default)',
  },

  positive: {
    background: 'var(--color-toast-background-positive)',
    iconType: 'success_glyph',
    iconColor: 'var(--color-toast-icon-positive)',
    textColor: 'var(--color-toast-text-positive)',
  },

  negative: {
    background: 'var(--color-toast-background-negative)',
    iconType: 'warning_glyph',
    iconColor: 'var(--color-toast-icon-negative)',
    textColor: 'var(--color-toast-text-negative)',
  },
};

export const getProperties = (type, propertyName) => {
  console.log('type', type);
  if (properties[type] && properties[type][propertyName]) return properties[type][propertyName];

  return properties.neutral[propertyName];
};
