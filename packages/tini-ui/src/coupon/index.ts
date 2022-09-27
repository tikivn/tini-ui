import type { Coupon } from './types';

type CouponData = {
  saved: string[];
};

type CouponProps = {
  show: boolean;
  coupons: Coupon[];
  onClose: () => void;
  onSelect: ({ coupon: Coupon }) => void;
};

type CouponMethods = {
  onClose: () => void;
  onSelect: ({ coupon: Coupon }) => void;
};

Component<CouponData, CouponProps, CouponMethods>({
  data: {
    saved: [],
  },
  props: {
    show: false,
    coupons: [],
    onClose: () => {},
    onSelect: () => {},
  },
  methods: {
    onClose() {
      this.props.onClose();
    },
    onSelect(data) {
      this.props.onSelect(data);
    },
  },
});
