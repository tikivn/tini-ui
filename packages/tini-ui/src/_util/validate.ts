export const isHasValue = (value?: unknown): boolean => value !== null && value !== undefined;

export const isNotEmpty = (value?: unknown): boolean =>
  isHasValue(value) && `${value}`.trim().length > 0;
