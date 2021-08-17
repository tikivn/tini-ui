import API from '../_util/api';

export type AddressItem = {
  id: number;
  name: string;
  tiki_code: string;
  geo_lat?: string;
  geo_long?: string;
};

export default class AddressServices {
  api = new API();
  baseUrl = 'https://api.tiki.vn/directory/v1/countries/VN';
  firstCities: string[] = ['Hồ Chí Minh', 'Hà Nội'];
  cities: AddressItem[] = [];
  districts: Record<number, AddressItem[]> = {};
  wards: Record<number, AddressItem[]> = {};

  constructor({ firstCities }: { firstCities: string[] }) {
    if (firstCities) {
      this.firstCities = firstCities;
    }
  }

  async getCities(): Promise<AddressItem[]> {
    try {
      if (this.cities.length) {
        return Promise.resolve(this.cities);
      }

      const rs = await this.api.get(`${this.baseUrl}/regions`);
      const firstCities = this.firstCities.reduce(
        (acc: Record<string, AddressItem>, item: string) => {
          acc[item] = { id: 0, name: '', tiki_code: '' };
          return acc;
        },
        {},
      );
      const sorted = rs.data.reduce((arr: AddressItem[], item: AddressItem) => {
        if (firstCities[item.name]) {
          firstCities[item.name] = item;
        } else {
          arr.push(item);
        }
        return arr;
      }, []);
      this.cities.push(...sorted);
      this.cities.unshift(...this.firstCities.map((k) => firstCities[k]));
      return this.cities;
    } catch (err) {
      return [];
    }
  }

  async getDistricts(cityId: number): Promise<AddressItem[]> {
    try {
      if (this.districts[cityId]) {
        return this.districts[cityId];
      }

      const rs = await this.api.get(`${this.baseUrl}/regions/${cityId}/districts`);
      this.districts[cityId] = rs.data;
      return this.districts[cityId];
    } catch {
      return [];
    }
  }

  async getWards(cityId: number, districtId: number): Promise<AddressItem[]> {
    try {
      if (this.wards[districtId]) {
        return this.wards[districtId];
      }

      const rs = await this.api.get(
        `${this.baseUrl}/regions/${cityId}/districts/${districtId}/wards`,
      );
      this.wards[districtId] = rs.data;
      return this.wards[districtId];
    } catch {
      return [];
    }
  }
}
