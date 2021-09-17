

interface IInputEvent {
  detail: {
    value: string
  }
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
  hasError?: boolean
}

function mapPropsEvent<T>(eventNames: string[]): Record<string, any> {
  return eventNames.reduce((obj, eventName) => {

    return <ThisType<{ props: T }>>{
      ...obj,
      [eventName]: function (e: any) {
        if ((this.props)[eventName] instanceof Function) {
          return (this.props)[eventName](e)
        }
      }
    }
  }, {})
}
Component({
  props: {
    className: '',
    style: '',
    shape: '',
    placeholder: '',
    value: '',
    controlled: false,
    hasError: false,
    errorIconColor: '#ff424f',

  },
  data: { __value: '' },
  didMount() {
    this.deriveDataFromProps(this.props); // for passing static values(props never change)
  },
  deriveDataFromProps: function (this: { data: { __value: string }, setData: (data) => void }, nextProps) {
    if (this.data.__value !== nextProps.value) {
      this.setData({
        __value: nextProps.value
      });
    }
  },

  methods: {
    ...mapPropsEvent<ISearchBarComponentPropsEvents>([
      "onFocus",
      "onBlur",
      "onConfirm",
      "onInput",
      "onTapSearchIcon",
    ]),

    onTapCloseIcon(e) {
      try {
        this.setData({
          __value: ''
        });
        const onTapCloseIcon = mapPropsEvent<ISearchBarComponentPropsEvents>(['onTapCloseIcon']).onTapCloseIcon.bind(this);
        onTapCloseIcon(e)
      } catch (error) {
        console.error(error)
      }
    }
  },
});
