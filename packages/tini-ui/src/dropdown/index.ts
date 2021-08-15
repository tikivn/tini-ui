import { debounce } from '../_util/debounce';
import compareNormalize from '../_util/search';

type DropdownProps = {
  placeholder?: string;
  disabled?: boolean;
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
  bottomSheetButton?: string; // Available when multiple is true
  bottomSheetDistanceFromTop?: number;
  value?: any;
  errorMsg?: string;
  hasError?: boolean;
  multiple?: boolean; // If true, value must be array
  onTap?: (event: unknown) => void;
  onSelect?: (item: any) => void;
  onSearch?: (searchText: any) => void;
};

type DropdownData = {
  searchItems: Array<string> | Array<any>;
  searchText: string;
  label: string;
  showBottomSheet: boolean;
  localValue: string | Array<string> | Array<any>;
};

Component({
  props: {
    placeholder: '',
    disabled: false,
    inputCls: '',
    className: '',
    items: [],
    labelKey: 'name',
    idKey: 'id',
    showSearch: false,
    searchPlaceholder: 'Tìm kiếm',
    labelText: '',
    closeAfterSelect: true,
    bottomSheetHeight: null,
    bottomSheetTitle: 'Dropdown',
    bottomSheetButton: 'Chọn',
    bottomSheetDistanceFromTop: 100,
    multiple: false,
    onSelect: () => {},
  } as DropdownProps,
  data: {
    searchItems: [],
    searchText: '',
    label: '',
    showBottomSheet: false,
    localValue: null,
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
        typeof value === 'object'
          ? value[labelKey] ?? items.find((i) => i[idKey] === value[idKey])?.[labelKey]
          : value;
    }
    if (label !== localLabel) {
      this.setData({ label });
    }

    if (
      value !== null &&
      value !== undefined &&
      JSON.stringify(value) !== JSON.stringify(localValue)
    ) {
      this.setData({ localValue: value });
    }
  },
  didMount() {
    const { items, value, multiple } = this.props;

    this.setData({ searchItems: items, localValue: value || (multiple ? [] : '') });
    this.onSearch = debounce(this.onSearch.bind(this));
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
      const { disabled, items, onTap } = this.props;
      if (disabled) {
        return;
      }
      if (items && items.length) {
        this.setData({ showBottomSheet: true });
      }
      onTap && onTap(e);
    },
    onClose() {
      if (this.props.multiple) {
        this.hideBottomSheet(() => {
          this.setData({ localValue: this.props.value || [] });
        });
      } else {
        this.hideBottomSheet();
      }
    },
    hideBottomSheet(callback = () => {}) {
      this.setData(
        {
          showBottomSheet: false,
          searchText: '',
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
  },
});
