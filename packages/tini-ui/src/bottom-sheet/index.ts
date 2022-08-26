type BottomSheetProps = {
  className?: string;
  popupClass?: string;
  style?: string;
  mask: boolean;
  maskClose: boolean;
  animation: boolean;
  show: boolean;
  disableScroll: boolean;
  distanceFromTop: number;
  isContentScrollView?: boolean;
  zIndex: number;
  title: string;
  buttonTitle: string;
  buttonShape?: 'pill' | 'rounded' | 'circle' | 'square';
  buttonCls?: string;
  onClose?: (event: any) => void;
  onClick?: (event: any) => void;
};

Component({
  props: {
    mask: true,
    maskClose: true,
    animation: true,
    show: true,
    disableScroll: false,
    className: '',
    popupClass: '',
    isContentScrollView: true,
    distanceFromTop: 50,
    zIndex: 2,
    title: 'Bottom sheet',
    buttonTitle: 'ok',
    buttonShape: 'rounded',
    buttonCls: '',
    onClose: undefined,
    onClick: undefined,
  } as BottomSheetProps,
  onInit() {
    if (my.canIUse('onHardwareBackPress')) {
      my.onHardwareBackPress(this.onHardwareBackPress.bind(this));
    }
  },
  didMount(): void {
    this._updateDataSet();
  },
  didUnmount(): void {
    if (my.canIUse('offHardwareBackPress')) {
      my.offHardwareBackPress(this.onHardwareBackPress);
    }
  },
  didUpdate(): void {
    if (my.canIUse('disableHardwareBackPress')) {
      if (this.props.show) {
        my.disableHardwareBackPress();
      } else {
        my.offHardwareBackPress(this.onHardwareBackPress);
        my.enableHardwareBackPress();
      }
    }
    this._updateDataSet();
  },
  deriveDataFromProps(nextProps) {
    this._handleOverlay(nextProps);
  },
  methods: {
    onHardwareBackPress() {
      this.onClose();
    },
    _handleOverlay(props) {
      const { mask, maskClose, show } = props;
      if (!mask) {
        return;
      }
      if (show) {
        my.showOverlay({
          touchable: !!maskClose,
          success: () => {
            if (maskClose) {
              this.onClose();
            }
          },
        });
      } else {
        my.hideOverlay({});
      }
    },
    _updateDataSet(): void {
      this.dataset = {};
      for (const key in this.props) {
        if (/data-/gi.test(key)) {
          this.dataset[key.replace(/data-/gi, '')] = this.props[key];
        }
      }
    },
    onClose(): void {
      const { mask, onClose } = this.props;
      if (mask) {
        my.hideOverlay({});
      }

      if (onClose) {
        onClose({
          target: {
            dataset: this.dataset,
          },
        });
      }
    },
    onClick(): void {
      const { onClick } = this.props;
      if (onClick) {
        onClick({
          target: {
            dataset: this.dataset,
          },
        });
      }
    },
  },
});
