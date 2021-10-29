import fmtEvent from '../_util/fmtEvent';

export interface ChipMethods {
  onClick?: () => void;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}
export interface ChipComponentProps extends ChipMethods {
  className?: string;
  style?: string;
  content?: string;
  active?: boolean;
  suffixIcon?: string;
  prefixIcon?: string;
  suffixImage?: string;
  prefixImage?: string;
  disabled?: boolean;
}

Component({
  props: {
    className: '',
    style: '',
    content: '',
    active: false,
    suffixIcon: '',
    prefixIcon: '',
    iconRightColor: '#1A94FF',
    iconLeftColor: '#1A94FF',
    suffixImage: '',
    prefixImage: '',
    disabled: false,
    onClick: () => {},
    onRightClick: () => {},
    onLeftClick: () => {},
  } as ChipComponentProps,

  methods: {
    _onClick(e) {
      const { onClick } = this.props;
      if (typeof onClick === 'function') {
        const event = fmtEvent(this.props, e);
        onClick(event);
      }
    },
    _onRightClick(e) {
      const { onRightClick } = this.props;
      if (typeof onRightClick === 'function') {
        const event = fmtEvent(this.props, e);
        onRightClick(event);
      }
    },
    _onLeftClick(e) {
      const { onLeftClick } = this.props;
      if (typeof onLeftClick === 'function') {
        const event = fmtEvent(this.props, e);
        onLeftClick(event);
      }
    },
  },
});
