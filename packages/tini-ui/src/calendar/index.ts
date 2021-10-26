import { getMonthDetails, getMonthStr } from './helper.js';

const date = new Date();
const oneDay = 60 * 60 * 24 * 1000;
const todayTimestamp =
  date.getTime() - (date.getTime() % oneDay) + date.getTimezoneOffset() * 1000 * 60;

const year = date.getFullYear();
const month = date.getMonth();

Component({
  data: {
    monthStr: getMonthStr(month),
    year: year,
    month: month,
    todayTimestamp: todayTimestamp,
    selectedDate: [],
    monthDetails: getMonthDetails(year, month),
  },
  props: {
    style: '',
    className: '',
    days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    mode: 'range', // single - range - timeOnly
    header: 'year', // year - month
    selectedDate: [],
    onSelect: () => {},
  },

  didMount() {
    const { selectedDate } = this.props;
    this.setData({
      selectedDate,
    });
  },
  deriveDataFromProps(nextProps) {
    const { selectedDate } = nextProps;
    if (selectedDate[0]) {
      const date = new Date(selectedDate[0]);
      const year = date.getFullYear();
      const month = date.getMonth();
      this.setData({
        selectedDate,
        year,
        month,
        monthDetails: getMonthDetails(year, month),
        monthStr: getMonthStr(month),
      });
    }
  },

  methods: {
    _onSelect(event) {
      const { item } = event.target.dataset;
      const { mode } = this.props;
      if (mode === 'timeOnly') {
        return;
      }
      if (mode === 'single') {
        this.onSelectSingleDate(item);
        const rs = [this.data.selectedDate[0]];
        this.props.onSelect(rs);
      }
      if (mode === 'range') {
        this.onSelectRangeDate(item);
        const { selectedDate } = this.data;
        if (selectedDate[0] && selectedDate[1]) {
          const rs = [...selectedDate];
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
    setYear(event) {
      const { offset } = event.target.dataset;
      const year = this.data.year + offset;
      const month = this.data.month;
      this.setData({
        year,
        monthDetails: getMonthDetails(year, month),
      });
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
        monthDetails: getMonthDetails(year, month),
        monthStr: getMonthStr(month),
      });
    },
  },
});
