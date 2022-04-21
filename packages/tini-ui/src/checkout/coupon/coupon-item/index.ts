export interface ICoupon {
  id: string;
  name: string;
  desc: string;
  code: string;
  expired_time: Date;
  amount: number;
  condition: string;
}

export interface CouponItemProps {
  className?: string;
  data: ICoupon;
}

Component({
  data: {
    show: false,
  },
  props: {
    className: '',
    data: {},
    onShowCoupon: () => {},
    onCloseCoupon: () => {},
    onApplyCoupon: () => {},
  },
  methods: {
    onApply() {
      const { data, onApplyCoupon } = this.props;
      this.setData({
        show: false,
      });
      this.props.onShowCoupon();
      onApplyCoupon(data);
    },
    showDetail() {
      this.props.onCloseCoupon();
      my.hideOverlay({});
      this.setData({
        show: true,
      });
    },
    onClose() {
      this.setData({
        show: false,
      });
      my.hideOverlay({});
      this.props.onShowCoupon();
    },
  },
});
