/* eslint-disable */

export const isKindView = (field) => {
  // return field.source.source === 'ekyc' || (field.source.source !== 'ekyc' && field.value);
  return field.source.source === 'ekyc';
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

export const isKindCheckbox = (field) => {
  return ['checkbox'].includes(field.kind);
};

export const isKindAddress = (field) => {
  return field.kind === 'paragraph' && field.custom_kind === 'address';
};
