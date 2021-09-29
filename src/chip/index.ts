import fmtEvent from '../_util/fmtEvent';

export interface ChipComponentProps {
  className?: string;
  style?: string;
  content: string;
  mode?: string;
  suffixIcon?: string;
  prefixIcon?: string;
  suffixImage?: string;
  prefixImage?: string;
  disabled?: boolean;
}
export interface ChipMethods {
  onClick?: () => void;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

Component({
  props: {
    className: '',
    style: '',
    content: '',
    mode: 'primary',
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
  },

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
