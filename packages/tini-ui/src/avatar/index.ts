import { getI18n } from '../_util/getI18n';

const i18n = getI18n().avatar;
const imageSize = {
  xs: 40,
  sm: 48,
  md: 56,
  lg: 72,
};

Component({
  data: {
    _borderRadius: '4px',
  },
  props: {
    shape: 'circle',
    size: 'md',
    src: 'https://salt.tikicdn.com/ts/miniapp/0f/7f/84/5af725e8a6a55815a24e8e6935ef99e3.png',
    name: '',
    desc: '',
    lazyLoad: false,
    style: '',
  },
  deriveDataFromProps(nextProps) {
    if (nextProps.shape === 'circle') {
      this.setData({
        _borderRadius: `${imageSize[nextProps.size || 'md'] / 2}px`,
      });
    } else {
      this.setData({
        _borderRadius: '4px',
      });
    }
  },
  didMount: function didMount() {
    const { name, desc } = this.props;
    if (!name && desc) {
      console.error(i18n.error);
    }
  },
  methods: {
    _onError(e) {
      const { onError } = this.props;
      if (onError) {
        onError(e);
      }
    },
  },
});
