import fmtEvent from '../_util/fmtEvent';

type ToastBarProps = {
  type: 'neutral' | 'informative' | 'positive' | 'negative';
  iconLeft: string;
  closeIcon: string;
  show: boolean;
  showCloseIcon: boolean;
  content: string;
  actionText: string;
  style: string;
  className: string;
  closeButtonClass: string;
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
  internalShow: boolean;
};

// TODO: Handle multiple toast
Component({
  props: {
    type: 'neutral',
    iconLeft: '',
    closeIcon: 'close',
    showCloseIcon: true,
    show: false,
    content: '',
    actionText: '',
    style: '',
    className: '',
    closeButtonClass: '',
    image: '', // To replace icon
    duration: 3000,
    placement: 'bottom', // bottom, top
    top: null,
    bottom: null,
    zIndex: 999,
    animation: true,
    animationDuration: 300,
    onTapAction: () => {},
    onClose: () => {},
  } as ToastBarProps,
  data: {
    internalShow: false,
  } as ToastBarData,

  deriveDataFromProps(nextProps) {
    this.checkShowToast(nextProps);
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

      this.setData(
        {
          internalShow: false,
        },
        () => onClose(fmtEvent(this.props, event)),
      );
    },

    checkShowToast(nextProps) {
      const { show, duration, onClose } = nextProps;
      const { internalShow } = this.data;

      if (show === internalShow) return;

      this.setData({ internalShow: show }, () => {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        if (show)
          this.timeout = setTimeout(() => {
            this.setData(
              {
                internalShow: false,
              },
              () => onClose(fmtEvent(this.props)),
            );
          }, duration);
      });
    },
  },
});
