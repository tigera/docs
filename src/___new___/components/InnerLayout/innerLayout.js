import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SelectDocSet from '../SelectDocSet';
import HomepageHeader from '../HomepageHeader';
import ProductComparison from '../ProductComparison';
import ProductInfo from '../ProductInfo';
import FeatureTableComparison from '../FeatureTableComparison';

import {theme} from '../../theme';

import {Grid, GridItem, useColorMode} from '@chakra-ui/react';

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    const {colorMode} = useColorMode();
    const isDarkMode = colorMode === 'dark';

  return (
    <main>
      <HomepageHeader
        siteConfig={siteConfig}
        isDarkMode={isDarkMode}
      />

      <Grid
        gap={0}
        templateAreas={'"selectdocset"  "productinfo" "productcomparison" "featuretablecomparison" '}
        templateColumns={'1fr'}
        // note: just loose heights for now, not based on wireframes, please change!
        //minmax(720px, max-content) for explore
        templateRows={
          'minmax(200px, max-content)  minmax(500px, max-content) minmax(400px, max-content) minmax(200px, max-content)'
        }
      >
        <GridItem
          gridArea='selectdocset'
          as='section'
          data-testid='selectdocs-section'
        >
          <SelectDocSet isDarkMode={isDarkMode} />
        </GridItem>

        <GridItem
          gridArea='productinfo'
          as='section'
          data-testid='productinfo-section'
        >
          <ProductInfo isDarkMode={isDarkMode} />
        </GridItem>
        <GridItem
          gridArea='productcomparison'
          as='section'
          data-testid='productcomparison-section'
        >
          <ProductComparison isDarkMode={isDarkMode} />
        </GridItem>
        <GridItem
          gridArea='featuretablecomparison'
          as='section'
          data-testid='featuretablecomparison-section'
        >
          <FeatureTableComparison isDarkMode={isDarkMode} />
        </GridItem>
      </Grid>
    </main>
  );
}
