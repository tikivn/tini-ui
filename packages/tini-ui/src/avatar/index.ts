import { getColorName, getShortname } from './utils';

const imageSize = {
  xs: 40,
  sm: 48,
  md: 56,
  lg: 72,
};

type AvatarProps = {
  shape?: 'circle' | 'square';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showNameText?: boolean;
  src?: string;
  name?: string;
  lazyLoad?: boolean;
  style?: string;
  onError?: (e: string) => void;
  onLoad?: (e: string) => void;
};

Component({
  data: {
    _borderRadius: '4px',
    shortName: null,
    color: null,
  },
  props: {
    shape: 'circle',
    size: 'md',
    src: 'https://salt.tikicdn.com/ts/miniapp/0f/7f/84/5af725e8a6a55815a24e8e6935ef99e3.png',
    name: '',
    lazyLoad: false,
    style: '',
  } as AvatarProps,
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
    if (nextProps.name && !nextProps.src) {
      this.setData({
        shortName: getShortname(nextProps.name),
        color: getColorName(nextProps.name),
      });
    }
  },
  methods: {
    _onError(e) {
      const { onError, name } = this.props;
      if (onError) {
        onError(e);
      }
      if (name) {
        this.setData({
          shortName: getShortname(name),
          color: getColorName(name),
        });
      }
    },
    _onLoad() {},
  },
});
