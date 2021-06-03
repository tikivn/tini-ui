Page({
  data: {
    tabs: [
      {
        title: 'Tab 1',
        subTitle: 'Subtitle 1',
        number: 'HOT',
        // image:
        //   'https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_home_48px-256.png',
        // imageActive:
        //   'https://cdn1.iconfinder.com/data/icons/real-estate-building-flat-vol-1/104/building__house__home__real__estate-512.png',
        // icon: 'home',
        // iconActive: 'success',
        showBadge: true,
        badge: {
          arrow: false,
          stroke: true,
        },
      },
      {
        title: 'Tab 2',
        subTitle: 'Subtitle 2',
        number: '66',
        showBadge: true,
        badge: {
          arrow: false,
          stroke: true,
        },
      },
      // {
      //   title: 'Tab 3',
      //   subTitle: 'Subtitle 3',
      //   number: '99+',
      //   showBadge: true,
      //   badge: {
      //     arrow: true,
      //   },
      // },
      // { title: '4 Tab', subTitle: 'Subtitle 5', showBadge: true, number: 0 },
      // { title: '5 Tab', subTitle: 'Subtitle 5', number: '99+', showBadge: false },
      // { title: '3 Tab', subTitle: 'Subtitle 5', showBadge: false },
      // { title: '4 Tab', subTitle: 'Subtitle 5' },
      // { title: '15 Tab', subTitle: 'Subtitle 5' },
    ],
    activeTab: 0,
    isSwipeable: false,
  },
  handleTabClick({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  handleTabChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  onChangeSwipeable() {
    this.setData({ isSwipeable: !this.data.isSwipeable });
  },
});
