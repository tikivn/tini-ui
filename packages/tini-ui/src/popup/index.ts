type Props = {
  className: string;
  show: boolean;
  position: 'top' | 'left' | 'right' | 'bottom';
  mask: boolean;
  maskClose: boolean;
  animation: boolean;
  disableScroll: boolean;
  onClose(): void;
};

Component({
  props: {
    className: '',
    show: false,
    position: 'bottom',
    mask: true,
    maskClose: true,
    animation: true,
    disableScroll: true,
  } as Props,
  methods: {
    onMaskTap() {
      const { maskClose, onClose, animation } = this.props;

      if (maskClose && onClose) {
        if (animation) {
          onClose();
        } else {
          setTimeout(() => {
            onClose();
          }, 200);
        }
      }
    },
  },
});
