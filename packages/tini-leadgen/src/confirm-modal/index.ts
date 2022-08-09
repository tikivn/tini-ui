type ModalProps = {
  show: boolean;
  title: string;
  description: string;
  okText: string;
  cancelText: string;
  onOk: () => void;
  onCancel: () => void;
};

Component({
  props: {
    show: false,
    image: '',
    title: '',
    description: '',
    okText: '',
    cancelText: '',
    onOk: () => {},
    onCancel: () => {},
  } as ModalProps,
  methods: {
    onClose() {
      this.props.onCancel();
    },
    onCancel() {
      this.props.onCancel();
    },
    onOk() {
      this.props.onOk();
    },
  },
});
