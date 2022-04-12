import fmtClass from '../_util/fmtClass';
import fmtEvent from '../_util/fmtEvent';
import { debounce } from '../_util/debounce';

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
  debounce?: number;
  maxlength?: number;
  focus?: boolean;
  controlled?: boolean;
  onTap?: (event: unknown) => void;
  onTapRightIcon?: (event: unknown) => void;
  onTapLeftIcon?: (event: unknown) => void;
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
    iconColor: 'var(--color-input-icon-default)',
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
  onInit() {
    this.onInput = debounce(this.onInput.bind(this), this.props.debounce);

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
    onTapIconLeft(e) {
      this.onEvent('onTapIconLeft', e);
    },
    onTapIconRight(e) {
      this.onEvent('onTapIconRight', e);
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
