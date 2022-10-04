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
  const groups = [...CartCouponGroups];
  groups[0].maxUsage = data.maxCouponDiscountUsage >= 0 ? data.maxCouponDiscountUsage : 1;
  groups[1].maxUsage = data.maxCouponFreeshipUsage >= 0 ? data.maxCouponFreeshipUsage : 1;

  data.items.forEach((item) => {
    if (item.groupType === 'DISCOUNT') {
      groups[0].items.push(item);
    }
    if (item.groupType === 'SHIPPING') {
      groups[1].items.push(item);
    }
  });

  return groups;
};

// import claimStamp from '@/assets/coupon/claimed-stamp.svg';
// import expiredStamp from '@/assets/coupon/expired-stamp.svg';
// import notEligibleStamp from '@/assets/coupon/not_eligible-stamp.svg';
// import savedStamp from '@/assets/coupon/saved-stamp.svg';
// import outOfStockStamp from '@/assets/coupon/out_of_stock-stamp.svg';

export const getCouponStampBg = (status) => {
  switch (status) {
    case CouponStatus.SAVED:
      return '';
    case CouponStatus.CLAIMED:
      return '';
    case CouponStatus.EXPIRED:
      return '';
    case CouponStatus.NOT_ELIGIBLE:
      return '';
    case CouponStatus.OUT_OF_STOCK:
      return '';
    default:
      return '';
  }
};
