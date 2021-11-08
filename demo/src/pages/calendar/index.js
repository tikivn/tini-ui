Page({
  data: {
    tagData: [
      {
        date: '12-11-2021',
        tag: 'abc',
        tagColor: 'blue',
        tagInactiveColor: 'red',
      },
      {
        date: '13-11-2021',
        tag: 'abc',
        disabled: true,
      },
      {
        date: '28-11-2021',
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
