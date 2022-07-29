declare namespace my {
  type eKYCData = {
    account_type: string;
    address: string;
    card_type: string;
    city: string;
    city_code: string;
    create_date: string;
    customer_id: string;
    district: string;
    district_code: string;
    dob: string;
    ekyc_level1_source: string;
    ekyc_level1_update_date: string;
    ekyc_level2_source: string;
    ekyc_level2_update_date: string;
    email: string;
    expired_date: string;
    full_name: string;
    gender: string;
    id: string;
    id_card: string;
    is_active: boolean;
    issue_date: string;
    issue_place: string;
    native_place: string;
    phone: string;
    street: string;
    update_date: string;
    verified_level: number;
    verified_on: string;
    ward: string;
    ward_code: string;
  };

  type GetKYCDataOptions = {
    form_id: string;
    success?: (res?: eKYCData) => void;
    fail?(res: { error: any }): void;
    complete?(): void;
  };

  const leadgen: {
    getKYCData: (options: GetKYCDataOptions) => void;
  };
}
