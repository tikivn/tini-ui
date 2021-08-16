Page({
  data: {
    street: '',
    city: null,
    district: null,
    ward: null,
    // streetErrorMsg: 'Vui lòng nhập đủ địa chỉ',
    // cityErrorMsg: 'Vui lòng nhập thành phố',
    // districtErrorMsg: 'Vui lòng nhập quận',
    // wardErrorMsg: 'Vui lòng nhập phường',
  },
  onLoad() {
    // setTimeout(() => {
    //   this.setData({
    //     street: '128 CMT8',
    //     city: 278,
    //     district: 617,
    //     ward: 64,
    //     // streetErrorMsg: '',
    //     // cityErrorMsg: '',
    //     // districtErrorMsg: '',
    //     // wardErrorMsg: '',
    //   });
    // }, 1000);
  },
  onChangeAddress(address) {
    console.log('address :>> ', address);
  },
  onFullAddress(address) {
    console.log('full address :>> ', address);
  },
});
