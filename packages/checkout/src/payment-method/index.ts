export interface IMethod {
  value: string;
  image: string;
  name: string;
  desc: string;
}
export interface IPaymentMethods {
  title: string;
  methods: IMethod[];
}

export interface PaymentMethodsProps {
  className?: string;
  data: IPaymentMethods;
}

Component({
  props: {
    className: '',
    data: {
      title: '',
      methods: [],
    },
  } as PaymentMethodsProps,
});
