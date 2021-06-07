Page({
  data: {
    activeItem: 2,
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
      {
        title: 'Tab 3',
        anchor: 'c',
        number: '66',
        showBadge: true,
        badge: {
          arrow: false,
          stroke: true,
        },
      },
      { title: 'Tab 4', number: 'HOT', showBadge: true, anchor: 'd' },
      { title: 'Tab 5', icon: 'home', showBadge: true, anchor: 'e' },
      {
        title: 'Tab 6',
        image:
          'https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_home_48px-256.png',
        imageActive:
          'https://cdn1.iconfinder.com/data/icons/real-estate-building-flat-vol-1/104/building__house__home__real__estate-512.png',
        icon: 'home',
        iconActive: 'success',
        anchor: 'f',
      },
    ],
  },
  onTabClick(index) {
    const activeItem = this.data.tabs[index];
    if (activeItem.children && activeItem.children.length > 0) {
      this.setData({
        tabs: this.data.tabs.map((item, tabIndex) =>
          tabIndex === index ? { ...item, expandChildren: !activeItem.expandChildren } : item,
        ),
      });
    } else {
      this.setData({
        activeItem: index,
      });
    }
  },
  onChildClick(parentIndex, index) {
    this.setData({
      activeItem: parentIndex,
      activeChild: index,
    });
  },
  onChange(index) {
    this.setData({
      activeItem: index,
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
