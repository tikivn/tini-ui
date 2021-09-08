Component({
  props: {
    className: '',
    style: '',
    activeIndex: 0,
    failIndex: null,
    direction: 'horizontal',
    items: [],
    inactiveColor: 'rgba(0, 0, 0, 0.1)',
    activeColor: 'var(--brand, #1a94ff)',
    dotErrorColor: '#ff424f',
    dotSize: 'var(--space-inline-medium, 16px)',
  },
  data: {
  },
});
