import AddressService, { AddressItem } from './services';

type AddressValue = {
  street: string;
  city: AddressItem;
  district: AddressItem;
  ward: AddressItem;
};

type AddressData = {
  value: AddressValue;
  cities: AddressItem[];
  districts: AddressItem[];
  wards: AddressItem[];
};

type AddresProps = {
  firstCities: string[];
  // Value
  street: string;
  city: number | AddressItem;
  district: number | AddressItem;
  ward: number | AddressItem;
  // Label and Placeholder
  streetLabel?: string;
  streetPlaceholder?: string;
  cityLabel?: string;
  cityPlaceholder?: string;
  districtLabel?: string;
  districtPlaceholder?: string;
  wardLabel?: string;
  wardPlaceholder?: string;
  // Error
  streetErrorMsg?: string;
  cityErrorMsg?: string;
  districtErrorMsg?: string;
  wardErrorMsg?: string;
  // Events
  onChangeStreet?: (street: string) => void;
  onChangeCity?: (city: AddressItem) => void;
  onChangeDistrict?: (district: AddressItem) => void;
  onChangeWard?: (ward: AddressItem) => void;
  onChangeAddress?: (address: AddressValue) => void;
  onFullAddress?: (address: AddressValue) => void; // Call when address were filled full data
};

Component({
  props: {
    street: '',
    city: null,
    district: null,
    ward: null,
    streetLabel: 'Địa chỉ',
    streetPlaceholder: 'Địa chỉ',
    cityLabel: 'Tỉnh / Thành phố',
    cityPlaceholder: 'Chọn Tỉnh / Thành phố',
    districtLabel: 'Quận / Huyện',
    districtPlaceholder: 'Chọn Quận / Huyện',
    wardLabel: 'Phường / Xã',
    wardPlaceholder: 'Chọn Phường / Xã',
    streetErrorMsg: '',
    cityErrorMsg: '',
    districtErrorMsg: '',
    wardErrorMsg: '',
  } as AddresProps,
  data: {
    value: {
      street: '',
      city: null,
      district: null,
      ward: null,
    },
    cities: [],
    districts: [],
    wards: [],
  } as AddressData,
  addressService: null,
  async didMount() {
    const { firstCities } = this.props;

    this.addressService = new AddressService({
      firstCities,
    });

    this.initDataFromProps();
  },
  deriveDataFromProps({ street, city, district, ward }) {
    if (
      street !== this.data.value.street ||
      city !== this.data.value.city ||
      district !== this.data.value.district ||
      ward !== this.data.value.ward
    ) {
      this.initDataFromProps();
    }
  },
  methods: {
    async initDataFromProps() {
      const { street = '', city, district, ward } = this.props;

      const promiseAll = [this.getCities()];
      if (this.getId(city)) {
        promiseAll.push(this.getDistricts(this.getId(city)));
        if (this.getId(district)) {
          promiseAll.push(this.getWards(this.getId(city), this.getId(district)));
        }
      }
      await Promise.all(promiseAll);

      const value = { ...this.data.value, street };
      if (city) {
        value.city = this.data.cities.find((c) => c.id === this.getId(city)) ?? null;
      }
      if (district) {
        value.district = this.data.districts.find((c) => c.id === this.getId(district)) ?? null;
      }
      if (ward) {
        value.ward = this.data.wards.find((c) => c.id === this.getId(ward)) ?? null;
      }
      this.setData({ value });
    },
    getId(item: number | AddressItem) {
      if (!item) {
        return null;
      }
      return typeof item === 'number' || typeof item === 'string' ? +item : item && item['id'];
    },
    async getCities() {
      const cities = await this.addressService.getCities();
      this.setData({ cities });
    },
    async getDistricts(cityId) {
      const districts = await this.addressService.getDistricts(cityId);
      this.setData({ districts });
    },
    async getWards(cityId, districtId) {
      const wards = await this.addressService.getWards(cityId, districtId);
      this.setData({ wards });
    },
    onChangeAddress() {
      const { onChangeAddress, onFullAddress } = this.props;
      const { value } = this.data;

      if (onChangeAddress) {
        onChangeAddress(value);
      }
      if (onFullAddress && value.street && value.city && value.district && value.ward) {
        onFullAddress(value);
      }
    },
    changeStreet(e) {
      const street = e.detail.value;

      this.setData({ value: { ...this.data.value, street } });
      if (this.props.onChangeStreet) {
        this.props.onChangeStreet(street);
      }
      this.onChangeAddress();
    },
    async selectCity(city) {
      const value = {
        ...this.data.value,
        city,
        district: null,
        ward: null,
      };
      this.setData({ value, wards: [] }, () => {
        if (this.props.onChangeCity) {
          this.props.onChangeCity(city);
        }
        this.onChangeAddress();
      });
      this.getDistricts(city.id);
    },
    async selectDistrict(district) {
      const value = {
        ...this.data.value,
        district,
        ward: null,
      };
      this.setData({ value }, () => {
        if (this.props.onChangeDistrict) {
          this.props.onChangeDistrict(district);
        }
        this.onChangeAddress();
      });
      this.getWards(value.city.id, district.id);
    },
    async selectWard(ward) {
      const value = {
        ...this.data.value,
        ward,
      };
      this.setData({ value }, () => {
        if (this.props.onChangeWard) {
          this.props.onChangeWard(ward);
        }
        this.onChangeAddress();
      });
    },
  },
});
