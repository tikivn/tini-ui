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
export interface IPickupDetail extends IAddressFull {
  title: string;
}

export interface PickupDetailProps {
  className?: string;
  data: IPickupDetail;
  onChangeAddressPickup: (value: IAddressFull) => void;
  onChangeTimePickup: (value: Date) => void;
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
    },
    onChangeAddressPickup: () => {},
    onChangeTimePickup: () => {},
  } as PickupDetailProps,
  methods: {
    onChangeAddress(value) {
      const { onChangeAddressPickup } = this.props;
      onChangeAddressPickup(value);
    },
    onChangeTime(value) {
      const { onChangeTimePickup } = this.props;
      onChangeTimePickup(value);
    },
  },
});
