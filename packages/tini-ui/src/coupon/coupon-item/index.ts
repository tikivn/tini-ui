import type { Coupon } from '../types';

type CouponItemData = {
  show: boolean;
  isSaved: boolean;
};

type CouponItemProps = {
  data: Coupon;
  className?: string;
  onShowCoupon: (params: { coupon: Coupon }) => void;
  onCloseCoupon: () => void;
  onSelect: (params: { coupon: Coupon }) => void;
};

type CouponItemMethods = {
  isShowDetail: boolean;
  onSelect: () => void;
  showDetail: () => void;
  onClose: () => void;
};

Component<CouponItemData, CouponItemProps, CouponItemMethods>({
  data: {
    show: false,
    isSaved: false,
  },
  props: {
    className: '',
    data: null,
    onShowCoupon: () => {},
    onCloseCoupon: () => {},
    onSelect: () => {},
  },
  methods: {
    onSelect() {
      const { data, onSelect } = this.props;
      onSelect({ coupon: data });
      this.setData({ isSaved: true });
    },
    showDetail() {
      this.props.onCloseCoupon();
      my.hideOverlay({});
      this.setData({ isShowDetail: true });
    },
    onClose() {
      this.setData({ show: false });
      my.hideOverlay({});
      this.props.onShowCoupon(null);
    },
  },
});
