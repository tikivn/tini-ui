type Status = 'in-progress' | 'success' | 'error' | null;
type Shape = 'rounded' | 'sharp';

type ProgressProps = {
  className?: string;
  style?: string;
  showInfo?: boolean;
  status?: Status;
  strokeWidth?: number;
  activeColor?: string;
  backgroundColor?: string;
  active?: boolean;
  shape?: Shape;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  percent: number;
};

Component({
  props: {
    className: '',
    style: '',
    percent: 0,
    showInfo: false,
    status: null,
    shape: 'sharp',
    strokeWidth: 4,
    activeColor: 'var(--color-progress-base-background-active)',
    backgroundColor: 'var(--color-progress-base-background-inactive)',
    icon: null,
    iconSize: 20,
    iconColor: 'var(--color-alias-brand)',
    active: false,
  } as ProgressProps,
});
