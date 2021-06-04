// NOTE: If tab has children, no need anchor
Page({
  data: {
    activeTab: 2,
    activeChild: null,
    swipeable: false,
    tabs: [
      {
        title: 'Tab 1',
        anchor: 'a',
        number: '6',
        expandChildren: true,
        children: [
          { title: 'Sub 1', anchor: '1' },
          { title: 'Sub 2', anchor: '2' },
        ],
      },
      {
        title: 'Tab 2',
        anchor: 'b',
        number: '66',
        children: [
          { title: 'Sub 3', anchor: '3' },
          { title: 'Sub 4', anchor: '4' },
        ],
      },
      { title: 'Tab 3', anchor: 'c', number: '99+' },
      { title: 'Tab 4', anchor: 'd' },
      { title: 'Tab 5', anchor: 'e' },
      { title: 'Tab 6', anchor: 'f' },
    ],
    tabItemHeight: 50,
  },
  onTabClick(index) {
    const activeTab = this.data.tabs[index];
    if (activeTab.children && activeTab.children.length > 0) {
      this.setData({
        tabs: this.data.tabs.map((item, tabIndex) =>
          tabIndex === index ? { ...item, expandChildren: !activeTab.expandChildren } : item,
        ),
      });
    } else {
      this.setData({
        activeTab: index,
      });
    }
  },
  onChildClick(parentIndex, index) {
    this.setData({
      activeTab: parentIndex,
      activeChild: index,
    });
  },
  onChange(index) {
    console.log('index :>> ', index);
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
