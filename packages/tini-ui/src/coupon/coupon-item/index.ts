type CouponItemData = {
  show: boolean;
  isSaved: boolean;
};

type CouponItem = {
  coupon_code: string;
  icon_name: string;
  icon_url: string;
  period: string;
  short_description: string;
  short_title: string;
  tags: string[];
};

type CouponItemProps = {
  data: CouponItem;
  status?: string;
  className?: string;
  onShowCoupon: (params: { coupon: CouponItem }) => void;
  onCloseCoupon: () => void;
  onSelect: (params: { coupon: CouponItem }) => void;
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
