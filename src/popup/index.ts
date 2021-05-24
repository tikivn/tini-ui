Component({
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
      if (this.props.onMaskClick) {
        this.props.onMaskClick();
      }
    },
  },
});
