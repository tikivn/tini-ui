Page({
  data: {
    activeTab: 2,
    swipeable: true,
    tabs: [
      { title: 'Tab 1', anchor: 'a', number: '6' },
      { title: 'Tab 2', anchor: 'b', number: '66' },
      { title: 'Tab 3', anchor: 'c', number: '99+' },
      { title: 'Tab 4', anchor: 'd' },
      { title: 'Tab 5', anchor: 'e' },
      { title: 'Tab 6', anchor: 'f' },
    ],
    tabItemHeight: 50,
  },
  handleChange(index) {
    this.setData({
      activeTab: index,
    });
  },
  onChange(index) {
    this.setData({
      activeTab: index,
    });
  },
  changeHeight() {
    this.setData({
      tabItemHeight: this.data.tabItemHeight + 5,
    });
  },
  changeSwipeable() {
    this.setData({
      swipeable: !this.data.swipeable,
    });
  },
});
