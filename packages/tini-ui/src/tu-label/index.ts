type LabelProps = {
  className?: string;
  showBadge?: boolean;
  icon?: string;
  iconColor?: string;
  helperText?: string;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
};

Component({
  props: {
    showBadge: false,
    icon: '',
    iconColor: '',
    helperText: '',
    disabled: false,
    text: '',
  } as LabelProps,
});
