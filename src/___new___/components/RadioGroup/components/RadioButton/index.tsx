import { Box, RadioProps, Text, chakra, useRadio } from '@chakra-ui/react';
import { checkedStyles, styles } from './styles';


type RadioButtonProps = RadioProps & {
  label: string,
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, ...radioProps }) => {
  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
    useRadio(radioProps)
  const { isChecked } = state;


  return (
    <chakra.label {...htmlProps} cursor='pointer'>
      <input {...getInputProps({})} hidden />
      <Box
        {...getRadioProps()}
        sx={{
          ...styles,
          ...(isChecked && checkedStyles)
        }}
      >
        <Text {...getLabelProps()} as='span' lineHeight={1}>{label}</Text>
      </Box>
    </chakra.label>
  )
}

export default RadioButton;