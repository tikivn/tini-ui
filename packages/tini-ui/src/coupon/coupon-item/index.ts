export interface ICoupon {
  id: string;
  name: string;
  desc: string;
  code: string;
  expired_time: Date;
  amount: number;
  condition: string;
}

type CouponItemProps  ={
  data: ICoupon;
  className?: string;
  onShowCoupon: (data: ICoupon) => void;
  onCloseCoupon: () => void;
  onApplyCoupon: (data: ICoupon) => void;
}

Component<CouponItemsData, CouponItemProps >({
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
    onApplyCoupon() {
      const { data, onApplyCoupon } = this.props;
      this.props.onShowCoupon();
      onApplyCoupon(data);
    },
    showDetail() {
      this.props.onCloseCoupon();
      my.hideOverlay({});
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
      my.hideOverlay({});
      this.props.onShowCoupon();
    },
  },
});
