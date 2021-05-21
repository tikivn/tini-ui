type PopupComponent = ComponentOptions<{ mask: string }, { onMaskClick: () => void }>;

Component({
  data: {
    mask: 'hehe',
  },
  props: {
    className: '',
    show: false,
    position: 'bottom',
    mask: true,
    animation: true,
    disableScroll: true,
  },
  methods: {
    onTap() {
      console.log('onTap');
    },
    _onMaskClick() {
      this.props.onMaskClick();
      this.setData({ mask: 'string' });
    },
  },
} as PopupComponent);
