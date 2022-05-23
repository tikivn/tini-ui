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
  isShowDropdown: boolean;
};

type AddresProps = {
  firstCities: string[];
  listCities: AddressItem[];
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

const diffValue = (value: any, newValue: any) => {
  if (value === null || value === undefined) {
    return false;
  }
  const oldV = value.id ? value.id : value;
  const newV = newValue && newValue.id ? newValue.id : newValue;
  return oldV !== newV;
};

Component({
  props: {
    street: '',
    city: null,
    district: null,
    ward: null,
    listCities: null,
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
    isShowDropdown: false,
  } as AddressData,
  async didMount() {
    const { firstCities } = this.props;

    this.addressService = new AddressService({
      firstCities,
    });
    this.initDataFromProps(true);
  },
  deriveDataFromProps(props) {
    if (this.isChangingData) {
      return;
    }
    const { street, city, district, ward, full_name, phone_number, showPhone, showName } = props;
    const diffStreet = street && diffValue(street, this.data.value.street);
    const diffCity = city && diffValue(city, this.data.value.city);
    const diffDistrict = district && diffValue(district, this.data.value.district);
    const diffWard = ward && diffValue(ward, this.data.value.ward);
    const diffName = showName && full_name !== this.data.value.full_name;
    const diffPhone = showPhone && phone_number !== this.data.value.phone_number;
    if (diffStreet || diffCity || diffDistrict || diffWard || diffName || diffPhone) {
      this.initDataFromProps(
        city &&
          this.data.value.city &&
          city !== this.data.value.city.id &&
          city.id !== this.data.value.city.id,
      );
    }
  },
  methods: {
    addressService: null,
    isChangingData: '',
    async initDataFromProps(isShowLoading) {
      this.isChangingData = true;
      const {
        street = '',
        city,
        district,
        ward,
        full_name,
        phone_number,
        showName,
        showPhone,
        listCities,
      } = this.props;

      const promiseAll = [this.getCities];
      if (this.getId(city)) {
        promiseAll.push(this.getDistricts(this.getId(city)));
        if (this.getId(district)) {
          promiseAll.push(this.getWards(this.getId(district)));
        }
      }

      if (isShowLoading) my.showLoading({ content: 'Đang tải...' });

      if (listCities) {
        this.setData({
          cities: listCities,
        });
        console.log('aaaa');
      } else await Promise.all(promiseAll);

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
      this.isChangingData = false;
    },
    getId(item: number | AddressItem) {
      if (!item) {
        return null;
      }
      return typeof item === 'number' || typeof item === 'string' ? +item : item && item['id'];
    },
    onTapDropdown() {
      this.setData({ isShowDropdown: true });
    },
    onHideDropdown() {
      this.setData({ isShowDropdown: false });
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

      setTimeout(() => {
        this.onHideDropdown();
      }, 100);
      this.isChangingData = false;
    },
    changeStreet(e) {
      this.isChangingData = true;
      const street = e.detail.value;

      this.setData({ value: { ...this.data.value, street } }, () => {
        if (this.props.onChangeStreet) {
          this.props.onChangeStreet(street);
        }
        this.onChangeAddress();
      });
    },
    changeName(e) {
      this.isChangingData = true;
      const full_name = e.detail.value;

      this.setData({ value: { ...this.data.value, full_name } }, () => {
        if (this.props.onChangeName) {
          this.props.onChangeName(full_name);
        }
        this.onChangeAddress();
      });
    },
    changePhone(e) {
      this.isChangingData = true;
      const phone_number = e.detail.value;

      this.setData({ value: { ...this.data.value, phone_number } }, () => {
        if (this.props.onChangePhone) {
          this.props.onChangePhone(phone_number);
        }
        this.onChangeAddress();
      });
    },
    async selectCity(city) {
      this.isChangingData = true;
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
      this.isChangingData = true;
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
      this.isChangingData = true;
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
