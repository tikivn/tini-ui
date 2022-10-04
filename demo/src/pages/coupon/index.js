import { CouponCarts } from './mocks';

Page({
  data: {
    coupons: CouponCarts,
  },
  onSelect(data) {
    console.log(data);
  },
});
