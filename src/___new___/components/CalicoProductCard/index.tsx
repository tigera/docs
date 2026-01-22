import { Card, CardBody, CardHeader, Center, Heading, Image, Text } from '@chakra-ui/react';
import { cardStyles } from './styles';
import { CalicoProduct } from '../CalicoProducts';

type CalicoProductCardProps = CalicoProduct;

const CalicoProductCard: React.FC<CalicoProductCardProps> = ({
    title,
    description,
    imageSrc,
    alt,
    imageSize,
}) => <Card
    sx={cardStyles}
>
        <CardHeader pt={2} pb={0}>
            <Heading as="h5" size="md" fontWeight="bold">
                {title}
            </Heading>
        </CardHeader>

        <CardBody pb={2} pt={0}>
            <Text fontSize="sm">
                {description}
            </Text>
        </CardBody>
    </Card>

export default CalicoProductCard;