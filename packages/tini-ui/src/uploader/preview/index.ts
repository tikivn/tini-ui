export interface IPreviewImage {
  path: string;
  size?: number;
  width?: number;
  height?: number;
}

export interface IPreviewMethods {
  onRemoveImage?: (image: IPreviewImage) => void;
}

export interface IUploaderProps extends IPreviewMethods {
  className?: string;
  style?: string;
  mode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix';
  showPreview?: boolean;
  image: IPreviewImage;
}

Component({
  data: {
    isShowRemoveIcon: false,
  },

  props: {
    className: '',
    style: '',
    mode: 'aspectFill',
    showPreview: true,
    image: {
      path: '',
    },
  } as IUploaderProps,

  methods: {
    handleTapImage() {
      const { showPreview, image } = this.props;
      if (!showPreview) return;

      my.previewImage({
        urls: [image.path],
      });
    },

    handleRemoveImage() {
      this.props.onRemoveImage(this.props.image);
    },
  },

  didMount() {
    this.setData({
      isShowRemoveIcon: typeof this.props.onRemoveImage === 'function',
    });
  },
});
