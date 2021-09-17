Page({
  data: {
    value: '',
  },
  handleInput(e) {
    this.setData({
      value: e.detail.value,
    });
  },
  onTapCloseIcon() {
    this.setData({
      value: '',
    });
  },
  onTapSearchIcon() {
    my.alert({ title: 'Search bar', content: 'Confirm search triggered' });
  },
});
