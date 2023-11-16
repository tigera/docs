/* eslint-disable sonarjs/no-duplicate-string */
const defaultStyles = {
    table: {
        bg: 'tigeraWhite',
        border: '0px solid',
    },
    th: {
        bg: 'tigeraGrey.100',
        border: '1px solid',
        borderTopColor: 'tigeraGrey.100',
        borderBottomColor: 'tigeraGrey.100',
        borderLeftColor: 'tigeraGrey.100',
        borderLeft: 0,
        paddingLeft: 0,
        borderTop: 0,
        borderRightColor: 'tigeraGrey.100',
        fontSize: 'xs',
        fontWeight: '700',
        letterSpacing: 'normal',
        px: 2,
        py: 2,
        color: 'tigeraBlack',
        _last: {
            borderRight: 0,
        },
        _first: {
            paddingLeft: 4,
        },
    },
    tr: {
        borderBottom: '1px',
        borderBottomColor: 'tigeraGrey.200',
    },
    td: {
        fontWeight: '500',
        color: 'tigeraBlack',
        px: 2,
        py: 2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        border: 'none',
        fontSize: 'xs',
        _first: {
            paddingLeft: 4,
        },
    },
};

const smallStyles = {
    table: defaultStyles.table,
    th: {
        ...defaultStyles.th,
        fontSize: 'xxs',
        fontWeight: '700',
    },
    tr: {
        ...defaultStyles.tr,
    },
    td: {
        ...defaultStyles.td,
        fontSize: 'xxs',
        lineHeight: '18px',
    },
};

export default {
    baseStyle: {
        table: {
            bg: 'tigeraWhite',
        },
        th: {
            borderColor: 'tigeraGrey.200',
            borderBottom: '1px',
            textTransform: 'capitalize',
        },
        tr: {
            _last: {
                borderBottom: 0,
            },
        },
        td: {
            borderBottom: 0,
        },
    },
    sizes: {
        sm: smallStyles,
        md: defaultStyles,
        lg: defaultStyles, //could do with updating if required at some point
    },
    variants: {
        simple: {
            th: {
                borderBottom: '0',
                border: 'none',
                color: 'tigeraBlack',
            },
        },
        light: {
            th: {
                borderBottomColor: 'tigeraGrey.200',
                borderColor: 'tigeraWhite',
                bg: 'tigeraWhite',
                borderRightColor: 'tigeraWhite',
                borderBottom: '0',
            },
        },
        modal: {
            table: {
                bg: 'transparent',
                border: '0px solid',
            },
            th: {
                borderBottomColor: 'tigeraGrey.200',
                borderColor: 'tigeraGrey.200',
                bg: 'tigeraGrey.200',
                borderRightColor: 'tigeraGrey.200',
                borderBottom: '0',
            },
        },
        innerExpando: {
            table: {
                bg: 'transparent',
            },
            td: {
                _first: {
                    verticalAlign: 'top',
                    color: 'tigeraGrey.700',
                    pl: 8,
                },
                _last: {
                    pr: 0,
                },
            },
        },
    },
};
