export interface IStepsComponentProps {
  className?: string;
  style?: string;
  activeIndex: number;
  failIndex?: number;
  direction: string;
  items: any[];
  inactiveColor?: string;
  activeColor?: string;
  milestoneErrorColor?: string;
  milestoneSize?: string;
  reverseVertical?: boolean;
}
Component({
  props: {
    className: '',
    style: '',
    activeIndex: 0,
    failIndex: null,
    direction: 'horizontal',
    items: [],
    inactiveColor: 'rgba(0, 0, 0, 0.1)',
    activeColor: 'var(--color-alias-brand, #1a94ff)',
    milestoneErrorColor: '#ff424f',
    milestoneSize: 'var(--space-inline-16x, 16px)',
    reverseVertical: false,
  },
  data: {},
});
