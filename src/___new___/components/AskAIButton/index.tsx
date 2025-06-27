import { Button, Center, Text } from '@chakra-ui/react';
import { useKapa } from '../../hooks';
import { SparkleIcon } from '../../icons';
import { buttonStyles, containerStyles, textWrapStyles } from './styles';

type AskAIButtonProps = {
  query: string | null;
  onClick: () => void;
}

const AskAIButton: React.FC<AskAIButtonProps> = ({ query, onClick }) => {
  const { openModal } = useKapa();
  
  const handleClick = () => {
    openModal(query!);
    onClick()
  };

  return query ? (
    <Center sx={containerStyles}>
      <Button
        onClick={handleClick}
        sx={buttonStyles}
        leftIcon={<SparkleIcon
          color='tigeraBlack'
          boxSize='20px' />}
      >
        Ask AI about "<Text as='span' sx={textWrapStyles}>{query}</Text>"
      </Button>
    </Center>
  ) : null;
}

export default AskAIButton;