import { getForm } from '../_util/apis';

type LeadgenProps = {
  id: string;
  onRejectPermission?: () => void;
};

type Address = { city: number; district: number; ward: number; street: string };

type LeadgenData = {
  form: null | leadgen.Form;
  showPermission: boolean;
  sections: leadgen.Section[];
  addresses: Address | [];
  showSkeleton: boolean;
  showUpdatePhone: boolean;
  showEkycFail: boolean;
  showLoginFail: boolean;
  showSubmitModal: boolean;
  showToastSubmitFail: boolean;
};

type LeadgenMethods = {
  eKYCData: my.eKYCData;
  checkLogIn: () => void;
  getForm: () => void;
  getEKYCData: () => void;
  onPermissionResponse: (response: boolean) => void;
  onChangeField: (event: any) => void;
  onChangeAddress: (event: any) => void;
  onChangeDropdown: (event: any) => void;
  onChangeFieldValue: (field: leadgen.Field, value: any) => void;
  login: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCancelSubmit: () => void;
  buildForm: (ekYCData?: my.eKYCData) => void;
  validateEkyc: (ekYCData?: my.eKYCData) => boolean;
  validateForm: () => boolean;
  onGetAddressBook: (event: any) => void;
  onOkUpdatePhone: () => void;
  onCancelUpdatePhone: () => void;
  onCloseLogin: () => void;
  onRetryLogin: () => void;
  onCloseToastSubmitFail: () => void;
};

