export default {
    baseStyle: {
        control: {
            _disabled: {
                bg: 'tigeraGrey.400',
                borderColor: 'tigeraGrey.400',
            },
            _checked: {
                bg: 'tigeraBlueDark',
                borderColor: 'tigeraBlueDark',
                _focus: {
                    borderColor: 'tigeraBlueDark',
                },
            },
            _indeterminate: {
                bg: 'tigeraBlueDark',
                borderColor: 'tigeraBlueDark',
                _focus: {
                    borderColor: 'tigeraBlueDark',
                },
            },
            borderColor: 'tigeraGrey.600',
            bg: 'tigeraWhite',
        },
        label: {
            color: 'tigeraGrey',
        },
    },
    sizes: {
        control: {
            width: '4',
            height: '18px',
        },
        sm: {
            label: {
                fontStyle: 'normal',
                fontWeight: 'medium',
                fontSize: 'xs',
                lineHeight: 5,
            },
        },

        md: {
            label: {
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: 'sm',
                lineHeight: '6',
            },
        },
    },
};
