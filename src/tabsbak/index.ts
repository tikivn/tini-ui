import fmtUnit from '../_util/fmtUnit';

type Props = {
  className: string;
  activeCls: string;
  tabBarCls: string;
  tabBarUnderlineColor: string;
  tabBarActiveTextColor: string;
  capsuleTabBarActiveTextColor: string;
  tabBarInactiveTextColor: string;
  tabBarSubTextColor: string;
  tabBarActiveSubTextColor: string;
  tabBarBackgroundColor: string;
  capsuleTabBarBackgroundColor: string;
  showPlus: boolean;
  swipeable: boolean;
  activeTab: number;
  animation: boolean;
  duration: number;
  capsule: boolean;
  hasSubTitle: boolean;
  elevator: boolean;
  floorNumber: number[];
  elevatorTop: string; // '0px'
  tabsName: string;
  showBadge: boolean;
  tabBarUnderlineWidth: string;
  tabBarUnderlineHeight: string;
  elevatorContentTop: number;
  tabContentHeight: string;
  plusIcon: string;
  plusIconSize: number;
  plusIconColor: string;
  plusImg: string;
  plusImgWidth: string;
  plusImgHeight: string;
  stickyBar: boolean;
  tabs: Array<{ number: number; title: string; showBadge: boolean; subTitle: string }> | null;
};

type Data = {
  capsule: boolean;
  swipeable: boolean;
  windowWidth: number;
  tabWidth: number;
  autoplay: boolean;
  animation: boolean;
  version: string;
  viewScrollLeft: number;
  tabViewNum: number;
  hideRightShadow: boolean;
  boxWidth: number;
  elWidth: number;
  tabFontSize15: string;
  tabFontSize13: string;
  _showPlus: boolean;
  tabsWidthArr: number[];
};

