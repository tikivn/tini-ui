type ListItemProps = {
  className?: string;
  style?: string;
  padding: boolean;
  thumb?: string;
  thumbSize?: number;
  upperSubtitle?: string;
  lowerSubtitle?: string;
  titlePosition: 'top' | 'middle' | 'bottom';
  arrow: boolean;
  iconSize: number;
  disabled: boolean;
  onClick?: (event: any) => void;
};

Component({
  props: {
    titlePosition: 'top',
    arrow: false,
    iconSize: 20,
    disabled: false,
  } as ListItemProps,
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
    onItemTap(e): void {
      const { onClick, disabled } = this.props;
      if (onClick && !disabled) {
        onClick({
          index: e.target.dataset.index,
          target: { dataset: this.dataset },
        });
      }
    },
  },
});
