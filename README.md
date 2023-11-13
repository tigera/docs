[![Netlify Status](https://api.netlify.com/api/v1/badges/58c3464e-f1ba-4a32-8c6e-0e41fe8e0f45/deploy-status)](https://app.netlify.com/sites/tigera/deploys)
# Calico & Tigera Docs

This is the full set of product docs for Calico & Tigera. It includes our Open Source (Project Calico) docs
as well as our Enterprise and Cloud docs.

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Prerequisites

Either 

* docker (to run the containerised version of the build)

Or

* Node.js v18.18.2+ (v18.18.2 recommended). Use the outstanding [nvm tool](https://github.com/nvm-sh/nvm) to manage your node versions.
* yarn `npm install -g yarn`
* Fork and clone our docs repo <https://github.com/tigera/docs>

## Local Development

```bash
make start 
```
or 
```bash
make start CONTAINERIZED=true
```

This command starts a local development server on http://localhost:3000. Most changes are reflected live without
having to restart the server. This build is faster, but does not produce all the warnings and errors of a full build.

## Full Build & Serve

```bash
make build
make serve
```
or
```bash
make build CONTAINERIZED=true
make serve CONTAINERIZED=true
```

This command generates static content into the `build` directory and can be served using any static content hosting
service. This is a full build which is exactly what Netlify runs to build the site, therefore, you will get more
warning and error output. If you are trying to reproduce an error on Netlify, this is a great place to start.

