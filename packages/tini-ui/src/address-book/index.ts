type AddressBookProps = {
  mode: string[]; // select | edit | create
  onEdit?: (address: my.IAddress) => void;
  onSelect?: (address: my.IAddress) => void;
  onCreate?: () => void;
};
type AddressBookData = {
  status: 'loading' | 'fail' | 'success' | 'empty';
  address: my.IGetAddressSuccessResult | null;
  selectedAddress: my.IAddress | null;
};

Component({
  props: {
    mode: [],
  } as AddressBookProps,
  data: {
    status: 'loading',
    address: null,
    selectedAddress: null,
  } as AddressBookData,
  didMount() {
    // my.getAddress({
    //   success: (address: my.IGetAddressSuccessResult) => {
    //     console.log('success :>> ', address);
    //     // const fake = {
    //     //   ...address,
    //     //   data: [
    //     //     address.data[0],
    //     //     { ...address.data[0], id: 2 },
    //     //     { ...address.data[0], id: 3 },
    //     //     { ...address.data[0], id: 4 },
    //     //   ],
    //     // };
    //     // this.setData({
    //     //   // address,
    //     //   address: fake,
    //     //   status: address.data.length ? 'success' : 'empty',
    //     //   selectedAddress: address.data[0],
    //     // });
    //   },
    //   fail: (e) => {
    //     console.log('fail :>> ', e);
    //     this.setData({
    //       status: 'fail',
    //     });
    //   },
    // });
  },
  methods: {
    onClose() {},
    selectAddress(e) {
      this.setData({
        selectedAddress: e.target.dataset.item,
      });
    },
    editAddress(e) {
      this.props.onEdit && this.props.onEdit(e.target.dataset.item);
    },
    onCreate() {
      this.props.onCreate && this.props.onCreate();
    },
    onSelect() {
      this.props.onSelect && this.props.onSelect(this.data.selectedAddress);
    },
  },
});
