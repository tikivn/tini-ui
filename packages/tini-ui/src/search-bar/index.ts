interface IInputEvent {
  detail: {
    value: string;
  };
}

interface IInputEventHandler {
  (event?: IInputEvent): void;
}
interface ISearchBarComponentPropsEvents {
  onFocus?: IInputEventHandler;
  onBlur?: IInputEventHandler;
  onConfirm?: IInputEventHandler;
  onInput?: IInputEventHandler;
  onTapCloseIcon?: IInputEventHandler;
  onTapSearchIcon?: IInputEventHandler;
}
export interface ISearchBarComponentProps extends ISearchBarComponentPropsEvents {
  // common style
  className?: string;
  style?: string;
  shape?: 'pill' | 'rounded';

  // value
  value: string;
  maxlength?: string;
  errorMsg?: string;

  placeholder?: string;
  placeholderClass?: string;
  placeholderStyle?: string;

  //label
  labelText?: string;
  labelCls?: string;

  // states
  disabled?: boolean;
  focus?: boolean;
  controlled?: boolean;
  loading?: boolean;
}

function mapPropsEvent<T>(eventNames: string[]): Record<string, any> {
  return eventNames.reduce((obj, eventName) => {
    return <ThisType<{ props: T }>>{
      ...obj,
      [eventName]: function (e: any) {
        if (this.props[eventName] instanceof Function) {
          return this.props[eventName](e);
        }
      },
    };
  }, {});
}
Component({
  props: {
    className: '',
    style: '',
    shape: '',
    placeholder: '',
    value: '',
    controlled: false,
  },
  data: { __value: '' },
  didMount() {
    this.onChangeValue(this.props.value);
  },
  deriveDataFromProps(nextProps) {
    this.onChangeValue(nextProps.value);
  },
  methods: {
    ...mapPropsEvent<ISearchBarComponentPropsEvents>([
      'onFocus',
      'onBlur',
      'onConfirm',
      'onInput',
      'onTapSearchIcon',
    ]),
    onChangeValue(newValue) {
      if (this.data.__value !== newValue) {
        this.setData({
          __value: newValue,
        });
      }
    },
    onTapCloseIcon(e) {
      try {
        this.setData({
          __value: '',
        });
        const onTapCloseIcon = mapPropsEvent<ISearchBarComponentPropsEvents>([
          'onTapCloseIcon',
        ]).onTapCloseIcon.bind(this);
        onTapCloseIcon(e);
      } catch (error) {
        console.error(error);
      }
    },
    onKeyDown(event) {
      const { onTapSearchIcon } = this.props as any;
      if (!onTapSearchIcon) {
        return;
      }

      const { key, keyCode } = event.detail;
      // Enter
      if (keyCode === 13 || key == 'Enter') {
        onTapSearchIcon();
      }
    },
  },
});
