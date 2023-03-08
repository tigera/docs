[![Netlify Status](https://api.netlify.com/api/v1/badges/b75d944a-c541-4dbe-a70e-262e50218a7f/deploy-status)](https://app.netlify.com/sites/calico-tigera-docs/deploys)

# Calico & Tigera Docs

This is the full set of product docs for Calico & Tigera. It includes our Open Source (Project Calico) docs
as well as our Enterprise and Cloud docs.

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Prerequisites

* Install / use Node.js v16.14.2+. Use the outstanding [nvm tool](https://github.com/nvm-sh/nvm) to manage
  your node versions.
* Install yarn `npm install -g yarn`
* Fork and clone our docs repo <https://github.com/tigera/docs>

## Install Dependencies

```bash
yarn install
```

This installs all the package dependencies, such as docusaurus.

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without
having to restart the server. This build is faster, but does not produce all the warnings and errors of a full build.

## Full Build & Serve

```bash
yarn build
yarn serve
```

This command generates static content into the `build` directory and can be served using any static content hosting
service. This is a full build which is exactly what Netlify runs to build the site, therefore, you will get more
warning and error output. If you are trying to reproduce an error on Netlify, this is a great place to start.

## Other Resources

Netlify site: <https://app.netlify.com/sites/calico-tigera-docs/overview>
