const CouponStatus = {
  AVAILABLE: 'available',
  CLAIMED: 'claimed',
  CHECKOUT: 'checkout',
  SAVED: 'saved',
  EXPIRED: 'expired',
  ELIGIBLE: 'eligible',
  APPLIED: 'applied',
  NOT_ELIGIBLE: 'not_eligible',
  OUT_OF_STOCK: 'out_of_stock',
};

const CartCouponGroups = [
  {
    type: 'DISCOUNT',
    title: 'Mã Giảm Giá',
    maxUsage: 1,
    items: [],
  },
  {
    type: 'SHIPPING',
    title: 'Mã Vận Chuyển',
    maxUsage: 1,
    items: [],
  },
];

export const getActionText = (status) => {
  if (status === CouponStatus.ELIGIBLE) {
    return 'Áp Dụng';
  } else if (status === CouponStatus.APPLIED) {
    return 'Bỏ Chọn';
  }

  return 'Lưu';
};

export const getCouponCarts = (data) => {
  const groups = CartCouponGroups.map((g) => ({ ...g, items: [] }));

  groups[0].maxUsage = data.maxCouponDiscountUsage >= 0 ? data.maxCouponDiscountUsage : 1;
  groups[1].maxUsage = data.maxCouponFreeshipUsage >= 0 ? data.maxCouponFreeshipUsage : 1;

  data.items.forEach((item, index) => {
    if (item.groupType === 'DISCOUNT') {
      groups[0].items.push({ ...item, index });
    }
    if (item.groupType === 'SHIPPING') {
      groups[1].items.push({ ...item, index });
    }
  });

  return groups;
};

export const getCouponStampBg = (status) => {
  switch (status) {
    case CouponStatus.SAVED:
      return 'https://tiniapp.tikicdn.com/resources/framework/images/coupon/saved-stamp.svg';
    case CouponStatus.CLAIMED:
      return 'https://tiniapp.tikicdn.com/resources/framework/images/coupon/claimed-stamp.svg';
    case CouponStatus.EXPIRED:
      return 'https://tiniapp.tikicdn.com/resources/framework/images/coupon/expired-stamp.svg';
    case CouponStatus.NOT_ELIGIBLE:
      return 'https://tiniapp.tikicdn.com/resources/framework/images/coupon/not_eligible-stamp.svg';
    case CouponStatus.OUT_OF_STOCK:
      return 'https://tiniapp.tikicdn.com/resources/framework/images/coupon/out_of_stock-stamp.svg';
    default:
      return '';
  }
};
