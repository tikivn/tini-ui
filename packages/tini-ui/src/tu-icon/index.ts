
export interface IIconComponentProps {
  type: string;
  size?: number;
  color?: string;
  className?: string;
  style?: string;
  onTap?: (e: any) => void
}
Component({
  props: {
    type: '',
    size: 24,
    color: '#27272A',
    className: '',
    style: '',
  },
  data: {},
  methods: {
    onTap(e) {
      if ((<IIconComponentProps>this.props).onTap instanceof Function) {
        return (<IIconComponentProps>this.props).onTap(e)
      }
    }
  }
});
