/* eslint-disable */

export const isKindView = (field) => {
  return field.source.field === 'ekyc' || (field.source.field !== 'ekyc' && field.value);
};

export const isKindInput = (field) => {
  return ['input', 'number'].includes(field.kind);
};

export const isKindDropdown = (field) => {
  return ['dropdown'].includes(field.kind);
};

export const isKindRadio = (field) => {
  return ['multiple_choice'].includes(field.kind);
};
