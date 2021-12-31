import { isHasValue } from '../_util/validate';
import { debounce } from '../_util/debounce';
import compareNormalize from '../_util/search';
import { getSystemInfoAsync } from '../_util/system';

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
  useBottomSheet?: boolean;
  bottomSheetHeight?: number;
  bottomSheetTitle?: string;
  bottomSheetButton?: string; // Available when multiple is true
  bottomSheetDistanceFromTop?: number;
  maskClose?: boolean;
  value?: any;
  errorMsg?: string;
  hasError?: boolean;
  showCheck?: boolean;
  multiple?: boolean; // If true, value must be array
  onTap?: (event: unknown) => void;
  onSelect?: (item: any) => void;
  onSearch?: (searchText: any) => void;
  onHideDropdown?: () => void;
};

type DropdownData = {
  searchItems: Array<string> | Array<any>;
  searchText: string;
  label: string;
  showBottomSheet: boolean;
  localValue: string | Array<string> | Array<any>;
  bottomSheetContainerHeight: number;
  bottomSheetScrollViewHeight: number;
  isTextFieldFocusing: boolean;
};

const BottomSheetHeaderHeight = 40;

Component({
  props: {
    placeholder: '',
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
    closeAfterSelect: true,
    useBottomSheet: true,
    showCheck: true,
    bottomSheetHeight: null,
    bottomSheetTitle: 'Dropdown',
    bottomSheetButton: 'Chọn',
    bottomSheetDistanceFromTop: 100,
    maskClose: true,
    multiple: false,
    onSelect: () => {},
  } as DropdownProps,
  data: {
    searchItems: [],
    searchText: '',
    label: '',
    showBottomSheet: false,
    localValue: null,
    isTextFieldFocusing: false,
  } as DropdownData,
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
  deriveDataFromProps({ value, labelKey, items, idKey, multiple }) {
    const { localValue, label: localLabel } = this.data;
    let label = localLabel;
    if (multiple) {
      label = (value || []).map((v: any) => (typeof v === 'object' ? v[labelKey] : v)).join(', ');
    } else {
      label =
        value && typeof value === 'object'
          ? value[labelKey] ?? items.find((i) => i[idKey] === value[idKey])?.[labelKey]
          : value;
    }
    if (label !== localLabel) {
      this.setData({ label });
    }

    if (isHasValue(value) && JSON.stringify(value) !== JSON.stringify(localValue)) {
      this.setData({ localValue: value });
    }
  },
  async didMount() {
    this.onSearch = debounce(this.onSearch.bind(this));

    const { items, value, multiple, bottomSheetHeight, bottomSheetDistanceFromTop, showSearch } =
      this.props;
    const data = { searchItems: items, localValue: value || (multiple ? [] : '') } as DropdownData;
    const sysInfo = await getSystemInfoAsync();

    if (bottomSheetHeight) {
      data.bottomSheetContainerHeight = bottomSheetHeight;
      data.bottomSheetScrollViewHeight =
        bottomSheetHeight - (showSearch ? 60 : 0) - (multiple ? 100 : 0) - BottomSheetHeaderHeight;
    } else {
      data.bottomSheetContainerHeight = sysInfo.windowHeight - bottomSheetDistanceFromTop;
      data.bottomSheetScrollViewHeight =
        data.bottomSheetContainerHeight -
        (showSearch ? 60 : 0) -
        (multiple ? 100 : 0) -
        BottomSheetHeaderHeight;
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
    onTap(e) {
      const { disabled, onTap, useBottomSheet } = this.props;
      if (disabled) {
        return;
      }
      if (useBottomSheet) {
        this.setData({ showBottomSheet: true });
      }
      onTap && onTap(e);
    },
    onClose() {
      const { multiple, onHideDropdown } = this.props;
      if (multiple) {
        this.hideBottomSheet(() => {
          this.setData({ localValue: this.props.value || [] });
        });
      } else {
        this.hideBottomSheet();
      }
      onHideDropdown && onHideDropdown();
    },
    hideBottomSheet(callback = () => {}) {
      this.setData(
        {
          showBottomSheet: false,
          searchText: '',
          searchItems: this.props.items,
        },
        callback,
      );
    },
    onSelect(event) {
      const { multiple, value, idKey, closeAfterSelect, onSelect } = this.props;
      const { localValue } = this.data;
      const { item } = event.target.dataset;

      if (multiple) {
        const existedIndex = (localValue as any[]).findIndex((v) =>
          typeof item === 'object' ? v[idKey] === item[idKey] : v === item,
        );
        this.setData({
          localValue:
            existedIndex > -1
              ? (localValue as any[]).filter((_v: any, i: number) => i !== existedIndex)
              : [...localValue, item],
        });
      } else if (
        !value ||
        item !== value ||
        (typeof item === 'object' && item[idKey] !== value[idKey])
      ) {
        this.setData({ localValue: item }, () => {
          onSelect(item);
          closeAfterSelect && this.hideBottomSheet();
        });
      }
    },
    onSelectMultiple() {
      this.props.onSelect(this.data.localValue);
      this.hideBottomSheet();
    },
    onTextFieldFocus() {
      this.setData({ isTextFieldFocusing: true });
    },
    onTextFieldBlur() {
      this.setData({ isTextFieldFocusing: false });
    },
  },
});
