import type { NormalCoupon, CartCoupon } from './types';
import { getCouponCarts } from './utils';

type CouponData = {
  saved: string[];
  couponCart: any;
};

type CouponProps = {
  title?: string;
  show: boolean;
  type: 'normal' | 'cart';
  data: NormalCoupon[] | CartCoupon;
  onClose: () => void;
  onSelect: ({ coupon: Coupon }) => void;
};

type CouponMethods = {
  onClose: () => void;
  onSelect: ({ coupon: Coupon }) => void;
  normalizeCoupon: () => void;
};

Component<CouponData, CouponProps, CouponMethods>({
  data: {
    saved: [],
    couponCart: null,
  },
  props: {
    title: 'Áp dụng mã giảm giá',
    show: false,
    data: null,
    type: 'normal',
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
    normalizeCoupon() {
      const { data, type } = this.props;

      if (type === 'cart') {
        const groups = getCouponCarts(data as CartCoupon);
        this.setData({
          couponCart: groups,
        });
      }
    },
  },
});
