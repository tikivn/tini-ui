import fmtEvent from '../_util/fmtEvent';

type ButtonProps = {
  className?: string;
  style?: string;
  iconName?: string;
  shape?: 'pill' | 'rounded' | 'circle' | 'square';
  size?: 'medium' | 'small' | 'large';
  formType?: 'submit' | 'reset';
  skeleton?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type: 'solid' | 'outline' | 'ghost';
  onTap?: (event: any) => void;
};

Component({
  props: {
    type: 'solid',
    shape: 'rounded',
    size: 'large',
    skeleton: false,
    loading: false,
    disabled: false,
  } as ButtonProps,
  methods: {
    onTap(e) {
      const { onTap, disabled, skeleton, loading } = this.props;
      if (!onTap || disabled || skeleton || loading) {
        return;
      }
      onTap(fmtEvent(this.props, e));
    },
  },
});
