Component({
  props: {
    className: '',
    data: {},
    onClick: () => {},
  },
  methods: {
    _onClick() {
      this.props.onClick();
    },
  },
});
