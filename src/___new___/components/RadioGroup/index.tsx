import { useLocation } from '@docusaurus/router';
import { RadioGroupContext } from './context';
import RadioGroupButtons from './components/RadioGroupButtons';
import RadioGroupSelection from './components/RadioGroupSelection';
import React from 'react';

type RadioGroupProps = {
    defaultValue: string;
    urlParam: string;
}

const RadioGroup: React.FC<React.PropsWithChildren<RadioGroupProps>> = ({children, defaultValue, urlParam}) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [value, setValue] = React.useState<string>(params.get(urlParam) ?? defaultValue);

    return (
        <RadioGroupContext.Provider value={{
            urlParam,
            value,
            setValue
        }}>
            {children}
        </RadioGroupContext.Provider>
    );
}

export {
    RadioGroup,
    RadioGroupButtons,
    RadioGroupSelection
}