import { selectAsync, selectAllAsync } from '../_util/query';
import { getSystemInfoAsync } from '../_util/system';

type Props = {
  className: string;
  activeCls: string;
  tabBarCls: string;
  tabBarUnderlineColor: string;
  tabBarActiveTextColor: string;
  tabBarInactiveTextColor: string;
  tabBarSubTextColor: string;
  tabBarActiveSubTextColor: string;
  tabBarBackgroundColor: string;
  swipeable: boolean;
  activeTab: number;
  animation: boolean;
  duration: number;
  hasSubTitle: boolean;
  tabsName: string;
  showBadge: boolean;
  tabBarUnderlineWidth: string;
  tabBarUnderlineHeight: string;
  tabContentHeight: string;
  stickyBar: boolean;
  tabs: Array<{
    title: string;
    number: number;
    showBadge?: boolean;
    subTitle?: string;
    icon?: string;
    iconActive?: string;
    image?: string;
    imageActive?: string;
    type?: 'text-only' | 'text-icon' | 'text-image';
  }> | null;
  onTabClick({ index: number, tabsName: string }): void;
  onChange({ index: number, tabsName: string }): void;
};

type Data = {
  swipeable: boolean;
  windowWidth: number;
  tabWidth: number;
  autoplay: boolean;
  animation: boolean;
  viewScrollLeft: number;
  boxWidth: number;
  elWidth: number;
  elLeft: number;
  tabsWidthArr: number[];
};

type ClickEvent<T> = {
  target: {
    dataset: T;
  };
};

Component({
  props: {
    className: '',
    activeCls: '',
    tabBarCls: '',
    tabBarUnderlineColor: '',
    tabBarActiveTextColor: '',
    tabBarInactiveTextColor: '',
    tabBarSubTextColor: '',
    tabBarActiveSubTextColor: '',
    tabBarBackgroundColor: '',
    swipeable: true,
    activeTab: 0,
    animation: true,
    duration: 500,
    hasSubTitle: false,
    showBadge: false,
    tabBarUnderlineWidth: '',
    tabBarUnderlineHeight: '',
    tabContentHeight: '',
    stickyBar: false,
  } as Props,
  data: {
    windowWidth: 0,
    tabWidth: 0.25,
    autoplay: false,
    animation: false,
    viewScrollLeft: 0,
    boxWidth: 0,
    elWidth: 0,
    tabsWidthArr: [],
  } as Data,
  async didMount() {
    const { tabs, animation, activeTab, tabsName } = this.props;
    const systemInfo = await getSystemInfoAsync();
    const data: Pick<
      Data,
      | 'windowWidth'
      | 'elWidth'
      | 'elLeft'
      | 'tabWidth'
      | 'animation'
      | 'autoplay'
      | 'boxWidth'
      | 'viewScrollLeft'
    > = {
      windowWidth: systemInfo.windowWidth,
      elWidth: this.data.elWidth,
      elLeft: this.data.elLeft,
      tabWidth: this.data.tabWidth,
      animation: this.data.animation,
      autoplay: this.data.autoplay,
      boxWidth: this.data.boxWidth,
      viewScrollLeft: this.data.viewScrollLeft,
    };

    if (tabs && tabs.length > 0) {
      data.tabWidth = tabs.length > 3 ? 0.25 : 1 / tabs.length;
      data.animation = animation;
      data.autoplay = true;

      if (+activeTab > 0) {
        const [activeTabEle, tabContentEle] = await Promise.all([
          selectAsync(`#tabs-item-${tabsName}-${activeTab}`),
          selectAsync(`#tm-tabs-bar-${tabsName}-content`),
        ]);
        data.elWidth = (<my.IBoundingClientRect>activeTabEle).width;
        data.elLeft = (<my.IBoundingClientRect>activeTabEle).left;
        data.boxWidth = (<my.IBoundingClientRect>tabContentEle).width;
        data.viewScrollLeft = Math.floor(data.elWidth + data.elLeft - data.boxWidth);
        setTimeout(() => {
          this.setData(data);
        }, 300);
      }
    }
  },
  async didUpdate(prevProps, prevData) {
    if (
      JSON.stringify(prevProps) === JSON.stringify(this.props) &&
      JSON.stringify(prevData) === JSON.stringify(this.data)
    ) {
      return;
    }
    const { activeTab: currentActiveTab, tabsName, swipeable, hasSubTitle, tabBarCls } = this.props;

    if (currentActiveTab !== prevProps.activeTab) {
      const className = `tm-tabs-bar-tab ${
        hasSubTitle ? 'tm-tabs-bar-tab__hasSubTitle' : ''
      } ${tabBarCls}`;
      // To prevent trigger multiple times setData, store value in data and update 1 time
      const data: Pick<
        Data,
        'tabsWidthArr' | 'elWidth' | 'elLeft' | 'boxWidth' | 'viewScrollLeft'
      > = {
        tabsWidthArr: this.data.tabsWidthArr,
        elWidth: this.data.elWidth,
        elLeft: this.data.elLeft,
        boxWidth: this.data.boxWidth,
        viewScrollLeft: this.data.viewScrollLeft,
      };

      const [allTabs, currentTab] = await Promise.all([
        selectAllAsync(`.${className}`),
        selectAsync(`#tabs-item-${tabsName}-${currentActiveTab}`),
      ]);
      data.tabsWidthArr = (<my.IBoundingClientRect[]>allTabs).map((item) => item.width);
      data.elWidth = (<my.IBoundingClientRect>currentTab).width;
      data.elLeft = (<my.IBoundingClientRect>currentTab).left;

      const tabContent = await selectAsync(`#tm-tabs-bar-${tabsName}-content`);
      data.boxWidth = (<my.IBoundingClientRect>tabContent).width;

      // mock el.offsetLeft
      const elOffeseLeft = data.tabsWidthArr.reduce((prev, cur, index) => {
        if (index < currentActiveTab) {
          prev += cur;
        }
        return prev;
      }, 0);

      // Update scrollLeft
      if (data.elWidth > data.boxWidth / 2) {
        data.viewScrollLeft = elOffeseLeft - 40;
      } else {
        data.viewScrollLeft = swipeable
          ? elOffeseLeft
          : elOffeseLeft - Math.floor(data.boxWidth / 2);
      }

      setTimeout(() => {
        this.setData(data);
      }, 300);
    }
  },
  methods: {
    handleTabClick(e: ClickEvent<{ index: number; tabsName: string }>) {
      const { index, tabsName } = e.target.dataset;
      if (this.props.onTabClick) {
        this.props.onTabClick({ index, tabsName });
      }
    },
    handleSwiperChange(e) {
      const { current } = e.detail;
      const { tabsName } = e.target.dataset;

      if (this.props.onChange) {
        this.props.onChange({ index: current, tabsName });
      }
    },
  },
});
