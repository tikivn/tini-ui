export type NormalCoupon = {
  app_url: string;
  coupon_code: string;
  coupon_id: number;
  coupon_type: string;
  discount_amount: number;
  expired_at: number;
  icon_name: string;
  icon_url: string;
  label: string;
  long_description: string;
  min_amount: number;
  out_of_stock: boolean;
  payment: any;
  period: string;
  rule_id: number;
  saved: boolean;
  seller_id: number;
  seller_name: boolean;
  short_description: string;
  short_title: string;
  simple_action: string;
  status: string;
  tags: string[];
  url: string;
  web_url: string;
};

export interface CartCoupon {
  total: number;
  maxCouponDiscountUsage: number;
  maxCouponUsage: number;
  msgCouponShipping: string;
  maxCouponFreeshipUsage: number;
  msgCouponDiscount: string;
  msgCartHint: string;
  items: CartCouponItem[];
  msgCart: string;
  milo_request_id: string;
}

export interface CartCouponItem {
  tags: string[];
  title: string;
  discountValue: number;
  isFollowerCouponAvailable: boolean;
  isEligible: boolean;
  isDisabled: boolean;
  discountType: string;
  couponCode: string;
  groupType: string;
  iconName: string;
  ruleName: string;
  serverTime: number;
  period: string;
  description: string;
  expiredAt: number;
  isSelected: boolean;
  conditions: string[];
  disabledMessage: string;
  ruleId: string;
  discountMax: number;
  toDate: string;
  iconUrl: string;
}
