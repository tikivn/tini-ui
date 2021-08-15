import { getCities } from './address';

Page({
  data: {
    selected: null,
    selected1: 'Nhẹ hơn 1 ký',
    items1: ['Nhẹ hơn 1 ký', '2kg', '1kg', '0.5kg'],
    items2: [
      { key: 1, label: 'Item 1111111111111111111111111111111111111111' },
      { key: 2, label: 'Item 2' },
      { key: 3, label: 'Item 3' },
      { key: 4, label: 'Item 4' },
      { key: 5, label: 'Item 5' },
      { key: 6, label: 'Item 6' },
      { key: 7, label: 'Item 7' },
      { key: 8, label: 'Item 8' },
      { key: 9, label: 'Item 9' },
    ],
    selected3: [
      { key: 1, label: 'Item 1' },
      { key: 2, label: 'Item 2' },
      { key: 3, label: 'Item 3' },
    ],
  },
  async getCities() {
    const cities = await getCities();
    this.setData({ cities });
  },
  async onLoad() {
    await this.getCities();
  },
  onSelect(selected) {
    this.setData({ selected });
  },
  onSelect1(selected1) {
    this.setData({ selected1 });
  },
  onSelect2(selected2) {
    this.setData({ selected2 });
  },
  onSelect3(selected3) {
    this.setData({ selected3 });
  },
  onSearch(e) {
    console.log('search e :>> ', e);
  },
});
