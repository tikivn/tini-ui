Page({
  data: {
    show: false,
  },
  onShowBottomSheet(e) {
    const { template } = e.target.dataset;
    console.log({
      e,
      template,
    });
    this.setData({
      show: true,
      template,
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
});
