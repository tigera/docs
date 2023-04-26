export default {
    baseStyle: {
        tablist: {
            borderColor: 'tigeraGrey.200',
            color: 'tigeraGrey.200',
            button: {
                fontSize: 'xs',
                _selected: {
                    color: 'tigeraBlack',
                    borderBottom: '2px solid',
                    borderBottomColor: 'tigeraGoldMedium',
                },
                _focus: {
                    boxShadow: 'none',
                },
            },
        },

        tab: {
            color: 'tigeraGrey.400',
            fontWeight: 700,
        },
        tabpanel: {
            px: 0,
        },
    },
};
