export default {
    baseStyle: {},
    sizes: {},
    variants: {
        outline: {
            borderRadius: 'md',
            borderWidth: '1px',
            borderColor: 'tigeraGrey.200',
            backgroundColor: 'tigeraWhite',
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            fontWeight: '500',
            fontSize: 'sm',
            lineHeight: '6',
            color: 'tigeraBlack',
            pl: '3',
            pr: '3',
            _placeholder: { color: 'tigeraGrey.400' },
            '&[aria-invalid="true"]': {
                color: 'tigeraRed.800',
                borderWidth: '1px',
                boxShadow: 'none',
            },
            _focus: {
                borderColor: 'tigeraBlueMedium',
                borderWidth: '1px',
                boxShadow: 'none',
            },
        },
    },
    defaultProps: {
        errorBorderColor: 'tigeraRed.800',
    },
};
