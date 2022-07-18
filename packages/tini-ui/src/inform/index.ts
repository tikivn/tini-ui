import fmtEvent from '../_util/fmtEvent';

export interface InformMethods {
  onClick?: () => void;
}
export interface InformComponentProps extends InformMethods {
  className?: string;
  style?: string;
  type: string;
  title?: string;
  message?: string;
  action?: string;
  icon?: string;
  iconColor?: string;
}

Component({
  props: {
    className: '',
    style: '',
    type: 'informative',
    title: '',
    message: 'Informative message',
    action: '',
    icon: '',
    iconColor: '',
    onClick: () => {},
  } as InformComponentProps,

  methods: {
    _onClick(e) {
      const { onClick } = this.props;
      if (typeof onClick === 'function') {
        const event = fmtEvent(this.props, e);
        onClick(event);
      }
    },
  },
});
