import { IPreviewImage } from './preview/index';

export interface IUploaderMethods {
  onChange?: (image?: IPreviewImage[]) => void;
}

export interface IUploaderProps extends IUploaderMethods {
  className?: string;
  style?: string;
  icon?: string;
  iconSize?: number;
  showPreview?: boolean;
  disabled?: boolean;
  sourceType?: string[];
}

const MAX_COUNT = 1;

Component({
  props: {
    className: '',
    style: '',
    icon: 'placeholder',
    iconSize: 40,
    showPreview: true,
    disabled: false,
    sourceType: ['camera', 'album'],

    onChange: () => {},
  } as IUploaderProps,

  data: {
    images: [],
  },

  methods: {
    async handleSelectImage() {
      const { sourceType, onChange } = this.props;

      my.chooseImage({
        sourceType,
        success: ({ tempFiles }) => {
          if (!tempFiles.length || tempFiles.length > MAX_COUNT) return;

          this.setData({
            images: tempFiles,
          });

          onChange(tempFiles);
        },
      });
    },

    handleRemoveImage() {
      const { onChange } = this.props;

      this.setData({
        images: [],
      });

      onChange([]);
    },
  },
});
