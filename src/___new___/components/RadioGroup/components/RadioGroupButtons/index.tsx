import { HStack, Stack, useRadioGroup as useRadioButtonsGroup } from '@chakra-ui/react';
import { useHistory, useLocation } from '@docusaurus/router';
import React from 'react';
import { useRadioGroup } from '../../context';
import RadioButton from '../RadioButton';

type RadioButtonGroupProps = {
  labels: string[],
}

const RadioGroupButtons: React.FC<RadioButtonGroupProps> = ({ labels = [] }) => {
  const { value, setValue, urlParam } = useRadioGroup();
  const history = useHistory();
  const location = useLocation();

  const handleChange = (value: string) => {
    history.push({ search: `${urlParam}=${value}`, pathname: location.pathname })
    setValue(value)
  }

  const { getRadioProps, getRootProps } = useRadioButtonsGroup({
    defaultValue: value,
    onChange: handleChange,
  })

  return (
    <Stack {...getRootProps()}>
      <HStack borderBottom='1px solid' borderBottomColor='tigeraGrey.200' pb={3}>
        {labels.map((label) => <RadioButton
          label={label}
          {...getRadioProps({ value: label })}
        />)}
      </HStack>
    </Stack>
  )
}

export default RadioGroupButtons;