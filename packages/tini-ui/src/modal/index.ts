type ModalButtonProps = {
  text: string;
  type?: 'solid' | 'outline' | 'ghost';
  extClass?: string;
};

type ModalProps = {
  className: string;
  topImageSize: 'lg' | 'md' | 'sm';
  show: boolean;
  showClose: boolean;
  closeType: string;
  mask: boolean;
  buttonsLayout: 'horizontal' | 'vertical';
  disableScroll: boolean;
  maskClick: boolean;
  buttons: ModalButtonProps[] | null;
  onModalClick?: () => void;
  onButtonClick?: (event: unknown) => void;
  onModalClose?: () => void;
  onMaskClick?: () => void;
};
Component({
  data: {
    _buttonsLayout: '',
    adviceClose: 26,
    normalClose: 18,
  },
  props: {
    className: '',
    topImageSize: 'md',
    showClose: false,
    show: false,
    closeType: '0',
    mask: true,
    buttonsLayout: 'horizontal',
    disableScroll: true,
    maskClick: false,
    buttons: null,
    onModalClick: () => {},
    onButtonClick: () => {},
    onModalClose: () => {},
    onMaskClick: () => {},
  } as ModalProps,
  didMount() {
    const { buttons, buttonsLayout } = this.props;
    if (buttons && buttons.length > 2) {
      this.setData({
        _buttonsLayout: 'vertical',
      });
    } else {
      this.setData({
        _buttonsLayout: buttonsLayout,
      });
    }
  },
  deriveDataFromProps(nextProps) {
    this._handleOverlay(nextProps);
  },
  methods: {
    key: null,
    _handleOverlay(props) {
      const { mask, maskClick, show } = props;
      if (!mask) {
        return;
      }
      if (show) {
        this.key = Date.now();
        my.showOverlay({
          touchable: !!maskClick,
          success: () => {
            if (maskClick) {
              this.onClose();
            }
          },
        });
      } else if (this.key) {
        this.key = null;
        my.hideOverlay({});
      }
    },
    _onModalClick() {
      const { onModalClick } = this.props;
      if (onModalClick) {
        onModalClick();
      }
    },
    _onButtonClick(e) {
      const { onButtonClick } = this.props;
      if (onButtonClick) {
        onButtonClick(e);
      }
    },
    _onModalClose() {
      const { onModalClose, mask } = this.props;
      if (mask && this.key) {
        this.key = null;
        my.hideOverlay({});
      }
      if (onModalClose) {
        onModalClose();
      }
    },
    _onMaskTap() {
      const { onMaskClick } = this.props;
      if (typeof onMaskClick === 'function') {
        onMaskClick();
      } else {
        return false;
      }
    },
  },
});
