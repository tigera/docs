import { useColorMode } from '@chakra-ui/react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import React from 'react';

type ColorModeProps = {
  onChange: (value: string) => void
  value: string | null;
}

export default function ColorModeToggleWrapper({ onChange, ...rest }: ColorModeProps) {
  const { setColorMode } = useColorMode();
  const { value } = rest;

  const handleChange = (value: string) => {
    setColorMode(value);
    onChange(value);
  }

  React.useEffect(() => {
    if (value) {
      setColorMode(value);
    }
  }, [value]);

  return <ColorModeToggle {...rest} onChange={handleChange} />;
}
