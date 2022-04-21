import { ICoupon } from './../coupon/coupon-item/index';

export interface IFooter {
  term_condition: boolean;
  total: number;
  coupon: ICoupon;
}

export interface FooterProps {
  className?: string;
  data: IFooter;
  onClick?: () => void;
}

Component({
  props: {
    className: '',
    data: {},
    onClick: () => {},
  } as FooterProps,
  methods: {
    onClick() {
      this.props.onClick();
    },
  },
});
