Component({
  props: {
    className: '',
    label: '',
    length: 4,
    shape: 'rounded',
    disabled: false,
    secret: false,
    error: '',
    onChange: () => {},
    onComplete: () => {},
  },

  data: {
    currentIndex: 0,
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
    this.values = Array(this.props.length).fill('');
  },
});
