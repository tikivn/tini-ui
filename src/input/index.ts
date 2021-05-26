/* eslint-disable @typescript-eslint/no-unused-vars */
type SelectionType = {
  start: number | null;
  end: number | null;
};
type InputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
type ConfirmType = 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

type ContextType = {
  initValue: (param: { value: string; name: string }) => void;
  setValue: (param: { value: string; name: string }) => void;
  getValue: (param: { name: string }) => unknown;
};
type OnInputDetail = {
  detail: {
    value: string;
  };
};

export interface InputVariants {
  type?: 'text' | 'email' | 'number' | 'decimal' | 'tel' | 'search' | 'url';
}

interface DefaultUIProps {
  className?: string;
  style?: string;
}
export type InputProps = ButtonMethods &
  DefaultUIProps &
  InputVariants & {
    password?: boolean;
    name?: string;
    value?: string;
    placeholder?: string;
    placeholderClass?: string;
    placeholderStyle?: string;
    disabled?: boolean;
    maxlength?: number;
    selectionStart?: number;
    selectionEnd?: number;
    focus?: boolean;
    cursor?: number;
    controlled?: boolean;
    confirmType?: ConfirmType;
  };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputState {
  //
  // state: ButtonProps;
}

export interface ButtonMethods {
  onInput?: (detail: OnInputDetail) => void;
  onConfirm?: (detail: OnInputDetail) => void;
  onFocus?: (detail: OnInputDetail) => void;
  onBlur?: (detail: OnInputDetail) => void;
}

const defaultProps: InputProps = {
  type: 'text',
  onInput(_detail: OnInputDetail) {},
  onConfirm(_detail: OnInputDetail) {},
  onFocus(_detail: OnInputDetail) {},
  onBlur(_detail: OnInputDetail) {},
};
const componentOptions: tiniapp.ComponentOptions<
  InputProps,
  InputState,
  tiniapp.IComponentMethods
> = {
  props: defaultProps,
  methods: {
    onInput(detail: OnInputDetail) {
      this.props.onInput(detail);
    },
    onConfirm(detail: OnInputDetail) {
      this.props.onConfirm(detail);
    },
    onFocus(detail: OnInputDetail) {
      this.props.onFocus(detail);
    },
    onBlur(detail: OnInputDetail) {
      this.props.onBlur(detail);
    },
  },
};
Component<InputProps, InputState, tiniapp.IComponentMethods>(componentOptions);
