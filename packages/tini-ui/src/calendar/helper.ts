/* eslint-disable */

export const daysMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const checkPositionInRange = (item = 0, range = [1, 3]) => {
  const from = range[0];
  const to = range[1];
  if (item <= from) return -1;
  if (item > to) return 1;
  return 0;
};

export const getDayDetails = (args, tagData = []) => {
  const date = args.index - args.firstDay;
  const day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  const _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
  const inMonth = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0; // -1 ngày của tháng trước . 0 ngày của tháng hiện tại. 1 ngày của tháng sau.
  const timestamp = new Date(args.year, args.month, _date).getTime();

  const indexTagData = tagData.find((t) => {
    const dateData = getDateFromDateString(t.date, '-');
    if (!dateData) return false;
    const { date, month, year } = dateData;
    let monthCurent = 0;
    switch (inMonth) {
      case -1:
        monthCurent = args.month > 0 ? args.month : 12;
        break;
      case 0:
        monthCurent = args.month + 1;
        break;
      case 0:
        monthCurent = args.month < 11 ? args.month + 2 : 1;
        break;
    }
    return date === _date && month === monthCurent && year === args.year;
  });

  const defaultColor = {
    tagColor: '#808089',
    tagInactiveColor: 'rgba(166, 166, 176, 0.6)',
  };

  const data = indexTagData ? { ...defaultColor, ...indexTagData } : defaultColor;

  return {
    ...data,
    date: _date,
    day,
    inMonth,
    timestamp,
    dayString: daysMap[day],
  };
};

export const getNumberOfDays = (year, month) => {
  return 40 - new Date(year, month, 40).getDate();
};

export const getMonthDetails = (year, month, tagData = []) => {
  const firstDay = new Date(year, month).getDay();
  const numberOfDays = getNumberOfDays(year, month);
  const monthArray = [];
  const rows = 5;
  let currentDay = null;
  let index = 0;
  const cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails(
        {
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        },
        tagData,
      );

      monthArray.push(currentDay);
      index++;
    }
  }
  const lastDateCalendar = monthArray[rows * cols - 1].date;
  const numsDateRest = lastDateCalendar >= 28 ? numberOfDays - lastDateCalendar : -1;
  if (numsDateRest > 0) {
    for (let i = 0; i < numsDateRest; i++) {
      currentDay = getDayDetails(
        {
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        },
        tagData,
      );
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
};

export const getDateFromDateString = (dateValue, char = '/') => {
  const dateData = dateValue.split(char).map((d) => parseInt(d, 10));
  if (dateData.length < 3) return null;

  const year = dateData[2];
  const month = dateData[1];
  const date = dateData[0];
  return { year, month, date };
};

export const getDateStringFromTimestamp = (timestamp, char = '/') => {
  const dateObject = new Date(timestamp);
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  return (
    (date < 10 ? '0' + date : date) +
    char +
    (month < 10 ? '0' + month : month) +
    char +
    dateObject.getFullYear()
  );
};
