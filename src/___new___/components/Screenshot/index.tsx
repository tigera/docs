import { screenshot } from './styles.ts';
import { Image } from '@chakra-ui/react';

type ScreenshotProps = {
  src: string;
  alt: string;
};

const Screenshot: React.FC<ScreenshotProps> = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    sx={screenshot}
  />
);
export default Screenshot;
