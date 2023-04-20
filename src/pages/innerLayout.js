import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Explore from '../___new___/components/Explore';
import SelectDocs from '../___new___/components/SelectDocs';
import HomepageHeader from '../___new___/components/HomepageHeader';
import ProductComparison from '../___new___/components/ProductComparison';
import ProductInfo from '../___new___/components/ProductInfo';
import FeatureTableComparison from '../___new___/components/FeatureTableComparison';
import {useColorMode} from '@docusaurus/theme-common';

import {theme} from '../___new___/theme';

import {Grid, GridItem} from '@chakra-ui/react';

import {ChakraProvider} from '@chakra-ui/react';

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    const {colorMode} = useColorMode();
    const isDarkMode = colorMode === 'dark';

    return (
        <main>
            <ChakraProvider theme={theme}>
                <HomepageHeader
                    siteConfig={siteConfig}
                    isDarkMode={isDarkMode}
                />

                <Grid
                    gap={0}
                    templateAreas={
                        '"selectdocs" "explore" "productinfo" "productcomparison" "featuretablecomparison" '
                    }
                    templateColumns={'1fr'}
                    // note: just loose heights for now, not based on wireframes, please change!
                    templateRows={
                        'minmax(200px, max-content) minmax(720px, max-content) minmax(500px, max-content) minmax(400px, max-content) minmax(200px, max-content)'
                    }
                    >
                    <GridItem
                        gridArea='selectdocs'
                        as='section'
                        data-testid='selectdocs-section'>
                        <SelectDocs isDarkMode={isDarkMode} />
                    </GridItem>
                    <GridItem
                        gridArea='explore'
                        as='section'
                        data-testid='explore-section'>
                        <Explore isDarkMode={isDarkMode} />
                    </GridItem>
                    <GridItem
                        gridArea='productinfo'
                        as='section'
                        data-testid='productinfo-section'>
                        <ProductInfo isDarkMode={isDarkMode} />
                    </GridItem>
                    <GridItem
                        gridArea='productcomparison'
                        as='section'
                        data-testid='productcomparison-section'>
                        <ProductComparison isDarkMode={isDarkMode} />
                    </GridItem>
                    <GridItem
                        gridArea='featuretablecomparison'
                        as='section'
                        data-testid='featuretablecomparison-section'>
                        <FeatureTableComparison isDarkMode={isDarkMode} />
                    </GridItem>
                </Grid>
            </ChakraProvider>
        </main>
    );
}
