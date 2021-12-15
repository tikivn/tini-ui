import { isNotEmpty } from '../_util/validate';
import AddressService, { AddressItem } from './services';

type AddressValue = {
  street: string;
  city: AddressItem;
  district: AddressItem;
  ward: AddressItem;
  full_name?: string;
  phone_number?: string;
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
  full_name?: string;
  phone_number?: string;
  // Label and Placeholder
  streetLabel?: string;
  streetPlaceholder?: string;
  cityLabel?: string;
  cityPlaceholder?: string;
  districtLabel?: string;
  districtPlaceholder?: string;
  wardLabel?: string;
  wardPlaceholder?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  // Error
  streetErrorMsg?: string;
  cityErrorMsg?: string;
  districtErrorMsg?: string;
  wardErrorMsg?: string;
  nameErrorMsg?: string;
  phoneErrorMsg?: string;
  // Extend fields
  showName?: boolean;
  showPhone?: boolean;
  // Events
  onChangeStreet?: (street: string) => void;
  onChangeName?: (name: string) => void;
  onChangePhone?: (phone: string) => void;
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
    showName: true,
    nameLabel: 'Tên người nhận',
    namePlaceholder: 'Nhập họ & tên người nhận',
    full_name: '',
    showPhone: true,
    phoneLabel: 'Số điện thoại liên lạc',
    phonePlaceholder: 'Nhập số điện thoại người nhận',
    phone_number: '',
  } as AddresProps,
  data: {
    value: {
      street: '',
      city: null,
      district: null,
      ward: null,
      full_name: '',
      phone_number: '',
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
    this.initDataFromProps(true);
  },
  deriveDataFromProps({
    street,
    city,
    district,
    ward,
    full_name,
    phone_number,
    showPhone,
    showName,
  }) {
    if (
      street !== this.data.value.street ||
      city !== this.data.value.city ||
      district !== this.data.value.district ||
      ward !== this.data.value.ward ||
      (showName && full_name !== this.data.value.full_name) ||
      (showPhone && phone_number !== this.data.value.phone_number)
    ) {
      this.initDataFromProps(
        city &&
          this.data.value.city &&
          city !== this.data.value.city.id &&
          city.id !== this.data.value.city.id,
      );
    }
  },
  methods: {
    async initDataFromProps(isShowLoading) {
      const {
        street = '',
        city,
        district,
        ward,
        full_name,
        phone_number,
        showName,
        showPhone,
      } = this.props;

      const promiseAll = [this.getCities()];
      if (this.getId(city)) {
        promiseAll.push(this.getDistricts(this.getId(city)));
        if (this.getId(district)) {
          promiseAll.push(this.getWards(this.getId(district)));
        }
      }

      if (isShowLoading) my.showLoading({ content: 'Đang tải...' });

      await Promise.all(promiseAll);

      my.hideLoading();

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
      if (showName) {
        value.full_name = full_name ?? '';
      }
      if (showPhone) {
        value.phone_number = phone_number ?? '';
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
    async getWards(districtId) {
      const wards = await this.addressService.getWards(districtId);
      this.setData({ wards });
    },

    onChangeAddress() {
      const { onChangeAddress, onFullAddress, showName, showPhone } = this.props;
      const { value } = this.data;
      const { street, city, district, ward, full_name, phone_number } = value;
      const data = {
        street,
        city,
        district,
        ward,
        ...(showName ? { full_name } : {}),
        ...(showPhone ? { phone_number } : {}),
      };

      onChangeAddress && onChangeAddress(data);

      if (onFullAddress) {
        const isFull =
          [
            isNotEmpty(data.street),
            isNotEmpty(data.city),
            isNotEmpty(data.district),
            isNotEmpty(data.ward),
            showName ? isNotEmpty(data.full_name) : true,
            showPhone ? isNotEmpty(data.phone_number) : true,
          ].indexOf(false) < 0;
        isFull && onFullAddress(data);
      }
    },
    changeStreet(e) {
      const street = e.detail.value;

      this.setData({ value: { ...this.data.value, street } }, () => {
        if (this.props.onChangeStreet) {
          this.props.onChangeStreet(street);
        }
        this.onChangeAddress();
      });
    },
    changeName(e) {
      const full_name = e.detail.value;

      this.setData({ value: { ...this.data.value, full_name } }, () => {
        if (this.props.onChangeName) {
          this.props.onChangeName(full_name);
        }
        this.onChangeAddress();
      });
    },
    changePhone(e) {
      const phone_number = e.detail.value;

      this.setData({ value: { ...this.data.value, phone_number } }, () => {
        if (this.props.onChangePhone) {
          this.props.onChangePhone(phone_number);
        }
        this.onChangeAddress();
      });
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
      this.getWards(district.id);
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
