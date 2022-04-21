export interface IPrice {
  value: number;
  discount?: number;
  icon?: string;
}
export interface IProduct {
  id: string;
  name: string;
  image: string;
  desc: string;
  note: string;
  quantity: number;
  price: IPrice;
}
export interface IOrderSummary {
  title: string;
  type: string;
  products: IProduct[];
}

export interface OrderSummaryProps {
  className?: string;
  data: IOrderSummary;
}

Component({
  props: {
    className: '',
    data: {
      title: '',
      type: '',
      products: [],
    },
  } as OrderSummaryProps,
});
