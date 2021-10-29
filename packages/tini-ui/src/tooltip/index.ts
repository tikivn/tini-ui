import fmtEvent from '../_util/fmtEvent';
export interface TooltipMethods {
  onClose?: (event) => void;
}
export interface TooltipComponentProps extends TooltipMethods {
  className?: string;
  style?: string;
  show?: boolean;
  position?: 'top' | 'left' | 'right' | 'bottom';
  theme?: 'dark' | 'light';
  iconSizeClose?: number;
  showCloseIcon?: boolean;
}

Component({
  props: {
    className: '',
    style: '',
    show: false,
    theme: 'light',
    content: '',
    position: 'top',
    iconSizeClose: 16,
    showCloseIcon: false,
    onClose: () => {},
  } as TooltipComponentProps,

  methods: {
    _onClose(e) {
      const { onClose } = this.props;
      if (typeof onClose === 'function') {
        const event = fmtEvent(this.props, e);
        onClose(event);
      }
    },
  },
});
