import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../___new___/theme/index';
import Head from '@docusaurus/Head';

const Root = ({ children }) => (
  <ChakraProvider
    theme={theme}
    resetCSS={false}
  >
    <Head>
      {/* This loads libraries for clym privacy popups. */}
      <script src='https://widget.clym-sdk.net/blocking.js'></script>
      <script>{`
        (function(d,s,i,w,o){
        var js,cjs=d.getElementsByTagName(s)[0];
        if(d.getElementById(i))return;
        js=d.createElement('script');
        js.id=i;
        js.src="https://widget.clym-sdk.net/clym.js";
        js.onload=function(){Clym&&Clym.load(i,w,o);};
        cjs.parentNode.insertBefore(js, cjs);
        }(document,'script','clym-privacy','91ec4c5ce86a4d7abc26c44cn0osl70w',{}));
        `}</script>
    </Head>
    {children}
  </ChakraProvider>
);

export default Root;
