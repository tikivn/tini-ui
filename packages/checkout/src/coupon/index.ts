Component({
  data: {
    value: '',
    showCoupon: true,
  },
  props: {
    className: '',
    show: false,
    coupons: [],
    onClose: () => {},
    onApplyCoupon: () => {},
    onApplyCouponInput: () => {},
  },
  methods: {
    onInput(event) {
      const { value } = event.detail;
      this.setData({
        value,
      });
    },
    onApplyCouponInput() {
      this.props.onApplyCouponInput(this.data.value);
    },
    onApplyCoupon(item) {
      this.props.onApplyCoupon(item);
    },
    onCloseCoupon() {
      this.setData({
        showCoupon: false,
      });
    },
    onClose() {
      const { onClose } = this.props;
      onClose();
    },

    onShowCoupon() {
      this.setData({
        showCoupon: true,
      });
    },
  },
});
