Page({
  data: {
    input: '',
    modalOpened: false,
    modalOpened2: false,
    modalOpened21: false,
    modalOpened22: false,
    modalOpened222: false,
    modalOpened23: false,
    modalOpened3: false,
    modalOpened4: false,
    modalOpened5: false,
    modalOpened6: false,
    buttons5: [{ text: 'Left' }, { text: 'Right', extClass: 'buttonBold' }],
    buttons6: [{ text: 'Top', extClass: 'buttonBold' }, { text: 'Bottom' }],
    buttons7: [
      { text: 'Cancel', extClass: 'cancelBtn' },
      { text: 'Delete', extClass: 'deleteBtn' },
    ],
    buttons8: [
      { text: 'Button 1', extClass: 'buttonBold' },
      { text: 'Button 2' },
      { text: 'Button 3' },
    ],
  },
  openModal() {
    this.setData({
      modalOpened: true,
    });
  },
  onModalClick() {
    this.setData({
      modalOpened: false,
    });
  },
  onModalClose() {
    this.setData({
      modalOpened: false,
    });
  },
  openModal2() {
    this.setData({
      modalOpened2: true,
    });
  },
  onModalClick2() {
    this.setData({
      modalOpened2: false,
    });
  },
  onModalClose2() {
    this.setData({
      modalOpened2: false,
    });
  },
  openModal21() {
    this.setData({
      modalOpened21: true,
    });
  },
  onModalClick21() {
    this.setData({
      modalOpened21: false,
    });
  },
  onModalClose21() {
    this.setData({
      modalOpened21: false,
    });
  },
  onMaskClick21() {
    this.setData({
      modalOpened21: false,
    });
  },
  openModal22() {
    this.setData({
      modalOpened22: true,
    });
  },
  onModalClick22() {
    this.setData({
      modalOpened22: false,
    });
  },
  onModalClose22() {
    this.setData({
      modalOpened22: false,
    });
  },
  openModal222() {
    this.setData({
      modalOpened222: true,
    });
  },
  onModalClick222() {
    this.setData({
      modalOpened222: false,
    });
  },
  onModalClose222() {
    this.setData({
      modalOpened222: false,
    });
  },
  openModal23() {
    this.setData({
      modalOpened23: true,
    });
  },
  onModalClick23() {
    this.setData({
      modalOpened23: false,
    });
  },
  onModalClose23() {
    this.setData({
      modalOpened23: false,
    });
  },
  openModal3() {
    this.setData({
      modalOpened3: true,
    });
  },
  onModalClick3() {
    this.setData({
      modalOpened3: false,
    });
  },
  openModal4() {
    this.setData({
      modalOpened4: true,
    });
  },
  onModalClick4() {
    this.setData({
      modalOpened4: false,
    });
  },
  openModal5() {
    this.setData({
      modalOpened5: true,
    });
  },
  onButtonClick5(e) {
    const {
      target: { dataset },
    } = e;
    this.setData({
      modalOpened5: false,
    });
    my.alert({
      title: `Dataset：${JSON.stringify(dataset)}`,
      buttonText: 'Button',
    });
  },
  openModal6() {
    this.setData({
      modalOpened6: true,
    });
  },
  onButtonClick6(e) {
    const {
      target: { dataset },
    } = e;
    this.setData({
      modalOpened6: false,
    });
    my.alert({
      title: `Dataset：${JSON.stringify(dataset)}`,
      buttonText: 'Button',
    });
  },
  openModal7() {
    this.setData({
      modalOpened7: true,
    });
  },
  onModalClose7() {
    this.setData({
      modalOpened7: false,
    });
  },
  onButtonClick7(e) {
    const {
      target: { dataset },
    } = e;
    this.setData({
      modalOpened7: false,
    });
    my.alert({
      title: `Dataset：${JSON.stringify(dataset)}`,
      buttonText: 'Button',
    });
  },
  openModal8() {
    this.setData({
      modalOpened8: true,
    });
  },
  onButtonClick8(e) {
    const {
      target: { dataset },
    } = e;
    this.setData({
      modalOpened8: false,
    });
    my.alert({
      title: `Dataset：${JSON.stringify(dataset)}`,
      buttonText: 'Button',
    });
  },
  openModal9() {
    this.setData({
      modalOpened9: true,
    });
  },
  onModalClose9() {
    this.setData({
      modalOpened9: false,
    });
  },
});
