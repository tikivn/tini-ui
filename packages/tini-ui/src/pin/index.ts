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
    onChange: () => {},
    onComplete: () => {},
  },

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
    const { length, focus } = this.props;

    this.values = Array(length).fill('');

    if (focus)
      this.setData({
        currentIndex: 0,
      });
  },
});
