import type { CartCoupon } from './types';

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

export const getCouponCarts = (data: CartCoupon) => {
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
