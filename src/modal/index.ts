import fmtUnit from '../_util/fmtUnit';

Component({
  data: {
    adviceClose: fmtUnit(26),
    normalClose: fmtUnit(18),
  },
  props: {
    className: '',
    topImageSize: 'md',
    showClose: false,
    closeType: '0',
    mask: true,
    show: false,
    maskClick: false,
  },
  methods: {
    _onModalClick: function _onModalClick() {
      const onModalClick = this.props.onModalClick;
      if (onModalClick) {
        onModalClick();
      }
    },
    _onButtonClick: function _onButtonClick(e) {
      const onButtonClick = this.props.onButtonClick;
      if (typeof onButtonClick === 'function') {
        onButtonClick(e);
      }
    },
    _onModalClose: function _onModalClose() {
      const onModalClose = this.props.onModalClose;
      if (typeof onModalClose === 'function') {
        onModalClose();
      }
    },
    _onMaskTap: function _onMaskTap() {
      const onMaskClick = this.props.onMaskClick;
      if (typeof onMaskClick === 'function') {
        onMaskClick();
      } else {
        return false;
      }
    },
  },
});
