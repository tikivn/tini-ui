declare namespace my {
  interface IAddress {
    id: string;
    full_name: string;
    city: string;
    city_id: number;
    district: string;
    district_id: number;
    ward: string;
    ward_id: number;
    region_id: number;
    street: string;
    company: string;
    delivery_address_type: 'home' | 'company';
    phone_number: string;
    is_default: boolean;
    geo_lat: number;
    geo_long: number;
  }
  interface IGetAddressSuccessResult {
    data: IAddress[];
    paging: {
      current_page: number;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
    };
  }

  interface IGetAddressOptions {
    success?(res?: IGetAddressSuccessResult): void;
    fail?(): void;
    complete?(): void;
  }

  function getAddress(options: IGetAddressOptions): void;
}
