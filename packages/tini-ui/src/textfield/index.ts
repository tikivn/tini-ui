import fmtEvent from '../_util/fmtEvent';
import fmtClass from '../_util/fmtClass';

type LabelInputProps = {
  labelCls?: string;
  labelShowBadge?: boolean;
  labelIcon?: string;
  labelIconColor?: string;
  labelHelperText?: string;
  labelText?: string;
};
type InputProps = {
  iconRight?: string;
  iconLeft?: string;
  iconColor?: string;
  shape?: 'pill' | 'rounded';
  loading?: boolean;
  inputCls?: string;
  className?: string;
  errorMsg?: string;
  hasError?: boolean;
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
  maxlength?: number;
  focus?: boolean;
  controlled?: boolean;
  onTap?: (event: unknown) => void;
  onInput?: (event: unknown) => void;
  onConfirm?: (event: unknown) => void;
  onFocus?: (event: unknown) => void;
  onBlur?: (event: unknown) => void;
};

Component({
  data: {
    paddingHorizontal: 16,
    iconDisabledColor: 'rgba(166, 166, 176, 0.6)',
    wrapClass: '',
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
    iconRight: '',
    iconLeft: '',
    iconColor: '#808089',
    shape: 'rounded',
    loading: false,
    inputCls: '',
    className: '',
    errorMsg: '',
    readonly: false,
    // showErrorIcon: true,
    hasError: false,
    errorIconColor: '#ff424f',

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
    focus: false,
    controlled: false,
    onTap: undefined,
    onInput: undefined,
    onConfirm: undefined,
    onFocus: undefined,
    onBlur: undefined,
  } as InputProps & LabelInputProps,
  onInit() {
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
      const { shape, hasError } = props;
      const ret = fmtClass({
        ['error']: hasError,
        ['rounded']: shape === 'rounded',
        ['pill']: shape === 'pill',
      });
      return ret;
    },
    isClassChange(prevProps, nextProps) {
      return prevProps.shape !== nextProps.shape || prevProps.hasError !== nextProps.hasError;
    },
    onEvent(eventName, event) {
      const eventFunc = this.props[eventName];
      if (eventFunc && event) {
        const e = fmtEvent(this.props, event);
        eventFunc(e);
      }
    },
    onTap(e) {
      this.onEvent('onTap', e);
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
