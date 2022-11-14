import { isHasValue } from '../_util/validate';

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
  showButtonBack?: boolean;
  multiple?: boolean; // If true, value must be array
  showNotFound?: boolean;
  notFoundImage?: string;
  onTap?: (event: unknown) => void;
  onSelect?: (event: any) => void;
  onHideDropdown?: () => void;
  classBottomSheet?: string;
};

type DropdownData = {
  label: string;
  showBottomSheet: boolean;
};

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
    showButtonBack: false,
    bottomSheetHeight: null,
    bottomSheetTitle: 'Dropdown',
    bottomSheetButton: 'Chọn',
    bottomSheetDistanceFromTop: 100,
    maskClose: true,
    multiple: false,
    showNotFound: false,
    notFoundImage:
      'https://salt.tikicdn.com/ts/tiniapp/58/79/5e/b6dd5791d8bcb9a96b23a694747eb1d4.png',
    onSelect: () => {},
    classBottomSheet: '',
  } as DropdownProps,
  data: {
    label: '',
    showBottomSheet: false,
    localValue: null,
  } as DropdownData,

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
  methods: {
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

    onHideDropdown() {
      this.props.onHideDropdown();
      this.setData({ showBottomSheet: false });
    },
    onSelect(event) {
      this.props.onSelect(event);
    },
  },
});
