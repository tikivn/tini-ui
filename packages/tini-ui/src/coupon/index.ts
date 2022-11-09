import type { NormalCoupon, CartCoupon } from './types';
import { getCouponCarts } from './utils';

type CouponData = {
  saved: string[];
  expand: number[];
  searchText: string;
  couponCart: any;
};

type CouponProps = {
  show: boolean;
  type: 'normal' | 'cart';
  data: NormalCoupon[] | CartCoupon;
  title?: string;
  showSearch?: boolean;
  showActionButton?: boolean;
  onClose: () => void;
  onClickAction: ({ content: string }) => void;
  onSelect: ({ coupon: Coupon }) => void;
};

type CouponMethods = {
  onClose: () => void;
  onInput: (event: any) => void;
  onSelect: ({ coupon: Coupon }) => void;
  onExpand: (event: any) => void;
  onClickAction: () => void;
  normalizeCoupon: () => void;
};

Component<CouponData, CouponProps, CouponMethods>({
  data: {
    saved: [],
    expand: [],
    searchText: '',
    couponCart: null,
  },
  props: {
    title: 'Áp dụng mã giảm giá',
    show: false,
    data: null,
    type: 'normal',
    showSearch: false,
    showActionButton: true,
    onClickAction: () => { },
    onClose: () => { },
    onSelect: () => { },
  },
  methods: {
    onClose() {
      this.props.onClose();
    },
    onSelect(event) {
      const { data, type } = this.props;
      if (type === 'cart') {
        const coupon = (data as CartCoupon).items.find((_, index) => index === event.coupon.index);
        this.props.onSelect({ coupon });
      } else {
        this.props.onSelect({ coupon: event.coupon });
      }
    },
    onInput(event) {
      this.setData({ searchText: event.detail.value });
    },
    onClickAction() {
      this.props.onClickAction({ content: this.data.searchText });
    },
    onExpand(event) {
      const { expand } = this.data;
      const index = event.target.dataset.index;

      if (expand.includes(index)) {
        this.setData({ expand: expand.filter((i) => i !== index) });
      } else {
        this.setData({ expand: expand.concat([index]) });
      }
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
