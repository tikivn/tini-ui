import fmtEvent from '../_util/fmtEvent';

export interface TooltipComponentProps {
  className?: string;
  style?: string;
  show?: boolean;
  position?: string;
  theme?: string;
  iconSizeClose: number;
  showCloseIcon?: boolean;
}
export interface TooltipMethods {
  onClose?: () => void;
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
  },

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
