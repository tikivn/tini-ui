import { getMonthDetails } from './helper.js';
import { getI18nByLocale } from '../_util/getI18n';

export interface CalendarMethods {
  onSelect?: (data) => void;
  onChange?: (data) => void;
}

export interface TagDataProps {
  date?: string;
  tag?: string;
  disabled?: boolean;
  tagColor?: string;
  tagInactiveColor?: string;
}
export interface CalendarComponentProps extends CalendarMethods {
  className?: string;
  style?: string;
  locale?: 'vi' | 'en';
  tagData?: TagDataProps[];
  mode?: 'single' | 'range' | 'timeOnly';
  header?: 'year' | 'month';
  selectedDate?: number[];
  iconColor: string;
  disabledPastDays: boolean;
  showOnlyInMonth: boolean;
}

const date = new Date();
const oneDay = 60 * 60 * 24 * 1000;
const todayTimestamp =
  date.getTime() - (date.getTime() % oneDay) + date.getTimezoneOffset() * 1000 * 60;

const year = date.getFullYear();
const month = date.getMonth();

const colorMap = ['#808089', '#1A94FF'];

Component({
  data: {
    days: [],
    monthMap: [],
    colorMap,
    monthStr: '',
    year: year,
    month: month,
    todayTimestamp: todayTimestamp,
    selectedDate: [],
    monthDetails: [],
  },
  props: {
    style: '',
    className: '',
    locale: 'vi',
    tagData: [],
    mode: 'timeOnly', // single - range - timeOnly
    header: 'month', // year - month
    selectedDate: [],
    iconColor: '#1A94FF',
    disabledPastDays: false,
    showOnlyInMonth: false,
    onSelect: () => {},
    onChange: () => {},
  } as CalendarComponentProps,

  methods: {
    _onSelect(event) {
      const { item } = event.target.dataset;
      const { mode } = this.props;
      if (mode === 'timeOnly') {
        return;
      }
      if (mode === 'single') {
        this.onSelectSingleDate(item);
        const rs = { dates: [this.data.selectedDate[0]] };
        this.props.onSelect(rs);
      }
      if (mode === 'range') {
        this.onSelectRangeDate(item);
        const { selectedDate } = this.data;
        if (selectedDate[0] && selectedDate[1]) {
          const rs = { dates: [...selectedDate] };
          this.props.onSelect(rs);
        }
      }
    },

    onSelectSingleDate(item) {
      this.setData({
        selectedDate: [item.timestamp],
      });
    },

    onSelectRangeDate(item) {
      const { selectedDate } = this.data;
      if (!selectedDate[0]) {
        this.setData({
          selectedDate: [item.timestamp],
        });
        return;
      }
      if (!selectedDate[1]) {
        const key =
          item.timestamp <= this.data.selectedDate[0]
            ? { selectedDate: [item.timestamp, this.data.selectedDate[0]] }
            : { selectedDate: [this.data.selectedDate[0], item.timestamp] };
        this.setData({
          ...key,
        });
        return;
      }
      this.setData({
        selectedDate: [item.timestamp],
      });
    },

    getMonthStr(month, monthMap) {
      return monthMap[month] || 'Month';
    },

    setYear(event) {
      const { offset } = event.target.dataset;
      const year = this.data.year + offset;
      const month = this.data.month;
      this.setData({
        year,
        monthDetails: getMonthDetails(year, month, this.props.tagData),
      });

      const rs = { dates: [...this.data.selectedDate], year, month: month + 1 };
      this.props.onChange(rs);
    },

    setMonth(event) {
      const { offset } = event.target.dataset;
      let year = this.data.year;
      let month = this.data.month + offset;
      if (month === -1) {
        month = 11;
        year--;
      } else if (month === 12) {
        month = 0;
        year++;
      }
      this.setData({
        year,
        month,
        monthDetails: getMonthDetails(year, month, this.props.tagData),
        monthStr: this.getMonthStr(month, this.data.monthMap),
      });
      const rs = { dates: [...this.data.selectedDate], year, month: month + 1 };
      this.props.onChange(rs);
    },
  },

  didMount() {
    const { selectedDate, locale, tagData } = this.props;
    const i18N = getI18nByLocale(locale);
    const monthStr = this.getMonthStr(month, i18N.months);
    this.setData({
      days: i18N.days,
      monthMap: i18N.months,
      monthDetails: getMonthDetails(year, month, tagData),
      monthStr,
      selectedDate,
    });
  },
  deriveDataFromProps(nextProps) {
    const { selectedDate, tagData } = nextProps;
    if (selectedDate[0]) {
      const date = new Date(selectedDate[0]);
      const year = date.getFullYear();
      const month = date.getMonth();
      this.setData({
        selectedDate,
        year,
        month,
        monthDetails: getMonthDetails(year, month, tagData),
        monthStr: this.getMonthStr(month, this.data.monthMap),
      });
    }
  },
});
