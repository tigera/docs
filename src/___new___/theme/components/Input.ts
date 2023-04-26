import Textarea from './Textarea';

Textarea.variants.outline;

export default {
    baseStyle: {},
    sizes: {},
    variants: {
        outline: {
            field: {
                ...Textarea.variants.outline,
                height: '42px',
            },
        },
    },
    defaultProps: {
        errorBorderColor: 'tigeraRed.800',
    },
};
