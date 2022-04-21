export interface IMethod {
  value: string;
  name: string;
  desc: string;
}
export interface IShippingMethods {
  title: string;
  methods: IMethod[];
}

export interface ShippingMethodsProps {
  className?: string;
  data: IShippingMethods;
}

Component({
  props: {
    className: '',
    data: {
      title: '',
      methods: [],
    },
  } as ShippingMethodsProps,
});
