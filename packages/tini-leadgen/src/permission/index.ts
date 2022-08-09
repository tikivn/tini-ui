import type { Option } from '../_util/config';
import { EKYCOptions, AccountOptions } from '../_util/config';

type PermissionProps = {
  onPermissionResponse?: (res: boolean) => void;
  fields: leadgen.Field[];
  showEkycFail: boolean;
};

type PermissionData = {
  options: Array<Option>;
  show: boolean;
};

type PermissionMethods = {
  onClose: () => void;
  onOk: () => void;
  buildQuestions: () => void;
};

Component<PermissionData, PermissionProps, PermissionMethods>({
  props: {
    onPermissionResponse: () => false,
    fields: [],
    showEkycFail: false,
  },
  data: {
    show: false,
    options: [],
  },
  didMount() {
    this.buildQuestions();
  },
  methods: {
    buildQuestions() {
      const { fields } = this.props;
      if (!fields || !fields.length) {
        return;
      }
      const options: Option[] = [EKYCOptions, AccountOptions];

      fields.forEach((field) => {
        if (field.source.source === 'ekyc') {
          const index = options.findIndex((opt) => opt.fields.includes(field.source.field));

          if (index > -1) {
            const text = options[index].text ? options[index].text.split(', ') : [];
            options[index].text = text.concat(field.question).join(', ');
          }
        }
      });
      const optionsDisplay = options.filter((opt) => opt.text.trim().length > 0);

      if (optionsDisplay.length) {
        this.setData({ options: optionsDisplay, show: true });
      } else {
        // No need to show popup permission
        this.props.onPermissionResponse(true);
      }
    },
    onClose() {
      this.props.onPermissionResponse(false);
    },
    onOk() {
      this.props.onPermissionResponse(true);
    },
  },
});
