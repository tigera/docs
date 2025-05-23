import { useRadioGroup } from '../../context';

type RadioGroupSelectionProps = { value: string }

const RadioGroupSelection: React.FC<React.PropsWithChildren<RadioGroupSelectionProps>> = ({ value, children }) => {
    const { value: selectedValue } = useRadioGroup();

    return selectedValue === value ? children : null
}

export default RadioGroupSelection;