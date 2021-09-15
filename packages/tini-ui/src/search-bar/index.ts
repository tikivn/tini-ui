

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

  methods: mapPropsEvent<ISearchBarComponentPropsEvents>([
    "onFocus",
    "onBlur",
    "onConfirm",
    "onInput",
    "onTapCloseIcon",
    "onTapSearchIcon",
  ]),
});
