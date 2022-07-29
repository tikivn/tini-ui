import { getForm } from '../_util/apis';

type LeadgenProps = {
  id: string;
  onRejectPermission?: () => void;
};

type LeadgenData = {
  form: null | leadgen.Form;
  showPermission: boolean;
  sections: leadgen.Section[];
};

type LeadgenMethods = {
  checkLogIn: () => void;
  getForm: () => void;
  getEKYCData: () => void;
  onPermissionResponse: (response: boolean) => void;
  login: () => void;
  buildForm: (ekYCData?: my.eKYCData) => void;
};

Component<LeadgenData, LeadgenProps, LeadgenMethods>({
  props: {
    onRejectPermission: () => {},
  } as LeadgenProps,
  data: {
    showPermission: false,
    form: null,
    sections: [],
  },
  didMount() {
    if (this.props.id) {
      this.getForm();
    } else {
      throw Error('Id is required!');
    }
  },
  methods: {
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
      this.setData({ showPermission: false });
      if (response) {
        this.checkLogIn();
      } else {
        const { onRejectPermission } = this.props;
        onRejectPermission ? onRejectPermission() : my.navigateBack();
      }
    },
    login() {
      my.login({
        success: (res) => {
          this.setData({ showPermission: true });
        },
        fail: (res) => {},
      });
    },
    getEKYCData() {
      my.leadgen.getKYCData({
        form_id: this.data.form.id,
        success: (rs) => {
          console.log('rs :>> ', rs);
          if (rs.verified_level < 1) {
            // TODO: Navigate to ekyc
          } else {
            this.buildForm(rs);
          }
        },
        fail: (err: any) => {
          console.log('err :>> ', err);
          this.buildForm();
        },
      });
    },
    buildForm(ekYCData?: my.eKYCData) {
      const sections: leadgen.AppSection[] = [
        {
          id: '1',
          name: 'Thông tin cá nhân',
          index: 0,
          fields: this.data.form.fields.map((f) => ({
            ...f,
            value: ekYCData && ekYCData[f.source.field] ? ekYCData[f.source.field] : '',
          })),
        },
      ];
      console.log('sections :>> ', JSON.stringify(sections));
      // this.setData({ sections });
      this.setData({
        sections: [
          {
            id: '1',
            name: 'Thông tin cá nhân',
            index: 0,
            fields: [
              {
                question: 'Họ và tên',
                kind: 'paragraph',
                required: true,
                custom_kind: null,
                source: { source: 'ekyc', field: 'full_name' },
                pValue: null,
                value: 'NGUYỄN VŨ HƯNG',
              },
              {
                question: 'Tuổi của bạn?',
                kind: 'number',
                required: false,
                custom_kind: null,
                source: { source: 'input', field: '' },
                nMin: 1,
                nMax: 100,
                nValue: null,
                value: '',
              },
              {
                question: 'Pi?',
                kind: 'number',
                required: false,
                custom_kind: null,
                source: { source: 'input', field: '' },
                nMin: 3,
                nMax: 4,
                nValue: null,
                value: '',
              },
              {
                question: 'Hình đại diện?',
                kind: 'file',
                required: false,
                sub_kind: '',
                custom_kind: '',
                source: { source: 'input', field: '' },
                fValue: null,
                value: '',
              },
              {
                question: 'Ngày sinh',
                kind: 'datetime',
                required: true,
                custom_kind: null,
                source: { source: 'ekyc', field: 'dob' },
                dtMin: null,
                dtMax: null,
                dtValue: null,
                value: '17/11/1992',
              },
              {
                question: 'Giới tính',
                kind: 'multiple_choice',
                required: true,
                custom_kind: null,
                source: { source: 'input', field: '' },
                options: [
                  { value: 'male', title: 'Name', selected: false },
                  { value: 'female', title: 'Nữ', selected: false },
                  { value: 'other', title: 'Khác', selected: false },
                ],
                mValue: null,
                value: '',
              },
              {
                question: 'Số xe mà bạn có?',
                kind: 'dropdown',
                required: true,
                custom_kind: null,
                source: { source: 'input', field: '' },
                options: [
                  { value: '1', title: '1', selected: false },
                  { value: '2', title: '2', selected: false },
                  { value: '3', title: '3', selected: false },
                ],
                dValue: null,
                value: '',
              },
              {
                question: 'Sở thích lúc rãnh rỗi?',
                kind: 'checkbox',
                required: true,
                custom_kind: null,
                source: { source: 'input', field: '' },
                options: [
                  { value: 'Đọc sách', title: 'Đọc sách', selected: false },
                  { value: 'Đá banh', title: 'Đá banh', selected: false },
                ],
                cValue: null,
                value: '',
              },
              {
                question: 'Địa chỉ của bạn?',
                kind: 'paragraph',
                required: true,
                custom_kind: 'address',
                source: { source: 'input', field: '' },
                pValue: null,
                value: '',
              },
            ],
          },
        ] as any,
      });
    },
    onChangeField(event) {
      console.log('data :>> ', event);
    },
  },
});
