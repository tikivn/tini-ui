Page({
  data: {
    coupons: [
      {
        id: 1,
        name: 'Tên mã giảm giá',
        desc: 'Mô tả ưu đãi',
        code: 'ABC123',
        expired_time: new Date(),
        amount: 10000,
        condition: 'Điều kiện áp dụng',
      },
      {
        id: 2,
        name: 'Tên mã giảm giá',
        desc: 'Mô tả ưu đãi',
        code: 'ABC123',
        expired_time: new Date(),
        amount: 10000,
        condition: 'Điều kiện áp dụng',
      },
    ],
    configs: {
      top_inform: {
        type: 'informative',
        message: 'Informative message',
      },
      shipping_detail: {
        type: 'edit',
        title: 'Thông tin giao hàng',
        desc: 'Địa chỉ nhận hàng',
        street: '781 ABC',
        city: {
          id: '',
          name: 'HCM',
        },
        district: {
          id: '',
          name: 'Quận Tân Bình',
        },
        ward: {
          id: '',
          name: 'Phường 10',
        },
        full_name: 'Nguen Van A',
        phone_number: '090 123 4567',
      },
      pickup_detail: {
        type: 'edit',
        title: 'Thông tin nhận hàng',
        street: '781 ABC',
        city: {
          id: '',
          name: 'HCM',
        },
        district: {
          id: '',
          name: 'Quận Tân Bình',
        },
        ward: {
          id: '',
          name: 'Phường 10',
        },
        time: new Date(),
      },
      order_summary: {
        title: 'Thông tin giao hàng',
        type: 'full',
        products: [
          {
            id: 1,
            name: 'Tên sản phẩm',
            image:
              'https://salt.tikicdn.com/ts/tiniapp/98/c4/cf/6b526e265492ff1afc6ff43a91a5c574.png',
            desc: 'Mô tả/thuộc tính sản phẩm',
            note: 'Ghi chú',
            quantity: 1,
            price: {
              value: 1000000,
              discount: 10,
              icon: 'info',
            },
          },
          {
            id: 2,
            name: 'Tên sản phẩm',
            image:
              'https://salt.tikicdn.com/ts/tiniapp/98/c4/cf/6b526e265492ff1afc6ff43a91a5c574.png',
            desc: 'Mô tả/thuộc tính sản phẩm',
            note: 'Ghi chú',
            quantity: 1,
            price: {
              value: 1000000,
              discount: 10,
              icon: 'info',
            },
          },
        ],
      },
      payment_method: {
        title: 'Phương thức thanh toán',
        methods: [
          {
            value: 'cod',
            image:
              'https://salt.tikicdn.com/ts/tiniapp/c6/c3/98/fadf787add34656a0698d505ca0d6a7e.png',
            name: 'COD',
            desc: 'Thanh toán lúc nhận hàng',
          },
          {
            value: 'bank',
            image:
              'https://salt.tikicdn.com/ts/tiniapp/8a/07/75/36e674781cd6fb27fa492a7872d24c19.png',
            name: 'Chuyển khoản',
            desc: 'Chuyển khoản qua ngân hàng',
          },
          {
            value: 'atm',
            image:
              'https://salt.tikicdn.com/ts/tiniapp/4b/1d/1f/b928168e93c683505f9d257144ecf7ae.png',
            name: 'Thanh toán online',
            desc: 'Thẻ tín dụng, ATM & ví điện tử',
          },
        ],
      },
      shipping_method: {
        title: 'Phương thức vận chuyển',
        methods: [
          {
            value: 'method1',
            name: 'Phương thức vận chuyển 1',
            desc: 'Mô tả',
          },
          {
            value: 'method2',
            name: 'Phương thức vận chuyển 2',
            desc: 'Mô tả',
          },
        ],
      },
      note_info: {
        title: 'Ghi chú',
        maxlength: 100,
        placeholder: 'Ghi chú của bạn',
      },
      contact_info: {
        title: 'Thông tin liên hệ',
        fullname: 'User name',
        phone_number: '0944026118',
        email: 'anh.huynh5@tiki.vn',
      },
      price_breakdown: {
        title: 'Chi tiết giá',
        subtotal: 10000,
        fees: 10000,
        promotions: 10000,
        total: 20000,
        total_note: 'Abc',
      },
      footer: {
        term_condition: true,
        total: 10000,
        coupon: {
          id: 1,
          name: 'Tên mã giảm giá',
          desc: 'Mô tả ưu đãi',
          code: 'ABC123',
          expired_time: new Date(),
          amount: 10000,
          condition: 'Điều kiện áp dụng',
        },
      },
    },
  },
  onChangeAddressShipping(value) {
    console.log('onChangeAddressShipping', value);
  },
  onChangeAddressPickup(value) {
    console.log('onChangeAddressPickup', value);
  },
  onChangeTimePickup(value) {
    console.log('onChangeTimePickup', value);
  },
  onClose() {
    console.log('onClose');
  },
  onApplyCoupon(data) {
    console.log('onApplyCoupon', data);
  },
  onApplyCouponInput(data) {
    console.log('onApplyCouponInput', data);
  },
  onSubmitPayment(data) {
    console.log('onSubmitPayment', data);
  },
});
