import React from 'react';

type IfProps = {
    condition: boolean;
};

const If: React.FC<React.PropsWithChildren<IfProps>> = ({
    condition,
    children,
}) => {
    return condition ? <>{children}</> : null;
};

export default If;