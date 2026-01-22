import { Grid } from '@chakra-ui/react';
import CalicoProductCard from '../CalicoProductCard';
import { gridStyles } from './styles';

export type CalicoProduct = {
    title: string,
    description: string,
}

const products: CalicoProduct[] = [
    {
        title: 'Calico Open Source',
        description: 'Open-source networking and security for containers and Kubernetes'
    },
    {
        title: 'Calico Cloud Free Tier',
        description: 'Observability & policy management for a single cluster'
    },
    {
        title: 'Calico Cloud',
        description: 'SaaS platform for Kubernetes networking and security'
    },
    {
        title: 'Calico Enterprise',
        description: 'Self-managed platform for Kubernetes networking and security'
    },
];

const CalicoProducts: React.FC = () => {

    return <Grid sx={gridStyles}>
        {products.map(product => <CalicoProductCard {...product} />)}
    </Grid>;
}

export default CalicoProducts;