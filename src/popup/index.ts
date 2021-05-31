type Props = {
  className: string;
  show: boolean;
  position: 'top' | 'left' | 'right' | 'bottom';
  mask: boolean;
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
    animation: true,
    disableScroll: true,
  } as Props,
  methods: {
    onMaskTap() {
      const { onClose, animation } = this.props;

      if (onClose) {
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
