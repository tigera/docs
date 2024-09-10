import React from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import { useColorMode } from '@chakra-ui/react';

export default function ColorModeToggleWrapper(props: any) {
  const { value } = props;
  const colorMode = useColorMode();

  React.useEffect(() => {
    colorMode.setColorMode(value);
  }, [value]);

  return (
    <>
      <ColorModeToggle {...props} />
    </>
  );
}
