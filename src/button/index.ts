export interface ButtonVariants {
  type?: 'solid' | 'outline' | 'ghost';
  iconName?: string;
  shape?: 'pill' | 'rounded' | 'circle';
  size?: 'medium' | 'small' | 'large';
  skeleton?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

interface DefaultUIProps {
  className?: string;
  style?: string;
}
export type ButtonProps = ButtonMethods & DefaultUIProps & ButtonVariants;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonState {
  //
  // state: ButtonProps;
}

export interface ButtonMethods {
  onTap?: (params: any) => void;
}

const defaultProps: ButtonProps = {
  type: 'solid',
  shape: 'pill',
  size: 'large',
  skeleton: false,
  loading: false,
  disabled: false,
  onTap: () => {},
};
const componentOptions: tiniapp.ComponentOptions<
  ButtonProps,
  ButtonState,
  tiniapp.IComponentMethods
> = {
  props: defaultProps,
  methods: {
    onTap(e) {
      this.props.onTap(e);
    },
  },
};
Component<ButtonProps, ButtonState, tiniapp.IComponentMethods>(componentOptions);