Component({
  props: {
    className: '',
    activeCls: '',
    tabBarCls: '',
    tabBarUnderlineColor: '#1677FF',
    tabBarActiveTextColor: '#1677FF',
    capsuleTabBarActiveTextColor: '#ffffff',
    tabBarInactiveTextColor: '#333333',
    tabBarSubTextColor: '#999999',
    tabBarActiveSubTextColor: '#ffffff',
    tabBarBackgroundColor: '#ffffff',
    capsuleTabBarBackgroundColor: '#e5e5e5',
    showPlus: false,
    swipeable: true,
    activeTab: 0,
    animation: true,
    duration: 500,
    capsule: false,
    hasSubTitle: false,
    elevator: false,
    floorNumber: [],
    elevatorTop: '0px',
    showBadge: false,
    tabBarUnderlineWidth: '',
    tabBarUnderlineHeight: '',
    elevatorContentTop: 0,
    tabContentHeight: '',
    plusIcon: 'add',
    plusIconSize: 16,
    plusIconColor: '',
    plusImg: '',
    plusImgWidth: '',
    plusImgHeight: '',
    stickyBar: false,
  } as Props,
  data: {
    windowWidth: 0,
    tabWidth: 0.25,
    autoplay: false,
    animation: false,
    version: '1.10.0',
    viewScrollLeft: 0,
    tabViewNum: 0,
    hideRightShadow: false,
    boxWidth: 0,
    elWidth: 0,
    tabFontSize15: fmtUnit('15px'),
    tabFontSize13: fmtUnit('13px'),
    _showPlus: false,
    tabsWidthArr: [],
  } as Data,
  async didMount() {
    const { tabs, animation, hasSubTitle, elevator, showPlus } = this.props;
    if (tabs.length !== 0 || !tabs) {
      this.setData({
        _showPlus: showPlus,
      });
      this.setWindowWidth();

      if (hasSubTitle) {
        this.setData({
          capsule: true,
        });
      }
      this.setData({
        tabWidth: tabs.length > 3 ? 0.25 : 1 / tabs.length,
        animation,
        autoplay: true,
      });
      if (elevator) {
        this.setData({
          swipeable: false,
        });

        // Get height of content
        my.createSelectorQuery()
          .select('#tm-tabs-elevator-content')
          .boundingClientRect()
          .exec((ret: unknown) => {
            console.log('ret :>> ', ret);
            if (ret && ret[0]) {
              this.setData({
                elevatorHeight: ret[0].height,
              });
            }
          });
        // 获取电梯组件每个 pane 的 top 值
        const floorNumber = await this.getElevatorHeight(tabs);
        // 滚动到指定是初始位置
        my.pageScrollTo({
          scrollTop: Math.ceil(floorNumber[this.props.activeTab]),
          duration: 1,
        });
      }

      // 初始状态下，如果 activeTab 数值较大，会将后面的 tab 前移
      let boxWidth = 0;
      let elWidth = 0;
      let elLeft = 0;
      my.createSelectorQuery()
        .select(`#tabs-item-${this.props.tabsName}-${this.props.activeTab}`)
        .boundingClientRect()
        .exec((ret) => {
          if (ret && ret[0]) {
            elWidth = (<my.IBoundingClientRect>ret[0]).width;
            elLeft = (<my.IBoundingClientRect>ret[0]).left;
            this.setData({
              elWidth,
              elLeft,
            });
          }
        });
      my.createSelectorQuery()
        .select(`#tm-tabs-bar-${this.props.tabsName}-content`)
        .boundingClientRect()
        .exec((ret) => {
          if (ret && ret[0]) {
            boxWidth = (<my.IBoundingClientRect>ret[0]).width;
            this.setData({
              boxWidth,
            });
            setTimeout(() => {
              this.setData({
                viewScrollLeft: Math.floor(
                  this.data.elWidth + this.data.elLeft - this.data.boxWidth,
                ),
              });
            }, 300);
          }
        });
    }
  },
  didUpdate(prevProps, prevData) {
    if (
      JSON.stringify(prevProps) === JSON.stringify(this.props) &&
      JSON.stringify(prevData) === JSON.stringify(this.data)
    ) {
      return;
    }
    const {
      tabs,
      elevator,
      showPlus,
      activeTab: currentActiveTab,
      tabsName,
      swipeable,
    } = this.props;
    this.setData({
      _showPlus: showPlus,
    });
    if (prevProps.tabs.length !== tabs.length) {
      this.setData({
        tabWidth: tabs.length > 3 ? 0.25 : 1 / tabs.length,
      });
    }

    if (elevator) {
      // 当 didUpdate 时判断电梯组件总高度是否发生变化
      my.createSelectorQuery()
        .select('#tm-tabs-elevator-content')
        .boundingClientRect()
        .exec((ret) => {
          if (ret && ret[0].height !== this.data.elevatorHeight) {
            // 如高度变化将页面滚动至顶部，重新设置电梯总高度
            my.pageScrollTo({
              scrollTop: 0,
              success: () => {
                this.setData({
                  elevatorHeight: ret[0].height,
                });
                // 总高度变化后，重新获取电梯组件每个 panel 的 top 值
                this.getElevatorHeight(tabs);
              },
            });
          }
        });
      this.$page.data.floorNumber = this.data.floorNumber;
      if (this.$page.data.getFloorNumber >= 0) {
        this.setData({
          tabViewNum: this.$page.data.getFloorNumber,
          prevTabViewNum: prevData.tabViewNum,
        });
      }

      if (currentActiveTab !== prevProps.activeTab) {
        this.setData({
          tabViewNum: currentActiveTab,
          prevTabViewNum: prevData.tabViewNum,
        });

        my.pageScrollTo({
          scrollTop: Math.ceil(this.data.floorNumber[currentActiveTab]),
          duration: 1,
        });
      }
    } else if (currentActiveTab !== prevProps.activeTab) {
      let boxWidth = 0;
      let elWidth = 0;
      let elLeft = 0;
      const className = `tm-tabs-bar-tab ${
        !this.props.hasSubTitle && this.props.capsule ? 'tm-tabs-bar-tab-capsule' : ''
      } ${this.props.hasSubTitle ? 'tm-tabs-bar-tab__hasSubTitle' : ''} ${this.props.tabBarCls}`;

      my.createSelectorQuery()
        .selectAll(`.${className}`)
        .boundingClientRect()
        .exec((ret) => {
          if (ret && ret[0]) {
            this.setData({
              tabsWidthArr: ret[0].map((item) => item.width),
            });
          }
        });

      my.createSelectorQuery()
        .select(`#tabs-item-${tabsName}-${currentActiveTab}`)
        .boundingClientRect()
        .exec((ret) => {
          if (ret && ret[0]) {
            elWidth = (<my.IBoundingClientRect>ret[0]).width;
            elLeft = (<my.IBoundingClientRect>ret[0]).left;
            this.setData({
              elWidth,
              elLeft,
            });
          }
        });

      my.createSelectorQuery()
        .select(`#tm-tabs-bar-${tabsName}-content`)
        .boundingClientRect()
        .exec((ret) => {
          if (ret && ret[0]) {
            boxWidth = (<my.IBoundingClientRect>ret[0]).width;
            this.setData({
              boxWidth,
            });

            // mock el.offsetLeft
            const elOffeseLeft = this.data.tabsWidthArr.reduce((prev, cur, index) => {
              if (index < this.props.activeTab) {
                // eslint-disable-next-line no-partm-reassign
                prev += cur;
              }
              return prev;
            }, 0);

            if (this.data.elWidth > this.data.boxWidth / 2) {
              setTimeout(() => {
                this.setData({
                  viewScrollLeft: elOffeseLeft - 40,
                });
              }, 300);
            } else {
              setTimeout(() => {
                this.setData({
                  viewScrollLeft: swipeable
                    ? elOffeseLeft
                    : elOffeseLeft - Math.floor(this.data.boxWidth / 2),
                });
              }, 300);
            }
          }
        });
    }
  },
  methods: {
    setWindowWidth() {
      my.getSystemInfo({
        success: (res) => {
          this.setData({
            windowWidth: res.windowWidth,
          });
        },
      });
    },
    getElevatorHeight(tabs) {
      return new Promise((resolve) => {
        for (let i = 0; i < tabs.length; i++) {
          my.createSelectorQuery()
            .select(`#tm-tabs-elevator-pane-${i}`)
            .boundingClientRect()
            .select('.tm-tabs-bar-sticky')
            .boundingClientRect()
            .exec((ret) => {
              if (ret && ret[0]) {
                const { elevatorTop, elevatorContentTop } = this.props;
                let tabContentDistance = 0;
                if (elevatorTop.match(/\d+px/)) {
                  tabContentDistance = parseInt(elevatorTop, 10);
                } else {
                  tabContentDistance = parseInt(elevatorContentTop, 10);
                }
                this.props.floorNumber[i] =
                  (<my.IBoundingClientRect>ret[0]).top - ret[1].height - tabContentDistance;
                this.setData({
                  floorNumber: this.props.floorNumber,
                });
                if (i === tabs.length - 1) {
                  resolve(this.props.floorNumber);
                }
              }
            });
        }
        setTimeout(() => {
          this.$page.data.floorNumber = this.data.floorNumber;
        }, 100);
      });
    },
    handleSwiperChange(e) {
      const { current } = e.detail;
      const { tabsName } = e.target.dataset;

      this.setData({
        tabViewNum: current,
      });

      if (this.props.onChange) {
        this.props.onChange({ index: current, tabsName });
      }
    },
    handleTabClick(e) {
      const { index, tabsName, floor } = e.target.dataset;
      if (this.props.onTabClick && !this.props.elevator) {
        this.props.onTabClick({ index, tabsName });
      }
      if (this.props.onTabClick && this.props.elevator) {
        this.setData({
          tabViewNum: this.data.prevTabViewNum,
        });
        setTimeout(() => {
          this.props.onTabClick({ index, tabsName });
        }, 300);
        my.pageScrollTo({
          scrollTop: Math.ceil(floor),
          duration: 1,
        });
      }
    },
    handlePlusClick() {
      if (this.props.onPlusClick) {
        this.props.onPlusClick();
      }
    },
  },
});
