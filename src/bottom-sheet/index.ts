Component({
  data: {},
  props: {
    mark: true,
    animation: true,
    show: true,
    disableScroll: false,
    distanceFromTop: 50,
    zIndex: 2,
    title: 'Bottom sheet',
    buttonTitle: 'ok',
    onClose: undefined,
    onClick: undefined,
  },
  methods: {
    onClose() {
      this.setData({
        show: false,
      });
      const { onClose } = this.props;
      if (onClose) {
        onClose();
      }
    },
    onClick() {
      const { onClick } = this.props;
      if (onClick) {
        onClick();
      }
    },
  },
});
