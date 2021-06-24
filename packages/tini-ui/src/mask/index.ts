import fmtEvent from '../_util/fmtEvent';

Component({
  props: {
    maskZindex: '',
    type: 'product',
    onMaskTap: () => {},
    show: true,
    fixMaskFull: false,
  },
  methods: {
    onMaskClick(e) {
      const { onMaskTap } = this.props;
      if (onMaskTap !== '' && typeof onMaskTap === 'function') {
        const event = fmtEvent(this.props, e);
        onMaskTap(event);
      }
    },
  },
});
