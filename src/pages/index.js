import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Explore from '../___new___/components/Explore';
import SelectDocs from '../___new___/components/SelectDocs';
import HomepageHeader from '../___new___/components/HomepageHeader';
import ProductComparison from '../___new___/components/ProductComparison';
import ProductInfo from '../___new___/components/ProductInfo';
import FeatureTableComparison from '../___new___/components/FeatureTableComparison';

import { theme } from '../___new___/theme';

import { Grid, GridItem } from '@chakra-ui/react';

import { ChakraProvider } from '@chakra-ui/react';

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description='Tigera and Calico (projectcalico) documentation'
        >
            <main>
                <ChakraProvider theme={theme}>
                    <HomepageHeader siteConfig={siteConfig} />

                    <Grid
                        gap={0}
                        templateAreas={
                            '"selectdocs" "explore" "productinfo" "productcomparison" "featuretablecomparison" '
                        }
                        templateColumns={'1fr'}
                        // note: just loose heights for now, not based on wireframes, please change!
                        templateRows={
                            'minmax(200px, max-content) minmax(820px, max-content) minmax(500px, max-content) minmax(400px, max-content) minmax(200px, max-content)'
                        }
                        sx={{}}
                    >
                        <GridItem
                            gridArea='selectdocs'
                            as='section'
                            data-testid='selectdocs-section'
                        >
                            <SelectDocs />
                        </GridItem>
                        <GridItem
                            gridArea='explore'
                            as='section'
                            data-testid='explore-section'
                        >
                            <Explore />
                        </GridItem>
                        <GridItem
                            gridArea='productinfo'
                            as='section'
                            data-testid='productinfo-section'
                        >
                            <ProductInfo />
                        </GridItem>
                        <GridItem
                            gridArea='productcomparison'
                            as='section'
                            data-testid='productcomparison-section'
                        >
                            <ProductComparison />
                        </GridItem>
                        <GridItem
                            gridArea='featuretablecomparison'
                            as='section'
                            data-testid='featuretablecomparison-section'
                        >
                            <FeatureTableComparison />
                        </GridItem>
                    </Grid>
                </ChakraProvider>
            </main>
        </Layout>
    );
}
