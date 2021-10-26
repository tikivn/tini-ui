import fmtEvent from '../_util/fmtEvent';
import { getDateFromDateString, getDateStringFromTimestamp } from '../calendar/helper';
export interface ChipComponentProps {
  className?: string;
  style?: string;
}
export interface ChipMethods {
  onFocus?: () => void;
  onBlur?: () => void;
}

Component({
  data: {
    border: '',
    dateInput: ['', ''],
    dateSelected: [],
    showCalendar: false,
  },
  props: {
    className: '',
    style: '',
    label: '',
    type: 'range',
    shape: 'rounded',
    placeholder: 'dd/mm/yyyy',
    error: false,
    errorMsg: 'Error message',
    disabled: false,
    onFocus: () => {},
    onBlur: () => {},
  },

  methods: {
    setDate(dateData, isStartDate = true) {
      const dateGet = new Date(dateData.year, dateData.month - 1, dateData.date).getTime();
      const key = isStartDate
        ? { dateSelected: [dateGet, this.data.dateSelected[1]] }
        : { dateSelected: [this.data.dateSelected[0], dateGet] };
      this.setData({ ...key });
      // if (this.props.onChange) {
      //   this.props.onChange(selectedDay);
      // }
    },
    onChangeStartDate(event) {
      const { value } = event.detail;
      const dateData = getDateFromDateString(value);
      if (dateData !== null) {
        this.setDate(dateData);
        console.log({ dateData });
      }
    },
    onChangeEndDate(event) {
      const { value } = event.detail;
      const dateData = getDateFromDateString(value);
      if (dateData !== null) {
        this.setDate(dateData, false);
        console.log({ dateData });
      }
    },
    _onSelect(data) {
      const dateStrings = data.map((i) => getDateStringFromTimestamp(i));
      this.setData({
        dateSelected: data,
        dateInput: dateStrings,
      });
      setTimeout(() => {
        this.setData({
          showCalendar: false,
        });
      }, 300);
    },
    _onFocus(e) {
      const { onFocus } = this.props;
      if (typeof onFocus === 'function') {
        const event = fmtEvent(this.props, e);
        this.setData({
          border: 'focus',
          showCalendar: true,
        });
        onFocus(event);
      }
    },
    _onBlur(e) {
      const { onBlur } = this.props;
      if (typeof onBlur === 'function') {
        const event = fmtEvent(this.props, e);
        this.setData({
          border: 'blur',
        });
        onBlur(event);
      }
    },
  },
});
