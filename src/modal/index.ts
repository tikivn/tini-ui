import fmtUnit from '../_util/fmtUnit';

type Props = {
  className: string;
  topImageSize: 'lg' | 'md' | 'sm';
  showClose: boolean;
  closeType: string;
  mask: boolean;
  buttonsLayout: 'horizontal' | 'vertical';
  disableScroll: boolean;
  maskClick: boolean;
  buttons: string[] | null;
  onModalClick?: () => void;
  onButtonClick?: (event: unknown) => void;
  onModalClose?: () => void;
  onMaskClick?: () => void;
};
Component({
  data: {
    _buttonsLayout: '',
    adviceClose: fmtUnit('26'),
    normalClose: fmtUnit('18'),
  },
  props: {
    className: '',
    topImageSize: 'md',
    showClose: false,
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
  } as Props,
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
  methods: {
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
      const { onModalClose } = this.props;
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
