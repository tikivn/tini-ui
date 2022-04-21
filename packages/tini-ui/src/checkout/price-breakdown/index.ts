export interface IPriceInfo {
  title: string;
  subtotal: number;
  fees: number;
  promotions: number;
  total: number;
  total_note: string;
}

export interface PriceInfoProps {
  className?: string;
  data: IPriceInfo;
}

Component({
  props: {
    className: '',
    data: {},
  } as PriceInfoProps,
});
