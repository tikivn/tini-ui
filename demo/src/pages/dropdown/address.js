import { get } from './api';

// https://api.tala.xyz/directory/v1/countries/VN/regions
// https://api.tiki.vn/directory/v1/countries/VN/regions
const API_URL = 'https://api.tala.xyz/directory/v1/countries/VN';

const cities = [];
const districts = {};
const wards = {};

// class Services {
//   environment = 'dev';
//   cities = [];
//   districts = {};
//   wards = {};

//   constructor(environment = 'dev') {
//     this.environment = environment;
//   }

//   async getCities() {
//   }
// }

export const getCities = async () => {
  try {
    if (cities.length) {
      return Promise.resolve(cities);
    }

    const rs = await get(`${API_URL}/regions`);
    const sorted = rs.data.reduce((arr, item) => {
      if (item.name.includes('Hồ Chí Minh') || item.name.includes('Hà Nội')) {
        arr.unshift(item);
      } else {
        arr.push(item);
      }
      return arr;
    }, []);
    cities.push(...sorted);
    return cities;
  } catch (err) {
    return [];
  }
};

export const getDistricts = async (cityId) => {
  try {
    if (districts[cityId]) {
      return districts[cityId];
    }

    const rs = await get(`${API_URL}/regions/${cityId}/districts`);
    districts[cityId] = rs.data;
    return districts[cityId];
  } catch {
    return [];
  }
};

export const getWards = async (cityId, districtId) => {
  try {
    if (wards[districtId]) {
      return wards[districtId];
    }

    const rs = await get(`${API_URL}/regions/${cityId}/districts/${districtId}/wards`);
    wards[districtId] = rs.data;
    return wards[districtId];
  } catch {
    return [];
  }
};
