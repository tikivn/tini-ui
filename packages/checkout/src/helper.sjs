/* eslint-disable */

export const locationFormatter = (
  address = {
    street: '',
    city: {},
    district: {},
    ward: {},
  },
) => {
  if (!address.street) return '';

  return [address.street, address.ward.name, address.district.name, address.city.name]
    .filter(Boolean)
    .join(', ');
};

export const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const isHasValue = (value) => value !== null && typeof value !== 'undefined';

export const isNotEmpty = (value) => isHasValue(value) && (value + '').trim().length > 0;

export const moneyFormatter = (number, currency = ' ₫') => {
  if (!isNotEmpty(number)) return '';
  return parseInt(number).toLocaleString('vi-VN') + currency;
};

const pad = (n) => {
  return n < 10 ? '0' + n : n;
};

export const getDateStringFromTimestamp = (timestamp, char = '/', shortDay = false) => {
  if (!timestamp) {
    return 'dd/mm/yyyy';
  }
  const dateObject = getDate(timestamp);
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();

  return pad(date) + char + pad(month) + char + dateObject.getFullYear();
};

export const getTimeStringFromTimestamp = (timestamp, char = '/') => {
  if (!timestamp) {
    return 'dd/mm/yyyy';
  }
  const dateObject = getDate(timestamp);
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();

  const hour = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  return pad(date) + char + pad(month) + char + dateObject.getFullYear() + ', ' + pad(hour) + ':' + pad(minutes) ;
};
