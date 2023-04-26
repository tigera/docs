export default {
    baseStyle: {
        list: {
            boxShadow: '0px 0px 8px #DCDDE0', // tigeraGrey[300] - can't make work from theme for boxshadow
            borderColor: 'tigeraGrey.300',
            bg: 'tigeraWhite',
            color: 'tigeraBlack',
        },
        item: {
            color: 'tigeraBlack',
            fontSize: 'xs',
            _hover: { bg: 'tigeraBlueMedium', color: 'tigeraWhite' },
            '&[aria-checked="true"]': {
                fontWeight: 'bold',
            },
        },
        groupTitle: {
            fontSize: 'xs',
        },
    },
};
