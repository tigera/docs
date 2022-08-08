import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Variables({var: variable}) {
    const {siteConfig: {customFields: {variables}}} = useDocusaurusContext();

    if (!variables || !variable) {
        return null;
    }

    const variableValue = objProp(variables, variable);

    if (!variableValue) {
        return null;
    }

    return variableValue;
}

function objProp(obj, prop) {
    return prop.split('.').reduce((p, prop) => {
        return p[prop];
    }, obj);
}
