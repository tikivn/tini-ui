type ButtonProps = {
    buttonText?: string,
    className?: string;
    style?: string;
    iconName?: string;
    leadingIcon?: string;
    trailingIcon?: string;
    leadingIconColor?: string;
    trailingIconColor?: string;
    shape?: 'pill' | 'rounded' | 'circle';
    size?: 'medium' | 'small' | 'large';
    formType?: 'submit' | 'reset';
    skeleton?: boolean;
    loading?: boolean;
    disabled?: boolean;
    type: 'solid' | 'outline' | 'ghost';
    onTap?: (event: any) => void;
};
type ButtonBarProps = {
    className?: string;
    style?: string;
    buttons?: Array<ButtonProps>;
    direction?: string,
    option?: string,
    onTapFirst?: () => void;
    onTapSecond?: () => void;
    onOption?: () => void;
};

Component({
    props: {
        buttons: [
            {
                buttonText: 'Button',
            }
        ],
        direction: 'row',
        onTapFirst: () => { },
        onTapSecond: () => { },
        onOption: () => { }
    } as ButtonBarProps,
    methods: {
        onTap1() {
            this.props.onTapFirst();
        },
        onTap2() {
            this.props.onTapSecond();
        },
        _onChange() {
            this.props.onOption();
        }
    },
});
