import React from 'react';

const Highlight = ({children}) => (
    <code style={{
        padding: '2px 4px',
        fontSize: '90%',
        color: '#c7254e',
        backgroundColor: '#f9f2f4',
        borderRadius: '4px',
        border: 'none',
    }}>
        {children}
    </code>
);

export default Highlight;
