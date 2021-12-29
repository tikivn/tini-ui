Page({
  data: {
    showToast: false,
  },
  onShowToast() {
    this.setData({ showToast: true });
  },
  onCloseToast() {
    this.setData({ showToast: false });
  },
});
