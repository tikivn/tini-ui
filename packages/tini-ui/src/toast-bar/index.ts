import fmtEvent from '../_util/fmtEvent';

type ToastBarProps = {
  type: 'success' | 'error' | 'info'; // success, error, info
  iconLeft: string;
  closeIcon: string;
  show: boolean;
  showIconLeft: boolean;
  showCloseIcon: boolean;
  content: string;
  actionText: string;
  backgroundColor: string;
  textColor: string;
  style: string;
  className: string;
  textClass: string;
  actionClass: string;
  closeButtonClass: string;
  iconCClass: string;
  image: string;
  duration: number;
  placement: 'bottom' | 'top';
  top: string;
  bottom: string;
  zIndex: number;
  animation: boolean;
  animationDuration: number;
  onTapAction: (data: any) => void;
  onClose: (data?: any) => void;
};

type ToastBarData = {
  icons: {
    success: string;
    error: string;
    info: string;
  };
  toastBackground: string;
  showToast: boolean;
};

// TODO: Handle multiple toast
Component({
  props: {
    type: 'success', // success, error, info
    iconLeft: '',
    closeIcon: 'close',
    show: false,
    showIconLeft: true,
    showCloseIcon: true,
    content: '',
    actionText: '',
    backgroundColor: '', // Default is based on type
    textColor: '#fff', // Apply for text, actionText, icon,...
    style: '',
    className: '',
    textClass: '',
    actionClass: '',
    closeButtonClass: '',
    iconCClass: '',
    image: '', // To replace icon
    duration: 3000,
    placement: 'bottom', // bottom, top
    top: '24px',
    bottom: '24px',
    zIndex: 999,
    animation: true,
    animationDuration: 300,
    onTapAction: () => {},
    onClose: () => {},
  } as ToastBarProps,
  data: {
    icons: {
      success: 'success_glyph',
      error: 'warning_glyph',
      info: 'info_glyph',
    },
    toastBackground: '',
    showToast: false,
  } as ToastBarData,
  didMount() {
    const { backgroundColor, type } = this.props;

    if (backgroundColor) {
      this.setData({ toastBackground: backgroundColor });
    } else {
      this.setData({
        toastBackground:
          {
            success: 'var(--color-alias-positive)',
            error: 'var(--color-alias-negative)',
            info: 'var(--color-alias-reverse-theme)',
          }[type] || 'var(--color-alias-positive)',
      });
    }

    this.checkShowToast();
  },
  deriveDataFromProps() {
    this.checkShowToast();
  },
  didUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },
  methods: {
    timeout: null,
    isShowing: false,
    onTapAction(event) {
      this.props.onTapAction(fmtEvent(this.props, event));
    },
    onTapClose(event) {
      const { onClose } = this.props;
      clearTimeout(this.timeout);
      this.setData({ showToast: false }, () => onClose(fmtEvent(this.props, event)));
    },
    checkShowToast() {
      const { show, duration, onClose } = this.props;
      const { showToast } = this.data;
      if (!show || showToast) {
        return;
      }
      this.setData({ showToast: true });
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.setData({ showToast: false }, () => onClose(fmtEvent(this.props)));
      }, duration);
    },
  },
});
