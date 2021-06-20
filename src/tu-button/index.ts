type ButtonProps = {
  className?: string;
  style?: string;
  iconName?: string;
  shape?: 'pill' | 'rounded' | 'circle';
  size?: 'medium' | 'small' | 'large';
  skeleton?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type: 'solid' | 'outline' | 'ghost';
  onTap?: (event: any) => void;
};

Component({
  props: {
    type: 'solid',
    shape: 'rounded',
    size: 'large',
    skeleton: false,
    loading: false,
    disabled: false,
  } as ButtonProps,
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
    onTap(e) {
      const { onTap } = this.props;
      if (!onTap) {
        return;
      }

      this.props.onTap({
        target: {
          dataset: this.dataset,
        },
      });
    },
  },
});
