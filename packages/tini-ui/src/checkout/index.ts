import { ICoupon } from './coupon/coupon-item/index';
import { IPriceInfo } from './price-breakdown/index';
import { IContactInfo } from './contact-info/index';
import { INoteInfo } from './note-info/index';
import { IShippingMethods } from './shipping-method/index';
import { IPaymentMethods } from './payment-method/index';
import { IOrderSummary } from './order-summary/index';
import { IShippingDetail } from './shipping-detail/index';
import { InformComponentProps } from './../inform/index';
export interface CheckoutMethods {
  onSubmitPayment?: () => void;
  onApplyCoupon?: () => void;
  onApplyCouponInput?: () => void;
}

export interface ConfigsCheckout {
  top_inform?: InformComponentProps;
  shipping_detail?: IShippingDetail;
  order_summary?: IOrderSummary;
  payment_method: IPaymentMethods;
  shipping_method: IShippingMethods;
  note_info: INoteInfo;
  contact_info: IContactInfo;
  price_breakdown: IPriceInfo;
}

export interface CheckoutComponentProps extends CheckoutMethods {
  configs: ConfigsCheckout;
  coupons?: ICoupon[];
}

Component({
  data: {
    show: false,
  },
  props: {
    configs: {},
    coupons: [],
    onSubmitPayment: () => {},
    onApplyCoupon: () => {},
    onApplyCouponInput: () => {},
  } as CheckoutComponentProps,

  methods: {
    onShowCoupon() {
      this.setData({
        show: true,
      });
    },
    onCloseCoupon() {
      this.setData({
        show: false,
      });
    },
  },
});
