export interface IAddress {
  id: string;
  name: string;
}

export interface IAddressFull {
  street: string;
  city: IAddress;
  district: IAddress;
  ward: IAddress;
}
export interface IShippingDetail extends IAddressFull {
  title: string;
  desc: string;
  full_name: string;
  phone_number: string;
}

export interface ShippingDetailProps {
  className?: string;
  data: IShippingDetail;
  onChangeAddressShipping: (value: IAddressFull) => void;
}

Component({
  props: {
    className: '',
    data: {
      title: '',
      desc: '',
      street: '',
      city: {
        id: '',
        name: '',
      },
      district: {
        id: '',
        name: '',
      },
      ward: {
        id: '',
        name: '',
      },
      full_name: '',
      phone_number: '',
    },
    onChangeAddressShipping: () => {},
  } as ShippingDetailProps,
  methods: {
    onChange(value) {
      const { onChangeAddressShipping } = this.props;
      onChangeAddressShipping(value);
    },
  },
});
