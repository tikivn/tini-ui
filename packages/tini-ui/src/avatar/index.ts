import { getColorName, getShortname, getFontSize } from './utils';

const DefaultSize = 40;
type AvatarProps = {
  shape?: 'circle' | 'square';
  showBorder?: boolean;
  className?: string;
  size?: number;
  src?: string;
  name?: string;
  lazyLoad?: boolean;
  style?: string;
  onError?: (e: string) => void;
  onLoad?: (e: string) => void;
};

type AvatarData = {
  shortName: string;
  color: string;
  fontSize: number;
  defaultSrc: string;
};

Component({
  data: {
    shortName: null,
    color: null,
    fontSize: null,
    defaultSize: DefaultSize,
    defaultSrc: null,
  } as AvatarData,
  props: {
    shape: 'circle',
    showBorder: true,
    className: '',
    size: DefaultSize,
    src: null,
    name: '',
    lazyLoad: false,
    style: '',
  } as AvatarProps,
  deriveDataFromProps(nextProps) {
    if (!nextProps.src) {
      this._setAvatarName(nextProps);
    }
  },
  methods: {
    _onError(e) {
      const { onError } = this.props;
      if (onError) {
        onError(e);
      }
      this._setAvatarName(this.props);
    },
    _onLoad() {},
    _setAvatarName(nextProps) {
      if (!nextProps.name) {
        this.setData({
          defaultSrc:
            'https://salt.tikicdn.com/ts/miniapp/0f/7f/84/5af725e8a6a55815a24e8e6935ef99e3.png',
        });
        return;
      }
      const shortName = getShortname(nextProps.name);
      const color = getColorName(nextProps.name);
      const fontSize = getFontSize(+nextProps.size);
      const newData = {} as Record<string, string | number>;
      if (shortName !== this.data.shortName) {
        newData.shortName = shortName;
      }
      if (color !== this.data.color) {
        newData.color = color;
      }
      if (fontSize !== this.data.fontSize) {
        newData.fontSize = fontSize;
      }
      if (Object.keys(newData)) {
        this.setData(newData);
      }
    },
  },
});
