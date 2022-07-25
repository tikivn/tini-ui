import { getMonthDetails, checkPositionInRange } from './helper.js';
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
  validDates?: number[];
  iconColor: string;
  disabledPastDays: boolean;
  showOnlyInMonth: boolean;
}

const date = new Date();
const todayTimestamp = date.getTime();

const year = date.getFullYear();
const month = date.getMonth();

const colorMap = ['#808089', '#1A94FF'];

const FROM = 0;
const TO = 1;

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
    validDates: [],
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
      }
      if (mode === 'range') {
        this.onSelectRangeDate(item);
      }
    },

    onSelectSingleDate(item) {
      this.setData({
        selectedDate: [item.timestamp],
      });
      this.props.onSelect({ dates: [item.timestamp] });
    },

    onSelectRangeDate(item) {
      const { selectedDate } = this.data;
      let dates = [];
      if (!selectedDate[FROM] || selectedDate.length === 2) {
        dates = [item.timestamp];
      } else {
        dates =
          item.timestamp <= this.data.selectedDate[FROM]
            ? [item.timestamp, this.data.selectedDate[FROM]]
            : [this.data.selectedDate[FROM], item.timestamp];
      }

      this.setData({
        selectedDate: dates,
      });
      this.props.onSelect({ dates });
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
      const { locale } = this.props;
      const i18N = getI18nByLocale(locale);
      let year = this.data.year;
      let month = this.data.month + offset;
      if (month === -1) {
        month = 11;
        year--;
      } else if (month === 12) {
        month = 0;
        year++;
      }
      const monthStr = this.getMonthStr(month, i18N.months);

      this.setData({
        year,
        month,
        monthDetails: getMonthDetails(year, month, this.props.tagData),
        monthStr,
      });
      const rs = { dates: [...this.data.selectedDate], year, month: month + 1 };
      this.props.onChange(rs);
    },

    initDataCalender(data) {
      const { selectedDate, tagData, locale } = data;
      const i18N = getI18nByLocale(locale);
      const monthStr = this.getMonthStr(month, i18N.months);

      const keysNoSelected = {
        days: i18N.days,
        monthMap: i18N.months,
        monthDetails: getMonthDetails(year, month, tagData),
        monthStr,
      };

      let keysData = keysNoSelected as any;

      if (selectedDate[FROM]) {
        const date = new Date(selectedDate[FROM]);
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthStr = this.getMonthStr(month, i18N.months);

        keysData = {
          ...keysNoSelected,
          selectedDate,
          year,
          month,
          monthDetails: getMonthDetails(year, month, tagData),
          monthStr,
        };
      }
      this.setData(keysData);
    },
  },

  didMount() {
    this.initDataCalender(this.props);
  },

  deriveDataFromProps(nextProps) {
    if (JSON.stringify(this.props) === JSON.stringify(nextProps)) return;

    this.initDataCalender(nextProps);
  },
});