Component<LeadgenData, LeadgenProps, LeadgenMethods>({
  props: {
    onRejectPermission: () => {},
  } as LeadgenProps,
  data: {
    showPermission: false,
    form: null,
    sections: [],
    addresses: [],
    showSkeleton: true,
    showUpdatePhone: false,
    showEkycFail: false,
    showLoginFail: false,
    showSubmitModal: false,
    showToastSubmitFail: false,
  },
  didMount() {
    if (this.props.id) {
      this.getForm();
    } else {
      throw Error('Id is required!');
    }
  },
  methods: {
    eKYCData: null,
    async getForm() {
      try {
        const form = await getForm({ id: this.props.id });
        this.setData({ form, showPermission: true });
      } catch (error) {
        // TODO: Handle error
        console.log('error :>> ', error);
      }
    },
    checkLogIn() {
      my.isLoggedIn({
        success: (res: boolean) => {
          if (!res) {
            this.login();
          } else {
            this.getEKYCData();
          }
        },
        fail: () => {
          this.login();
        },
      });
    },
    onPermissionResponse(response: boolean) {
      if (response) {
        this.checkLogIn();
      } else {
        const { onRejectPermission } = this.props;
        onRejectPermission ? onRejectPermission() : my.navigateBack();
      }
    },
    login() {
      if (my.canIUse('login')) {
        my.login({
          success: (res: any) => {
            if (res && res.isLoggedIn) {
              this.getEKYCData();
            } else {
              this.setData({ showLoginFail: true });
            }
          },
          fail: (err: any) => {
            console.error(err);
            this.setData({ showLoginFail: true });
          },
        });
      } else {
        // TODO: Handle fallback
      }
    },
    getEKYCData() {
      // TODO: Handle error
      if (!my.leadgen) {
        return;
      }
      my.leadgen.getKYCData({
        form_id: this.data.form.id,
        success: (ekyc) => {
          console.log('ekyc :>> ', ekyc);
          this.setData({ showEkycFail: true });
          if (ekyc.verified_level < 1) {
            // TODO: Navigate to ekyc
            this.setData({ showEkycFail: true });
          } else if (this.validateEkyc(ekyc)) {
            this.buildForm(ekyc);
            // this.setData({ showPermission: false, showSkeleton: false });
          }
        },
        fail: (err: any) => {
          console.error(err);
          this.setData({ showEkycFail: true });
        },
      });
    },
    validateEkyc(ekYCData?: my.eKYCData) {
      if (!ekYCData) {
        return false;
      }

      const { phone } = ekYCData;

      if (!phone) {
        this.setData({ showUpdatePhone: true });
        return false;
      }

      return true;
    },
    buildForm(ekYCData?: my.eKYCData) {
      const { form } = this.data;
      this.eKYCData = ekYCData;
      const sections: leadgen.AppSection[] = form.sections.map((section) => ({
        ...section,
        fields: form.fields
          .filter((field) => field.section_id === section.id)
          .map((field) => ({
            ...field,
            value: ekYCData && ekYCData[field.source.field] ? ekYCData[field.source.field] : '',
          })),
      }));
      console.log('sections :>> ', sections);
      this.setData({ sections, showSkeleton: false, showPermission: false, showLoginFail: false });
    },
    onOkUpdatePhone() {
      this.setData({ showUpdatePhone: false });
      my.openDeeplink({
        url: 'tikivn://account',
        success: (res) => {
          console.log(res);
        },
        fail: (e) => {
          console.log(e);
        },
      });
    },
    onCancelUpdatePhone() {
      this.setData({ showUpdatePhone: false });
    },
    onGetAddressBook(event) {
      // TODO: Confirm permission
      my.getAddress({
        success: (result: any) => {
          const address = {
            city: result.city_id,
            ward: result.ward_id,
            district: result.district_id,
            street: result.street,
          };
          const { street, ward, district, city } = result;
          const value = [street, ward.name, district.name, city.name].join(', ');
          const field = event.target.dataset.field;

          this.onChangeFieldValue(field, value);
          this.setData({ [`addresses.${field._index}`]: address });
        },
        fail: (error: any) => {
          console.error(error);
        },
      });
    },
    onCloseLogin() {
      this.setData({ showLoginFail: false });
    },
    onRetryLogin() {
      this.login();
    },
    onChangeFieldValue(_field: leadgen.Field, value: any) {
      const { form } = this.data;
      const field = form.fields[_field && _field._index];
      if (field) {
        this.setData(
          {
            [`form.fields.${_field._index}`]: { ...field, a: 1, value },
          },
          () => {
            const newValue = this.data.form.fields[_field._index];
            console.log('newValue :>> ', newValue);
          },
        );
      }
    },
    onChangeField(event) {
      this.onChangeFieldValue(event.target.dataset.field, event.detail.value);
    },
    onChangeDropdown(event) {
      this.onChangeFieldValue(event.target.dataset.field, event.title);
    },
    onChangeAddress(event) {
      const { form } = this.data;
      const field = form.fields.find((f) => f.kind === 'paragraph' && f.custom_kind === 'address');
      const { street, ward, district, city } = event;
      const value = [street, ward.name, district.name, city.name].join(', ');
      this.onChangeFieldValue(field, value);
    },
    onNext() {
      this.setData({ showSubmitModal: true });
    },
    onCancelSubmit() {
      this.setData({ showSubmitModal: false });
    },
    onCloseToastSubmitFail() {
      this.setData({ showToastSubmitFail: false });
    },
    // validateForm() {

    // },
    onSubmit() {
      try {
        const { form } = this.data;

        const inputs = form.fields.map((field) => {
          let value: leadgen.Value = '';
          if (field.source.source === 'ekyc' && this.eKYCData[field.source.field]) {
            value = this.eKYCData[field.source.field];
          } else {
            switch (field.kind) {
              case 'number':
              case 'integer':
              case 'decimal':
                value = +field.value;
                break;
              case 'checkbox':
                value = field.options.reduce((rs: number[], opt: leadgen.Options) => {
                  const index = (field.value as string[]).indexOf(opt.title);
                  if (index > -1) {
                    rs.push(index);
                  }
                  return rs;
                }, []);
                break;
              case 'dropdown':
              case 'multiple_choice':
                value = field.options.reduce((rs: number, opt: leadgen.Options, index: number) => {
                  if (opt.title === field.value) {
                    rs = index;
                  }
                  return rs;
                }, null);
                break;
              default:
                value = field.value;
                break;
            }
          }
          if (value !== null && value !== undefined && `${value}`.length > 0) {
            return { value };
          }
          return {};
        });
        console.log('inputs :>> ', inputs);
        const formValue = {
          form_urn: form.id,
          inputs: JSON.stringify({ inputs }),
        };
        console.log('json :>> ', JSON.stringify(formValue));

        my.leadgen.submitForm({
          ...formValue,
          success: () => {
            // TODO: Confirm with PO about toast
            my.showToast({
              type: 'success',
              content: 'Hồ sơ mua được tạo thành công',
              duration: 3000,
            });
            this.setData({ showSubmitModal: false });
          },

          fail: (err: any) => {
            this.setData({ showSubmitModal: false, showToastSubmitFail: true });
            console.error(err);
          },
        });
      } catch (error) {
        console.error(error);
        this.setData({ showSubmitModal: false, showToastSubmitFail: true });
      }
    },
  },
});
