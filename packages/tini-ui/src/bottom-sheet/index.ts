type BottomSheetProps = {
  className?: string;
  style?: string;
  mask: boolean;
  animation: boolean;
  show: boolean;
  disableScroll: boolean;
  distanceFromTop: number;
  isContentScrollView?: boolean;
  zIndex: number;
  title: string;
  buttonTitle: string;
  onClose?: (event: any) => void;
  onClick?: (event: any) => void;
};

Component({
  props: {
    mask: true,
    animation: true,
    show: true,
    disableScroll: false,
    isContentScrollView: true,
    distanceFromTop: 50,
    zIndex: 2,
    title: 'Bottom sheet',
    buttonTitle: 'ok',
    onClose: undefined,
    onClick: undefined,
  } as BottomSheetProps,
  didMount(): void {
    this._updateDataSet();
  },
  didUpdate(): void {
    this._updateDataSet();
  },
  methods: {
    _updateDataSet(): void {
      this.dataset = {};
      for (const key in this.props) {
        if (/data-/gi.test(key)) {
          this.dataset[key.replace(/data-/gi, '')] = this.props[key];
        }
      }
    },
    onClose(): void {
      this.setData({
        show: false,
      });
      const { onClose } = this.props;
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
