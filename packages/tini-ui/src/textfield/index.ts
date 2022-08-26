import fmtClass from '../_util/fmtClass';
import fmtEvent from '../_util/fmtEvent';
import { debounce } from '../_util/debounce';
import { selectAsync } from '../_util/query';

type LabelInputProps = {
  labelCls?: string;
  labelShowBadge?: boolean;
  labelIcon?: string;
  labelIconColor?: string;
  labelHelperText?: string;
  labelText?: string;
};
type InputProps = {
  trailingIcon?: string;
  leadingIcon?: string;
  iconColor?: string;
  shape?: 'pill' | 'rounded';
  prefix?: 'text' | 'button' | '';
  suffix?: 'text' | 'button' | '';
  prefixContent: string;
  suffixContent: string;
  loading?: boolean;
  inputCls?: string;
  className?: string;
  errorMsg?: string;
  hasError?: boolean;
  successMsg?: string;
  hasSuccess?: boolean;
  readOnly?: boolean;
  // showErrorIcon?: boolean;

  type?: string;
  password?: boolean;
  name?: string;
  value: string;
  placeholder?: string;
  placeholderClass?: string;
  placeholderStyle?: string;
  disabled?: boolean;
  debounce?: number;
  maxlength?: number;
  focus?: boolean;
  controlled?: boolean;
  onTapSuffix?: (event: unknown) => void;
  onTapPrefix?: (event: unknown) => void;
  onTapTrailingIcon?: (event: unknown) => void;
  onTapLeadingIcon?: (event: unknown) => void;
  onInput?: (event: unknown) => void;
  onConfirm?: (event: unknown) => void;
  onFocus?: (event: unknown) => void;
  onBlur?: (event: unknown) => void;
};

export type ITextfieldComponentProps = LabelInputProps & InputProps;
Component({
  data: {
    paddingHorizontal: 16,
    iconDisabledColor: 'var(--color-input-icon-disabled)',
    wrapClass: '',
    prefixWidth: 24,
    suffixWidth: 24,
  },
  props: {
    // Label props
    labelCls: '',
    showBadge: false,
    labelIcon: '',
    labelIconColor: '#808089',
    helperText: '',
    labelText: '',

    // Extra props
    trailingIcon: '',
    leadingIcon: '',
    iconColor: 'var(--color-input-icon-default)',
    shape: 'rounded',
    loading: false,
    inputCls: '',
    className: '',
    errorMsg: '',
    successMsg: '',
    readonly: false,
    // showErrorIcon: true,
    hasError: false,
    hasSuccess: false,
    errorIconColor: '#ff424f',
    successIconColor: '#00AB56',
    prefix: '',
    suffix: '',
    prefixContent: '',
    suffixContent: '',

    // Input props
    type: 'text',
    password: false,
    name: '',
    value: '',
    placeholder: '',
    placeholderClass: '',
    placeholderStyle: '',
    disabled: false,
    maxlength: 140,
    debounce: 0,
    focus: false,
    controlled: false,
    onTap: undefined,
    onTapRightIcon: undefined,
    onTapLeftIcon: undefined,
    onInput: undefined,
    onConfirm: undefined,
    onFocus: undefined,
    onBlur: undefined,
  } as ITextfieldComponentProps,
  async onInit() {
    const { prefix, suffix } = this.props;
    this.onInput = debounce(this.onInput.bind(this), this.props.debounce);
    if (prefix)
      selectAsync(`#tu-textfield-prefix`).then((prefix) => {
        this.setData({
          prefixWidth: prefix.width,
        });
      });
    if (suffix)
      selectAsync(`#tu-textfield-suffix`).then((suffix) => {
        this.setData({
          suffixWidth: suffix.width,
        });
      });

    this.setData({
      wrapClass: this.getWrapClass(this.props),
    });
  },
  didUpdate(prevProps) {
    if (this.isClassChange(prevProps, this.props)) {
      this.setData({
        wrapClass: this.getWrapClass(this.props),
      });
    }
  },
  methods: {
    getWrapClass(props) {
      const { shape, hasError, hasSuccess } = props;
      const ret = fmtClass({
        ['error']: hasError,
        ['success']: hasSuccess,
        ['rounded']: shape === 'rounded',
        ['pill']: shape === 'pill',
      });
      return ret;
    },
    isClassChange(prevProps, nextProps) {
      return (
        prevProps.shape !== nextProps.shape ||
        prevProps.hasError !== nextProps.hasError ||
        prevProps.hasSuccess !== nextProps.hasSuccess
      );
    },
    onEvent(eventName, event) {
      const eventFunc = this.props[eventName];
      if (eventFunc && event) {
        const e = fmtEvent(this.props, event);
        eventFunc(e);
      }
    },
    onTapSuffix(e) {
      this.onEvent('onTapSuffix', e);
    },
    onTapPrefix(e) {
      this.onEvent('onTapPrefix', e);
    },
    onTapLeadingIcon(e) {
      this.onEvent('onTapIconLeft', e);
      this.onEvent('onTapLeadingIcon', e);
    },
    onTapTrailingIcon(e) {
      this.onEvent('onTapIconRight', e);
      this.onEvent('onTapTrailingIcon', e);
    },
    onBlur(e) {
      this.onEvent('onBlur', e);
    },
    onConfirm(e) {
      this.onEvent('onConfirm', e);
    },
    onFocus(e) {
      this.onEvent('onFocus', e);
    },
    onInput(e) {
      this.onEvent('onInput', e);
    },
  },
});
