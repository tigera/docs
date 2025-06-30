import { Grid } from '@chakra-ui/react';
import CalicoProductCard from '../CalicoProductCard';
import { gridStyles } from './styles';

export type CalicoProduct = {
    title: string,
    description: string,
    imageSrc: string,
    alt: string,
    imageSize?: string;
}

const products: CalicoProduct[] = [
    {
        title: 'Calico Open Source',
        description: 'Open-source networking and security for containers and Kubernetes',
        imageSrc: '/img/calico-logo-badge.svg',
        alt: 'Calico Open Source icon',
    },
    {
        title: 'Calico Cloud Free Tier',
        description: 'Observability & policy management for a single cluster',
        imageSrc: '/img/calico-cloud-free-logo-badge.svg',
        alt: 'Calico Cloud Free Tier icon',
        imageSize: '130px',
    },
    {
        title: 'Calico Cloud',
        description: 'SaaS platform for Kubernetes networking and security',
        imageSrc: '/img/calico-cloud-logo-badge.svg',
        alt: 'Calico Cloud icon',
        imageSize: '130px'
    },
    {
        title: 'Calico Enterprise',
        description: 'Self-managed platform for Kubernetes networking and security',
        imageSrc: '/img/calico-enterprise-logo-badge.svg',
        alt: 'Calico Enterprise icon',
    },
];

const CalicoProducts: React.FC = () => {

    return <Grid sx={gridStyles}>
        {products.map(product => <CalicoProductCard {...product} />)}
    </Grid>;
}

export default CalicoProducts;