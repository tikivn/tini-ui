import { selectAsync, selectAllAsync } from '../_util/query';

type Tab = {
  title: string;
  number: string;
  showBadge?: boolean;
  subTitle?: string;
  icon?: string;
  iconActive?: string;
  image?: string;
  imageActive?: string;
  anchor: number | string;
  expandChildren: boolean;
  children: Array<{ titile: string; anchor: number | string }>;
};
type Props = {
  activeTab: number;
  activeChild?: number;
  width?: string;
  className: string;
  tabs: Tab[];
  direction: 'horizontal' | 'vertical';
  animated: boolean;
  swipeable: boolean;
  tabBarActiveTextColor: string;
  tabBarInactiveTextColor: string;
  tabBarActiveBgColor: string;
  tabBarInactiveBgColor: string;
  tabBarlineColor: string;
  tabBarlineShow: boolean;
  tabBarActiveIconColor: string;
  tabBarInactiveIconColor: string;
  onTabClick(index: number): void;
  onChildClick(parentIndex: number, index: number): void;
};
type Data = {
  tabTop: number;
  wrapScrollTop: number;
};

// NOTE: Anchor of child must be unique, and not same width another tabs
// NOTE: Disable swipeable for now
Component({
  data: {
    tabTop: 0,
    wrapScrollTop: 0,
  } as Data,
  props: {
    activeTab: 0,
    className: '',
    width: '124px',
    tabs: [],
    direction: 'horizontal',
    animated: false,
    swipeable: true,
    tabBarInactiveTextColor: '#808089',
    tabBarActiveTextColor: '#1A94FF',
    tabBarActiveBgColor: '#ffffff',
    tabBarInactiveBgColor: '#f5f5f5',
    tabBarlineColor: '#1A94FF',
    tabBarActiveIconColor: '#1A94FF',
    tabBarInactiveIconColor: '#c4c4cf',
    tabBarlineShow: true,
  } as Props,
  async didMount() {
    this.isScrolling = false;
    this.onlyChangeTab = false;
    this.timerId = null;
    await this.calcHeight();
    const { tabs, activeTab, activeChild } = this.props;
    if (activeChild) {
      if (tabs[activeTab][activeChild]) {
        this.setData({
          wrapScrollTop: this.anchorMap[tabs[activeTab][activeChild].anchor],
        });
      } else {
        console.warn('The anchor is invalid. Make sure your child has anchor');
      }
    } else {
      this.setData({
        wrapScrollTop: this.anchorMap[tabs[activeTab].anchor],
      });
    }
    this.moveScrollBar(activeTab);
  },
  didUpdate(prevProps) {
    const { activeTab, tabs, activeChild } = this.props;
    if (
      tabs.length !== prevProps.tabs.length ||
      activeTab !== prevProps.activeTab ||
      activeChild !== prevProps.activeChild
    ) {
      this.calcHeight();
    }
  },
  didUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  },
  methods: {
    async onWrapTouch() {
      await this.calcHeight();
    },
    async calcHeight() {
      this.anchorMap = {};
      this.indexMap = {};
      this.indexTop = {};
      this.wrapHeight = 0;
      this.scrollWrapHeight = 0;

      // Select left sidebar
      const slides = await selectAsync(`.tm-vtabs-slides-${this.$id}`);
      this.wrapHeight = (<my.IBoundingClientRect>slides).height;
      const tabs = this.props.tabs || [];

      // Select content
      const allSlideSelector = tabs
        .reduce((arr, tab) => {
          if ((tab.children || []).length === 0) {
            arr.push(`#tm-vtab-slide-${tab.anchor}`);
          } else {
            const children = tab.children.map((child) => `#tm-vtab-slide-${child.anchor}`);
            arr.push(...children);
          }
          return arr;
        }, [] as string[])
        .join(',');
      const allSlide = await selectAllAsync(allSlideSelector);
      const rects = (<my.IBoundingClientRect[]>allSlide).sort((a, b) => a.top - b.top);

      // Init anchorMap
      for (let i = 0; i < tabs.length; i += 1) {
        if ((tabs[i].children || []).length) {
          for (const child of tabs[i].children) {
            this.anchorMap[child.anchor] = 0;
          }
        } else {
          this.anchorMap[tabs[i].anchor] = 0;
        }
      }

      // Init height
      let prevHeight = 0;
      Object.keys(this.anchorMap).forEach((key, i) => {
        const { height } = rects[i];
        this.indexMap[i] = height;
        this.anchorMap[key] = prevHeight;

        if (i === 0) {
          this.indexTop[0] = 0;
        } else {
          this.indexTop[i] =
            this.indexTop[i - 1] + Math.floor((<my.IBoundingClientRect>rects[i - 1])?.height);
        }

        prevHeight += Math.floor(height);
        this.scrollWrapHeight = prevHeight;
      });
    },
    handleChildClick(e) {
      const { parent, index } = e.target.dataset;
      const { tabs, activeTab, swipeable, activeChild, onChildClick } = this.props;
      if (!this.isScrolling || !swipeable || this.onlyChangeTab) {
        if (activeTab !== parent || activeChild !== index) {
          onChildClick && onChildClick(parent, index);
        }

        let tabIndex = 0;
        tabs.some((item, idx) => {
          if (idx === parent) {
            tabIndex += index;
            return true;
          }
          tabIndex += item.children ? item.children.length : 1;
          return false;
        }, 0);

        this.setData({
          wrapScrollTop: this.indexTop[tabIndex],
        });
      }
    },
    handleTabClick(e) {
      const { index } = e.target.dataset;
      const { activeTab, onTabClick, swipeable, tabs } = this.props;
      if (tabs[index].children?.length) {
        onTabClick(index);
        return;
      }

      if (!this.isScrolling || !swipeable || this.onlyChangeTab) {
        if (activeTab !== index) {
          onTabClick(index);
        }

        let tabIndex = -1;
        tabs.some((item, idx) => {
          if (idx <= index) {
            tabIndex += item.children ? item.children.length : 1;
            return false;
          }
          return true;
        }, 0);

        this.setData({
          wrapScrollTop: this.indexTop[tabIndex],
        });
        this.moveScrollBar(index);
      }
    },
    moveScrollBar(current) {
      let tabTop: number;
      if (current < 6) {
        tabTop = 0;
      } else {
        tabTop = (current - 5) * 36;
      }
      this.setData({ tabTop });
    },
  },
});
