import { selectAsync, selectAllAsync } from '../_util/query';

type Sidebar = {
  title: string;
  badgeText: string;
  showBadge?: boolean;
  icon?: string;
  iconActive?: string;
  image?: string;
  imageActive?: string;
  anchor: number | string;
  expandChildren: boolean;
  children: Array<{ title: string; anchor: number | string }>;
};
type Props = {
  activeItem: number;
  activeChild?: number;
  width?: string;
  className: string;
  items: Sidebar[];
  direction: 'horizontal' | 'vertical';
  animated: boolean;
  swipeable: boolean;
  sidebarActiveTextColor: string;
  sidebarInactiveTextColor: string;
  sidebarActiveBgColor: string;
  sidebarInactiveBgColor: string;
  sidebarlineColor: string;
  sidebarlineShow: boolean;
  sidebarActiveIconColor: string;
  sidebarInactiveIconColor: string;
  onItemClick(index: number): void;
  onChildClick(parentIndex: number, index: number): void;
};
type Data = {
  tabTop: number;
  wrapScrollTop: number;
};

Component({
  data: {
    tabTop: 0,
    wrapScrollTop: 0,
  } as Data,
  props: {
    activeItem: 0,
    className: '',
    width: '124px',
    items: [],
    direction: 'horizontal',
    animated: false,
    swipeable: false,
    sidebarInactiveTextColor: '#808089',
    sidebarActiveTextColor: '#1A94FF',
    sidebarActiveBgColor: '#ffffff',
    sidebarInactiveBgColor: '#f5f5f5',
    sidebarlineColor: '#1A94FF',
    sidebarActiveIconColor: '#1A94FF',
    sidebarInactiveIconColor: '#c4c4cf',
    sidebarlineShow: false,
  } as Props,
  async didMount() {
    this.isScrolling = false;
    this.onlyChangeTab = false;
    this.timerId = null;
    await this.calcHeight();
    const { items, activeItem, activeChild } = this.props;
    if (activeChild) {
      if (items[activeItem][activeChild]) {
        this.setData({
          wrapScrollTop: this.anchorMap[items[activeItem][activeChild].anchor],
        });
      } else {
        console.warn('The anchor is invalid. Make sure your child has anchor');
      }
    } else {
      this.setData({
        wrapScrollTop: this.anchorMap[items[activeItem].anchor],
      });
    }
    this.moveScrollBar(activeItem);
  },
  didUpdate(prevProps) {
    const { activeItem, items, activeChild } = this.props;
    if (
      items.length !== prevProps.items.length ||
      activeItem !== prevProps.activeItem ||
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
      const slides = await selectAsync(`.tm-sidebar-slides-${this.$id}`);
      this.wrapHeight = (<my.IBoundingClientRect>slides).height;
      const items = this.props.items || [];

      // Select content
      const allSlideSelector = items
        .reduce((arr, tab) => {
          if ((tab.children || []).length === 0) {
            arr.push(`#tm-sidebar-slide-${tab.anchor}`);
          } else {
            const children = tab.children.map((child) => `#tm-sidebar-slide-${child.anchor}`);
            arr.push(...children);
          }
          return arr;
        }, [] as string[])
        .join(',');
      const allSlide = await selectAllAsync(allSlideSelector);
      const rects = (<my.IBoundingClientRect[]>allSlide).sort((a, b) => a.top - b.top);

      // Init anchorMap
      for (let i = 0; i < items.length; i += 1) {
        if ((items[i].children || []).length) {
          for (const child of items[i].children) {
            this.anchorMap[child.anchor] = 0;
          }
        } else {
          this.anchorMap[items[i].anchor] = 0;
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
      const { items, activeItem, swipeable, activeChild, onChildClick } = this.props;
      if (!this.isScrolling || !swipeable || this.onlyChangeTab) {
        if (activeItem !== parent || activeChild !== index) {
          onChildClick && onChildClick(parent, index);
        }

        let tabIndex = 0;
        items.some((item, idx) => {
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
      const { activeItem, onItemClick, swipeable, items } = this.props;
      if (items[index].children?.length && onItemClick) {
        onItemClick(index);
        return;
      }

      if (!this.isScrolling || !swipeable || this.onlyChangeTab) {
        if (activeItem !== index && onItemClick) {
          onItemClick(index);
        }

        let tabIndex = -1;
        items.some((item, idx) => {
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
