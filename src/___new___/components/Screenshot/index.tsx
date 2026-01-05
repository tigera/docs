import { screenshot } from './styles';
import { Image } from '@chakra-ui/react';

type ScreenshotProps = {
  src: string;
  alt: string;
  maxW?: string;
};

const Screenshot: React.FC<ScreenshotProps> = ({ src, alt, maxW }) => (
  <Image
    src={src}
    alt={alt}
    sx={screenshot}
    maxW={maxW}
  />
);
export default Screenshot;
