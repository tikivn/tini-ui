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
  id: string;
  disabled?: boolean;
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
    id: 'pin',
    disabled: false,
    secret: false,
    hideCaret: false,
    hasError: false,
    errorMsg: '',
    value: '',
    onChange: () => {},
    onComplete: () => {},
  } as IChipPinProps,

  methods: {
    inputRefs: [] as any[],
    onItemChange(event) {
      const index = event.target.dataset.index;
      const { length, onChange, onComplete } = this.props;
      const value = event.detail.value;
      this.values[index] = value;
      const pin = this.values.join('');

      onChange(pin, index);

      if (pin.length === length) onComplete(pin);

      if (`${value}`.trim().length && index < length - 1) {
        this.inputRefs?.[index + 1]?.focus();
      }
    },
    onKeyDown(event) {
      const index = event.target.dataset.index;
      const { key, keyCode } = event.detail;
      const isBackPress = key === 'Backspace' || keyCode === 8;
      if (index === 0 || !isBackPress) {
        return;
      }

      if (`${this.values[index]}`.trim().length === 0) {
        this.inputRefs?.[index - 1]?.focus();
      }
    },
  },

  didMount() {
    const { length, value, id } = this.props;

    this.values =
      value && typeof value === 'string'
        ? value.split('').slice(0, length)
        : Array(length).fill('');

    this.inputRefs = Array.from(Array(length).keys()).map((i) =>
      (my as any).createInputContext(`${id}-${i}`),
    );
  },
});
