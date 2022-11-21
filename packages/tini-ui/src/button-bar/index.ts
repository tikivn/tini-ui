
import { ButtonProps } from '../tu-button/index'
type ButtonBarProps = {
    className?: string;
    style?: string;
    buttons?: Array<ButtonProps>;
    direction?: 'row' | 'column',
    checkboxText?: string,
    onTapFirst?: (event: any) => void;
    onTapSecond?: (event: any) => void;
    onTapCheckbox?: (event: any) => void;
};

Component({
    props: {
        buttons: [
            {
                buttonText: 'Button',
            }
        ],
        direction: 'row',
        checkboxText: '',
        onTapFirst: () => { },
        onTapSecond: () => { },
        onTapCheckbox: () => { }
    } as ButtonBarProps,
    methods: {
        onTap1(event: any) {
            this.props.onTapFirst(event);
        },
        onTap2(event: any) {
            this.props.onTapSecond(event);
        },
        _onChange(event: any) {
            this.props.onTapCheckbox(event);
        }
    },
});
