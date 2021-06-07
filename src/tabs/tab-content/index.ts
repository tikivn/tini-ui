type TabContentProps = {
  style?: string;
  tabId?: string;
  activeTab?: number | string;
};

Component({
  props: {
    style: '',
    tabId: '',
    activeTab: '',
  } as TabContentProps,
});
