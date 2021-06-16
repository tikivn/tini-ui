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
    onChange: (value: number, mode: string): void => {},
  },
  didMount() {
    const { value, min, max } = this.props;
    this.setData({
      value: Math.min(Math.max(min, value), max),
    });
  },
  didUpdate(preProps) {
    const { value, min, max } = this.props;
    if (preProps.value !== value) {
      const newValue = Math.min(Math.max(min, value), max);
      this.setData({
        value: newValue,
      });
      this.resetFn(newValue);
    }
  },
  methods: {
    changeFn(ev) {
      const { min, max, onChange, disabled, step } = this.props;
      const evType = ev.target.dataset.type;
      let { disableReduce, disableAdd, value } = this.data;
      if (!disabled) {
        if (evType === 'reduce') {
          if (value > min) {
            disableAdd = false;
            value = Math.max(min, this.getCalculateValue('reduce', +value, +step));
            disableReduce = value.toString() === min.toString();
          }
        } else {
          /* eslint-disable no-lonely-if */
          if (value < max) {
            disableReduce = false;
            value = Math.min(this.getCalculateValue('add', +value, +step), max);
            disableAdd = value.toString() === max.toString();
          }
        }
        console.log('data is', this.props, value, disableAdd, disableReduce);
        this.setData({
          value,
          disableAdd,
          disableReduce,
        });
        onChange(value, 'click');
      }
    },
    onInput(e) {
      const { max } = this.props;
      const { value } = e.detail;
      if (value >= max) {
        e.detail.value = max;
        this.setData({
          value: max,
        });
      }
      this.resetFn(Number(value), 'input');
    },
    onBlur(event) {
      const { value } = event.detail;
      const { max } = this.props;
      if (value >= max) {
        event.detail.value = max;
        this.setData({
          value: max,
        });
      }
      this.resetFn(Number(value), 'input');
    },
    resetFn(value, mode) {
      const { max, min, onChange } = this.props;
      let calculatedVal = value;
      let disableAdd = false;
      let disableReduce = false;
      if (value >= max) {
        calculatedVal = max;
        disableAdd = true;
      } else if (value <= min) {
        calculatedVal = min;
        disableReduce = true;
      }
      this.setData({
        value: calculatedVal,
        disableAdd,
        disableReduce,
      });
      onChange(calculatedVal, mode);
    },
    getCalculateValue(type, arg1, arg2) {
      const numFloat = arg1.toString().split('.')[1] || '';
      const num2Float = arg2.toString().split('.')[1] || '';
      const length = Math.max(numFloat.length, num2Float.length);
      const times = 10 ** length;
      return type === 'reduce'
        ? ((+arg1 * times - +arg2 * times) / times).toFixed(length)
        : ((+arg1 * times + +arg2 * times) / times).toFixed(length);
    },
  },
});
