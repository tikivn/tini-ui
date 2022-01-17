Component({
  data: {
    offset: 0,
    isRolling: false,
    prevDigit: 0,
  },
  didMount() {
    const digit = parseInt(this.props.digit);
    const height = parseInt(this.props.height);
    
    const offset = -digit * height;
    setTimeout(() => {
      this.setData({ offset, isRolling: true });
    }, 100);
    this.prevDigit = this.props.digit;
  },
  deriveDataFromProps(nextProps) {
    this.setData({ debug: `(${this.prevDigit}, ${nextProps.digit})`});
    if (this.prevDigit && this.prevDigit !== nextProps.digit) {
      this.reset(parseInt(this.prevDigit));
      const diff = parseInt(nextProps.digit) - parseInt(this.prevDigit);
      const offset =
        diff > 0 ? -diff * parseInt(this.props.height) : -(diff + 10) * parseInt(this.props.height);
      setTimeout(() => {
        this.setData({ offset, isRolling: true })
      }, 100);
      this.prevDigit = nextProps.digit;
    }
  },
  methods: {
    reset(prevDigit) {
      this.setData({ offset: 0, isRolling: false, prevDigit });
    }
  }
})