import React from 'react';
import {useLocation} from '@docusaurus/router';
import variables from '@site/variables';
import objProp from '@site/src/utils/objProp';

const urlPrefixes = {
    cloud: '/calico-cloud/',
    enterprise: '/calico-enterprise/',
    openSource: '/calico/',
};

export default function Variables({var: variable}) {
    const {pathname} = useLocation();

    const productVariables = pathname.includes(urlPrefixes.cloud)
        ? variables.cloud
        : pathname.includes(urlPrefixes.enterprise)
            ? variables.enterprise
            : pathname.includes(urlPrefixes.openSource)
                ? variables.openSource
                : null;

    if (!productVariables || !variable) {
        return null;
    }

    const variableValue = objProp(productVariables, variable);

    if (!variableValue) {
        return null;
    }

    return variableValue;
}
