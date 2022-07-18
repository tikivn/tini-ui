import { ICoupon } from './coupon/coupon-item/index';
import { IPriceInfo } from './price-breakdown/index';
import { IContactInfo } from './contact-info/index';
import { INoteInfo } from './note-info/index';
import { IShippingMethods } from './shipping-method/index';
import { IPaymentMethods } from './payment-method/index';
import { IOrderSummary } from './order-summary/index';
import { IShippingDetail } from './shipping-detail/index';
export interface CheckoutMethods {
  onSubmitPayment?: () => void;
  onChangeAddressShipping?: () => void;
  onChangeAddressPickup?: () => void;
  onChangeTimePickup?: () => void;
  onApplyCoupon?: () => void;
  onApplyCouponInput?: () => void;
}

export interface IInform {
  type: string;
  title?: string;
  message?: string;
  action?: string;
  icon?: string;
  iconColor?: string;
}

export interface ConfigsCheckout {
  top_inform?: IInform;
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
    onChangeAddressShipping: () => {},
    onChangeAddressPickup: () => {},
    onChangeTimePickup: () => {},
  } as CheckoutComponentProps,

  methods: {
    onSubmitPayment(value) {
      const { onSubmitPayment } = this.props;
      onSubmitPayment(value);
    },
    onChangeAddressShipping(value) {
      const { onChangeAddressShipping } = this.props;
      onChangeAddressShipping(value);
    },
    onChangeAddressPickup(value) {
      const { onChangeAddressPickup } = this.props;
      onChangeAddressPickup(value);
    },
    onChangeTimePickup(value) {
      const { onChangeTimePickup } = this.props;
      onChangeTimePickup(value);
    },
    onApplyCoupon(value) {
      const { onApplyCoupon } = this.props;
      onApplyCoupon(value);
    },
    onApplyCouponInput(value) {
      const { onApplyCouponInput } = this.props;
      onApplyCouponInput(value);
    },
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
