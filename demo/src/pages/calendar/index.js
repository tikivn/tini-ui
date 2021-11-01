Page({
  data: {
    tagData: [
      {
        date: '12-10-2021',
        tag: 'abc',
        tagColor: 'blue',
        tagInactiveColor: 'red',
      },
      {
        date: '13-10-2021',
        tag: 'abc',
        disabled: true,
      },
      {
        date: '28-09-2021',
        tag: 'abc',
        tagColor: 'blue',
        tagInactiveColor: 'red',
      },
    ],
  },
  onSelect(data) {
    console.log(data);
  },
  onChange(data) {
    console.log(data);
  },
});
