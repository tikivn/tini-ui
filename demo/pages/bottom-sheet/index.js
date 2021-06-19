Page({
  data: {
    show: false,
  },
  onShowBottomSheet(template) {
    this.setData({
      show: true,
      template,
    });
  },
  onShowBottomSheetList() {
    this.onShowBottomSheet('list');
  },
  onShowBottomSheetText() {
    this.onShowBottomSheet('text');
  },
  onShowBottomSheetPicker() {
    this.onShowBottomSheet('picker');
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
});
