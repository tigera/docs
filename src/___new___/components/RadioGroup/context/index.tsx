import React from 'react';

type State = { urlParam: string, value: string, setValue: (newValue: string) => void };

export const RadioGroupContext = React.createContext<
    State | undefined
>(undefined);


export const useRadioGroup = () => {
    const context = React.useContext(RadioGroupContext);

    if (context === undefined) {
        throw new Error('Context error');
    }

    return context;
};
