import { CouponCarts } from './mocks';

Page({
  data: {
    coupons: CouponCarts,
  },
  onSelect(data) {
    console.log(data);
  },
  onClickAction(data) {

    console.log(data);
  }
});
