export interface IChipMethods {
  onChange?: (pin?: string, position?: number) => void;
  onComplete?: (pin?: string) => void;
}

export interface IChipPinProps extends IChipMethods {
  className?: string;
  style?: string;
  label?: string;
  length?: number;
  shape: 'rounded' | 'circle';
  disabled?: boolean;
  focus?: boolean;
  secret?: boolean;
  hideCaret?: boolean;
  hasError?: boolean;
  errorMsg?: string;
  value?: string;
}

Component({
  props: {
    className: '',
    style: '',
    label: '',
    length: 4,
    shape: 'rounded',
    disabled: false,
    focus: false,
    secret: false,
    hideCaret: false,
    hasError: false,
    errorMsg: '',
    value: '',
    onChange: () => {},
    onComplete: () => {},
  } as IChipPinProps,

  data: {
    currentIndex: -1,
  },

  methods: {
    onItemFocus(event) {
      this.setData({
        currentIndex: event.target.dataset.index,
      });
    },

    onItemChange(event) {
      const { currentIndex } = this.data;
      const { length, onChange, onComplete } = this.props;
      const value = event.detail.value;
      this.values[currentIndex] = value;
      const pin = this.values.join('');

      if (value && currentIndex < length - 1)
        this.setData({
          currentIndex: currentIndex + 1,
        });

      onChange(pin, currentIndex);

      if (pin.length === length) onComplete(pin);
    },
  },

  didMount() {
    const { length, focus, value } = this.props;

    this.values = value ? value.split('').slice(0, length) : Array(length).fill('');

    if (focus)
      this.setData({
        currentIndex: Math.min(value.length, length) - 1 || 0,
      });
  },
});
