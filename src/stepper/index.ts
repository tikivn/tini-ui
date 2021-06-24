Component({
  data: {
    value: undefined,
    disableReduce: false,
    disableAdd: false,
  },
  props: {
    className: '',
    value: 10,
    inputWidth: 40,
    step: 1,
    min: 0,
    max: 100000,
    disabled: false,
    readOnly: false,
    showNumber: true,
    vertical: false,
    controlled: true,
    onChange: (value: number, mode: string): void => {},
  },
  didMount() {
    this.resetFn(this.props.value, 'didMount');
  },
  didUpdate(preProps) {
    const { value } = this.props;
    if (preProps.value !== value) {
      this.resetFn(value, 'didUpdate');
    }
  },
  methods: {
    changeFn(e) {
      const { disabled, step } = this.props;
      const { disableReduce, disableAdd, value } = this.data;
      const type = e.target.dataset.type;
      if (disabled || (type === 'add' && disableAdd) || (type === 'reduce' && disableReduce)) {
        return;
      }
      const newValue = this.getCalculateValue(type, +value, +step);
      this.resetFn(newValue, 'click');
    },
    onInput(e) {
      const value = parseFloat(e.detail.value) || this.props.min;
      this.resetFn(value, 'input');
    },
    onBlur(e) {
      const value = parseFloat(e.detail.value) || this.props.min;
      this.resetFn(value, 'blur');
    },
    resetFn(value: number, mode: string) {
      const { max, min, onChange } = this.props;
      const newValue = Math.min(max, Math.max(min, value));
      const disableAdd = newValue >= max;
      const disableReduce = newValue <= min;
      this.setData({
        value: newValue,
        disableAdd,
        disableReduce,
      });
      if (onChange) {
        onChange(newValue, mode);
      }
    },
    getCalculateValue(type: string, arg1: number, arg2: number): number {
      const numFloat = arg1.toString().split('.')[1] || '';
      const num2Float = arg2.toString().split('.')[1] || '';
      const length = Math.max(numFloat.length, num2Float.length);
      const times = 10 ** length;
      const result =
        type === 'reduce'
          ? ((+arg1 * times - +arg2 * times) / times).toFixed(length)
          : ((+arg1 * times + +arg2 * times) / times).toFixed(length);
      return parseFloat(result);
    },
  },
});
