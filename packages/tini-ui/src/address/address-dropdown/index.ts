import { isHasValue } from '../../_util/validate';
import { debounce } from '../../_util/debounce';
import compareNormalize from '../../_util/search';
import { getSystemInfoAsync } from '../../_util/system';

type DropdownProps = {
  placeholder?: string;
  disabled?: boolean;
  shape?: 'pill' | 'rounded';
  loading?: boolean;
  inputCls?: string;
  className?: string;
  items?: Array<string> | Array<any>;
  labelKey?: string;
  idKey?: string;
  showSearch?: boolean;
  closeAfterSelect?: boolean;
  searchPlaceholder?: string;
  labelText?: string;
  bottomSheetHeight?: number;
  bottomSheetTitle?: string;
  bottomSheetDistanceFromTop?: number;
  maskClose?: boolean;
  value?: any;
  errorMsg?: string;
  hasError?: boolean;
  showCheck?: boolean;
  showButtonBack?: boolean;
  showNotFound?: boolean;
  notFoundImage?: string;
  onTap?: (event: unknown) => void;
  onSelect?: (item: any) => void;
  onSearch?: (searchText: any) => void;
  onHideDropdown?: () => void;
  classBottomSheet?: string;
  showBottomSheet?: boolean;
};

type DropdownData = {
  searchItems: Array<string> | Array<any>;
  searchText: string;
  label: string;
  isShowDropdown: boolean;
  localValue: string | Array<string> | Array<any>;
  bottomSheetContainerHeight: number;
  bottomSheetScrollViewHeight: number;
  isTextFieldFocusing: boolean;
};

const BottomSheetHeaderHeight = 40;

Component({
  props: {
    disabled: false,
    shape: 'rounded',
    loading: false,
    inputCls: '',
    className: '',
    items: [],
    labelKey: 'name',
    idKey: 'id',
    showSearch: false,
    searchPlaceholder: 'Tìm kiếm',
    labelText: '',
    showCheck: true,
    showButtonBack: false,
    bottomSheetHeight: null,
    bottomSheetTitle: 'Dropdown',
    bottomSheetDistanceFromTop: 100,
    showNotFound: false,
    isShowDropdown: false,
    notFoundImage:
      'https://salt.tikicdn.com/ts/tiniapp/58/79/5e/b6dd5791d8bcb9a96b23a694747eb1d4.png',
    onSelect: () => {},
    classBottomSheet: '',
  } as DropdownProps,
  data: {
    searchItems: [],
    searchText: '',
    label: '',
    localValue: null,
    isTextFieldFocusing: false,
  } as DropdownData,
  onInit() {
    this.onSelect = debounce(this.onSelect.bind(this), 25);
  },
  didUpdate(prevProps) {
    const { onSearch, items } = this.props;
    const { searchText } = this.data;

    // TODO: Deep compare items
    if (onSearch && JSON.stringify(items) !== JSON.stringify(prevProps.items)) {
      this.setData({ searchItems: items });
    } else if (prevProps.items.length !== items.length) {
      searchText ? this.onSearch(searchText) : this.setData({ searchItems: items });
    }
  },
  deriveDataFromProps({ value, labelKey, items, idKey }) {
    const { label: localLabel } = this.data;
    let label = localLabel;

    label =
      value && typeof value === 'object'
        ? value[labelKey] ?? items.find((i) => i[idKey] === value[idKey])?.[labelKey]
        : value;

    if (label !== localLabel) {
      this.setData({ label });
    }

    if (isHasValue(value) && JSON.stringify(value) !== JSON.stringify(this.props.value)) {
      this.setData({ localValue: value });
    }
  },
  async didMount() {
    this.onSearch = debounce(this.onSearch.bind(this));

    const { items, value, bottomSheetHeight, bottomSheetDistanceFromTop, showSearch } = this.props;
    const data = { searchItems: items, localValue: value } as DropdownData;
    const sysInfo = await getSystemInfoAsync();

    if (bottomSheetHeight) {
      data.bottomSheetContainerHeight = bottomSheetHeight;
      data.bottomSheetScrollViewHeight =
        bottomSheetHeight - (showSearch ? 60 : 0) - BottomSheetHeaderHeight;
    } else {
      data.bottomSheetContainerHeight = sysInfo.windowHeight - bottomSheetDistanceFromTop;
      data.bottomSheetScrollViewHeight =
        data.bottomSheetContainerHeight - (showSearch ? 60 : 0) - BottomSheetHeaderHeight;
    }

    this.setData(data);
  },

  methods: {
    onSearch(text) {
      const { items, labelKey } = this.props;
      const searched = items.filter((i) =>
        compareNormalize(typeof i === 'object' ? i[labelKey] : i, text),
      );

      this.setData({ searchItems: searched });
    },
    onChangeSearchText(event) {
      const { onSearch } = this.props;
      const { value } = event.detail;

      if (onSearch) {
        onSearch(value);
      } else {
        this.setData({ searchText: value });
        this.onSearch(value);
      }
    },

    onClose() {
      const { onHideDropdown } = this.props;
      this.hideBottomSheet();

      onHideDropdown && onHideDropdown();
    },
    onGoBack() {
      const { onGoBack } = this.props;
      onGoBack && onGoBack();
    },
    hideBottomSheet(callback = () => {}) {
      this.setData(
        {
          isShowDropdown: false,
          searchText: '',
          searchItems: this.props.items,
        },
        callback,
      );
    },
    onSelect(event) {
      const { value, idKey, onSelect } = this.props;
      const { item } = event.target.dataset;

      if (!value || item !== value || (typeof item === 'object' && item[idKey] !== value[idKey])) {
        this.setData({ localValue: item }, () => {
          onSelect(item);
          this.setData({
            searchText: '',
            searchItems: this.props.items,
          });
        });
      }
    },

    onTextFieldFocus() {
      my.hideOverlay();
      this.setData({ isTextFieldFocusing: true });
    },
    onTextFieldBlur() {
      my.hideOverlay();
      this.setData({ isTextFieldFocusing: false });
    },
  },
});
